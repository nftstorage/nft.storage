import { Magic } from '@magic-sdk/admin'
import { getServiceConfig } from '../config.js'
import {
  HTTPError,
  ErrorUserNotFound,
  ErrorTokenNotFound,
  ErrorUnauthenticated,
  ErrorTokenBlocked,
  ErrorAgentDIDRequired,
} from '../errors.js'
import { parseJWT, verifyJWT } from './jwt.js'
import * as Ucan from 'ucan-storage/ucan-storage'

const { MAGIC_SECRET_KEY, SALT } = getServiceConfig()
export const magic = new Magic(MAGIC_SECRET_KEY)

/**
 *
 * @param {import('./db-client-types.js').UserOutput} user
 * @returns
 */
function filterDeletedKeys(user) {
  return {
    ...user,
    keys: user.keys.filter((k) => k.deleted_at === null),
  }
}

/**
 * Validate auth
 *
 * @param {FetchEvent} event
 * @param {import('../bindings').RouteContext} ctx
 * @param {import('../bindings').AuthOptions} [options]
 * @returns {Promise<import('../bindings').Auth>}
 */
export async function validate(event, { log, db, ucanService }, options) {
  const auth = event.request.headers.get('Authorization') || ''
  const token = magic.utils.parseAuthorizationHeader(auth)

  if (options?.checkUcan && Ucan.isUcan(token)) {
    const agentDID = event.request.headers.get('x-agent-did') || ''
    if (!agentDID.startsWith('did:key:')) {
      throw new ErrorAgentDIDRequired()
    }

    const { root, cap, issuer } = await ucanService.validateFromCaps(token)
    if (issuer !== agentDID) {
      throw new ErrorAgentDIDRequired(
        `Expected x-agent-did to be UCAN issuer DID: ${issuer}, instead got ${agentDID}`
      )
    }
    const user = await db.getUser(root.audience())
    if (user) {
      log.setUser({ id: user.id })
      return {
        user: filterDeletedKeys(user),
        db,
        ucan: { token, root: root._decoded.payload, cap },
        type: 'ucan',
      }
    } else {
      throw new ErrorTokenNotFound()
    }
  }

  // validate access tokens
  if (await verifyJWT(token, SALT)) {
    const decoded = parseJWT(token)
    const user = await db.getUser(decoded.sub)

    if (user) {
      const key = user.keys.find((k) => k?.secret === token)
      if (key) {
        if (key.deleted_at) {
          const isBlocked = await db.checkIfTokenBlocked(key)

          if (isBlocked) {
            throw new ErrorTokenBlocked()
          } else {
            throw new ErrorUserNotFound()
          }
        }

        log.setUser({
          id: user.id,
        })
        return {
          user: filterDeletedKeys(user),
          key,
          db,
          type: 'key',
        }
      } else {
        throw new ErrorTokenNotFound()
      }
    } else {
      throw new ErrorUserNotFound()
    }
  } else {
    // validate magic.link tokens
    magic.token.validate(token)
    const [proof, claim] = magic.token.decode(token)

    const user = await db.getUser(claim.iss)
    if (user) {
      log.setUser({
        id: user.id,
      })

      return {
        user: filterDeletedKeys(user),
        db,
        type: 'session',
      }
    } else {
      throw new ErrorUserNotFound()
    }
  }
}

/**
 *
 * @param {FetchEvent} event
 * @param {any} data
 * @param {import('../bindings').RouteContext} ctx
 */
export async function loginOrRegister(event, data, { db }) {
  const auth = event.request.headers.get('Authorization') || ''
  const token = magic.utils.parseAuthorizationHeader(auth)

  magic.token.validate(token)
  const metadata = await magic.users.getMetadataByToken(token)
  if (metadata.issuer) {
    const parsed =
      data.type === 'github'
        ? await parseGithub(data.data, metadata)
        : parseMagic(metadata)

    const upsert = await db.upsertUser({
      email: parsed.email,
      github_id: parsed.sub,
      magic_link_id: parsed.issuer,
      name: parsed.name,
      public_address: parsed.publicAddress,
      picture: parsed.picture,
      github: parsed.github,
    })

    if (upsert.error) {
      // @ts-ignore
      throw new Error(`DB error: ${JSON.stringify(upsert.error)}`)
    }

    if (upsert.data === null) {
      throw new Error('Could not retrieve user from db.')
    }

    const user = upsert.data[0]

    return { user, tokenName: 'session' }
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
 * @returns {Promise<import('../bindings.js').User>}
 */
async function parseGithub(data, magicMetadata) {
  const sub = `github|${data.oauth.userHandle}`
  /** @type {Record<string, string>} */
  let tokens = {}

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
 * @returns {import('../bindings.js').User}
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

/**
 * Verifies that the auth object exists on context, and if not then it throws an ErrorUnauthenticated.
 *
 * @param {import('../bindings').RouteContext} ctx
 * @returns {import('../bindings').Auth}
 * @throws {ErrorUnauthenticated}
 */
export function checkAuth(ctx) {
  if (typeof ctx.auth !== 'object') {
    throw new ErrorUnauthenticated()
  }

  return ctx.auth
}
