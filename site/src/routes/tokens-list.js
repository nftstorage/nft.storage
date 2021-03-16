import { HTTPError } from '../errors'
import { JSONResponse } from '../utils/json-response'
import { verifyToken } from '../utils/utils'
import { tokens } from './../models/users'

/**
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
export const tokensList = async (event) => {
  const auth = await verifyToken(event, 'session')
  if (!auth.ok) {
    return HTTPError.respond(auth.error)
  }
  const user = auth.user

  return new JSONResponse({
    ok: true,
    value: await tokens(user.sub),
  })
}
