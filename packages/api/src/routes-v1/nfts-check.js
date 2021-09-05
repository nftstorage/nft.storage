import { JSONResponse } from '../utils/json-response.js'
import { HTTPError } from '../errors.js'
import { createDBClient } from '../utils/db-client'

const db = createDBClient()

/** @type {import('../utils/router.js').Handler} */
export const checkV1 = async (event, { params }) => {
  const { cid } = params

  const content = await db.checkUpload(cid)

  if (content) {
    return new JSONResponse({ ok: true, content })
  } else {
    throw new HTTPError('NFT not found', 404)
  }
}
