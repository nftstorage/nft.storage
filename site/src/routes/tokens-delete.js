import { validate } from '../utils/auth'
import { JSONResponse } from '../utils/json-response'
import { deleteToken } from './../models/users'

/**
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
export const tokensDelete = async (event) => {
  const { user } = await validate(event)
  const body = await event.request.json()

  await deleteToken(user.issuer, body.name)

  return new JSONResponse({
    ok: true,
  })
}
