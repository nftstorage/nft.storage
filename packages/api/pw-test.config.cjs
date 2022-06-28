const path = require('path')
const dotenv = require('dotenv')
const execa = require('execa')
const delay = require('delay')

/** @typedef {{ proc: execa.ExecaChildProcess<string> }} ProcessObject */

dotenv.config({ path: path.join(__dirname, '../../.env') })

const cli = path.join(__dirname, 'scripts/cli.js')

/** @type {import('esbuild').Plugin} */
const nodeBuiltinsPlugin = {
  name: 'node builtins',
  setup(build) {
    build.onResolve({ filter: /^stream$/ }, () => {
      return { path: require.resolve('readable-stream') }
    })

    build.onResolve({ filter: /^cross-fetch$/ }, () => {
      return { path: path.resolve(__dirname, 'scripts/fetch.js') }
    })
  },
}

const config = {
  inject: [
    path.join(__dirname, './scripts/node-globals.js'),
    path.join(__dirname, './test/scripts/globals.js'),
  ],
  define: {
    NFT_STORAGE_VERSION: JSON.stringify('0.1.0'),
    NFT_STORAGE_COMMITHASH: JSON.stringify('322332'),
    NFT_STORAGE_BRANCH: JSON.stringify('main'),
  },
  plugins: [nodeBuiltinsPlugin],
}

const project = 'nft-storage-test'

/** @type {import('playwright-test').RunnerOptions} */
module.exports = {
  buildConfig: config,
  buildSWConfig: config,
  beforeTests: async () => {
    console.log('⚡️ Starting Cluster, PostgreSQL, PostgREST and Minio')
    await execa(cli, ['services', 'start', '--project', project], {
      stdio: 'inherit',
    })

    console.log('⚡️ Loading DB schema')
    await execa(cli, ['db-sql', '--cargo', '--testing', '--reset'], {
      stdio: 'inherit',
    })

    console.log('⚡️ Creating Minio bucket')
    await execa(cli, ['minio', 'bucket', 'create', 'dotstorage-test-0'], {
      stdio: 'inherit',
    })

    await delay(2000)
  },
  afterTests: async () => {
    console.log('🛑 Stopping services')
    await execa(cli, ['services', 'stop', '--project', project, '--clean'], {
      stdio: 'inherit',
    })
  },
}
