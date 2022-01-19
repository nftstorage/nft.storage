import { parseCid } from '../utils/utils.js'
import { GATEWAY_NFT_STORAGE_HOSTNAME } from '../constants.js'

/** @type {import('../bindings').Handler} */
export const ipfsGet = async (event, { params }) => {
  // Parse and normalize CID
  const { contentCid } = parseCid(params.cid)
  const path = params.wild || ''
  const url = `https://${contentCid}.${GATEWAY_NFT_STORAGE_HOSTNAME}/${path}`

  return Response.redirect(url, 302)
}
