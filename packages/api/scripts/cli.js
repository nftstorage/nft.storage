#!/usr/bin/env node
import path from 'path'
import dotenv from 'dotenv'
import sade from 'sade'
import { fileURLToPath } from 'url'
import { build } from 'esbuild'
import Sentry from '@sentry/cli'
import { createRequire } from 'module'
// @ts-ignore
import git from 'git-rev-sync'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const version = git.short(__dirname)
const prog = sade('api')

dotenv.config({
  path: path.join(__dirname, '../.env.local'),
})

/** @type {import('esbuild').Plugin} */
const PluginAlias = {
  name: 'alias',
  setup(build) {
    build.onResolve({ filter: /^stream$/ }, () => {
      return { path: require.resolve('readable-stream') }
    })

    build.onResolve({ filter: /^node-fetch$/ }, () => {
      return { path: path.resolve(__dirname, 'fetch.js') }
    })
  },
}
prog
  .command('build')
  .describe('Build the worker.')
  .option('--env', 'Environment', 'dev')
  .action(async opts => {
    try {
      await build({
        entryPoints: [path.join(__dirname, '../src/index.js')],
        bundle: true,
        outfile: 'dist/worker.js',
        legalComments: 'external',
        inject: [path.join(__dirname, 'node-globals.js')],
        plugins: [PluginAlias],
        define: {
          VERSION: JSON.stringify(version),
          COMMITHASH: JSON.stringify(git.long(__dirname)),
          BRANCH: JSON.stringify(git.branch(__dirname)),
          global: 'globalThis',
        },
        minify: opts.env === 'dev' ? false : true,
        sourcemap: 'external',
      })

      // Sentry release and sourcemap upload
      if (process.env.SENTRY_UPLOAD === 'true') {
        const cli = new Sentry(undefined, {
          authToken: process.env.SENTRY_TOKEN,
          org: 'protocol-labs-it',
          project: 'api',
        })

        await cli.releases.new(version)
        await cli.releases.uploadSourceMaps(version, {
          include: ['./dist'],
          urlPrefix: '/',
        })
        await cli.releases.finalize(version)
        await cli.releases.newDeploy(version, {
          env: opts.env,
        })
      }
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })
prog.parse(process.argv)
