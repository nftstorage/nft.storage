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
export async function validate(event, ctx, options) {
  ctx.log.time('timeTaken')
  var db = ctx.db
  const auth = event.request.headers.get('Authorization') || ''
  const token = magic.utils.parseAuthorizationHeader(auth)

  if (options?.checkUcan && Ucan.isUcan(token)) {
    const agentDID = event.request.headers.get('x-agent-did') || ''
    if (!agentDID.startsWith('did:key:')) {
      logInfo('validate', 'ErrorAgentDIDRequired', ctx, null, null)
      throw new ErrorAgentDIDRequired()
    }

    const { root, cap, issuer } = await ctx.ucanService.validateFromCaps(token)
    if (issuer !== agentDID) {
      logInfo('validate', 'ErrorAgentDIDRequired', ctx, null, null)
      throw new ErrorAgentDIDRequired(
        `Expected x-agent-did to be UCAN issuer DID: ${issuer}, instead got ${agentDID}`
      )
    }
    ctx.log.time('dbTime')
    const user = await db.getUser(root.audience())
    var dbTime = ctx.log.timeEnd('dbTime')

    if (user) {
      ctx.log.setUser({ id: user.id })
      logInfo('validate', 'Ok', ctx, dbTime, null)

      return {
        user: filterDeletedKeys(user),
        db,
        ucan: { token, root: root._decoded.payload, cap },
        type: 'ucan',
      }
    } else {
      logInfo('validate', 'ErrorTokenNotFound', ctx, null, null)
      throw new ErrorTokenNotFound()
    }
  }

  // validate access tokens
  if (await verifyJWT(token, SALT)) {
    const decoded = parseJWT(token)

    ctx.log.time('dbTime')
    const user = await db.getUser(decoded.sub)
    var dbTime = ctx.log.timeEnd('dbTime')

    if (user) {
      const key = user.keys.find((k) => k?.secret === token)
      if (key) {
        if (key.deleted_at) {
          const isBlocked = await db.checkIfTokenBlocked(key)

          if (isBlocked) {
            logInfo('validate', 'ErrorTokenBlocked', ctx, dbTime, null)
            throw new ErrorTokenBlocked()
          } else {
            logInfo('validate', 'ErrorUserNotFound', ctx, dbTime, null)
            throw new ErrorUserNotFound()
          }
        }

        ctx.log.setUser({
          id: user.id,
        })
        logInfo('validate', 'Ok', ctx, dbTime, null)

        return {
          user: filterDeletedKeys(user),
          key,
          db,
          type: 'key',
        }
      } else {
        logInfo('validate', 'ErrorTokenNotFound', ctx, dbTime, null)
        throw new ErrorTokenNotFound()
      }
    } else {
      logInfo('validate', 'ErrorUserNotFound', ctx, dbTime, null)
      throw new ErrorUserNotFound()
    }
  } else {
    // validate magic.link tokens
    magic.token.validate(token)
    const [proof, claim] = magic.token.decode(token)

    ctx.log.time('dbTime')
    const user = await db.getUser(claim.iss)
    var dbTime = ctx.log.timeEnd('dbTime')

    if (user) {
      ctx.log.setUser({
        id: user.id,
      })

      logInfo('validate', 'Ok', ctx, dbTime, null)

      return {
        user: filterDeletedKeys(user),
        db,
        type: 'session',
      }
    } else {
      logInfo('validate', 'ErrorUserNotFound', ctx, dbTime, null)
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
export async function loginOrRegister(event, data, ctx) {
  ctx.log.time('timeTaken')
  const auth = event.request.headers.get('Authorization') || ''
  const token = magic.utils.parseAuthorizationHeader(auth)

  magic.token.validate(token)
  ctx.log.time('magicTime')
  const metadata = await magic.users.getMetadataByToken(token)
  var magicTime = ctx.log.timeEnd('magicTime')

  if (metadata.issuer) {
    const parsed =
      data.type === 'github'
        ? await parseGithub(data.data, metadata)
        : parseMagic(metadata, ctx)

    ctx.log.time('dbTime')
    const upsert = await ctx.db.upsertUser({
      email: parsed.email,
      github_id: parsed.sub,
      magic_link_id: parsed.issuer,
      name: parsed.name,
      public_address: parsed.publicAddress,
      picture: parsed.picture,
      github: parsed.github,
    })
    var dbTime = ctx.log.timeEnd('dbTime')

    if (upsert.error) {
      logInfo('loginOrRegister', 'UpsertError', ctx, dbTime, magicTime)
      // @ts-ignore
      throw new Error(`DB error: ${JSON.stringify(upsert.error)}`)
    }

    if (upsert.data === null) {
      logInfo('loginOrRegister', 'UpsertDataNull', ctx, dbTime, magicTime)
      throw new Error('Could not retrieve user from db.')
    }

    const user = upsert.data[0]
    logInfo('loginOrRegister', 'Ok', ctx, dbTime, magicTime)
    return { user, tokenName: 'session' }
  } else {
    logInfo('loginOrRegister', 'IssuerError', ctx, null, magicTime)
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
 * @param {import('../bindings').RouteContext} ctx
 * @returns {import('../bindings.js').User}
 */
function parseMagic({ issuer, email, publicAddress }, ctx) {
  if (!issuer || !email || !publicAddress) {
    logInfo('loginOrRegister', 'MetadataError', ctx, null, null)
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

/**
 * @param {string} method
 * @param {string} resultMsg
 * @param {import('../bindings').RouteContext} ctx
 * @param {any} dbTime
 * @param {any} magicTime
 */
function logInfo(method, resultMsg, { log }, dbTime, magicTime) {
  try {
    log.info(
      JSON.stringify({
        magic: {
          timeTaken: log.timeEnd('timeTaken').value,
          dbUserTimeTaken: dbTime != null ? dbTime.value : null,
          magicTimeTaken: magicTime != null ? magicTime.value : null,
          method: method,
          resultMessage: resultMsg,
        },
      })
    )
  } catch (e) {}
}
