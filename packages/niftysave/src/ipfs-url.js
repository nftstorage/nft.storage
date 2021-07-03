import { CID } from 'multiformats'

/**
 * @typedef {URL & {protocol:'ipfs'}} IPFSURL
 * @param {URL} url
 * @returns {url is IPFSURL}
 */

export const isIPFSURL = (url) => url.protocol === 'ipfs:'

/**
 *
 * @param {URL} url
 * @returns {IPFSURL|null}
 */
export const asIPFSURL = (url) => {
  if (isIPFSURL(url)) {
    return url
  } else {
    return maybeFromGatewayURL(url)
  }
}

/**
 * @param {URL} url
 */
const maybeFromGatewayURL = (url) =>
  maybeFromGatewayDoman(url) || maybeFromGatewayPath(url)

/**
 * @param {URL} url
 * @returns {IPFSURL|null}
 */
const maybeFromGatewayPath = (url) => {
  if (url.pathname.startsWith('/ipfs/')) {
    const { search, hash, pathname: path } = url
    const ipfsPath = path.slice('/ipfs/'.length)
    const slashOffset = ipfsPath.indexOf('/')
    const [cid, pathname] =
      slashOffset < 0
        ? [tryParseCID(ipfsPath), '/']
        : [
            tryParseCID(ipfsPath.slice(0, slashOffset)),
            ipfsPath.slice(slashOffset),
          ]
    return cid ? create(cid, { pathname, search, hash }) : null
  } else {
    return null
  }
}

/**
 * @param {URL} url
 */
const maybeFromGatewayDoman = ({ hostname, pathname, search, hash }) => {
  const [cidString, ipfsString] = hostname.split('.')
  const cid = ipfsString === 'ipfs' ? tryParseCID(String(cidString)) : null
  return cid ? create(cid, { pathname, search, hash }) : null
}

/**
 * @param {CID} cid
 * @param {{
 * pathname?: string
 * hash?: string
 * search?: string
 * }} options
 * @returns {IPFSURL}
 */
export const create = (
  cid,
  { pathname = '/', hash = '', search = '' } = {}
) => {
  const url = Object.assign(new URL(`ipfs://${cid.toV1()}`), {
    pathname,
    search,
    hash,
  })

  return /** @type {IPFSURL}*/ (url)
}

/**
 * @param {string} cid
 * @returns {CID|null}
 */
const tryParseCID = (cid) => {
  try {
    return CID.parse(cid)
  } catch (error) {
    return null
  }
}

/**
 *
 * @param {string} href
 * @returns {IPFSURL}
 */
export const parse = (href) => {
  const url = new URL(href)
  if (isIPFSURL(url)) {
    return url
  } else {
    throw new Error(`Not a valid ipfs url (must start with ipfs://): ${href}`)
  }
}

/**
 * @param {IPFSURL} url
 * @param {{gateway?:URL}} options
 */
export const embed = (
  { hostname, pathname, search, hash },
  { gateway = new URL('https://ipfs.io') } = {}
) => new URL(`/ipfs/${hostname}${pathname}${search}${hash}`, gateway)

/**
 * @param {IPFSURL} url
 * @returns {CID}
 */
export const cid = (url) => CID.parse(url.hostname)

/**
 * @param {IPFSURL} url
 */
export const formatIPFSPath = (url) => `/ipfs/${cid(url)}${url.pathname}`
