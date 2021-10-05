import { Router } from './utils/router.js'
import { notFound } from './utils/utils.js'
import { HTTPError } from './errors.js'
import { cors, postCors } from './routes/cors.js'
import { nftsCheck } from './routes-v1/nfts-check.js'
import { nftsUpload } from './routes-v1/nfts-upload.js'
import { nftsStore } from './routes-v1/nfts-store.js'
import { nftsStatus } from './routes-v1/nfts-status.js'
import { nftsDelete } from './routes-v1/nfts-delete.js'
import { nftsList } from './routes-v1/nfts-list.js'
import { tokensList } from './routes-v1/tokens-list.js'
import { tokensCreate } from './routes-v1/tokens-create.js'
import { tokensDelete } from './routes-v1/tokens-delete.js'
import { pinsAdd } from './routes-v1/pins-add.js'
import { pinsGet } from './routes-v1/pins-get.js'
import { pinsList } from './routes-v1/pins-list.js'
import { pinsReplace } from './routes-v1/pins-replace.js'
import { pinsDelete } from './routes-v1/pins-delete.js'
import { metrics } from './routes-v1/metrics.js'
import { login } from './routes-v1/login.js'
import { JSONResponse } from './utils/json-response.js'
import { debug } from './utils/debug.js'
import { getNFT } from './routes/get-nft.js'
import {
  withMode,
  READ_ONLY,
  READ_WRITE,
  DEFAULT_MODE,
  setMaintenanceModeGetter,
} from './middleware/maintenance.js'
import { withPsaErrorHandler } from './middleware/psa.js'

const log = debug('router')

const getMaintenanceMode = () =>
  typeof MAINTENANCE_MODE !== 'undefined' ? MAINTENANCE_MODE : DEFAULT_MODE
setMaintenanceModeGetter(getMaintenanceMode)

const r = new Router({
  onError(req, err, { sentry }) {
    log(err)
    return HTTPError.respond(err, { sentry })
  },
})

// Monitoring
r.add('get', '/metrics', withMode(metrics, READ_ONLY))

// CORS
r.add('options', '*', cors)

// Auth
r.add('post', '/login', withMode(login, READ_ONLY), [postCors])

// Version
r.add('get', '/version', (event) => {
  return new JSONResponse({
    version: VERSION,
    commit: COMMITHASH,
    branch: BRANCH,
    mode: getMaintenanceMode(),
  })
})

// Remote Pinning API
r.add('get', '/api/pins', withPsaErrorHandler(withMode(pinsList, READ_ONLY)), [
  postCors,
])
r.add(
  'get',
  '/api/pins/:requestid',
  withPsaErrorHandler(withMode(pinsGet, READ_ONLY)),
  [postCors]
)
r.add('post', '/api/pins', withPsaErrorHandler(withMode(pinsAdd, READ_WRITE)), [
  postCors,
])
r.add(
  'post',
  '/api/pins/:requestid',
  withPsaErrorHandler(withMode(pinsReplace, READ_WRITE)),
  [postCors]
)
r.add(
  'delete',
  '/api/pins/:requestid',
  withPsaErrorHandler(withMode(pinsDelete, READ_WRITE)),
  [postCors]
)

r.add('post', '/pins', withPsaErrorHandler(withMode(pinsAdd, READ_WRITE)), [
  postCors,
])
r.add('get', '/pins', withPsaErrorHandler(withMode(pinsList, READ_ONLY)), [
  postCors,
])
r.add(
  'get',
  '/pins/:requestid',
  withPsaErrorHandler(withMode(pinsGet, READ_ONLY)),
  [postCors]
)
r.add(
  'post',
  '/pins/:requestid',
  withPsaErrorHandler(withMode(pinsReplace, READ_WRITE)),
  [postCors]
)
r.add(
  'delete',
  '/pins/:requestid',
  withPsaErrorHandler(withMode(pinsDelete, READ_WRITE)),
  [postCors]
)

// Public API
// Legacy /api/*
r.add('get', '/api', withMode(nftsList, READ_ONLY), [postCors])
r.add('get', '/api/check/:cid', withMode(nftsCheck, READ_ONLY), [postCors])
r.add('get', '/api/:cid', withMode(nftsStatus, READ_ONLY), [postCors])
r.add('post', '/api/upload', withMode(nftsUpload, READ_WRITE), [postCors])
r.add('delete', '/api/:cid', withMode(nftsDelete, READ_WRITE), [postCors])

r.add('get', '', withMode(nftsList, READ_ONLY), [postCors])
r.add('get', '/check/:cid', withMode(nftsCheck, READ_ONLY), [postCors])
r.add('get', '/:cid', withMode(nftsStatus, READ_ONLY), [postCors])
r.add('post', '/upload', withMode(nftsUpload, READ_WRITE), [postCors])
r.add('post', '/store', withMode(nftsStore, READ_WRITE), [postCors])
r.add('delete', '/:cid', withMode(nftsDelete, READ_WRITE), [postCors])

// Private API
r.add('get', '/internal/tokens', withMode(tokensList, READ_ONLY), [postCors])
r.add('post', '/internal/tokens', withMode(tokensCreate, READ_WRITE), [
  postCors,
])
r.add('delete', '/internal/tokens', withMode(tokensDelete, READ_WRITE), [
  postCors,
])
r.add('get', '/internal/list2', withMode(getNFT, READ_ONLY), [postCors])

r.add('all', '*', notFound)
addEventListener('fetch', r.listen.bind(r))
