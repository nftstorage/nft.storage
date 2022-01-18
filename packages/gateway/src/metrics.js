/* global Response caches */

import pMap from 'p-map'

import { METRICS_CACHE_MAX_AGE, GENERIC_METRICS_ID } from './constants.js'
import { histogram } from './durable-objects/gateway-metrics.js'

/**
 * @typedef {import('./durable-objects/gateway-metrics').GatewayMetrics} GatewayMetrics
 *
 * @typedef MetricsDurable
 * @property {number} totalWinnerResponseTime
 * @property {Record<string,GatewayMetrics>} ipfsGateways
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

  const [totalWinnerResponseTime, ipfsGateways] = await Promise.all([
    (async () => {
      const id = env.genericMetricsDurable.idFromName(GENERIC_METRICS_ID)
      const stub = env.genericMetricsDurable.get(id)

      const stubResponse = await stub.fetch(request)
      const totalWinnerResponseTime = await stubResponse.text()

      return totalWinnerResponseTime
    })(),
    pMap(env.ipfsGateways, async (gw) => {
      const id = env.gatewayMetricsDurable.idFromName(gw)
      const stub = env.gatewayMetricsDurable.get(id)

      const stubResponse = await stub.fetch(request)
      /** @type {GatewayMetrics} */
      const gwMetrics = await stubResponse.json()

      return {
        gwMetrics,
        gw,
      }
    }),
  ])

  /** @type {MetricsDurable} */
  const metricsCollected = {
    totalWinnerResponseTime,
    ipfsGateways: ipfsGateways.reduce(
      (obj, item) => Object.assign(obj, { [item.gw]: item.gwMetrics }),
      {}
    ),
  }

  const metrics = [
    `# HELP nftstorage_gateway_total_response_time Average response time.`,
    `# TYPE nftstorage_gateway_total_response_time gauge`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftstorage_gateway_total_response_time{gateway="${gw}",env="${
          env.ENV
        }"} ${metricsCollected.ipfsGateways[gw].totalResponseTime || 0}`
    ),
    `# HELP nftstorage_gateway_total_fastest_response_time Total requests performed.`,
    `# TYPE nftstorage_gateway_total_fastest_response_time counter`,
    `nftstorage_gateway_total_fastest_response_time{env="${env.ENV}"} ${metricsCollected.totalWinnerResponseTime}`,
    `# HELP nftstorage_gateway_total_requests Total requests performed.`,
    `# TYPE nftstorage_gateway_total_requests counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftstorage_gateway_total_requests{gateway="${gw}",env="${env.ENV}"} ${
          metricsCollected.ipfsGateways[gw].totalSuccessfulRequests +
          metricsCollected.ipfsGateways[gw].totalFailedRequests
        }`
    ),
    `# HELP nftstorage_gateway_total_successful_requests Total successful requests.`,
    `# TYPE nftstorage_gateway_total_successful_requests counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftstorage_gateway_total_successful_requests{gateway="${gw}",env="${env.ENV}"} ${metricsCollected.ipfsGateways[gw].totalSuccessfulRequests}`
    ),
    `# HELP nftstorage_gateway_total_failed_requests Total failed requests.`,
    `# TYPE nftstorage_gateway_total_failed_requests counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftstorage_gateway_total_failed_requests{gateway="${gw}",env="${env.ENV}"} ${metricsCollected.ipfsGateways[gw].totalFailedRequests}`
    ),
    `# HELP nftstorage_gateway_total_faster_requests Total requests with faster response.`,
    `# TYPE nftstorage_gateway_total_faster_requests counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftstorage_gateway_total_faster_requests{gateway="${gw}",env="${env.ENV}"} ${metricsCollected.ipfsGateways[gw].totalWinnerRequests}`
    ),
    `# HELP nftstorage_gateway_requests_per_time`,
    `# TYPE nftstorage_gateway_requests_per_time histogram`,
    ...histogram.map((t) => {
      return env.ipfsGateways
        .map(
          (gw) =>
            `nftstorage_gateway_requests_per_time{gateway="${gw}",le="${t}",env="${env.ENV}"} ${metricsCollected.ipfsGateways[gw].responseTimeHistogram[t]}`
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
