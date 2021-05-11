import assert from 'assert'
import '../src/index.js'
import { TestFetchEvent } from './scripts/events.js'

describe('/version', () => {
  it('should get version information', async () => {
    const request = new Request('http://localhost/version')
    const event = new TestFetchEvent('fetch', { request })
    globalThis.dispatchEvent(event)
    const res = await event.respondWithPromise
    assert(res)
    assert(res.ok)
    const { version, commit, branch } = await res.json()
    assert.strictEqual(version, VERSION)
    assert.strictEqual(commit, COMMITHASH)
    assert.strictEqual(branch, BRANCH)
  })
})
