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
    const proc = execa('smoke', ['-p', '9094', 'test/mocks/cluster'], {
      preferLocal: true,
    })

    if (proc.stdout) {
      const stdout = await Promise.race([
        once(proc.stdout, 'data'),
        // Make sure that we fail if process crashes. However if it exits without
        // producing stdout just resolve to ''.
        proc.then(() => ''),
      ])

      if (
        stdout.toString().includes('Server started on: http://localhost:9094')
      ) {
        console.log('⚡️ Mock IPFS Cluster started.')

        await execa(cli, ['db', '--start', '--project', project])
        console.log('⚡️ Postgres started.')

        await execa(cli, ['db-sql', '--cargo', '--testing'])
        console.log('⚡️ SQL schema loaded.')

        proc.stdout.on('data', (line) => console.log(line.toString()))
        return { proc, project }
      } else {
        throw new Error('Could not start smoke server')
      }
    } else {
      throw new Error('Could not start smoke server')
    }
  },
  afterTests: async (ctx, /** @type{any} */ beforeTests) => {
    console.log('⚡️ Shutting down mock servers.')

    await execa(cli, ['db', '--clean', '--project', beforeTests.project])

    /** @type {import('execa').ExecaChildProcess} */
    const proc = beforeTests.proc
    const killed = proc.kill()
  },
}
