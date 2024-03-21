import test from 'ava'
import { CID } from 'multiformats/cid'
import * as Block from 'multiformats/block'
import { sha256, sha512 } from 'multiformats/hashes/sha2'
import * as pb from '@ipld/dag-pb'
import { CarWriter } from '@ipld/car'
import { packToBlob } from 'ipfs-car/pack/blob'
import { MultihashIndexSortedReader } from 'cardex'
import { TreewalkCarSplitter } from 'carbites/treewalk'
import { equals as uint8ArrayEquals } from 'uint8arrays/equals'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import { createClientWithUser, getRawClient } from './scripts/helpers.js'
import { createCar } from './scripts/car.js'
import { build } from 'ucan-storage/ucan-storage'
import { KeyPair } from 'ucan-storage/keypair'
import {
  getMiniflareContext,
  getTestServiceConfig,
  setupMiniflareContext,
  getMiniflareFetchMock,
} from './scripts/test-context.js'
import { File } from 'nft.storage/src/platform.js'
import crypto from 'node:crypto'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { FormData } from 'undici'
import { createCarCid } from '../src/utils/car.js'
import { createServer } from 'node:http'
import { ed25519 } from '@ucanto/principal'
import { delegate } from '@ucanto/core'
import { encodeDelegationAsCid } from '../src/utils/w3up.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const nftStorageSpace = ed25519.generate()
const nftStorageApiPrincipal = ed25519.generate()
const mockW3up = createListeningMockW3up()

test.before(async (t) => {
  const linkdexUrl = 'http://fake.api.net'
  await setupMiniflareContext(t, {
    overrides: {
      LINKDEX_URL: linkdexUrl,
      W3UP_URL: (await mockW3up).url.toString(),
      W3_NFTSTORAGE_SPACE: (await nftStorageSpace).did(),
      W3_NFTSTORAGE_PRINCIPAL: (await nftStorageApiPrincipal).did(),
      W3_NFTSTORAGE_PROOF: (
        await encodeDelegationAsCid(
          await delegate({
            issuer: await nftStorageSpace,
            audience: await nftStorageApiPrincipal,
            capabilities: [
              { can: 'store/add', with: (await nftStorageSpace).did() },
              { can: 'upload/add', with: (await nftStorageSpace).did() },
            ],
          })
        )
      ).toString(),
    },
  })
})

test.after(async (t) => {
  ;(await mockW3up).close()
})

test.serial('should upload a single file', async (t) => {
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)

  const file = new Blob(['hello world!'], { type: 'application/text' })
  // expected CID for the above data
  const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: file,
  })
  const { ok, value } = await res.json()
  t.truthy(ok, 'Server response payload has `ok` property')
  t.is(value.cid, cid, 'Server responded with expected CID')
  t.is(value.type, 'application/text', 'type should match blob mime-type')

  const { data } = await getRawClient(config)
    .from('upload')
    .select('*')
    .match({ source_cid: cid, user_id: client.userId })
    .single()

  // @ts-ignore
  t.is(data.source_cid, cid)
  t.is(data.deleted_at, null)
})

test.serial('should forward uploads to W3UP_URL', async (t) => {
  const initialW3upRequestCount = (await mockW3up).requestCount
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const file = new Blob(['hello world!'], { type: 'application/text' })
  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: file,
  })
  const { ok, value } = await res.json()
  t.truthy(ok, 'Server response payload has `ok` property')
  const finalW3upRequestCount = (await mockW3up).requestCount
  const w3upRequestCountDelta = finalW3upRequestCount - initialW3upRequestCount
  t.is(w3upRequestCountDelta, 1, 'this upload sent one http request to w3up')
})

