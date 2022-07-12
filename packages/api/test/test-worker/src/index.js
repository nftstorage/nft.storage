import { getServiceConfig } from '../../../src/config'
import { signJWT } from '../../../src/utils/jwt'
import { createTestUser, createTestUserWithFixedToken } from './helpers'

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
    default:
      return new Response('no handler for requested path ' + url.pathname, {
        status: 404,
      })
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
    return new Response('invalid input: must contain "payload" and "secret"', {
      status: 400,
    })
  }
  const { payload, secret } = input
  const token = await signJWT(payload, secret)
  return new Response(JSON.stringify({ token }))
}
