import {
  responseTimeHistogram,
  createResponseTimeHistogramObject,
} from '../utils/histogram.js'

/**
 * @typedef {'CID'|'CID+PATH'} QueryType
 *
 * @typedef {Object} SummaryMetrics
 * @property {number} totalWinnerResponseTime total response time of the requests
 * @property {number} totalWinnerSuccessfulRequests total number of successful requests
 * @property {number} totalCachedResponseTime total response time to forward cached responses
 * @property {number} totalCachedResponses total number of cached responses
 * @property {BigInt} totalContentLengthBytes total content length of responses
 * @property {BigInt} totalCachedContentLengthBytes total content length of cached responses
 * @property {Record<QueryType, number>} totalResponsesByQueryType
 * @property {Record<string, number>} contentLengthHistogram
 * @property {Record<string, number>} responseTimeHistogram
 *
 * @typedef {Object} FetchStats
 * @property {string} [pathname] fetched pathname
 * @property {number} [responseTime] number of milliseconds to get response
 * @property {number} [contentLength] content length header content
 */

// Key to track total time for winner gateway to respond
const TOTAL_WINNER_RESPONSE_TIME_ID = 'totalWinnerResponseTime'
// Key to track total successful requests
const TOTAL_WINNER_SUCCESSFUL_REQUESTS_ID = 'totalWinnerSuccessfulRequests'
// Key to track total time for forwarding cached response
const TOTAL_CACHED_RESPONSE_TIME_ID = 'totalCachedResponseTime'
// Key to track total cached requests
const TOTAL_CACHED_RESPONSES_ID = 'totalCachedResponses'
// Key to track total content length of responses
const TOTAL_CONTENT_LENGTH_BYTES_ID = 'totalContentLengthBytes'
// Key to track total cached content length of responses
const TOTAL_CACHED_CONTENT_LENGTH_BYTES_ID = 'totalCachedContentLengthBytes'
// Key to track content size histogram
const CONTENT_LENGTH_HISTOGRAM_ID = 'contentLengthHistogram'
// Key to track response time histogram
const RESPONSE_TIME_HISTOGRAM_ID = 'responseTimeHistogram'
// Key to track responses by query type
const TOTAL_RESPONSES_BY_QUERY_TYPE_ID = 'totalResponsesByQueryType'

/**
 * Durable Object for keeping summary metrics of nft.storage Gateway
 */