test.serial('should upload multiple blobs', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const body = new FormData()

  const file1 = new Blob(['hello world! 1'])
  const file2 = new Blob(['hello world! 2'])
  body.append('file', file1, 'name1')
  body.append('file', file2, 'name2')
  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${client.token}`,
    },
    // @ts-ignore minor type mismatch between miniflare fetch and node-fetch
    body,
  })
  t.truthy(res, 'Server responded')
  t.true(res.ok, 'Server response ok')
  const { ok, value } = await res.json()
  t.deepEqual(value.files, [
    { name: 'name1', type: 'application/octet-stream' },
    { name: 'name2', type: 'application/octet-stream' },
  ])
  t.is(value.type, 'directory', 'should be directory')
  t.is(value.size, 130, 'should have correct size')
  t.is(
    value.cid,
    'bafybeifrkxqq5bbn4fkykfyggoltlb7vn3moyhr3pldzx3me6yiukcfsem',
    'Server responded with expected CID'
  )
})

test.serial('should fail to upload files without Content-Type', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const body = new FormData()
  const file = 'hello world! 1'
  body.append('file', file)
  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    // @ts-ignore FormData type mismatch
    body,
  })
  t.truthy(res, 'Server responded')
  t.is(res.status, 400, 'Server responded with HTTP 400 status')
  const { error } = await res.json()
  t.is(error.message, 'missing Content-Type in multipart part')
})

// FIXME: this should fail because two files in the same directory should not
// occupy the same name. https://github.com/ipfs/js-ipfs-unixfs/issues/232
test.serial('should upload multiple blobs without name', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const body = new FormData()

  const file1 = new Blob(['hello world! 1'])
  const file2 = new Blob(['hello world! 2'])
  body.append('file', file1)
  body.append('file', file2)
  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    // @ts-ignore FormData type mismatch
    body,
  })
  t.truthy(res, 'Server responded')
  t.true(res.ok, 'Server response ok')
  const { ok, value } = await res.json()
  t.deepEqual(value.files, [
    { name: 'blob', type: 'application/octet-stream' },
    { name: 'blob', type: 'application/octet-stream' },
  ])
  t.is(value.type, 'directory', 'should be directory')
  t.is(value.size, 66, 'should have correct size')
  t.is(
    value.cid,
    'bafybeiaowg4ssqzemwgdlisgphib54clq62arief7ssabov5r3pbfh7vje',
    'Server responded with expected CID'
  )
})

test.serial('should upload multiple files with name', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const body = new FormData()

  const file1 = new Blob(['hello world! 1'])
  const file2 = new Blob(['hello world! 2'])
  body.append('file', new File([file1], 'name1.png'))
  body.append('file', new File([file2], 'name2.png'))
  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    // @ts-ignore FormData type mismatch
    body,
  })
  t.truthy(res, 'Server responded')
  t.true(res.ok, 'Server response ok')
  const { ok, value } = await res.json()
  t.deepEqual(value.files, [
    { name: 'name1.png', type: 'application/octet-stream' },
    { name: 'name2.png', type: 'application/octet-stream' },
  ])
  t.is(value.type, 'directory', 'should be directory')
  t.is(value.size, 138, 'should have correct size')
  t.is(
    value.cid,
    'bafybeieoib3k2cy2x7nlmsfpid3fhnhlewib7ekatui4i27qfio6vutmzm',
    'Server responded with expected CID'
  )
})

test.serial('should upload a single CAR file', async (t) => {
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)

  const { root, car } = await createCar('hello world car')
  // expected CID for the above data
  const cid = 'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
  t.is(root.toString(), cid, 'car file has correct root')
  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${client.token}`,
      'Content-Type': 'application/car',
    },
    body: car,
  })

  t.truthy(res, 'Server responded')
  t.true(res.ok, 'Server response ok')
  const { ok, value } = await res.json()
  t.truthy(ok, 'Server response payload has `ok` property')
  t.is(value.cid, cid, 'Server responded with expected CID')
  t.is(value.type, 'application/car', 'type should match blob mime-type')

  const { data } = await getRawClient(config)
    .from('upload')
    .select('*, content(*)')
    .match({ source_cid: cid, user_id: client.userId })
    .single()

  // @ts-ignore
  t.is(data.source_cid, cid)
  t.is(data.deleted_at, null)
  t.is(data.content.dag_size, 15, 'correct dag size')
})

