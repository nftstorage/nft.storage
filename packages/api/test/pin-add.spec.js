import test from 'ava'
import { CID } from 'multiformats'
import {
  createClientWithUser,
  DBTestClient,
  getRawClient,
  getCluster,
} from './scripts/helpers.js'
import {
  TrackerStatusPinned,
  TrackerStatusPinning,
  TrackerStatusPinQueued,
  TrackerStatusUnpinned,
} from '@nftstorage/ipfs-cluster'
import {
  getMiniflareContext,
  getTestServiceConfig,
  setupMiniflareContext,
} from './scripts/test-context.js'

/** @type {DBTestClient} */
let client

test.before(async (t) => {
  await setupMiniflareContext(t)
  client = await createClientWithUser(t)
})

test.serial('should pin with just cid', async (t) => {
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)

  // expected CID for the above data
  const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
  const res = await mf.dispatchFetch('http://miniflare.test/pins', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({ cid }),
  })
  const value = await res.json()

  t.is(value.requestid, cid, 'Server responded with expected CID')
  t.is(value.status, 'queued')

  const rawClient = getRawClient(config)
  const { data } = await rawClient
    .from('upload')
    .select('*')
    .match({ source_cid: cid, user_id: client.userId })
    .single()

  // @ts-ignore
  t.is(data.source_cid, cid)
  t.is(data.deleted_at, null)
})

test.serial('should pin with everything', async (t) => {
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  // expected CID for the above data
  const cid = 'bafkreigu63ufwrs6d7zkybgdm36orqwe6opiseut4b6ehhwi5mtgryklzi'
  const res = await mf.dispatchFetch('http://miniflare.test/pins', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({
      cid,
      name: 'pin-everything',
      meta: { key: 'value' },
    }),
  })
  const value = await res.json()

  t.deepEqual(
    value.pin,
    {
      cid,
      meta: { key: 'value' },
      name: 'pin-everything',
      origins: null,
    },
    'Server responded with expected data for pin'
  )

  const rawClient = getRawClient(config)
  const { data } = await rawClient
    .from('upload')
    .select('*')
    .match({ source_cid: cid, user_id: client.userId })
    .single()

  // @ts-ignore
  t.is(data.source_cid, cid)
  t.is(data.deleted_at, null)
})

test.serial('should pin twice and update data', async (t) => {
  const mf = getMiniflareContext(t)
  // expected CID for the above data
  const cid = 'bafkreihwlixzeusjrd5avlg53yidaoonf5r5srzumu7y5uuumtt7rxxbrm'

  const res1 = await mf.dispatchFetch('http://miniflare.test/pins', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({
      cid,
    }),
  })
  const value1 = await res1.json()

  t.deepEqual(
    value1.pin,
    {
      cid,
      meta: null,
      name: null,
      origins: null,
    },
    'Server responded with expected data for first pin'
  )
  const res2 = await mf.dispatchFetch('http://miniflare.test/pins', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({
      cid,
      name: 'pin-everything',
      meta: { key: 'value' },
    }),
  })
  const value2 = await res2.json()

  t.deepEqual(
    value2.pin,
    {
      cid,
      meta: { key: 'value' },
      name: 'pin-everything',
      origins: null,
    },
    'Server responded with expected data for second pin'
  )
})

test.serial('should error pinning with invalid cid', async (t) => {
  const mf = getMiniflareContext(t)
  // expected CID for the above data
  const cid = 'bafkreidvbhs33ighmljlvr7zbv2y'
  const res = await mf.dispatchFetch('http://miniflare.test/pins', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({ cid }),
  })
  const value = await res.json()
  t.deepEqual(value, {
    error: {
      reason: 'INVALID_PIN_DATA',
      details: 'Invalid request id: bafkreidvbhs33ighmljlvr7zbv2y',
    },
  })
})

test.serial('should error pinning with invalid name', async (t) => {
  const mf = getMiniflareContext(t)
  // expected CID for the above data
  const cid = 'bafkreihwlixzeusjrd5avlg53yidaoonf5r5srzumu7y5uuumtt7rxxbrm'
  const res = await mf.dispatchFetch('http://miniflare.test/pins', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({ cid, name: 3333 }),
  })
  const value = await res.json()
  t.deepEqual(value, {
    error: {
      reason: 'INVALID_PIN_DATA',
      details: 'invalid name',
    },
  })
})

test.serial('should error pinning with invalid meta', async (t) => {
  const mf = getMiniflareContext(t)
  // expected CID for the above data
  const cid = 'bafkreihwlixzeusjrd5avlg53yidaoonf5r5srzumu7y5uuumtt7rxxbrm'
  const res = await mf.dispatchFetch('http://miniflare.test/pins', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({ cid, meta: ['dd'] }),
  })
  const value = await res.json()
  t.deepEqual(value, {
    error: {
      reason: 'INVALID_PIN_DATA',
      details: 'invalid metadata',
    },
  })
})

test.serial('should pin to cluster by source CID', async (t) => {
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  const cidv0 = 'QmXRdb4vemfS7Z6EL2p47XdjRatZ5Ne8DEnwr5uaHqXnak'
  const cidv1 = CID.parse(cidv0).toV1().toString()

  const res = await mf.dispatchFetch('http://miniflare.test/pins', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({ cid: cidv0 }),
  })
  const data = await res.json()
  t.is(data.pin.cid, cidv0)

  const cluster = getCluster(config)
  // should be being pinned by the source CID
  let status = await cluster.status(cidv0)
  const goodStatuses = [
    TrackerStatusPinQueued,
    TrackerStatusPinning,
    TrackerStatusPinned,
  ]
  Object.values(status.peerMap).forEach(({ status }) => {
    t.true(
      goodStatuses.some((s) => s === status),
      `status is ${status}, not one of ${goodStatuses}`
    )
  })

  // should not be pinned by normalized v1 CID
  status = await cluster.status(cidv1)
  Object.values(status.peerMap).forEach(({ status }) => {
    t.is(status, TrackerStatusUnpinned)
  })
})

test.serial('should filter non-string meta values', async (t) => {
  const mf = getMiniflareContext(t)
  const cid = 'bafkreihwlixzeusjrd5avlg53yidaoonf5r5srzumu7y5uuumtt7rxxbrm'
  const res = await mf.dispatchFetch('http://miniflare.test/pins', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: JSON.stringify({
      cid,
      meta: { invalid: { object: 42 }, valid: 'string' },
    }),
  })
  const { pin } = await res.json()
  t.is(pin.meta.invalid, undefined)
  t.is(pin.meta.valid, 'string')
})
