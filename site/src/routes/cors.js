import { HTTPError } from '../errors'

/**
 * @param {FetchEvent} event
 */
export function cors(event) {
  let headers = event.request.headers
  // Make sure the necessary headers are present for this to be a valid pre-flight request
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    /** @type {Record<string, string>} */
    let respHeaders = {
      'Content-Length': '0',
      'Access-Control-Allow-Origin': headers.get('origin') || '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Max-Age': '86400',
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      'Access-Control-Allow-Headers':
        headers.get('Access-Control-Request-Headers') || '',
    }

    return new Response(null, {
      status: 204,
      headers: respHeaders,
    })
  } else {
    return HTTPError.respond(
      new HTTPError('non CORS options request not allowed')
    )
  }
}
