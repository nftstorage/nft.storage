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

export async function verify(token, type = 'magic', data = {}) {
  const res = await fetch(API + '/api/login', {
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
  const isLoggedIn = await magic.user.isLoggedIn()
  if (isLoggedIn) {
    const meta = await magic.user.getMetadata()
    const idToken = await magic.user.getIdToken()
    return {
      ...meta,
      idToken,
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
  const data = await verify(didToken)
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
  const data = await verify(idToken)
  return { ...data, idToken }
}

export async function redirectSocial() {
  let result = await getMagic().oauth.getRedirectResult()
  const data = await verify(result.magic.idToken, 'github', result)

  return { ...data, idToken: result.magic.idToken }
}
