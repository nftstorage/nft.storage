import { stores } from '../../src/constants.js'

export async function clearStores() {
  for (const store of Object.values(stores)) {
    /** @type {string[]} */
    const keys = []
    let cursor, done
    while (!done) {
      // @ts-ignore
      const list = await store.list({ cursor })
      // @ts-ignore
      keys.push(...list.keys.map((k) => k.name))
      cursor = list.cursor
      done = list.list_complete
    }
    for (const k of keys) {
      await store.delete(k)
    }
  }
}
