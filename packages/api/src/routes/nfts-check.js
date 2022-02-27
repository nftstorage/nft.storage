import { JSONResponse } from '../utils/json-response.js'
import { HTTPError } from '../errors.js'
import { secrets, getConstants } from '../constants'
import { DBClient } from '../utils/db-client'
import { parseCid } from '../utils/utils.js'
import { toCheckNftResponse } from '../utils/db-transforms.js'

console.log('process', process.env)
const con = getConstants(ENV)
const db = new DBClient(con.url, secrets.database)

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
