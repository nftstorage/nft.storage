import { CarReader } from '@ipld/car'
import * as assert from 'uvu/assert'
import { NFTStorage, Blob, File, Token } from 'nft.storage'
import { CID } from 'multiformats/cid'
import { sha256 } from 'multiformats/hashes/sha2'
import * as raw from 'multiformats/codecs/raw'
import { encode } from 'multiformats/block'
import { pack } from 'ipfs-car/pack'
import { CarWriter } from '@ipld/car'
import * as dagJson from '@ipld/dag-json'
import { randomCar } from './helpers.js'
import { toAsyncIterable } from '../src/lib.js'

const GATEWAY_LINK = 'nftstorage.link'

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

  describe('headers', () => {
    it('sets Authorization & X-Client headers', () => {
      const client = new NFTStorage({ token: 'secret' })
      assert.equal(NFTStorage.auth(client), {
        Authorization: 'Bearer secret',
        'X-Client': 'nft.storage/js',
      })
    })

    it('sets x-agent-did header', () => {
      const client = new NFTStorage({ token: 'secret', did: 'did:key:zAlice' })
      assert.equal(NFTStorage.auth(client), {
        Authorization: 'Bearer secret',
        'X-Client': 'nft.storage/js',
        'x-agent-did': 'did:key:zAlice',
      })
    })
  })
  describe('upload', () => {
    it('upload blob', async () => {
      const client = new NFTStorage({ token, endpoint })
      const cid = await client.storeBlob(new Blob(['hello world']))
      assert.equal(
        cid,
        'bafkreifzjut3te2nhyekklss27nh3k72ysco7y32koao5eei66wof36n5e'
      )
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
        assert.unreachable('should have failed')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof Error)
        assert.match(error.message, /Unauthorized/)
      }
    })

    it('errors without token', async () => {
      // @ts-expect-error - token option is expected
      const client = new NFTStorage({ endpoint })
      try {
        await client.storeBlob(new Blob(['blobby']))
        assert.unreachable('should have thrown')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.is(error.message, 'missing token')
      }
    })

    it('errors without content', async () => {
      const client = new NFTStorage({ endpoint, token })
      try {
        await client.storeBlob(new Blob([]))
        assert.unreachable('should have thrown')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.match(error.message, /provide some content/)
      }
    })

    it('aborts', async () => {
      const client = new NFTStorage({ token, endpoint })
      const controller = new AbortController()
      controller.abort()
      try {
        await client.storeBlob(new Blob(['data']), {
          signal: controller.signal,
        })
        assert.unreachable('request should not have succeeded')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.equal(error.name, 'AbortError')
      }
    })
  })

  describe('upload car', () => {
    it('upload CAR with a blob', async () => {
      const client = new NFTStorage({ token, endpoint })
      const { root, out } = await pack({
        input: [new TextEncoder().encode('hello world')],
      })
      const expectedCid = root.toString()
      const carParts = []
      for await (const part of out) {
        carParts.push(part)
      }
      const car = new Blob(carParts, { type: 'application/car' })
      const cid = await client.storeCar(car)
      assert.equal(cid, expectedCid)
    })

    it('upload CAR with a blob lacking blob.type', async () => {
      const client = new NFTStorage({ token, endpoint })
      const { root, out } = await pack({
        input: [new TextEncoder().encode('hello world')],
      })
      const expectedCid = root.toString()
      const carParts = []
      for await (const part of out) {
        carParts.push(part)
      }
      const car = new Blob(carParts)
      const cid = await client.storeCar(car)
      assert.equal(cid, expectedCid)
    })

    it('upload CAR with a CarReader', async () => {
      const client = new NFTStorage({ token, endpoint })
      const { root, out } = await pack({
        input: [new TextEncoder().encode('hello world')],
      })
      const expectedCid = root.toString()

      const carReader = await CarReader.fromIterable(out)

      const cid = await client.storeCar(carReader)
      assert.equal(cid, expectedCid)
    })

    it('upload large CAR with a CarReader', async function () {
      // @ts-ignore
      this.timeout(130e3)
      let uploadedChunks = 0

      const client = new NFTStorage({ token, endpoint })

      const targetSize = 1024 * 1024 * 120 // ~120MB CARs
      const carReader = await CarReader.fromIterable(
        await randomCar(targetSize)
      )

      const roots = await carReader.getRoots()
      const expectedCid = roots[0]?.toString()

      const cid = await client.storeCar(carReader, {
        onStoredChunk: () => {
          uploadedChunks++
        },
      })
      assert.ok(uploadedChunks >= 12)
      assert.equal(cid, expectedCid)
    })

    it('upload CAR with non-default decoder', async () => {
      const client = new NFTStorage({ token, endpoint })
      const block = await encode({
        value: { hello: 'world' },
        codec: dagJson,
        hasher: sha256,
      })
      const { writer, out } = CarWriter.create([block.cid])
      writer.put(block)
      writer.close()
      const reader = await CarReader.fromIterable(out)
      const cid = await client.storeCar(reader, { decoders: [dagJson] })
      assert.equal(cid, block.cid.toString(), 'returned cid matches the CAR')
    })

    it('handles server error', async () => {
      const client = new NFTStorage({ token, endpoint })
      const bytes = new TextEncoder().encode('throw an error')
      const hash = await sha256.digest(bytes)
      const cid = CID.create(1, raw.code, hash)
      const carReader = new CarReader(1, [cid], [{ cid, bytes }])

      try {
        await client.storeCar(carReader, { maxRetries: 0 })
        assert.unreachable('should have thrown')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof Error)
        assert.is(error.message, 'throwing an error for tests')
      }
    })

    it('aborts', async () => {
      const client = new NFTStorage({ token, endpoint })
      const bytes = new TextEncoder().encode('data')
      const hash = await sha256.digest(bytes)
      const cid = CID.create(1, raw.code, hash)
      const carReader = new CarReader(1, [cid], [{ cid, bytes }])
      const controller = new AbortController()
      controller.abort()
      try {
        await client.storeCar(carReader, { signal: controller.signal })
        assert.unreachable('request should not have succeeded')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.equal(error.name, 'AbortError')
      }
    })
  })

  describe('upload dir', () => {
    it('upload a file', async () => {
      const client = new NFTStorage({ token, endpoint })
      const cid = await client.storeDirectory([
        new File(['hello world'], 'hello.txt'),
      ])

      assert.equal(
        cid,
        'bafybeic6svhkwl3y2wvkj33weshyjjs5cbvgijh7yo3kjasyglrdwe2l74'
      )
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

      assert.equal(
        cid,
        'bafybeigkms36pnnjsa7t2mq2g4mx77s4no2hilirs4wqx3eebbffy2ay3a'
      )
    })

    it('upload multiple files as asyncIterable', async () => {
      const client = new NFTStorage({ token, endpoint })
      const cid = await client.storeDirectory(
        toAsyncIterable([
          new File(['hello world'], 'hello.txt'),
          new File(
            [JSON.stringify({ from: 'incognito' }, null, 2)],
            'metadata.json'
          ),
        ])
      )

      assert.equal(
        cid,
        'bafybeigkms36pnnjsa7t2mq2g4mx77s4no2hilirs4wqx3eebbffy2ay3a'
      )
    })

    it('upload multiple FileObject from files-from-path as asyncIterable', async () => {
      const client = new NFTStorage({ token, endpoint })
      const file1Buffer = new TextEncoder().encode('hello world')
      const file2Buffer = new TextEncoder().encode(
        JSON.stringify({ from: 'incognito' }, null, 2)
      )
      const cid = await client.storeDirectory(
        toAsyncIterable([
          {
            name: 'hello.txt',
            size: file1Buffer.length,
            stream: async function* () {
              yield file1Buffer
            },
          },
          {
            name: 'metadata.json',
            size: file2Buffer.length,
            stream: async function* () {
              yield file2Buffer
            },
          },
        ])
      )

      assert.equal(
        cid,
        'bafybeigkms36pnnjsa7t2mq2g4mx77s4no2hilirs4wqx3eebbffy2ay3a'
      )
    })
    it('upload empty files', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        await client.storeDirectory([new File([], 'empty.txt')])
        assert.unreachable('should fail if no content is provided')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof Error)
        assert.match(error.message, /provide some content/i)
      }
    })

    it('upload nothing', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        await client.storeDirectory([])
        assert.unreachable('should fail if no content is provided')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof Error)
        assert.match(error.message, /provide some content/i)
      }
    })

    it('upload empty files', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        await client.storeDirectory([new File([], 'empty.txt')])
        assert.unreachable('should fail if no content is provided')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof Error)
        assert.match(error.message, /provide some content/i)
      }
    })

    it('errors without token', async () => {
      // @ts-expect-error - expects token option
      const client = new NFTStorage({ endpoint })
      try {
        await client.storeDirectory([new File(['file'], 'file.txt')])
        assert.unreachable('should have thrown')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.is(error.message, 'missing token')
      }
    })

    it('errors with invalid token', async () => {
      const client = new NFTStorage({ token: 'wrong', endpoint })
      try {
        await client.storeDirectory([new File(['wrong token'], 'foo.txt')])
        assert.unreachable('should have failed')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof Error)
        assert.match(error.message, /Unauthorized/)
      }
    })

    it('aborts', async () => {
      const client = new NFTStorage({ token, endpoint })
      const controller = new AbortController()
      controller.abort()
      try {
        await client.storeDirectory([new File(['data'], 'foo.txt')], {
          signal: controller.signal,
        })
        assert.unreachable('request should not have succeeded')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.equal(error.name, 'AbortError')
      }
    })
  })

  describe('store', async () => {
    it('requires name', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        // @ts-expect-error
        await client.store({})
        assert.unreachable('should have failed')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof TypeError)
        assert.match(
          error.message,
          /string property `name` identifying the asset is required/
        )
      }
    })

    it('requires description', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        // @ts-expect-error
        await client.store({ name: 'name' })
        assert.unreachable('should have failed')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof TypeError)
        assert.match(
          error.message,
          /string property `description` describing asset is required/
        )
      }
    })

    it('requires image', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        // @ts-expect-error
        await client.store({ name: 'name', description: 'stuff' })
        assert.unreachable('should have failed')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof TypeError)
        assert.match(error.message, /property `image` must be a Blob or File/)
      }
    })

    it('requires image mime type', async () => {
      const warn = console.warn
      try {
        let warnings = ['']
        console.warn = (msg) => {
          warnings.push(msg)
        }

        const client = new NFTStorage({ token, endpoint })
        const result = await client.store({
          name: 'name',
          description: 'stuff',
          image: new Blob(['bla bla']),
        })

        assert.ok(typeof result.url === 'string')
        assert.ok(new URL(result.url).protocol, 'ipfs:')

        assert.ok(typeof result.ipnft === 'string')
        assert.equal(CID.parse(result.ipnft).version, 1)

        assert.equal(result.data.name, 'name')
        assert.equal(result.data.description, 'stuff')
        assert.ok(result.data.image instanceof URL)
        assert.ok(result.data.image.protocol, 'ipfs:')

        assert.ok(
          warnings.join('\n').includes("'image' must have 'image/*' mime type")
        )
      } finally {
        console.warn = warn
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
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof TypeError)
        assert.match(
          error.message,
          /property `decimals` must be an integer value/
        )
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
        assert.unreachable('should have failed')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof Error)
        assert.match(error.message, /Unauthorized/)
      }
    })

    it('uploads image', async () => {
      const client = new NFTStorage({ token, endpoint })
      const result = await client.store({
        name: 'name',
        description: 'stuff',
        image: new Blob(['fake image'], { type: 'image/png' }),
      })

      assert.equal(
        result.ipnft,
        'bafyreib75ot3oyo43f7rhdk6xlv7c4mmjwhbjjnugrw3yqjvarpvtzxkoi'
      )

      assert.equal(
        result.url,
        'ipfs://bafyreib75ot3oyo43f7rhdk6xlv7c4mmjwhbjjnugrw3yqjvarpvtzxkoi/metadata.json'
      )

      assert.equal(result.data.name, 'name')
      assert.equal(result.data.description, 'stuff')
      assert.ok(result.data.image instanceof URL)
      assert.ok(
        result.data.image.href,
        '"ipfs://bafybeierifjwnazodizfrpyfrnr6qept7dlppv6fjas24w2wcri2osmrre/blob'
      )

      const embed = result.embed()
      assert.equal(embed.name, 'name')
      assert.equal(embed.description, 'stuff')
      assert.ok(embed.image instanceof URL)
      assert.ok(embed.image.protocol, 'https:')
    })

    it('store with properties', async () => {
      const client = new NFTStorage({ token, endpoint })
      const trick =
        'ipfs://bafyreiemweb3jxougg7vaovg7wyiohwqszmgwry5xwitw3heepucg6vyd4'
      const result = await client.store({
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
      })

      assert.ok(result instanceof Token.Token)

      const cid = CID.parse(result.ipnft)
      assert.equal(cid.version, 1)

      assert.ok(typeof result.url === 'string')
      assert.ok(result.url.startsWith('ipfs:'))

      assert.equal(result.data.name, 'name')
      assert.equal(result.data.description, 'stuff')
      assert.ok(result.data.image instanceof URL)
      assert.ok(result.data.image.protocol, 'ipfs:')

      assert.equal(result.data.properties.extra, 'meta')
      assert.equal(result.data.properties.trick, trick)
      assert.ok(Array.isArray(result.data.properties.src))
      assert.equal(result.data.properties.src.length, 2)

      const [h, b] = /** @type {[URL, URL]} */ (result.data.properties.src)
      assert.ok(h instanceof URL)
      assert.equal(h.protocol, 'ipfs:')

      assert.ok(b instanceof URL)
      assert.equal(b.protocol, 'ipfs:')

      const embed = result.embed()

      assert.equal(embed.name, 'name')
      assert.equal(embed.description, 'stuff')
      assert.ok(embed.image instanceof URL)
      assert.ok(embed.image.protocol, 'https:')
      assert.ok(embed.image.host, GATEWAY_LINK)

      assert.equal(embed.properties.extra, 'meta')
      assert.ok(Array.isArray(embed.properties.src))
      assert.equal(embed.properties.src.length, 2)

      const [h2, b2] = /** @type {[URL, URL]} */ (embed.properties.src)
      assert.ok(h2 instanceof URL)
      assert.equal(h2.protocol, 'https:')
      assert.equal(h2.host, GATEWAY_LINK)

      assert.ok(b2 instanceof URL)
      assert.equal(b2.protocol, 'https:')
      assert.equal(b2.host, GATEWAY_LINK)
    })

    it('store with OpenSea extensions', async () => {
      const client = new NFTStorage({ token, endpoint })
      const result = await client.store({
        name: 'name',
        description: 'stuff',
        image: new File(['fake image'], 'cat.png', { type: 'image/png' }),
        animation_url: new File(['fake vid'], 'vid.mp4', { type: 'video/mp4' }),
        background_color: 'ffffff',
        youtube_url: 'https://youtu.be/dQw4w9WgXcQ',
        attributes: [
          { trait_type: 'Aqua Power', display_type: 'boost_number' },
        ],
      })

      assert.ok(result instanceof Token.Token)

      const cid = CID.parse(result.ipnft)
      assert.equal(cid.version, 1)

      assert.ok(typeof result.url === 'string')
      assert.ok(result.url.startsWith('ipfs:'))

      assert.equal(result.data.name, 'name')
      assert.equal(result.data.description, 'stuff')
      assert.equal(result.data.background_color, 'ffffff')
      assert.equal(result.data.youtube_url, 'https://youtu.be/dQw4w9WgXcQ')
      assert.equal(result.data.attributes, [
        {
          trait_type: 'Aqua Power',
          display_type: 'boost_number',
        },
      ])
      assert.ok(result.data.image instanceof URL)
      assert.ok(result.data.image.protocol, 'ipfs:')
      assert.ok(result.data.animation_url instanceof URL)
      assert.ok(result.data.animation_url.protocol, 'ipfs:')
    })

    it('aborts', async () => {
      const client = new NFTStorage({ token, endpoint })
      const controller = new AbortController()
      controller.abort()
      try {
        await client.store(
          {
            name: 'name',
            description: 'stuff',
            image: new File(['fake image'], 'cat.png', { type: 'image/png' }),
          },
          { signal: controller.signal }
        )
        assert.unreachable('request should not have succeeded')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.equal(error.name, 'AbortError')
      }
    })
  })

  describe('status', () => {
    const client = new NFTStorage({ token, endpoint })

    /** @type {string[]} */
    let preloaded
    beforeEach(async () => {
      preloaded = [
        // bafkreihujckc4hvdm5qjss3wvyh2zmbxmbdhqh67dsrfezu3d6yvx36u4i
        await client.storeBlob(new Blob(['preload status'])),
        // bafkreih7uy2yhx5gobvypuuexbvq22j2cypeqqfk2lc46225e7b3syq7pu
        // await client.storeBlob(new Blob(['missing'])),
      ]
    })

    afterEach(async () => {
      await Promise.all(preloaded.map((cid) => client.delete(cid)))
    })

    it('found', async () => {
      const cid = 'bafkreihujckc4hvdm5qjss3wvyh2zmbxmbdhqh67dsrfezu3d6yvx36u4i'
      const status = await client.status(cid)
      assert.equal(status.cid, cid)
    })

    it('not found', async () => {
      const cid = 'bafkreih7uy2yhx5gobvypuuexbvq22j2cypeqqfk2lc46225e7b3syq7pu'
      try {
        await client.status(cid)
        assert.unreachable('Expected to fail')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error.message.match(/not found/))
      }
    })

    it('errors without token', async () => {
      // @ts-expect-error - token option is expected
      const client = new NFTStorage({ endpoint })
      try {
        await client.status(
          'bafkreihujckc4hvdm5qjss3wvyh2zmbxmbdhqh67dsrfezu3d6yvx36u4i'
        )
        assert.unreachable('should have thrown')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.is(error.message, 'missing token')
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

    it('aborts', async () => {
      const client = new NFTStorage({ token, endpoint })
      const controller = new AbortController()
      controller.abort()
      const cid = 'bafyreigdcnuc6w7stviim6a5m7uwqdw6p3z5zrqr22xt3num3ozra4ciqi'
      try {
        await client.status(cid, { signal: controller.signal })
        assert.unreachable('request should not have succeeded')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.equal(error.name, 'AbortError')
      }
    })
  })

  describe('delete', () => {
    it('ok to delete unknown', async () => {
      const client = new NFTStorage({ token, endpoint })
      const cid = 'zdj7Wn9FQAURCP6MbwcWuzi7u65kAsXCdjNTkhbJcoaXBusq9'
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
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error.message.includes('not found'))
      }
    })

    it('invalid cid errors', async () => {
      const client = new NFTStorage({ token, endpoint })
      try {
        await client.delete('foo')
        assert.unreachable('invalid cid')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error instanceof Error)
        assert.match(error.message, /parse non base32/)
      }
    })

    it('errors without token', async () => {
      // @ts-expect-error - expects token option
      const client = new NFTStorage({ endpoint })
      try {
        const cid = await NFTStorage.storeBlob(
          { token, endpoint },
          new Blob(['deleteme'])
        )
        await client.delete(cid)
        assert.unreachable('should have thrown')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.is(error.message, 'missing token')
      }
    })

    it('aborts', async () => {
      const client = new NFTStorage({ token, endpoint })
      const controller = new AbortController()
      controller.abort()
      const cid = 'bafyreigdcnuc6w7stviim6a5m7uwqdw6p3z5zrqr22xt3num3ozra4ciqi'
      try {
        await client.delete(cid, { signal: controller.signal })
        assert.unreachable('request should not have succeeded')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.equal(error.name, 'AbortError')
      }
    })
  })

  describe('check', () => {
    const client = new NFTStorage({ token, endpoint })

    /** @type {string[]} */
    let preloaded
    beforeEach(async () => {
      preloaded = [
        // bafkreicddgzlcazqnp7ll4ecv7qaddbjstepmd2pwizf7r7ha2eaf7fkry
        await client.storeBlob(new Blob(['preload check'])),
        // bafkreih7uy2yhx5gobvypuuexbvq22j2cypeqqfk2lc46225e7b3syq7pu
        // await client.storeBlob(new Blob(['missing']))
      ]
    })

    afterEach(async () => {
      await Promise.all(preloaded.map((cid) => client.delete(cid)))
    })

    it('found', async () => {
      const cid = 'bafkreicddgzlcazqnp7ll4ecv7qaddbjstepmd2pwizf7r7ha2eaf7fkry'
      const status = await client.check(cid)
      assert.equal(status.cid, cid)
    })

    it('not found', async () => {
      const cid = 'bafkreih7uy2yhx5gobvypuuexbvq22j2cypeqqfk2lc46225e7b3syq7pu'
      try {
        await client.check(cid)
        assert.unreachable('Expected to fail')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.ok(error.message.match(/not found/))
      }
    })

    it('aborts', async () => {
      const client = new NFTStorage({ token, endpoint })
      const controller = new AbortController()
      controller.abort()
      const cid = 'bafyreigdcnuc6w7stviim6a5m7uwqdw6p3z5zrqr22xt3num3ozra4ciqi'
      try {
        await client.check(cid, { signal: controller.signal })
        assert.unreachable('request should not have succeeded')
      } catch (err) {
        const error = /** @type {Error} */ (err)
        assert.equal(error.name, 'AbortError')
      }
    })
  })

  describe('static encodeDirectory', () => {
    it('can encode multiple FileObject as iterable', async () => {
      const files = [
        new File(['hello world'], 'hello.txt'),
        new File(
          [JSON.stringify({ from: 'incognito' }, null, 2)],
          'metadata.json'
        ),
      ]
      const { cid } = await NFTStorage.encodeDirectory(files)
      assert.equal(
        cid.toString(),
        'bafybeigkms36pnnjsa7t2mq2g4mx77s4no2hilirs4wqx3eebbffy2ay3a'
      )
    })
  })
})
