import { validate } from '../utils/auth'
import { JSONResponse } from '../utils/json-response'
import { tokens } from './../models/users'

/**
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
export const tokensList = async (event) => {
  const auth = await validate(event)
  const user = auth.user

  return new JSONResponse({
    ok: true,
    value: await tokens(user.sub),
  })
}
