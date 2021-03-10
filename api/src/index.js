import { Router } from './router'
import { signJWT, verifyJWT, parseJWT } from '../../site/src/jwt'
import { getUser } from '../../site/src/users'

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

/**
 * Routes
 * @param {FetchEvent} event
 * @returns
 */
async function handleRequest(event) {
  const r = new Router()
  // Replace with the appropriate paths and handlers
  //   r.get('.*/bar', () => new Response('responding for /bar'))
  //   r.get('.*/foo', request => handler(request))
  //   r.post('.*/foo.*', request => handler(request))
  //   r.get('/demos/router/foo', request => fetch(request)) // return the response from the origin
  r.get('.*/get-token', () => getToken(event))
  r.get('.*/verify-token', () => verifyToken(event))
  r.get('/', () => new Response('Hello worker!')) // return a default message for the root route

  try {
    return await r.route(event.request)
  } catch (err) {
    console.log('handleRequest -> err', err.stack)
    return new Response(err.message, {
      status: 500,
      statusText: 'internal server error',
      headers: {
        'content-type': 'text/plain',
      },
    })
  }
}

/**
 * Get token
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
async function getToken(event) {
  const url = new URL(event.request.url)
  const sub = url.searchParams.get('sub')
  const body = JSON.stringify({ token: await signJWT({ sub }, 'hello world') })
  return new Response(body, {
    headers: { 'content-type': 'application/json' },
  })
}

/**
 * Get token
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
async function verifyToken(event) {
  const url = new URL(event.request.url)
  const token = url.searchParams.get('token')

  if (token) {
    const isValid = await verifyJWT(token)
    if (isValid) {
      const decoded = parseJWT(token)
      const user = await getUser(decoded.sub)
      return new Response(JSON.stringify(user), {
        headers: { 'content-type': 'application/json' },
      })
    }
    return new Response('token not valid', {
      status: 500,
      statusText: 'internal server error',
      headers: {
        'content-type': 'text/plain',
      },
    })
  }
  return new Response('no token', {
    status: 500,
    statusText: 'internal server error',
    headers: {
      'content-type': 'text/plain',
    },
  })
}
