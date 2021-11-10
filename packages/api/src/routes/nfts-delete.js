import * as nfts from '../models/nfts.js'
import { validate } from '../utils/auth.js'
import { JSONResponse } from '../utils/json-response.js'

/** @type {import('../bindings').Handler} */
export const remove = async (event, ctx) => {
  const { user } = await validate(event, ctx)
  const { params } = ctx

  await nfts.remove({ user, cid: params.cid })
  // TODO: We need to unpin from pinata as well, however we need to make
  // no other user has pinned same CID, which makes me wonder if KV store
  // has eventual or strong consistency. If former we might have problems.

  return new JSONResponse({
    ok: true,
  })
}
