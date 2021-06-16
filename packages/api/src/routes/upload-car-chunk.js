import { HTTPError } from '../errors.js'
import * as cluster from '../cluster.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../utils/router.js').Handler} */
export async function uploadCarChunk(event) {
  const { headers } = event.request
  const contentType = headers.get('content-type') || ''

  const blob = await event.request.blob()
  if (blob.size === 0) {
    throw new HTTPError('Empty payload', 400)
  }
  // Ensure car blob.type is set; it is used by the cluster client to set the foramt=car flag on the /add call.
  const content = contentType.includes('application/car')
    ? blob.slice(0, blob.size, 'application/car')
    : blob

  // { cid, bytes }
  const value = await cluster.add(content, {
    expireAt: new Date(Date.now() + 2 * 3600 * 1000), // 2 Hours
  })

  return new JSONResponse({ ok: true, value })
}
