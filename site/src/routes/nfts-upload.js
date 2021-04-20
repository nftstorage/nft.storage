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
    event.waitUntil(pinata.pinFiles(parts, user))
    const dir = await cluster.addDirectory(parts, user)
    const { cid, size } = dir[dir.length - 1]
    const created = new Date()
    /** @type {NFT} */
    let data = {
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
    const result = await nfts.set({ user, cid }, data, {
      metadata: { pinStatus: 'pinned', size },
    })
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
    event.waitUntil(pinata.pinFile(blob, user))
    const { cid, size } = await cluster.add(blob, user)
    const created = new Date()
    /** @type {NFT} */
    const data = {
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
    const result = await nfts.set({ user, cid }, data, {
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
