import { stores } from '../constants'

/**
 * @typedef {{ cid: string, origins: string[] }} PinataQueueItem
 */

/**
 * @returns {AsyncIterable<[string, PinataQueueItem]>}
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
 * @param {PinataQueueItem} item
 */
export async function push(item) {
  const key = `${new Date().toISOString()}/${item.cid}`
  await stores.pinataQueue.put(key, '', { metadata: item })
}

/**
 * @param {string} key
 */
export async function remove(key) {
  await stores.pinataQueue.delete(key)
}
