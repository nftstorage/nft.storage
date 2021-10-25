import { HTTPError } from '../errors.js'
import * as cluster from '../cluster.js'
import * as nfts from '../models/nfts.js'
import * as pins from '../models/pins.js'
import * as pinataQueue from '../models/pinata-queue.js'
import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth.js'
import { debug } from '../utils/debug.js'
import * as constants from '../constants.js'

const log = debug('nfts-upload')
const LOCAL_ADD_THRESHOLD = constants.cluster.localAddThreshold

/**
 * @typedef {import('../bindings').NFT} NFT
 */

/** @type {import('../utils/router.js').Handler} */
export async function upload(event, ctx) {
  const { headers } = event.request
  const contentType = headers.get('content-type') || ''
  const { user, tokenName } = await validate(event, ctx)

  /** @type {NFT} */
  let nft
  let nftSize = 0
  const created = new Date().toISOString()

  if (contentType.includes('multipart/form-data')) {
    const form = await event.request.formData()
    // Our API schema requires that all file parts be named `file` and
    // encoded as binary, which is why we can expect that each part here is
    // a file (and not a stirng).
    const files = /** @type {File[]} */ (form.getAll('file'))

    const dirSize = files.reduce((total, f) => total + f.size, 0)
    const dir = await cluster.addDirectory(files, {
      local: dirSize > LOCAL_ADD_THRESHOLD,
    })
    const { cid, size } = dir[dir.length - 1]
    nft = {
      cid,
      created,
      type: 'directory',
      scope: tokenName,
      files: files.map((f) => ({
        name: f.name,
        type: f.type,
      })),
    }
    nftSize = size
  } else {
    const blob = await event.request.blob()
    if (blob.size === 0) {
      throw new HTTPError('Empty payload', 400)
    }
    const isCar = contentType.includes('application/car')
    const addOptions = {
      // When >2.5MB, use local add, because waiting for blocks to be sent to
      // other cluster nodes can take a long time. Replication to other nodes
      // will be done async by bitswap instead.
      local: blob.size > LOCAL_ADD_THRESHOLD,
    }

    // cluster returns `bytes` rather than `size` when upload is a CAR.
    const { cid, size, bytes } = isCar
      ? await cluster.addCar(blob, addOptions)
      : await cluster.add(blob, addOptions)

    nft = {
      cid,
      created,
      type: blob.type,
      scope: tokenName,
      files: [],
    }
    nftSize = size || bytes
  }

  let pin = await pins.get(nft.cid)
  if (!pin) {
    pin = { cid: nft.cid, status: 'queued', size: nftSize, created }
    await pins.set(nft.cid, pin)
  }

  const existingNft = await nfts.get({ user, cid: nft.cid })
  if (existingNft) {
    /** @type {import('../bindings').NFTResponse} */
    const res = {
      ...existingNft,
      size: pin.size,
      pin: { ...(existingNft.pin || {}), ...pin },
      deals: [],
    }
    return new JSONResponse({ ok: true, value: res })
  }

  await nfts.set({ user, cid: nft.cid }, nft, pin)

  /** @type {import('../bindings').NFTResponse} */
  const res = { ...nft, size: pin.size, pin, deals: [] }

  event.waitUntil(pinataQueue.add(nft.cid, { origins: cluster.delegates() }))

  return new JSONResponse({ ok: true, value: res })
}
