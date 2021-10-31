import assert from 'assert'
import {
  createClientWithUser,
  DBTestClient,
  rawClient,
} from './scripts/helpers.js'

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
        origins: ['multiaddr1', 'multiaddr2'],
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
        origins: ['multiaddr1', 'multiaddr2'],
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
        origins: ['multiaddr1', 'multiaddr2'],
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
        origins: ['multiaddr1', 'multiaddr2'],
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
})
