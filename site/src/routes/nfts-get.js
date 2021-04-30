import { HTTPError } from '../errors.js'
import { get as getNft } from '../models/nfts.js'
import { JSONResponse } from '../utils/json-response.js'
import { get as getDeals } from '../models/deals.js'
import { get as getPin } from '../models/pins.js'
import { validate } from '../utils/auth.js'

/**
 * @typedef {import('../bindings').Deal} Deal
 */

/**
 * @param {FetchEvent} event
 * @param {Record<string,string>} params
 */
export const status = async (event, params) => {
  const auth = await validate(event)
  const user = auth.user

  const [nft, pin, deals] = await Promise.all([
    getNft({ user, cid: params.cid }),
    getPin(params.cid),
    getDeals(params.cid),
  ])

  if (nft == null) {
    return HTTPError.respond(new HTTPError('NFT not found', 404))
  }

  if (pin == null) {
    return HTTPError.respond(new HTTPError('pin not found', 404))
  }

  return new JSONResponse({
    ok: true,
    value: { ...nft, size: pin.size, pin, deals },
  })
}