test.serial(
  'should check dag completness with linkdex-api for partial CAR',
  async (t) => {
    const client = await createClientWithUser(t)
    const config = getTestServiceConfig(t)
    const mf = getMiniflareContext(t)

    const leaf1 = await Block.encode({
      value: pb.prepare({ Data: 'leaf1' }),
      codec: pb,
      hasher: sha256,
    })
    const leaf2 = await Block.encode({
      value: pb.prepare({ Data: 'leaf2' }),
      codec: pb,
      hasher: sha256,
    })
    const parent = await Block.encode({
      value: pb.prepare({ Links: [leaf1.cid, leaf2.cid] }),
      codec: pb,
      hasher: sha256,
    })
    const cid = parent.cid.toString()
    const { writer, out } = CarWriter.create(parent.cid)
    writer.put(parent)
    writer.put(leaf1)
    // leave out leaf2 to make patial car
    writer.close()
    const carBytes = []
    for await (const chunk of out) {
      carBytes.push(chunk)
    }
    const body = new Blob(carBytes)

    if (!config.LINKDEX_URL) {
      throw new Error('LINDEX_URL should be set in test config')
    }

    const linkdexMock = getLinkdexMock(t)
    mockLinkdexResponse(linkdexMock, 'Complete')

    const res = await mf.dispatchFetch('http://miniflare.test/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${client.token}`,
        'Content-Type': 'application/car',
      },
      body,
    })

    t.truthy(res, 'Server responded')
    t.true(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    t.truthy(ok, 'Server response payload has `ok` property')
    t.is(value.cid, cid, 'Server responded with expected CID')
    t.is(value.type, 'application/car', 'type should match blob mime-type')

    const db = getRawClient(config)

    const { data: upload } = await db
      .from('upload')
      .select('*')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    // @ts-ignore
    t.is(upload.source_cid, cid)
    t.is(upload.deleted_at, null)

    // wait for the call to mock linkdex-api to complete
    await res.waitUntil()
    const { data: pin } = await db
      .from('pin')
      .select('*')
      .match({ content_cid: cid, service: 'ElasticIpfs' })
      .single()

    t.is(
      pin.status,
      'Pinned',
      "Status should be pinned when linkdex-api returns 'Complete'"
    )
    t.is(pin.service, 'ElasticIpfs')
    t.is(pin.status, 'Pinned')
  }
)

test.serial('should allow a CAR with unsupported hash function', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const bytes = pb.encode({ Data: new Uint8Array(), Links: [] })
  // we dont support sha512 yet!
  const hash = await sha512.digest(bytes)
  const cid = CID.create(1, pb.code, hash)

  const { writer, out } = CarWriter.create([cid])
  writer.put({ cid, bytes })
  writer.close()

  const carBytes = []
  for await (const chunk of out) {
    carBytes.push(chunk)
  }

  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${client.token}`,
      'Content-Type': 'application/car',
    },
    body: new Blob(carBytes, { type: 'application/car' }),
  })

  t.truthy(res, 'Server responded')
  t.truthy(res.ok, 'Server response ok')
  const { ok, value } = await res.json()
  t.truthy(ok, 'Server response payload has `ok` property')
  t.is(value.cid, cid.toString(), 'Server responded with expected CID')
  t.is(value.type, 'application/car', 'type should match blob mime-type')
})

test.serial(
  'should throw for CAR with a block where the bytes do not match the CID',
  async (t) => {
    const client = await createClientWithUser(t)
    const mf = getMiniflareContext(t)
    const bytes = pb.encode({ Data: new Uint8Array(), Links: [] })
    const hash = await sha256.digest(bytes)
    const cid = CID.create(1, pb.code, hash)

    const { writer, out } = CarWriter.create([cid])
    bytes[bytes.length - 1] = bytes[bytes.length - 1] + 1 // mangle a byte
    writer.put({ cid, bytes })
    writer.close()

    const carBytes = []
    for await (const chunk of out) {
      carBytes.push(chunk)
    }

    const res = await mf.dispatchFetch('http://miniflare.test/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${client.token}`,
        'Content-Type': 'application/car',
      },
      body: new Blob(carBytes),
    })

    t.truthy(res, 'Server responded')
    t.is(res.ok, false)
    const { error } = await res.json()
    t.is(
      error.code,
      'ERROR_INVALID_CAR',
      'Server responded with an INVALID_CAR Error'
    )
  }
)

