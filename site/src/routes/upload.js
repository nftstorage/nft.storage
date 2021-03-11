import { HTTPError } from '../errors.js'
import { verifyToken, hash } from '../utils/utils.js'
import { parseMultipart } from '../utils/multipart/index.js'
import * as pinata from '../pinata.js'
import * as nfts from "../models/nfts.js"

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
  const user = result.value

  if (contentType.includes('multipart/form-data')) {
    const boundary = contentType.split('boundary=')[1].trim()
    const parts = await parseMultipart(event.request.body, boundary)
    const files = []
    for (const file of parts) {
      const h = await hash(file.data)
      files.push({
        name: file.filename,
        size: file.data.byteLength,
        type: file.contentType,
        hash: h,
      })
    }
    return new Response(JSON.stringify(files), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    })
  } else {
    const blob = await event.request.blob()
    const pin = await pinata.pinFile(blob)
    if (pin.ok) {
      const { IpfsHash: cid, Timestamp: created } = pin.value
      // 
      if (await nfts.has({ user, cid })) {
        await nfts.set({ user, cid }, {
          cid,
          deals: { status: 'ongoing', deals: [] },
          pin: {
            cid,
            status: "pinned",
            // @ts-expect-error - TODO: Define encoded types.
            created
          },
          // @ts-expect-error - TODO: Define encoded types.
          created
        })
      }


      return new Response(JSON.stringify({ ok: true, value: { cid } }), {
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
        }
      )
    } else {
      return HTTPError.respond(new HTTPError(pin.error.statusText))
    }
  }
}
