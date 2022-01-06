import { CID } from 'multiformats/cid'

import { InvalidIpfsPathError, InvalidUrlError } from '../errors.js'

/**
 * Parse subdomain URL and return cid
 *
 * @param {URL} url
 */
export function getCidFromSubdomainUrl(url) {
  // Replace "ipfs-staging" by "ipfs" if needed
  const nUrl = url.hostname.replace('ipfs-staging', 'ipfs')
  const splitUrl = nUrl.split('.ipfs.')

  if (!splitUrl.length) {
    throw new InvalidUrlError(url.hostname)
  }

  return normalizeCid(splitUrl[0])
}

/**
 * Parse CID and return normalized b32 v1
 *
 * @param {string} cid
 */
export function normalizeCid(cid) {
  try {
    const c = CID.parse(cid)
    return c.toV1().toString()
  } catch (err) {
    throw new InvalidIpfsPathError(cid)
  }
}
