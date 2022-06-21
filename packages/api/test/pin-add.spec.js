import assert from 'assert'
import { CID } from 'multiformats'
import { Multiaddr } from 'multiaddr'
import {
  createClientWithUser,
  DBTestClient,
  rawClient,
  cluster,
} from './scripts/helpers.js'
import {
  TrackerStatusPinned,
  TrackerStatusPinning,
  TrackerStatusPinQueued,
  TrackerStatusUnpinned,
} from '@nftstorage/ipfs-cluster'

describe('Pin add ', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

  it('should pin with just cid', async () => {
    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    const res = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ cid }),
    })
    const value = await res.json()

    assert.strictEqual(
      value.requestid,
      cid,
      'Server responded with expected CID'
    )
    assert.equal(value.status, 'queued')

    const { data } = await rawClient
      .from('upload')
      .select('*')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    // @ts-ignore
    assert.equal(data.source_cid, cid)
    assert.equal(data.deleted_at, null)
  })

  it('should pin with everything', async () => {
    // expected CID for the above data
    const cid = 'bafkreigu63ufwrs6d7zkybgdm36orqwe6opiseut4b6ehhwi5mtgryklzi'
    const res = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({
        cid,
        name: 'pin-everything',
        meta: { key: 'value' },
      }),
    })
    const value = await res.json()

    assert.deepStrictEqual(
      value.pin,
      {
        cid,
        meta: { key: 'value' },
        name: 'pin-everything',
        origins: null,
      },
      'Server responded with expected data for pin'
    )

    const { data } = await rawClient
      .from('upload')
      .select('*')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    // @ts-ignore
    assert.equal(data.source_cid, cid)
    assert.equal(data.deleted_at, null)
  })

  it('should pin twice and update data', async () => {
    // expected CID for the above data
    const cid = 'bafkreihwlixzeusjrd5avlg53yidaoonf5r5srzumu7y5uuumtt7rxxbrm'

    const res1 = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({
        cid,
      }),
    })
    const value1 = await res1.json()

    assert.deepStrictEqual(
      value1.pin,
      {
        cid,
        meta: null,
        name: null,
        origins: null,
      },
      'Server responded with expected data for first pin'
    )
    const res2 = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({
        cid,
        name: 'pin-everything',
        meta: { key: 'value' },
      }),
    })
    const value2 = await res2.json()

    assert.deepStrictEqual(
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

  it('should error pinning with invalid cid', async () => {
    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2y'
    const res = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ cid }),
    })
    const value = await res.json()
    assert.deepStrictEqual(value, {
      error: {
        reason: 'INVALID_PIN_DATA',
        details: 'Invalid request id: bafkreidvbhs33ighmljlvr7zbv2y',
      },
    })
  })

  it('should error pinning with invalid name', async () => {
    // expected CID for the above data
    const cid = 'bafkreihwlixzeusjrd5avlg53yidaoonf5r5srzumu7y5uuumtt7rxxbrm'
    const res = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ cid, name: 3333 }),
    })
    const value = await res.json()
    assert.deepStrictEqual(value, {
      error: {
        reason: 'INVALID_PIN_DATA',
        details: 'invalid name',
      },
    })
  })

  it('should error pinning with invalid meta', async () => {
    // expected CID for the above data
    const cid = 'bafkreihwlixzeusjrd5avlg53yidaoonf5r5srzumu7y5uuumtt7rxxbrm'
    const res = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ cid, meta: ['dd'] }),
    })
    const value = await res.json()
    assert.deepStrictEqual(value, {
      error: {
        reason: 'INVALID_PIN_DATA',
        details: 'invalid metadata',
      },
    })
  })

  it('should be ok pinning with an empty origins array', async () => {
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    const res = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ cid, origins: [] }),
    })
    const value = await res.json()
    assert.deepStrictEqual(value.status, 'queued')
  })

  it.only('should be ok pinning an origins array with multiaddresses', async () => {
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    const multiOrigin = Multiaddr.fromNodeAddress(
      { address: '127.0.0.1', port: 4001, family: 4 },
      'tcp'
    )
    const res = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ cid, origins: [multiOrigin] }),
    })
    const value = await res.json()
    assert.deepStrictEqual(value, 'queued')
  })

  it('should error pinning with non-multiaddr origins', async () => {
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    const res = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ cid, origins: ['garlic-barber'] }),
    })
    const value = await res.json()
    assert.deepStrictEqual(value, {
      error: {
        reason: 'INVALID_PIN_DATA',
        details:
          'invalid origins: one or more of the origins are not a multiaddr',
      },
    })
  })

  it('should pin to cluster by source CID', async () => {
    const cidv0 = 'QmXRdb4vemfS7Z6EL2p47XdjRatZ5Ne8DEnwr5uaHqXnak'
    const cidv1 = CID.parse(cidv0).toV1().toString()

    const res = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({ cid: cidv0 }),
    })
    const data = await res.json()
    assert.strictEqual(data.pin.cid, cidv0)

    // should be being pinned by the source CID
    let status = await cluster.status(cidv0)
    const goodStatuses = [
      TrackerStatusPinQueued,
      TrackerStatusPinning,
      TrackerStatusPinned,
    ]
    Object.values(status.peerMap).forEach(({ status }) => {
      assert(
        goodStatuses.some((s) => s === status),
        `status is ${status}, not one of ${goodStatuses}`
      )
    })

    // should not be pinned by normalized v1 CID
    status = await cluster.status(cidv1)
    Object.values(status.peerMap).forEach(({ status }) => {
      assert.strictEqual(status, TrackerStatusUnpinned)
    })
  })

  it('should filter non-string meta values', async () => {
    const cid = 'bafkreihwlixzeusjrd5avlg53yidaoonf5r5srzumu7y5uuumtt7rxxbrm'
    const res = await fetch('pins', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: JSON.stringify({
        cid,
        meta: { invalid: { object: 42 }, valid: 'string' },
      }),
    })
    const { pin } = await res.json()
    assert.strictEqual(pin.meta.invalid, undefined)
    assert.strictEqual(pin.meta.valid, 'string')
  })
})
