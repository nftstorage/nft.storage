import { signJWT } from '../utils/jwt.js'
import merge from 'merge-options'

const users = USERS

/**
 * @typedef {import('@magic-sdk/admin').MagicUserMetadata} MagicUserMetadata
 * @typedef {import('../bindings').User} User
 * @typedef {import('../bindings').UserSafe} UserSafe
 *
 * @example
 * ```json
 * {
 *   "nickname":"hugomrdias",
 *   "name":"Hugo Dias",
 *   "picture":"https://avatars.githubusercontent.com/u/314190?v=4",
 *   "updated_at":"2021-03-09T20:47:39.307Z",
 *   "email":"hugomrdias@gmail.com",
 *   "email_verified":true,"iss":"https://hugomrdias.eu.auth0.com/",
 *   "sub":"github|314190",
 *   "aud":"HPc0iTCaRYxOSQv5mW9i4Qguzw7mxhLP",
 *   "iat":1615322859,
 *   "exp":1615358859
 * }
 * ```
 */

// https://tools.ietf.org/html/rfc7519#section-4.1
/**
 * @param {User} newUser
 * @return {Promise<User>}
 */
export async function createOrUpdate(newUser) {
  const user = await users.get(newUser.issuer)
  if (user === null) {
    await users.put(newUser.issuer, JSON.stringify(newUser))
    return newUser
  }

  const data = merge(JSON.parse(user), newUser)
  await users.put(newUser.issuer, JSON.stringify(data))
  return data
}

/**
 * @param {string} sub
 * @returns {Promise<User>}
 */
export async function getUser(sub) {
  const user = await users.get(sub)
  if (user === null) {
    throw new Error('user not found')
  }
  return JSON.parse(user)
}

/**
 * Remove critical data from the user object
 *
 * @param {User} user
 * @returns {UserSafe}
 */
export function userSafe(user) {
  return {
    name: user.name,
    sub: user.sub,
    nickname: user.nickname,
    email: user.email,
    picture: user.picture,
    issuer: user.issuer,
    publicAddress: user.publicAddress,
  }
}

/**
 * Match a token and returns the token name
 * @param {User} user
 * @param {string} token
 */
export function matchToken(user, token) {
  for (const key in user.tokens) {
    const value = user.tokens[key]
    if (token === value) {
      return key
    }
  }

  return false
}

/**
 * List user tokens
 *
 * @param {string} sub
 * @returns {Promise<User>}
 */
export async function tokens(sub) {
  const user = await users.get(sub)
  if (user === null) {
    throw new Error('user not found')
  }
  return JSON.parse(user).tokens
}

/**
 * Create new token
 *
 * @param {string} sub
 * @param {string} name
 */
export async function createToken(sub, name) {
  const user = await getUser(sub)
  const token = user.tokens[name]

  if (token) {
    throw new Error(`A token with name "${name}" already exists.`)
  }
  user.tokens[name] = await signJWT({
    sub: sub,
    iss: 'nft-storage',
    iat: Date.now(),
    name: name,
  })
  return await users.put(sub, JSON.stringify(user))
}

/**
 * Delete new token
 *
 * @param {string} sub
 * @param {string} name
 */
export async function deleteToken(sub, name) {
  const user = await getUser(sub)
  const token = user.tokens[name]

  if (token) {
    delete user.tokens[name]
  }
  return await users.put(sub, JSON.stringify(user))
}