export class SummaryMetrics0 {
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
      // Total cached response time
      this.totalCachedResponseTime =
        (await this.state.storage.get(TOTAL_CACHED_RESPONSE_TIME_ID)) || 0
      // Total cached requests
      this.totalCachedResponses =
        (await this.state.storage.get(TOTAL_CACHED_RESPONSES_ID)) || 0
      /** @type {BigInt} */
      this.totalContentLengthBytes =
        (await this.state.storage.get(TOTAL_CONTENT_LENGTH_BYTES_ID)) ||
        BigInt(0)
      /** @type {BigInt} */
      this.totalCachedContentLengthBytes =
        (await this.state.storage.get(TOTAL_CACHED_CONTENT_LENGTH_BYTES_ID)) ||
        BigInt(0)
      /** @type {Record<QueryType, number>} */
      this.totalResponsesByQueryType =
        (await this.state.storage.get(TOTAL_RESPONSES_BY_QUERY_TYPE_ID)) ||
        createResponsesByQueryTypeObject()
      /** @type {Record<string, number>} */
      this.contentLengthHistogram =
        (await this.state.storage.get(CONTENT_LENGTH_HISTOGRAM_ID)) ||
        createContentLengthHistogramObject()
      /** @type {Record<string, number>} */
      this.responseTimeHistogram =
        (await this.state.storage.get(RESPONSE_TIME_HISTOGRAM_ID)) ||
        createResponseTimeHistogramObject()
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
              totalCachedResponseTime: this.totalCachedResponseTime,
              totalCachedResponses: this.totalCachedResponses,
              totalContentLengthBytes: this.totalContentLengthBytes.toString(),
              totalCachedContentLengthBytes:
                this.totalCachedContentLengthBytes.toString(),
              totalResponsesByQueryType: this.totalResponsesByQueryType,
              contentLengthHistogram: this.contentLengthHistogram,
              responseTimeHistogram: this.responseTimeHistogram,
            })
          )
        default:
          return new Response('Not found', { status: 404 })
      }
    }

    // POST
    /** @type {FetchStats} */
    const data = await request.json()
    switch (url.pathname) {
      case '/metrics/winner':
        await this._updateWinnerMetrics(data)
        break
      case '/metrics/cache':
        await this._updatedCacheMetrics(data)
        break
      default:
        throw new Error('Not found')
    }

    return new Response()
  }

  /**
   * @param {FetchStats} stats
   */
  async _updatedCacheMetrics(stats) {
    // Update metrics
    this.totalCachedResponseTime += stats.responseTime
    this.totalCachedResponses += 1
    this.totalCachedContentLengthBytes += BigInt(stats.contentLength)
    this._updateContentMetrics(stats)
    this._updateResponseTimeHistogram(stats)
    // Save updated metrics
    await Promise.all([
      this.state.storage.put(
        TOTAL_CACHED_RESPONSE_TIME_ID,
        this.totalCachedResponseTime
      ),
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
      this.state.storage.put(
        RESPONSE_TIME_HISTOGRAM_ID,
        this.responseTimeHistogram
      ),
      this.state.storage.put(
        TOTAL_RESPONSES_BY_QUERY_TYPE_ID,
        this.totalResponsesByQueryType
      ),
    ])
  }

  /**
   * @param {FetchStats} stats
   */
  async _updateWinnerMetrics(stats) {
    // Updated Metrics
    this.totalWinnerResponseTime += stats.responseTime
    this.totalWinnerSuccessfulRequests += 1
    this._updateContentMetrics(stats)
    this._updateResponseTimeHistogram(stats)
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
      this.state.storage.put(
        RESPONSE_TIME_HISTOGRAM_ID,
        this.responseTimeHistogram
      ),
      this.state.storage.put(
        TOTAL_RESPONSES_BY_QUERY_TYPE_ID,
        this.totalResponsesByQueryType
      ),
    ])
  }

  /**
   * @param {FetchStats} stats
   */
  _updateContentMetrics(stats) {
    // Content Length
    this.totalContentLengthBytes += BigInt(stats.contentLength)
    this.contentLengthHistogram = getUpdatedHistogram(
      this.contentLengthHistogram,
      contentLengthHistogram,
      stats.contentLength
    )

    // Query type
    if (stats.pathname && stats.pathname !== '/') {
      this.totalResponsesByQueryType['CID+PATH'] += 1
    } else {
      this.totalResponsesByQueryType['CID'] += 1
    }
  }

  /**
   * @param {FetchStats} stats
   */
  _updateResponseTimeHistogram(stats) {
    this.responseTimeHistogram = getUpdatedHistogram(
      this.responseTimeHistogram,
      responseTimeHistogram,
      stats.responseTime
    )
  }
}

function getUpdatedHistogram(histogramData, histogramBuckets, value) {
  const updatedHistogram = {
    ...histogramData,
  }
  // Update all the histogram buckets where the response time is smaller
  histogramBuckets
    .filter((h) => value < h)
    .forEach((candidate) => {
      updatedHistogram[candidate] += 1
    })

  return updatedHistogram
}

/**
 * @return {Record<QueryType, number>}
 */
function createResponsesByQueryTypeObject() {
  const e = queryType.map((t) => [t, 0])
  return Object.fromEntries(e)
}

function createContentLengthHistogramObject() {
  const h = contentLengthHistogram.map((h) => [h, 0])
  return Object.fromEntries(h)
}

// Either CID is stored in NFT.storage or not
export const queryType = ['CID', 'CID+PATH']

// We will count occurences per bucket where content size is less or equal than bucket value
export const contentLengthHistogram = [
  0.5, 1, 2, 5, 25, 50, 100, 500, 1000, 5000, 10000, 15000, 20000, 30000, 32000,
].map((v) => v * Math.pow(1024, 2))
