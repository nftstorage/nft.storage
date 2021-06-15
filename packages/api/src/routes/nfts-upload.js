import { HTTPError } from '../errors.js'
import { toFormData } from '../utils/form-data.js'
import * as cluster from '../cluster.js'
import * as nfts from '../models/nfts.js'
import * as pins from '../models/pins.js'
import * as pinataQueue from '../models/pinata-queue.js'
import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth.js'
import { debug } from '../utils/debug.js'

const log = debug('nfts-upload')

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
    const form = await toFormData(event.request)
    // Our API schema requires that all file parts be named `file` and
    // encoded as binary, which is why we can expect that each part here is
    // a file (and not a stirng).
    const files = /** @type {File[]} */ (form.getAll('file'))
    const dir = await cluster.addDirectory(files)
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
    // Ensure car blob.type is set; it is used by the cluster client to set the foramt=car flag on the /add call.
    const content = contentType.includes('application/car')
      ? blob.slice(0, blob.size, 'application/car')
      : blob
    // cluster returns `bytes` rather than `size` when upload is a CAR.
    const { cid, size, bytes } = await cluster.add(content)
    nft = {
      cid,
      created,
      type: content.type,
      scope: tokenName,
      files: [],
    }
    nftSize = size || bytes
  }

  let pin = await pins.get(nft.cid)
  if (!pin || pin.status !== 'pinned') {
    pin = { cid: nft.cid, status: 'pinned', size: nftSize, created }
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
