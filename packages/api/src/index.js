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
import { metrics as metricsV1 } from './routes-v1/metrics.js'
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
import {
  withMode,
  READ_ONLY as RO,
  READ_WRITE as RW,
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
r.add('get', '/metrics', withMode(metrics, RO))
r.add('get', '/v1/metrics', withMode(metricsV1, RO))

// CORS
r.add('options', '*', cors)

// Auth
r.add('post', '/login', withMode(login, RO), [postCors])

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

/**
 * Apply Pinning Services API Middleware
 * @param {import('./utils/router.js').Handler} handler
 * @param {import('./middleware/maintenance').Mode} mode
 * @returns {import('./utils/router.js').Handler}
 */
const psa = (handler, mode) => withPsaErrorHandler(withMode(handler, mode))

// Note: /api/* endpoints are legacy and will eventually be removed.
r.add('get', '/api/pins', psa(pinsList, RO), [postCors])
r.add('get', '/api/pins/:requestid', psa(pinsGet, RO), [postCors])
r.add('post', '/api/pins', psa(pinsAdd, RW), [postCors])
r.add('post', '/api/pins/:requestid', psa(pinsReplace, RW), [postCors])
r.add('delete', '/api/pins/:requestid', psa(pinsDelete, RW), [postCors])

r.add('post', '/pins', psa(pinsAdd, RW), [postCors])
r.add('get', '/pins', psa(pinsList, RO), [postCors])
r.add('get', '/pins/:requestid', psa(pinsGet, RO), [postCors])
r.add('post', '/pins/:requestid', psa(pinsReplace, RW), [postCors])
r.add('delete', '/pins/:requestid', psa(pinsDelete, RW), [postCors])

// V1 routes
r.add('post', '/v1/login', withMode(loginV1, RO), [postCors])

r.add('get', '/v1/pins', psa(pinsListV1, RO), [postCors])
r.add('get', '/v1/pins/:requestid', psa(pinsGetV1, RO), [postCors])
r.add('post', '/v1/pins', psa(pinsAddV1, RW), [postCors])
r.add('delete', '/v1/pins/:requestid', psa(pinsDeleteV1, RW), [postCors])

r.add('get', '/v1', withMode(nftListV1, RO), [postCors])
r.add('get', '/v1/:cid', withMode(statusV1, RO), [postCors])
r.add('post', '/v1/upload', withMode(uploadV1, RW), [postCors])
r.add('post', '/v1/store', withMode(nftStoreV1, RW), [postCors])
r.add('delete', '/v1/:cid', withMode(nftDeleteV1, RW), [postCors])

r.add('get', '/v1/check/:cid', withMode(checkV1, RO), [postCors])

r.add('get', '/v1/internal/tokens', withMode(tokensListV1, RO), [postCors])
r.add('post', '/v1/internal/tokens', withMode(tokensCreateV1, RW), [postCors])
r.add('delete', '/v1/internal/tokens', withMode(tokensDeleteV1, RW), [postCors])

// Public API
r.add('get', '/api', withMode(list, RO), [postCors])
r.add('get', '/api/check/:cid', withMode(check, RO), [postCors])
r.add('get', '/api/:cid', withMode(status, RO), [postCors])
r.add('post', '/api/upload', withMode(upload, RW), [postCors])
r.add('delete', '/api/:cid', withMode(remove, RW), [postCors])

r.add('get', '', withMode(list, RO), [postCors])
r.add('get', '/check/:cid', withMode(check, RO), [postCors])
r.add('get', '/:cid', withMode(status, RO), [postCors])
r.add('post', '/upload', withMode(upload, RW), [postCors])
r.add('post', '/store', withMode(store, RW), [postCors])
r.add('delete', '/:cid', withMode(remove, RW), [postCors])

// Private API
r.add('get', '/internal/tokens', withMode(tokensList, RO), [postCors])
r.add('post', '/internal/tokens', withMode(tokensCreate, RW), [postCors])
r.add('delete', '/internal/tokens', withMode(tokensDelete, RW), [postCors])
r.add('get', '/internal/list2', withMode(getNFT, RO), [postCors])

r.add('all', '*', notFound)
addEventListener('fetch', r.listen.bind(r))
