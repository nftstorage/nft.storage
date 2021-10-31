import { validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../bindings').Handler} */
export const tokensListV1 = async (event, ctx) => {
  const { user } = await validate(event, ctx)

  const keys = await ctx.db.listKeys(user.id)

  return new JSONResponse({
    ok: true,
    value: keys,
  })
}
