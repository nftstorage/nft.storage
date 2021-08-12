import { validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'
import { deleteToken } from '../models/users.js'

/** @type {import('../utils/router.js').Handler} */
export const tokensDelete = async (event, ctx) => {
  const { user } = await validate(event, ctx)
  const body = await event.request.json()

  await deleteToken(user.issuer, body.name)

  return new JSONResponse({
    ok: true,
  })
}
