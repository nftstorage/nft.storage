import { validate } from '../utils/auth-v1.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../utils/router.js').Handler} */
export const tokensListV1 = async (event, ctx) => {
  const { user } = await validate(event, ctx)

  return new JSONResponse({
    ok: true,
    value: user.keys.data,
  })
}
