import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth-v1.js'
import { parseCidPinning } from '../utils/utils.js'

/** @type {import('../utils/router.js').Handler} */
export async function pinsDeleteV1(event, ctx) {
  const { params } = ctx
  const { user, db } = await validate(event, ctx)

  let cid = parseCidPinning(params.requestid)
  if (!cid) {
    return new JSONResponse(
      {
        error: {
          reason: 'ERROR_INVALID_REQUEST_ID',
          details: `Invalid request id: ${params.requestid}`,
        },
      },
      { status: 400 }
    )
  }

  const data = await db.deleteUpload(cid.contentCid, user.id)
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
