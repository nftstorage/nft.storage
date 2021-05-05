import { Magic } from '@magic-sdk/admin'
import { secrets } from '../constants.js'
const { debug } = require('./debug')
const log = debug('auth')
import { HTTPError } from '../errors.js'
import {
  createOrUpdate,
  getUser,
  matchToken,
  userSafe,
} from '../models/users.js'
import { parseJWT, verifyJWT } from './jwt.js'
export const magic = new Magic(secrets.magic)

/**
 * @typedef {import('../models/users').User} User
 */

/**
 *
 * @param {FetchEvent} event
 */
export async function validate(event) {
  const auth = event.request.headers.get('Authorization') || ''
  if (!auth) {
    throw new HTTPError('Missing auth token', 401)
  }
  const token = magic.utils.parseAuthorizationHeader(auth)
  // validate access tokens
  if (await verifyJWT(token)) {
    const decoded = parseJWT(token)
    const user = await getUser(decoded.sub)
    const tokenName = matchToken(user, token)
    if (typeof tokenName === 'string') {
      return { user, tokenName }
    } else {
      throw new HTTPError('Token is not valid', 403)
    }
  }

  // validate magic id tokens
  try {
    magic.token.validate(token)
    const [proof, claim] = magic.token.decode(token)
    const user = await getUser(claim.iss)
    return { user, tokenName: 'session' }
  } catch (err) {
    log(err)
    throw new HTTPError(err.code, 403)
  }
}

/**
 *
 * @param {FetchEvent} event
 * @param {any} data
 */
export async function loginOrRegister(event, data) {
  const auth = event.request.headers.get('Authorization') || ''
  const token = magic.utils.parseAuthorizationHeader(auth)

  magic.token.validate(token)
  const metadata = await magic.users.getMetadataByToken(token)
  if (metadata.issuer) {
    const parsed =
      data.type === 'github'
        ? await parseGithub(data.data, metadata)
        : parseMagic(metadata)
    const user = await createOrUpdate(parsed)
    return { user: userSafe(user), tokenName: 'session' }
  } else {
    throw new HTTPError('Unauthorized', 401)
  }
}

/**
 *
 * `data` should be of type `import('@magic-ext/oauth').OAuthRedirectResult` but these types arent made for webworker env.
 * @param {any} data
 * @param {import('@magic-sdk/admin').MagicUserMetadata} magicMetadata
 * @returns {Promise<User>}
 */
async function parseGithub(data, magicMetadata) {
  const sub = `github|${data.oauth.userHandle}`
  /** @type {Record<string, string>} */
  let tokens = {}

  try {
    const oldUser = await getUser(sub)
    tokens = oldUser.tokens
  } catch {}

  return {
    sub: `github|${data.oauth.userHandle}`,
    nickname: data.oauth.userInfo.profile
      ? data.oauth.userInfo.profile.replace('https://github.com/', '')
      : '',
    name: data.oauth.userInfo.name || '',
    picture: data.oauth.userInfo.picture || '',
    issuer: magicMetadata.issuer || '',
    email: magicMetadata.email || '',
    publicAddress: magicMetadata.publicAddress || '',
    github: data.oauth,
    tokens,
  }
}

/**
 * @param {import('@magic-sdk/admin').MagicUserMetadata} magicMetadata
 * @returns {User}
 */
function parseMagic({ issuer, email, publicAddress }) {
  if (!issuer || !email || !publicAddress) {
    throw new Error('Invalid metadata')
  }
  const name = email.split('@')[0]
  return {
    sub: issuer,
    nickname: name,
    name: name,
    picture: '',
    email,
    issuer,
    publicAddress,
    tokens: {},
  }
}
