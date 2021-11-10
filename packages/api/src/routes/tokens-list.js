import { validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import { tokens } from '../models/users.js'

/** @type {import('../bindings').Handler} */
export const tokensList = async (event, ctx) => {
  const { user } = await validate(event, ctx)

  return new JSONResponse({
    ok: true,
    value: await tokens(user.issuer),
  })
}
