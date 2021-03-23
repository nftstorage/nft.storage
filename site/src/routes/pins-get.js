import { HTTPError } from '../errors.js'
import { verifyToken } from '../utils/utils.js'
import * as PinataPSA from '../pinata-psa.js'
import { JSONResponse } from '../utils/json-response.js'

/**
 * @param {FetchEvent} event
 * @param {Record<string,string>} params
 * @returns {Promise<JSONResponse>}
 */
export async function pinsGet (event, params) {
  const result = await verifyToken(event)
  if (!result.ok) {
    return HTTPError.respond(result.error)
  }
  const { user } = result
  const res = await PinataPSA.pinsGet(params.requestid)

  if (!res.ok) {
    return PinataPSA.parseErrorResponse(res.error)
  }

  const pinStatus = res.value
  if (!pinStatus.pin.meta || pinStatus.pin.meta.sub !== user.sub) {
    return new JSONResponse({ error: { reason: 'NOT_FOUND', details: 'pin not found' } }, { status: 404 })
  }

  return new JSONResponse(pinStatus)
}
