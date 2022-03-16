import assert from 'assert'
import { createClientWithUser, DBTestClient } from './scripts/helpers.js'
import { KeyPair } from 'ucan-storage/keypair'

describe('User DID', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

  it('should register new did ', async () => {
    const kp = await KeyPair.create()
    const res = await fetch(`user/did`, {
      headers: { Authorization: `Bearer ${client.token}` },
      method: 'POST',
      body: JSON.stringify({
        did: kp.did(),
      }),
    })
    const { ok, value } = await res.json()
    assert.equal(value, kp.did())
  })

  it('should error with bad DID', async () => {
    const did = 'did:key:z'
    const res = await fetch(`user/did`, {
      headers: { Authorization: `Bearer ${client.token}` },
      method: 'POST',
      body: JSON.stringify({
        did,
      }),
    })
    const { ok, error } = await res.json()
    assert.equal(error.message, 'Unsupported key algorithm. Try using ed25519.')
  })
})
