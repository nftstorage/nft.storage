import { validate } from '../utils/auth-v1.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../utils/router.js').Handler} */
export const tokensListV1 = async (event, ctx) => {
  const { user, supa } = await validate(event, ctx)

  const keys = await supa.listKeys(user.issuer)

  return new JSONResponse({
    ok: true,
    value: keys,
  })
}
