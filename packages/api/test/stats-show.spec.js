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
        data: [
          {
            value: null,
            stat: 'upload_7_day_total_growth_percent',
          },
        ],
      },
      'Server responded with null for upload growth, since none exists'
    )
  })
})
