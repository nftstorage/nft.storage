import { stores } from '../constants.js'
import { encodeIndexKey, decodeIndexKey } from '../utils/nfts-index.js'

/**
 * @typedef {{
 *   key: string
 *   pinStatus: import('../bindings').PinStatus
 *   size: number
 *   name?: string
 *   meta?: Record<string, string>
 * }} IndexData
 * @typedef {{ user: { sub: string }, created: string, cid: string }} Key
 */

/**
 * @param {Key} key
 * @param {IndexData} data
 * @returns {Promise<void>}
 */
export async function set(key, data) {
  await stores.nftsIndex.put(encodeIndexKey(key), '', { metadata: data })
}

/**
 * @param {Key} key
 */
export async function remove(key) {
  await stores.nftsIndex.delete(encodeIndexKey(key))
}

/**
 * @param {string} [prefix]
 * @returns {AsyncIterable<[Key, IndexData]>}
 */
export async function* entries(prefix) {
  let done = false
  let cursor
  while (!done) {
    // @ts-ignore
    const list = await stores.nftsIndex.list({ prefix, cursor })
    for (const k of list.keys) {
      if (k == null) continue
      yield [decodeIndexKey(k.name), k.metadata]
    }
    cursor = list.cursor
    done = list.list_complete
  }
}
