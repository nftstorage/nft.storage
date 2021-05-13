import { stores } from '../constants.js'

/**
 * @typedef {{ cid: string, name?: string, delegates: string[] }} QueuedPin
 */

/**
 * @returns {AsyncIterable<[string, QueuedPin]>}
 */
export async function* entries() {
  let done = false
  let cursor
  while (!done) {
    // @ts-ignore
    const list = await stores.pinataQueue.list({ cursor })
    for (const k of list.keys) {
      if (k == null) continue
      yield [k.name, k.metadata]
    }
    cursor = list.cursor
    done = list.list_complete
  }
}

/**
 * @param {string} key
 */
export async function add(item) {
  await stores.pinataQueue.put
}

/**
 * @param {string} key
 */
export async function remove(key) {
  await stores.pinataQueue.delete(key)
}
