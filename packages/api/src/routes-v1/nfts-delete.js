import { HTTPError } from '../errors.js'
import { validate } from '../utils/auth-v1.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../utils/router.js').Handler} */
export const nftDeleteV1 = async (event, ctx) => {
  const { db, user } = await validate(event, ctx)
  const { params } = ctx

  const data = await db.deleteUpload(params.cid, user.issuer)

  if (data && data.length > 0) {
    return new JSONResponse({
      ok: true,
    })
  } else {
    throw new HTTPError('NFT not found', 404)
  }
}
