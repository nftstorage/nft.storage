/**
 * Try to serve static assets or the 404 page
 * @param {FetchEvent} event
 */
export async function notFound(event) {
  return new Response('404 not found', { status: 404 })
}

/**
 * @template T
 * @param {() => Promise<T | void>} fn
 * @param {string} label
 * @returns {Promise<T | void>}
 */
export async function timed(fn, label) {
  console.log(`START: ${label}`)
  console.time(`END: ${label}`)
  try {
    const res = await fn()
    return res
  } finally {
    console.timeEnd(`END: ${label}`)
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
