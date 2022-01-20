/**
 * @typedef {Object} GenericMetrics
 * @property {number} totalWinnerResponseTime total response time of the requests
 * @property {number} totalWinnerSuccessfulRequests total number of successful requests
 */

// Key to track total time for winner gateway to respond
const TOTAL_WINNER_RESPONSE_TIME_ID = 'totalWinnerResponseTime'
// Key to track total successful requests
const TOTAL_WINNER_SUCCESSFUL_REQUESTS_ID = 'totalWinnerSuccessfulRequests'

/**
 * Durable Object for keeping generic Metrics of gateway.nft.storage
 */
export class GenericMetrics1 {
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
        this.totalWinnerResponseTime += data.responseTime
        this.totalWinnerSuccessfulRequests += 1
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
        ])
        return new Response()
      case '/metrics':
        return new Response(
          JSON.stringify({
            totalWinnerResponseTime: this.totalWinnerResponseTime,
            totalWinnerSuccessfulRequests: this.totalWinnerSuccessfulRequests,
          })
        )
      default:
        return new Response('Not found', { status: 404 })
    }
  }
}
