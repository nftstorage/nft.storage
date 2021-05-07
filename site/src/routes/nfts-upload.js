import { HTTPError } from '../errors.js'
import { toFormData } from '../utils/form-data.js'
import * as pinata from '../pinata.js'
import * as cluster from '../cluster.js'
import * as nfts from '../models/nfts.js'
import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth.js'

/**
 * @typedef {import('../bindings').NFT} NFT
 */

/**
 * @param {FetchEvent} event
 */
export async function upload(event) {
  const { headers } = event.request
  const contentType = headers.get('content-type') || ''
  const { user, tokenName } = await validate(event)

  if (contentType.includes('multipart/form-data')) {
    const form = await toFormData(event.request)
    // Our API schema requires that all file parts be named `file` and
    // encoded as binary, which is why we can expect that each part here is
    // a file (and not a stirng).
    const files = /** @type {File[]} */ (form.getAll('file'))
    const dir = await cluster.addDirectory(files)
    const { cid, size } = dir[dir.length - 1]
    event.waitUntil(
      (async () => {
        try {
          await pinata.pinByHash(cid, {
            pinataOptions: { hostNodes: cluster.delegates() },
            pinataMetadata: { name: `${user.nickname}-${Date.now()}` },
          })
        } catch (err) {
          console.error(err)
        }
      })()
    )
    const created = new Date()
    /** @type {NFT} */
    const nft = {
      cid,
      size: size,
      created: created.toISOString(),
      type: 'directory',
      scope: tokenName,
      files: files.map((f) => ({
        name: f.name,
        type: f.type,
      })),
      pin: {
        cid,
        size,
        status: 'pinned',
        created: created.toISOString(),
      },
    }
    const metadata = {
      pinStatus: 'pinned',
      size,
      created: created.toISOString(),
    }
    const result = await nfts.set({ user, cid }, nft, { metadata })
    return new JSONResponse({
      ok: true,
      value: {
        ...result,
        deals: { status: 'ongoing', deals: [] },
      },
    })
  } else {
    const blob = await event.request.blob()
    if (blob.size === 0) {
      return HTTPError.respond(new HTTPError('Empty payload', 400))
    }
    const { cid, size } = await cluster.add(blob)
    event.waitUntil(
      (async () => {
        try {
          await pinata.pinByHash(cid, {
            pinataOptions: { hostNodes: cluster.delegates() },
            pinataMetadata: { name: `${user.nickname}-${Date.now()}` },
          })
        } catch (err) {
          console.error(err)
        }
      })()
    )
    const created = new Date()
    /** @type {NFT} */
    const nft = {
      cid,
      size: blob.size,
      created: created.toISOString(),
      type: blob.type,
      scope: tokenName,
      files: [],
      pin: {
        cid,
        // @ts-ignore
        size,
        status: 'pinned',
        created: created.toISOString(),
      },
    }
    const result = await nfts.set({ user, cid }, nft, {
      metadata: {
        pinStatus: 'pinned',
        size: blob.size,
        created: created.toISOString(),
      },
    })

    return new JSONResponse({
      ok: true,
      value: {
        ...result,
        deals: { status: 'ongoing', deals: [] },
      },
    })
  }
}
