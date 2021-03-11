import { HTTPError } from '../errors.js'
import { verifyToken, parseRequestCID } from '../utils/utils.js'
import * as nfts from "../models/nfts.js"

/**
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
export const remove = async event => {
  const authResult = await verifyToken(event)
  if (!authResult.ok) {
    return HTTPError.respond(authResult.error)
  }
  const user = authResult.value
  const parseResult = parseRequestCID(event.request)
  if (!parseResult.ok) {
    return HTTPError.respond(parseResult.error)
  }
  const cid = parseResult.value


  await nfts.remove({ user, cid })
  // TODO: We need to unpin from pinata as well, however we need to make
  // no other user has pinned same CID, which makes me wonder if KV store
  // has eventual or strong consistency. If former we might have problems.

  return new Response(JSON.stringify({
    ok: true
  }), {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })
}