test.serial('should re-upload same data and update mime-type', async (t) => {
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  const file = new Blob(['hello world!'], { type: 'application/text' })
  // expected CID for the above data
  const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
  const res1 = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: file,
  })
  const data1 = await res1.json()
  t.is(data1.value.cid, cid)
  t.is(data1.value.type, 'application/text', 'text')

  const { root, car } = await createCar('hello world!')
  const res2 = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${client.token}`,
      'Content-Type': 'application/car',
    },
    body: car,
  })
  const data2 = await res2.json()
  t.is(data2.value.cid, cid)
  t.is(data2.value.type, 'application/car', 'car')

  const { data } = await getRawClient(config)
    .from('upload')
    .select('*')
    .match({ source_cid: cid, user_id: client.userId })
    .single()

  t.is(data.type, 'Car', 'type should be Car at the end.')
})

test.serial(
  'should re-upload nft turning a deleted nft into an active nft again',
  async (t) => {
    const client = await createClientWithUser(t)
    const config = getTestServiceConfig(t)
    const mf = getMiniflareContext(t)
    const file = new Blob(['hello world!'])
    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    const res = await mf.dispatchFetch('http://miniflare.test/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: file,
    })
    const { ok, value } = await res.json()

    const deleted = await client.client.deleteUpload(cid, client.userId)
    t.not(deleted?.deleted_at, null)

    const testTs = Date.now()
    const reup = await mf.dispatchFetch('http://miniflare.test/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: file,
    })
    const reupRsp = await reup.json()
    t.truthy(reupRsp.ok)

    const { data } = await getRawClient(config)
      .from('upload')
      .select('*')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    t.is(data.deleted_at, null, 'its active again')
    t.true(
      new Date(data.updated_at).valueOf() > testTs,
      'updated_at should be bigger than a date before re-upload request'
    )
  }
)

test.serial('should upload to elastic ipfs', async (t) => {
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  const file = new Blob(['should upload to cluster 2'], {
    type: 'application/text',
  })
  // expected CID for the above data
  const cid = 'bafkreicoihdprzusqwmabenu7tsec7xffsaqbdpw4f3eputfcornkiytva'
  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: file,
  })
  const { ok } = await res.json()
  t.truthy(ok, 'upload created')
  const { data } = await getRawClient(config)
    .from('upload')
    .select('*,content(dag_size, pin(status, service, inserted_at))')
    .match({ source_cid: cid, user_id: client.userId })
    .filter(
      'content.pin.service',
      'in',
      '(IpfsCluster,IpfsCluster2,IpfsCluster3,ElasticIpfs)'
    )
    .single()

  t.is(data.content.pin[0].service, 'ElasticIpfs')
})

test.serial('should create S3 & R2 backups', async (t) => {
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  const { root, car } = await packToBlob({
    input: [{ path: 'test.txt', content: 'S3 backup' }],
  })

  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: car,
  })

  const { value } = await res.json()
  t.is(root.toString(), value.cid)

  const upload = await client.client.getUpload(value.cid, client.userId)
  t.truthy(upload)
  t.truthy(upload?.backup_urls)
  const backup_urls = upload?.backup_urls || []

  // construct the expected backup URL
  const carBuf = await car.arrayBuffer()
  const carHash = await getHash(new Uint8Array(carBuf))
  const carCid = await getCarCid(new Uint8Array(carBuf))

  t.is(
    backup_urls[0],
    expectedS3BackupUrl(config, root, client.userId, carHash)
  )
  t.is(backup_urls[1], expectedR2BackupUrl(config, carCid))
})

test.serial(
  'should backup chunked uploads, preserving backup_urls for each chunk',
  async (t) => {
    t.timeout(10_000)
    const client = await createClientWithUser(t)
    const config = getTestServiceConfig(t)
    const mf = getMiniflareContext(t)
    const chunkSize = 1024
    const nChunks = 5

    const files = []
    for (let i = 0; i < nChunks; i++) {
      files.push({
        path: `/dir/file-${i}.bin`,
        content: getRandomBytes(chunkSize),
      })
    }

    const { root, car } = await packToBlob({
      input: files,
      maxChunkSize: chunkSize,
    })
    const splitter = await TreewalkCarSplitter.fromBlob(car, chunkSize)
    const linkdexMock = getLinkdexMock(t)
    // respond with 'Partial' 5 times, then 'Complete' once.
    mockLinkdexResponse(linkdexMock, 'Partial', 5)
    mockLinkdexResponse(linkdexMock, 'Complete', 1)

    const backupUrls = []
    for await (const chunk of splitter.cars()) {
      const carParts = []
      for await (const part of chunk) {
        carParts.push(part)
      }
      const carFile = new Blob(carParts, { type: 'application/car' })
      const res = await mf.dispatchFetch('http://miniflare.test/upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${client.token}` },
        body: carFile,
      })

      const { value } = await res.json()
      t.is(root.toString(), value.cid)
      const carCid = await getCarCid(
        new Uint8Array(await carFile.arrayBuffer())
      )
      const carHash = await getHash(new Uint8Array(await carFile.arrayBuffer()))
      backupUrls.push(expectedS3BackupUrl(config, root, client.userId, carHash))
      backupUrls.push(expectedR2BackupUrl(config, carCid))
    }

    const upload = await client.client.getUpload(root.toString(), client.userId)
    t.truthy(upload)
    t.truthy(upload?.backup_urls)
    const backup_urls = upload?.backup_urls || []
    t.truthy(backup_urls.length >= nChunks) // using >= to account for CAR / UnixFS overhead
    t.is(
      backup_urls.length,
      backupUrls.length,
      `expected ${backupUrls.length} backup urls, got: ${backup_urls.length}`
    )

    /** @type string[] */
    // @ts-expect-error upload.backup_urls has type unknown[], but it's really string[]
    const resultUrls = upload.backup_urls
    for (const url of resultUrls) {
      t.true(
        backupUrls.includes(url),
        `upload is missing expected backup url ${url}`
      )
    }
  }
)

