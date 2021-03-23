import { Router } from './utils/router.js'
import { homepage } from './routes/homepage.js'
import { auth } from './routes/auth.js'
import { logout } from './routes/logout.js'
import { notFound } from './utils/utils.js'
import { cors, postCors } from './routes/cors.js'
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
import { HTTPError } from './errors.js'

const r = new Router({
  onError(req, err) {
    return HTTPError.respond(err)
  },
})

// Site
r.add('get', '/', homepage)
r.add('get', '/auth', auth)
r.add('get', '/logout', logout)
r.add('get', '/manage', manage)
r.add('get', '/files', files)
r.add('get', '/new-key', newKey)
r.add('get', '/new-file', newFile)

// Public API
r.add('options', '/api/*', cors)
r.add('post', '/api/upload', upload, [postCors])
r.add('get', '/api', list, [postCors])
r.add('get', '/api/:cid', status, [postCors])
r.add('delete', '/api/:cid', remove, [postCors])

// Private API
r.add('get', '/api/internal/tokens', tokensList)
r.add('post', '/api/internal/tokens', tokensCreate)
r.add('delete', '/api/internal/tokens', tokensDelete)

r.add('all', '*', notFound)
addEventListener('fetch', r.listen.bind(r))
