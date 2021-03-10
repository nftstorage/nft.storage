import { Router } from './utils/router'
import { isDebug } from './constants'
import { homepage } from './routes/homepage'
import { auth } from './routes/auth'
import { logout } from './routes/logout'
import { notFound, verifyToken } from './utils/utils'
import { HTTPError } from './errors'
import { cors } from './routes/cors'
import { upload } from './routes/upload'

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event))
})

/**
 * Request handler
 *
 * @param {FetchEvent} event
 * @returns
 */
async function handleEvent(event) {
  const r = new Router()
  r.get('/', homepage)
  r.get('/auth', auth)
  r.get('/logout', logout)
  r.options('/api/.*', cors)
  r.get('/api', () => new Response('ping'))
  r.get('/api/error', () => HTTPError.respond(new HTTPError('http error')))
  r.post('/api/upload', upload)
  r.all(notFound)

  try {
    return await r.route(event)
  } catch (err) {
    if (isDebug) {
      console.error(err)
      return new Response(err.message || err.toString(), { status: 500 })
    }
    return notFound(event)
  }
}
