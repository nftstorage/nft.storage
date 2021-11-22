import { HTTPError } from '../errors.js'
import * as cluster from '../cluster.js'
import { secrets, database } from '../constants.js'
import { JSONResponse } from '../utils/json-response.js'
import { toNFTResponse } from '../utils/db-transforms.js'
import { parseCid } from '../utils/utils.js'
import {
  parseJWTHeader,
  parseJWT,
  Base64URL,
  utf8ToUint8Array,
} from '../utils/jwt.js'
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
  const valid = await verifyMetaplexJWT(token)
  if (!valid) {
    throw new HTTPError('invalid authorization header', 401)
  }

  // now that we know the sig is valid, use the JWT payload
  // as metadata to attach to the upload entry in the db
  /** @type Record<string, any> */
  const { iss, req } = parseJWT(token)
  if (!iss) {
    throw new HTTPError(
      'invalid token - required field "iss" not present in payload',
      401
    )
  }
  if (!req) {
    throw new HTTPError(
      'invalid token - required field "req" not present in payload',
      401
    )
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

  // confirm that the content cid matches the cid from the signed metadata
  if (!req.put || typeof req.put.rootCID !== 'string') {
    throw new HTTPError('invalid token - no root cid in payload', 401)
  }
  const signedCid = req.put.rootCID
  if (signedCid !== sourceCid && signedCid !== contentCid) {
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
    // note: we need to specify the foreign key to use in the select statement below
    // because there's also a potential join between `auth_key` and `user`
    // via the `uploads` table.

    meta: { iss, req: JSON.stringify(req) },
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

/**
 * Verifies a self-signed JWT for a metaplex upload.
 *
 * @param {string} token - an encoded JWT token from an x-web3auth header.
 * @returns {Promise<boolean>} - true if the token contains a valid solana public key and a valid signature from the key.
 */
async function verifyMetaplexJWT(token) {
  if (typeof token !== 'string') {
    throw new Error('token must be a string')
  }
  var tokenParts = token.split('.')

  if (tokenParts.length !== 3) {
    return false
  }

  const header = parseJWTHeader(token)
  const payload = parseJWT(token)

  if (header.alg !== 'EdDSA') {
    throw new Error('invalid algorithm for metaplex token')
  }

  if (header.typ !== 'JWT') {
    throw new Error('invalid token type')
  }

  if (!payload.iss) {
    return false
  }

  const headerPayload = utf8ToUint8Array(tokenParts[0] + '.' + tokenParts[1])
  const pubkey = await keyFromDID(payload.iss)
  const sig = Base64URL.parse(tokenParts[2])

  return verifyEd25519Signature(headerPayload, sig, pubkey)
}
