import assert from 'assert'
import { CID } from 'multiformats'
import { clearStores } from './scripts/helpers.js'
import stores from './scripts/stores.js'
import { signJWT } from '../src/utils/jwt.js'
import { SALT } from './scripts/worker-globals.js'
import * as Token from '../../client/src/token.js'

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

describe('/store', () => {
  beforeEach(clearStores)

  it('should store image', async () => {
    const { token, issuer } = await createTestUser()

    const trick =
      'ipfs://bafyreiemweb3jxougg7vaovg7wyiohwqszmgwry5xwitw3heepucg6vyd4'
    const metadata = {
      name: 'name',
      description: 'stuff',
      image: new File(['fake image'], 'cat.png', { type: 'image/png' }),
      properties: {
        extra: 'meta',
        trick,
        src: [
          new File(['hello'], 'hello.txt', { type: 'text/plain' }),
          new Blob(['bye']),
        ],
      },
    }
    const body = Token.encode(metadata)

    const res = await fetch('/store', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body,
    })
    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    const result = value
    const cid = CID.parse(result.ipnft)
    assert.equal(cid.version, 1)

    assert.ok(typeof result.url === 'string')
    assert.ok(result.url.startsWith('ipfs:'))

    assert.equal(result.data.name, 'name')
    assert.equal(result.data.description, 'stuff')
    assert.equal(
      result.data.image,
      'ipfs://bafybeieb43wq6bqbfmyaawfmq6zuycdq4bo77zph33zxx26wvquth3qxau/cat.png'
    )
    assert.equal(result.data.properties.extra, 'meta')
    assert.equal(result.data.properties.trick, trick)
    assert.ok(Array.isArray(result.data.properties.src))
    assert.equal(result.data.properties.src.length, 2)

    const nftData = await stores.nfts.get(`${issuer}:${result.ipnft}`)
    assert(nftData, 'nft data was stored')

    const pinData = await stores.pins.getWithMetadata(result.ipnft)
    assert(pinData.metadata, 'pin metadata was stored')
    assert.strictEqual(
      // @ts-ignore
      pinData.metadata.status,
      'pinned',
      'pin status is "pinned"'
    )
  })
})
