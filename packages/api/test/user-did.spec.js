import test from 'ava'
import { createClientWithUser, DBTestClient } from './scripts/helpers.js'
import { KeyPair } from 'ucan-storage/keypair'
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

test.serial('should register new did ', async (t) => {
  const mf = getMiniflareContext(t)
  const kp = await KeyPair.create()
  const res = await mf.dispatchFetch(`http://miniflare.test/user/did`, {
    headers: { Authorization: `Bearer ${client.token}` },
    method: 'POST',
    body: JSON.stringify({
      did: kp.did(),
    }),
  })
  const { ok, value } = await res.json()
  t.is(value, kp.did())
})

test.serial('should error with bad DID', async (t) => {
  const mf = getMiniflareContext(t)
  const did = 'did:key:z'
  const res = await mf.dispatchFetch(`http://miniflare.test/user/did`, {
    headers: { Authorization: `Bearer ${client.token}` },
    method: 'POST',
    body: JSON.stringify({
      did,
    }),
  })
  const { ok, error } = await res.json()
  t.is(error.message, 'Unsupported key algorithm. Try using ed25519.')
})