test.serial('should upload a single file using ucan', async (t) => {
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  const kp = await KeyPair.create()
  // Register DID
  await mf.dispatchFetch(`http://miniflare.test/user/did`, {
    headers: { Authorization: `Bearer ${client.token}` },
    method: 'POST',
    body: JSON.stringify({
      did: kp.did(),
    }),
  })

  // Get root UCAN
  const ucanRsp = await mf.dispatchFetch(`http://miniflare.test/ucan/token`, {
    headers: { Authorization: `Bearer ${client.token}` },
    method: 'POST',
  })
  const { value: rootUcan } = await ucanRsp.json()

  // Get service DID
  const didRsp = await mf.dispatchFetch(`http://miniflare.test/did`)
  const { value: serviceDID } = await didRsp.json()

  // Signed new ucan with service as audience
  const opUcan = await build({
    audience: serviceDID,
    issuer: kp,
    lifetimeInSeconds: 1000,
    capabilities: [
      {
        with: `storage://${kp.did()}/public`,
        can: 'upload/IMPORT',
        mh: '',
      },
    ],
    proofs: [rootUcan],
  })

  const file = new Blob(['hello world!'], { type: 'application/text' })
  // expected CID for the above data
  const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'

  {
    const res = await mf.dispatchFetch('http://miniflare.test/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${opUcan}` },
      body: file,
    })

    t.is(res.status, 401)
    const { ok, error } = await res.json()
    t.false(ok)
    t.truthy(error.message.match(/x-agent-did/))
  }

  {
    const badkp = await KeyPair.create()
    const res = await mf.dispatchFetch('http://miniflare.test/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${opUcan}`,
        'x-agent-did': badkp.did(),
      },
      body: file,
    })

    t.is(res.status, 401)
    const { ok, error } = await res.json()
    t.false(ok)
    t.truthy(error.message.match(/Expected x-agent-did to be UCAN issuer DID/))
  }

  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${opUcan}`, 'x-agent-did': kp.did() },
    body: file,
  })

  const { ok, value } = await res.json()
  t.truthy(ok, 'Server response payload has `ok` property')

  const { data } = await getRawClient(config)
    .from('upload')
    .select('*')
    .match({ source_cid: cid, user_id: client.userId })
    .single()

  // @ts-ignore
  t.is(data.meta.ucan.token, opUcan)
})

test.serial('should update a single file', async (t) => {
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  const file = new Blob(['hello world!'], { type: 'application/text' })
  // expected CID for the above data
  const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'

  await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: { Authorization: `Bearer ${client.token}` },
    body: file,
  })

  const { data } = await getRawClient(config)
    .from('upload')
    .select('*')
    .match({ content_cid: cid, user_id: client.userId })
    .single()

  // update file we just created above

  const name = 'test updated name'

  const uploadRes = await mf.dispatchFetch(
    `http://localhost:8787/upload/${data.content_cid}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${client.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    }
  )

  const { ok: uploadOk, value: uploadValue } = await uploadRes.json()
  t.truthy(
    uploadOk,
    'Server response payload has `ok` property for upload endpoint'
  )
  t.is(uploadValue.cid, data.cid, 'Server responded with expected CID')
  t.is(uploadValue.name, name, 'type should match blob mime-type')

  const { data: uploadData } = await getRawClient(config)
    .from('upload')
    .select('*')
    .match({ id: data.id })
    .single()

  // @ts-ignore
  t.is(uploadData.name, name)
})

