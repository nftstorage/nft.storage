import { checkAuth, validate } from '../utils/auth.js'
import { toPinsResponse } from '../utils/db-transforms.js'
import { JSONResponse } from '../utils/json-response.js'
import { parseCidPinning } from '../utils/utils.js'

/** @type {import('../bindings').Handler} */
export async function pinsGet(event, ctx) {
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

  const upload = await db.getUpload(cid.sourceCid, user.id)

  if (!upload) {
    return new JSONResponse(
      { error: { reason: 'NOT_FOUND', details: 'pin not found' } },
      { status: 404 }
    )
  }

  return new JSONResponse(toPinsResponse(upload))
}
