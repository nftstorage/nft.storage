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
export async function pinsReplace (event, params) {
  const result = await verifyToken(event)
  if (!result.ok) {
    return HTTPError.respond(result.error)
  }
  const { user, tokenName } = result

  let res = await PinataPSA.pinsGet(params.requestid)
  if (!res.ok) {
    return PinataPSA.parseErrorResponse(res.error)
  }

  let pinStatus = res.value
  if (!pinStatus.pin.meta || pinStatus.pin.meta.sub !== user.sub) {
    return new JSONResponse({ error: { reason: 'NOT_FOUND', details: 'pin not found' } }, { status: 404 })
  }

  const prevCid = pinStatus.pin.cid

  const pinData = await event.request.json()
  pinData.meta = (pinData.meta != null && typeof pinData.meta === 'object') ? pinData.meta : {}
  pinData.meta.sub = user.sub

  res = await PinataPSA.pinsReplace(params.requestid, pinData)
  if (!res.ok) {
    return PinataPSA.parseErrorResponse(res.error)
  }

  pinStatus = res.value

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
  await Promise.all([
    nfts.set({ user, cid: pinStatus.pin.cid }, nft),
    nfts.remove({ user, cid: prevCid })
  ])

  return new JSONResponse(pinStatus)
}
