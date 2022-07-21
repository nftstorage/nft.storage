#!/usr/bin/env node
import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs'
import sade from 'sade'
import { fileURLToPath } from 'url'
import { build } from 'esbuild'
import Sentry from '@sentry/cli'
import { createRequire } from 'module'
// @ts-ignore
import git from 'git-rev-sync'
import {
  servicesStartCmd,
  servicesStopCmd,
  servicesPullCmd,
} from './cmds/services.js'
import { dbSqlCmd } from './cmds/db-sql.js'
import { dbTypesCmd } from './cmds/db-types.js'
import { minioBucketCreateCmd, minioBucketRemoveCmd } from './cmds/minio.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const prog = sade('api')

dotenv.config({
  path: path.join(__dirname, '..', '..', '..', '.env'),
})

const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
)

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
    build.onResolve({ filter: /^cross-fetch$/ }, () => {
      return { path: path.resolve(__dirname, 'fetch.js') }
    })
  },
}
prog
  .command('build')
  .describe('Build the worker.')
  .option('--env', 'Environment', 'dev')
  .action(async (opts) => {
    try {
      const version = `${pkg.name}@${pkg.version}-${opts.env}+${git.short(
        __dirname
      )}`
      const commit = git.long(__dirname)
      const branch = git.branch(__dirname)

      await build({
        entryPoints: [path.join(__dirname, '../src/index.js')],
        bundle: true,
        outfile: 'dist/worker.js',
        legalComments: 'external',
        inject: [path.join(__dirname, 'node-globals.js')],
        plugins: [PluginAlias],
        define: {
          NFT_STORAGE_VERSION: JSON.stringify(version),
          NFT_STORAGE_COMMITHASH: JSON.stringify(commit),
          NFT_STORAGE_BRANCH: JSON.stringify(branch),
          global: 'globalThis',
        },
        minify: opts.env === 'dev' || opts.env === 'test' ? false : true,
        sourcemap: true,
      })

      // Sentry release and sourcemap upload
      if (process.env.SENTRY_UPLOAD === 'true') {
        const cli = new Sentry(undefined, {
          authToken: process.env.SENTRY_TOKEN,
          org: 'protocol-labs-it',
          project: 'api',
          dist: git.short(__dirname),
        })

        await cli.releases.new(version)
        await cli.releases.setCommits(version, {
          auto: true,
          ignoreEmpty: true,
          ignoreMissing: true,
        })
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
  .command('services start')
  .describe(
    'Run docker compose to setup Cluster, PostgreSQL, PostgREST and Minio'
  )
  .option('--project', 'Project name', 'nft-storage-dev')
  .action(servicesStartCmd)
  .command('services stop')
  .describe(
    'Run docker compose to setup Cluster, PostgreSQL, PostgREST and Minio'
  )
  .option('--project', 'Project name', 'nft-storage-dev')
  .option('--clean', 'Clean all dockers artifacts', false)
  .action(servicesStopCmd)
  .command('services pull')
  .describe('pull and build all docker images used for dev/test')
  .action(servicesPullCmd)
  .command('db-sql')
  .describe('Database scripts')
  .option('--reset', 'Reset db before running SQL.', false)
  .option('--cargo', 'Import cargo data.', false)
  .option('--testing', 'Tweak schema for testing.', false)
  .action(dbSqlCmd)
  .command('db-types')
  .describe('Database openapi types')
  .action(dbTypesCmd)
  .command('minio bucket create <name>')
  .describe('Create a new bucket')
  .action(minioBucketCreateCmd)
  .command('minio bucket remove <name>')
  .describe('Remove a bucket, automatically removing all contents')
  .action(minioBucketRemoveCmd)

prog.parse(process.argv)
