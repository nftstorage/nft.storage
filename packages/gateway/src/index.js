/* eslint-env serviceworker */

import { Router } from 'itty-router'

import { ipfsGet } from './ipfs.js'
import { gatewayGet } from './gateway.js'
import { metricsGet } from './metrics.js'

// Export Durable Object namespace from the root module.
export { GatewayMetrics0 } from './durable-objects/gateway-metrics.js'
export { SummaryMetrics0 } from './durable-objects/summary-metrics.js'
export { CidsTracker0 } from './durable-objects/cids.js'
export { GatewayRateLimits4 } from './durable-objects/gateway-rate-limits.js'
export { GatewayRedirectCounter0 } from './durable-objects/gateway-redirect-counter.js'

import { addCorsHeaders, withCorsHeaders } from './cors.js'
import { errorHandler } from './error-handler.js'
import { envAll } from './env.js'

const router = Router()

router
  .all('*', envAll)
  .get('/metrics', withCorsHeaders(metricsGet))
  .get('/ipfs/:cid', withCorsHeaders(ipfsGet))
  .get('/ipfs/:cid/*', withCorsHeaders(ipfsGet))
  .head('/ipfs/:cid', withCorsHeaders(ipfsGet))
  .head('/ipfs/:cid/*', withCorsHeaders(ipfsGet))
  .get('*', withCorsHeaders(gatewayGet))
  .head('*', withCorsHeaders(gatewayGet))

/**
 * @param {Error} error
 * @param {Request} request
 * @param {import('./env').Env} env
 */
function serverError(error, request, env) {
  return addCorsHeaders(request, errorHandler(error, env))
}

// https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent
/** @typedef {{ waitUntil(p: Promise): void }} Ctx */

export default {
  async fetch(request, env, ctx) {
    try {
      const res = await router.handle(request, env, ctx)
      env.log.timeEnd('request')
      return env.log.end(res)
    } catch (error) {
      if (env.log) {
        env.log.timeEnd('request')
        return env.log.end(serverError(error, request, env))
      }
      return serverError(error, request, env)
    }
  },
}
