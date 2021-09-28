const path = require('path')
const dotenv = require('dotenv')
const execa = require('execa')
const { once } = require('events')

dotenv.config({
  path: path.join(__dirname, '.env.local'),
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
    const proc = execa('smoke', ['-p', '9094', 'test/mocks/cluster'], {
      preferLocal: true,
    })
    const stdout = await once(proc.stdout, 'data')

    if (
      stdout.toString().includes('Server started on: http://localhost:9094')
    ) {
      console.log('⚡️ Mock cluster started.')
      await execa(cli, ['db', '--start', '--project', project])
      await execa(cli, ['db-sql', '--cargo', '--testing'])

      console.log('⚡️ Mock postgres started.')
      proc.stdout.on('data', (line) => console.log(line.toString()))
      return { proc, project }
    }

    throw new Error('Could not start smoke server')
  },
  afterTests: async (ctx, beforeTests) => {
    console.log('⚡️ Shutting down mock servers.')
    /** @type {import('execa').ExecaChildProcess} */
    const proc = beforeTests.proc
    const killed = proc.kill()
    await execa(cli, ['db', '--clean', '--project', beforeTests.project])
  },
}
