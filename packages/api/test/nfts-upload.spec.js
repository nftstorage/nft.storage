import assert from 'assert'
import { clearStores } from './scripts/helpers.js'
import stores from './scripts/stores.js'
import { endpoint } from './scripts/constants.js'
import { signJWT } from '../src/utils/jwt.js'
import { SALT } from './scripts/worker-globals.js'

describe('/upload', () => {
  beforeEach(clearStores)

  it('should upload a single file', async () => {
    const publicAddress = `0x73573r${Date.now()}`
    const issuer = `did:eth:${publicAddress}`
    const name = 'A Tester'

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

    const file = new Blob(['hello world!'])
    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    const res = await fetch(new URL(`upload`, endpoint).toString(), {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: file,
    })
    assert(res)
    assert(res.ok)
    const { ok, value } = await res.json()
    assert(ok)
    assert.strictEqual(value.cid, cid)

    const nftData = await stores.nfts.get(`${issuer}:${cid}`)
    assert(nftData)

    const pinData = await stores.pins.getWithMetadata(cid)
    assert(pinData.metadata)
    // @ts-ignore
    assert.strictEqual(pinData.metadata.status, 'pinned')
  })
})
