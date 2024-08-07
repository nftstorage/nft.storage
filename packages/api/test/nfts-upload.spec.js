import test from 'ava'
import { CID } from 'multiformats/cid'
import { sha256, sha512 } from 'multiformats/hashes/sha2'
import * as pb from '@ipld/dag-pb'
import { CarWriter } from '@ipld/car'
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
import { createServer } from 'node:http'

import {
  createMockW3upServer,
  w3upMiniflareOverrides,
} from './utils/w3up-testing.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

let mockW3upStoreAddCount = 0
let mockW3upUploadAddCount = 0

/**
 * @type {import('./bindings.js').MockW3up}
 */
let mockW3up
test.before(async (t) => {
  mockW3up = await createMockW3upServer({
    async onHandleStoreAdd(invocation) {
      mockW3upStoreAddCount++
    },
    async onHandleUploadAdd(invocation) {
      mockW3upUploadAddCount++
    },
  })

  const linkdexUrl = 'http://fake.api.net'
  await setupMiniflareContext(t, {
    overrides: {
      LINKDEX_URL: linkdexUrl,
      ...(await w3upMiniflareOverrides(mockW3up)),
    },
  })
})

test.after(async (t) => {
  mockW3up.server.close()
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
  const initialW3upStoreAddCount = mockW3upStoreAddCount
  const initialW3upUploadAddCount = mockW3upUploadAddCount
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

  const finalW3upStoreAddCount = mockW3upStoreAddCount
  const storeAddCountDelta = finalW3upStoreAddCount - initialW3upStoreAddCount
  t.is(
    storeAddCountDelta,
    1,
    'this upload sent one valid store/add invocation to w3up'
  )

  // @todo re-enable or remove this. We may not ever need to do an upload/add, but haven't decided yet
  // const finalW3upUploadAddCount = mockW3upUploadAddCount
  // const uploadAddCountDelta =
  //   finalW3upUploadAddCount - initialW3upUploadAddCount
  // t.is(
  //   uploadAddCountDelta,
  //   1,
  //   'this upload sent one valid upload/add invocation to w3up'
  // )

  // if similar request is made by user not in W3_NFTSTORAGE_ENABLE_W3UP_FOR_EMAILS allow list,
  // that should not result in request to w3up
  {
    const storeAddCountBeforeClient2 = mockW3upStoreAddCount
    const client2 = await createClientWithUser(t)
    const response2 = await mf.dispatchFetch('http://miniflare.test/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client2.token}` },
      body: file,
    })
    // should have incremented because feature switch allows w3up for all uploaders
    t.is(mockW3upStoreAddCount, storeAddCountBeforeClient2 + 1)
  }
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
