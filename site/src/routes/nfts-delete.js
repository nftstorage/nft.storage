import { HTTPError } from '../errors.js'
import { verifyToken } from '../utils/utils.js'
import * as nfts from '../models/nfts.js'
import { JSONResponse } from '../utils/json-response.js'

/**
 * @param {FetchEvent} event
 * @param {Record<string,string>} params
 * @returns {Promise<Response>}
 */
export const remove = async (event, params) => {
  const token = await verifyToken(event)
  if (!token.ok) {
    return HTTPError.respond(token.error)
  }
  const user = token.user

  await nfts.remove({ user, cid: params.cid })
  // TODO: We need to unpin from pinata as well, however we need to make
  // no other user has pinned same CID, which makes me wonder if KV store
  // has eventual or strong consistency. If former we might have problems.

  return new JSONResponse({
    ok: true,
  })
}
