import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import constants from './constants'

/**
 * @typedef {import('@magic-sdk/provider').SDKBase} SDKBase
 */

const API = constants.API
/** @type {import('@magic-sdk/provider').InstanceWithExtensions<SDKBase, OAuthExtension[]>| null} */
let magic = null

export function getMagic() {
  if (magic) {
    return magic
  }
  magic = new Magic(constants.MAGIC_TOKEN, {
    extensions: [new OAuthExtension()],
  })

  return magic
}

/**
 * Login request
 *
 * @param {string} [token]
 */
export async function login(token, type = 'magic', data = {}) {
  const res = await fetch(API + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
    body: JSON.stringify({
      type,
      data,
    }),
  })
  const body = await res.json()

  if (body.ok) {
    return body.value
  } else {
    throw new Error(body.error.message)
  }
}

export async function isLoggedIn() {
  try {
    return await getMagic().user.getMetadata()
  } catch {
    // do nothing
  }
}

/**
 * Login with email
 *
 * @param {string} email
 */
export async function loginEmail(email) {
  const didToken = await getMagic().auth.loginWithMagicLink({
    email: email,
    redirectURI: new URL('/callback', window.location.origin).href,
  })

  if (didToken) {
    const data = await login(didToken, 'email')
    return data
  }

  throw new Error('Login failed.')
}

/**
 * Login with social
 *
 * @param {import('@magic-ext/oauth').OAuthProvider} provider
 */
export async function loginSocial(provider) {
  await getMagic().oauth.loginWithRedirect({
    provider,
    redirectURI: new URL('/callback', window.location.origin).href,
  })
}

/**
 * Redirect with magic email
 */
export async function redirectMagic() {
  const idToken = await getMagic().auth.loginWithCredential()
  if (idToken) {
    try {
      const data = await login(idToken, 'email')
      return { ...data, idToken }
    } catch (err) {
      await getMagic().user.logout()
      throw err
    }
  }

  throw new Error('Login failed.')
}

/**
 * Redirect with github
 */
export async function redirectSocial() {
  const result = await getMagic().oauth.getRedirectResult()
  try {
    const data = await login(result.magic.idToken, 'github', result)
    return { ...data, idToken: result.magic.idToken }
  } catch (err) {
    await getMagic().user.logout()
    throw err
  }
}
