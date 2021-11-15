import assert from 'assert'
import { createClientWithUser } from './scripts/helpers.js'
import { fixtures } from './scripts/fixtures.js'
import delay from 'delay'

describe('List NFTs', () => {
  it('should list 2 nfts with no params and validate deals', async () => {
    const client = await createClientWithUser()
    const cid1 = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
    const cid2 = 'bafkreidnmgmp3xywh6voxfj2oiproduf6n77a4e4s6llajqxdmhvb7d5qq'
    await client.addPin({
      cid: cid1,
      name: 'test-file-deals',
    })

    await client.addPin({
      cid: cid2,
      name: 'test-file-no-deals',
    })

    await delay(300)
    const res = await fetch('', {
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok, value } = await res.json()

    assert.equal(value[0].cid, cid2)
    assert.equal(value[0].pin.status, 'queued')
    assert.deepStrictEqual(value[0].deals, [])

    assert.equal(value[1].cid, cid1)
    assert.equal(value[1].pin.status, 'queued')
    assert.deepStrictEqual(value[1].deals, fixtures.dealsV0andV1)
  })

  it('should list 1 nft with param limit=1', async () => {
    const client = await createClientWithUser()
    const cid1 = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
    const cid2 = 'bafkreidnmgmp3xywh6voxfj2oiproduf6n77a4e4s6llajqxdmhvb7d5qq'
    await client.addPin({
      cid: cid1,
      name: 'test-file-deals',
    })

    await client.addPin({
      cid: cid2,
      name: 'test-file-no-deals',
    })

    await delay(300)
    const res = await fetch('?limit=1', {
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok, value } = await res.json()

    assert.ok(value.length === 1)
  })

  it('should list 0 nfts with date before any uploads', async () => {
    const date = new Date().toISOString()
    const client = await createClientWithUser()
    const cid1 = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
    const cid2 = 'bafkreidnmgmp3xywh6voxfj2oiproduf6n77a4e4s6llajqxdmhvb7d5qq'
    await client.addPin({
      cid: cid1,
      name: 'test-file-deals',
    })

    await client.addPin({
      cid: cid2,
      name: 'test-file-no-deals',
    })

    await delay(300)
    const res = await fetch(`?before=${date}`, {
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok, value } = await res.json()

    assert.ok(value.length === 0)
  })

  it('should list the default 10 nfts with no params', async () => {
    const client = await createClientWithUser()

    for (let i = 0; i < 10; i++) {
      await client.client.createUpload({
        user_id: client.userId,
        content_cid: `bafy${i}`,
        source_cid: `bafy${i}`,
        type: 'Blob',
      })
    }

    await delay(300)
    const res = await fetch('', {
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok, value } = await res.json()

    assert.ok(value.length === 10)
  })

  it('should validate the limit param', async () => {
    const client = await createClientWithUser()

    for (let i = 0; i < 10; i++) {
      await client.client.createUpload({
        user_id: client.userId,
        content_cid: `bafy${i}`,
        source_cid: `bafy${i}`,
        type: 'Blob',
      })
    }
    await delay(300)

    const invalidLimits = [-1, 0, 1001, 'not-a-number', 1.138]

    for (const limit of invalidLimits) {
      const res = await fetch(`?limit=${limit}`, {
        headers: { Authorization: `Bearer ${client.token}` },
      })
      assert.strictEqual(res.status, 400)

      const { ok, error } = await res.json()
      assert.strictEqual(ok, false)
      assert.strictEqual(error.message, 'invalid params')
    }
  })

  it('should list only active nfts', async () => {
    const client = await createClientWithUser()
    const cidv1 = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
    const cidv0 = 'QmP1QyqiRtQLbGBr5hLVX7NCmrJmJbGdp45x6DnPssMB9i'
    await client.client.createUpload({
      content_cid: cidv1,
      source_cid: cidv0,
      type: 'Blob',
      user_id: client.userId,
      dag_size: 100,
    })
    await client.client.createUpload({
      content_cid: cidv1,
      source_cid: cidv1,
      type: 'Blob',
      user_id: client.userId,
      dag_size: 100,
    })

    const deleteRsp = await fetch(cidv0, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const deleteData = await deleteRsp.json()
    assert.ok(deleteData.ok)

    const res = await fetch('', {
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok, value } = await res.json()

    assert.ok(ok)
    assert.equal(value.length, 1)
    assert.equal(value[0].cid, cidv1)
  })
})
