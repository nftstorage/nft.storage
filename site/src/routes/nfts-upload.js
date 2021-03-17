import { HTTPError } from '../errors.js'
import { verifyToken } from '../utils/utils.js'
import { parseMultipart } from '../utils/multipart/index.js'
import * as pinata from '../pinata.js'
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
  const {user, tokenName} = result

  if (contentType.includes('multipart/form-data')) {
    const boundary = contentType.split('boundary=')[1].trim()
    const parts = await parseMultipart(event.request.body, boundary)
    const pin = await pinata.pinFiles(parts, user)
    if (pin.ok) {
      const { IpfsHash: cid, Timestamp: created, PinSize: size } = pin.value
      /** @type {NFT} */
      let data = {
        cid,
        size,
        created: new Date(),
        type: 'directory',
        scope: tokenName,
        files: parts.map((f) => ({ name: f.filename, type: f.contentType })),
        pin: {
          cid,
          size,
          status: 'pinned',
          // @ts-expect-error - TODO: Define encoded types.
          created,
        },
      }
      const result = await nfts.set({ user, cid }, data)
      return new JSONResponse({
        ok: true,
        value: {
          ...Object.assign(result, { deals: { status: 'ongoing', deals: [] } }),
          links: {
            ipfs: `ipfs://${cid}`,
            http: `https://${cid}.ipfs.dweb.link`,
            files: parts.map((f) => ({
              ipfs: `ipfs://${cid}/${f.filename}`,
              http: `https://${cid}.ipfs.dweb.link/${f.filename}`,
            })),
          },
        },
      })
    } else {
      return HTTPError.respond(new HTTPError(pin.error.statusText))
    }
  } else {
    const blob = await event.request.blob()
    if (blob.size === 0) {
      return HTTPError.respond(new HTTPError('Empty payload', 400))
    }
    const pin = await pinata.pinFile(blob, user)
    if (pin.ok) {
      const { IpfsHash: cid, Timestamp: created, PinSize: size } = pin.value
      /** @type {NFT} */
      let data = {
        cid,
        size: blob.size,
        created: new Date(),
        type: blob.type,
        scope: tokenName,
        files: [],
        pin: {
          cid,
          size,
          status: 'pinned',
          // @ts-expect-error - TODO: Define encoded types.
          created,
        },
      }
      const result = await nfts.set({ user, cid }, data)

      return new JSONResponse({
        ok: true,
        value: {
          ...Object.assign(result, { deals: { status: 'ongoing', deals: [] } }),
          links: {
            ipfs: `ipfs://${cid}`,
            http: `https://${cid}.ipfs.dweb.link`,
          },
        },
      })
    } else {
      return HTTPError.respond(new HTTPError(pin.error.statusText))
    }
  }
}
