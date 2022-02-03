import {
  responseTimeHistogram,
  createResponseTimeHistogramObject,
} from '../utils/histogram.js'

/**
 * @typedef {Object} GatewayMetrics
 * @property {number} totalResponseTime total response time of the requests
 * @property {number} totalWinnerRequests number of performed requests where winner
 * @property {Record<string, number>} totalResponsesByStatus total responses received indexed by status code
 * @property {Record<string, number>} totalRequestsPreventedByReason total requests not sent to upstream gateway indexed by reason code
 * @property {Record<string, number>} responseTimeHistogram
 *
 * @typedef {Object} FetchStats
 * @property {number} status http response status
 * @property {number} [responseTime] number of milliseconds to get response
 * @property {boolean} [winner] response was from winner gateway
 * @property {string} [requestPreventedCode] request not sent to upstream gateway reason code
 */

const GATEWAY_METRICS_ID = 'gateway_metrics'

/**
 * Durable Object for keeping Metrics state of a gateway.
 */
export class GatewayMetrics0 {
  constructor(state) {
    this.state = state

    // `blockConcurrencyWhile()` ensures no requests are delivered until initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      // Get state and initialize if not existing
      /** @type {GatewayMetrics} */
      this.gatewayMetrics =
        (await this.state.storage.get(GATEWAY_METRICS_ID)) ||
        createMetricsTracker()
    })
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // Apply requested action.
    let url = new URL(request.url)
    switch (url.pathname) {
      case '/update':
        const data = await request.json()
        // Updated Metrics
        this._updateMetrics(data)
        // Save updated Metrics
        await this.state.storage.put(GATEWAY_METRICS_ID, this.gatewayMetrics)
        return new Response()
      case '/metrics':
        return new Response(JSON.stringify(this.gatewayMetrics))
      default:
        return new Response('Not found', { status: 404 })
    }
  }

  /**
   * @param {FetchStats} stats
   */
  _updateMetrics(stats) {
    // Update prevent requests if request was prevented
    if (stats.requestPreventedCode) {
      const totalPreventedForReason =
        this.gatewayMetrics.totalRequestsPreventedByReason[
          stats.requestPreventedCode
        ] || 0
      this.gatewayMetrics.totalRequestsPreventedByReason[
        stats.requestPreventedCode
      ] = totalPreventedForReason + 1
      return
    }

    // Update response by status
    const totalResponsesForStatus =
      this.gatewayMetrics.totalResponsesByStatus[stats.status] || 0
    this.gatewayMetrics.totalResponsesByStatus[stats.status] =
      totalResponsesForStatus + 1

    this.gatewayMetrics.totalResponseTime += stats.responseTime

    // Update faster count if appropriate
    if (stats.winner) {
      this.gatewayMetrics.totalWinnerRequests += 1
    }

    // Update histogram
    const gwHistogram = {
      ...this.gatewayMetrics.responseTimeHistogram,
    }

    // Get all the histogram buckets where the response time is smaller
    const histogramCandidates = responseTimeHistogram.filter(
      (h) => stats.responseTime < h
    )
    histogramCandidates.forEach((candidate) => {
      gwHistogram[candidate] += 1
    })

    this.gatewayMetrics.responseTimeHistogram = gwHistogram
  }
}

function createMetricsTracker() {
  /** @type {GatewayMetrics} */
  const m = {
    totalResponseTime: 0,
    totalWinnerRequests: 0,
    totalResponsesByStatus: {},
    totalRequestsPreventedByReason: {},
    responseTimeHistogram: createResponseTimeHistogramObject(),
  }

  return m
}
