import { HTTPError } from '../errors.js'
import { JSONResponse } from '../utils/json-response.js'
import { checkAuth, validate } from '../utils/auth.js'
import { parseCid } from '../utils/utils.js'
import { toNFTResponse } from '../utils/db-transforms.js'

/**
 * @typedef {import('../bindings').Deal} Deal
 */

/** @type {import('../bindings').Handler} */
export const nftGet = async (event, ctx) => {
  const { params, db } = ctx
  const { user } = checkAuth(ctx)
  const cid = parseCid(params.cid)
  const nft = await db.getUpload(cid.sourceCid, user.id)
  if (nft) {
    return new JSONResponse({
      ok: true,
      value: toNFTResponse(nft, cid.sourceCid),
    })
  } else {
    throw new HTTPError('NFT not found', 404)
  }
}
