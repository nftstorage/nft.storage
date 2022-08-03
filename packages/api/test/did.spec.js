import test from 'ava'
import {
  setupMiniflareContext,
  getMiniflareContext,
} from './scripts/test-context.js'

test.before(async (t) => {
  await setupMiniflareContext(t)
})

test('/did should return the service DID', async (t) => {
  const mf = getMiniflareContext(t)
  const res = await mf.dispatchFetch(`http://miniflare.test/did`)
  const { ok, value } = await res.json()

  t.true(ok)
  t.is(value, 'did:key:z6MkgBRFJi7Ew2mzN7JtYN7nkq8M8qTHhLbsTEvV5j4ajWZS')
})
