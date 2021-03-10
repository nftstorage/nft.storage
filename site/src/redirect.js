import { auth0, cookieKey, stores } from './constants'
import { parseJWT } from './jwt'
import { createOrUpdate } from './users'

/**
 * Parse the incoming URL, and pass the code login parameter to exchangeCode. We’ll also check for a state parameter, which we’ll use to prevent CSRF attacks. This state parameter should be matched to a known key in KV, indicating that the authorization request is valid
 *
 * @param {FetchEvent} event
 * @returns
 */
export const handleRedirect = async (event) => {
  const url = new URL(event.request.url)

  const state = url.searchParams.get('state')
  if (!state) {
    return null
  }

  const storedState = await stores.csrf.get(`state-${state}`)
  if (!storedState) {
    return null
  }

  const code = url.searchParams.get('code')
  if (code) {
    return exchangeCode(code)
  }
  return {}
}

/**
 * Take the code parameter, and make a request back to Auth0, exchanging it for an access token
 * @param {null | string} code
 * @returns
 */
const exchangeCode = async (code) => {
  const body = JSON.stringify({
    grant_type: 'authorization_code',
    client_id: auth0.clientId,
    client_secret: auth0.clientSecret,
    code,
    redirect_uri: auth0.callbackUrl,
  })

  // We’ll define persistAuth in the next section
  return persistAuth(
    await fetch('https://' + auth0.domain + '/oauth/token', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body,
    })
  )
}

/**
 * Persisting authorization data in Workers KV
 *
 * @param {Response} exchange
 */
const persistAuth = async (exchange) => {
  const body = await exchange.json()

  if (body.error) {
    throw new Error(body.error)
  }

  const decoded = parseJWT(body.id_token)
  const validToken = validateToken(decoded)
  if (!validToken) {
    return { status: 401 }
  }

  const text = new TextEncoder().encode(`${SALT}-${decoded.sub}`)
  const digest = await crypto.subtle.digest({ name: 'SHA-256' }, text)
  const digestArray = new Uint8Array(digest)
  const id = btoa(String.fromCharCode.apply(null, digestArray))

  await stores.auth.put(id, JSON.stringify(body))
  await createOrUpdate(decoded)

  // Expire date "now" plus 1 day
  const date = new Date()
  date.setDate(date.getDate() + 1)

  const headers = {
    Location: '/',
    'Set-cookie': `${cookieKey}=${id}; Secure; HttpOnly; SameSite=Lax; Expires=${date.toUTCString()}`,
  }

  return { headers, status: 302 }
}

/**
 * Validate token object
 *
 * @param {{ iss: string; aud: string; exp: number; iat: number; } } token
 * @returns
 */
const validateToken = (token) => {
  try {
    const dateInSecs = (/** @type {Date} */ d) => Math.ceil(Number(d) / 1000)
    const date = new Date()

    let iss = token.iss

    // ISS can include a trailing slash but should otherwise be identical to
    // the AUTH0_DOMAIN, so we should remove the trailing slash if it exists
    iss = iss.endsWith('/') ? iss.slice(0, -1) : iss

    if (iss !== 'https://' + auth0.domain) {
      throw new Error(
        `Token iss value (${iss}) doesn’t match AUTH0_DOMAIN (${
          'https://' + auth0.domain
        })`
      )
    }

    if (token.aud !== auth0.clientId) {
      throw new Error(
        `Token aud value (${token.aud}) doesn’t match AUTH0_CLIENT_ID (${auth0.clientId})`
      )
    }

    if (token.exp < dateInSecs(date)) {
      throw new Error(`Token exp value is before current time`)
    }

    // Token should have been issued within the last day
    date.setDate(date.getDate() - 1)
    if (token.iat < dateInSecs(date)) {
      throw new Error(`Token was issued before one day ago and is now invalid`)
    }

    return true
  } catch (err) {
    console.log(err.message)
    return false
  }
}
