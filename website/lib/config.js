const env = process.env.ENV || 'development';

const configs = {
  development: {
    api: 'http://127.0.0.1:8787',
  },
  staging: {
    api: 'https://staging.nft.storage',
  },
  production: {
    api: 'https://nft.storage',
  },
}[env];

export default configs;