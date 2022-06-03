import { Router } from './utils/router.js'
import { notFound } from './utils/utils.js'
import { HTTPError } from './errors.js'
import { cors, postCors } from './routes/cors.js'
import { JSONResponse } from './utils/json-response.js'
import { getStats, metrics } from './routes/metrics.js'
import { tokensDelete } from './routes/tokens-delete.js'
import { tokensCreate } from './routes/tokens-create.js'
import { tokensList } from './routes/tokens-list.js'
import { login } from './routes/login.js'
import { nftUpdateUpload, nftUpload } from './routes/nfts-upload.js'
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
import { userDIDRegister } from './routes/user-did-register.js'
import { userTags } from './routes/user-tags.js'
import { userRequestsAdd, userRequestsGet } from './routes/user-requests.js'
import { ucanToken } from './routes/ucan-token.js'
import { did } from './routes/did.js'
import { getServiceConfig } from './config.js'

import {
  withMode,
  READ_ONLY as RO,
  READ_WRITE as RW,
} from './middleware/maintenance.js'
import { getContext } from './utils/context.js'
import { withAuth } from './middleware/auth.js'

const r = new Router(getContext, {
  onError(req, err, ctx) {
    return HTTPError.respond(err, ctx)
  },
})

const checkHasAccountRestriction = true
const checkHasDeleteRestriction = true
const checkHasPsaAccess = true
const checkUcan = true

// Monitoring
r.add('get', '/metrics', withMode(metrics, RO))
r.add('get', '/stats', withMode(getStats, RO), [postCors])

// CORS
r.add('options', '*', cors)

// Version
r.add(
  'get',
  '/version',
  (event) => {
    const { VERSION, COMMITHASH, BRANCH, MAINTENANCE_MODE } = getServiceConfig()
    return new JSONResponse({
      version: VERSION,
      commit: COMMITHASH,
      branch: BRANCH,
      mode: MAINTENANCE_MODE,
    })
  },
  [postCors]
)

// Remote Pinning API

r.add('get', '/did', withMode(did, RO), [postCors])

// Login
r.add(
  'post',
  '/ucan/token',
  withMode(withAuth(ucanToken, { checkUcan, checkHasAccountRestriction }), RW),
  [postCors]
)
r.add('post', '/login', withMode(login, RO), [postCors])

// Pinning
r.add('get', '/pins', withAuth(withMode(pinsList, RO), { checkHasPsaAccess }), [
  postCors,
])
r.add(
  'get',
  '/pins/:requestid',
  withAuth(withMode(pinsGet, RO), { checkHasPsaAccess }),
  [postCors]
)
r.add(
  'post',
  '/pins',
  withAuth(withMode(pinsAdd, RW), {
    checkHasPsaAccess,
    checkHasAccountRestriction,
  }),
  [postCors]
)
r.add(
  'post',
  '/pins/:requestid',
  withAuth(withMode(pinsReplace, RW), {
    checkHasPsaAccess,
    checkHasAccountRestriction,
  }),
  [postCors]
)
r.add(
  'delete',
  '/pins/:requestid',
  withAuth(withMode(pinsDelete, RW), {
    checkHasDeleteRestriction,
    checkHasPsaAccess,
  }),
  [postCors]
)

// Upload
r.add('get', '/check/:cid', withMode(nftCheck, RO), [postCors])
r.add('get', '', withAuth(withMode(nftList, RO)), [postCors])
r.add('get', '/:cid', withAuth(withMode(nftGet, RO)), [postCors])
r.add(
  'post',
  '/upload',
  withAuth(withMode(nftUpload, RW), {
    checkHasAccountRestriction,
    checkUcan,
  }),
  [postCors]
)
r.add(
  'patch',
  '/upload/:cid',
  withAuth(withMode(nftUpdateUpload, RW), { checkHasAccountRestriction }),
  [postCors]
)
r.add(
  'post',
  '/store',
  withAuth(withMode(nftStore, RW), { checkHasAccountRestriction }),
  [postCors]
)
r.add(
  'delete',
  '/:cid',
  withAuth(withMode(nftDelete, RW), { checkHasDeleteRestriction }),
  [postCors]
)

// Temporary Metaplex upload route, mapped to metaplex user account.
r.add('post', '/metaplex/upload', withMode(metaplexUpload, RW), [postCors])

// User
r.add(
  'post',
  '/user/did',
  withAuth(withMode(userDIDRegister, RW), { checkHasAccountRestriction }),
  [postCors]
)
r.add('get', '/user/tags', withAuth(withMode(userTags, RO)), [postCors])

r.add('post', '/user/request', withAuth(withMode(userRequestsAdd, RW)), [
  postCors,
])
r.add('get', '/user/request', withAuth(withMode(userRequestsGet, RW)), [
  postCors,
])

// Tokens
r.add('get', '/internal/tokens', withAuth(withMode(tokensList, RO)), [postCors])
r.add(
  'post',
  '/internal/tokens',
  withAuth(withMode(tokensCreate, RW), { checkHasAccountRestriction }),
  [postCors]
)
r.add(
  'delete',
  '/internal/tokens',
  withAuth(withMode(tokensDelete, RW), { checkHasDeleteRestriction }),
  [postCors]
)

// Blog
r.add('post', '/internal/blog/subscribe', blogSubscribe, [postCors])

// Note: /api/* endpoints are legacy and will eventually be removed.
r.add(
  'get',
  '/api/pins',
  withAuth(withMode(pinsList, RO), { checkHasPsaAccess }),
  [postCors]
)
r.add(
  'get',
  '/api/pins/:requestid',
  withAuth(withMode(pinsGet, RO), { checkHasPsaAccess }),
  [postCors]
)
r.add(
  'post',
  '/api/pins',
  withAuth(withMode(pinsAdd, RW), {
    checkHasPsaAccess,
    checkHasAccountRestriction,
  }),
  [postCors]
)
r.add(
  'post',
  '/api/pins/:requestid',
  withAuth(withMode(pinsReplace, RW), {
    checkHasPsaAccess,
    checkHasAccountRestriction,
  }),
  [postCors]
)
r.add(
  'delete',
  '/api/pins/:requestid',
  withAuth(withMode(pinsDelete, RW), {
    checkHasDeleteRestriction,
    checkHasPsaAccess,
  }),
  [postCors]
)

// Public API
r.add('get', '/api', withAuth(withMode(nftList, RO)), [postCors])
r.add('get', '/api/check/:cid', withMode(nftCheck, RO), [postCors])
r.add('get', '/api/:cid', withAuth(withMode(nftGet, RO)), [postCors])
r.add(
  'post',
  '/api/upload',
  withAuth(withMode(nftUpload, RW), { checkUcan, checkHasAccountRestriction }),
  [postCors]
)
r.add(
  'delete',
  '/api/:cid',
  withAuth(withMode(nftDelete, RW), { checkHasDeleteRestriction }),
  [postCors]
)

r.add('all', '*', notFound)
addEventListener('fetch', r.listen.bind(r))
