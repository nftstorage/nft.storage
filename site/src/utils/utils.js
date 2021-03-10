import { cookieKey, stores, isDebug } from '../constants'
import cookie from 'cookie'
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { parseJWT, verifyJWT } from './jwt'
import { getUser } from '../models/users'
import { HTTPError } from '../errors'

export function hydrateState(state = {}) {
  return {
    /**
     *
     * @param {HTMLHeadElement} head
     */
    element: (head) => {
      const jsonState = JSON.stringify(state)
      const scriptTag = `<script id="edge_state" type="application/json">${jsonState}</script>`
      head.append(scriptTag, { html: true })
    },
  }
}

/**
 * CSRF protection - generate state
 * @returns {Promise<string>}
 */
export async function generateStateParam() {
  const resp = await fetch('https://csprng.xyz/v1/api')
  const { Data: state } = await resp.json()
  await stores.csrf.put(`state-${state}`, 'true', { expirationTtl: 86400 })
  return state
}

/**
 * Logout headers
 *
 * @param {FetchEvent} event
 * @returns
 */
export const logoutHeaders = (event) => {
  const cookieHeader = event.request.headers.get('Cookie')
  if (cookieHeader && cookieHeader.includes(cookieKey)) {
    return {
      headers: {
        'Set-cookie': `${cookieKey}=""; HttpOnly; Secure; SameSite=Lax;`,
      },
    }
  }
  return {}
}

/**
 * @param {FetchEvent} event
 * @param {Partial<import("@cloudflare/kv-asset-handler").Options>} [options]
 */
export async function getAsset(event, options = {}) {
  let defaultOptions = {}
  if (isDebug) {
    // customize caching
    defaultOptions.cacheControl = {
      bypassCache: true,
    }
  }
  // Get page assets
  const page = await getAssetFromKV(event, { ...defaultOptions, ...options })

  // allow headers to be altered
  const response = new Response(page.body, page)

  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'unsafe-url')
  // response.headers.set('Feature-Policy', 'none')

  return response
}

/**
 * Try to serve static assets or the 404 page
 * @param {FetchEvent} event
 */
export async function notFound(event) {
  try {
    const asset = await getAsset(event)
    return asset
  } catch (error) {
    try {
      let notFoundResponse = await getAsset(event, {
        mapRequestToAsset: (req) =>
          new Request(`${new URL(req.url).origin}/404.html`, req),
      })

      return new Response(notFoundResponse.body, {
        ...notFoundResponse,
        status: 404,
      })
    } catch (e) {
      return new Response('404 asset not found', { status: 500 })
    }
  }
}

/**
 *
 * @param {FetchEvent} event
 */
export async function verifyToken(event) {
  let error
  const auth = event.request.headers.get('Authorization') || ''
  const [, token] = auth.match(/Bearer (.+)/) || []
  if (token) {
    const isValid = await verifyJWT(token)
    if (isValid) {
      const decoded = parseJWT(token)
      const user = await getUser(decoded.sub)
      if (user.token === token) {
        return [error, user]
      } else {
        return [new HTTPError('Session expired', 403)]
      }
    } else {
      return [new HTTPError('Token is not valid', 403)]
    }
  }

  const cookieHeader = event.request.headers.get('Cookie') || ''
  const cookies = cookie.parse(cookieHeader)

  if (cookies[cookieKey]) {
    const kvData = await stores.auth.get(cookies[cookieKey])
    if (kvData) {
      const token = JSON.parse(kvData)['id_token']
      const decoded = parseJWT(token)
      const user = await getUser(decoded.sub)
      return [error, user]
    } else {
      return [new HTTPError('Session expired', 403)]
    }
  }

  return [new HTTPError('Unauthorized', 401)]
}

/**
 * @param {ArrayBuffer | Uint8Array | Int8Array | Int16Array | Int32Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView} data
 */
export async function hash(data) {
  const digest = await crypto.subtle.digest({ name: 'SHA-256' }, data)
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
}
