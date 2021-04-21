import { Magic } from '@magic-sdk/admin'
import { MAGIC_SECRET_KEY } from '../constants.js'

import { HTTPError } from '../errors.js'
import {
  createOrUpdate,
  getUser,
  matchToken,
  userSafe,
} from '../models/users.js'
import { parseJWT, verifyJWT } from './jwt.js'
export const magic = new Magic(MAGIC_SECRET_KEY)

/**
 * @typedef {import('../models/users').User} User
 */

/**
 *
 * @param {FetchEvent} event
 */
export async function validate(event) {
  const auth = event.request.headers.get('Authorization') || ''
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
  magic.token.validate(token)
  const metadata = await magic.users.getMetadataByToken(token)
  if (metadata.issuer) {
    const user = await getUser(metadata.issuer)
    return { user, tokenName: 'session' }
  } else {
    throw new HTTPError('Unauthorized', 401)
  }
}

/**
 *
 * @param {FetchEvent} event
 * @param {any} data
 */
export async function verify(event, data) {
  const auth = event.request.headers.get('Authorization') || ''
  const token = magic.utils.parseAuthorizationHeader(auth)

  magic.token.validate(token)
  const metadata = await magic.users.getMetadataByToken(token)
  if (metadata.issuer) {
    const parsed =
      data.type === 'github'
        ? await parseGithub(data.data, metadata)
        : parseMagic(metadata)
    await createOrUpdate(parsed)
    const user = await getUser(metadata.issuer)
    return { user: userSafe(user), tokenName: 'session' }
  } else {
    throw new HTTPError('Unauthorized', 401)
  }
}

/**
 *
 * @param {*} data
 * @param {import('@magic-sdk/admin').MagicUserMetadata} magicMetadata
 * @returns {Promise<User>}
 */
async function parseGithub(data, magicMetadata) {
  const sub = `github|${data.oauth.userHandle}`
  /** @type {Record<string, string>} */
  let tokens = {}
  const oldUser = await getUser(sub)
  if (oldUser) {
    tokens = oldUser.tokens
  }
  return {
    sub: `github|${data.oauth.userHandle}`,
    nickname: data.oauth.userInfo.profile.replace('https://github.com/', ''),
    name: data.oauth.userInfo.name,
    picture: data.oauth.userInfo.picture,
    issuer: magicMetadata.issuer ? magicMetadata.issuer : '',
    email: magicMetadata.email ? magicMetadata.email : '',
    publicAddress: magicMetadata.publicAddress
      ? magicMetadata.publicAddress
      : '',
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
  return {
    sub: issuer,
    nickname: email ? email.split('@')[0] : '',
    name: email ? email.split('@')[0] : '',
    picture: '',
    email,
    issuer,
    publicAddress,
    tokens: {},
  }
}
