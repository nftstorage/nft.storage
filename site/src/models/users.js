import { signJWT } from '../utils/jwt.js'
import merge from 'merge-options'

const users = USERS

/**
 * @typedef {import('@magic-sdk/admin').MagicUserMetadata} MagicUserMetadata
 * @typedef {import('../bindings').User} User
 * @typedef {import('../bindings').UserSafe} UserSafe
 *
 */

/**
 * New User
 *
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
 * Get User
 *
 * @param {string} issuer
 * @returns {Promise<User>}
 */
export async function getUser(issuer) {
  const user = await users.get(issuer)
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
    sub: user.sub,
    issuer: user.issuer,
    publicAddress: user.publicAddress,
    name: user.name,
    nickname: user.nickname,
    email: user.email,
    picture: user.picture,
  }
}

/**
 * Match a token and returns the token name
 *
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
 * @param {string} issuer
 * @returns {Promise<User>}
 */
export async function tokens(issuer) {
  const user = await users.get(issuer)
  if (user === null) {
    throw new Error('user not found to list tokens')
  }
  return JSON.parse(user).tokens
}

/**
 * Create new token
 *
 * https://tools.ietf.org/html/rfc7519#section-4.1
 *
 * @param {string} issuer
 * @param {string} name
 */
export async function createToken(issuer, name) {
  const user = await getUser(issuer)
  const token = user.tokens[name]

  if (token) {
    throw new Error(`A token with name "${name}" already exists.`)
  }

  user.tokens[name] = await signJWT({
    sub: issuer,
    iss: 'nft-storage',
    iat: Date.now(),
    name: name,
  })
  return await users.put(issuer, JSON.stringify(user))
}

/**
 * Delete new token
 *
 * @param {string} issuer
 * @param {string} name
 */
export async function deleteToken(issuer, name) {
  const user = await getUser(issuer)
  const token = user.tokens[name]

  if (token) {
    delete user.tokens[name]
  }
  return await users.put(issuer, JSON.stringify(user))
}
