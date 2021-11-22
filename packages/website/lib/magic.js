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
 * @param {string} [version]
 */
export async function login(token, type = 'magic', data = {}, version = '') {
  const loginURL = version ? `/v${version}/login` : '/login'
  const res = await fetch(API + loginURL, {
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
  const isLoggedIn = await getMagic().user.isLoggedIn()
  if (isLoggedIn) {
    const meta = await getMagic().user.getMetadata()
    return {
      ...meta, // we dont actually need the user info
    }
  } else {
    return undefined
  }
}

/**
 * Login with email
 *
 * @param {string} email
 * @param {string} version
 */
export async function loginEmail(email, version) {
  const callback = version === '0' ? '/callback-v0' : '/callback'
  const didToken = await getMagic().auth.loginWithMagicLink({
    email: email,
    redirectURI: new URL(callback, window.location.origin).href,
  })

  if (didToken) {
    const data = await login(didToken, 'email', undefined, version)
    return data
  }

  throw new Error('Login failed.')
}

/**
 * Login with social
 *
 * @param {import('@magic-ext/oauth').OAuthProvider} provider
 * @param {string} version
 */
export async function loginSocial(provider, version) {
  const callback = version === '0' ? '/callback-v0' : '/callback'

  // @ts-ignore - TODO fix Magic extension types
  await getMagic().oauth.loginWithRedirect({
    provider,
    redirectURI: new URL(callback, window.location.origin).href,
  })
}

/**
 * @param {string} [version]
 */
export async function redirectMagic(version = '') {
  const idToken = await getMagic().auth.loginWithCredential()
  if (idToken) {
    try {
      const data = await login(idToken, 'email', undefined, version)
      return { ...data, idToken }
    } catch (err) {
      await getMagic().user.logout()
      throw err
    }
  }

  throw new Error('Login failed.')
}

/**
 * @param {string} [version]
 */
export async function redirectSocial(version = '') {
  // @ts-ignore - TODO fix Magic extension types
  const result = await getMagic().oauth.getRedirectResult()
  try {
    const data = await login(result.magic.idToken, 'github', result, version)
    return { ...data, idToken: result.magic.idToken }
  } catch (err) {
    await getMagic().user.logout()
    throw err
  }
}
