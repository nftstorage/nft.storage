import { cookieKey, stores, isDebug } from '../constants.js'
import cookie from 'cookie'
import { getAssetFromKV } from '@cloudflare/kv-asset-handler'
import { parseJWT, verifyJWT } from './jwt.js'
import { getUser, matchToken } from '../models/users.js'
import { HTTPError } from '../errors.js'

/**
 * @typedef {import('../models/users').User} User
 */

export function hydrateState(state = {}) {
  return {
    /**
     *
     * @param {any} head
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
  const mime = response.headers.get('content-type')

  switch (mime) {
    case 'text/css; charset=utf-8':
    case 'application/javascript; charset=utf-8':
      response.headers.set('Cache-Control', 'public,max-age=31536000,immutable')
      break
    case 'font/woff2':
    case 'image/svg+xml':
    case 'image/vnd.microsoft.icon':
    case 'image/png':
    case 'application/manifest+json':
      response.headers.set(
        'Cache-Control',
        'public,max-age=600,stale-while-revalidate=3600'
      )
      break
    case 'text/html; charset=utf-8':
      response.headers.set('Cache-Control', 'no-cache')
      break
    default:
      break
  }

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
          new Request(`${new URL(req.url).origin}/404/index.html`, req),
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
 * @param {FetchEvent} event
 * @param { 'session' | 'token' | 'both' } mode
 * @returns {Promise<{ok:false, error:HTTPError}|{ok:true, user:User, tokenName: string}>}
 */
export async function verifyToken(event, mode = 'both') {
  const auth = event.request.headers.get('Authorization') || ''
  const [, token] = auth.match(/Bearer (.+)/) || []
  if (mode !== 'session' && token) {
    const isValid = await verifyJWT(token)
    if (isValid) {
      const decoded = parseJWT(token)
      const user = await getUser(decoded.sub)
      const tokenName = matchToken(user, token)
      if (typeof tokenName === 'string') {
        return { ok: true, user, tokenName }
      } else {
        return {
          ok: false,
          error: new HTTPError('Expired or deleted token', 403),
        }
      }
    } else {
      return { ok: false, error: new HTTPError('Token is not valid', 403) }
    }
  }

  const cookieHeader = event.request.headers.get('Cookie') || ''
  const cookies = cookie.parse(cookieHeader)

  if (mode !== 'token' && cookies[cookieKey]) {
    const kvData = await stores.auth.get(cookies[cookieKey])
    if (kvData) {
      const token = JSON.parse(kvData)['id_token']
      const decoded = parseJWT(token)
      const user = await getUser(decoded.sub)
      return { ok: true, user, tokenName: 'session' }
    } else {
      return { ok: false, error: new HTTPError('Session expired', 403) }
    }
  }

  return { ok: false, error: new HTTPError('Unauthorized', 401) }
}

/**
 * @template T
 * @param {() => Promise<T | void>} fn
 * @param {string} label
 * @returns {Promise<T | void>}
 */
export async function timed(fn, label) {
  console.log(`START: ${label}`)
  console.time(`END: ${label}`)
  try {
    const res = await fn()
    return res
  } finally {
    console.timeEnd(`END: ${label}`)
  }
}
