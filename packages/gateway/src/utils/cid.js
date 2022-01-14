import { CID } from 'multiformats/cid'

import { InvalidUrlError } from '../errors.js'

/**
 * Parse subdomain URL and return cid
 *
 * @param {URL} url
 */
export function getCidFromSubdomainUrl(url) {
  // Replace "ipfs-staging" by "ipfs" if needed
  const host = url.hostname.replace('ipfs-staging', 'ipfs')
  const splitHost = host.split('.ipfs.')

  if (!splitHost.length) {
    throw new InvalidUrlError(url.hostname)
  }

  try {
    return normalizeCid(splitHost[0])
  } catch (err) {
    throw new InvalidUrlError(`invalid CID: ${splitHost[0]}: ${err.message}`)
  }
}

/**
 * Parse CID and return normalized b32 v1
 *
 * @param {string} cid
 */
export function normalizeCid(cid) {
  const c = CID.parse(cid)
  return c.toV1().toString()
}
