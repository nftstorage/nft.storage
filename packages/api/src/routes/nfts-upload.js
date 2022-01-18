import { packToBlob } from 'ipfs-car/pack/blob'
import { CarBlockIterator } from '@ipld/car'
import * as raw from 'multiformats/codecs/raw'
import * as cbor from '@ipld/dag-cbor'
import * as pb from '@ipld/dag-pb'
import { Block } from 'multiformats/block'
import * as constants from '../constants.js'
import { HTTPError } from '../errors.js'
import * as cluster from '../cluster.js'
import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth.js'
import { toNFTResponse } from '../utils/db-transforms.js'

const MAX_BLOCK_SIZE = 1 << 20 // Maximum permitted block size in bytes (1MiB).
const decoders = [pb, raw, cbor]

/**
 * @typedef {import('../bindings').NFT} NFT
 * @typedef {import('../bindings').NFTResponse} NFTResponse
 * @typedef {import('@nftstorage/ipfs-cluster').API.StatusResponse} StatusResponse
 */

/** @type {import('../bindings').Handler} */
export async function nftUpload(event, ctx) {
  const { headers } = event.request
  const contentType = headers.get('content-type') || ''
  const { user, key } = await validate(event, ctx)

  /** @type {import('../utils/db-client-types').UploadOutput} */
  let upload
  if (contentType.includes('multipart/form-data')) {
    const form = await event.request.formData()
    // Our API schema requires that all file parts be named `file` and
    // encoded as binary, which is why we can expect that each part here is
    // a file (and not a stirng).
    const files = /** @type {File[]} */ (form.getAll('file'))

    const { car } = await packToBlob({
      // @ts-ignore nodejs readable stream type inconsistencies
      input: files.map((f) => ({ path: f.name, content: f.stream() })),
      wrapWithDirectory: true,
    })

    upload = await uploadCar({
      ctx,
      user,
      key,
      car,
      uploadType: 'Multipart',
      mimeType: 'multipart/form-data',
      files: files.map((f) => ({ name: f.name, type: f.type })),
      structure: 'Complete',
    })
  } else {
    const blob = await event.request.blob()
    if (blob.size === 0) {
      throw new HTTPError('empty payload', 400)
    }

    const isCar = contentType.includes('application/car')
    /** @type {'Car'|'Blob'} */
    let uploadType
    /** @type {import('../bindings').DagStructure} */
    let structure
    /** @type {Blob} */
    let car

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
      ctx,
      user,
      key,
      car,
      uploadType,
      mimeType: contentType,
      files: [],
      structure,
    })
  }

  return new JSONResponse({ ok: true, value: toNFTResponse(upload) })
}

/**
 * @typedef {{
 *   ctx: import('../bindings').RouteContext
 *   user: Pick<import('../utils/db-client-types').UserOutput, 'id'>
 *   key?: Pick<import('../utils/db-client-types').UserOutputKey, 'id'>
 *   car: Blob
 *   uploadType?: import('../utils/db-types').definitions['upload']['type']
 *   mimeType: string
 *   structure: import('../bindings').DagStructure
 *   files: Array<{ name: string; type?: string }>
 *   meta?: Record<string, string>
 * }} UploadCarInput
 * @param {UploadCarInput} params
 */
export async function uploadCar(params) {
  const stat = await carStat(params.car)
  return uploadCarWithStat(params, stat)
}

/**
 * @param {UploadCarInput} data
 * @param {CarStat} stat
 */
export async function uploadCarWithStat(
  { ctx, user, key, car, uploadType = 'Car', mimeType, structure, files, meta },
  stat
) {
  // if unknown, but the root CID is raw, then it is complete
  if (structure === 'Unknown' && stat.rootCid.code === raw.code) {
    structure = 'Complete'
  }

  const [added, backupUrl] = await Promise.all([
    cluster.addCar(car, {
      local: car.size > constants.cluster.localAddThreshold,
    }),
    ctx.backup
      ? ctx.backup.backupCar(user.id, stat.rootCid, car, structure)
      : Promise.resolve(null),
  ])

  const upload = await ctx.db.createUpload({
    mime_type: mimeType,
    type: uploadType,
    content_cid: stat.rootCid.toV1().toString(),
    source_cid: stat.rootCid.toString(),
    dag_size: structure === 'Complete' ? added.bytes : stat.size,
    user_id: user.id,
    files,
    meta,
    key_id: key?.id,
    backup_urls: backupUrl ? [backupUrl] : [],
  })

  return upload
}

/**
 * Gets CAR file information. Throws if the CAR does not conform to our idea of
 * a valid CAR i.e.
 *
 * - Missing root CIDs
 * - >1 root CID
 * - Any block bigger than MAX_BLOCK_SIZE (1MiB)
 * - 0 blocks
 * - Missing root block
 * - Missing non-root blocks (when root block has links)
 *
 * The DAG size will be returned ONLY IF the root node is dag-pb or raw.
 *
 * @typedef {import('multiformats').CID} CID
 * @typedef {{ size?: number, rootCid: CID }} CarStat
 * @param {Blob} carBlob
 * @returns {Promise<CarStat>}
 */
export async function carStat(carBlob) {
  const carBytes = new Uint8Array(await carBlob.arrayBuffer())
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
  let blocks = 0
  for await (const block of blocksIterator) {
    const blockSize = block.bytes.byteLength
    if (blockSize > MAX_BLOCK_SIZE) {
      throw new Error(`block too big: ${blockSize} > ${MAX_BLOCK_SIZE}`)
    }
    if (!rawRootBlock && block.cid.equals(rootCid)) {
      rawRootBlock = block
    }
    blocks++
  }
  if (blocks === 0) {
    throw new Error('empty CAR')
  }
  if (!rawRootBlock) {
    throw new Error('missing root block')
  }
  const decoder = decoders.find((d) => d.code === rootCid.code)
  let size
  if (decoder) {
    // if there's only 1 block (the root block) and it's a raw node, we know the size.
    if (blocks === 1 && rootCid.code === raw.code) {
      size = rawRootBlock.bytes.byteLength
    } else {
      const rootBlock = new Block({
        cid: rootCid,
        bytes: rawRootBlock.bytes,
        value: decoder.decode(rawRootBlock.bytes),
      })
      const hasLinks = !rootBlock.links()[Symbol.iterator]().next().done
      // if the root block has links, then we should have at least 2 blocks in the CAR
      if (hasLinks && blocks < 2) {
        throw new Error('CAR must contain at least one non-root block')
      }
      // get the size of the full dag for this root, even if we only have a partial CAR.
      if (rootBlock.cid.code === pb.code) {
        size = cumulativeSize(rootBlock.bytes, rootBlock.value)
      }
    }
  }
  return { rootCid, size }
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
