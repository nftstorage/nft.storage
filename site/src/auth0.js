import cookie from 'cookie'
import { auth0, cookieKey, stores } from './constants'
import { generateStateParam } from './utils'
import { parseJWT } from './jwt'

/**
 * Create redirect URL
 *
 * @param {string} state
 */
function redirectUrl(state) {
  const params = new URLSearchParams()
  params.set('response_type', 'code')
  params.set('client_id', auth0.clientId)
  params.set('redirect_uri', auth0.callbackUrl)
  params.set('scope', 'openid profile email')
  params.set('state', state)
  return `https://${auth0.domain}/authorize?${params.toString()}`
}

/**
 * Authorize User
 *
 * @param {FetchEvent} event
 * @returns
 */
export const authorize = async (event) => {
  const authorization = await verify(event)
  if (authorization.accessToken) {
    return [true, { authorization }]
  } else {
    const state = await generateStateParam()
    return [false, { redirectUrl: redirectUrl(state) }]
  }
}

/**
 * Verify our application’s users based on the Cookie field and make any authorization information * * available as part of the authorization object
 *
 * @param {FetchEvent} event
 * @returns
 */
const verify = async (event) => {
  const cookieHeader = event.request.headers.get('Cookie')
  if (cookieHeader && cookieHeader.includes(cookieKey)) {
    const cookies = cookie.parse(cookieHeader)
    if (!cookies[cookieKey]) {
      return {}
    }
    const sub = cookies[cookieKey]
    const kvData = await stores.auth.get(sub)
    if (!kvData) {
      console.error('Unable to find authorization data')
      return {}
    }

    let kvStored
    try {
      kvStored = JSON.parse(kvData)
    } catch (err) {
      console.error('Unable to parse auth information from Workers KV')
      return {}
    }

    const { access_token: accessToken, id_token: idToken } = kvStored
    const userInfo = parseJWT(idToken)
    return { accessToken, idToken, userInfo }
  }
  return {}
}

/**
 *
 * @param {string} user
 * @returns
 */
export async function getUser(user) {
  const out = await fetch(`https://${auth0.domain}/api/v2/users/${user}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${manageToken}`,
      'content-type': 'application/json',
    },
  })
  return await out.json()
}
