import test from 'ava'
import { createClientWithUser, DBTestClient } from './scripts/helpers.js'
import { fixtures } from './scripts/fixtures.js'
import delay from 'delay'
import {
  getMiniflareContext,
  setupMiniflareContext,
} from './scripts/test-context.js'

test.before(async (t) => {
  await setupMiniflareContext(t)
})

test.serial('should list 0 nfts with date before any uploads', async (t) => {
  const client = await createClientWithUser(t)
  const date = new Date().toISOString()
  const mf = getMiniflareContext(t)
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
  const res = await mf.dispatchFetch(`http://miniflare.test/?before=${date}`, {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const { ok, value } = await res.json()

  t.is(value.length, 0)
})

test.serial(
  'should list 2 nfts with no params and validate deals',
  async (t) => {
    const client = await createClientWithUser(t)
    const mf = getMiniflareContext(t)
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
    const res = await mf.dispatchFetch('http://miniflare.test', {
      headers: { Authorization: `Bearer ${client.token}` },
    })
    t.is(parseInt(res.headers.get('count') || ''), 2)
    const { ok, value } = await res.json()

    t.is(value[0].cid, cid2)
    t.is(value[0].pin.status, 'queued')
    t.deepEqual(value[0].deals, [])

    t.is(value[1].cid, cid1)
    t.is(value[1].pin.status, 'queued')
    t.deepEqual(value[1].deals, fixtures.dealsV0andV1)
  }
)

test.serial('should list 1 nft with param limit=1', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
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
  const res = await mf.dispatchFetch('http://miniflare.test/?limit=1', {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  t.is(parseInt(res.headers.get('count') || ''), 2)
  const { ok, value } = await res.json()

  t.is(value.length, 1)
})

test.serial('should list the default 10 nfts with no params', async (t) => {
  const mf = getMiniflareContext(t)
  const client = await createClientWithUser(t)

  for (let i = 0; i < 10; i++) {
    await client.client.createUpload({
      user_id: client.userId,
      content_cid: `bafy${i}`,
      source_cid: `bafy${i}`,
      type: 'Blob',
    })
  }

  await delay(300)
  const res = await mf.dispatchFetch('http://miniflare.test', {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  t.is(parseInt(res.headers.get('count') || ''), 10)
  const { ok, value } = await res.json()

  t.is(value.length, 10)
})

test.serial('should validate the limit param', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)

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
    const res = await mf.dispatchFetch(
      `http://localhost:8787/?limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${client.token}` },
      }
    )
    t.is(res.status, 400)

    const { ok, error } = await res.json()
    t.false(ok)
    t.is(error.message, 'invalid params')
  }
})

test.serial('should list only active nfts', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
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

  const deleteRsp = await mf.dispatchFetch(`http://miniflare.test/${cidv0}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${client.token}` },
  })
  const deleteData = await deleteRsp.json()
  t.true(deleteData.ok)

  const res = await mf.dispatchFetch('http://miniflare.test', {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  t.is(parseInt(res.headers.get('count') || ''), 1)

  const { ok, value } = await res.json()

  t.true(ok)
  t.is(value.length, 1)
  t.is(value[0].cid, cidv1)
})

test.serial('should list nfts with their parts', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const cidv1 = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
  const cidv0 = 'QmP1QyqiRtQLbGBr5hLVX7NCmrJmJbGdp45x6DnPssMB9i'
  const exampleCarParkUrl =
    'https://carpark-dev.web3.storage/bagbaiera6xcx7hiicm7sc523axbjf2otuu5nptt6brdzt4a5ulgn6qcfdwea/bagbaiera6xcx7hiicm7sc523axbjf2otuu5nptt6brdzt4a5ulgn6qcfdwea.car'
  const exampleS3Url = `https://dotstorage-dev-0.s3.us-east-1.amazonaws.com/raw/${cidv1}/2/ciqplrl7tuebgpzbo5nqlqus5hj2kowxzz7ayr4z6ao2ftg7ibcr3ca.car`
  await client.client.createUpload({
    content_cid: cidv1,
    source_cid: cidv0,
    type: 'Blob',
    user_id: client.userId,
    dag_size: 100,
    backup_urls: [new URL(exampleCarParkUrl), new URL(exampleS3Url)],
  })

  const res = await mf.dispatchFetch('http://miniflare.test', {
    headers: { Authorization: `Bearer ${client.token}` },
  })
  t.is(parseInt(res.headers.get('count') || ''), 1)
  const { ok, value } = await res.json()

  t.true(ok)
  t.is(value.length, 1)
  t.is(value[0].cid, cidv0)
  t.truthy(Array.isArray(value[0].parts), 'upload.parts is an array')
  t.deepEqual(value[0].parts, [
    // this corresponds to `exampleCarParkUrl`
    'bagbaiera6xcx7hiicm7sc523axbjf2otuu5nptt6brdzt4a5ulgn6qcfdwea',
  ])
})

test.serial(
  'should list nfts with their parts including w3s.link',
  async (t) => {
    const client = await createClientWithUser(t)
    const mf = getMiniflareContext(t)
    const cidv1 = 'bafybeiaj5yqocsg5cxsuhtvclnh4ulmrgsmnfbhbrfxrc3u2kkh35mts4e'
    const cidv0 = 'QmP1QyqiRtQLbGBr5hLVX7NCmrJmJbGdp45x6DnPssMB9i'
    const exampleS3Url = `https://dotstorage-dev-0.s3.us-east-1.amazonaws.com/raw/${cidv1}/2/ciqplrl7tuebgpzbo5nqlqus5hj2kowxzz7ayr4z6ao2ftg7ibcr3ca.car`
    const exampleW3sUrl = `https://w3s.link/ipfs/bagbaiera6xcx7hiicm7sc523axbjf2otuu5nptt6brdzt4a5ulgn6qcfdwea`
    await client.client.createUpload({
      content_cid: cidv1,
      source_cid: cidv0,
      type: 'Blob',
      user_id: client.userId,
      dag_size: 100,
      backup_urls: [new URL(exampleW3sUrl), new URL(exampleS3Url)],
    })

    const res = await mf.dispatchFetch('http://miniflare.test', {
      headers: { Authorization: `Bearer ${client.token}` },
    })
    t.is(parseInt(res.headers.get('count') || ''), 1)
    const { ok, value } = await res.json()

    t.true(ok)
    t.is(value.length, 1)
    t.is(value[0].cid, cidv0)
    t.truthy(Array.isArray(value[0].parts), 'upload.parts is an array')
    t.deepEqual(value[0].parts, [
      // this corresponds to `exampleW3sUrl`
      'bagbaiera6xcx7hiicm7sc523axbjf2otuu5nptt6brdzt4a5ulgn6qcfdwea',
    ])
  }
)
