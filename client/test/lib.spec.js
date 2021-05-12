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

    it('errors with invalid token', async () => {
      const client = new NFTStorage({ token: 'wrong', endpoint })
      const blob = new Blob(['upload twice'])

      try {
        await client.storeBlob(blob)
        assert.unreachable('sholud have failed')
      } catch (error) {
        assert.ok(error instanceof Error)
        assert.match(error, /Unauthorized/)
      }
    })

    it('errors without token', async () => {
      // @ts-ignore
      const client = new NFTStorage({ endpoint })
      try {
        await client.storeBlob(new Blob(['blobby']))
        assert.unreachable('should have thrown')
      } catch (err) {
        assert.is(err.message, 'missing token')
      }
    })

    it('errors without content', async () => {
      const client = new NFTStorage({ endpoint, token })
      try {
        await client.storeBlob(new Blob([]))
        assert.unreachable('should have thrown')
      } catch (err) {
        assert.match(err.message, /provide some content/)
      }
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

    it('upload nothing', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        await client.storeDirectory([])
        assert.unreachable('should fail if no content is provided')
      } catch (error) {
        assert.ok(error instanceof Error)
        assert.match(error, /provide some content/i)
      }
    })

    it('upload empty files', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        await client.storeDirectory([new File([], 'empty.txt')])
        assert.unreachable('should fail if no content is provided')
      } catch (error) {
        assert.ok(error instanceof Error)
        assert.match(error, /provide some content/i)
      }
    })
    it('errors without token', async () => {
      // @ts-ignore
      const client = new NFTStorage({ endpoint })
      try {
        await client.storeDirectory([new File(['file'], 'file.txt')])
        assert.unreachable('should have thrown')
      } catch (err) {
        assert.is(err.message, 'missing token')
      }
    })

    it('errors with invalid token', async () => {
      const client = new NFTStorage({ token: 'wrong', endpoint })

      try {
        await client.storeDirectory([new File(['wrong token'], 'foo.txt')])
        assert.unreachable('sholud have failed')
      } catch (error) {
        assert.ok(error instanceof Error)
        assert.match(error, /Unauthorized/)
      }
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

    it('errors without token', async () => {
      // @ts-ignore
      const client = new NFTStorage({ endpoint })
      try {
        await client.status('QmaCxv35MgHdAD2K9Tn8xrKVZJw7dauYi4V1GmkQRNYbvP')
        assert.unreachable('should have thrown')
      } catch (err) {
        assert.is(err.message, 'missing token')
      }
    })

    it('decodes dates in deals', async () => {
      const cid = 'bafyreigdcnuc6w7stviim6a5m7uwqdw6p3z5zrqr22xt3num3ozra4ciqi'
      const pieceCid =
        'bagayreigdcnuc6w7stviim6a5m7uwqdw6p3z5zrqr22xt3num3ozra4ciqi'
      const status = await client.status(cid)
      assert.equal(status.cid, cid)
      assert.ok(status.created instanceof Date)
      assert.equal(status.deals, [
        {
          lastChanged: new Date('2021-03-18T11:46:50.000Z'),
          status: 'queued',
        },
        {
          batchRootCid: cid,
          lastChanged: new Date('2021-03-18T11:46:50.000Z'),
          miner: 't01234',
          network: 'nerpanet',
          pieceCid,
          status: 'proposing',
        },
        {
          batchRootCid: cid,
          lastChanged: new Date('2021-03-18T11:46:50.000Z'),
          miner: 'f05678',
          network: 'mainnet',
          pieceCid,
          status: 'accepted',
        },
        {
          batchRootCid: cid,
          lastChanged: new Date('2021-03-18T11:46:50.000Z'),
          miner: 'f09999',
          network: 'mainnet',
          pieceCid,
          status: 'failed',
          statusText: 'miner rejected my stuffz',
        },
        {
          batchRootCid: cid,
          chainDealID: 24526235,
          dealActivation: new Date('2021-03-18T11:46:50.000Z'),
          dealExpiration: new Date('2021-03-18T11:46:50.000Z'),
          lastChanged: new Date('2021-03-18T11:46:50.000Z'),
          miner: 'f34523',
          network: 'mainnet',
          pieceCid,
          status: 'active',
        },
      ])
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

    it('invalid cid errors', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        await client.delete('foo')
        assert.unreachable('invalid cid')
      } catch (error) {
        assert.ok(error instanceof Error)
        assert.match(error, /parse non base32/)
      }
    })

    it('errors without token', async () => {
      // @ts-ignore
      const client = new NFTStorage({ endpoint })
      try {
        const cid = await NFTStorage.storeBlob(
          { token, endpoint },
          new Blob(['deleteme'])
        )
        await client.delete(cid)
        assert.unreachable('should have thrown')
      } catch (err) {
        assert.is(err.message, 'missing token')
      }
    })
  })

  describe('check', () => {
    const client = new NFTStorage({ token, endpoint })

    /** @type {string[]} */
    let preloaded
    beforeEach(async () => {
      preloaded = [
        // QmVRC63ZHwHQBC4pkqbiQjPjdHVKueafTpwmkNHhnVfwLQ
        await client.storeBlob(new Blob(['preload check'])),
        // QmTPFUEcZvqKBYqJM3itqkDiqJaApYzLJ1ht6iBD4d6M28
        // await client.storeBlob(new Blob(['missing']))
      ]
    })

    afterEach(async () => {
      await Promise.all(preloaded.map((cid) => client.delete(cid)))
    })

    it('found', async () => {
      const cid = 'QmVRC63ZHwHQBC4pkqbiQjPjdHVKueafTpwmkNHhnVfwLQ'
      const status = await client.check(cid)
      assert.equal(status.cid, cid)
    })

    it('not found', async () => {
      const cid = 'QmTPFUEcZvqKBYqJM3itqkDiqJaApYzLJ1ht6iBD4d6M28'
      try {
        await client.check(cid)
        assert.unreachable('Expected to fail')
      } catch (error) {
        assert.ok(error.message.match(/not found/))
      }
    })
  })
})
