import { packToBlob } from 'ipfs-car/pack/blob'
import { CarBlockIterator } from '@ipld/car'
import { equals } from 'uint8arrays'
import * as raw from 'multiformats/codecs/raw'
import * as cbor from '@ipld/dag-cbor'
import * as pb from '@ipld/dag-pb'
import { Block } from 'multiformats/block'
import { validateBlock } from '@web3-storage/car-block-validator'
import { HTTPError, InvalidCarError } from '../errors.js'
import { createCarCid } from '../utils/car.js'
import { JSONResponse } from '../utils/json-response.js'
import { checkAuth } from '../utils/auth.js'
import { toNFTResponse } from '../utils/db-transforms.js'
import { MissingApiUrlCode } from '../utils/linkdex.js'

const MAX_BLOCK_SIZE = 1 << 21 // Maximum permitted block size in bytes (2MiB).
const decoders = [pb, raw, cbor]

/**
 * @typedef {import('../bindings').NFT} NFT
 * @typedef {import('../bindings').NFTResponse} NFTResponse
 * @typedef {import('@nftstorage/ipfs-cluster').API.StatusResponse} StatusResponse
 * @typedef {import('../bindings').DagStructure} DagStructure
 */

/** @type {import('../bindings').Handler} */
export async function nftUpload(event, ctx) {
  const { headers } = event.request
  const contentType = headers.get('content-type') || ''
  const { user, key, type, ucan } = checkAuth(ctx)

  /** @type {import('../utils/db-client-types').UploadOutput} */
  let upload

  if (contentType.includes('multipart/form-data')) {
    const form = await event.request.formData()
    // Our API schema requires that all file parts be named `file` and
    // encoded as binary, which is why we can expect that each part here is
    // a file (and not a string).
    const files = /** @type {File[]} */ (form.getAll('file'))
    const input = files.map((f) => {
      if (typeof f === 'string') {
        throw new HTTPError('missing Content-Type in multipart part', 400)
      }
      return { path: f.name, content: f.stream() }
    })

    const { car } = await packToBlob({
      // @ts-ignore nodejs readable stream type inconsistencies
      input,
      wrapWithDirectory: true,
    })

    upload = await uploadCar({
      event,
      ctx,
      user,
      key,
      car,
      uploadType: 'Multipart',
      mimeType: 'multipart/form-data',
      files: files.map((f) => ({ name: f.name, type: f.type })),
      structure: 'Complete',
      meta: type === 'ucan' ? { ucan } : undefined,
    })
  } else {
    const blob = await event.request.blob()
    if (blob.size === 0) {
      throw new HTTPError('empty payload', 400)
    }

    const isCar = contentType.includes('application/car')
    /** @type {'Car'|'Blob'} */
    let uploadType
    /** @type {DagStructure} */
    let structure
    /** @type {Blob} */
    let car
    /** @type {string} */

    if (isCar) {
      car = blob
      uploadType = 'Car'
      // If a CAR file, it is not necessarily complete. i.e. it may be chunked.
      structure = 'Unknown'
    } else {
      const packed = await packToBlob({
        input: blob.stream(),
        wrapWithDirectory: false,
      })
      car = packed.car
      uploadType = 'Blob'
      structure = 'Complete'
    }
    upload = await uploadCar({
      event,
      ctx,
      user,
      key,
      car,
      uploadType,
      mimeType: contentType,
      files: [],
      structure,
      meta: type === 'ucan' ? { ucan } : undefined,
    })
  }
  return new JSONResponse({ ok: true, value: toNFTResponse(upload) })
}

/**
 * @typedef {{
 *   event: FetchEvent,
 *   ctx: import('../bindings').RouteContext
 *   user: Pick<import('../utils/db-client-types').UserOutput, 'id'>
 *   key?: Pick<import('../utils/db-client-types').UserOutputKey, 'id'>
 *   car: Blob
 *   uploadType?: import('../utils/db-types').definitions['upload']['type']
 *   mimeType?: string
 *   structure: DagStructure
 *   files: Array<{ name: string; type?: string }>
 *   meta?: Record<string, unknown>
 * }} UploadCarInput
 * @param {UploadCarInput} params
 */
export async function uploadCar(params) {
  const stat = await carStat(params.car, {
    structure: params.structure,
  })

  return uploadCarWithStat(params, stat)
}

/**
 * @param {UploadCarInput} data
 * @param {CarStat} stat
 */
