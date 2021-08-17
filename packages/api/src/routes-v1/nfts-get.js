import { HTTPError } from '../errors.js'
import { JSONResponse } from '../utils/json-response.js'
import { validate } from '../utils/auth-v1.js'

/**
 * @typedef {import('../bindings').Deal} Deal
 */

/** @type {import('../utils/router.js').Handler} */
export const statusV1 = async (event, ctx) => {
  const { params } = ctx
  const { fauna, loginOutput } = await validate(event, ctx)
  console.log(
    '🚀 ~ file: nfts-get.js ~ line 13 ~ statusV1 ~ loginOutput',
    loginOutput?.secret,
    loginOutput?.user._id
  )
  const { findUploadByCid } = await fauna.findUploadByCid({ cid: params.cid })
  console.log(findUploadByCid._id)

  if (findUploadByCid) {
    /** @type {import('../bindings').NFTResponse} */
    const res = {
      cid: findUploadByCid.cid,
      created: findUploadByCid.created,
      files: findUploadByCid.files || [],
      scope: findUploadByCid.key?.name || '',
      size: findUploadByCid.content.dagSize || 0,
      type: findUploadByCid.type,
      deals: [],
      pin: {
        cid: findUploadByCid.cid,
        created: findUploadByCid.created,
        size: findUploadByCid.content.dagSize || 0,
        status: findUploadByCid.content.pins.data[0]?.status || 'queued',
      },
    }
    return new JSONResponse({ ok: true, value: res })
  } else {
    throw new HTTPError('NFT not found', 404)
  }
}
