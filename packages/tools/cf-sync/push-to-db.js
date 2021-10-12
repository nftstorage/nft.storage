import { CID } from 'multiformats/cid'

/**
 * @typedef {import('./cli2').Context} Context
 * @typedef {import('listr').ListrTaskWrapper} Task
 * @typedef {import('../../api/src/utils/db-client').definitions} definitions
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['content']>} ContentQuery
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['pin']>} PinQuery
 * @typedef {import('@supabase/postgrest-js').PostgrestQueryBuilder<definitions['upload']>} UploadQuery
 */

/**
 * @param {Context} ctx
 * @param {Task} task
 */
export async function pushToDB(ctx, task) {
  for await (const user of ctx.userStore.iterator()) {
    if (user.value.data.email === 'hugomrdias@gmail.com') {
      continue
    }

    if (user.value.data.email === 'nft.storage@scnr.io') {
      continue
    }

    if (user) {
      const data = user.value.data
      const tokens = Object.entries(user.value.data.tokens)

      // create user
      const { data: dbUser, error } = await ctx.db
        .upsertUser({
          email: data.email,
          github_id: data.sub,
          magic_link_id: data.issuer,
          name: data.name,
          public_address: data.publicAddress,
          picture: data.picture,
          github: data.github,
        })
        .single()

      if (error) {
        console.error(error)
        throw new Error(`create user failed ${data.email} ${data.issuer}`)
      }

      // create auth keys for user
      /** @type {definitions['auth_key'][]} */
      const authKeys = []
      if (dbUser) {
        for (const token of tokens) {
          const key = await ctx.db.createKey({
            name: token[0],
            secret: token[1],
            userId: dbUser.id,
          })
          authKeys.push(key)
        }
      }

      task.title = `Processing user ${data.email}`
      // @ts-ignore
      await nftByUser(data.issuer, data.sub, ctx, task, authKeys, dbUser)
    }
  }
}

/**
 * @param {string} issuer
 * @param {string} sub
 * @param {Context} ctx
 * @param {Task} task
 * @param {definitions['auth_key'][]} keys
 * @param {definitions['user']} dbUser
 */
async function nftByUser(issuer, sub, ctx, task, keys, dbUser) {
  const threshold = 20000
  let count = 0
  let values = []

  // Find all nfts by issuer
  for await (const { value } of ctx.nftStore.iterator({
    gt: issuer,
    lt: issuer + '\xFF',
  })) {
    count++
    values.push(value)

    if (values.length > threshold) {
      await addNFTs(values, keys, ctx, dbUser)
      values = []
    }
    task.output = ` nfts: ${count} by issuer`
  }
  // Find all nfts by sub
  if (sub !== issuer) {
    for await (const { value } of ctx.nftStore.iterator({
      gt: sub,
      lt: sub + '\xFF',
    })) {
      count++
      values.push(value)

      if (values.length > threshold) {
        await addNFTs(values, keys, ctx, dbUser)
        values = []
      }
      task.output = ` nfts: ${count} by sub`
    }
  }

  if (values.length !== 0) {
    await addNFTs(values, keys, ctx, dbUser)
  }
}

/**
 * @param {Context} ctx
 * @param {any[]} values
 * @param {definitions['auth_key'][]} keys
 * @param {definitions['user']} dbUser
 */
async function addNFTs(values, keys, ctx, dbUser) {
  /** @type {ContentQuery} */
  const contentQuery = ctx.db.client.from('content')
  /** @type {PinQuery} */
  const pinQuery = ctx.db.client.from('pin')
  /** @type {UploadQuery} */
  const uploadQuery = ctx.db.client.from('upload')
  const contentArray = []
  const pinsArray = []
  const uploadArray = []
  /**
   * @type {string[]}
   */
  const cids = []

  for (const { data, size, pinStatus } of values) {
    const parsedCID = parseCid(data.cid)
    // avoid duplicate cidv1 in content and pin
    if (!cids.includes(parsedCID.contentCid)) {
      cids.push(parsedCID.contentCid)
      contentArray.push({
        cid: parsedCID.contentCid,
        dag_size: size,
        inserted_at: data.created,
        updated_at: data.created,
      })

      pinsArray.push({
        status: getDBPinStatus(pinStatus),
        service: 'IpfsCluster',
        content_cid: parsedCID.contentCid,
        inserted_at: data.created,
        updated_at: data.created,
      })
      pinsArray.push({
        status: 'PinQueued',
        service: 'Pinata',
        content_cid: parsedCID.contentCid,
        inserted_at: data.created,
        updated_at: data.created,
      })
    }

    const authKey = keys.find((k) => k.name === data.scope)
    const types = getMimeAndType(data.type)
    uploadArray.push({
      user_id: dbUser.id,
      key_id: authKey ? authKey.id : null,
      content_cid: parsedCID.contentCid,
      source_cid: parsedCID.sourceCid,
      mime_type: types.mime_type,
      // @ts-ignore
      type: types.type,
      name: data.pin && data.pin.name ? data.pin.name : '',
      files: data.files || [],
      origins: data.pin && data.pin.origins ? data.pin.origins : null,
      meta: data.pin && data.pin.meta ? data.pin.meta : null,
      inserted_at: data.created,
      updated_at: data.created,
    })
  }

  // push contents
  const { error: contentError } = await contentQuery.upsert(contentArray, {
    onConflict: 'cid',
  })
  if (contentError) {
    throw new Error(JSON.stringify(contentError))
  }

  // push pins and uploads
  const [pins, uploads] = await Promise.all([
    // @ts-ignore
    pinQuery.upsert(pinsArray, {
      onConflict: 'content_cid, service',
    }),
    // @ts-ignore
    uploadQuery.upsert(uploadArray, {
      onConflict: 'user_id, source_cid',
    }),
  ])
  if (uploads.error) {
    console.log(uploadArray)
    console.log(uploads)
    throw new Error(JSON.stringify(uploads.error))
  }
  if (pins.error) {
    throw new Error(JSON.stringify(pins.error))
  }
}

/**
 *
 * @param {string} type
 * @returns
 */
function getMimeAndType(type) {
  switch (type) {
    case 'nft':
      return {
        type: 'Nft',
        mime_type: 'multipart/form-data',
      }
    case 'directory':
      return {
        type: 'Multipart',
        mime_type: 'multipart/form-data',
      }
    case 'application/car':
      return {
        type: 'Car',
        mime_type: 'application/car',
      }
    case 'remote':
      return {
        type: 'Remote',
        mime_type: '',
      }
    default:
      return {
        type: 'Blob',
        mime_type: type,
      }
  }
}

/**
 * @param {any} status
 */
function getDBPinStatus(status) {
  switch (status) {
    case 'pinned':
      return 'Pinned'
    case 'failed':
      return 'PinError'
    case 'pinning':
      return 'Pinning'
    default:
      return 'PinError'
  }
}

/**
 * Parse CID and return v1 and original
 *
 * @param {string} cid
 */
export function parseCid(cid) {
  try {
    const c = CID.parse(cid)
    return {
      contentCid: c.toV1().toString(),
      sourceCid: c.toString(),
    }
  } catch (err) {
    throw new Error(`invalid cid ${cid}`)
  }
}