export async function uploadCarWithStat(
  { event, ctx, user, key, car, uploadType = 'Car', mimeType, files, meta },
  stat
) {
  const sourceCid = stat.rootCid.toString()
  const contentCid = stat.rootCid.toV1().toString()

  const metadata = {
    structure: stat.structure || 'Unknown',
    sourceCid,
    contentCid,
    carCid: stat.cid.toString(),
  }

  /** @type {(() => Promise<void>)|undefined} */
  let checkDagStructureTask
  const backupUrls = []
  const { w3up } = ctx
  if (w3up) {
    // we perform store/add and upload/add concurrently to save time.
    await Promise.all([
      w3up.capability.store.add(car),
      // We create an upload for each CAR and use it's CID as a shard, which
      // will work as expected because `upload/add` merges all shards.
      // @ts-expect-error Link types mismatch
      w3up.capability.upload.add(stat.rootCid, [stat.cid]),
    ])

    // register as gateway links to record the CAR CID - we don't have another
    // way to know the location right now.
    backupUrls.push(new URL(`https://w3s.link/ipfs/${stat.cid}`))

    if (stat.structure === 'Partial') {
      checkDagStructureTask = async () => {
        const info = await w3up.capability.upload.get(stat.rootCid)
        if (info.shards && info.shards.length > 1) {
          const structure = await ctx.linkdexApi.getDagStructureForCars(
            info.shards
          )
          if (structure === 'Complete') {
            return ctx.db.updatePinStatus(
              upload.content_cid,
              elasticPin(structure)
            )
          }
        }
      }
    }
  } else {
    throw new Error('w3up not defined, cannot upload')
  }
  const xName = event.request.headers.get('x-name')
  let name = xName && decodeURIComponent(xName)
  if (!name || typeof name !== 'string') {
    name = `Upload at ${new Date().toISOString()}`
  }

  /**
   * Create a pin entry for elastic ipfs
   * @param {import('../bindings').DagStructure | undefined} structure
   * @returns {import('../utils/db-client-types').CreateUploadInputPin}
   */
  const elasticPin = (structure) => ({
    status: structure === 'Complete' ? 'Pinned' : 'Pinning',
    service: 'ElasticIpfs',
  })
  const upload = await ctx.db.createUpload({
    mime_type: mimeType,
    type: uploadType,
    content_cid: contentCid,
    source_cid: sourceCid,
    dag_size: stat.size,
    user_id: user.id,
    files,
    meta,
    key_id: key?.id,
    backup_urls: backupUrls,
    name,
    pins: [elasticPin(stat.structure)],
  })

  // no need to ask linkdex if it's Complete or Unknown
  if (checkDagStructureTask) {
    event.waitUntil(checkDagStructureTask())
  }
  return upload
}

/** @type {import('../bindings').Handler} */
export async function nftUpdateUpload(event, ctx) {
  const { params, db } = ctx
  try {
    const { user } = checkAuth(ctx)
    const { cid } = params

    // id is required for updating
    if (!cid || typeof cid !== 'string')
      return new JSONResponse({ ok: false, value: 'Upload CID is required' })

    const body = await event.request.json()
    const { name } = body

    const updatedRecord = await db.updateUpload({
      cid,
      name,
      user_id: user.id,
    })

    return new JSONResponse({ ok: true, value: updatedRecord })
  } catch (/** @type {any} */ err) {
    return new JSONResponse({ ok: false, value: err.message })
  }
}

/**
 * Gets CAR file information. Throws if the CAR does not conform to our idea of
 * a valid CAR i.e.
 *
 * - Missing root CIDs
 * - >1 root CID
 * - Any block bigger than MAX_BLOCK_SIZE (2MiB)
 * - 0 blocks
 * - Missing root block
 * - Missing non-root blocks (when root block has links)
 *
 * The DAG size will be returned ONLY IF the root node is dag-pb or raw.
 *
 * @typedef {Object} CarStat
 * @property {number} [size] DAG size in bytes
 * @property {import('multiformats').CID} rootCid Root CID of the DAG
 * @property {import('multiformats').CID} cid CID of the CAR
 * @property {DagStructure} [structure] Completeness of the DAG within the CAR
 *
 * @param {Blob} carBlob
 * @param {Object} [options]
 * @param {DagStructure} [options.structure]
 * @returns {Promise<CarStat>}
 */
