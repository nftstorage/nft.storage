import { JSONResponse } from '../utils/json-response.js'
import { HTTPError } from '../errors.js'
import { parseCid } from '../utils/utils.js'
import { toCheckNftResponse } from '../utils/db-transforms.js'

/** @type {import('../bindings').Handler} */
export const checkV1 = async (event, { params, db }) => {
  const cid = parseCid(params.cid)
  const content = await db.getContent(cid.contentCid)

  if (content) {
    return new JSONResponse({
      ok: true,
      value: toCheckNftResponse(cid.sourceCid, content),
    })
  } else {
    throw new HTTPError('NFT not found', 404)
  }
}
