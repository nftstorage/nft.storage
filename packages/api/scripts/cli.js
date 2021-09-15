#!/usr/bin/env node
import path from 'path'
import dotenv from 'dotenv'
import sade from 'sade'
import { fileURLToPath } from 'url'
import { build } from 'esbuild'
import Sentry from '@sentry/cli'
import { createRequire } from 'module'
import pg from 'pg'
import fs from 'fs'
import execa from 'execa'

const { Client } = pg
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
  .command('db-sql')
  .describe('Database scripts')
  .option('--reset', 'Reset db before running SQL.', false)
  .option('--cargo', 'Import cargo data.', false)
  .action(async (opts) => {
    const client = new Client({
      connectionString: process.env.DATABASE_CONNECTION,
    })
    await client.connect()
    const tables = fs.readFileSync(path.join(__dirname, '../db/tables.sql'), {
      encoding: 'utf-8',
    })
    const functions = fs.readFileSync(
      path.join(__dirname, '../db/functions.sql'),
      {
        encoding: 'utf-8',
      }
    )
    const reset = fs.readFileSync(path.join(__dirname, '../db/reset.sql'), {
      encoding: 'utf-8',
    })
    const cargo = fs.readFileSync(path.join(__dirname, '../db/cargo.sql'), {
      encoding: 'utf-8',
    })

    if (opts.reset) {
      await client.query(reset)
    }
    await client.query(tables)
    await client.query(functions)

    await client.query(
      `
CREATE EXTENSION IF NOT EXISTS postgres_fdw;

DROP SERVER IF EXISTS dag_cargo_server CASCADE;

CREATE SERVER dag_cargo_server
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (host '${process.env.DAG_CARGO_HOST}', dbname '${process.env.DAG_CARGO_DATABASE}', fetch_size '200000');

CREATE USER MAPPING FOR current_user
  SERVER dag_cargo_server
  OPTIONS (user '${process.env.DAG_CARGO_USER}', password '${process.env.DAG_CARGO_PASSWORD}');
    
    `
    )

    if (opts.cargo) {
      await client.query(cargo)
    }
    await client.end()
  })
  .command('db')
  .describe('Run docker compose to setup pg and pgrest')
  .option('--init', 'Init docker container', false)
  .option('--start', 'Start docker container', false)
  .option('--stop', 'Stop docker container', false)
  .option('--project', 'Project name', 'nft-storage')
  .option('--clean', 'Clean all dockers artifacts', false)
  .action(async (opts) => {
    const composePath = path.join(__dirname, '../db/docker/docker-compose.yml')
    if (opts.init) {
      await execa('docker-compose', [
        '--file',
        composePath,
        'build',
        '--no-cache',
      ])

      await execa('docker-compose', [
        '--file',
        composePath,
        '--project-name',
        opts.project,
        'up',
        '--build',
        '--no-start',
        '--renew-anon-volumes',
      ])
    }

    if (opts.start) {
      await execa('docker-compose', [
        '--file',
        composePath,
        '--project-name',
        opts.project,
        'up',
        '--detach',
      ])
    }

    if (opts.stop) {
      await execa('docker-compose', [
        '--file',
        composePath,
        '--project-name',
        opts.project,
        'stop',
      ])
    }

    if (opts.clean) {
      await execa('docker-compose', [
        '--file',
        composePath,
        '--project-name',
        opts.project,
        'down',
        '--rmi',
        'local',
        '-v',
        '--remove-orphans',
      ])
    }
  })

prog.parse(process.argv)
