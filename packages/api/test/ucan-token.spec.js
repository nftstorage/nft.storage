import assert from 'assert'
import { createClientWithUser, DBTestClient } from './scripts/helpers.js'
import { validate } from 'ucan-storage/ucan-storage'

describe('Ucan Token', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

  it('should fail to create ucan when no did registered', async () => {
    const res = await fetch(`ucan/token`, {
      headers: { Authorization: `Bearer ${client.token}` },
      method: 'POST',
    })
    const { ok, error } = await res.json()
    assert.equal(error.message, 'User does not have a DID registered.')
  })

  it('should create new ucan using api key', async () => {
    const did = 'did:key:z6MkkxgkZhCLmibS6EwfYvvtjjBfGjwqd8uc3F1jZ4TLMPCg'
    await fetch(`user/did`, {
      headers: { Authorization: `Bearer ${client.token}` },
      method: 'POST',
      body: JSON.stringify({
        did,
      }),
    })

    const res = await fetch(`ucan/token`, {
      headers: { Authorization: `Bearer ${client.token}` },
      method: 'POST',
    })
    const { ok, value } = await res.json()
    assert.ok(typeof value === 'string')
    const validated = await validate(value)
    assert.equal(validated.payload.aud, did)
  })
})
