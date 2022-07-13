import { getServiceConfig } from '../../../src/config'
import { signJWT } from '../../../src/utils/jwt'
import {
  createTestUser,
  createTestUserWithFixedToken,
  getCluster,
} from './helpers'

const config = getServiceConfig()

addEventListener('fetch', (event) => {
  event.respondWith(dispatch(event))
})

/**
 *
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
async function dispatch(event) {
  const url = new URL(event.request.url)
  // console.log('got fetch event in test worker:', url.pathname)

  switch (url.pathname) {
    case '/create-user':
      return handleCreateUser(event)
    case '/sign-jwt':
      return handleSignJWT(event)
    case '/cluster-status':
      return handleClusterGetStatus(event)
    default:
      return errorResponse(404, 'no handler for requested path ' + url.pathname)
  }
}

/**
 *
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
async function handleCreateUser(event) {
  let userInfo
  try {
    userInfo = await event.request.json()
  } catch (_err) {
    // allow empty body
  }

  if (userInfo && userInfo.token) {
    const user = await createTestUserWithFixedToken(config, userInfo)
    return new Response(JSON.stringify(user))
  }

  const user = await createTestUser(config, userInfo)
  return new Response(JSON.stringify(user))
}

/**
 *
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
async function handleSignJWT(event) {
  const input = await event.request.json()
  if (!('payload' in input) || !('secret' in input)) {
    return errorResponse(
      400,
      'invalid input: must contain "payload" and "secret"'
    )
  }
  const { payload, secret } = input
  const token = await signJWT(payload, secret)
  return new Response(JSON.stringify({ token }))
}

/**
 *
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
async function handleClusterGetStatus(event) {
  const input = await event.request.json()
  if (!('cid' in input)) {
    return errorResponse(400, 'invalid input: must contain "cid"')
  }
  const { cid } = input
  const cluster = getCluster(config)
  const status = await cluster.status(cid)
  return new Response(JSON.stringify({ status }))
}

/**
 *
 * @param {number} status
 * @param {string} message
 */
function errorResponse(status, message) {
  return new Response(JSON.stringify({ status, error: { message } }), {
    status,
    statusText: message,
  })
}
