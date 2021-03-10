const { logoutHeaders, getAsset } = require("../utils/utils")

/**
 * Logout route
 * 
 * @param {FetchEvent} event
 */
export async function logout(event) {
  const url = new URL(event.request.url)
  const { headers } = logoutHeaders(event)
  const rsp = await getAsset(event)

  // Check for cookie header if they exist delete them if they dont redirect to origin
  return headers
    ? new Response(rsp.body, {
        ...rsp,
        headers: { ...rsp.headers, ...headers },
      })
    : Response.redirect(url.origin)
}
