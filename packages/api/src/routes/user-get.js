import { HTTPError } from '../errors.js'
import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth.js'
import { parseCid } from '../utils/utils.js'
import { toNFTResponse } from '../utils/db-transforms.js'

/**
 * @typedef {import('../bindings').Deal} Deal
 */

/** @type {import('../bindings').Handler} */
export const userGet = async (event, ctx) => {
  const { user } = await validate(event, ctx)
  return new JSONResponse({
    ok: true,
    value: user,
  })
}
