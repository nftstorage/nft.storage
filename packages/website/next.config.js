const { withSentryConfig } = require('@sentry/nextjs')
const fs = require('fs')
const path = require('path')
const { Git } = require('@nice-labs/git-rev')

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8')
)
const env = process.env.NEXT_PUBLIC_ENV
const gitNew = new Git(__dirname)
const shortHash = gitNew.commitHash(true)
const release = `${pkg.name}@${pkg.version}-${env}+${shortHash}`
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  exportPathMap: async function() {
    return {
      '/ipfs-404.html': { page: '/404' },
    }
  },
}
module.exports = withSentryConfig(nextConfig, {
  debug: false,
  silent: true,
  setCommits: { auto: true, ignoreEmpty: true, ignoreMissing: true },
  release,
  dist: shortHash,
  deploy: { env },
})
