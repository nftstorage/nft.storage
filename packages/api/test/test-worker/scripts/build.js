#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import { build } from 'esbuild'
import { createRequire } from 'module'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const require = createRequire(__dirname)

/** @type {import('esbuild').Plugin} */
const PluginAlias = {
  name: 'alias',
  setup(build) {
    build.onResolve({ filter: /^stream$/ }, () => {
      return { path: require.resolve('readable-stream') }
    })

    build.onResolve({ filter: /^node-fetch$/ }, () => {
      return { path: path.resolve(__dirname, '../../../scripts/fetch.js') }
    })
    build.onResolve({ filter: /^cross-fetch$/ }, () => {
      return { path: path.resolve(__dirname, '../../../scripts/fetch.js') }
    })
  },
}

const builder = async () => {
  try {
    const version = 'test-version'
    const commit = 'test-commit'
    const branch = 'test-branch'
    await build({
      entryPoints: [path.join(__dirname, '../src/index.js')],
      bundle: true,
      outfile: path.join(__dirname, '../dist/worker.js'),
      legalComments: 'external',
      plugins: [PluginAlias],
      define: {
        NFT_STORAGE_VERSION: JSON.stringify(version),
        NFT_STORAGE_COMMITHASH: JSON.stringify(commit),
        NFT_STORAGE_BRANCH: JSON.stringify(branch),
        global: 'globalThis',
      },
      minify: false,
      sourcemap: true,
      external: ['node:crypto'], // TODO: remove this (and the one in main build script) once all crypto code is running in miniflare
    })
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

builder().catch((e) => {
  console.error('build error: ', e)
  process.exit(1)
})
