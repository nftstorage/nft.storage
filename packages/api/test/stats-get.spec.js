import assert from 'assert'
import { createClientWithUser, DBTestClient } from './scripts/helpers.js'
import { fixtures } from './scripts/fixtures.js'

describe('Get Stats', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

  it('Should return proper response for /stats route, based on seeded demoData', async () => {
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
    const res = await fetch('/stats', {
      headers: { Authorization: `Bearer ${client.token}` },
    })

    const { ok, data } = await res.json()

    assert.equal(ok, true)

    // this is brittle, but it's simple
    assert.deepStrictEqual(data, demoData)
  })
})
