import assert from 'assert'
import {
  createTestUserWithFixedToken,
  DBTestClient,
  rawClient,
} from './scripts/helpers.js'
import { fixtures } from './scripts/fixtures.js'
import { createCar } from './scripts/car.js'

describe(' V1 - Metaplex Upload ', () => {
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

    const fixture = fixtures.metaplexAuth[cid]
    assert.notEqual(fixture, null, 'no fixture for cid ' + cid)

    const res = await fetch('metaplex/upload', {
      method: 'POST',
      headers: {
        'x-web3auth': `Metaplex ${fixture.token}`,
        'x-web3meta': JSON.stringify(fixture.meta),
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

    const { data } = await rawClient
      .from('upload')
      .select('*, content(*)')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    // @ts-ignore
    assert.equal(data.source_cid, cid)
    assert.equal(data.deleted_at, null)
    assert.equal(data.content.dag_size, 15, 'correct dag size')
  })
})
