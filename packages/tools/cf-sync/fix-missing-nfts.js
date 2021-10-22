import dotenv from 'dotenv'
import path from 'path'

import pg from 'pg'
import { fileURLToPath } from 'node:url'
import { getDBPinStatus, getMimeAndType, parseCid } from './push-to-db.js'
import { DBClient } from '../../api/src/utils/db-client.js'
import got from 'got'
/**
 * @typedef {import('./cli2').Context} Context
 * @typedef {import('listr').ListrTaskWrapper} Task
 * @typedef {import('../../api/src/utils/db-client').definitions} definitions
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['content']>} ContentQuery
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['pin']>} PinQuery
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['upload']>} UploadQuery
 */

const { Client, Pool } = pg
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
})
const productionDB = new DBClient(
  process.env.DATABASE_URL_PRODUCTION || '',
  process.env.DATABASE_TOKEN_PRODUCTION || ''
)

const stagingDB = new DBClient(
  process.env.DATABASE_URL_STAGING || '',
  process.env.DATABASE_TOKEN_STAGING || ''
)

const pool = new Pool({ connectionString: process.env.DATABASE_CONNECTION })

/**
 * @param {Context} ctx
 * @param {Task} task
 */
export async function fixMissingCids(ctx, task) {
  // const c = new Client({ connectionString: process.env.DATABASE_CONNECTION })
  // await c.connect()

  for await (const { key, value } of ctx.userStore.iterator()) {
    task.output = `processing ${key} : ${value.data.email}`

    if (value.data.email === 'hugomrdias@gmail.com') {
      continue
    }
    if (value.data.email === 'nft.storage@scnr.io') {
      continue
    }

    if (true) {
      const { data: user, error } = await ctx.db.getUser(key)

      if (error) {
        console.log(value.data.email, value.data.sub, value.data.issuer, error)
      }

      if (user) {
        const cids = await findNftsByUser(ctx, task, value.data)
        const diff = await checkCids(cids, user.id)
        if (diff.difference !== 0) {
          task.output = `processing ${key} : ${value.data.email} - missing ${diff.difference}`
          // console.log(key, user.id, diff.difference)
          // insert missing cids
          for (const cid of diff.missingCids) {
            let { ok, nft, pin, error } = await getNft(key + ':' + cid)

            if (nft === null) {
              nft = {
                scope: '',
                type: 'application/text',
              }
            }

            if (!pin) {
              console.log(
                'missing',
                nft,
                pin?.metadata.created,
                pin.metadata.size
              )
              continue
            }

            const normalizedCid = cid.startsWith('/ipfs/')
              ? cid.replace('/ipfs/', '')
              : cid
            const authKey = user.keys.find(k => k.name === nft.scope)
            const types = getMimeAndType(nft.type)
            const parsedCid = parseCid(normalizedCid)
            task.output = `add ${parsedCid.sourceCid}`
            await ctx.db.createUpload({
              user_id: user.id,
              key_id: authKey ? authKey.id : null,
              content_cid: parsedCid.contentCid,
              source_cid: parsedCid.sourceCid,
              mime_type: types.mime_type,
              // @ts-ignore
              type: types.type,
              name: nft.pin && nft.pin.name ? nft.pin.name : '',
              files: nft.files || [],
              origins: nft.pin && nft.pin.origins ? nft.pin.origins : null,
              meta: nft.pin && nft.pin.meta ? nft.pin.meta : null,
              inserted_at: nft.created || pin?.metadata.created,
              updated_at: new Date().toISOString(),
              dag_size: pin.size,
            })
          }
        }
      }
    }
  }

  await pool.end()
}

/**
 * @param {any[]} cids
 * @param {number} userId
 */
async function checkCids(cids, userId) {
  const normalizedCids = cids.map(c => {
    if (c.startsWith('/ipfs/')) {
      return c.replace('/ipfs/', '')
    } else {
      return c
    }
  })
  const {
    rowCount,
    rows,
  } = await pool.query(
    `select source_cid from upload where user_id = $2 AND source_cid = ANY($1)`,
    [normalizedCids, userId]
  )

  const dbCids = new Set(rows.map(r => r.source_cid))
  const difference = cids.filter(x => {
    const t = x.startsWith('/ipfs/') ? x.replace('/ipfs/', '') : x
    return !dbCids.has(t)
  })

  return {
    difference: difference.length,
    rowCount,
    missingCids: difference,
  }
}

/**
 * @param {string} key
 */
function parseKey(key) {
  const pos = key.lastIndexOf(':')
  const issuer = key.slice(0, pos)
  let cid = key.slice(pos + 1, key.length)

  return { issuer, cid }
}

/**
 * @param {Context} ctx
 * @param {Task} task
 * @param {{ issuer: string; sub: string; }} user
 */
async function findNftsByUser(ctx, task, user) {
  const cids = []
  for await (const { key } of ctx.nftStore.iterator({
    gt: user.issuer,
    lt: user.issuer + '\xFF',
  })) {
    const parsedKey = parseKey(key)
    cids.push(parsedKey.cid)
  }

  if (user.sub !== user.issuer) {
    for await (const { key } of ctx.nftStore.iterator({
      gt: user.sub + ':',
      lt: user.sub + ':\xFF',
    })) {
      const parsedKey = parseKey(key)
      cids.push(parsedKey.cid)
    }
  }

  return cids
}

/**
 * @param {string} key
 */
async function getNft(key) {
  const rsp = await got
    .get(
      'https://nft-storage-migration.protocol-labs.workers.dev/internal/list2',
      {
        searchParams: {
          key,
        },
      }
    )
    .json()
  return rsp
}
