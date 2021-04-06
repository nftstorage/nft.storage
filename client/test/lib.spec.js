import * as assert from 'uvu/assert'
import { NFTStorage, Blob, File } from 'nft.storage'
import { CID } from 'multiformats'

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

    it('errors without token', async () => {
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
        assert.match(error, /no files/i)
      }
    })
  })

  describe('store', async () => {
    it('requires name', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        // @ts-expect-error
        await client.store({})
        assert.unreachable('sholud have failed')
      } catch (error) {
        assert.ok(error instanceof TypeError)
        assert.match(
          error,
          /string property `name` identifying the asset is required/
        )
      }
    })

    it('requires description', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        // @ts-expect-error
        await client.store({ name: 'name' })
        assert.unreachable('sholud have failed')
      } catch (error) {
        assert.ok(error instanceof TypeError)
        assert.match(
          error,
          /string property `description` describing asset is required/
        )
      }
    })

    it('requires image', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        // @ts-expect-error
        await client.store({ name: 'name', description: 'stuff' })
        assert.unreachable('sholud have failed')
      } catch (error) {
        assert.ok(error instanceof TypeError)
        assert.match(error, /proprety `image` must be a Blob or File/)
      }
    })

    it('requires image mime type', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        await client.store({
          name: 'name',
          description: 'stuff',
          image: new Blob(['bla bla']),
        })
      } catch (error) {
        assert.ok(error instanceof TypeError)
        assert.match(error, /Blob or File object with `image\/\*` mime type/)
      }
    })

    it('expects decimal to be an int', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        await client.store({
          name: 'name',
          description: 'stuff',
          image: new Blob(['pretend image'], { type: 'image/png' }),
          // @ts-expect-error
          decimals: 'foo',
        })
      } catch (error) {
        assert.ok(error instanceof TypeError)
        assert.match(error, /proprety `decimals` must be an integer value/)
      }
    })

    it('errors without token', async () => {
      const client = new NFTStorage({ token: 'wrong', endpoint })

      try {
        await client.store({
          name: 'name',
          description: 'tada',
          image: new Blob([], { type: 'image/png' }),
        })
        assert.unreachable('sholud have failed')
      } catch (error) {
        assert.ok(error instanceof Error)
        assert.match(error, /Unauthorized/)
      }
    })

    it('uploads image', async () => {
      const client = new NFTStorage({ token, endpoint })
      const result = await client.store({
        name: 'name',
        description: 'stuff',
        image: new Blob(['fake image'], { type: 'image/png' }),
      })

      assert.ok(result.metadata instanceof URL)
      assert.ok(result.metadata.protocol, 'ipfs:')

      const cid = CID.parse(result.ipld)
      assert.equal(cid.version, 1)

      assert.equal(result.data.name, 'name')
      assert.equal(result.data.description, 'stuff')
      assert.ok(result.data.image instanceof URL)
      assert.ok(result.data.image.protocol, 'ipfs:')

      assert.equal(result.embed.name, 'name')
      assert.equal(result.embed.description, 'stuff')
      assert.ok(result.embed.image instanceof URL)
      assert.ok(result.embed.image.protocol, 'https:')
    })

    it('store with properties', async () => {
      const client = new NFTStorage({ token, endpoint })
      const result = await client.store({
        name: 'name',
        description: 'stuff',
        image: new File(['fake image'], 'cat.png', { type: 'image/png' }),
        properties: {
          extra: 'meta',
          src: [
            new File(['hello'], 'hello.txt', { type: 'text/plain' }),
            new Blob(['bye']),
          ],
        },
      })

      assert.ok(result.metadata instanceof URL)
      assert.ok(result.metadata.protocol, 'ipfs:')

      const cid = CID.parse(result.ipld)
      assert.equal(cid.version, 1)

      assert.equal(result.data.name, 'name')
      assert.equal(result.data.description, 'stuff')
      assert.ok(result.data.image instanceof URL)
      assert.ok(result.data.image.protocol, 'ipfs:')

      assert.equal(result.data.properties.extra, 'meta')
      assert.ok(Array.isArray(result.data.properties.src))
      assert.equal(result.data.properties.src.length, 2)

      const [h, b] = /** @type {[URL, URL]} */ (result.data.properties.src)
      assert.ok(h instanceof URL)
      assert.equal(h.protocol, 'ipfs:')

      assert.ok(b instanceof URL)
      assert.equal(b.protocol, 'ipfs:')

      assert.equal(result.embed.name, 'name')
      assert.equal(result.embed.description, 'stuff')
      assert.ok(result.embed.image instanceof URL)
      assert.ok(result.embed.image.protocol, 'https:')

      assert.equal(result.embed.properties.extra, 'meta')
      assert.ok(Array.isArray(result.embed.properties.src))
      assert.equal(result.embed.properties.src.length, 2)

      const [h2, b2] = /** @type {[URL, URL]} */ (result.embed.properties.src)
      assert.ok(h2 instanceof URL)
      assert.equal(h2.protocol, 'https:')

      assert.ok(b2 instanceof URL)
      assert.equal(b2.protocol, 'https:')
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
  })
})
