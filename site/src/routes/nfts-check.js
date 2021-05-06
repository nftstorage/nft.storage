import { JSONResponse } from '../utils/json-response.js'
import { get as getDeals } from '../models/deals.js'
import * as pins from '../models/pins.js'
import { HTTPError } from '../errors.js'

/**
 * @param {FetchEvent} event
 * @param {Record<string,string>} params
 */
export const check = async (event, params) => {
  const { cid } = params
  const [pin, deals] = await Promise.all([pins.get(cid), getDeals(cid)])
  if (!pin) {
    throw new HTTPError('NFT not found', 404)
  }
  return new JSONResponse({ ok: true, value: { cid, pin, deals } })
}
