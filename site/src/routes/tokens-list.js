import { validate } from '../utils/auth'
import { JSONResponse } from '../utils/json-response'
import { tokens } from './../models/users'

/** @type {import('../utils/router.js').Handler} */
export const tokensList = async (event, ctx) => {
  const { user } = await validate(event, ctx)

  return new JSONResponse({
    ok: true,
    value: await tokens(user.issuer),
  })
}
