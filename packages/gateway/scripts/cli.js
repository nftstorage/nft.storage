#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sade from 'sade'
import { build } from 'esbuild'
import git from 'git-rev-sync'

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
    try {
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
          global: 'globalThis',
        },
        minify: opts.env === 'dev' ? false : true,
        sourcemap: true,
      })
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })

prog.parse(process.argv)
