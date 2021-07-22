import { CID } from 'multiformats'

/**
 * @typedef {URL & {protocol:'ipfs'}} IPFSURL
 *
 * Returns true if given URL is `ipfs://` url. Note however that it does
 * not ensure whether it is well formed one e.g. it may not even have a
 * valid CID. You could use `fixMalformedIPFSURL(url)` to fix malformed URL
 * or you could use one of the following functions instead
 * - `asIPFSURL`
 * - `parse`
 * - `tryParse
 *
 * @param {URL} url
 * @returns {url is IPFSURL}
 */

export const isIPFSURL = (url) => url.protocol === 'ipfs:'

/**
 * Takes arbitrary URL and retuns ipfs:// URL derived from it if original URL
 * was ipfs:// or an IPFS gateway URL. Otherwise returns `null`. Will fix
 * malformed ipfs:// URLs to remove unecessay `/ipfs/` prefix.
 *
 *
 * @param {URL} url
 * @returns {IPFSURL|null}
 */
export const asIPFSURL = (url) => {
  if (isIPFSURL(url)) {
    return fixMalformedIPFSURL(url)
  } else {
    return deriveFromGatewayURL(url)
  }
}

/**
 * Takes possibly malformed IPFS URL (ipfs://ipfs/Qm...hash/) and normalizes it
 *
 * @param {IPFSURL} url
 * @returns {IPFSURL}
 */
const fixMalformedIPFSURL = (url) => {
  const cid = tryParseCID(url.hostname)
  if (cid) {
    return url
  } else {
    const { pathname: path, search, hash } = url
    const [_slash, ...parts] = path.split(/\/+/)
    while (parts[0] === 'ipfs') {
      parts.shift()
    }
    const [cid, ...rest] = parts
    const pathname = `/${rest.join('/')}`

    return create(CID.parse(String(cid)), { pathname, hash, search })
  }
}

/**
 * Attempts to decode `ipfs://` URL returning CID, path, search and hash. Will
 * return `null` if URL is invalid.
 *
 * @param {URL} url
 */
const decodeIPFSURL = ({ protocol, hostname, pathname, search, hash }) => {
  if (protocol !== 'ipfs:') {
    return null
  }
  const cid = tryParseCID(hostname)
  if (cid) {
    return { cid, pathname: pathname.split(/\/+/).join('/'), search, hash }
  } else {
    const [_slash, ...parts] = pathname.split(/\/+/)
    while (parts[0] === 'ipfs') {
      parts.shift()
    }
    const [root, ...rest] = parts
    const cid = tryParseCID(/** @type {string} */ (root))
    return cid ? { cid, pathname: `/${rest.join('/')}`, hash, search } : null
  }
}

/**
 * Derives ipfs:// URL from the gateway URL.
 *
 * @param {URL} url
 */
const deriveFromGatewayURL = (url) => {
  const data = decodeGateWayURL(url)
  return data ? create(data.cid, data) : null
}

/**
 * @param {URL} url
 * @returns {{cid:CID, pathname:string, search:string, hash:string} | null}
 */
export const decodeGateWayURL = (url) =>
  decodeGatewayDomain(url) || decodeGatewayPath(url)

/**
 * @param {URL} url
 */
const decodeGatewayPath = (url) => {
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
    return cid ? { cid, pathname, search, hash } : null
  } else {
    return null
  }
}

/**
 * @param {URL} url
 */
const decodeGatewayDomain = ({ hostname, pathname, search, hash }) => {
  const [cidString, ipfsString] = hostname.split('.')
  const cid = ipfsString === 'ipfs' ? tryParseCID(String(cidString)) : null
  return cid ? { cid, pathname, search, hash } : null
}

/**
 *
 * @param {URL} url
 */
export const decode = (url) => decodeIPFSURL(url) || decodeGateWayURL(url)

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
 * Parses string represented `ipfs://` style URL. Will throw an error if not an
 * `ipfs://` url.
 *
 * @param {string} href
 * @returns {IPFSURL}
 */
export const parse = (href) => {
  const url = new URL(href)
  if (isIPFSURL(url)) {
    return fixMalformedIPFSURL(url)
  } else {
    throw new Error(`Not a valid ipfs url (must start with ipfs://): ${href}`)
  }
}

/**
 * Parses string represented `ipfs://` style URL. Returns `null` on invalid
 * input.
 *
 * @param {string} href
 * @returns {IPFSURL|null}
 */
export const tryParse = (href) => {
  try {
    return parse(href)
  } catch (error) {
    return null
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
export const formatIPFSPath = (url) => `/ipfs/${cid(url).toV1()}${url.pathname}`

/**
 * @param {IPFSURL} url
 */
export const formatIPFSPathWithCIDv0 = (url) =>
  `/ipfs/${cid(url).toV0()}${url.pathname}`
