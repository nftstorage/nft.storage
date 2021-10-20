import { HTTPError } from '../errors.js'
import { get as getNft } from '../models/nfts.js'
import { JSONResponse } from '../utils/json-response.js'
import { get as getDeals } from '../models/deals.js'
import { get as getPin } from '../models/pins.js'
import { validate } from '../utils/auth.js'

/**
 * @typedef {import('../bindings').Deal} Deal
 */

/** @type {import('../bindings').Handler} */
export const status = async (event, ctx) => {
  const { params } = ctx
  const { user } = await validate(event, ctx)

  const [nft, pin, deals] = await Promise.all([
    getNft({ user, cid: params.cid }),
    getPin(params.cid),
    getDeals(params.cid),
  ])

  if (nft == null) {
    throw new HTTPError('NFT not found', 404)
  }

  if (pin == null) {
    throw new HTTPError('Pin not found', 404)
  }

  /** @type {import('../bindings').NFTResponse} */
  const res = {
    ...nft,
    size: pin.size,
    pin: { ...(nft.pin || {}), ...pin },
    deals,
  }

  return new JSONResponse({ ok: true, value: res })
}
