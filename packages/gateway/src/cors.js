/* eslint-env serviceworker */

/**
 * @param {import('itty-router').RouteHandler} handler
 * @returns {import('itty-router').RouteHandler}
 */
export function withCorsHeaders(handler) {
  /**
   * @param {Request} request
   * @returns {Promise<Response>}
   */
  return async (request, ...rest) => {
    const response = await handler(request, ...rest)
    return addCorsHeaders(request, response)
  }
}

/**
 * @param {Request} request
 * @param {Response} response
 * @returns {Response}
 */
export function addCorsHeaders(request, response) {
  // Clone the response so that it's no longer immutable (like if it comes from cache or fetch)
  response = new Response(response.body, response)
  const origin = request.headers.get('origin')
  if (origin) {
    response.headers.set('Access-Control-Allow-Origin', origin)
    response.headers.set('Vary', 'Origin')
  } else {
    response.headers.set('Access-Control-Allow-Origin', '*')
  }
  response.headers.set('Access-Control-Expose-Headers', 'Link')
  return response
}
