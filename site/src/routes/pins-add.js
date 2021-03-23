import { HTTPError } from '../errors.js'
import { verifyToken } from '../utils/utils.js'
import * as PinataPSA from '../pinata-psa.js'
import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'

/**
 * @param {FetchEvent} event
 * @returns {Promise<JSONResponse>}
 */
export async function pinsAdd (event) {
  const result = await verifyToken(event)
  if (!result.ok) {
    return HTTPError.respond(result.error)
  }
  const { user, tokenName } = result
  const pinData = await event.request.json()
  pinData.meta = pinData.meta || {}
  pinData.meta.sub = user.sub

  const res = await PinataPSA.pinsAdd(pinData)
  if (!res.ok) {
    return PinataPSA.parseErrorResponse(res.error)
  }

  const pinStatus = res.value

  const nft = {
    cid: pinStatus.pin.cid,
    size: 0,
    created: new Date().toISOString(),
    type: 'remote',
    scope: tokenName,
    files: [],
    pin: {
      cid: pinStatus.pin.cid,
      size: 0,
      status: pinStatus.status,
      created: pinStatus.created
    }
  }
  await nfts.set({ user, cid: pinStatus.pin.cid }, nft)

  return new JSONResponse(pinStatus)
}
