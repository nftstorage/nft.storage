// Key to track total time for winner gateway to respond
const TOTAL_WINNER_RESPONSE_TIME_ID = 'totalWinnerResponseTime'

/**
 * Durable Object for keeping generic Metrics of gateway.nft.storage
 */
export class GenericMetrics0 {
  constructor(state) {
    this.state = state

    // `blockConcurrencyWhile()` ensures no requests are delivered until initialization completes.
    this.state.blockConcurrencyWhile(async () => {
      // Total response time
      this.totalWinnerResponseTime =
        (await this.state.storage.get(TOTAL_WINNER_RESPONSE_TIME_ID)) || 0
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
        // Save updated Metrics
        await this.state.storage.put(
          TOTAL_WINNER_RESPONSE_TIME_ID,
          this.totalWinnerResponseTime
        )
        return new Response()
      case '/metrics':
        return new Response(this.totalWinnerResponseTime)
      default:
        return new Response('Not found', { status: 404 })
    }
  }
}
