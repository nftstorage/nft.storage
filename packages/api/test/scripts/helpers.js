import stores from './stores.js'

export async function clearStores() {
  for (const store of Object.values(stores)) {
    await store.clear()
  }
}
