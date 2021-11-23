import { HTTPError } from '../errors.js'
import * as cluster from '../cluster.js'
import { secrets, database } from '../constants.js'
import { JSONResponse } from '../utils/json-response.js'
import { toNFTResponse } from '../utils/db-transforms.js'
import { parseCid } from '../utils/utils.js'
import { parseJWTHeader, Base64URL, utf8ToUint8Array } from '../utils/jwt.js'
import { keyFromDID, verifyEd25519Signature } from '../utils/ed25519.js'
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
  const meta = await parseMetaplexJWT(token)

  // Get the mapped metaplex user
  const { user, key } = await validate()

  const blob = await event.request.blob()
  if (blob.size === 0) {
    throw new HTTPError('Empty payload', 400)
  }

  const local = blob.size > LOCAL_ADD_THRESHOLD
  const { cid, bytes: dagSize } = await cluster.addCar(blob, { local })
  const { sourceCid, contentCid } = parseCid(cid)

  // confirm that the content cid matches the cid from the signed metadata
  if (contentCid !== meta.rootCID) {
    throw new HTTPError('invalid token - cid mismatch', 401)
  }

  const upload = await db.createUpload({
    mime_type: blob.type,
    type: 'Car',
    content_cid: contentCid,
    source_cid: sourceCid,
    dag_size: dagSize,
    user_id: user.id,
    files: [],
    key_id: key.id,
    meta,
  })

  return new JSONResponse({ ok: true, value: toNFTResponse(upload, sourceCid) })
}

async function validate() {
  if (typeof METAPLEX_AUTH_TOKEN === 'undefined') {
    throw new Error('missing metaplex auth key')
  }
  // note: we need to specify the foreign key to use in the select statement below
  // because there's also a potential join between `auth_key` and `user`
  // via the `uploads` table.
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

/**
 * Verifies a self-signed JWT for a metaplex upload.
 *
 * @typedef {object} MetaplexMetadata
 * @property {string} iss the public key of the uploader, as a key:did string
 * @property {string} rootCID the root CID of the upload, as a CIDv1 string
 * @property {string} solanaCluster the name of the solana cluster being targetted
 *
 * @param {string} token - an encoded JWT token from an x-web3auth header.
 * @returns {Promise<MetaplexMetadata>} - metadata extracted from token payload.
 * Rejects with an HTTPError with 401 status if token is invalid or does not contain required payload fields.
 */
async function parseMetaplexJWT(token) {
  if (typeof token !== 'string') {
    throw new Error('token must be a string')
  }
  var tokenParts = token.split('.')

  if (tokenParts.length !== 3) {
    throw new HTTPError('invalid token', 401)
  }

  const header = parseJWTHeader(token)
  const payload = JSON.parse(tokenParts[1])

  if (!payload.iss) {
    throw new HTTPError(
      'invalid token - required field "iss" not present in payload',
      401
    )
  }

  const { iss } = payload

  const headerPayload = utf8ToUint8Array(tokenParts[0] + '.' + tokenParts[1])
  const pubkey = await keyFromDID(iss)
  const sig = Base64URL.parse(tokenParts[2])

  if (!verifyEd25519Signature(headerPayload, sig, pubkey)) {
    throw new HTTPError('invalid token signature', 401)
  }

  // validate header

  if (header.alg !== 'EdDSA') {
    throw new HTTPError('invalid algorithm for metaplex token', 401)
  }

  if (header.typ !== 'JWT') {
    throw new HTTPError('invalid token type', 401)
  }

  if (!payload.req) {
    throw new HTTPError(
      'invalid token - required field "req" not present in payload',
      401
    )
  }

  if (!payload.req.put) {
    throw new HTTPError(
      'invalid token - required field "req.put" not present in payload',
      401
    )
  }

  if (typeof payload.req.put.rootCID !== 'string') {
    throw new HTTPError('invalid token - no root cid in payload', 401)
  }

  if (!payload.tags || typeof payload.tags['solana-cluster'] !== 'string') {
    throw new HTTPError('invalid token - no "solana-cluster" tag in payload')
  }

  const solanaCluster = payload.tags['solana-cluster']
  const { contentCid: rootCID } = parseCid(payload.req.put.rootCID)

  return {
    iss,
    rootCID,
    solanaCluster,
  }
}
