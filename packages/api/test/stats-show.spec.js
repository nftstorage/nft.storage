import assert from 'assert'
import { createClientWithUser, DBTestClient } from './scripts/helpers.js'

describe('Status Show Route ', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

  it('should fetch last 7 days upload metrics', async () => {
    // Stats request
    const getStats = await fetch('stats')
    const statsResults = await getStats.json()
    assert.deepStrictEqual(
      statsResults,
      {
        ok: true,
        data: {
          uploads_past_7_total: 0,
          deals_total: 1,
          deals_size_total: 25515304172,
          uploads_car_total: 0,
          uploads_blob_total: 0,
          uploads_multipart_total: 0,
          uploads_remote_total: 0,
          uploads_nft_total: 0,
        },
      },
      'Server responded with null for upload growth, since none exists'
    )
  })
})
