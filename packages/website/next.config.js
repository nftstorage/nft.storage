const { withSentryConfig } = require('@sentry/nextjs')

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
}

const SentryWebpackPluginOptions = {
  debug: false,
  silent: true,
}

module.exports = withSentryConfig(nextConfig, SentryWebpackPluginOptions)
