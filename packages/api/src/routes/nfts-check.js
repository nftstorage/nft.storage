import { JSONResponse } from '../utils/json-response.js'
import { HTTPError } from '../errors.js'
import { getServiceConfig } from '../config.js'
import { DBClient } from '../utils/db-client'
import { parseCid } from '../utils/utils.js'
import { toCheckNftResponse } from '../utils/db-transforms.js'

const { DATABASE_URL, DATABASE_TOKEN } = getServiceConfig()
const db = new DBClient(DATABASE_URL, DATABASE_TOKEN)

/** @type {import('../bindings').Handler} */
export const nftCheck = async (event, { params }) => {
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