export async function carStat(carBlob, { structure } = {}) {
  // We load whole thing into memory to derive stats but don't hold a reference
  // so that it will get GC'd once function returns.
  const carBytes = new Uint8Array(await carBlob.arrayBuffer())
  const cid = await createCarCid(carBytes)
  const blocksIterator = await CarBlockIterator.fromBytes(carBytes)
  const roots = await blocksIterator.getRoots()
  if (roots.length === 0) {
    throw new Error('missing roots')
  }
  if (roots.length > 1) {
    throw new Error('too many roots')
  }
  const rootCid = roots[0]
  let rawRootBlock
  /** @type {import('@ipld/car/api').Block[]} */
  const blocks = []
  for await (const block of blocksIterator) {
    const blockSize = block.bytes.byteLength
    if (blockSize > MAX_BLOCK_SIZE) {
      throw new Error(`block too big: ${blockSize} > ${MAX_BLOCK_SIZE}`)
    }
    try {
      // @ts-expect-error CID type mismatch
      await validateBlock(block)
    } catch (/** @type {any} */ err) {
      throw new InvalidCarError(
        `failed hash verification: ${block.cid.toString()}: ${err.message}`
      )
    }
    if (!rawRootBlock && block.cid.equals(rootCid)) {
      rawRootBlock = block
    }
    blocks.push(block)
  }
  if (!blocks.length) {
    throw new Error('empty CAR')
  }
  if (!rawRootBlock) {
    throw new Error('missing root block')
  }
  const decoder = decoders.find((d) => d.code === rootCid.code)
  let size
  if (decoder) {
    // if there's only 1 block (the root block) and it's a raw node, we know the size.
    if (blocks.length === 1 && rootCid.code === raw.code) {
      size = rawRootBlock.bytes.byteLength
      structure = 'Complete'
    } else {
      const rootBlock = new Block({
        cid: rootCid,
        bytes: rawRootBlock.bytes,
        value: decoder.decode(rawRootBlock.bytes),
      })
      const hasLinks = !rootBlock.links()[Symbol.iterator]().next().done
      // if the root block has links, then we should have at least 2 blocks in the CAR
      if (hasLinks && blocks.length < 2) {
        throw new Error('CAR must contain at least one non-root block')
      }
      // get the size of the full dag for this root, even if we only have a partial CAR.
      if (rootBlock.cid.code === pb.code) {
        size = cumulativeSize(rootBlock.bytes, rootBlock.value)
      }
      // get Structure if not already known
      if (!structure || structure === 'Unknown') {
        structure = getDagStructure(rawRootBlock, blocks)
      }
    }
  }
  return { cid, rootCid, size, structure }
}

/**
 * Iterate over a DAG starting on the raw block and using the CAR blocks.
 * Returns the known completeness of the DAG.
 *
 * @param {import('@ipld/car/api').Block} rawRootBlock
 * @param {import('@ipld/car/api').Block[]} blocks
 * @returns {DagStructure}
 */
function getDagStructure(rawRootBlock, blocks) {
  const decoder = decoders.find((d) => d.code === rawRootBlock.cid.code)
  if (!decoder) {
    return 'Unknown'
  }

  const rBlock = new Block({
    cid: rawRootBlock.cid,
    bytes: rawRootBlock.bytes,
    value: decoder.decode(rawRootBlock.bytes),
  })
  for (const link of rBlock.links()) {
    const existingBlock = blocks.find((b) => b.cid.equals(link[1]))
    if (!existingBlock) {
      return 'Partial'
    }

    // Get structure of remaining DAG
    const structure = getDagStructure(existingBlock, blocks)
    if (structure !== 'Complete') {
      return structure
    }
  }

  return 'Complete'
}

/**
 * The sum of the node size and size of each link
 * @param {Uint8Array} pbNodeBytes
 * @param {import('@ipld/dag-pb/src/interface').PBNode} pbNode
 * @returns {number} the size of the DAG in bytes
 */
function cumulativeSize(pbNodeBytes, pbNode) {
  // NOTE: Tsize is optional, but all ipfs implementations we know of set it.
  // It's metadata, that could be missing or deliberately set to an incorrect value.
  // This logic is the same as used by go/js-ipfs to display the cumulative size of a dag-pb dag.
  return (
    pbNodeBytes.byteLength +
    pbNode.Links.reduce((acc, curr) => acc + (curr.Tsize || 0), 0)
  )
}
