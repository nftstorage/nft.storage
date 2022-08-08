import test from 'ava'
import { createClientWithUser, getRawClient } from './scripts/helpers.js'
import {
  getMiniflareContext,
  getTestServiceConfig,
  setupMiniflareContext,
} from './scripts/test-context.js'

test.beforeEach(async (t) => {
  await setupMiniflareContext(t)
})

test('should pin with just cid', async (t) => {
  // List
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const resEmptyPinList = await mf.dispatchFetch(
    'http://localhost:8787/pins?status=queued,pinning',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${client.token}` },
    }
  )
  const valueEmptyPinList = await resEmptyPinList.json()
  t.is(valueEmptyPinList.count, 0, 'Server response with empty pin requests')

  // Pin request
  const cid = 'bafkreihwlixzeusjrd5avlg53yidaoonf5r5srzumu7y5uuumtt7rxxbrm'
  const resPinCreate = await mf.dispatchFetch('http://miniflare.test/pins', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({
      cid,
    }),
  })
  const valuePinCreate = await resPinCreate.json()
  t.deepEqual(
    valuePinCreate.pin,
    {
      cid,
      meta: null,
      name: null,
      origins: null,
    },
    'Server responded with expected data for first pin'
  )

  // Upload
  const file = new Blob(['hello world!'], { type: 'application/text' })
  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: file,
  })
  const { ok } = await res.json()
  t.truthy(ok, 'Server response payload has `ok` property')

  // List
  const resPinList = await mf.dispatchFetch(
    'http://localhost:8787/pins?status=queued,pinning',
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${client.token}` },
    }
  )
  const valuePinList = await resPinList.json()
  t.is(valuePinList.count, 1, 'Server response with pin requests')
  t.is(
    valuePinList.results[0].requestid,
    cid,
    'Server response with pin requests created'
  )
})

test('should list pinned items when querying without filters', async (t) => {
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  // Pin request (unavailable on IPFS)
  const cid = 'bafkreiaoqabl7yiracpil3m7rgbgygky2wwqtvzom2lkdhy2pxchkjixae'
  await client.addPin({ cid, name: 'test' })

  // Make this CID 'Pinned' in our DB
  await getRawClient(config)
    .from('pin')
    .update({ status: 'Pinned', updated_at: new Date().toISOString() })
    .eq('content_cid', cid)

  const headers = { Authorization: `Bearer ${client.token}` }
  const res = await mf.dispatchFetch('http://miniflare.test/pins', { headers })
  const { count, results } = await res.json()
  t.is(count, 1)
  t.is(results[0].pin.cid, cid)
})
