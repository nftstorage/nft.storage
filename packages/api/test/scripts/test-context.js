import { Miniflare } from 'miniflare'
import path from 'path'
import { fileURLToPath } from 'url'
import { serviceConfigFromVariables } from '../../src/config.js'
const __dirname = fileURLToPath(new URL('.', import.meta.url))

import { startTestContainers } from './containers.js'

/**
 *
 * @param {Record<string, string>} bindings
 * @returns
 */
export function makeMiniflare(bindings = {}) {
  // Create a new Miniflare environment for each test
  return new Miniflare({
    // Autoload configuration from `.env`, `package.json` and `wrangler.toml`
    envPath: path.join(__dirname, 'test.env'),
    packagePath: true,
    wranglerConfigPath: true,
    // We don't want to rebuild our worker for each test, we're already doing
    // it once before we run all tests in package.json, so disable it here.
    // This will override the option in wrangler.toml.
    buildCommand: undefined,
    bindings,
  })
}

/**
 * @param {Record<string, string>} vars
 */
export const defineGlobals = (vars) => {
  /** @type Record<string, unknown> */
  const globals = globalThis
  for (const [k, v] of Object.entries(vars)) {
    globals[k] = v
  }
}

/**
 *
 * @param {import('ava').ExecutionContext<unknown>} t
 * @param {object} opts
 * @param {boolean} [opts.bindGlobals]
 * @param {boolean} [opts.noContainers]
 * @param {Record<string, string>} [opts.overrides]
 */
export async function setupMiniflareContext(
  t,
  { bindGlobals = false, noContainers = false, overrides = {} } = {}
) {
  t.timeout(600 * 1000, 'timed out pulling / starting test containers')

  if (!noContainers) {
    // start database containers
    const { postgrest, cluster, minio } = await startTestContainers()
    overrides.DATABASE_URL = postgrest.url
    overrides.CLUSTER_API_URL = cluster.url
    overrides.S3_ENDPOINT = minio.url
  }

  const mf = makeMiniflare(overrides)

  const bindings = await mf.getBindings()
  // console.log('miniflare bindings', bindings)
  const serviceConfig = serviceConfigFromVariables(bindings)
  if (bindGlobals) {
    // optionally pull cloudflare bindings into the global scope of the test runner
    defineGlobals(bindings)
  }
  t.context = { mf, serviceConfig }
}

/**
 *
 * @param {import('ava').ExecutionContext<unknown>} t
 * @returns {Miniflare}
 */
export function getMiniflareContext(t) {
  // @ts-ignore
  const { mf } = t.context
  if (!mf) {
    throw new Error(
      'no Miniflare context found. make sure you call setupMiniflareContext in a before hook!'
    )
  }
  return mf
}

/**
 *
 * @param {import('ava').ExecutionContext<unknown>} t
 * @returns {import('../../src/config.js').ServiceConfiguration}
 */
export function getTestServiceConfig(t) {
  // @ts-ignore
  const { serviceConfig } = t.context
  if (!serviceConfig) {
    throw new Error(
      'no service config found in test context. make sure to call setupMiniflareContext in a before hook'
    )
  }
  return serviceConfig
}
