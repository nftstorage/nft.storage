import { HTTPError } from '../errors.js'
import { checkAuth } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import { parseCid } from '../utils/utils.js'

/** @type {import('../bindings').Handler} */
export const nftDelete = async (event, ctx) => {
  const { user } = checkAuth(ctx)
  const { params, db } = ctx
  const cid = parseCid(params.cid)

  const data = await db.deleteUpload(cid.sourceCid, user.id)

  if (data) {
    return new JSONResponse(
      {
        ok: true,
      },
      { status: 202 }
    )
  } else {
    throw new HTTPError('NFT not found', 404)
  }
}
