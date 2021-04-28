let API = process.env.NEXT_PUBLIC_API
let MAGIC_TOKEN = process.env.NEXT_PUBLIC_MAGIC

if (globalThis.window) {
  switch (location.host) {
    case 'staging.nft.storage':
      API = 'https://api-staging.nft.storage'
      MAGIC_TOKEN = 'pk_live_9363234DECD6F093'
      break
    case 'dev.nft.storage':
      API = 'https://api-dev.nft.storage'
      MAGIC_TOKEN = 'pk_test_731A6A694987E83A'
      break
    case 'nft.storage':
      API = 'https://api.nft.storage'
      MAGIC_TOKEN = 'pk_live_20429A8C4CDEDCF7'
      break
    default:
      break
  }
}

export default {
  API: API,
  MAGIC_TOKEN: MAGIC_TOKEN,
}
