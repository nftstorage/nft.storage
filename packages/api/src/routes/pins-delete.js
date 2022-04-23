import { JSONResponse } from '../utils/json-response.js'
import { checkAuth, validate } from '../utils/auth.js'
import { parseCidPinning } from '../utils/utils.js'

/** @type {import('../bindings').Handler} */
export async function pinsDelete(event, ctx) {
  const { params } = ctx
  const { user, db } = checkAuth(ctx)

  const cid = parseCidPinning(params.requestid)
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

  const data = await db.deleteUpload(cid.sourceCid, user.id)
  if (data) {
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
