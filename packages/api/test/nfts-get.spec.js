import test from 'ava'
import { createClientWithUser } from './scripts/helpers.js'
import { fixtures } from './scripts/fixtures.js'
import {
  getMiniflareContext,
  setupMiniflareContext,
} from './scripts/test-context.js'

test.before(async (t) => {
  await setupMiniflareContext(t)
})

test.serial('should return proper response for cid v1', async (t) => {
  const cid = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  await client.addPin({
    cid,
    name: 'test-file11',
  })

  const res = await mf.dispatchFetch(`http://miniflare.test/${cid}`, {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok, value } = await res.json()

  t.is(value.cid, cid)
  t.is(value.type, 'remote')
  t.is(value.pin.status, 'queued')
  t.deepEqual(value.deals, fixtures.dealsV0andV1)
})

test.serial('should return proper response for cid v0', async (t) => {
  const cid = 'QmP1QyqiRtQLbGBr5hLVX7NCmrJmJbGdp45x6DnPssMB9i'
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  await client.addPin({
    cid,
    name: 'test-file-cid-v0',
  })

  const res = await mf.dispatchFetch(`http://miniflare.test/${cid}`, {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok, value } = await res.json()
  t.is(value.cid, cid)
  t.is(value.pin.status, 'queued')
  t.deepEqual(value.deals, fixtures.dealsV0andV1)
})

test.serial('should error on invalid cid', async (t) => {
  const cid = 'asdhjkahsdja'
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const res = await mf.dispatchFetch(`http://miniflare.test/${cid}`, {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok, value, error } = await res.json()

  t.false(ok)
  t.deepEqual(error, {
    code: 'ERROR_INVALID_CID',
    message: `Invalid CID: ${cid}`,
  })
})

test.serial('should error on not found', async (t) => {
  const cid = 'bafybeia22kh3smc7p67oa76pcleaxp4u5zatsvcndi3xrqod5vtxq5avpa'
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const res = await mf.dispatchFetch(`http://miniflare.test/${cid}`, {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok, value, error } = await res.json()

  t.false(ok)
  t.deepEqual(error, {
    code: 'HTTP_ERROR',
    message: `NFT not found`,
  })
})

test.serial('should error on not found for a deleted nft', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const cidv1 = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
  await client.client.createUpload({
    content_cid: cidv1,
    source_cid: cidv1,
    type: 'Blob',
    user_id: client.userId,
    dag_size: 100,
  })

  const deleted = await client.client.deleteUpload(cidv1, client.userId)
  t.truthy(deleted)
  t.is(deleted && deleted.source_cid, cidv1)

  const res = await mf.dispatchFetch(`http://miniflare.test/${cidv1}`, {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok, error } = await res.json()

  t.false(ok, 'not found')
  t.deepEqual(error, {
    code: 'HTTP_ERROR',
    message: `NFT not found`,
  })
})
