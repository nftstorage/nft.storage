/* eslint-env serviceworker */

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
