import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'node:url'
import { getDBPinStatus, getMimeAndType, parseCid } from './push-to-db.js'
import { DBClient } from '../../api/src/utils/db-client.js'
/**
 * @typedef {import('./cli2').Context} Context
 * @typedef {import('listr').ListrTaskWrapper} Task
 * @typedef {import('../../api/src/utils/db-client').definitions} definitions
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['content']>} ContentQuery
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['pin']>} PinQuery
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['upload']>} UploadQuery
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
})
const productionDB = new DBClient(
  process.env.DATABASE_URL_PRODUCTION || '',
  process.env.DATABASE_TOKEN_PRODUCTION || ''
)

/**
 * @param {Context} ctx
 * @param {Task} task
 */
export async function pushEvents(ctx, task) {
  const { data: result, count } = await productionDB.client
    .from('migration_event')
    .select('*', { count: 'exact' })
    .in('name', ['nft:create', 'nft:delete'])
    .order('inserted_at', { ascending: true })
    .gte('inserted_at', '2021-10-11 18:43:14.000000Z')

  if (!result) {
    throw new Error('no events found')
  }

  let counter = 0
  const threshold = 10000
  task.title += `  count: ${count}`

  const uploads = new Map()
  const users = new Map()
  const pinsCluster = new Map()
  const pinsPinata = new Map()
  const contents = new Map()

  // eslint-disable-next-line camelcase
  for (const { name, data, inserted_at } of result) {
    counter++

    // Handle Create Event
    if (name === 'nft:create') {
      const issuer = data.key.user.issuer || data.key.user.sub
      const { nft, pin } = data

      // skip bad users
      if (data.key.user.email === 'hugomrdias@gmail.com') {
        continue
      }

      if (data.key.user.email === 'nft.storage@scnr.io') {
        continue
      }

      // Get event user from postgres and cache to avoid extra request for the same user
      let user
      if (users.has(issuer)) {
        user = users.get(issuer)
      } else {
        user = await ctx.db.getUser(issuer)
        if (!user.data) {
          console.log(data.key.user)
          throw new Error(`user not found ${issuer}`)
        }
        if (user.error) {
          // @ts-ignore
          throw new Error(JSON.stringify(user.error))
        }
        users.set(issuer, user)
      }

      // Process create upload
      const { id, keys } = user.data
      // @ts-ignore
      const authKey = keys.find((k) => k.name === nft.scope)
      const types = getMimeAndType(nft.type)
      const parsedCID = parseCid(nft.cid)

      pinsCluster.set(parsedCID.contentCid, {
        status: getDBPinStatus(pin.status),
        service: 'IpfsCluster',
        content_cid: parsedCID.contentCid,
        inserted_at: pin.created,
        updated_at: pin.created,
      })

      pinsPinata.set(parsedCID.contentCid, {
        status: 'PinQueued',
        service: 'Pinata',
        content_cid: parsedCID.contentCid,
        inserted_at: pin.created,
        updated_at: pin.created,
      })

      contents.set(parsedCID.contentCid, {
        cid: parsedCID.contentCid,
        dag_size: pin.size,
        inserted_at: nft.created,
        updated_at: nft.created,
      })

      uploads.set(`${issuer}:${parsedCID.sourceCid}`, {
        user_id: id,
        key_id: authKey ? authKey.id : null,
        content_cid: parsedCID.contentCid,
        source_cid: parsedCID.sourceCid,
        mime_type: types.mime_type,
        // @ts-ignore
        type: types.type,
        name: pin.name || '',
        files: nft.files || [],
        origins: pin.origins || null,
        meta: pin.meta || null,
        inserted_at: nft.created,
        updated_at: nft.created,
        deleted_at: null,
      })
    }

    // Handle Delete Event
    if (name === 'nft:delete') {
      // skip bad users
      if (data.user.email === 'hugomrdias@gmail.com') {
        continue
      }

      if (data.user.email === 'nft.storage@scnr.io') {
        continue
      }

      // Get event user from postgres
      const issuer = data.user.issuer || data.user.sub
      const user = await ctx.db.getUser(issuer)
      if (!user.data) {
        console.log(data.user)
        throw new Error(`user not found ${issuer}`)
      }
      if (user.error) {
        // @ts-ignore
        throw new Error(JSON.stringify(user.error))
      }

      // Either mutate from the created uploads or just delete directly
      const key = `${issuer}:${data.cid}`
      if (uploads.has(key)) {
        const up = uploads.get(key)
        uploads.set(key, {
          ...up,
          updated_at: inserted_at,
          deleted_at: inserted_at,
        })
      } else {
        await ctx.db.deleteUpload(data.cid, user.data.id)
      }
    }

    task.output = `Count: ${counter} type ${name}`

    if (counter > threshold) {
      await push(ctx, pinsCluster, pinsPinata, uploads, contents)
      counter = 0
      pinsPinata.clear()
      pinsCluster.clear()
      uploads.clear()
      contents.clear()
    }
  }

  // push leftovers
  if (counter !== 0) {
    await push(ctx, pinsCluster, pinsPinata, uploads, contents)
  }
}

/**
 * @param {Context} ctx
 * @param {any} pinsCluster
 * @param {any} pinsPinata
 * @param {any} uploads
 * @param {any} contents
 */
async function push(ctx, pinsCluster, pinsPinata, uploads, contents) {
  /** @type {UploadQuery} */
  const uploadQuery = ctx.db.client.from('upload')
  /** @type {ContentQuery} */
  const contentQuery = ctx.db.client.from('content')
  /** @type {PinQuery} */
  const pinQuery = ctx.db.client.from('pin')

  // push contents
  const { error: contentError } = await contentQuery.upsert(
    Array.from(contents.values()),
    {
      onConflict: 'cid',
      returning: 'minimal',
      ignoreDuplicates: true,
    }
  )
  if (contentError) {
    throw new Error(JSON.stringify(contentError))
  }

  // push pins and uploads
  const [pins, uploadsRsp] = await Promise.all([
    // @ts-ignore
    pinQuery.upsert([...pinsCluster.values(), ...pinsPinata.values()], {
      onConflict: 'content_cid, service',
      returning: 'minimal',
      ignoreDuplicates: true,
    }),
    // @ts-ignore
    uploadQuery.upsert(Array.from(uploads.values()), {
      onConflict: 'user_id, source_cid',
      returning: 'minimal',
    }),
  ])

  if (uploadsRsp.error) {
    throw new Error(JSON.stringify(uploadsRsp.error))
  }
  if (pins.error) {
    throw new Error(JSON.stringify(pins.error))
  }
}
