import { handleRedirect } from '../utils/redirect.js'

/**
 *
 * @param {FetchEvent} event
 */
export async function auth(event) {
  const authorizedResponse = await handleRedirect(event)
  if (!authorizedResponse) {
    return new Response('Unauthorized', { status: 401 })
  }
  return new Response(null, {
    ...authorizedResponse,
  })
}
