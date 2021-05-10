import assert from 'assert'
import '../src/index.js'
import { TestFetchEvent } from './helpers/events.js'
import { clearStores } from './helpers/stores.js'
import * as users from '../src/models/users.js'

describe('/upload', () => {
  beforeEach(clearStores)

  it('should upload a single file', async () => {
    const publicAddress = `0x73573r${Date.now()}`
    const issuer = `did:eth:${publicAddress}`
    await users.createOrUpdate({
      sub: issuer,
      nickname: 'testymctestface',
      name: 'A Tester',
      email: 'a.tester@example.org',
      picture: 'http://example.org/avatar.png',
      issuer,
      publicAddress,
      tokens: {},
    })
    await users.createToken(issuer, 'test')
    const tokens = await users.tokens(issuer)

    const file = new Blob(['hello world!'])
    const request = new Request(`http://localhost/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${tokens.test}` },
      body: file,
    })
    const event = new TestFetchEvent('fetch', { request })
    globalThis.dispatchEvent(event)
    const res = await event.respondWithPromise
    assert(res)
    assert(res.ok)
    const { ok, value } = await res.json()
    assert(ok)
    console.log({ ok, value })
  })
})
