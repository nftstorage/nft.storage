import { HTTPError } from '../errors.js'
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
import { getServiceConfig } from '../config.js'
import { uploadCarWithStat, carStat } from './nfts-upload.js'

/**
 * Temporary CAR only upload endpoint, authenticated with Metaplex JWT.
 * @type {import('../bindings').Handler}
 */
export async function metaplexUpload(event, ctx) {
  const authHeader = event.request.headers.get('x-web3auth') || ''
  const match = authHeader.match(/^Metaplex (.*)$/)
  if (!match) {
    throw new ErrorMetaplexTokenNotFound()
  }

  const token = match[1]
  const meta = await parseMetaplexJWT(token)

  // Get the mapped metaplex user
  const { user, key } = await validate(ctx.db)

  const blob = await event.request.blob()
  if (blob.size === 0) {
    throw new HTTPError('empty payload', 400)
  }

  const stat = await carStat(blob)
  // confirm that the content cid matches the cid from the signed metadata
  if (stat.rootCid.toString() !== meta.rootCID) {
    throw new ErrorInvalidMetaplexToken('CID in token does not match content')
  }
  const upload = await uploadCarWithStat(
    {
      event,
      ctx,
      user,
      key,
      car: blob,
      mimeType: 'application/car',
      files: [],
      structure: 'Unknown',
      meta,
    },
    stat
  )
  return new JSONResponse({
    ok: true,
    value: toNFTResponse(upload, meta.rootCID),
  })
}

/**
 * Validates that the account associated with the METAPLEX_AUTH_TOKEN secret exists,
 * and returns the user id and auth key id.
 * @param {import('../utils/db-client').DBClient} db
 */
async function validate(db) {
  const { METAPLEX_AUTH_TOKEN } = getServiceConfig()
  if (!METAPLEX_AUTH_TOKEN) {
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
 * @property {string} mintingAgent string identifying the "user agent" that prepared the upload
 * @property {string} [agentVersion] optional string identifying which version of the `mintingAgent` was used
 *
 * @param {string} token - an encoded JWT token from an x-web3auth header.
 * @returns {Promise<MetaplexMetadata>} - metadata extracted from token payload.
 * Rejects with an HTTPError with 401 status if token is invalid or does not contain required payload fields.
 */
async function parseMetaplexJWT(token) {
  if (typeof token !== 'string') {
    throw new ErrorInvalidMetaplexToken('token must be a string')
  }
  const tokenParts = token.split('.')

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

  if (!payload.req.put.tags) {
    throw new ErrorInvalidMetaplexToken('tags not present in payload')
  }

  const { contentCid: rootCID } = parseCid(payload.req.put.rootCID)
  const { solanaCluster, mintingAgent, agentVersion } = parsePutRequestTags(
    payload.req.put.tags
  )

  return {
    iss,
    rootCID,
    solanaCluster,
    mintingAgent,
    agentVersion,
  }
}

/**
 * Extracts the info we care about from the tags attached to a put CAR request.
 *
 * @typedef {object} PutRequestTags
 * @property {string} solanaCluster
 * @property {string} mintingAgent
 * @property {string} [agentVersion]
 *
 * @param {Record<string, string>} tags
 * @returns {PutRequestTags}
 */
function parsePutRequestTags(tags) {
  // temporarily support old kebab-case tag name for solanaCluster tag
  const solanaCluster = requiredTag(tags, 'solanaCluster', 'solana-cluster')
  const mintingAgent = tagWithDefault(tags, 'mintingAgent', 'unknown')
  const agentVersion = stringOrNothing(tags, 'agentVersion')

  return { solanaCluster, mintingAgent, agentVersion }
}

/**
 * Returns the value of the tag with a given name, throwing if it's not present or has a
 * non-string value.
 *
 * @param {Record<string, string>} tags a string map of tag names to values
 * @param {string} name the name of the tag we want
 * @param {string} [alternateName] an alternate name to try (only if preferred name is not present)
 *
 * @returns {string} the tag value
 * @throws {ErrorInvalidMetaplexToken} if no tag with the given name exists in tags object, or if a tag exists with a non-string value
 */
function requiredTag(tags, name, alternateName) {
  let value = stringOrNothing(tags, name)
  if (value == null && alternateName) {
    value = stringOrNothing(tags, alternateName)
  }

  if (value == null) {
    throw new ErrorInvalidMetaplexToken(`"${name}" tag not present in payload`)
  }
  return value
}

/**
 * What has it got in its pocketses?
 * Just a getter that makes sure tag values are actually strings, if they're present at all.
 *
 * @param {Record<string, string>} tags a string map of tag names to values
 * @param {string} name the name of the tag we want
 *
 * @returns {string|undefined} the tag value, if it exists
 * @throws {ErrorInvalidMetaplexToken} if a tag value is present but has a non-string value
 */
function stringOrNothing(tags, name) {
  if (name in tags && typeof tags[name] !== 'string') {
    throw new ErrorInvalidMetaplexToken(
      `"${name}" tag must have a string value if present`
    )
  }
  return tags[name]
}

/**
 * Returns the value of the given tag, or a default if the tag is missing.
 *
 * @param {Record<string, string>} tags a string map of tag names to values
 * @param {string} name the name of the tag we want
 * @param {string} defaultValue a default value to return if the tag is not present
 * @throws {ErrorInvalidMetaplexToken} if a tag value is present but has a non-string value
 */
function tagWithDefault(tags, name, defaultValue) {
  return stringOrNothing(tags, name) || defaultValue
}
