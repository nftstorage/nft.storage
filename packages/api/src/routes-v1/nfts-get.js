import { HTTPError } from '../errors.js'
import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth-v1.js'
import { toNFTResponse } from '../utils/db-client.js'

/**
 * @typedef {import('../bindings').Deal} Deal
 */

/** @type {import('../utils/router.js').Handler} */
export const statusV1 = async (event, ctx) => {
  const { params } = ctx
  const { user, db } = await validate(event, ctx)

  const nft = await db.getUpload(params.cid, user.issuer)
  if (nft) {
    return new JSONResponse({ ok: true, value: toNFTResponse(nft) })
  } else {
    throw new HTTPError('NFT not found', 404)
  }
}
