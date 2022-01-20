/**
 * @typedef {Object} GatewayMetrics
 * @property {number} totalResponseTime total response time of the requests
 * @property {number} totalSuccessfulRequests total number of successful requests
 * @property {number} totalFailedRequests total number of requests failed
 * @property {number} totalWinnerRequests number of performed requests where winner
 * @property {Record<string, number>} responseTimeHistogram
 *
 * @typedef {Object} ResponseStats
 * @property {boolean} ok request was successful
 * @property {number} [responseTime] number of milliseconds to get response
 * @property {boolean} [winner]
 */

const GATEWAY_METRICS_ID = 'gateway_metrics'

/**
 * Durable Object for keeping Metrics state of a gateway.
 */
export class GatewayMetrics1 {
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
   * @param {ResponseStats} stats
   */
  _updateMetrics(stats) {
    if (!stats.ok) {
      // Update failed request count
      this.gatewayMetrics.totalFailedRequests += 1
      return
    }

    // Update request count and response time sum
    this.gatewayMetrics.totalSuccessfulRequests += 1
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
    const histogramCandidates = histogram.filter((h) => stats.responseTime < h)
    histogramCandidates.forEach((candidate) => {
      gwHistogram[candidate] += 1
    })

    this.gatewayMetrics.responseTimeHistogram = gwHistogram
  }
}

// We will count occurences per bucket where response time is less or equal than bucket value
export const histogram = [
  300, 500, 750, 1000, 1500, 2000, 3000, 5000, 10000, 20000,
]

function createMetricsTracker() {
  const h = histogram.map((h) => [h, 0])

  return {
    totalResponseTime: 0,
    totalSuccessfulRequests: 0,
    totalFailedRequests: 0,
    totalWinnerRequests: 0,
    responseTimeHistogram: Object.fromEntries(h),
  }
}
