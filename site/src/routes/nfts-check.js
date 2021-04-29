import { JSONResponse } from '../utils/json-response.js'
import { get as getDeals } from '../models/deals.js'
import * as cluster from '../cluster.js'
import { HTTPError } from '../errors.js'

/**
 * @typedef {import('../bindings').Deal} Deal
 */

/**
 * @param {FetchEvent} event
 * @param {Record<string,string>} params
 */
export const check = async (event, params) => {
  const { cid } = params

  /** @type {import('@nftstorage/ipfs-cluster').StatusResponse} */
  let status
  /** @type {Deal[]} */
  let deals
  try {
    ;[status, deals] = await Promise.all([cluster.status(cid), getDeals(cid)])
  } catch (err) {
    if (err.response && err.response.status === 404) {
      return HTTPError.respond(new HTTPError('not found', 404))
    }
    throw err
  }

  return new JSONResponse({
    ok: true,
    value: { pin: { status: cluster.toPSAStatus(status) }, deals },
  })
}
