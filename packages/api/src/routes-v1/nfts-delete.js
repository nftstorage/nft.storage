import { validate } from '../utils/auth-v1.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../utils/router.js').Handler} */
export const nftDeleteV1 = async (event, ctx) => {
  const { fauna } = await validate(event, ctx)
  const { params } = ctx

  const { findUploadByCid } = await fauna.findUploadByCid({ cid: params.cid })
  if (findUploadByCid) {
    const id = findUploadByCid._id
    await fauna.deleteUpload({ id })
  }

  return new JSONResponse({
    ok: true,
  })
}
