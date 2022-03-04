import { validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../bindings').Handler} */
export const userUcan = async (event, ctx) => {
  const { user } = await validate(event, ctx)
  const { db, ucanService } = ctx

  return new JSONResponse({
    ok: true,
    value: await ucanService.ucan(user.did),
  })
}
