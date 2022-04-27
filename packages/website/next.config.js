const { withSentryConfig } = require('@sentry/nextjs')
const git = require('git-rev-sync')
const fs = require('fs')
const path = require('path')

const shortHash = git.short(__dirname)
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')
)
const env = process.env.NEXT_PUBLIC_ENV
const release = `${pkg.name}@${pkg.version}-${env}+${shortHash}`

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = withBundleAnalyzer({
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    images: {
      layoutRaw: true,
    },
  },
  images: {
    loader: 'custom',
  },
  exportPathMap: async function () {
    return {
      '/ipfs-404.html': { page: '/404' },
      '/docs/': { page: '/docs/quickstart', statusCode: 301 },
      '/docs/why-nft-storage': { page: '/docs/why-nft-storage' },
      '/docs/troubleshooting': { page: '/docs/troubleshooting' },
      '/docs/quickstart': { page: '/docs/quickstart' },
      '/docs/concepts/decentralized-storage': {
        page: '/docs/concepts/decentralized-storage',
      },
      '/docs/concepts': {
        page: '/docs/concepts/decentralized-storage',
      },
      '/docs/concepts/architecture-considerations': {
        page: '/docs/concepts/architecture-considerations',
      },
      '/docs/concepts/car-files': { page: '/docs/concepts/car-files' },
      '/docs/concepts/gateways': { page: '/docs/concepts/gateways' },
      '/docs/how-to/mint-erc-1155': { page: '/docs/how-to/mint-erc-1155' },
      '/docs/how-to': {
        page: '/docs/how-to/mint-erc-1155',
      },
      '/docs/how-to/mint-custom-metadata': {
        page: '/docs/how-to/mint-custom-metadata',
      },
      '/docs/how-to/pinning-service': {
        page: '/docs/how-to/pinning-service',
      },
      '/docs/how-to/mint-solana': { page: '/docs/how-to/mint-solana' },
      '/docs/how-to/retrieve': { page: '/docs/how-to/retrieve' },
      '/docs/how-to/store-directory': { page: '/docs/how-to/store-directory' },
      '/docs/how-to/get-status': { page: '/docs/how-to/get-status' },
      '/docs/how-to/ucan': { page: '/docs/how-to/ucan' },
      '/docs/how-to/nftup': { page: '/docs/how-to/nftup' },
      '/docs/client': { page: '/docs/client/js' },
      '/docs/client/https': { page: '/docs/client/http' },
      '/docs/client/generated': { page: '/docs/client/generated' },
      '/docs/client/js': { page: '/docs/client/js' },
      '/docs/client/api-docs': { page: '/docs/client/js' },
      '/docs/client/lib': { page: '/docs/client/js' },
    }
  },
})

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
})

const configWithDocs = withNextra({ ...nextConfig })

const config =
  env === 'dev' || process.env.SENTRY_UPLOAD !== 'true'
    ? configWithDocs
    : withSentryConfig(configWithDocs, {
        debug: false,
        silent: true,
        setCommits: { auto: true, ignoreEmpty: true, ignoreMissing: true },
        release,
        dist: shortHash,
        deploy: { env },
      })

module.exports = config
