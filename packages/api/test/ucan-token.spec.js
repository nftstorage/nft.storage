import test from 'ava'
import { createClientWithUser, DBTestClient } from './scripts/helpers.js'
import { validate } from 'ucan-storage/ucan-storage'
import {
  getMiniflareContext,
  setupMiniflareContext,
} from './scripts/test-context.js'

/** @type{DBTestClient} */
let client

test.before(async (t) => {
  await setupMiniflareContext(t)
  client = await createClientWithUser(t)
})

test.serial('should fail to create ucan when no did registered', async (t) => {
  const mf = getMiniflareContext(t)
  const res = await mf.dispatchFetch(`http://miniflare.test/ucan/token`, {
    headers: { Authorization: `Bearer ${client.token}` },
    method: 'POST',
  })
  const { ok, error } = await res.json()
  t.is(error.message, 'User does not have a DID registered.')
})

test.serial('should create new ucan using api key', async (t) => {
  const mf = getMiniflareContext(t)
  const did = 'did:key:z6MkkxgkZhCLmibS6EwfYvvtjjBfGjwqd8uc3F1jZ4TLMPCg'
  await mf.dispatchFetch(`http://miniflare.test/user/did`, {
    headers: { Authorization: `Bearer ${client.token}` },
    method: 'POST',
    body: JSON.stringify({
      did,
    }),
  })

  const res = await mf.dispatchFetch(`http://miniflare.test/ucan/token`, {
    headers: { Authorization: `Bearer ${client.token}` },
    method: 'POST',
  })
  const { ok, value } = await res.json()
  t.true(typeof value === 'string')
  const validated = await validate(value)
  t.is(validated.payload.aud, did)
})
