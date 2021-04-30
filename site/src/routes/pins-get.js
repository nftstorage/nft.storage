import * as PinataPSA from '../pinata-psa.js'
import { validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'
import * as pins from '../models/pins.js'
import * as cluster from '../cluster.js'

/**
 * @param {FetchEvent} event
 * @param {Record<string,string>} params
 * @returns {Promise<JSONResponse>}
 */
export async function pinsGet(event, params) {
  const result = await validate(event)
  const { user } = result

  let cid = params.requestid
  let nft = await nfts.get({ user, cid })

  if (!nft) {
    // maybe this is an old Pinata pin?
    const res = await PinataPSA.pinsGet(params.requestid)
    if (res.ok) {
      cid = res.value.pin.cid
      nft = await nfts.get({ user, cid })
    }
  }

  if (!nft) {
    return new JSONResponse(
      { error: { reason: 'NOT_FOUND', details: 'NFT not found' } },
      { status: 404 }
    )
  }

  const pin = await pins.get(cid)
  if (!nft) {
    return new JSONResponse(
      { error: { reason: 'NOT_FOUND', details: 'pin not found' } },
      { status: 404 }
    )
  }

  /** @type import('../pinata-psa').PinStatus */
  const pinStatus = {
    requestid: nft.cid,
    status: pin.status,
    created: nft.created,
    pin: { cid: nft.cid, ...(nft.pin || {}) },
    delegates: cluster.delegates(),
  }

  return new JSONResponse(pinStatus)
}
