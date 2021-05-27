export const GATEWAY = new URL('https://dweb.link/')

/**
 * @typedef {string|URL} GatewayURL Gateway base URL e.g. https://dweb.link/ or https://ipfs.io/
 * @typedef {{ gateway?: GatewayURL }} EmbedURLOptions
 */

/**
 * Convert an IPFS URL (starting ipfs://) to a gateway URL (starting https://)
 * that can be embedded in a webpage. If the passed URL is not an IPFS URL it is
 * returned as a new URL object with no further changes.
 *
 * @param {string|URL} url An IPFS URL e.g. ipfs://bafy.../path
 * @param {EmbedURLOptions} [options] Options that allow customization of the gateway used.
 * @returns {URL} An IPFS gateway URL e.g. https://dweb.link/ipfs/bafy.../path
 */
export const toEmbedURL = (url, options = {}) => {
  const gateway = options.gateway || GATEWAY
  url = new URL(String(url))
  return url.protocol === 'ipfs:'
    ? new URL(`/ipfs/${url.href.slice('ipfs://'.length)}`, gateway)
    : url
}
