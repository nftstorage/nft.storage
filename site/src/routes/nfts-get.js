import { HTTPError } from '../errors.js'
import { get as getNft } from '../models/nfts.js'
import { JSONResponse } from '../utils/json-response.js'
import { get as getDeals } from '../models/deals.js'
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

  const [nft, deals] = await Promise.all([
    getNft({ user, cid: params.cid }),
    getDeals(params.cid),
  ])

  if (nft == null) {
    return HTTPError.respond(new HTTPError('not found', 404))
  }

  return new JSONResponse({
    ok: true,
    value: {
      ...nft,
      deals: { status: getOverallDealStatus(deals), deals },
    },
  })
}

/**
 * @param {Deal[]} deals
 * @returns {'ongoing'|'finalized'}
 */
function getOverallDealStatus(deals) {
  if (!deals.length) return 'ongoing'
  return deals.some((d) => d.status !== 'active') ? 'ongoing' : 'finalized'
}
