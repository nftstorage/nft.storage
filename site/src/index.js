import { Router } from './utils/router.js'
import { isDebug } from './constants.js'
import { homepage } from './routes/homepage.js'
import { auth } from './routes/auth.js'
import { logout } from './routes/logout.js'
import { notFound } from './utils/utils.js'
import { HTTPError } from './errors.js'
import { cors } from './routes/cors.js'
import { upload } from './routes/nfts-upload.js'
import { status } from './routes/nfts-get.js'
import { remove } from './routes/nfts-delete.js'
import { list } from './routes/nfts-list.js'
import { tokensList } from './routes/tokens-list.js'
import { tokensCreate } from './routes/tokens-create.js'
import { tokensDelete } from './routes/tokens-delete.js'
import { manage } from './routes/manage.js'
import { files } from './routes/files.js'
import { newKey } from './routes/new-key.js'
import { newFile } from './routes/new-file.js'

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
  r.get('/manage', manage)
  r.get('/files', files)
  r.get('/new-key', newKey)
  r.get('/new-file', newFile)

  // Public API
  r.options('/api/.*', cors)
  r.post('/api/upload', upload)
  r.get('/api', list)
  r.get('/api/:cid', status)
  r.delete('/api/:cid', remove)

  // Private API
  r.get('/api/internal/tokens', tokensList)
  r.post('/api/internal/tokens', tokensCreate)
  r.delete('/api/internal/tokens', tokensDelete)

  r.all(notFound)

  try {
    return await r.route(event)
  } catch (err) {
    if (isDebug) {
      return HTTPError.respond(err)
    }
    return notFound(event)
  }
}
