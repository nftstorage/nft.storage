import assert from 'assert'
import {
  createTestUserWithFixedToken,
  DBTestClient,
  getRawClient,
} from './scripts/helpers.js'
import { fixtures } from './scripts/fixtures.js'
import { createCar } from './scripts/car.js'

describe('Metaplex Upload', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    const user = await createTestUserWithFixedToken({
      token: 'metaplex-test-token',
    })
    client = new DBTestClient(user)
  })

  it('should upload a single CAR file with a CID-specific token', async () => {
    const { root, car } = await createCar('hello world car')
    // expected CID for the above data
    const cid = 'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
    assert.strictEqual(root.toString(), cid, 'car file has correct root')

    const fixture = fixtures.metaplexAuth.v1[cid]
    assert.notEqual(fixture, null, 'no fixture for cid ' + cid)

    const res = await fetch('metaplex/upload', {
      method: 'POST',
      headers: {
        'x-web3auth': `Metaplex ${fixture.token}`,
        'Content-Type': 'application/car',
      },
      body: car,
    })

    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    assert(ok, 'Server response payload has `ok` property')
    assert.strictEqual(value.cid, cid, 'Server responded with expected CID')
    assert.strictEqual(
      value.type,
      'application/car',
      'type should match blob mime-type'
    )

    const { data } = await getRawClient()
      .from('upload')
      .select('*, content(*)')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    // @ts-ignore
    assert.equal(data.source_cid, cid)
    assert.equal(data.deleted_at, null)
    assert.equal(data.content.dag_size, 15, 'correct dag size')

    const expectedMeta = {
      iss: fixture.meta.iss,
      rootCID: fixture.meta.req.put.rootCID,
      solanaCluster: fixture.meta.req.put.tags.solanaCluster,
      mintingAgent: fixture.meta.req.put.tags.mintingAgent,
      agentVersion: fixture.meta.req.put.tags.agentVersion,
    }
    assert.deepEqual(data.meta, expectedMeta, 'metadata matches jwt payload')
  })

  it('should support payloads without mintingAgent tag', async () => {
    const { root, car } = await createCar('hello world car')
    // expected CID for the above data
    const cid = 'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
    assert.strictEqual(root.toString(), cid, 'car file has correct root')

    const fixture = fixtures.metaplexAuth.v0[cid]
    assert.notEqual(fixture, null, 'no fixture for cid ' + cid)

    const res = await fetch('metaplex/upload', {
      method: 'POST',
      headers: {
        'x-web3auth': `Metaplex ${fixture.token}`,
        'Content-Type': 'application/car',
      },
      body: car,
    })

    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    assert(ok, 'Server response payload has `ok` property')
    assert.strictEqual(value.cid, cid, 'Server responded with expected CID')
    assert.strictEqual(
      value.type,
      'application/car',
      'type should match blob mime-type'
    )

    const { data } = await getRawClient()
      .from('upload')
      .select('*, content(*)')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    // @ts-ignore
    assert.equal(data.source_cid, cid)
    assert.equal(data.deleted_at, null)
    assert.equal(data.content.dag_size, 15, 'correct dag size')

    const expectedMeta = {
      iss: fixture.meta.iss,
      rootCID: fixture.meta.req.put.rootCID,
      solanaCluster: fixture.meta.req.put.tags['solana-cluster'],
      mintingAgent: 'unknown',
    }
    assert.deepEqual(data.meta, expectedMeta, 'metadata matches jwt payload')
  })

  it('should fail if token has an invalid signature', async () => {
    const { root, car } = await createCar('hello world car')
    // expected CID for the above data
    const cid = 'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
    assert.strictEqual(root.toString(), cid, 'car file has correct root')

    const fixture = fixtures.metaplexAuth.v1[cid]
    assert.notEqual(fixture, null, 'no fixture for cid ' + cid)

    const tokenParts = fixture.token.split('.')
    tokenParts[2] = tokenParts[2].replace('0', '1')
    const alteredToken = tokenParts.join('.')

    const res = await fetch('metaplex/upload', {
      method: 'POST',
      headers: {
        'x-web3auth': `Metaplex ${alteredToken}`,
        'Content-Type': 'application/car',
      },
      body: car,
    })

    assert(res, 'Server responded')
    assert.equal(res.status, 401, 'Expected auth error, but response was ok')
  })

  it('should fail if token payload is modified', async () => {
    const { root, car } = await createCar('hello world car')
    // expected CID for the above data
    const cid = 'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
    assert.strictEqual(root.toString(), cid, 'car file has correct root')

    const fixture = fixtures.metaplexAuth.v1[cid]
    assert.notEqual(fixture, null, 'no fixture for cid ' + cid)

    const tokenParts = fixture.token.split('.')
    tokenParts[1] = tokenParts[1].replace('0', '1')
    const alteredToken = tokenParts.join('.')

    const res = await fetch('metaplex/upload', {
      method: 'POST',
      headers: {
        'x-web3auth': `Metaplex ${alteredToken}`,
        'Content-Type': 'application/car',
      },
      body: car,
    })

    assert(res, 'Server responded')
    assert.equal(res.status, 401, 'Expected auth error, but response was ok')
  })

  it('should fail if uploaded CAR has different CID than specified in token', async () => {
    // cid for the "hello world car". we have a valid token saved for this CID as a fixture
    const signedCID =
      'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
    const fixture = fixtures.metaplexAuth.v1[signedCID]
    assert.notEqual(fixture, null, 'no fixture for cid ' + signedCID)

    const { root, car } = await createCar('a different car')
    assert.notEqual(root.toString(), signedCID)

    const res = await fetch('metaplex/upload', {
      method: 'POST',
      headers: {
        'x-web3auth': `Metaplex ${fixture.token}`,
        'Content-Type': 'application/car',
      },
      body: car,
    })

    assert(res, 'Server responded')
    assert.equal(res.status, 401, 'Expected auth error, but response was ok')
  })
})
