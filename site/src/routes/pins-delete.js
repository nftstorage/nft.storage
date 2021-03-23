import { HTTPError } from '../errors.js'
import { verifyToken } from '../utils/utils.js'
import * as PinataPSA from '../pinata-psa.js'
import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'

/**
 * @param {FetchEvent} event
 * @param {Record<string,string>} params
 * @returns {Promise<Response>}
 */
export async function pinsDelete (event, params) {
  const result = await verifyToken(event)
  if (!result.ok) {
    return HTTPError.respond(result.error)
  }
  const { user } = result

  const res0 = await PinataPSA.pinsGet(params.requestid)
  if (!res0.ok) {
    return PinataPSA.parseErrorResponse(res0.error)
  }

  const pinStatus = res0.value
  if (!pinStatus.pin.meta || pinStatus.pin.meta.sub !== user.sub) {
    return new JSONResponse({ error: { reason: 'NOT_FOUND', details: 'pin not found' } }, { status: 404 })
  }

  const res1 = await PinataPSA.pinsDelete(params.requestid)
  if (!res1.ok) {
    return PinataPSA.parseErrorResponse(res1.error)
  }

  await nfts.remove({ user, cid: pinStatus.pin.cid })

  return new Response()
}
