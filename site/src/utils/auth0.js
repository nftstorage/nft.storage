import cookie from 'cookie'
import { auth0, cookieKey, stores } from '../constants.js'
import { generateStateParam } from './utils.js'
import { parseJWT } from './jwt.js'

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
 * @returns {Promise<{ok:true,value:Authorization}|{ok:false, error:{redirectUrl: string}}>}
 */
export const authorize = async (event) => {
  const authorization = await verify(event)
  if (authorization) {
    return { ok: true, value: authorization }
  } else {
    const state = await generateStateParam()
    return { ok: false, error: { redirectUrl: redirectUrl(state) } }
  }
}

/**
 * @typedef {Object} Authorization
 * @property {string} accessToken
 * @property {string} idToken
 * @property {import('./jwt').JWT} userInfo
 *
 * Verify our application’s users based on the Cookie field and make any authorization information * * available as part of the authorization object
 *
 * @param {FetchEvent} event
 */
const verify = async (event) => {
  const cookieHeader = event.request.headers.get('Cookie')
  if (cookieHeader && cookieHeader.includes(cookieKey)) {
    const cookies = cookie.parse(cookieHeader)
    if (!cookies[cookieKey]) {
      return null
    }
    const sub = cookies[cookieKey]
    const kvData = await stores.auth.get(sub)
    if (!kvData) {
      console.error('Unable to find authorization data')
      return null
    }

    /** @type {{id_token:string, access_token:string}} */
    let kvStored
    try {
      kvStored = JSON.parse(kvData)
    } catch (err) {
      console.error('Unable to parse auth information from Workers KV')
      return null
    }

    const { access_token: accessToken, id_token: idToken } = kvStored
    const userInfo = parseJWT(idToken)
    return { accessToken, idToken, userInfo }
  }
  return null
}
