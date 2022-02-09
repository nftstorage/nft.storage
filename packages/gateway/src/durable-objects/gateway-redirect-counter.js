/**
 * Durable Object for tracking Gateway Redirect counts.
 */
export class GatewayRedirectCounter0 {
  constructor(state) {
    this.state = state

    this.state.blockConcurrencyWhile(async () => {
      const stored = await this.state.storage.get('value')
      // After initialization, future reads do not need to access storage.
      this.value = stored || 0
    })
  }

  // Handle HTTP requests from clients.
  async fetch(request) {
    // Apply requested action.
    let url = new URL(request.url)
    switch (url.pathname) {
      case '/update':
        this.value++
        await this.state.storage.put('value', this.value)
        return new Response()
      case '/metrics':
        return new Response(
          JSON.stringify({
            gatewayRedirectCount: this.value,
          })
        )
      default:
        return new Response('Not found', { status: 404 })
    }
  }
}
