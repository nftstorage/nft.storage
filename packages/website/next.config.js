const withOffline = require('next-offline')
const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  ...withOffline(),
  trailingSlash: true,
  reactStrictMode: true,
  exportPathMap: async function() {
    return {
      '/ipfs-404.html': { page: '/404' },
    }
  },
}

const SentryWebpackPluginOptions = {
  debug: false,
  silent: true,
}

module.exports = withSentryConfig(nextConfig, SentryWebpackPluginOptions)
