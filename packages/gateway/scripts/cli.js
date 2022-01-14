#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sade from 'sade'
import { build } from 'esbuild'
import git from 'git-rev-sync'
import Sentry from '@sentry/cli'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
)

const prog = sade('gateway')

prog
  .command('build')
  .describe('Build the worker.')
  .option('--env', 'Environment', 'dev')
  .action(async (opts) => {
    const version = `${pkg.name}@${pkg.version}-${opts.env}+${git.short(
      __dirname
    )}`

    await build({
      entryPoints: [path.join(__dirname, '../src/index.js')],
      bundle: true,
      format: 'esm',
      outfile: 'dist/index.mjs',
      legalComments: 'external',
      define: {
        VERSION: JSON.stringify(version),
        COMMITHASH: JSON.stringify(git.long(__dirname)),
        BRANCH: JSON.stringify(git.branch(__dirname)),
        ENV: opts.env || 'dev',
        global: 'globalThis',
      },
      minify: opts.env === 'dev' ? false : true,
      sourcemap: true,
    })

    // Sentry release and sourcemap upload
    if (process.env.SENTRY_UPLOAD === 'true') {
      const cli = new Sentry(undefined, {
        authToken: process.env.SENTRY_TOKEN,
        org: 'protocol-labs-it',
        project: 'nft-gateway',
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
  })

prog.parse(process.argv)
