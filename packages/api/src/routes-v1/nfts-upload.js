import { HTTPError } from '../errors.js'
import { toFormData } from '../utils/form-data.js'
import * as cluster from '../cluster.js'
import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth-v1.js'
import { debug } from '../utils/debug.js'

const log = debug('nfts-upload')
const LOCAL_ADD_THRESHOLD = 1024 * 1024 * 2.5

/**
 * @typedef {import('../bindings').NFT} NFT
 * @typedef {import('../bindings').NFTResponse} NFTResponse
 * @typedef {import('@nftstorage/ipfs-cluster').StatusResponse} StatusResponse
 * @typedef {import('@nftstorage/db').Pin} DBPin
 */

/** @type {import('../utils/router.js').Handler} */
export async function uploadV1(event, ctx) {
  const { headers } = event.request
  const contentType = headers.get('content-type') || ''
  const { user, key, fauna } = await validate(event, ctx)
  /** @type {NFTResponse} */
  let nft

  if (contentType.includes('multipart/form-data')) {
    const form = await toFormData(event.request)
    // Our API schema requires that all file parts be named `file` and
    // encoded as binary, which is why we can expect that each part here is
    // a file (and not a stirng).
    const files = /** @type {File[]} */ (form.getAll('file'))
    const dir = await cluster.addDirectory(files)
    const { cid, size } = dir[dir.length - 1]

    const { createUpload } = await fauna.createUpload({
      input: {
        cid,
        dagSize: size,
        type: 'MULTIPART',
        files: files.map((f) => ({
          name: f.name,
          type: f.type,
        })),
        key: key?._id,
        pins: [
          {
            status: 'unknown',
            statusText: '',
            service: 'IPFS_CLUSTER',
          },
          {
            status: 'unknown',
            statusText: '',
            service: 'PINATA',
          },
        ],
      },
    })
    nft = {
      cid: createUpload.content.cid,
      created: createUpload.created,
      files: createUpload.files || [],
      scope: createUpload.key ? createUpload.key.name : 'session',
      type: 'directory',
      size: size,
      pin: {
        cid: createUpload.content.cid,
        created: createUpload.created,
        size: createUpload.content.dagSize,
        status: 'queued',
      },
    }
  } else {
    const blob = await event.request.blob()
    if (blob.size === 0) {
      throw new HTTPError('Empty payload', 400)
    }
    const isCar = contentType.includes('application/car')
    // Ensure car blob.type is set; it is used by the cluster client to set the foramt=car flag on the /add call.
    const content = isCar ? blob.slice(0, blob.size, 'application/car') : blob

    // cluster returns `bytes` rather than `size` when upload is a CAR.
    const { cid, size, bytes } = await cluster.add(content, {
      // When >2.5MB, use local add, because waiting for blocks to be sent to
      // other cluster nodes can take a long time. Replication to other nodes
      // will be done async by bitswap instead.
      local: blob.size > LOCAL_ADD_THRESHOLD,
    })

    const { createUpload } = await fauna.createUpload({
      input: {
        cid,
        dagSize: size || bytes,
        type: isCar ? 'CAR' : 'BLOB',
        key: key?._id,
        pins: [
          {
            status: 'unknown',
            statusText: '',
            service: 'IPFS_CLUSTER',
          },
          {
            status: 'unknown',
            statusText: '',
            service: 'PINATA',
          },
        ],
      },
    })
    nft = {
      cid: createUpload.content.cid,
      created: createUpload.created,
      type: content.type,
      scope: createUpload.key ? createUpload.key.name : 'session',
      files: [],
      size: createUpload.content.dagSize,
      pin: {
        cid: createUpload.content.cid,
        created: createUpload.created,
        size: createUpload.content.dagSize,
        status: 'queued',
      },
    }
  }

  return new JSONResponse({ ok: true, value: nft })
}
