import * as ERC721 from '../gen/erc721/index.js'

/**
 * @typedef {Object} Config
 * @property {URL} url
 * @property {Record<string, string>} [headers]
 *
 * @param {Config} config
 * @returns {ERC721.Service}
 */
const service = config => {
  const value = services.get(config)
  if (value) {
    return value
  } else {
    const value = new Cluster(config.url.href, {
      headers: { Authorization: `Basic ${config.secret}` },
    })
    services.set(config, value)
    return value
  }
}
