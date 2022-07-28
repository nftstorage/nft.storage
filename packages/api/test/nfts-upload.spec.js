import assert from 'assert'
import { CID } from 'multiformats/cid'
import { sha256, sha512 } from 'multiformats/hashes/sha2'
import * as pb from '@ipld/dag-pb'
import { CarWriter } from '@ipld/car'
import { packToBlob } from 'ipfs-car/pack/blob'
import { TreewalkCarSplitter } from 'carbites/treewalk'
import { toString as uint8ArrayToString } from 'uint8arrays/to-string'
import {
  createClientWithUser,
  DBTestClient,
  rawClient,
} from './scripts/helpers.js'
import { createCar } from './scripts/car.js'
import { build } from 'ucan-storage/ucan-storage'
import { KeyPair } from 'ucan-storage/keypair'
import { getServiceConfig } from '../src/config.js'

describe('NFT Upload ', () => {
  /** @type{DBTestClient} */
  let client

  before(async () => {
    client = await createClientWithUser()
  })

  it('should upload a single file', async () => {
    const file = new Blob(['hello world!'], { type: 'application/text' })
    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    const res = await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: file,
    })
    const { ok, value } = await res.json()
    assert(ok, 'Server response payload has `ok` property')
    assert.strictEqual(value.cid, cid, 'Server responded with expected CID')
    assert.strictEqual(
      value.type,
      'application/text',
      'type should match blob mime-type'
    )

    const { data } = await rawClient
      .from('upload')
      .select('*')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    // @ts-ignore
    assert.equal(data.source_cid, cid)
    assert.equal(data.deleted_at, null)
  })

  it('should upload multiple blobs', async () => {
    const body = new FormData()

    const file1 = new Blob(['hello world! 1'])
    const file2 = new Blob(['hello world! 2'])
    body.append('file', file1, 'name1')
    body.append('file', file2, 'name2')
    const res = await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body,
    })
    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    assert.deepStrictEqual(value.files, [
      { name: 'name1', type: 'application/octet-stream' },
      { name: 'name2', type: 'application/octet-stream' },
    ])
    assert.ok(value.type === 'directory', 'should be directory')
    assert.equal(value.size, 130, 'should have correct size')
    assert.strictEqual(
      value.cid,
      'bafybeifrkxqq5bbn4fkykfyggoltlb7vn3moyhr3pldzx3me6yiukcfsem',
      'Server responded with expected CID'
    )
  })

  it('should fail to upload files without Content-Type', async () => {
    const body = new FormData()
    const file = 'hello world! 1'
    body.append('file', file)
    const res = await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body,
    })
    assert(res, 'Server responded')
    assert.equal(res.status, 400, 'Server responded with HTTP 400 status')
    const { error } = await res.json()
    assert.equal(error.message, 'missing Content-Type in multipart part')
  })

  // FIXME: this should fail because two files in the same directory should not
  // occupy the same name. https://github.com/ipfs/js-ipfs-unixfs/issues/232
  it('should upload multiple blobs without name', async () => {
    const body = new FormData()

    const file1 = new Blob(['hello world! 1'])
    const file2 = new Blob(['hello world! 2'])
    body.append('file', file1)
    body.append('file', file2)
    const res = await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body,
    })
    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    assert.deepStrictEqual(value.files, [
      { name: 'blob', type: 'application/octet-stream' },
      { name: 'blob', type: 'application/octet-stream' },
    ])
    assert.ok(value.type === 'directory', 'should be directory')
    assert.equal(value.size, 66, 'should have correct size')
    assert.strictEqual(
      value.cid,
      'bafybeiaowg4ssqzemwgdlisgphib54clq62arief7ssabov5r3pbfh7vje',
      'Server responded with expected CID'
    )
  })

  it('should upload multiple files with name', async () => {
    const body = new FormData()

    const file1 = new Blob(['hello world! 1'])
    const file2 = new Blob(['hello world! 2'])
    body.append('file', new File([file1], 'name1.png'))
    body.append('file', new File([file2], 'name2.png'))
    const res = await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body,
    })
    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    assert.deepStrictEqual(value.files, [
      { name: 'name1.png', type: 'application/octet-stream' },
      { name: 'name2.png', type: 'application/octet-stream' },
    ])
    assert.ok(value.type === 'directory', 'should be directory')
    assert.equal(value.size, 138, 'should have correct size')
    assert.strictEqual(
      value.cid,
      'bafybeieoib3k2cy2x7nlmsfpid3fhnhlewib7ekatui4i27qfio6vutmzm',
      'Server responded with expected CID'
    )
  })

  it('should upload a single CAR file', async () => {
    const { root, car } = await createCar('hello world car')
    // expected CID for the above data
    const cid = 'bafkreifeqjorwymdmh77ars6tbrtno74gntsdcvqvcycucidebiri2e7qy'
    assert.strictEqual(root.toString(), cid, 'car file has correct root')
    const res = await fetch('upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${client.token}`,
        'Content-Type': 'application/car',
      },
      body: car,
    })

    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    assert(ok, 'Server response payload has `ok` property')
    assert.strictEqual(value.cid, cid, 'Server responded with expected CID')
    assert.strictEqual(
      value.type,
      'application/car',
      'type should match blob mime-type'
    )

    const { data } = await rawClient
      .from('upload')
      .select('*, content(*)')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    // @ts-ignore
    assert.equal(data.source_cid, cid)
    assert.equal(data.deleted_at, null)
    assert.equal(data.content.dag_size, 15, 'correct dag size')
  })

  it('should allow a CAR with unsupported hash function', async () => {
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

    const res = await fetch('upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${client.token}`,
        'Content-Type': 'application/car',
      },
      body: new Blob(carBytes, { type: 'application/car' }),
    })

    assert(res, 'Server responded')
    assert(res.ok, 'Server response ok')
    const { ok, value } = await res.json()
    assert(ok, 'Server response payload has `ok` property')
    assert.strictEqual(
      value.cid,
      cid.toString(),
      'Server responded with expected CID'
    )
    assert.strictEqual(
      value.type,
      'application/car',
      'type should match blob mime-type'
    )
  })

  it('should throw for CAR with a block where the bytes do not match the CID', async () => {
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

    const res = await fetch('upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${client.token}`,
        'Content-Type': 'application/car',
      },
      body: new Blob(carBytes),
    })

    assert(res, 'Server responded')
    assert.strictEqual(res.ok, false)
    const { error } = await res.json()
    assert.strictEqual(
      error.code,
      'ERROR_INVALID_CAR',
      'Server responded with an INVALID_CAR Error'
    )
  })

  it('should re-upload same data and update mime-type', async () => {
    const file = new Blob(['hello world!'], { type: 'application/text' })
    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    const res1 = await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: file,
    })
    const data1 = await res1.json()
    assert.equal(data1.value.cid, cid)
    assert.equal(data1.value.type, 'application/text', 'text')

    const { root, car } = await createCar('hello world!')
    const res2 = await fetch('upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${client.token}`,
        'Content-Type': 'application/car',
      },
      body: car,
    })
    const data2 = await res2.json()
    assert.equal(data2.value.cid, cid)
    assert.equal(data2.value.type, 'application/car', 'car')

    const { data } = await rawClient
      .from('upload')
      .select('*')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    assert.equal(data.type, 'Car', 'type should be Car at the end.')
  })

  it('should re-upload nft turning a deleted nft into an active nft again', async () => {
    const file = new Blob(['hello world!'])
    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'
    const res = await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: file,
    })
    const { ok, value } = await res.json()

    const deleted = await client.client.deleteUpload(cid, client.userId)
    assert.notEqual(deleted?.deleted_at, null)

    const testTs = Date.now()
    const reup = await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: file,
    })
    const reupRsp = await reup.json()
    assert.ok(reupRsp.ok)

    const { data } = await rawClient
      .from('upload')
      .select('*')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    assert.equal(data.deleted_at, null, 'its active again')
    assert.ok(
      new Date(data.updated_at).valueOf() > testTs,
      'updated_at should be bigger than a date before re-upload request'
    )
  })

  it('should upload to cluster 2', async () => {
    const file = new Blob(['should upload to cluster 2'], {
      type: 'application/text',
    })
    // expected CID for the above data
    const cid = 'bafkreicoihdprzusqwmabenu7tsec7xffsaqbdpw4f3eputfcornkiytva'
    const res = await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: file,
    })
    const { ok } = await res.json()
    assert(ok, 'upload created')
    const { data } = await rawClient
      .from('upload')
      .select('*,content(dag_size, pin(status, service, inserted_at))')
      .match({ source_cid: cid, user_id: client.userId })
      .filter(
        'content.pin.service',
        'in',
        '(IpfsCluster,IpfsCluster2,IpfsCluster3)'
      )
      .single()

    assert.equal(data.content.pin[0].service, 'IpfsCluster3')
  })

  it('should create S3 backup', async () => {
    const { root, car } = await packToBlob({
      input: [{ path: 'test.txt', content: 'S3 backup' }],
    })
    const res = await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: car,
    })

    const { value } = await res.json()
    assert.equal(root.toString(), value.cid)

    const upload = await client.client.getUpload(value.cid, client.userId)
    assert(upload)
    assert(upload.backup_urls)

    // construct the expected backup URL
    const carBuf = await car.arrayBuffer()
    const carHash = await getHash(new Uint8Array(carBuf))
    const backupUrl = expectedBackupUrl(root, client.userId, carHash)

    assert.equal(upload.backup_urls[0], backupUrl)
  })

  it('should backup chunked uploads, preserving backup_urls for each chunk', async function () {
    this.timeout(10_000)

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

    const backupUrls = []
    for await (const chunk of splitter.cars()) {
      const carParts = []
      for await (const part of chunk) {
        carParts.push(part)
      }
      const carFile = new Blob(carParts, { type: 'application/car' })
      const res = await fetch('upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${client.token}` },
        body: carFile,
      })

      const { value } = await res.json()
      assert.equal(root.toString(), value.cid)
      const carHash = await getHash(new Uint8Array(await carFile.arrayBuffer()))
      backupUrls.push(expectedBackupUrl(root, client.userId, carHash))
    }

    const upload = await client.client.getUpload(root.toString(), client.userId)
    assert(upload)
    assert(upload.backup_urls)
    assert(upload.backup_urls.length >= nChunks) // using >= to account for CAR / UnixFS overhead
    assert.equal(
      upload.backup_urls.length,
      backupUrls.length,
      `expected ${backupUrls.length} backup urls, got: ${upload.backup_urls.length}`
    )

    /** @type string[] */
    // @ts-expect-error upload.backup_urls has type unknown[], but it's really string[]
    const resultUrls = upload.backup_urls
    for (const url of resultUrls) {
      assert(
        backupUrls.includes(url),
        `upload is missing expected backup url ${url}`
      )
    }
  })

  it('should upload a single file using ucan', async () => {
    const kp = await KeyPair.create()
    // Register DID
    await fetch(`user/did`, {
      headers: { Authorization: `Bearer ${client.token}` },
      method: 'POST',
      body: JSON.stringify({
        did: kp.did(),
      }),
    })

    // Get root UCAN
    const ucanRsp = await fetch(`ucan/token`, {
      headers: { Authorization: `Bearer ${client.token}` },
      method: 'POST',
    })
    const { value: rootUcan } = await ucanRsp.json()

    // Get service DID
    const didRsp = await fetch(`did`)
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
      const res = await fetch('upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${opUcan}` },
        body: file,
      })

      assert.equal(res.status, 400)
      const { ok, error } = await res.json()
      assert.equal(ok, false)
      assert.ok(error.message.match(/Invalid route/))
    }

    {
      const res = await fetch('ucan-upload', {
        method: 'POST',
        headers: { Authorization: `Bearer ${opUcan}` },
        body: file,
      })

      assert.equal(res.status, 401)
      const { ok, error } = await res.json()
      assert.equal(ok, false)
      assert.ok(error.message.match(/x-agent-did/))
    }

    {
      const badkp = await KeyPair.create()
      const res = await fetch('ucan-upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${opUcan}`,
          'x-agent-did': badkp.did(),
        },
        body: file,
      })

      assert.equal(res.status, 401)
      const { ok, error } = await res.json()
      assert.equal(ok, false)
      assert.ok(
        error.message.match(/Expected x-agent-did to be UCAN issuer DID/)
      )
    }

    const res = await fetch('ucan-upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${opUcan}`, 'x-agent-did': kp.did() },
      body: file,
    })

    const { ok, value } = await res.json()
    assert(ok, 'Server response payload has `ok` property')

    const { data } = await rawClient
      .from('upload')
      .select('*')
      .match({ source_cid: cid, user_id: client.userId })
      .single()

    // @ts-ignore
    assert.equal(data.meta.ucan.token, opUcan)
  })

  it('should update a single file', async () => {
    const file = new Blob(['hello world!'], { type: 'application/text' })
    // expected CID for the above data
    const cid = 'bafkreidvbhs33ighmljlvr7zbv2ywwzcmp5adtf4kqvlly67cy56bdtmve'

    await fetch('upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${client.token}` },
      body: file,
    })

    const { data } = await rawClient
      .from('upload')
      .select('*')
      .match({ content_cid: cid, user_id: client.userId })
      .single()

    // update file we just created above

    const name = 'test updated name'

    const uploadRes = await fetch(`upload/${data.content_cid}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${client.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),
    })

    const { ok: uploadOk, value: uploadValue } = await uploadRes.json()
    assert(
      uploadOk,
      'Server response payload has `ok` property for upload endpoint'
    )
    assert.strictEqual(
      uploadValue.cid,
      data.cid,
      'Server responded with expected CID'
    )
    assert.strictEqual(
      uploadValue.name,
      name,
      'type should match blob mime-type'
    )

    const { data: uploadData } = await rawClient
      .from('upload')
      .select('*')
      .match({ id: data.id })
      .single()

    // @ts-ignore
    assert.equal(uploadData.name, name)
  })
})

/**
 * @param {Uint8Array} data
 */
const getHash = async (data) => {
  const hash = await sha256.digest(new Uint8Array(data))
  return uint8ArrayToString(hash.bytes, 'base32')
}

/**
 *
 * @param {number} n
 * @returns {Uint8Array}
 */
function getRandomBytes(n) {
  const a = new Uint8Array(n)
  const QUOTA = 65536
  for (let i = 0; i < n; i += QUOTA) {
    crypto.getRandomValues(a.subarray(i, i + Math.min(n - i, QUOTA)))
  }
  return a
}

/**
 *
 * @param {CID|string} root
 * @param {number} userId
 * @param {string} carHash
 * @returns
 */
function expectedBackupUrl(root, userId, carHash) {
  const { S3_ENDPOINT, S3_BUCKET_NAME } = getServiceConfig()
  return `${S3_ENDPOINT}/${S3_BUCKET_NAME}/raw/${root}/nft-${userId}/${carHash}.car`
}
