import { ErrorDIDNotFound } from '../errors.js'
import { checkAuth, validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../bindings').Handler} */
export const ucanToken = async (_, ctx) => {
  const { user, type, ucan } = checkAuth(ctx)
  const { ucanService } = ctx

  if (!user.did) {
    throw new ErrorDIDNotFound()
  }

  if (type === 'ucan' && typeof ucan === 'object') {
    return new JSONResponse({
      ok: true,
      value: await ucanService.refresh(ucan.token, user.did),
    })
  }

  if (type === 'key') {
    return new JSONResponse({
      ok: true,
      value: await ucanService.ucan(user.did),
    })
  }

  return new JSONResponse(
    {
      ok: true,
      error: {
        code: 'ERROR_UNSUPPORTED_AUTH_METHOD',
        message: 'Session auth is not supported in this endpoint.',
      },
    },
    { status: 400 }
  )
}
