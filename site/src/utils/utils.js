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

/**
 * Sets a given `value` at the given `path` on a passed `object`.
 *
 * @example
 * ```js
 * const obj = { a: { b: { c: 1 }}}
 * setIn(obj, ['a', 'b', 'c'], 5)
 * obj.a.b.c //> 5
 * ```
 *
 * @template V
 * @param {any} object
 * @param {string[]} path
 * @param {V} value
 */
export const setIn = (object, path, value) => {
  const n = path.length - 1
  let target = object
  for (let [index, key] of path.entries()) {
    if (index === n) {
      target[key] = value
    } else {
      target = target[key]
    }
  }
}
