const path = require('path')
const fs = require('fs')
const dotenv = require('dotenv')
const temp = require('temp')
const execa = require('execa')
const delay = require('delay')
const { once } = require('events')

/** @typedef {{ proc: execa.ExecaChildProcess<string> }} ProcessObject */

dotenv.config({ path: path.join(__dirname, '../../.env') })

const configKeys = [
  'ENV',
  'PRIVATE_KEY',
  'DATABASE_CONNECTION',
  'DATABASE_TOKEN',
  'DATABASE_URL',
  'LOGTAIL_TOKEN',
  'MAGIC_SECRET_KEY',
  'SALT',
  'SENTRY_DSN',
  'MAILCHIMP_API_KEY',
  'CLUSTER_API_URL',
  'CLUSTER_BASIC_AUTH_TOKEN',
  'DEBUG',
  'NFT_STORAGE_VERSION',
  'NFT_STORAGE_COMMITHASH',
  'NFT_STORAGE_BRANCH',
  'METAPLEX_AUTH_TOKEN',
  'S3_ACCESS_KEY_ID',
  'S3_ENDPOINT',
  'S3_REGION',
  'S3_SECRET_ACCESS_KEY',
]

const configEnv = Object.fromEntries(
  Object.entries(process.env).filter(([key]) => configKeys.includes(key))
)

const defineGlobalsJs = `
const injectedEnv = JSON.parse('${JSON.stringify(configEnv)}')

for (const [key, val] of Object.entries(injectedEnv)) {
  globalThis[key] = val
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
    })
  },
}

const config = {
  inject: [
    path.join(__dirname, './scripts/node-globals.js'),
    injectGlobalsTempfile.path,
    // path.join(__dirname, './test/scripts/globals.js'),
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
