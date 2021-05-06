/**
 * Try to serve static assets or the 404 page
 * @param {FetchEvent} event
 */
export async function notFound(event) {
  return new Response('404 not found', { status: 404 })
}

/**
 * @template T
 * @param {(ctx : import("../bindings").RouteContext) => Promise<T | void>} fn
 * @param {string} label
 * @param {import("../bindings").RouteContext} ctx
 * @returns {Promise<T | void>}
 */
export async function timed(fn, label, ctx) {
  const { sentry } = ctx
  sentry.addBreadcrumb({
    message: label,
  })
  try {
    const res = await fn(ctx)
    return res
  } catch (err) {
    sentry.captureException(err)
  }
}
