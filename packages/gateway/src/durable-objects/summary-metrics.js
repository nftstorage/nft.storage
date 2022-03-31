import multicodec from 'multicodec'
import { CID } from 'multiformats/cid'
import {
  responseTimeHistogram,
  createResponseTimeHistogramObject,
} from '../utils/histogram.js'

/**
 * @typedef {Object} SummaryMetrics
 * @property {number} totalWinnerResponseTime total response time of the requests
 * @property {number} totalWinnerSuccessfulRequests total number of successful requests
 * @property {number} totalCachedResponseTime total response time to forward cached responses
 * @property {number} totalCachedResponses total number of cached responses
 * @property {BigInt} totalContentLengthBytes total content length of responses
 * @property {BigInt} totalCachedContentLengthBytes total content length of cached responses
 * @property {Record<string, number>} totalResponsesByIpldCodec
 * @property {Record<string, number>} totalResponsesByMultihashFunction
 * @property {Record<string, number>} contentLengthHistogram
 * @property {Record<string, number>} responseTimeHistogram
 *
 * @typedef {Object} FetchStats
 * @property {string} cid fetched CID
 * @property {number} responseTime number of milliseconds to get response
 * @property {number} contentLength content length header content
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
// Key to track responses by ipld codec
const TOTAL_RESPONSES_BY_IPLD_CODEC_ID = 'totalResponsesByIpldCodec'
// Key to track responses by multihash function
const TOTAL_RESPONSES_BY_MULTIHASH_FUNCTION_ID =
  'totalResponsesByMultihashFunction'

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
      // Total content length responses
      this.totalContentLengthBytes =
        (await this.state.storage.get(TOTAL_CONTENT_LENGTH_BYTES_ID)) ||
        BigInt(0)
      // Total cached content length responses
      this.totalCachedContentLengthBytes =
        (await this.state.storage.get(TOTAL_CACHED_CONTENT_LENGTH_BYTES_ID)) ||
        BigInt(0)
      /** @type {Record<string, number>} */
      this.totalResponsesByIpldCodec =
        (await this.state.storage.get(TOTAL_RESPONSES_BY_IPLD_CODEC_ID)) || {}
      /** @type {Record<string, number>} */
      this.totalResponsesByMultihashFunction =
        (await this.state.storage.get(
          TOTAL_RESPONSES_BY_MULTIHASH_FUNCTION_ID
        )) || {}
      // Content length histogram
      this.contentLengthHistogram =
        (await this.state.storage.get(CONTENT_LENGTH_HISTOGRAM_ID)) ||
        createContentLengthHistogramObject()
      // Response time histogram
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
              totalResponsesByIpldCodec: this.totalResponsesByIpldCodec,
              totalResponsesByMultihashFunction:
                this.totalResponsesByMultihashFunction,
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
        return new Response()
      case '/metrics/cache':
        await this._updatedCacheMetrics(data)
        return new Response()
      default:
        return new Response('Not found', { status: 404 })
    }
  }

  /**
   * @param {FetchStats} stats
   */
  async _updatedCacheMetrics(stats) {
    // Update metrics
    this.totalCachedResponseTime += stats.responseTime
    this.totalCachedResponses += 1
    this.totalCachedContentLengthBytes += BigInt(stats.contentLength)
    this._updateCidMetrics(stats)
    this._updateContentLengthMetrics(stats)
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
        TOTAL_RESPONSES_BY_IPLD_CODEC_ID,
        this.totalResponsesByIpldCodec
      ),
      this.state.storage.put(
        TOTAL_RESPONSES_BY_MULTIHASH_FUNCTION_ID,
        this.totalResponsesByMultihashFunction
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
    this._updateCidMetrics(stats)
    this._updateContentLengthMetrics(stats)
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
        TOTAL_RESPONSES_BY_IPLD_CODEC_ID,
        this.totalResponsesByIpldCodec
      ),
      this.state.storage.put(
        TOTAL_RESPONSES_BY_MULTIHASH_FUNCTION_ID,
        this.totalResponsesByMultihashFunction
      ),
    ])
  }

  /**
   * @param {FetchStats} stats
   */
  _updateCidMetrics(stats) {
    const cid = CID.parse(stats.cid)
    const cidInspectObj = CID.inspectBytes(cid.bytes.subarray(0, 10))
    // IPLD codec
    const ipldCodec = multicodec.getNameFromCode(cidInspectObj.codec)
    if (this.totalResponsesByIpldCodec[ipldCodec]) {
      // increment one if exists, otherwise initialize it
      this.totalResponsesByIpldCodec[ipldCodec] += 1
    } else {
      this.totalResponsesByIpldCodec[ipldCodec] = 1
    }

    // Multihash function
    const multihashFunction = multicodec.getNameFromCode(
      cidInspectObj.multihashCode
    )
    if (this.totalResponsesByMultihashFunction[multihashFunction]) {
      // increment one if exists, otherwise initialize it
      this.totalResponsesByMultihashFunction[multihashFunction] += 1
    } else {
      this.totalResponsesByMultihashFunction[multihashFunction] = 1
    }
  }

  /**
   * @param {FetchStats} stats
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

  /**
   * @param {FetchStats} stats
   */
  _updateResponseTimeHistogram(stats) {
    const tmpHistogram = {
      ...this.responseTimeHistogram,
    }

    // Get all the histogram buckets where the response time is smaller
    const histogramCandidates = responseTimeHistogram.filter(
      (h) => stats.responseTime < h
    )

    histogramCandidates.forEach((candidate) => {
      tmpHistogram[candidate] += 1
    })

    this.responseTimeHistogram = tmpHistogram
  }
}

function createContentLengthHistogramObject() {
  const h = contentLengthHistogram.map((h) => [h, 0])
  return Object.fromEntries(h)
}

// We will count occurences per bucket where content size is less or equal than bucket value
export const contentLengthHistogram = [
  0.5, 1, 2, 5, 25, 50, 100, 500, 1000, 5000, 10000, 15000, 20000, 30000, 32000,
].map((v) => v * Math.pow(1024, 2))
