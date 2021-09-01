import { HTTPError } from '../errors.js'
import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth-v1.js'

/**
 * @typedef {import('../bindings').Deal} Deal
 */

/** @type {import('../utils/router.js').Handler} */
export const statusV1 = async (event, ctx) => {
  const { params } = ctx
  const { user, supa } = await validate(event, ctx)

  const nft = await supa.getUpload(params.cid, user.issuer)
  if (nft) {
    return new JSONResponse({ ok: true, value: nft })
  } else {
    throw new HTTPError('NFT not found', 404)
  }
}
