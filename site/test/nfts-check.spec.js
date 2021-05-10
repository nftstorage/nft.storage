import assert from 'assert'
import '../src/index.js'
import { TestFetchEvent } from './scripts/events.js'
import { set as setPin } from '../src/models/pins.js'
import { clearStores } from './scripts/helpers.js'

const cid = 'Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD'

describe('/check/{cid}', () => {
  beforeEach(clearStores)

  it('should retrieve pin and deal information for CID', async () => {
    /** @type {import('../src/models/pins.js').Pin} */
    const pin = {
      cid,
      status: 'pinned',
      size: 1234,
      created: new Date().toISOString(),
    }
    await setPin(cid, pin)

    /** @type {import('../src/bindings').Deal[]} */
    const deals = [{ status: 'queued', lastChanged: new Date() }]
    await DEALS.put(cid, JSON.stringify(deals))

    const request = new Request(`http://localhost/check/${cid}`)
    const event = new TestFetchEvent('fetch', { request })
    globalThis.dispatchEvent(event)
    const res = await event.respondWithPromise
    assert(res)
    assert(res.ok)
    const { ok, value } = await res.json()
    assert(ok)
    assert.deepStrictEqual(value.pin, pin)
    assert.deepStrictEqual(value.deals, JSON.parse(JSON.stringify(deals)))
  })

  it('should error if CID is not found', async () => {
    const request = new Request(`http://localhost/check/${cid}`)
    const event = new TestFetchEvent('fetch', { request })
    globalThis.dispatchEvent(event)
    const res = await event.respondWithPromise
    assert(res)
    assert.strictEqual(res.status, 404)
    const { ok, error } = await res.json()
    assert(!ok)
    assert.strictEqual(error.message, 'NFT not found')
  })
})
