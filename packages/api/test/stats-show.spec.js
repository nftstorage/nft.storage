import assert from 'assert'
import { createClientWithUser, DBTestClient } from './scripts/helpers.js'

describe('Status Show Route ', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

  it('should fetch last 7 days upload metrics', async () => {
    // Pin request
    const cid = 'bafkreihwlixzeusjrd5avlg53yidaoonf5r5srzumu7y5uuumtt7rxxbrm'
    const getStats = await fetch('stats', {
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const valuePinCreate = await getStats.json()
    // assert.deepStrictEqual(
    //   valuePinCreate.pin,
    //   {
    //     cid,
    //     meta: null,
    //     name: null,
    //     origins: null,
    //   },
    //   'Server responded with expected data for first pin'
    // )
  })
})
