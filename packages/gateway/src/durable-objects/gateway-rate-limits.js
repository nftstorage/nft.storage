/**
 * @typedef {Object} RateLimitResponse
 * @property {boolean} shouldBlock request should be blocked
 *
 * @typedef {Object} RateLimitCharacteristics
 * @property {number} RATE_LIMIT_REQUESTS
 * @property {number} RATE_LIMIT_TIMEFRAME
 */

/**
 * Durable Object to keep track of gateway rating limits.
 * State: number[]
 */
export class GatewayRateLimits0 {
  constructor(state) {
    this.state = state
    this.id = this.state.id.name
    /** @type {RateLimitCharacteristics} */
    this.rateLimitCharacteristics = getRateLimitingCharacteristics(this.id)

    // `blockConcurrencyWhile()` ensures no requests are delivered until initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      // Get state and initialize if not existing with gateway state
      /** @type {Array<number>} */
      this.rateLimitUsage = (await this.state.storage.get(this.id)) || []
    })
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // Apply requested action.
    let url = new URL(request.url)
    switch (url.pathname) {
      case '/request':
        // Filter out outdated requests
        const now = Date.now()
        this.rateLimitUsage = this.rateLimitUsage.filter(
          (ts) => now - ts <= this.rateLimitCharacteristics.RATE_LIMIT_TIMEFRAME
        )

        // Add new request to track
        if (
          this.rateLimitUsage.length <
          this.rateLimitCharacteristics.RATE_LIMIT_REQUESTS
        ) {
          this.rateLimitUsage.push(Date.now())
          await this.state.storage.put(this.id, this.rateLimitUsage)

          return new Response(
            JSON.stringify({
              shouldBlock: false,
            })
          )
        }

        // Block to prevent rate limit
        return new Response(
          JSON.stringify({
            shouldBlock: true,
          })
        )
      default:
        return new Response('Not found', { status: 404 })
    }
  }
}

const MINUTE = 1000 * 60

/**
 * Get rate limiting characteristics of a given Gateway.
 *
 * @param {string} gatewayUrl
 * @return {RateLimitCharacteristics}
 */
function getRateLimitingCharacteristics(gatewayUrl) {
  switch (gatewayUrl) {
    case 'https://ipfs.io':
      return {
        RATE_LIMIT_REQUESTS: 800,
        RATE_LIMIT_TIMEFRAME: MINUTE,
      }
    case 'https://cf-ipfs.com':
      return {
        RATE_LIMIT_REQUESTS: 100,
        RATE_LIMIT_TIMEFRAME: MINUTE,
      }
    case 'https://nft-storage.mypinata.cloud/':
      return {
        RATE_LIMIT_REQUESTS: 200,
        RATE_LIMIT_TIMEFRAME: MINUTE,
      }
    // Default to 100
    default:
      return {
        RATE_LIMIT_REQUESTS: 100,
        RATE_LIMIT_TIMEFRAME: MINUTE,
      }
  }
}
