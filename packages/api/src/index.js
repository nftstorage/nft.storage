import { Router } from './utils/router.js'
import { notFound } from './utils/utils.js'
import { HTTPError } from './errors.js'
import { cors, postCors } from './routes/cors.js'
import { check } from './routes/nfts-check.js'
import { upload } from './routes/nfts-upload.js'
import { store } from './routes/nfts-store.js'
import { status } from './routes/nfts-get.js'
import { remove } from './routes/nfts-delete.js'
import { list } from './routes/nfts-list.js'
import { tokensList } from './routes/tokens-list.js'
import { tokensCreate } from './routes/tokens-create.js'
import { tokensDelete } from './routes/tokens-delete.js'
import { pinsAdd } from './routes/pins-add.js'
import { pinsGet } from './routes/pins-get.js'
import { pinsList } from './routes/pins-list.js'
import { pinsReplace } from './routes/pins-replace.js'
import { pinsDelete } from './routes/pins-delete.js'
import { metrics } from './routes/metrics.js'
import { login } from './routes/login.js'
import { JSONResponse } from './utils/json-response.js'
import { debug } from './utils/debug.js'
import { getNFT } from './routes/get-nft.js'
import { tokensDeleteV1 } from './routes-v1/tokens-delete.js'
import { tokensCreateV1 } from './routes-v1/tokens-create.js'
import { tokensListV1 } from './routes-v1/tokens-list.js'
import { loginV1 } from './routes-v1/login.js'
import { uploadV1 } from './routes-v1/nfts-upload.js'
import { statusV1 } from './routes-v1/nfts-get.js'
import { checkV1 } from './routes-v1/nfts-check.js'
import { nftDeleteV1 } from './routes-v1/nfts-delete.js'
import { nftListV1 } from './routes-v1/nfts-list.js'
import { nftStoreV1 } from './routes-v1/nfts-store.js'
import { pinsAddV1 } from './routes-v1/pins-add.js'
import { pinsDeleteV1 } from './routes-v1/pins-delete.js'
import { pinsGetV1 } from './routes-v1/pins-get.js'
import { pinsListV1 } from './routes-v1/pins-list.js'

const log = debug('router')

const r = new Router({
  onError(req, err, { sentry }) {
    log(err)
    return HTTPError.respond(err, { sentry })
  },
})

// Monitoring
r.add('get', '/metrics', metrics)

// CORS
r.add('options', '*', cors)

// Auth
r.add('post', '/login', login, [postCors])

// Version
r.add('get', '/version', (event) => {
  return new JSONResponse({
    version: VERSION,
    commit: COMMITHASH,
    branch: BRANCH,
  })
})

// Remote Pinning API
r.add('get', '/api/pins', pinsList, [postCors])
r.add('get', '/api/pins/:requestid', pinsGet, [postCors])
r.add('post', '/api/pins', pinsAdd, [postCors])
r.add('post', '/api/pins/:requestid', pinsReplace, [postCors])
r.add('delete', '/api/pins/:requestid', pinsDelete, [postCors])

r.add('post', '/pins', pinsAdd, [postCors])
r.add('get', '/pins', pinsList, [postCors])
r.add('get', '/pins/:requestid', pinsGet, [postCors])
r.add('post', '/pins/:requestid', pinsReplace, [postCors])
r.add('delete', '/pins/:requestid', pinsDelete, [postCors])

// V1 routes
r.add('post', '/v1/login', loginV1, [postCors])

r.add('get', '/v1/pins', pinsListV1, [postCors])
r.add('get', '/v1/pins/:requestid', pinsGetV1, [postCors])
r.add('post', '/v1/pins', pinsAddV1, [postCors])
r.add('delete', '/v1/pins/:requestid', pinsDeleteV1, [postCors])

r.add('get', '/v1', nftListV1, [postCors])
r.add('get', '/v1/:cid', statusV1, [postCors])
r.add('post', '/v1/upload', uploadV1, [postCors])
r.add('post', '/v1/store', nftStoreV1, [postCors])
r.add('delete', '/v1/:cid', nftDeleteV1, [postCors])

r.add('get', '/v1/check/:cid', checkV1, [postCors])

r.add('get', '/v1/internal/tokens', tokensListV1, [postCors])
r.add('post', '/v1/internal/tokens', tokensCreateV1, [postCors])
r.add('delete', '/v1/internal/tokens', tokensDeleteV1, [postCors])

// Public API
r.add('get', '/api', list, [postCors])
r.add('get', '/api/check/:cid', check, [postCors])
r.add('get', '/api/:cid', status, [postCors])
r.add('post', '/api/upload', upload, [postCors])
r.add('delete', '/api/:cid', remove, [postCors])

r.add('get', '', list, [postCors])
r.add('get', '/check/:cid', check, [postCors])
r.add('get', '/:cid', status, [postCors])
r.add('post', '/upload', upload, [postCors])
r.add('post', '/store', store, [postCors])
r.add('delete', '/:cid', remove, [postCors])

// Private API
r.add('get', '/internal/tokens', tokensList, [postCors])
r.add('post', '/internal/tokens', tokensCreate, [postCors])
r.add('delete', '/internal/tokens', tokensDelete, [postCors])
r.add('get', '/internal/list2', getNFT, [postCors])

r.add('all', '*', notFound)
addEventListener('fetch', r.listen.bind(r))
