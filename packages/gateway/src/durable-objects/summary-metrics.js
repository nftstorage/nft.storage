import { NFTStorage } from 'nft.storage'
import { PinStatusMap } from '../utils/pins.js'
import {
  responseTimeHistogram,
  createResponseTimeHistogramObject,
} from '../utils/histogram.js'

/**
 * @typedef {'Stored'|'NotStored'} ContentStatus
 * @typedef {import('../utils/pins').PinStatus} PinStatus
 *
 * @typedef {Object} SummaryMetrics
 * @property {number} totalWinnerResponseTime total response time of the requests
 * @property {number} totalWinnerSuccessfulRequests total number of successful requests
 * @property {number} totalCachedResponseTime total response time to forward cached responses
 * @property {number} totalCachedResponses total number of cached responses
 * @property {number} totalErroredResponsesWithKnownContent total responses errored with content in NFT.storage
 * @property {BigInt} totalContentLengthBytes total content length of responses
 * @property {BigInt} totalCachedContentLengthBytes total content length of cached responses
 * @property {Record<ContentStatus, number>} totalResponsesByContentStatus
 * @property {Record<PinStatus, number>} totalResponsesByPinStatus
 * @property {Record<string, number>} contentLengthHistogram
 * @property {Record<string, number>} responseTimeHistogram
 * @property {Record<PinStatus, Record<string, number>>} responseTimeHistogramByPinStatus
 *
 * @typedef {Object} FetchStats
 * @property {string} cid fetched CID
 * @property {boolean} errored fetched CID request errored
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
// Key to track total errored requests with known content
const TOTAL_ERRORED_RESPONSES_WITH_KNOWN_CONTENT_ID =
  'totalErroredResponsesWithKnownContent'
// Key to track total content length of responses
const TOTAL_CONTENT_LENGTH_BYTES_ID = 'totalContentLengthBytes'
// Key to track total cached content length of responses
const TOTAL_CACHED_CONTENT_LENGTH_BYTES_ID = 'totalCachedContentLengthBytes'
// Key to track content size histogram
const CONTENT_LENGTH_HISTOGRAM_ID = 'contentLengthHistogram'
// Key to track response time histogram
const RESPONSE_TIME_HISTOGRAM_ID = 'responseTimeHistogram'
// Key to track response time histogram by pin status
const RESPONSE_TIME_HISTOGRAM_BY_PIN_STATUS_ID =
  'responseTimeHistogramByPinStatus'
// Key to track responses by content status
const TOTAL_RESPONSES_BY_CONTENT_STATUS_ID = 'totalResponsesByContentStatus'
// Key to track responses by pin status
const TOTAL_RESPONSES_BY_PIN_STATUS_ID = 'totalResponsesByPinStatus'

/**
 * Durable Object for keeping summary metrics of gateway.nft.storage
 */