test.serial('should write satnav index', async (t) => {
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  const { root, car: carBody } = await createCar('satnav')
  const carBytes = new Uint8Array(await carBody.arrayBuffer())
  const carCid = await createCarCid(carBytes)

  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${client.token}`,
      'Content-Type': 'application/car',
    },
    body: carBody,
  })

  const { ok, value } = await res.json()
  t.truthy(ok, 'Server response payload has `ok` property')
  t.is(value.cid, root.toString(), 'Server responded with expected CID')
  t.is(value.type, 'application/car', 'type should match car mime-type')

  const r2Bucket = await mf.getR2Bucket('SATNAV')
  const r2Object = await r2Bucket.get(`${carCid}/${carCid}.car.idx`)
  if (!r2Object?.body) {
    t.fail('repsonse stream must exist')
  }
  // @ts-expect-error
  const reader = MultihashIndexSortedReader.fromIterable(r2Object?.body)
  const entries = []
  for await (const entry of reader.entries()) {
    entries.push(entry)
  }

  t.is(entries.length, 1, 'Index contains a single entry')
  t.true(
    uint8ArrayEquals(entries[0].digest, root.multihash.digest),
    'Index entry is for root data CID'
  )
})

test.serial('should write dudewhere index', async (t) => {
  const client = await createClientWithUser(t)
  const config = getTestServiceConfig(t)
  const mf = getMiniflareContext(t)
  const { root, car: carBody } = await createCar('dude')
  const carBytes = new Uint8Array(await carBody.arrayBuffer())
  const carCid = await createCarCid(carBytes)

  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${client.token}`,
      'Content-Type': 'application/car',
    },
    body: carBody,
  })

  const { ok, value } = await res.json()
  t.truthy(ok, 'Server response payload has `ok` property')
  t.is(value.cid, root.toString(), 'Server responded with expected CID')
  t.is(value.type, 'application/car', 'type should match car mime-type')

  const r2Bucket = await mf.getR2Bucket('DUDEWHERE')
  const r2Objects = await r2Bucket.list({ prefix: `${root}/` })
  t.is(r2Objects.objects.length, 1)
  t.is(r2Objects.objects[0].key, `${root}/${carCid}`)
})

