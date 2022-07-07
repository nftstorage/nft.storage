import assert from 'assert'
import {
  createClientWithUser,
  DBTestClient,
  getRawClient,
} from './scripts/helpers.js'

describe('Pin list ', () => {
  /** @type{DBTestClient} */
  let client

  beforeEach(async () => {
    client = await createClientWithUser()
  })

  it('should pin with just cid', async () => {
    // List
    const resEmptyPinList = await fetch('pins?status=queued,pinning', {
      method: 'GET',
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const valueEmptyPinList = await resEmptyPinList.json()
    assert.strictEqual(
      valueEmptyPinList.count,
      0,
      'Server response with empty pin requests'
    )

    // Pin request
    const cid = 'bafkreihwlixzeusjrd5avlg53yidaoonf5r5srzumu7y5uuumtt7rxxbrm'
    const resPinCreate = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({
        cid,
      }),
    })
    const valuePinCreate = await resPinCreate.json()
    assert.deepStrictEqual(
      valuePinCreate.pin,
      {
        cid,
        meta: null,
        name: null,
        origins: null,
      },
      'Server responded with expected data for first pin'
    )

    // Upload
    const file = new Blob(['hello world!'], { type: 'application/text' })
    const res = await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: file,
    })
    const { ok } = await res.json()
    assert(ok, 'Server response payload has `ok` property')

    // List
    const resPinList = await fetch('pins?status=queued,pinning', {
      method: 'GET',
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const valuePinList = await resPinList.json()
    assert.strictEqual(
      valuePinList.count,
      1,
      'Server response with pin requests'
    )
    assert.strictEqual(
      valuePinList.results[0].requestid,
      cid,
      'Server response with pin requests created'
    )
  })

  it('should list pinned items when querying without filters', async () => {
    // Pin request (unavailable on IPFS)
    const cid = 'bafkreiaoqabl7yiracpil3m7rgbgygky2wwqtvzom2lkdhy2pxchkjixae'
    await client.addPin({ cid, name: 'test' })

    // Make this CID 'Pinned' in our DB
    await getRawClient()
      .from('pin')
      .update({ status: 'Pinned', updated_at: new Date().toISOString() })
      .eq('content_cid', cid)

    const headers = { Authorization: `Bearer ${client.token}` }
    const res = await fetch('pins', { headers })
    const { count, results } = await res.json()
    assert.strictEqual(count, 1)
    assert.strictEqual(results[0].pin.cid, cid)
  })
})
