import assert from 'assert'
import { clearStores } from './scripts/helpers.js'
import stores from './scripts/stores.js'
import { endpoint } from './scripts/constants.js'
import { signJWT } from '../src/utils/jwt.js'
import { SALT } from './scripts/worker-globals.js'
import { createCar } from './scripts/car.js'

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
    const res = await fetch('/upload', {
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
      'queued',
      'pin status is "queued"'
    )
  })

  it('should upload a single CAR file', async () => {
    const { token, issuer } = await createTestUser()

    const { root, car } = await createCar('hello world!')
    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    assert.strictEqual(root.toString(), cid, 'car file has correct root')
    const res = await fetch('/upload', {
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
      'queued',
      'pin status is "queued"'
    )
  })
})
