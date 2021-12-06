const { withSentryConfig } = require('@sentry/nextjs')
const git = require('git-rev-sync')
const fs = require('fs')
const path = require('path')

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')
)
const env = process.env.NEXT_PUBLIC_ENV
const release = `${pkg.name}@${pkg.version}-${env}+${git.short(__dirname)}`

const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  exportPathMap: async function () {
    return {
      '/ipfs-404.html': { page: '/404' },
    }
  },
}

module.exports = withSentryConfig(nextConfig, {
  debug: false,
  silent: true,
  setCommits: { auto: true, ignoreEmpty: true },
  release,
  dist: git.short(__dirname),
  deploy: { env },
})
