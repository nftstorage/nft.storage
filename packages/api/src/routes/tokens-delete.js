import { validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../bindings').Handler} */
export const tokensDeleteV1 = async (event, ctx) => {
  const { user } = await validate(event, ctx)
  const body = await event.request.json()

  if (body.id) {
    await ctx.db.deleteKey(user.id, body.id)
  } else {
    throw new Error('Token id is required.')
  }

  return new JSONResponse({
    ok: true,
  })
}
