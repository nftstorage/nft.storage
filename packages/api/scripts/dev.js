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
  console.log('🚢📦 Starting service containers...')
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

  console.log('🚢📦 Containers started.\n')
  console.log('🌎 Environment overrides: ')
  console.log(formatEnvVars(overrides) + '\n')
  console.log('📡 Dev API server listening on http://localhost:8787')
}

/**
 * Format environment overrides for easier copy/paste to shell or .env file
 * @param {Record<string, string>} vars
 */
function formatEnvVars(vars) {
  return Object.entries(vars)
    .map(([k, v]) => `export ${k}=${v}`)
    .join('\n')
}

// call entry point fn
main()
