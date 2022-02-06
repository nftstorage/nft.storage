import pMap from 'p-map'

/**
 * @typedef {import('./env').Env} Env
 */

import { SUMMARY_METRICS_ID, REDIRECT_COUNTER_METRICS_ID } from './constants.js'

/**
 * Handle reset request
 *
 * @param {Request} request
 * @param {Env} env
 * @param {import('./index').Ctx} ctx
 */
export async function resetGet(request, env, ctx) {
  await Promise.all([
    pMap(env.ipfsGateways, async (gw) => {
      const id = env.gatewayMetricsDurable.idFromName(gw)
      const stub = env.gatewayMetricsDurable.get(id)
      await stub.fetch(request)
    }),
    resetSummary(request, env),
    resetRedirect(request, env),
  ])
  return new Response()
}

async function resetSummary(request, env) {
  // Get durable object for gateway
  const id = env.summaryMetricsDurable.idFromName(SUMMARY_METRICS_ID)
  const stub = env.summaryMetricsDurable.get(id)
  await stub.fetch(request)
}

async function resetRedirect(request, env) {
  const id = env.gatewayRedirectCounter.idFromName(REDIRECT_COUNTER_METRICS_ID)
  const stub = env.gatewayRedirectCounter.get(id)
  await stub.fetch(request)
}
