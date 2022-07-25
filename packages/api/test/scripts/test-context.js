import { registerSharedWorker } from 'ava/plugin'
import { Miniflare } from 'miniflare'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { serviceConfigFromVariables } from '../../src/config.js'
// @ts-ignore
import git from 'git-rev-sync'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '..', 'package.json'), 'utf8')
)

/**
 *
 * @param {Record<string, string>} bindings
 * @returns
 */
export function makeMiniflare(bindings = {}) {
  const envPath = path.join(__dirname, '../../../../.env')
  return new Miniflare({
    // Autoload configuration from `.env`, `package.json` and `wrangler.toml`
    envPath,
    packagePath: true,
    wranglerConfigPath: true,
    // We don't want to rebuild our worker for each test, we're already doing
    // it once before we run all tests in package.json, so disable it here.
    // This will override the option in wrangler.toml.
    buildCommand: undefined,
    bindings,
  })
}

/** Re-create the version information injected by esbuild, which is not available via the Miniflare API.
 *  This allows us to create a valid {@link ServiceConfiguration} object outside of the miniflare environment.
 */
function versionInfo(env = 'test') {
  const NFT_STORAGE_VERSION = `${pkg.name}@${pkg.version}-${env}+${git.short(
    __dirname
  )}`
  const NFT_STORAGE_COMMITHASH = git.long(__dirname)
  const NFT_STORAGE_BRANCH = git.branch(__dirname)

  return { NFT_STORAGE_VERSION, NFT_STORAGE_BRANCH, NFT_STORAGE_COMMITHASH }
}

/**
 *
 * @param {import('ava').ExecutionContext<unknown>} t
 * @param {object} opts
 * @param {boolean} [opts.noContainers]
 * @param {Record<string, string>} [opts.overrides]
 */
export async function setupMiniflareContext(
  t,
  { noContainers = false, overrides = {} } = {}
) {
  t.timeout(600 * 1000, 'timed out pulling / starting test containers')

  if (!noContainers) {
    const sharedWorker = await registerSharedWorker({
      filename: path.resolve(__dirname, 'containers.js'),
      supportedProtocols: ['ava-4'],
    })

    // wait for the shared worker to publish an object with env var overrides
    for await (const message of sharedWorker.subscribe()) {
      if (!message.data || typeof message.data !== 'object') {
        continue
      }
      if (!('overrides' in message.data)) {
        continue
      }
      // @ts-ignore
      overrides = { ...overrides, ...message.data.overrides }
      break
    }
  }

  const mf = makeMiniflare(overrides)

  const bindings = await mf.getBindings()
  const configGlobals = { ...versionInfo(), ...bindings }
  const serviceConfig = serviceConfigFromVariables(configGlobals)
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
