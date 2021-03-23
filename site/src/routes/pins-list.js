import { HTTPError } from '../errors.js'
import { verifyToken } from '../utils/utils.js'
import * as PinataPSA from '../pinata-psa.js'
import { JSONResponse } from '../utils/json-response.js'

/**
 * @param {FetchEvent} event
 * @returns {Promise<JSONResponse>}
 */
export async function pinsList (event) {
  const result = await verifyToken(event)
  if (!result.ok) {
    return HTTPError.respond(result.error)
  }
  const { user } = result
  const { searchParams } = new URL(event.request.url)

  const options = Object.fromEntries(searchParams.entries())
  if (options.meta) {
    let meta
    try {
      meta = JSON.parse(options.meta)
      if (meta == null || typeof meta !== 'object') {
        throw new Error('invalid meta')
      }
    } catch (_) {
      meta = {}
    }
    options.meta = JSON.stringify({ ...meta, sub: user.sub })
  } else {
    options.meta = JSON.stringify({ sub: user.sub })
  }

  const res = await PinataPSA.pinsList(options)
  if (!res.ok) {
    return PinataPSA.parseErrorResponse(res.error)
  }

  return new JSONResponse(res.value)
}
