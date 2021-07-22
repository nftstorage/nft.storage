import { validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../utils/router.js').Handler} */
export const tokensList = async (event, ctx) => {
  const { fauna, login } = await validate(event, ctx)

  const { findUserByID } = await fauna.getUser({
    id: login.ref,
  })

  return new JSONResponse({
    ok: true,
    value: findUserByID?.keys.data,
  })
}
