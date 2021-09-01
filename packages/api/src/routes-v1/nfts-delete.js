import { validate } from '../utils/auth-v1.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../utils/router.js').Handler} */
export const nftDeleteV1 = async (event, ctx) => {
  const { supa, user } = await validate(event, ctx)
  const { params } = ctx

  await supa.deleteUpload(params.cid, user.issuer)

  return new JSONResponse({
    ok: true,
  })
}
