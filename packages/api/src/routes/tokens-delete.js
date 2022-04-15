import { checkAuth, validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../bindings').Handler} */
export const tokensDelete = async (event, ctx) => {
  const { user } = checkAuth(ctx)
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
