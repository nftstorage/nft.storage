import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'

const API = process.env.NEXT_PUBLIC_API
/** @type {import('magic-sdk').Magic} */
let magic = null

export function getMagic() {
  if (typeof document === 'undefined') {
    return undefined // static export
  }

  if (magic) {
    return magic
  }
  magic = new Magic(process.env.NEXT_PUBLIC_MAGIC, {
    extensions: [new OAuthExtension()],
  })

  return magic
}

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
  const magic = getMagic()
  let isLoggedIn
  if (magic) {
    isLoggedIn = await magic.user.isLoggedIn()
  }
  if (isLoggedIn) {
    // const meta = await magic.user.getMetadata()
    return {
      ...{ user: 'user' }, // we dont actually need the user info
    }
  } else {
    return undefined
  }
}

export async function loginEmail(email) {
  const didToken = await magic.auth.loginWithMagicLink({
    email: email,
    redirectURI: new URL('/callback', window.location.origin).href,
  })
  const data = await login(didToken)
  return data
}

export async function loginSocial(provider) {
  await getMagic().oauth.loginWithRedirect({
    provider,
    redirectURI: new URL('/callback', window.location.origin).href,
  })
}
export async function redirectMagic() {
  const idToken = await getMagic().auth.loginWithCredential()
  const data = await login(idToken)
  return { ...data, idToken }
}

export async function redirectSocial() {
  const result = await getMagic().oauth.getRedirectResult()
  const data = await login(result.magic.idToken, 'github', result)

  return { ...data, idToken: result.magic.idToken }
}
