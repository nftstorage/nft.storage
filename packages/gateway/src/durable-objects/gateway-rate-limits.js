/**
 * @typedef {Object} RateLimitResponse
 * @property {Record<string, boolean>} shouldPreventRateLimit whether request should be prevented per gateway
 *
 * @typedef {Object} RateLimitCharacteristics
 * @property {number} RATE_LIMIT_REQUESTS
 * @property {number} RATE_LIMIT_TIMEFRAME
 */

/**
 * Durable Object to keep track of gateway rating limits.
 * State: number[]
 */
export class GatewayRateLimits4 {
  constructor(state, env) {
    this.state = state
    this.id = this.state.id.name

    /** @type {Array<string>} */
    this.ipfsGateways = JSON.parse(env.IPFS_GATEWAYS)
    // `blockConcurrencyWhile()` ensures no requests are delivered until initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      // Get state and initialize if not existing
      /** @type {Map<string, Array<number>>} */
      this.gatewayUsage = new Map()

      const storedUsagePerGw = await Promise.all(
        this.ipfsGateways.map(async (gw) => {
          /** @type {Array<number>} */
          const value = (await this.state.storage.get(gw)) || []

          return {
            gw,
            value,
          }
        })
      )

      storedUsagePerGw.forEach(({ gw, value }) => {
        this.gatewayUsage.set(gw, value)
      })
    })
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // Apply requested action.
    let url = new URL(request.url)
    switch (url.pathname) {
      case '/request':
        const shouldPreventRateLimit = (
          await Promise.all(
            this.ipfsGateways.map(async (gwUrl) => {
              return {
                gwUrl,
                shouldPreventRequest: await this._shouldPreventRequest(gwUrl),
              }
            })
          )
        ).reduce(
          (obj, item) =>
            Object.assign(obj, { [item.gwUrl]: item.shouldPreventRequest }),
          {}
        )

        return new Response(JSON.stringify(shouldPreventRateLimit))
      default:
        return new Response('Not found', { status: 404 })
    }
  }

  /**
   * @param {string} gatewayUrl
   */
  async _shouldPreventRequest(gatewayUrl) {
    const rateLimitConfig = getRateLimitConfig(gatewayUrl)
    if (rateLimitConfig.RATE_LIMIT_REQUESTS === Infinity) {
      return false
    }

    // Filter out outdated requests
    const now = Date.now()
    const rateLimitUsage = this.gatewayUsage
      .get(gatewayUrl)
      .filter((ts) => now - ts <= rateLimitConfig.RATE_LIMIT_TIMEFRAME)

    // Add new request to track
    if (rateLimitUsage.length < rateLimitConfig.RATE_LIMIT_REQUESTS) {
      rateLimitUsage.push(Date.now())
      this.gatewayUsage.set(gatewayUrl, rateLimitUsage)

      await this.state.storage.put(gatewayUrl, rateLimitUsage, {
        allowUnconfirmed: true,
      })
      return false
    }

    return true
  }
}

const SECOND = 1000
const MINUTE = SECOND * 60

/**
 * Get rate limiting characteristics of a given Gateway.
 *
 * @param {string} gatewayUrl
 * @return {RateLimitCharacteristics}
 */
function getRateLimitConfig(gatewayUrl) {
  switch (gatewayUrl) {
    case 'https://ipfs.io':
      return {
        RATE_LIMIT_REQUESTS: Infinity,
        RATE_LIMIT_TIMEFRAME: SECOND * 10,
      }
    case 'https://cf.nftstorage.link':
      return {
        RATE_LIMIT_REQUESTS: Infinity,
        RATE_LIMIT_TIMEFRAME: SECOND * 10,
      }
    case 'https://nft-storage.mypinata.cloud/':
      return {
        RATE_LIMIT_REQUESTS: 400,
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
