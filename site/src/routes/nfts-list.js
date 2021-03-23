import { HTTPError } from '../errors.js'
import { JSONResponse } from '../utils/json-response.js'
import { verifyToken } from '../utils/utils.js'
import * as nfts from '../models/nfts.js'

/**
 * @param {FetchEvent} event
 */
export async function list(event) {
  const token = await verifyToken(event)
  if (!token.ok) {
    return HTTPError.respond(token.error)
  }
  const user = token.user

  return new JSONResponse({
    ok: true,
    value: await nfts.list(user.sub),
  })
}
