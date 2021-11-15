import assert from 'assert'
import {
  createClientWithUser,
  DBTestClient,
  rawClient,
} from './scripts/helpers.js'
import { createCar } from './scripts/car.js'

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

  it('should upload a multiple blobs', async () => {
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

  it('should upload a multiple blobs without name', async () => {
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

  it('should upload a multiple files without name', async () => {
    const body = new FormData()

    const file1 = new Blob(['hello world! 1'])
    const file2 = new Blob(['hello world! 2'])
    body.append('file', new File([file1], 'name1.png'))
    body.append('file', new File([file2], 'name1.png'))
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
      { name: 'name1.png', type: 'application/octet-stream' },
    ])
    assert.ok(value.type === 'directory', 'should be directory')
    assert.equal(value.size, 71, 'should have correct size')
    assert.strictEqual(
      value.cid,
      'bafybeibl5yizqtzdnhflscdmzjy7t6undnn7zhvhryhbfknneu364w62pe',
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
      .filter('content.pin.service', 'in', '(IpfsCluster,IpfsCluster2)')
      .single()

    assert.equal(data.content.pin[0].service, 'IpfsCluster2')
  })
})
