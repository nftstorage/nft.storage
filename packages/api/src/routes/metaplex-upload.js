import { HTTPError } from '../errors.js'
import * as cluster from '../cluster.js'
import { JSONResponse } from '../utils/json-response.js'
import { toNFTResponse } from '../utils/db-transforms.js'
import { parseCid } from '../utils/utils.js'
import {
  parseJWTHeader,
  Base64URL,
  utf8ToUint8Array,
  parseJWT,
} from '../utils/jwt.js'
import { keyFromDID, verifyEd25519Signature } from '../utils/ed25519.js'
import { DBError } from '../utils/db-client.js'
import {
  ErrorMetaplexTokenNotFound,
  ErrorInvalidMetaplexToken,
} from '../errors.js'

/**
 * When >2.5MB, use local add, because waiting for blocks to be sent to
 * other cluster nodes can take a long time. Replication to other nodes
 * will be done async by bitswap instead.
 */
const LOCAL_ADD_THRESHOLD = 1024 * 1024 * 2.5

/**
 * Temporary CAR only upload endpoint, authenticated with Metaplex JWT.
 * @type {import('../bindings').Handler}
 */
export async function metaplexUpload(event, ctx) {
  const { db } = ctx
  const { headers } = event.request
  const authHeader = headers.get('x-web3auth') || ''

  const match = authHeader.match(/^Metaplex (.*)$/)
  if (!match) {
    throw new ErrorMetaplexTokenNotFound()
  }

  const token = match[1]
  const meta = await parseMetaplexJWT(token)

  // Get the mapped metaplex user
  const { user, key } = await validate(db)

  const blob = await event.request.blob()
  if (blob.size === 0) {
    throw new HTTPError('Empty payload', 400)
  }

  const local = blob.size > LOCAL_ADD_THRESHOLD
  const { cid, bytes: dagSize } = await cluster.addCar(blob, { local })
  const { sourceCid, contentCid } = parseCid(cid)

  // confirm that the content cid matches the cid from the signed metadata
  if (contentCid !== meta.rootCID) {
    throw new ErrorInvalidMetaplexToken('CID in token does not match content')
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

/**
 * Validates that the account associated with the METAPLEX_AUTH_TOKEN secret exists,
 * and returns the user id and auth key id.
 * @param {import('../utils/db-client').DBClient} db
 * @returns
 */
async function validate(db) {
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
    throw new ErrorInvalidMetaplexToken('token must be a string')
  }
  var tokenParts = token.split('.')

  if (tokenParts.length !== 3) {
    throw new ErrorInvalidMetaplexToken('token must be a signed JWT')
  }

  const header = parseJWTHeader(token)
  /** @type {Record<string, any>} */
  const payload = parseJWT(token)

  if (!payload.iss) {
    throw new ErrorInvalidMetaplexToken(
      'required field "iss" not present in payload'
    )
  }

  const { iss } = payload

  const headerPayload = utf8ToUint8Array(tokenParts[0] + '.' + tokenParts[1])
  const pubkey = await keyFromDID(iss)
  const sig = Base64URL.parse(tokenParts[2])

  const validSig = await verifyEd25519Signature(headerPayload, sig, pubkey)
  if (!validSig) {
    throw new ErrorInvalidMetaplexToken('invalid signature')
  }

  // validate header

  if (header.alg !== 'EdDSA') {
    throw new ErrorInvalidMetaplexToken('invalid signing algorithm')
  }

  if (header.typ !== 'JWT') {
    throw new ErrorInvalidMetaplexToken('invalid token type')
  }

  if (!payload.req) {
    throw new ErrorInvalidMetaplexToken(
      'required field "req" not present in payload'
    )
  }

  if (!payload.req.put) {
    throw new ErrorInvalidMetaplexToken(
      'required field "req.put" not present in payload'
    )
  }

  if (typeof payload.req.put.rootCID !== 'string') {
    throw new ErrorInvalidMetaplexToken('root CID not present in payload')
  }

  if (
    !payload.req.put.tags ||
    typeof payload.req.put.tags['solana-cluster'] !== 'string'
  ) {
    throw new ErrorInvalidMetaplexToken(
      '"solana-cluster" tag not present in payload'
    )
  }

  const solanaCluster = payload.req.put.tags['solana-cluster']
  const { contentCid: rootCID } = parseCid(payload.req.put.rootCID)

  return {
    iss,
    rootCID,
    solanaCluster,
  }
}
