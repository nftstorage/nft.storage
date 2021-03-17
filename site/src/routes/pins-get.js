import { HTTPError } from '../errors.js'
import { verifyToken } from '../utils/utils.js'
import * as PinataPSA from '../pinata-psa.js'
import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'

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
    let text
    try {
      text = await res.error.text()
      return new JSONResponse(JSON.parse(text))
    } catch (_) {
      throw new Error(`getting pin request ${params.requestid} status: ${res.error.status} response: ${text}`)
    }
  }

  const pinStatus = res.value
  if (!pinStatus.pin.meta || pinStatus.pin.meta.sub !== user.sub) {
    return new JSONResponse({ error: { reason: 'NOT_FOUND', details: 'pin not found' } }, { status: 404 })
  }

  return new JSONResponse(pinStatus)
}
