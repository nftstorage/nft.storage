import * as assert from 'uvu/assert'
import { NFTStorage, Blob, File } from 'nft.storage'

describe('client', () => {
  const { AUTH_TOKEN, SERVICE_ENDPOINT } = process.env
  const token = AUTH_TOKEN || ''
  const endpoint = new URL(SERVICE_ENDPOINT || '')

  it('interface', () => {
    assert.equal(typeof NFTStorage, 'function')
    const client = new NFTStorage({ token: 'secret' })
    assert.ok(client instanceof NFTStorage)
    assert.equal(typeof client.storeBlob, 'function')
    assert.equal(typeof client.storeDirectory, 'function')
    assert.equal(typeof client.status, 'function')
    assert.equal(typeof client.delete, 'function')

    assert.equal(typeof NFTStorage.storeBlob, 'function')
    assert.equal(typeof NFTStorage.storeDirectory, 'function')
    assert.equal(typeof NFTStorage.status, 'function')
    assert.equal(typeof NFTStorage.delete, 'function')
  })
  describe('upload', () => {
    it('upload blob', async () => {
      const client = new NFTStorage({ token, endpoint })
      const cid = await client.storeBlob(new Blob(['hello world']))
      assert.equal(cid, 'Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD')
    })

    it('can upload twice', async () => {
      const client = new NFTStorage({ token, endpoint })
      const blob = new Blob(['upload twice'])
      const cid1 = await client.storeBlob(blob)
      const status1 = await client.status(cid1)

      const cid2 = await client.storeBlob(blob)
      const status2 = await client.status(cid2)

      assert.equal(cid1, cid2, 'cids match')
      assert.equal(status1.created, status2.created, 'dates match')
    })
  })

  describe('upload dir', () => {
    it('upload a file', async () => {
      const client = new NFTStorage({ token, endpoint })
      const cid = await client.storeDirectory([
        new File(['hello world'], 'hello.txt'),
      ])

      assert.equal(cid, 'QmNxvA5bwvPGgMXbmtyhxA1cKFdvQXnsGnZLCGor3AzYxJ')
    })

    it('upload multiple files', async () => {
      const client = new NFTStorage({ token, endpoint })
      const cid = await client.storeDirectory([
        new File(['hello world'], 'hello.txt'),
        new File(
          [JSON.stringify({ from: 'incognito' }, null, 2)],
          'metadata.json'
        ),
      ])

      assert.equal(cid, 'QmQAE2tjfwYYmEFFEEnfr12CWikMqgwwtq5gqfyb62bJpw')
    })
  })

  describe('status', () => {
    const client = new NFTStorage({ token, endpoint })

    /** @type {string[]} */
    let preloaded
    beforeEach(async () => {
      preloaded = [
        // QmaCxv35MgHdAD2K9Tn8xrKVZJw7dauYi4V1GmkQRNYbvP
        await client.storeBlob(new Blob(['preload status'])),
        // QmTPFUEcZvqKBYqJM3itqkDiqJaApYzLJ1ht6iBD4d6M28
        // await client.storeBlob(new Blob(['missing']))
      ]
    })

    afterEach(async () => {
      await Promise.all(preloaded.map((cid) => client.delete(cid)))
    })

    it('found', async () => {
      const cid = 'QmaCxv35MgHdAD2K9Tn8xrKVZJw7dauYi4V1GmkQRNYbvP'
      const status = await client.status(cid)
      assert.equal(status.cid, cid)
    })

    it('not found', async () => {
      const cid = 'QmTPFUEcZvqKBYqJM3itqkDiqJaApYzLJ1ht6iBD4d6M28'
      try {
        await client.status(cid)
        assert.unreachable('Expected to fail')
      } catch (error) {
        assert.ok(error.message.match(/not found/))
      }
    })
  })

  describe('delete', () => {
    it('ok to delete unknown', async () => {
      const client = new NFTStorage({ token, endpoint })
      const cid = 'Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD'
      const result = await client.delete(cid)
      assert.equal(result, undefined)
    })

    it('gone after delete', async () => {
      const client = new NFTStorage({ token, endpoint })
      const cid = await client.storeBlob(new Blob(['to be deleted']))
      await client.status(cid)
      await client.delete(cid)
      try {
        await client.status(cid)
        assert.unreachable('should be gone')
      } catch (error) {
        assert.ok(error.message.includes('not found'))
      }
    })
  })
})
