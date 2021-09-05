import { validate } from '../utils/auth-v1.js'
import { JSONResponse } from '../utils/json-response.js'
import * as cluster from '../cluster.js'

/** @type {import('../utils/router.js').Handler} */
export async function pinsGetV1(event, ctx) {
  const { params } = ctx
  const { user, db } = await validate(event, ctx)

  let cid = params.requestid

  const upload = await db.getUpload(cid, user.issuer)

  if (!upload) {
    return new JSONResponse(
      { error: { reason: 'NOT_FOUND', details: 'pin not found' } },
      { status: 404 }
    )
  }

  /** @type import('../bindings').PinsResponse */
  const pinStatus = {
    requestid: upload.cid,
    status: upload.content.pin[0].status,
    created: upload.inserted_at,
    pin: {
      cid: upload.cid,
      meta: upload.meta,
      name: upload.name,
      origins: upload.origins,
    },
    delegates: cluster.delegates(),
  }

  return new JSONResponse(pinStatus)
}
