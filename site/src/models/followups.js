import { stores } from '../constants'

/**
 * @returns {AsyncIterable<[string, import("./pins").Pin]>}
 */
export async function* entries() {
  let done = false
  let cursor
  while (!done) {
    // @ts-ignore
    const list = await stores.followups.list({ cursor })
    for (const k of list.keys) {
      if (k == null) continue
      yield [k.name, k.metadata]
    }
    cursor = list.cursor
    done = list.list_complete
  }
}

/**
 * @param {string} cid
 */
export async function remove(cid) {
  await stores.followups.delete(cid)
}
