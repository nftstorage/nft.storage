import assert from 'assert'
import { createClientWithUser, DBTestClient } from './scripts/helpers.js'
import { fixtures } from './scripts/fixtures.js'

describe('Get Stats', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

  it('should return proper response for cid v1', async () => {
    const res = await fetch('/stats', {
      headers: { Authorization: `Bearer ${client.token}` },
    })

    const { ok, data } = await res.json()

    assert.equal(ok, true)

    // this is brittle, but it's simple
    assert.equal(data, {
      deals_size_total: 169389985753391,
      deals_size_total_prev: 169334115720738,
    })
  })
})
