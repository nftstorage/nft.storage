export const GATEWAY = new URL('https://dweb.link/')

/**
 * @typedef {string|URL} GatewayURL Base URL of an IPFS Gateway e.g. https://dweb.link/ or https://ipfs.io/
 * @typedef {{ gateway?: GatewayURL }} GatewayURLOptions
 */

/**
 * Convert an IPFS URL (starting ipfs://) to a gateway URL (starting https://)
 * that can be used in a webpage. If the passed URL is not an IPFS URL it is
 * returned as a new URL object with no further changes.
 *
 * @param {string|URL} url An IPFS URL e.g. ipfs://bafy.../path
 * @param {GatewayURLOptions} [options] Options that allow customization of the gateway used.
 * @returns {URL} An IPFS gateway URL e.g. https://dweb.link/ipfs/bafy.../path
 */
export const toGatewayURL = (url, options = {}) => {
  const gateway = options.gateway || GATEWAY
  url = new URL(String(url))
  return url.protocol === 'ipfs:'
    ? new URL(`/ipfs/${url.href.slice('ipfs://'.length)}`, gateway)
    : url
}
