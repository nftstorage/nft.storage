import { validate } from '../utils/auth'
import { JSONResponse } from '../utils/json-response'
import { createToken } from './../models/users'

/**
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
export const tokensCreate = async (event) => {
  const auth = await validate(event)
  const user = auth.user
  const body = await event.request.json()

  await createToken(user.sub, body.name)

  return new JSONResponse({
    ok: true,
  })
}
