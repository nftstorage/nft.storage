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
          total_uploads_past_7: 0,
          total_deals: 1,
          total_deal_size: 25515304172,
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
