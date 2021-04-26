import { HTTPError } from '../errors.js'
import { verifyToken } from '../utils/utils.js'
import { parseMultipart } from '../utils/multipart/index.js'
import * as pinata from '../pinata.js'
import * as cluster from '../cluster.js'
import * as nfts from '../models/nfts.js'
import { JSONResponse } from '../utils/json-response.js'

/**
 * @typedef {import('../bindings').NFT} NFT
 */

/**
 * @param {FetchEvent} event
 */
export async function upload(event) {
  const { headers } = event.request
  const contentType = headers.get('content-type') || ''
  const result = await verifyToken(event)
  if (!result.ok) {
    return HTTPError.respond(result.error)
  }
  const { user, tokenName } = result

  if (contentType.includes('multipart/form-data')) {
    const boundary = contentType.split('boundary=')[1].trim()
    const parts = await parseMultipart(event.request.body, boundary)
    const dir = await cluster.addDirectory(parts)
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
      // @ts-ignore
      size,
      created: created.toISOString(),
      type: 'directory',
      scope: tokenName,
      files: parts.map((f) => ({
        name: f.filename || f.name,
        type: f.contentType,
      })),
      pin: {
        cid,
        // @ts-ignore
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
      created: new Date().toISOString(),
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
      metadata: { pinStatus: 'pinned', size: blob.size },
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
