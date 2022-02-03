/**
 * @typedef {Object} SummaryMetrics
 * @property {number} totalWinnerResponseTime total response time of the requests
 * @property {number} totalWinnerSuccessfulRequests total number of successful requests
 * @property {number} totalCachedResponses total number of cached responses
 * @property {BigInt} totalContentLengthBytes total content length of responses
 * @property {BigInt} totalCachedContentLengthBytes total content length of cached responses
 * @property {Record<string, number>} contentLengthHistogram
 *
 * @typedef {Object} ResponseWinnerStats
 * @property {number} responseTime number of milliseconds to get response
 * @property {number} contentLength content length header content
 *
 * @typedef {Object} ContentLengthStats
 * @property {number} contentLength content length header content
 */

// Key to track total time for winner gateway to respond
const TOTAL_WINNER_RESPONSE_TIME_ID = 'totalWinnerResponseTime'
// Key to track total successful requests
const TOTAL_WINNER_SUCCESSFUL_REQUESTS_ID = 'totalWinnerSuccessfulRequests'
// Key to track total cached requests
const TOTAL_CACHED_RESPONSES_ID = 'totalCachedResponses'
// Key to track total content length of responses
const TOTAL_CONTENT_LENGTH_BYTES_ID = 'totalContentLengthBytes'
// Key to track total cached content length of responses
const TOTAL_CACHED_CONTENT_LENGTH_BYTES_ID = 'totalCachedContentLengthBytes'
// Key to track content size histogram
const CONTENT_LENGTH_HISTOGRAM_ID = 'contentLengthHistogram'

/**
 * Durable Object for keeping generic Metrics of gateway.nft.storage
 */
export class SummaryMetrics1 {
  constructor(state) {
    this.state = state

    // `blockConcurrencyWhile()` ensures no requests are delivered until initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      // Total response time
      this.totalWinnerResponseTime =
        (await this.state.storage.get(TOTAL_WINNER_RESPONSE_TIME_ID)) || 0
      // Total successful requests
      this.totalWinnerSuccessfulRequests =
        (await this.state.storage.get(TOTAL_WINNER_SUCCESSFUL_REQUESTS_ID)) || 0
      // Total cached requests
      this.totalCachedResponses =
        (await this.state.storage.get(TOTAL_CACHED_RESPONSES_ID)) || 0
      // Total content length responses
      this.totalContentLengthBytes =
        (await this.state.storage.get(TOTAL_CONTENT_LENGTH_BYTES_ID)) ||
        BigInt(0)
      // Total cached content length responses
      this.totalCachedContentLengthBytes =
        (await this.state.storage.get(TOTAL_CACHED_CONTENT_LENGTH_BYTES_ID)) ||
        BigInt(0)
      // Content length histogram
      this.contentLengthHistogram =
        (await this.state.storage.get(CONTENT_LENGTH_HISTOGRAM_ID)) ||
        createHistogramObject()
    })
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // Apply requested action.
    let url = new URL(request.url)

    // GET
    if (request.method === 'GET') {
      switch (url.pathname) {
        case '/metrics':
          return new Response(
            JSON.stringify({
              totalWinnerResponseTime: this.totalWinnerResponseTime,
              totalWinnerSuccessfulRequests: this.totalWinnerSuccessfulRequests,
              totalCachedResponses: this.totalCachedResponses,
              totalContentLengthBytes: this.totalContentLengthBytes.toString(),
              totalCachedContentLengthBytes:
                this.totalCachedContentLengthBytes.toString(),
              contentLengthHistogram: this.contentLengthHistogram,
            })
          )
        default:
          return new Response('Not found', { status: 404 })
      }
    }

    // POST
    let data
    switch (url.pathname) {
      case '/metrics/winner':
        /** @type {ResponseWinnerStats} */
        data = await request.json()
        await this._updateWinnerMetrics(data)
        return new Response()
      case '/metrics/cache':
        /** @type {ContentLengthStats} */
        data = await request.json()
        await this._updateWinnerMetrics(data)
        return new Response()
      default:
        return new Response('Not found', { status: 404 })
    }
  }

  /**
   * @param {ContentLengthStats} stats
   */
  async _updatedCacheMetrics(stats) {
    // Update metrics
    this.totalCachedResponses += 1
    this.totalCachedContentLengthBytes += BigInt(stats.contentLength)
    this._updateContentLengthMetrics(stats)
    // Sabe updated metrics
    await Promise.all([
      this.state.storage.put(
        TOTAL_CACHED_RESPONSES_ID,
        this.totalCachedResponses
      ),
      this.state.storage.put(
        TOTAL_CACHED_CONTENT_LENGTH_BYTES_ID,
        this.totalCachedContentLengthBytes
      ),
      this.state.storage.put(
        TOTAL_CONTENT_LENGTH_BYTES_ID,
        this.totalContentLengthBytes
      ),
      this.state.storage.put(
        CONTENT_LENGTH_HISTOGRAM_ID,
        this.contentLengthHistogram
      ),
    ])
  }

  /**
   * @param {ResponseWinnerStats} stats
   */
  async _updateWinnerMetrics(stats) {
    // Updated Metrics
    this.totalWinnerResponseTime += stats.responseTime
    this.totalWinnerSuccessfulRequests += 1
    this._updateContentLengthMetrics(stats)
    // Save updated Metrics
    await Promise.all([
      this.state.storage.put(
        TOTAL_WINNER_RESPONSE_TIME_ID,
        this.totalWinnerResponseTime
      ),
      this.state.storage.put(
        TOTAL_WINNER_SUCCESSFUL_REQUESTS_ID,
        this.totalWinnerSuccessfulRequests
      ),
      this.state.storage.put(
        TOTAL_CONTENT_LENGTH_BYTES_ID,
        this.totalContentLengthBytes
      ),
      this.state.storage.put(
        CONTENT_LENGTH_HISTOGRAM_ID,
        this.contentLengthHistogram
      ),
    ])
  }

  /**
   * @param {ContentLengthStats} stats
   */
  _updateContentLengthMetrics(stats) {
    this.totalContentLengthBytes += BigInt(stats.contentLength)

    // Update histogram
    const tmpHistogram = {
      ...this.contentLengthHistogram,
    }

    // Get all the histogram buckets where the content size is smaller
    const histogramCandidates = contentLengthHistogram.filter(
      (h) => stats.contentLength < h
    )
    histogramCandidates.forEach((candidate) => {
      tmpHistogram[candidate] += 1
    })

    this.contentLengthHistogram = tmpHistogram
  }
}

function createHistogramObject() {
  const h = contentLengthHistogram.map((h) => [h, 0])
  return Object.fromEntries(h)
}

// We will count occurences per bucket where content size is less or equal than bucket value
export const contentLengthHistogram = [
  0.5, 1, 2, 5, 25, 50, 100, 500, 1000, 5000, 10000, 15000, 20000, 30000, 32000,
].map((v) => v * Math.pow(1024, 2))
