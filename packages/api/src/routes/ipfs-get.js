import { parseCid } from '../utils/utils.js'

// TODO: Use prod gw
const gateway = 'ipfs-staging.nft.storage'

/** @type {import('../bindings').Handler} */
export const ipfsGet = async (event, { params }) => {
  // Parse and normalize CID
  const { contentCid } = parseCid(params.cid)
  const path = params.wild || ''

  const res = await fetch(`https://${contentCid}.${gateway}/${path}`)
  return res
}
