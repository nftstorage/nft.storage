/* global Response caches */

import pMap from 'p-map'

import { METRICS_CACHE_MAX_AGE, SUMMARY_METRICS_ID } from './constants.js'
import { histogram } from './durable-objects/gateway-metrics.js'

/**
 * @typedef {import('./durable-objects/gateway-metrics').GatewayMetrics} GatewayMetrics
 * @typedef {import('./durable-objects/summary-metrics').SummaryMetrics} SummaryMetrics
 *
 * @typedef MetricsDurable
 * @property {SummaryMetrics} summaryMetrics
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

  const [summaryMetrics, ipfsGateways] = await Promise.all([
    (async () => {
      const id = env.summaryMetricsDurable.idFromName(SUMMARY_METRICS_ID)
      const stub = env.summaryMetricsDurable.get(id)

      const stubResponse = await stub.fetch(request)
      /** @type {SummaryMetrics} */
      const summaryMetrics = await stubResponse.json()

      return summaryMetrics
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
    summaryMetrics,
    ipfsGateways: ipfsGateways.reduce(
      (obj, item) => Object.assign(obj, { [item.gw]: item.gwMetrics }),
      {}
    ),
  }

  const metrics = [
    `# HELP nftstorage_gateway_total_cache_hit_responses Total cached responses returned.`,
    `# TYPE nftstorage_gateway_total_cache_hit_responses counter`,
    `nftstorage_gateway_total_cache_hit_responses{env="${env.ENV}"} ${metricsCollected.summaryMetrics.totalCachedResponses}`,
    `# HELP nftgateway_winner_requests_total Total winner requests.`,
    `# TYPE nftgateway_winner_requests_total counter`,
    `nftgateway_winner_requests_total{env="${env.ENV}"} ${metricsCollected.summaryMetrics.totalWinnerSuccessfulRequests}`,
    `# HELP nftgateway_winner_response_time_seconds_total Accumulated winner response time.`,
    `# TYPE nftgateway_winner_response_time_seconds_total summary`,
    `nftgateway_winner_response_time_seconds_total{env="${env.ENV}"} ${msToS(
      metricsCollected.summaryMetrics.totalWinnerResponseTime
    )}`,
    `# HELP nftgateway_response_time_seconds_total Accumulated response time of each gateway.`,
    `# TYPE nftgateway_response_time_seconds_total summary`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftgateway_response_time_seconds_total{gateway="${gw}",env="${
          env.ENV
        }"} ${msToS(metricsCollected.ipfsGateways[gw].totalResponseTime) || 0}`
    ),
    `# HELP nftgateway_requests_total Total requests performed to each gateway.`,
    `# TYPE nftgateway_requests_total counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftgateway_requests_total{gateway="${gw}",env="${env.ENV}"} ${
          metricsCollected.ipfsGateways[gw].totalSuccessfulRequests +
          metricsCollected.ipfsGateways[gw].totalFailedRequests
        }`
    ),
    `# HELP nftgateway_successful_requests_total Total successful requests performed to each gateway.`,
    `# TYPE nftgateway_successful_requests_total counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftgateway_successful_requests_total{gateway="${gw}",env="${env.ENV}"} ${metricsCollected.ipfsGateways[gw].totalSuccessfulRequests}`
    ),
    `# HELP nftgateway_failed_requests_total Total failed requests performed to each gateway.`,
    `# TYPE nftgateway_failed_requests_total counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftgateway_failed_requests_total{gateway="${gw}",env="${env.ENV}"} ${metricsCollected.ipfsGateways[gw].totalFailedRequests}`
    ),
    `# HELP nftgateway_winner_requests_total Total requests with winner response to each gateway.`,
    `# TYPE nftgateway_winner_requests_total counter`,
    ...env.ipfsGateways.map(
      (gw) =>
        `nftgateway_winner_requests_total{gateway="${gw}",env="${env.ENV}"} ${metricsCollected.ipfsGateways[gw].totalWinnerRequests}`
    ),
    `# HELP nftgateway_requests_per_time_total`,
    `# TYPE nftgateway_requests_per_time_total histogram for total of requests per response time bucket`,
    ...histogram.map((t) => {
      return env.ipfsGateways
        .map(
          (gw) =>
            `nftgateway_requests_per_time_total{gateway="${gw}",le="${t}",env="${env.ENV}"} ${metricsCollected.ipfsGateways[gw].responseTimeHistogram[t]}`
        )
        .join('\n')
    }),
    ...env.ipfsGateways.map(
      (gw) =>
        `nftgateway_requests_per_time_total{gateway="${gw}",le="+Inf",env="${env.ENV}"} ${metricsCollected.ipfsGateways[gw].totalSuccessfulRequests}`
    ),
  ].join('\n')

  res = new Response(metrics, {
    headers: {
      'Cache-Control': `public, max-age=${METRICS_CACHE_MAX_AGE}`,
    },
  })

  // ctx.waitUntil(cache.put(request, res.clone()))

  return res
}

/**
 * Convert milliseconds to seconds.
 * @param {number} ms
 */
function msToS(ms) {
  return ms / 1000
}
