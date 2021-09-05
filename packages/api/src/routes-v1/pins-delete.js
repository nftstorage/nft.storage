import * as PinataPSA from '../pinata-psa.js'
import { JSONResponse } from '../utils/json-response.js'
import * as nfts from '../models/nfts.js'
import { validate } from '../utils/auth-v1.js'

/** @type {import('../utils/router.js').Handler} */
export async function pinsDeleteV1(event, ctx) {
  const { params } = ctx
  const { user, db } = await validate(event, ctx)
  let cid = params.requestid

  const data = await db.deleteUpload(cid, user.issuer)
  if (data && data.length > 0) {
    return new JSONResponse(undefined, { status: 202 })
  } else {
    return new JSONResponse(
      {
        error: {
          reason: 'The specified resource was not found',
        },
      },
      { status: 404 }
    )
  }
}
