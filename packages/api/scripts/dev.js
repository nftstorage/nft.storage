#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'

import dotenv from 'dotenv'
import { Miniflare } from 'miniflare'
import { startServiceContainers } from './containers.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../../../.env')

dotenv.config({ path: envPath })

async function main() {
  // simplest arg parsing ever, lol
  const persistentVolumes = process.argv.includes('--persist')
  const { overrides } = await startServiceContainers({ persistentVolumes })

  const mf = new Miniflare({
    envPath,
    packagePath: true,
    wranglerConfigPath: true,
    wranglerConfigEnv: 'dev',
    watch: true,
    bindings: {
      ...overrides,
    },
    buildCommand: 'yarn build',
    buildBasePath: path.resolve(__dirname, '..'),
    port: 8787,
  })
  await mf.startServer()
  console.log('Dev API server listening on :8787')
  console.log('Env overrides: ', overrides)
}

// call entry point fn
main()
