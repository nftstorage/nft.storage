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
  exportPathMap: async function () {
    return {
      '/ipfs-404.html': { page: '/404' },
      '/docs/': { page: '/docs/quickstart', statusCode: 301 },
      '/docs/concepts/car-files': { page: '/docs/concepts/car-files' },
    }
  },
})

const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.js',
})

const configWithDocs = withNextra({ ...nextConfig })

const config =
  env === 'dev'
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
