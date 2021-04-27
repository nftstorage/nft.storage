let API = process.env.NEXT_PUBLIC_API
let MAGIC_TOKEN = process.env.NEXT_PUBLIC_MAGIC

if (globalThis.window) {
  switch (location.host) {
    case 'staging.nft.storage':
      API = 'https://api-staging.nft.storage'
      MAGIC_TOKEN = 'pk_test_847FFF9DF7A3CC15'
      break
    case 'dev.nft.storage':
      API = 'https://api-dev.nft.storage'
      MAGIC_TOKEN = 'pk_test_847FFF9DF7A3CC15'
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
