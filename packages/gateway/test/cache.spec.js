import test from 'ava'
import { getMiniflare } from './utils.js'

test.beforeEach((t) => {
  // Create a new Miniflare environment for each test
  t.context = {
    mf: getMiniflare(),
  }
})

// Miniflare cache sometimes is not yet setup...
test.skip('Caches content', async (t) => {
  const url =
    'https://bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq.ipfs.localhost:8787/'
  const content = 'Hello nft.storage! 😎'
  const { mf } = t.context

  const caches = await mf.getCaches()

  const response = await mf.dispatchFetch(url)
  await response.waitUntil()
  t.is(await response.text(), content)

  const cachedRes = await caches.default.match(url)
  t.is(await cachedRes.text(), content)
})