export class SummaryMetrics0 {
  constructor(state) {
    this.state = state
    // @ts-ignore we don't need token just for check
    this.nftStorageClient = new NFTStorage({})

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
      // Total errored requests with known content
      this.totalErroredResponsesWithKnownContent =
        (await this.state.storage.get(
          TOTAL_ERRORED_RESPONSES_WITH_KNOWN_CONTENT_ID
        )) || 0
      /** @type {BigInt} */
      this.totalContentLengthBytes =
        (await this.state.storage.get(TOTAL_CONTENT_LENGTH_BYTES_ID)) ||
        BigInt(0)
      /** @type {BigInt} */
      this.totalCachedContentLengthBytes =
        (await this.state.storage.get(TOTAL_CACHED_CONTENT_LENGTH_BYTES_ID)) ||
        BigInt(0)
      /** @type {Record<ContentStatus, number>} */
      this.totalResponsesByContentStatus =
        (await this.state.storage.get(TOTAL_RESPONSES_BY_CONTENT_STATUS_ID)) ||
        createResponsesByContentStatusObject()
      /** @type {Record<PinStatus, number>} */
      this.totalResponsesByPinStatus =
        (await this.state.storage.get(TOTAL_RESPONSES_BY_PIN_STATUS_ID)) ||
        createResponsesByPinStatusObject()
      /** @type {Record<string, number>} */
      this.contentLengthHistogram =
        (await this.state.storage.get(CONTENT_LENGTH_HISTOGRAM_ID)) ||
        createContentLengthHistogramObject()
      /** @type {Record<string, number>} */
      this.responseTimeHistogram =
        (await this.state.storage.get(RESPONSE_TIME_HISTOGRAM_ID)) ||
        createResponseTimeHistogramObject()
      /** @type {Record<PinStatus, Record<string, number>>} */
      this.responseTimeHistogramByPinStatus =
        (await this.state.storage.get(
          RESPONSE_TIME_HISTOGRAM_BY_PIN_STATUS_ID
        )) || createResponseTimeHistogramByPinStatusObject()
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
              totalErroredResponsesWithKnownContent:
                this.totalErroredResponsesWithKnownContent,
              totalContentLengthBytes: this.totalContentLengthBytes.toString(),
              totalCachedContentLengthBytes:
                this.totalCachedContentLengthBytes.toString(),
              totalResponsesByContentStatus: this.totalResponsesByContentStatus,
              totalResponsesByPinStatus: this.totalResponsesByPinStatus,
              contentLengthHistogram: this.contentLengthHistogram,
              responseTimeHistogram: this.responseTimeHistogram,
              responseTimeHistogramByPinStatus:
                this.responseTimeHistogramByPinStatus,
            })
          )
        default:
          return new Response('Not found', { status: 404 })
      }
    }

    // POST
    /** @type {FetchStats} */
    const data = await request.json()
    await Promise.all([
      this._updateStatsMetrics(data, url),
      this._updateCidMetrics(data),
    ])

    return new Response()
  }

  /**
   * @param {FetchStats} data
   */
  async _updateCidMetrics({ cid, errored, responseTime }) {
    try {
      const statusRes = await this.nftStorageClient.check(cid)

      if (errored) {
        this.totalErroredResponsesWithKnownContent += 1

        await this.state.storage.put(
          TOTAL_ERRORED_RESPONSES_WITH_KNOWN_CONTENT_ID,
          this.totalErroredResponsesWithKnownContent
        )
      } else {
        this.totalResponsesByContentStatus['Stored'] += 1

        const pinStatus = PinStatusMap[statusRes.pin?.status]
        if (pinStatus) {
          this.totalResponsesByPinStatus[pinStatus] += 1
          this.responseTimeHistogramByPinStatus[pinStatus] =
            getUpdatedHistogram(
              this.responseTimeHistogramByPinStatus[pinStatus],
              responseTimeHistogram,
              responseTime
            )
        }

        await Promise.all([
          this.state.storage.put(
            TOTAL_RESPONSES_BY_CONTENT_STATUS_ID,
            this.totalResponsesByContentStatus
          ),
          pinStatus &&
            this.state.storage.put(
              TOTAL_RESPONSES_BY_PIN_STATUS_ID,
              this.totalResponsesByPinStatus
            ),
          this.state.storage.put(
            RESPONSE_TIME_HISTOGRAM_BY_PIN_STATUS_ID,
            this.responseTimeHistogramByPinStatus
          ),
        ])
      }
    } catch (err) {
      if (err.message === 'NFT not found') {
        // Update not existing CID
        this.totalResponsesByContentStatus['NotStored'] += 1

        await this.state.storage.put(
          TOTAL_RESPONSES_BY_CONTENT_STATUS_ID,
          this.totalResponsesByContentStatus
        )
      }
    }
  }

  /**
   * @param {FetchStats} stats
   * @param {URL} url
   */
  async _updateStatsMetrics(stats, url) {
    // Errored does not have winner/cache metrics to update
    if (stats.errored) {
      return
    }

    switch (url.pathname) {
      case '/metrics/winner':
        await this._updateWinnerMetrics(stats)
        break
      case '/metrics/cache':
        await this._updatedCacheMetrics(stats)
        break
      default:
        throw new Error('Not found')
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
    ])
  }

  /**
   * @param {FetchStats} stats
   */
  async _updateWinnerMetrics(stats) {
    // Updated Metrics
    this.totalWinnerResponseTime += stats.responseTime
    this.totalWinnerSuccessfulRequests += 1
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
    ])
  }

  /**
   * @param {FetchStats} stats
   */
  _updateContentLengthMetrics(stats) {
    this.totalContentLengthBytes += BigInt(stats.contentLength)
    this.contentLengthHistogram = getUpdatedHistogram(
      this.contentLengthHistogram,
      contentLengthHistogram,
      stats.contentLength
    )
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
 * @return {Record<PinStatus, number>}
 */
function createResponsesByPinStatusObject() {
  const e = Object.values(PinStatusMap).map((t) => [t, 0])
  return Object.fromEntries(e)
}

/**
 * @return {Record<ContentStatus, number>}
 */
function createResponsesByContentStatusObject() {
  const e = contentStatus.map((t) => [t, 0])
  return Object.fromEntries(e)
}

/**
 * @return {Record<PinStatus, Record<string, number>>}
 */
function createResponseTimeHistogramByPinStatusObject() {
  const pinStatusEntry = Object.values(PinStatusMap).map((t) => [
    t,
    createResponseTimeHistogramObject(),
  ])

  return Object.fromEntries(pinStatusEntry)
}

function createContentLengthHistogramObject() {
  const h = contentLengthHistogram.map((h) => [h, 0])
  return Object.fromEntries(h)
}

// Either CID is stored in NFT.storage or not
export const contentStatus = ['Stored', 'NotStored']

// We will count occurences per bucket where content size is less or equal than bucket value
export const contentLengthHistogram = [
  0.5, 1, 2, 5, 25, 50, 100, 500, 1000, 5000, 10000, 15000, 20000, 30000, 32000,
].map((v) => v * Math.pow(1024, 2))
