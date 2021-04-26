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
