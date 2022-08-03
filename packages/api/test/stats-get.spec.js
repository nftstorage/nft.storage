import test from 'ava'
import { createClientWithUser } from './scripts/helpers.js'
import {
  getMiniflareContext,
  setupMiniflareContext,
} from './scripts/test-context.js'

test.beforeEach(async (t) => {
  await setupMiniflareContext(t)
})

test('Should return proper response for /stats route, based on seeded demoData', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const demoData = {
    deals_size_total: 169389985753391,
    deals_size_total_prev: 169334115720738,
    uploads_blob_total: 12420729,
    uploads_car_total: 17711308,
    uploads_multipart_total: 1456388,
    uploads_nft_total: 685866,
    uploads_past_7_total: 2011366,
    uploads_remote_total: 11077834,
  }
  const res = await mf.dispatchFetch('http://miniflare.test/stats', {
    headers: { Authorization: `Bearer ${client.token}` },
  })

  const { ok, data } = await res.json()

  t.true(ok)

  // this is brittle, but it's simple
  t.deepEqual(data, demoData)
})
