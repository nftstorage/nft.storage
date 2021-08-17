import { JSONResponse } from '../utils/json-response.js'
import { HTTPError } from '../errors.js'
import { buildSdk } from './../utils/fauna'

/** @type {import('../utils/router.js').Handler} */
export const checkV1 = async (event, { params }) => {
  const { cid } = params

  const { findContentByCid } = await buildSdk().findContentByCid({ cid })

  if (findContentByCid) {
    const value = {
      cid: findContentByCid.cid,
      /** @type {import('../bindings.js').Pin} */
      pin: {
        cid: findContentByCid.cid,
        created: findContentByCid.created,
        size: findContentByCid.dagSize || 0,
        status: findContentByCid.pins.data[0]?.status || 'queued',
      },
      deals: [],
    }
    return new JSONResponse({ ok: true, value })
  } else {
    throw new HTTPError('NFT not found', 404)
  }
}
