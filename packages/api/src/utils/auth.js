import { Magic } from '@magic-sdk/admin'
import { secrets } from '../constants.js'
import { HTTPError, ErrorUserNotFound, ErrorTokenNotFound } from '../errors.js'
import {
  createOrUpdate,
  getUser,
  matchToken,
  userSafe,
} from '../models/users.js'
import { parseJWT, verifyJWT } from './jwt.js'
import { buildSdk, login } from './fauna'
export const magic = new Magic(secrets.magic)

const fauna = buildSdk()

/**
 * @typedef {import('../models/users').User} User
 */

/**
 * Validate auth
 *
 * @param {FetchEvent} event
 * @param {import('./router.js').RouteContext} ctx
 */
export async function validate(event, { sentry }) {
  const auth = event.request.headers.get('Authorization') || ''
  const token = magic.utils.parseAuthorizationHeader(auth)

  // validate access tokens
  if (await verifyJWT(token, secrets.salt)) {
    const decoded = parseJWT(token)
    const user = await getUser(decoded.sub)
    if (user) {
      const tokenName = matchToken(user, token)
      if (typeof tokenName === 'string') {
        sentry.setUser(userSafe(user))

        // TODO review this!!
        const { sdk, loginOutput } = await login(user.issuer)
        return { user, tokenName, fauna: sdk, login: loginOutput }
      } else {
        throw new ErrorTokenNotFound()
      }
    } else {
      throw new ErrorUserNotFound()
    }
  }

  // validate magic id tokens
  magic.token.validate(token)
  const [proof, claim] = magic.token.decode(token)
  const user = await getUser(claim.iss)
  if (user) {
    sentry.setUser(userSafe(user))
    const { sdk, loginOutput } = await login(user.issuer)
    return { user, tokenName: 'session', fauna: sdk, login: loginOutput }
  } else {
    throw new ErrorUserNotFound()
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

  const tokenData = magic.token.decode(token)
  console.log(JSON.stringify(tokenData, null, 2))
  magic.token.validate(token)
  const metadata = await magic.users.getMetadataByToken(token)
  if (metadata.issuer) {
    const parsed =
      data.type === 'github'
        ? await parseGithub(data.data, metadata)
        : parseMagic(metadata)

    await fauna.createOrUpdateUser({
      input: {
        email: parsed.email,
        issuer: parsed.issuer,
        name: parsed.name,
        publicAddress: parsed.publicAddress,
        sub: parsed.sub,
        picture: parsed.picture,
        github: parsed.github ? parsed.github.userInfo.profile : null,
      },
    })
    const user = await createOrUpdate(parsed)
    return { user: userSafe(user), tokenName: 'session' }
  } else {
    throw new HTTPError(
      'Login or register failed. Issuer could not be fetched.'
    )
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

  const oldUser = await getUser(sub)
  if (oldUser) {
    tokens = oldUser.tokens
  }

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
    throw new HTTPError(
      'Login or register failed. Metadata could not be fetched.'
    )
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
