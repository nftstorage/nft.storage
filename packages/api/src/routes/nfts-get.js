import { HTTPError } from '../errors.js'
import { JSONResponse } from '../utils/json-response.js'
import { checkAuth, validate } from '../utils/auth.js'
import { parseCid } from '../utils/utils.js'
import { toNFTResponse } from '../utils/db-transforms.js'
import { getW3upDeals } from '../utils/w3up.js'

/**
 * @typedef {import('../bindings').Deal} Deal
 */

/** @type {import('../bindings').Handler} */
export const nftGet = async (event, ctx) => {
  const { params, db } = ctx
  const { user } = checkAuth(ctx)
  const cid = parseCid(params.cid)
  const [nft, w3upDeals] = await Promise.all([
    db.getUpload(cid.sourceCid, user.id),
    ctx.w3up ? getW3upDeals(ctx.w3up, cid.contentCid) : [],
  ])
  if (nft) {
    // merge deals from dagcargo with deals from w3up
    nft.deals = [...nft?.deals, ...(w3upDeals || [])]
    return new JSONResponse({
      ok: true,
      value: toNFTResponse(nft, cid.sourceCid),
    })
  } else {
    throw new HTTPError('NFT not found', 404)
  }
}
