import { Router } from './utils/router.js'
import { notFound, timed } from './utils/utils.js'
import { HTTPError } from './errors.js'
import { cors, postCors } from './routes/cors.js'
import { upload } from './routes/nfts-upload.js'
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
import {
  updateUserMetrics,
  updateNftMetrics,
  updateNftDealMetrics,
} from './jobs/metrics.js'
import { updatePinStatuses } from './jobs/pins.js'
import { login } from './routes/login.js'
import { JSONResponse } from './utils/json-response.js'
const { debug, getSentrySchedule } = require('./utils/debug')
const log = debug('router')

const r = new Router({
  onError(req, err, { sentry }) {
    log(err)
    sentry.captureException(err)
    return HTTPError.respond(err)
  },
})

// Monitoring
r.add('get', '/metrics', metrics)

// CORS
r.add('options', '*', cors)

// Auth
r.add('post', '/login', login, [postCors])

// Version
r.add('get', '/version', (event, param, sentry) => {
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

// Public API
r.add('get', '/api', list, [postCors])
r.add('get', '/api/:cid', status, [postCors])
r.add('post', '/api/upload', upload, [postCors])
r.add('delete', '/api/:cid', remove, [postCors])

r.add('get', '', list, [postCors])
r.add('get', '/:cid', status, [postCors])
r.add('post', '/upload', upload, [postCors])
r.add('delete', '/:cid', remove, [postCors])

// Private API
r.add('get', '/internal/tokens', tokensList, [postCors])
r.add('post', '/internal/tokens', tokensCreate, [postCors])
r.add('delete', '/internal/tokens', tokensDelete, [postCors])

r.add('all', '*', notFound)
addEventListener('fetch', r.listen.bind(r))

// Cron jobs
addEventListener('scheduled', (event) =>
  event.waitUntil(
    (async () => {
      const sentry = getSentrySchedule(event)
      await timed(updateUserMetrics, 'CRON updateUserMetrics', { sentry })
      await timed(updateNftMetrics, 'CRON updateNftMetrics', { sentry })
    })()
  )
)
addEventListener('scheduled', (event) => {
  const sentry = getSentrySchedule(event)
  event.waitUntil(
    timed(updateNftDealMetrics, 'CRON updateNftDealMetrics', { sentry })
  )
})
addEventListener('scheduled', (event) => {
  const sentry = getSentrySchedule(event)
  event.waitUntil(
    timed(updatePinStatuses, 'CRON updatePinStatuses', { sentry })
  )
})
