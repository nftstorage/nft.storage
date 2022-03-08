import test from 'ava'
import { createErrorHtmlContent } from '../src/errors.js'

import { getMiniflare } from './utils.js'

test.beforeEach((t) => {
  // Create a new Miniflare environment for each test
  t.context = {
    mf: getMiniflare(),
  }
})

test('Fails when invalid cid with IPFS canonical resolution', async (t) => {
  const { mf } = t.context

  const response = await mf.dispatchFetch(
    'https://localhost:8787/ipfs/bafy.../path'
  )
  t.is(response.status, 400)

  const textResponse = await response.text()
  t.is(
    textResponse,
    createErrorHtmlContent(400, 'invalid CID: bafy...: Non-base32 character')
  )
})

test('should resolve a cid v0 with IPFS canonical resolution', async (t) => {
  const { mf } = t.context

  const response = await mf.dispatchFetch(
    'https://localhost:8787/ipfs/QmbWqxBEKC3P8tqsKc98xmWNzrzDtRLMiMPL8wBuTGsMnR'
  )
  await response.waitUntil()
  t.is(response.status, 302)
  t.is(
    response.headers.get('location'),
    'https://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.localhost:8787/'
  )
})

test('should resolve a cid v1 with IPFS canonical resolution', async (t) => {
  const { mf } = t.context

  const response = await mf.dispatchFetch(
    'https://localhost:8787/ipfs/bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq'
  )
  await response.waitUntil()
  t.is(response.status, 302)
  t.is(
    response.headers.get('location'),
    'https://bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq.ipfs.localhost:8787/'
  )
})

test('should resolve a cid and path with IPFS canonical resolution', async (t) => {
  const { mf } = t.context

  const response = await mf.dispatchFetch(
    'https://localhost:8787/ipfs/bafybeifvsmjgbhck72pabliifeo35cew5yhxujfqjxg4g32vr3yv24h6zu/path/file.txt'
  )
  await response.waitUntil()
  t.is(response.status, 302)
  t.is(
    response.headers.get('location'),
    'https://bafybeifvsmjgbhck72pabliifeo35cew5yhxujfqjxg4g32vr3yv24h6zu.ipfs.localhost:8787/path/file.txt'
  )
})

test('should resolve a cid and path with IPFS canonical resolution when subdomain also used', async (t) => {
  const { mf } = t.context

  const response = await mf.dispatchFetch(
    'https://bafybeifvsmjgbhck72pabliifeo35cew5yhxujfqjxg4g32vr3yv24h6zu.ipfs.localhost:8787/ipfs/bafybeifvsmjgbhck72pabliifeo35cew5yhxujfqjxg4g32vr3yv24h6zu/path/file.txt'
  )
  await response.waitUntil()
  t.is(response.status, 302)
  t.is(
    response.headers.get('location'),
    'https://bafybeifvsmjgbhck72pabliifeo35cew5yhxujfqjxg4g32vr3yv24h6zu.ipfs.localhost:8787/path/file.txt'
  )
})

test('should resolve a cid IPFS canonical resolution keeping query parameters', async (t) => {
  const { mf } = t.context
  const queryString = '?key=value'

  const response = await mf.dispatchFetch(
    `https://localhost:8787/ipfs/bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq${queryString}`
  )
  await response.waitUntil()
  t.is(response.status, 302)
  t.is(
    response.headers.get('location'),
    `https://bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq.ipfs.localhost:8787/${queryString}`
  )
})

test('should resolve a cid IPFS canonical resolution with same path as IPFS path', async (t) => {
  const { mf } = t.context

  const response = await mf.dispatchFetch(
    'https://localhost:8787/ipfs/bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq/ipfs/bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq'
  )
  await response.waitUntil()
  t.is(response.status, 302)
  t.is(
    response.headers.get('location'),
    'https://bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq.ipfs.localhost:8787/ipfs/bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq'
  )
})
