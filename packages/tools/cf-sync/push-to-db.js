/**
 * @typedef {import('./cli2').Context} Context
 * @typedef {import('listr').ListrTaskWrapper} Task
 * @typedef {import('../../api/src/utils/db-client').definitions} definitions
 */

const issuer = 'did:ethr:0x03cefdE6FC0391b16B0eC33734996b29146Cd142'
const sub = 'did:ethr:0x03cefdE6FC0391b16B0eC33734996b29146Cd142'

// const issuer = 'did:ethr:0x856da5805f9Ec6A723560d21d28DF7C7e289d738'
// const sub = 'did:ethr:0x856da5805f9Ec6A723560d21d28DF7C7e289d738'

/**
 * @param {Context} ctx
 * @param {Task} task
 */
export async function pushToDB(ctx, task) {
  for await (const user of ctx.userStore.iterator()) {
    // if (user.value.data.issuer === issuer || user.value.data.sub === sub) {
    if (user) {
      const data = user.value.data
      const tokens = Object.entries(user.value.data.tokens)

      // console.log(data)
      // create user
      const { data: dbUser, error } = await ctx.db
        .upsertUser({
          email: data.email,
          github_id: data.sub,
          magic_link_id: data.issuer,
          name: data.name,
          public_address: data.publicAddress,
          picture: data.picture,
        })
        .single()

      if (error) {
        console.error(error)
        throw new Error('create user failed')
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
 * @param {definitions['account']} dbUser
 */
async function nftByUser(issuer, sub, ctx, task, keys, dbUser) {
  let count = 0
  for await (const { value } of ctx.nftStore.iterator({
    gt: issuer,
    lt: issuer + '\xFF',
  })) {
    count++
    await addNft(value, keys, ctx, dbUser)
    task.output = ` nfts: ${count} by issuer`
  }

  if (sub !== issuer) {
    for await (const { value } of ctx.nftStore.iterator({
      gt: sub,
      lt: sub + '\xFF',
    })) {
      count++
      await addNft(value, keys, ctx, dbUser)
      task.output = ` nfts: ${count} by sub`
    }
  }
}

/**
 * @param {Context} ctx
 * @param {any} value
 * @param {definitions['auth_key'][]} keys
 * @param {definitions['account']} dbUser
 */
async function addNft(value, keys, ctx, dbUser) {
  const { data, pinStatus, size, checked } = value

  if (checked) {
    const authKey = keys.find((k) => k.name === data.scope)
    const types = getMimeAndType(data.type)
    await ctx.db.createUpload({
      account_id: dbUser.id,
      content_cid: data.cid,
      source_cid: data.cid,
      type: types.type,
      dag_size: size,
      files: data.files,
      key_id: authKey ? authKey.id : undefined,
      mime_type: types.mime_type,
      meta: data.pin?.meta,
      name: data.pin?.name,
    })
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
