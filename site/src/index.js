import { Router } from './utils/router.js'
import { isDebug } from './constants.js'
import { homepage } from './routes/homepage.js'
import { auth } from './routes/auth.js'
import { logout } from './routes/logout.js'
import { notFound, verifyToken } from './utils/utils.js'
import { HTTPError } from './errors.js'
import { cors } from './routes/cors.js'
import { upload } from './routes/upload.js'
import { status } from './routes/status.js'
import { remove } from './routes/delete.js'
import { list } from './routes/list.js'

addEventListener('fetch', (event) => {
  event.respondWith(handleEvent(event))
})

/**
 * Request handler
 *
 * Static (/foo, /foo/bar)
 * Parameter (/:title, /books/:title, /books/:genre/:title)
 * Parameter w/ Suffix (/movies/:title.mp4, /movies/:title.(mp4|mov))
 * Optional Parameters (/:title?, /books/:title?, /books/:genre/:title?)
 * Wildcards (*, /books/*, /books/:genre/*)
 *
 * @see https://github.com/lukeed/regexparam
 * @param {FetchEvent} event
 * @returns
 */
async function handleEvent(event) {
  const r = new Router()

  // Site
  r.get('/', homepage)
  r.get('/auth', auth)
  r.get('/logout', logout)

  // API
  r.options('/api/.*', cors)
  r.post('/api/upload', upload)
  r.get('/api/list', list)
  r.get('/api/status/:cid', status)
  r.delete('/api/delete/.*', remove)
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
