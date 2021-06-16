import assert from 'assert'
import all from 'it-all'
import { clearStores } from './scripts/helpers.js'
import stores from './scripts/stores.js'
import { endpoint } from './scripts/constants.js'
import { signJWT } from '../src/utils/jwt.js'
import { SALT } from './scripts/worker-globals.js'
import { createCar, createCarSplitter } from './scripts/car.js'

/**
 * @param {{publicAddress?: string, issuer?: string, name?: string}} userInfo
 */
async function createTestUser({
  publicAddress = `0x73573r${Date.now()}`,
  issuer = `did:eth:${publicAddress}`,
  name = 'A Tester',
} = {}) {
  const token = await signJWT(
    {
      sub: issuer,
      iss: 'nft-storage',
      iat: Date.now(),
      name: 'test',
    },
    SALT
  )
  await stores.users.put(
    issuer,
    JSON.stringify({
      sub: issuer,
      nickname: 'testymctestface',
      name,
      email: 'a.tester@example.org',
      picture: 'http://example.org/avatar.png',
      issuer,
      publicAddress,
      tokens: { test: token },
    })
  )
  return { token, issuer }
}

describe('/upload', () => {
  beforeEach(clearStores)

  it('should upload a single file', async () => {
    const { token, issuer } = await createTestUser()

    const file = new Blob(['hello world!'])
    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    const res = await fetch(new URL(`upload`, endpoint).toString(), {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: file,
    })
    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    assert(ok, 'Server response payload has `ok` property')
    assert.strictEqual(value.cid, cid, 'Server responded with expected CID')

    const nftData = await stores.nfts.get(`${issuer}:${cid}`)
    assert(nftData, 'nft data was stored')

    const pinData = await stores.pins.getWithMetadata(cid)
    assert(pinData.metadata, 'pin metadata was stored')
    assert.strictEqual(
      // @ts-ignore
      pinData.metadata.status,
      'pinned',
      'pin status is "pinned"'
    )
  })

  it('should upload a single CAR file', async () => {
    const { token, issuer } = await createTestUser()

    const { root, car } = await createCar('hello world!')
    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    assert.strictEqual(root.toString(), cid, 'car file has correct root')
    const res = await fetch(new URL('upload', endpoint).toString(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/car',
      },
      body: car,
    })

    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    assert(ok, 'Server response payload has `ok` property')
    assert.strictEqual(value.cid, cid, 'Server responded with expected CID')

    const nftData = await stores.nfts.get(`${issuer}:${cid}`)
    assert(nftData, 'nft data was stored')

    const pinData = await stores.pins.getWithMetadata(cid)
    assert(pinData.metadata, 'pin metadata was stored')
    // ipfs dag stat bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve
    // Size: 12, NumBlocks: 1
    // @ts-ignore
    assert.strictEqual(pinData.metadata.size, 12, 'pin size correct')
    assert.strictEqual(
      // @ts-ignore
      pinData.metadata.status,
      'pinned',
      'pin status is "pinned"'
    )
  })

  it('should upload partial CAR files and be able to pin', async () => {
    let root
    const { token, issuer } = await createTestUser()
    const splitter = await createCarSplitter()

    // TODO: We can make this in parallel
    for await (const car of splitter.cars()) {
      const chunks = await all(car)

      // Upload partial chunk
      const res = await fetch(
        new URL('upload/car/chunk', endpoint).toString(),
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/car',
          },
          body: new Blob(chunks, {
            type: 'application/car',
          }),
        }
      )

      assert(res, 'Server responded')
      assert(res.ok, 'Server response ok')
      const { ok, value } = await res.json()
      assert(ok, 'Server response payload has `ok` property')

      if (!root) {
        // We will have the root on the received car
        root = value.cid
      }
    }

    // Pin NFT
    const pinRes = await fetch(new URL('pins', endpoint).toString(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cid: root,
      }),
    })

    assert(pinRes, 'Server responded')
    assert(pinRes.ok, 'Server response ok')

    const pinData = await pinRes.json()

    assert.strictEqual(
      pinData.requestid,
      root,
      'Server responded with expected CID'
    )

    const nftData = await stores.nfts.get(`${issuer}:${root}`)
    assert(nftData, 'nft data was stored')
  })
})
