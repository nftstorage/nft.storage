import test from 'ava'

import { getMiniflare } from './utils/index.js'

test.beforeEach((t) => {
  // Create a new Miniflare environment for each test
  t.context = {
    mf: getMiniflare(),
  }
})

test.only('should warm cache with s3 url', async (t) => {
  const { mf } = t.context
  const url =
    'https://dotstorage-prod-0.s3.us-east-2.amazonaws.com/raw/bafybeiakqioj3mhgd5p5be4tbhhd5go2r3xstv4wfcjvgfea75e5du76i4/nft-3529'

  const response = await mf.dispatchFetch(
    `https://localhost:8787/cache/warm/${encodeURIComponent(url)}`
  )
  await response.waitUntil()
  t.is(response.status, 200)
  // t.is(
  //   response.headers.get('location'),
  //   'https://bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi.ipfs.localhost:8787/'
  // )
})
