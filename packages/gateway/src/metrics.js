/* global Response caches */

import { METRICS_CACHE_MAX_AGE } from './constants.js'
import { histogram } from './durable-objects/metrics.js'

/**
 * @typedef MetricsDurable
 * @property {number} totalFastResponseTime
 * @property {Record<string,import('./durable-objects/metrics').GatewayMetrics>} ipfsGateways
 */

/**
 * Retrieve metrics in prometheus exposition format.
 * https://prometheus.io/docs/instrumenting/exposition_formats/
 * @param {Request} request
 * @param {import('./env').Env} env
 * @param {import('./index').Ctx} ctx
 * @returns {Promise<Response>}
 */
export async function metricsGet(request, env, ctx) {
  // TODO: Set cache
  // const cache = caches.default
  // let res = await cache.match(request)

  // if (res) {
  //   return res
  // }
  let res

  const id = env.metricsDurable.idFromName('metrics')
  const stub = env.metricsDurable.get(id)

  const stubResponse = await stub.fetch(request)
  /** @type {MetricsDurable} */
  const metricsDurable = await stubResponse.json()

  const metrics = [
    `# HELP nftstorage_gateway_total_response_time Average response time.`,
    `# TYPE nftstorage_gateway_total_response_time gauge`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftstorage_gateway_total_response_time{gateway="${gw}",env="${
          env.ENV
        }"} ${metricsDurable.ipfsGateways[gw].totalResponseTime || 0}`
    ),
    `# HELP nftstorage_gateway_total_fastest_response_time Total requests performed.`,
    `# TYPE nftstorage_gateway_total_fastest_response_time counter`,
    `nftstorage_gateway_total_fastest_response_time{env="${env.ENV}"} ${metricsDurable.totalFastResponseTime}`,
    `# HELP nftstorage_gateway_total_requests Total requests performed.`,
    `# TYPE nftstorage_gateway_total_requests counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftstorage_gateway_total_requests{gateway="${gw}",env="${env.ENV}"} ${metricsDurable.ipfsGateways[gw].totalRequests}`
    ),
    `# HELP nftstorage_gateway_total_successful_requests Total successful requests.`,
    `# TYPE nftstorage_gateway_total_successful_requests counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftstorage_gateway_total_successful_requests{gateway="${gw}",env="${
          env.ENV
        }"} ${
          metricsDurable.ipfsGateways[gw].totalRequests -
          metricsDurable.ipfsGateways[gw].totalFailedRequests
        }`
    ),
    `# HELP nftstorage_gateway_total_failed_requests Total failed requests.`,
    `# TYPE nftstorage_gateway_total_failed_requests counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftstorage_gateway_total_failed_requests{gateway="${gw}",env="${env.ENV}"} ${metricsDurable.ipfsGateways[gw].totalFailedRequests}`
    ),
    `# HELP nftstorage_gateway_total_faster_requests Total requests with faster response.`,
    `# TYPE nftstorage_gateway_total_faster_requests counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftstorage_gateway_total_faster_requests{gateway="${gw}",env="${env.ENV}"} ${metricsDurable.ipfsGateways[gw].totalWinnerRequests}`
    ),
    `# HELP nftstorage_gateway_requests_per_time`,
    `# TYPE nftstorage_gateway_requests_per_time histogram`,
    ...histogram.map((t) => {
      return env.ipfsGateways
        .map(
          (gw) =>
            `nftstorage_gateway_requests_per_time{gateway="${gw}",le="${t}",env="${env.ENV}"} ${metricsDurable.ipfsGateways[gw].responseTimeHistogram[t]}`
        )
        .join('\n')
    }),
  ].join('\n')

  res = new Response(metrics, {
    headers: {
      'Cache-Control': `public, max-age=${METRICS_CACHE_MAX_AGE}`,
    },
  })

  // ctx.waitUntil(cache.put(request, res.clone()))

  return res
}
