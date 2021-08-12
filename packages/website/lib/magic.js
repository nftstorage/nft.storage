import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import constants from './constants'

const API = constants.API
/** @type {import('magic-sdk').Magic | null} */
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
 */
export async function loginEmail(email) {
  const didToken = await getMagic().auth.loginWithMagicLink({
    email: email,
    redirectURI: new URL('/callback', window.location.origin).href,
  })

  if (didToken) {
    const data = await login(didToken)
    return data
  }

  throw new Error('Login failed.')
}

/**
 * Login with social
 *
 * @param {string} provider
 */
export async function loginSocial(provider) {
  // @ts-ignore - TODO fix Magic extension types
  await getMagic().oauth.loginWithRedirect({
    provider,
    redirectURI: new URL('/callback', window.location.origin).href,
  })
}

export async function redirectMagic() {
  const idToken = await getMagic().auth.loginWithCredential()
  if (idToken) {
    try {
      const data = await login(idToken)
      return { ...data, idToken }
    } catch (err) {
      await getMagic().user.logout()
      throw err
    }
  }

  throw new Error('Login failed.')
}

export async function redirectSocial() {
  // @ts-ignore - TODO fix Magic extension types
  const result = await getMagic().oauth.getRedirectResult()
  try {
    const data = await login(result.magic.idToken, 'github', result)
    return { ...data, idToken: result.magic.idToken }
  } catch (err) {
    await getMagic().user.logout()
    throw err
  }
}

// V1 auth methods

/**
 * Login request
 *
 * @param {string} [token]
 */
export async function loginV1(token, type = 'magic', data = {}) {
  const res = await fetch(API + '/v1/login', {
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

/**
 * Login with email
 *
 * @param {string} email
 */
export async function loginEmailV1(email) {
  const didToken = await getMagic().auth.loginWithMagicLink({
    email: email,
    redirectURI: new URL('/v1/callback', window.location.origin).href,
  })

  if (didToken) {
    const data = await loginV1(didToken)
    return data
  }

  throw new Error('Login failed.')
}

/**
 * Login with social
 *
 * @param {string} provider
 */
export async function loginSocialV1(provider) {
  // @ts-ignore - TODO fix Magic extension types
  await getMagic().oauth.loginWithRedirect({
    provider,
    redirectURI: new URL('/v1/callback', window.location.origin).href,
  })
}

export async function redirectMagicV1() {
  const idToken = await getMagic().auth.loginWithCredential()
  if (idToken) {
    try {
      const data = await loginV1(idToken)
      return { ...data, idToken }
    } catch (err) {
      await getMagic().user.logout()
      throw err
    }
  }

  throw new Error('Login failed.')
}

export async function redirectSocialV1() {
  // @ts-ignore - TODO fix Magic extension types
  const result = await getMagic().oauth.getRedirectResult()
  try {
    const data = await loginV1(result.magic.idToken, 'github', result)
    return { ...data, idToken: result.magic.idToken }
  } catch (err) {
    await getMagic().user.logout()
    throw err
  }
}
