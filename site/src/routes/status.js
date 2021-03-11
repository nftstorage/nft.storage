import { HTTPError } from '../errors.js'
import { verifyToken, parseRequestCID } from '../utils/utils.js'
import * as nfts from "../models/nfts.js"

/**
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
export const status = async event => {
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


  const status = await nfts.get({ user, cid })
  if (status) {
    return new Response(JSON.stringify({
      ok: true,
      value: status
    }), {
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    })
  } else {
    return new Response(JSON.stringify({
      ok: false,
      error: { message: `NFT with a CID ${cid} not found` }
    }), {
      status: 404,
      headers: {
        'content-type': 'application/json;charset=UTF-8'
      }
    })
  }
}