test.serial('should fail upload for corrupt CAR', async (t) => {
  const client = await createClientWithUser(t)
  const mf = getMiniflareContext(t)
  const carBytes = await fs.promises.readFile(
    path.join(__dirname, 'fixtures', 'corrupt.car')
  )
  const res = await mf.dispatchFetch('http://miniflare.test/upload', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${client.token}`,
      'Content-Type': 'application/car',
    },
    body: carBytes,
  })

  t.is(res.status, 400)

  const { ok, error } = await res.json()
  t.is(ok, false)
  t.is(error.code, 'ERROR_INVALID_CAR')
  t.is(
    error.message,
    'Invalid CAR file received: failed hash verification: bafk2bzaceda5oo2f5wmcwfmqbqkxzdwzszc2bhqnj4lpygliqna7bmbkmzwh4: CID hash does not match bytes'
  )
})

/**
 * @param {Uint8Array} data
 */
const getHash = async (data) => {
  const hash = await sha256.digest(new Uint8Array(data))
  return uint8ArrayToString(hash.bytes, 'base32')
}

/** @param {Uint8Array} data */
const getCarCid = async (data) => {
  return CID.createV1(0x202, await sha256.digest(data))
}

/**
 *
 * @param {number} n
 * @returns {Uint8Array}
 */
function getRandomBytes(n) {
  const b = crypto.randomBytes(n)
  return Uint8Array.from(b)
}

/**
 *
 * @param {import('../src/config.js').ServiceConfiguration} config
 * @param {CID|string} root
 * @param {number} userId
 * @param {string} carHash
 * @returns
 */
function expectedS3BackupUrl(config, root, userId, carHash) {
  const { S3_ENDPOINT, S3_BUCKET_NAME } = config
  return `${S3_ENDPOINT}/${S3_BUCKET_NAME}/raw/${root}/nft-${userId}/${carHash}.car`
}

/**
 * @param {import('../src/config.js').ServiceConfiguration} config
 * @param {CID|string} carCid
 */
function expectedR2BackupUrl(config, carCid) {
  const { CARPARK_URL } = config
  return `${CARPARK_URL}/${carCid}/${carCid}.car`
}

/**
 * @param {import('ava').ExecutionContext<unknown>} t
 */
function getLinkdexMock(t) {
  const config = getTestServiceConfig(t)
  const fetchMock = getMiniflareFetchMock(t)
  // @ts-expect-error LINKDEX_URL should be set
  return fetchMock.get(config.LINKDEX_URL)
}

/**
 * @param {import('undici').Interceptable} mock
 * @param {import('../src/bindings.js').DagStructure} structure
 * @param {number} times
 */
function mockLinkdexResponse(mock, structure, times = 1) {
  mock
    .intercept({ path: /^\/\?key=/, method: 'GET' })
    .reply(
      200,
      { structure: structure },
      { headers: { 'content-type': 'application/json' } }
    )
    .times(times)
}

/**
 * create a mock http server,
 * that can act as a stand-in for up.web3.storage (aka w3up)
 */
async function createListeningMockW3up() {
  let requestCount = 0
  const server = createServer((req, res) => {
    requestCount++
    res.writeHead(451)
    res.write('TODO')
    res.end()
  })
  server.listen(0)
  await new Promise((resolve, reject) => {
    server.addListener('listening', () => resolve(undefined))
  })
  const serverAddress = server.address()
  if (typeof serverAddress === 'string' || !serverAddress)
    throw new Error('server.address() must not return a string')
  const url = new URL(`http://localhost:${serverAddress.port}`)
  return {
    get requestCount() {
      return requestCount
    },
    close() {
      server.close()
    },
    url,
  }
}
