import { HTTPError } from '../errors.js'
import * as cluster from '../cluster.js'
import { secrets, database } from '../constants.js'
import { JSONResponse } from '../utils/json-response.js'
import { toNFTResponse } from '../utils/db-transforms.js'
import { parseCid } from '../utils/utils.js'
import { verifyMetaplexJWT } from '../utils/jwt.js'
import { DBClient, DBError } from '../utils/db-client.js'

/**
 * When >2.5MB, use local add, because waiting for blocks to be sent to
 * other cluster nodes can take a long time. Replication to other nodes
 * will be done async by bitswap instead.
 */
const LOCAL_ADD_THRESHOLD = 1024 * 1024 * 2.5

// TODO: remove when https://github.com/nftstorage/nft.storage/pull/638 merged
const db = new DBClient(database.url, secrets.database)

/**
 * Temporary CAR only upload endpoint, authenticated with Metaplex JWT.
 * @type {import('../bindings').Handler}
 */
export async function metaplexUpload(event, ctx) {
  const { headers } = event.request
  const authHeader = headers.get('x-web3auth') || ''

  const match = authHeader.match(/^Metaplex (.*)$/)
  if (!match) {
    throw new HTTPError('invalid authorization header: ' + authHeader, 401)
  }

  const token = match[1]
  const valid = await verifyMetaplexJWT(token)
  if (!valid) {
    throw new HTTPError('invalid authorization header', 401)
  }

  // Get the mapped metaplex user
  const { user, key } = await validate()

  const blob = await event.request.blob()
  if (blob.size === 0) {
    throw new HTTPError('Empty payload', 400)
  }

  const local = blob.size > LOCAL_ADD_THRESHOLD
  const { cid, bytes: dagSize } = await cluster.addCar(blob, { local })
  const { sourceCid, contentCid } = parseCid(cid)

  const upload = await db.createUpload({
    mime_type: blob.type,
    type: 'Car',
    content_cid: contentCid,
    source_cid: sourceCid,
    dag_size: dagSize,
    user_id: user.id,
    files: [],
    key_id: key.id,
    meta: JSON.parse(headers.get('x-web3meta') || 'null'),
  })

  return new JSONResponse({ ok: true, value: toNFTResponse(upload, sourceCid) })
}

async function validate() {
  if (typeof METAPLEX_AUTH_TOKEN === 'undefined') {
    throw new Error('missing metaplex auth key')
  }

  const { error, data } = await db.client
    .from('auth_key')
    .select('id,user:auth_key_user_id_fkey(id)')
    .eq('secret', METAPLEX_AUTH_TOKEN)
    .single()

  if (error) {
    throw new DBError(error)
  }

  if (!data) {
    throw new HTTPError('metaplex user not found', 404)
  }

  return { user: { id: data.user.id }, key: { id: data.id } }
}
