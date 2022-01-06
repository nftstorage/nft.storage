import { Router } from './utils/router.js'
import { notFound } from './utils/utils.js'
import { HTTPError } from './errors.js'
import { cors, postCors } from './routes/cors.js'
import { JSONResponse } from './utils/json-response.js'
import { metrics } from './routes/metrics.js'
import { tokensDelete } from './routes/tokens-delete.js'
import { tokensCreate } from './routes/tokens-create.js'
import { tokensList } from './routes/tokens-list.js'
import { login } from './routes/login.js'
import { nftUpload } from './routes/nfts-upload.js'
import { nftCheck } from './routes/nfts-check.js'
import { nftGet } from './routes/nfts-get.js'
import { nftDelete } from './routes/nfts-delete.js'
import { nftList } from './routes/nfts-list.js'
import { nftStore } from './routes/nfts-store.js'
import { pinsAdd } from './routes/pins-add.js'
import { pinsDelete } from './routes/pins-delete.js'
import { pinsGet } from './routes/pins-get.js'
import { pinsList } from './routes/pins-list.js'
import { pinsReplace } from './routes/pins-replace.js'
import { metaplexUpload } from './routes/metaplex-upload.js'
import { blogSubscribe } from './routes/blog-subscribe.js'

import {
  withMode,
  READ_ONLY as RO,
  READ_WRITE as RW,
  DEFAULT_MODE,
  setMaintenanceModeGetter,
} from './middleware/maintenance.js'
import { withPsaErrorHandler, withPinningAuthorized } from './middleware/psa.js'
import { cluster } from './constants.js'
import { getContext } from './utils/context.js'

const getMaintenanceMode = () =>
  typeof MAINTENANCE_MODE !== 'undefined' ? MAINTENANCE_MODE : DEFAULT_MODE
setMaintenanceModeGetter(getMaintenanceMode)

const r = new Router(getContext, {
  onError(req, err, ctx) {
    return HTTPError.respond(err, ctx)
  },
})

// Monitoring
r.add('get', '/metrics', withMode(metrics, RO))

// CORS
r.add('options', '*', cors)

// Version
r.add(
  'get',
  '/version',
  (event) => {
    return new JSONResponse({
      version: VERSION,
      commit: COMMITHASH,
      branch: BRANCH,
      mode: getMaintenanceMode(),
      cluster: cluster.apiUrl,
    })
  },
  [postCors]
)

// Remote Pinning API

/**
 * Apply Pinning Services API Middleware
 * @param {import('./bindings').Handler} handler
 * @param {import('./middleware/maintenance').Mode} mode
 * @returns {import('./bindings').Handler}
 */
const psa = (handler, mode) =>
  withPsaErrorHandler(withPinningAuthorized(withMode(handler, mode)))

// Login
r.add('post', '/login', withMode(login, RO), [postCors])

// Pinning
r.add('get', '/pins', psa(pinsList, RO), [postCors])
r.add('get', '/pins/:requestid', psa(pinsGet, RO), [postCors])
r.add('post', '/pins', psa(pinsAdd, RW), [postCors])
r.add('post', '/pins/:requestid', psa(pinsReplace, RW), [postCors])
r.add('delete', '/pins/:requestid', psa(pinsDelete, RW), [postCors])

// Upload
r.add('get', '/check/:cid', withMode(nftCheck, RO), [postCors])
r.add('get', '', withMode(nftList, RO), [postCors])
r.add('get', '/:cid', withMode(nftGet, RO), [postCors])
r.add('post', '/upload', withMode(nftUpload, RW), [postCors])
r.add('post', '/store', withMode(nftStore, RW), [postCors])
r.add('delete', '/:cid', withMode(nftDelete, RW), [postCors])

// Temporary Metaplex upload route, mapped to metaplex user account.
r.add('post', '/metaplex/upload', withMode(metaplexUpload, RW), [postCors])

// Tokens
r.add('get', '/internal/tokens', withMode(tokensList, RO), [postCors])
r.add('post', '/internal/tokens', withMode(tokensCreate, RW), [postCors])
r.add('delete', '/internal/tokens', withMode(tokensDelete, RW), [postCors])

// Blog
r.add('post', '/internal/blog/subscribe', blogSubscribe, [postCors])

// Note: /api/* endpoints are legacy and will eventually be removed.
r.add('get', '/api/pins', psa(pinsList, RO), [postCors])
r.add('get', '/api/pins/:requestid', psa(pinsGet, RO), [postCors])
r.add('post', '/api/pins', psa(pinsAdd, RW), [postCors])
r.add('post', '/api/pins/:requestid', psa(pinsReplace, RW), [postCors])
r.add('delete', '/api/pins/:requestid', psa(pinsDelete, RW), [postCors])

// Public API
r.add('get', '/api', withMode(nftList, RO), [postCors])
r.add('get', '/api/check/:cid', withMode(nftCheck, RO), [postCors])
r.add('get', '/api/:cid', withMode(nftGet, RO), [postCors])
r.add('post', '/api/upload', withMode(nftUpload, RW), [postCors])
r.add('delete', '/api/:cid', withMode(nftDelete, RW), [postCors])

r.add('all', '*', notFound)
addEventListener('fetch', r.listen.bind(r))
