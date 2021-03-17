import { test } from "zora"
import NFTStorage from "../src/lib.js"

const { AUTH_TOKEN, SERVICE_ENDPOINT } = process.env

const token = AUTH_TOKEN || ''
const endpoint = new URL(SERVICE_ENDPOINT || '')

test('client', ({test}) => {
  test("interface", (assert) => {
    assert.equal(typeof NFTStorage, "function")
    const client = new NFTStorage({ token: 'secret' })
    assert.ok(client instanceof NFTStorage)
    assert.equal(typeof client.storeBlob, "function")
    assert.equal(typeof client.storeDirectory, "function")
    assert.equal(typeof client.status, "function")
    assert.equal(typeof client.delete, "function")

    assert.equal(typeof NFTStorage.storeBlob, "function")
    assert.equal(typeof NFTStorage.storeDirectory, "function")
    assert.equal(typeof NFTStorage.status, "function")
    assert.equal(typeof NFTStorage.delete, "function")
  })
  test("upload", ({ test }) => {
    test('upload blob', async assert => {
      const client = new NFTStorage({ token, endpoint })
      const cid = await client.storeBlob(new Blob(['hello world']))
      assert.equal(cid, 'Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD')
    })

    test('can upload twice', async assert => {
      const client = new NFTStorage({ token, endpoint })
      const blob = new Blob(['upload twice'])
      const cid1 = await client.storeBlob(blob)
      const status1 = await client.status(cid1)

      const cid2 = await client.storeBlob(blob)
      const status2 = await client.status(cid2)

      assert.deepEqual(cid1, cid2, 'cids match')
      assert.deepEqual(status1.created, status2.created, 'dates match')
    })
  })
  test("status", (t) => {
    const client = new NFTStorage({ token, endpoint })

    /** @type {typeof t.test} */
    const test = (name, unit) => t.test(name, async (assert) => {
      const preloaded = [
        // QmaCxv35MgHdAD2K9Tn8xrKVZJw7dauYi4V1GmkQRNYbvP
        await client.storeBlob(new Blob(['preload status'])),
        // QmTPFUEcZvqKBYqJM3itqkDiqJaApYzLJ1ht6iBD4d6M28
        // await client.storeBlob(new Blob(['missing']))
      ]

      await unit(assert)

      await Promise.all(preloaded.map(cid => client.delete(cid)))

    })

    test('found', async assert => {
      const cid = 'QmaCxv35MgHdAD2K9Tn8xrKVZJw7dauYi4V1GmkQRNYbvP'
      const status = await client.status(cid)
      assert.deepEqual(status.cid, cid)
    })

    test('not found', async assert => {
      const cid = 'QmTPFUEcZvqKBYqJM3itqkDiqJaApYzLJ1ht6iBD4d6M28'
      try {
        await client.status(cid)
        assert.fail('Expected to fail')
      } catch (error) {
        assert.ok(error.message.match(/not found/))
      }
    })
  })

  test('delete', ({test}) => {
    test('ok to delete unknown', async assert => {
      const client = new NFTStorage({ token, endpoint })
      const cid = 'Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD'
      const result = await client.delete(cid)
      assert.equal(result, undefined)
    })

    test('gone after delete', async assert => {
      const client = new NFTStorage({ token, endpoint })
      const cid = await client.storeBlob(new Blob(['to be deleted']))
      await client.status(cid)
      await client.delete(cid)
      try {
        await client.status(cid)
        assert.fail('should be gone')
      } catch (error) {
        assert.ok(error.message.includes('not found'))
      }
    })
  })
})

