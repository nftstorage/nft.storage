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

/**
 * Return the current value of the tag requested.
 *
 * @param {import('../utils/db-client-types.js').UserOutput} user
 * @param {string} tagName
 * @param {string} defaultValue
 * @returns  {string}
 */
export function getTagValue(user, tagName, defaultValue) {
  return (
    user.tags?.find((tag) => tag.tag === tagName && !tag.deleted_at)?.value ||
    defaultValue
  )
}

/**
 * Return true if a user has a tag with a given name and value.
 *
 * @param {import('../utils/db-client-types.js').UserOutput} user
 * @param {string} tagName
 * @param {string} value
 * @returns  {boolean}
 */
export function hasTag(user, tagName, value) {
  return Boolean(
    user.tags?.find(
      (tag) => tag.tag === tagName && tag.value === value && !tag.deleted_at
    )
  )
}

/**
 * @param {Array<object | any> | null} proposals
 * @return {object}
 */
export function getPendingProposals(proposals) {
  if (Array.isArray(proposals)) {
    return proposals.reduce((acc, p) => {
      if (p['tag']) {
        acc[p['tag']] = !p['admin_decision_type']
      }
      return acc
    }, {})
  }

  return {}
}
