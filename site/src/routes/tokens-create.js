import { HTTPError } from '../errors'
import { JSONResponse } from '../utils/json-response'
import { verifyToken } from '../utils/utils'
import { createToken } from './../models/users'

/**
 * @param {FetchEvent} event
 * @returns {Promise<Response>}
 */
export const tokensCreate = async (event) => {
  const auth = await verifyToken(event, 'session')
  if (!auth.ok) {
    return HTTPError.respond(auth.error)
  }
  const user = auth.user
  const body = await event.request.json()

  await createToken(user.sub, body.name)
  
  return new JSONResponse({
    ok: true,
  })
}
