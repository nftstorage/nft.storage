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
import { dbCmd } from './cmds/db.js'
import { dbSqlCmd } from './cmds/db-sql.js'
import { dbTypesCmd } from './cmds/db-types.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)
const prog = sade('api')

// dotenv.config({
//   path: path.join(__dirname, '..', '..', '..', '.env'),
// })

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
  .command('db-sql')
  .describe('Database scripts')
  .option('--reset', 'Reset db before running SQL.', false)
  .option('--cargo', 'Import cargo data.', false)
  .option('--testing', 'Tweak schema for testing.', false)
  .action(dbSqlCmd)
  .command('db')
  .describe('Run docker compose to setup pg and pgrest')
  .option('--init', 'Init docker container', false)
  .option('--start', 'Start docker container', false)
  .option('--stop', 'Stop docker container', false)
  .option('--project', 'Project name', 'nft-storage')
  .option('--clean', 'Clean all dockers artifacts', false)
  .action(dbCmd)
  .command('db-types')
  .describe('Database openapi types')
  .action(dbTypesCmd)
  .command('build')
  .action(() => {})

prog.parse(process.argv)
