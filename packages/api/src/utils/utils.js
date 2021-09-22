import { CID } from 'multiformats/cid'
import { ErrorInvalidCid } from '../errors.js'

/**
 * Try to serve static assets or the 404 page
 * @param {FetchEvent} _event
 */
export async function notFound(_event) {
  return new Response('404 not found', { status: 404 })
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

/**
 * Parse CID and return v1 and original
 *
 * @param {string} cid
 */
export function parseCidPinning(cid) {
  try {
    const c = CID.parse(cid)
    return parseCid(cid)
  } catch (err) {
    return
  }
}

/**
 * Parse CID and return v1 and original
 *
 * @param {string} cid
 */
export function parseCid(cid) {
  try {
    const c = CID.parse(cid)
    return {
      contentCid: c.toV1().toString(),
      sourceCid: c.toString(),
    }
  } catch (err) {
    throw new ErrorInvalidCid(cid)
  }
}
