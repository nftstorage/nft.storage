const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const temp = require('temp')
const execa = require('execa')
const delay = require('delay')
const { once } = require('events')

/** @typedef {{ proc: execa.ExecaChildProcess<string> }} ProcessObject */

dotenv.config({ path: path.join(__dirname, '../../.env') })

const defineGlobalsJs = `
globalThis.ENV = '${process.env.ENV || ''}'
globalThis.DEBUG = '${process.env.DEBUG || ''}'
globalThis.SALT = '${process.env.SALT || ''}'
globalThis.DATABASE_URL = '${process.env.DATABASE_URL || ''}'
globalThis.DATABASE_TOKEN = '${process.env.DATABASE_TOKEN || ''}'

globalThis.MAGIC_SECRET_KEY = '${process.env.MAGIC_SECRET_KEY || ''}'
globalThis.MAILCHIMP_API_KEY = '${process.env.MAILCHIMP_API_KEY || ''}'
globalThis.METAPLEX_AUTH_TOKEN = '${process.env.METAPLEX_AUTH_TOKEN || ''}'
globalThis.LOGTAIL_TOKEN = '${process.env.LOGTAIL_TOKEN || ''}'
globalThis.PRIVATE_KEY = '${process.env.PRIVATE_KEY || ''}'
globalThis.SENTRY_DSN = '${process.env.SENTRY_DSN || ''}'

globalThis.CLUSTER_API_URL = '${process.env.CLUSTER_API_URL || ''}'
globalThis.CLUSTER_BASIC_AUTH_TOKEN = '${
  process.env.CLUSTER_BASIC_AUTH_TOKEN || ''
}'
globalThis.CLUSTER_SERVICE = '${process.env.CLUSTER_SERVICE || ''}'

globalThis.MAINTENANCE_MODE = '${process.env.MAINTENANCE_MODE || ''}'

globalThis.S3_ENDPOINT = '${process.env.S3_ENDPOINT || ''}'
globalThis.S3_REGION = '${process.env.S3_REGION || ''}'
globalThis.S3_ACCESS_KEY_ID = '${process.env.S3_ACCESS_KEY_ID || ''}'
globalThis.S3_SECRET_ACCESS_KEY = '${process.env.S3_SECRET_ACCESS_KEY || ''}'
globalThis.S3_BUCKET_NAME = '${process.env.S3_BUCKET_NAME || ''}'
globalThis.SLACK_USER_REQUEST_WEBHOOK_URL = ${
  process.env.SLACK_USER_REQUEST_WEBHOOK_URL || ''
}
`

temp.track()
const injectGlobalsTempfile = temp.openSync({
  prefix: 'nftstorage-test-',
  suffix: '.js',
})
fs.writeSync(injectGlobalsTempfile.fd, defineGlobalsJs)
fs.closeSync(injectGlobalsTempfile.fd)

const cli = path.join(__dirname, 'scripts/cli.js')
/** @type {import('esbuild').Plugin} */
const nodeBuiltinsPlugin = {
  name: 'node builtins',
  setup(build) {
    build.onResolve({ filter: /^stream$/ }, () => {
      return { path: require.resolve('readable-stream') }
    }),
      build.onResolve({ filter: /^cross-fetch$/ }, () => {
        return { path: path.resolve(__dirname, 'scripts/fetch.js') }
      })
  },
}

const config = {
  inject: [
    path.join(__dirname, './scripts/node-globals.js'),
    injectGlobalsTempfile.path,
  ],
  define: {
    NFT_STORAGE_VERSION: JSON.stringify('0.1.0'),
    NFT_STORAGE_COMMITHASH: JSON.stringify('322332'),
    NFT_STORAGE_BRANCH: JSON.stringify('main'),
  },
  plugins: [nodeBuiltinsPlugin],
}

/** @type {import('playwright-test').RunnerOptions} */
module.exports = {
  buildConfig: config,
  buildSWConfig: config,
  beforeTests: async () => {
    const mock = await startMockServer('AWS S3', 9095, 'test/mocks/aws-s3')
    return { mock }
  },
  afterTests: async (
    ctx,
    /** @type {{  mock: ProcessObject }} */ beforeTests
  ) => {
    console.log('⚡️ Shutting down mock servers.')

    beforeTests.mock.proc.kill()
  },
}

/**
 * @param {string} name
 * @param {number} port
 * @param {string} handlerPath
 * @returns {Promise<ProcessObject>}
 */
async function startMockServer(name, port, handlerPath) {
  const proc = execa('smoke', ['-p', String(port), handlerPath], {
    preferLocal: true,
  })
  if (!proc.stdout || !proc.stderr) {
    throw new Error('missing process stdio stream(s)')
  }

  const stdout = await Promise.race([
    once(proc.stdout, 'data'),
    // Make sure that we fail if process crashes. However if it exits without
    // producing stdout just resolve to ''.
    proc.then(() => ''),
  ])

  proc.stdout.on('data', (line) => console.log(line.toString()))
  proc.stderr.on('data', (line) => console.error(line.toString()))

  const startMsg = `Server started on: http://localhost:${port}`
  if (!stdout.toString().includes(startMsg)) {
    throw new Error(`Failed to start ${name} mock server`)
  }

  console.log(`⚡️ Mock ${name} started.`)
  return { proc }
}
