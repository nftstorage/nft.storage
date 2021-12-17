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
    }
  },
})

const config =
  env === 'dev'
    ? nextConfig
    : withSentryConfig(nextConfig, {
        debug: false,
        silent: true,
        setCommits: { auto: true, ignoreEmpty: true, ignoreMissing: true },
        release,
        dist: shortHash,
        deploy: { env },
      })

module.exports = config
