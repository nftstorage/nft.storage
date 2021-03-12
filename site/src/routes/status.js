import { CID } from 'multiformats'
import { HTTPError } from '../errors.js'
import { verifyToken } from '../utils/utils.js'
import * as nfts from '../models/nfts.js'
import { JSONResponse } from '../utils/json-response.js'

/**
 * @param {FetchEvent} event
 * @param {Record<string,string>} params
 * @returns {Promise<Response>}
 */
export const status = async (event, params) => {
  const auth = await verifyToken(event)
  if (!auth.ok) {
    return HTTPError.respond(auth.error)
  }
  const user = auth.value

  try {
    const cid = CID.parse(params.cid)
    const status = await nfts.get({ user, cid })

    if (status) {
      return new JSONResponse({
        ok: true,
        value: status,
      })
    }
    return new JSONResponse({
      ok: false,
      error: { message: `NFT with a CID ${cid} not found` },
    })
  } catch (err) {
    return HTTPError.respond(err)
  }
}
