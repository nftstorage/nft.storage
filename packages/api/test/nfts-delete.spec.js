import test from 'ava'
import { createClientWithUser, getRawClient } from './scripts/helpers.js'
import {
  getMiniflareContext,
  getTestServiceConfig,
  setupMiniflareContext,
} from './scripts/test-context.js'

test.before(async (t) => {
  await setupMiniflareContext(t)
})

test.serial('should delete nft', async (t) => {
  const cid = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  await client.client.createUpload({
    content_cid: cid,
    source_cid: cid,
    type: 'Blob',
    user_id: client.userId,
    dag_size: 100,
  })

  const testTs = Date.now()
  const res = await mf.dispatchFetch(`http://miniflare.test/${cid}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok } = await res.json()
  t.true(ok)

  const { data, error } = await getRawClient(config)
    .from('upload')
    .select('*')
    .match({ source_cid: cid, user_id: client.userId })
    .single()

  // @ts-ignore
  t.true(
    new Date(data.deleted_at).valueOf() > testTs,
    'deleted_at should be bigger than date before delete request'
  )
  t.true(
    new Date(data.updated_at).valueOf() > testTs,
    'updated_at should be bigger than date before delete request'
  )
  t.is(
    data.deleted_at,
    data.updated_at,
    'deleted_at and updated_at should be equal'
  )
})

test.serial('should delete correct cid version 0', async (t) => {
  const cidv1 = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
  const cidv0 = 'QmP1QyqiRtQLbGBr5hLVX7NCmrJmJbGdp45x6DnPssMB9i'
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
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

  const res = await mf.dispatchFetch(`http://miniflare.test/${cidv0}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok } = await res.json()
  t.true(ok)

  const { data } = await getRawClient(config)
    .from('upload')
    .select('*')
    .match({ source_cid: cidv0, user_id: client.userId })
    .single()

  // @ts-ignore
  t.not(data.deleted_at, null)
})

test.serial('should delete correct cid version 1', async (t) => {
  const cidv1 = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
  const cidv0 = 'QmP1QyqiRtQLbGBr5hLVX7NCmrJmJbGdp45x6DnPssMB9i'
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
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

  const res = await mf.dispatchFetch(`http://miniflare.test/${cidv1}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok } = await res.json()
  t.true(ok)

  const { data } = await getRawClient(config)
    .from('upload')
    .select('*')
    .match({ source_cid: cidv1, user_id: client.userId })
    .single()

  // @ts-ignore
  t.not(data.deleted_at, null)
})

test.serial('should error deleting invalid cid', async (t) => {
  const cid = 'bafybeissss'
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)

  const res = await mf.dispatchFetch(`http://miniflare.test/${cid}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok, error } = await res.json()
  t.false(ok)
  t.deepEqual(error, {
    code: 'ERROR_INVALID_CID',
    message: 'Invalid CID: bafybeissss',
  })
})

test.serial('should error deleting unknown cid', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const cid = 'QmP1QyqiRtQLbGBr5hLVX7NCmrJmJbGdp45x6DnPssMB9i'

  const res = await mf.dispatchFetch(`http://miniflare.test/${cid}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok, error } = await res.json()
  t.false(ok)
  t.deepEqual(error, {
    code: 'HTTP_ERROR',
    message: 'NFT not found',
  })
})

test.serial('should not delete already deleted nft', async (t) => {
  const cid = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const config = getTestServiceConfig(t)
  await client.client.createUpload({
    content_cid: cid,
    source_cid: cid,
    type: 'Blob',
    user_id: client.userId,
    dag_size: 100,
  })

  const res = await mf.dispatchFetch(`http://miniflare.test/${cid}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok } = await res.json()
  t.true(ok)

  const getNftData = async () => {
    const { data } = await getRawClient(config)
      .from('upload')
      .select('*')
      .match({ source_cid: cid, user_id: client.userId })
      .single()
    return data
  }

  const nftData0 = await getNftData()
  t.truthy(nftData0.deleted_at, 'deleted_at was set')

  const res2 = await mf.dispatchFetch(`http://miniflare.test/${cid}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${client.token}` },
  })
  t.is(res2.status, 404)

  const nftData1 = await getNftData()
  t.is(nftData1.deleted_at, nftData0.deleted_at, 'deleted_at did not change')
})
