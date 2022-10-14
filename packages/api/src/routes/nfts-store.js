import last from 'it-last'
import * as CBOR from '@ipld/dag-cbor'
import { CID } from 'multiformats'
import { sha256 } from 'multiformats/hashes/sha2'
import { CarWriter } from '@ipld/car/writer'
import { MemoryBlockStore } from 'ipfs-car/blockstore/memory'
import { importer as unixFsImporter } from 'ipfs-unixfs-importer'
import { checkAuth } from '../utils/auth.js'
import { setIn } from '../utils/utils.js'
import { JSONResponse } from '../utils/json-response.js'
import { HTTPError } from '../errors.js'
import { uploadCarWithStat } from './nfts-upload.js'

/**
 * @typedef {import('../bindings').NFT} NFT
 * @typedef {import('ipfs-unixfs-importer').UserImporterOptions} UserImporterOptions
 */

/** @type {import('../bindings').Handler} */
export async function nftStore(event, ctx) {
  const { user, key } = checkAuth(ctx)
  const { headers } = event.request
  const contentType = headers.get('content-type') || ''
  if (!contentType.includes('multipart/form-data')) {
    throw new HTTPError('content-type should be `multipart/form-data`', 400)
  }

  const form = await event.request.formData()
  const meta = /** @type {string} */ (form.get('meta'))
  if (!meta || typeof meta !== 'string') {
    throw new HTTPError('missing `meta` in multipart', 400)
  }

  const data = JSON.parse(meta)
  const dag = JSON.parse(meta)

  // accumlate blocks here, until we are ready to export it as a CAR
  const bs = new MemoryBlockStore()

  for (const [name, content] of form.entries()) {
    if (name === 'meta') {
      continue
    }
    const file = /** @type {File} */ (content)

    if (typeof file === 'string') {
      throw new HTTPError('expected File part', 400)
    }
    const cid = await unixFsEncodeFile(file, bs)
    const href = `ipfs://${cid}/${file.name}`
    const path = name.split('.')
    setIn(data, path, href)
    setIn(dag, path, cid)
  }

  const metadataCid = await unixFsEncodeString(JSON.stringify(data), bs)

  const rootCid = await cborEncode(
    {
      ...dag,
      'metadata.json': metadataCid,
      type: 'nft',
    },
    bs
  )

  const size = totalSize(bs)
  const structure = 'Complete'
  const carBytes = await exportToCar(rootCid, bs)

  /** @type {import('./nfts-upload.js').CarStat} */
  const carStat = {
    rootCid,
    structure,
    carBytes,
    size,
  }

  const upload = await uploadCarWithStat(
    {
      event,
      ctx,
      user,
      key,
      uploadType: 'Nft',
      files: [],
      structure,
    },
    carStat
  )

  const result = {
    ok: true,
    value: {
      ipnft: upload.source_cid,
      url: `ipfs://${upload.source_cid}/metadata.json`,
      data,
    },
  }

  return new JSONResponse(result)
}

/**
 * Encode and object as a CBOR block, add it to the blockstore and return it's CID
 * @param {unknown} value
 * @param {import('ipfs-car/blockstore').Blockstore} bs
 */
async function cborEncode(value, bs) {
  const bytes = CBOR.encode(value)
  const digest = await sha256.digest(bytes)
  const cid = CID.createV1(CBOR.code, digest)
  await bs.put(cid, bytes)
  return cid
}

// TODO: expose from ipfs-car
// Match ipfs-car defaults used in nft-upload
/** @type {import('ipfs-unixfs-importer').UserImporterOptions} */
const unixfsImporterOptionsDefault = {
  cidVersion: 1,
  chunker: 'fixed',
  maxChunkSize: 262144,
  hasher: sha256,
  rawLeaves: true,
  wrapWithDirectory: true,
  maxChildrenPerNode: 174,
}

/**
 * Encode an ImportCandidate as UnixFS blocks and add them to the BlockStore.
 * @param {import('ipfs-unixfs-importer').ImportCandidate} ic
 * @param {MemoryBlockStore} bs
 * @param {UserImporterOptions} opts
 */
async function unixFsEncode(ic, bs, opts = {}) {
  const res = await last(
    unixFsImporter(ic, bs, {
      ...unixfsImporterOptionsDefault,
      ...opts,
    })
  )
  if (res === undefined) {
    throw new Error('Failed to unixfs encode')
  }
  return res.cid
}

/**
 * Encode the File, wrapped with a directory, as UnixFS blocks
 * and add them to the BlockStore.
 * @param {File} file
 * @param {MemoryBlockStore} bs
 * @return {Promise<CID>} the root CID for the file
 */
async function unixFsEncodeFile(file, bs) {
  const content = new Uint8Array(await file.arrayBuffer())
  const ic = { path: file.name, content }
  return unixFsEncode(ic, bs, {
    wrapWithDirectory: true,
  })
}

/**
 * Encode the string as UnixFS blocks and add them to the BlockStore.
 * @param {string} str
 * @param {MemoryBlockStore} bs
 * @return {Promise<CID>} the root CID for the file
 */
async function unixFsEncodeString(str, bs) {
  const content = new TextEncoder().encode(str)
  const ic = { path: '', content }
  return unixFsEncode(ic, bs, {
    wrapWithDirectory: false,
  })
}

/**
 * Consume the blockstore, encoding it as a CAR file.
 * Warning! Deletes blocks from blockstore as it consumes them.
 * @param {CID} rootCid
 * @param {MemoryBlockStore} bs
 */
async function exportToCar(rootCid, bs) {
  const { out, writer } = CarWriter.create([rootCid])
  for (const [cidStr, bytes] of bs.store.entries()) {
    writer.put({ cid: CID.parse(cidStr), bytes })
    // try and reduce the mem usage by clearing up as we go...
    bs.store.delete(cidStr)
  }
  writer.close()
  let parts = []
  for await (const part of out) {
    parts.push(part)
  }
  const car = new Blob(parts)
  // @ts-expect-error
  parts = null
  return new Uint8Array(await car.arrayBuffer())
}

/**
 * Count the total bytes of all blocks in the block store
 * @param {MemoryBlockStore} bs
 */
function totalSize(bs) {
  let size = 0
  // grab the internal store so we don't have to async await. It's just a Map.
  for (const bytes of bs.store.values()) {
    size += bytes.length
  }
  return size
}
