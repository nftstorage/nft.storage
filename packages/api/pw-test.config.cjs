const path = require('path')
const dotenv = require('dotenv')
const execa = require('execa')
const { once } = require('events')

dotenv.config({
  path: path.join(__dirname, '../../.env'),
})

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

/** @type {import('playwright-test').RunnerOptions} */
module.exports = {
  buildConfig: {
    inject: [path.join(__dirname, './scripts/node-globals.js')],
    plugins: [nodeBuiltinsPlugin],
    define: {
      DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
      DATABASE_TOKEN: JSON.stringify(process.env.DATABASE_TOKEN),
    },
  },
  buildSWConfig: {
    inject: [
      path.join(__dirname, './scripts/node-globals.js'),
      path.join(__dirname, './test/scripts/worker-globals.js'),
    ],
    plugins: [nodeBuiltinsPlugin],
    define: {
      DATABASE_URL: JSON.stringify(process.env.DATABASE_URL),
      DATABASE_TOKEN: JSON.stringify(process.env.DATABASE_TOKEN),
    },
  },
  beforeTests: async () => {
    const project = `nft-storage-db-${Date.now()}`

    const mockServers = [
      await startMockServer('IPFS Cluster', 9094, 'test/mocks/cluster'),
      await startMockServer('AWS S3', 9095, 'test/mocks/aws-s3'),
    ]

    await execa(cli, ['db', '--start', '--project', project])
    console.log('⚡️ Postgres started.')

    await execa(cli, ['db-sql', '--cargo', '--testing'])
    console.log('⚡️ SQL schema loaded.')

    return { mockServers, project }
  },
  afterTests: async (ctx, beforeTests) => {
    console.log('⚡️ Shutting down mock servers.')

    await execa(cli, ['db', '--clean', '--project', beforeTests.project])

    beforeTests.mockServers.forEach(({ proc }) => proc.kill())
  },
}

/**
 * @param {string} name
 * @param {number} port
 * @param {string} handlerPath
 * @returns {Promise<{ proc: execa.ExecaChildProcess<string> }>}
 */
async function startMockServer(name, port, handlerPath) {
  const proc = execa('smoke', ['-p', port, handlerPath], {
    preferLocal: true,
  })

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
