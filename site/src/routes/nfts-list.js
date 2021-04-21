import { HTTPError } from '../errors.js'
import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'
import { validate } from '../utils/auth.js'

/**
 * @param {FetchEvent} event
 */
export async function list(event) {
  const auth = await validate(event)

  return new JSONResponse({
    ok: true,
    value: await nfts.list(auth.user.sub),
  })
}
