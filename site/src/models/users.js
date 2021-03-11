import { signJWT } from '../utils/jwt.js'

const users = USERS

/**
 * @typedef {{
 *   token: string
 *   sub: string
 *   nickname?: string
 *   name?: string
 *   email?: string
 *   picture?: string
 * }} User
 *
 * @expample
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
 * @param {Partial<User> & { sub: string } } newUser
 */
export async function createOrUpdate(newUser) {
  const partialData = {
    sub: newUser.sub,
    nickname: newUser.nickname,
    name: newUser.name,
    email: newUser.email,
    picture: newUser.picture,
  }

  const user = await users.get(newUser.sub)
  if (user === null) {
    const token = await signJWT({
      sub: newUser.sub,
      iss: 'nft-storage',
      iat: Date.now(),
    })
    const data = {
      ...partialData,
      token,
    }
    return await users.put(newUser.sub, JSON.stringify(data))
  }

  const data = {
    ...JSON.parse(user),
    ...partialData,
  }
  return await users.put(newUser.sub, JSON.stringify(data))
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
