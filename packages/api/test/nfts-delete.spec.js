import assert from 'assert'
import {
  createClientWithUser,
  DBTestClient,
  getRawClient,
} from './scripts/helpers.js'

describe('Delete NFT', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

  it('should delete nft', async () => {
    const cid = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
    await client.client.createUpload({
      content_cid: cid,
      source_cid: cid,
      type: 'Blob',
      user_id: client.userId,
      dag_size: 100,
    })

    const testTs = Date.now()
    const res = await fetch(cid, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok } = await res.json()
    assert.ok(ok)

    const { data, error } = await getRawClient()
      .from('upload')
      .select('*')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    // @ts-ignore
    assert.ok(
      new Date(data.deleted_at).valueOf() > testTs,
      'deleted_at should be bigger than date before delete request'
    )
    assert.ok(
      new Date(data.updated_at).valueOf() > testTs,
      'updated_at should be bigger than date before delete request'
    )
    assert.equal(
      data.deleted_at,
      data.updated_at,
      'deleted_at and updated_at should be equal'
    )
  })

  it('should delete correct cid version 0', async () => {
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

    const res = await fetch(cidv0, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok } = await res.json()
    assert.ok(ok)

    const { data } = await getRawClient()
      .from('upload')
      .select('*')
      .match({ source_cid: cidv0, user_id: client.userId })
      .single()

    // @ts-ignore
    assert.notEqual(data.deleted_at, null)
  })

  it('should delete correct cid version 1', async () => {
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

    const res = await fetch(cidv1, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok } = await res.json()
    assert.ok(ok)

    const { data } = await getRawClient()
      .from('upload')
      .select('*')
      .match({ source_cid: cidv1, user_id: client.userId })
      .single()

    // @ts-ignore
    assert.notEqual(data.deleted_at, null)
  })

  it('should error deleting invalid cid', async () => {
    const cid = 'bafybeissss'

    const res = await fetch(cid, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok, error } = await res.json()
    assert.equal(ok, false)
    assert.deepStrictEqual(error, {
      code: 'ERROR_INVALID_CID',
      message: 'Invalid CID: bafybeissss',
    })
  })

  it('should error deleting unknown cid', async () => {
    const client = await createClientWithUser()
    const cid = 'QmP1QyqiRtQLbGBr5hLVX7NCmrJmJbGdp45x6DnPssMB9i'

    const res = await fetch(cid, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok, error } = await res.json()
    assert.equal(ok, false)
    assert.deepStrictEqual(error, {
      code: 'HTTP_ERROR',
      message: 'NFT not found',
    })
  })

  it('should not delete already deleted nft', async () => {
    const cid = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
    await client.client.createUpload({
      content_cid: cid,
      source_cid: cid,
      type: 'Blob',
      user_id: client.userId,
      dag_size: 100,
    })

    const res = await fetch(cid, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
    })
    const { ok } = await res.json()
    assert.ok(ok)

    const getNftData = async () => {
      const { data } = await getRawClient()
        .from('upload')
        .select('*')
        .match({ source_cid: cid, user_id: client.userId })
        .single()
      return data
    }

    const nftData0 = await getNftData()
    assert(nftData0.deleted_at, 'deleted_at was set')

    const res2 = await fetch(cid, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${client.token}` },
    })
    assert.strictEqual(res2.status, 404)

    const nftData1 = await getNftData()
    assert.equal(
      nftData1.deleted_at,
      nftData0.deleted_at,
      'deleted_at did not change'
    )
  })
})
