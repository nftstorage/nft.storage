import { checkAuth } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../bindings').Handler} */
export const tokensList = async (event, ctx) => {
  const { user } = checkAuth(ctx)

  const keys = await ctx.db.listKeys(user.id)

  return new JSONResponse({
    ok: true,
    value: keys,
  })
}
