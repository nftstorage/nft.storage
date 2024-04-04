let API = /** @type {string} **/ process.env.NEXT_PUBLIC_API || ''
let MAGIC_TOKEN = /** @type {string} **/ process.env.NEXT_PUBLIC_MAGIC || ''
const BLOG_URL =
  /** @type {string} **/ process.env.NEXT_PUBLIC_BLOG_URL ||
  'https://blog.nft.storage'
export const NFT_PORT_ENDPOINT =
  /** @type {string} **/ process.env.NEXT_PUBLIC_NFT_PORT_ENDPOINT ||
  'https://api.nftport.xyz/v0/reports/uris'
export const NFT_PORT_API_KEY =
  /** @type {string} **/ process.env.NEXT_PUBLIC_NFT_PORT_API_KEY || ''

if (globalThis.window) {
  switch (location.host) {
    case 'staging.nft.storage':
      API = 'https://api-staging.nft.storage'
      MAGIC_TOKEN = 'pk_live_9363234DECD6F093'
      break
    case 'dev.nft.storage':
      API = 'https://api-dev.nft.storage'
      MAGIC_TOKEN = 'pk_live_9363234DECD6F093'
      break
    case 'nft.storage':
    case 'classic.nft.storage':
      API = 'https://api.nft.storage'
      MAGIC_TOKEN = 'pk_live_20429A8C4CDEDCF7'
      break
    default:
      break
  }
}

const AUTHENTICATED_ROUTES = {
  MANAGE: 'manage',
  FILES: 'files',
  NEW_FILE: 'new-file',
  NEW_KEY: 'new-key',
  PINNING_REQUEST: 'pinning-request',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  AUTHENTICATED_ROUTES,
  API: API,
  MAGIC_TOKEN: MAGIC_TOKEN,
  BLOG_URL: BLOG_URL,
  NFT_PORT_ENDPOINT: NFT_PORT_ENDPOINT,
  NFT_PORT_API_KEY: NFT_PORT_API_KEY,
}
