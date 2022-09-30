import { registerSharedWorker } from 'ava/plugin'
import { Miniflare } from 'miniflare'
import { createFetchMock } from '@miniflare/core'
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
 * @param {import('undici').MockAgent} fetchMock
 * @returns
 */
export function makeMiniflare(bindings, fetchMock) {
  const envPath = path.join(__dirname, '../../../../.env')

  const { DATABASE_URL, CLUSTER_API_URL, S3_ENDPOINT } = process.env

  return new Miniflare({
    // Autoload configuration from `.env`, `package.json` and `wrangler.toml`
    envPath,
    packagePath: true,
    wranglerConfigPath: true,
    // We don't want to rebuild our worker for each test, we're already doing
    // it once before we run all tests in package.json, so disable it here.
    // This will override the option in wrangler.toml.
    buildCommand: undefined,
    bindings: {
      ...bindings,
      DATABASE_URL,
      CLUSTER_API_URL,
      S3_ENDPOINT,
    },
    fetchMock,
    // workaround for https://github.com/cloudflare/miniflare/issues/292
    globalAsyncIO: true,
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
 * @param {Record<string, string>} [opts.overrides]
 */
export async function setupMiniflareContext(t, { overrides = {} } = {}) {
  t.timeout(600 * 1000, 'timed out pulling / starting test containers')
  const mfFetchMock = createFetchMock()
  const mf = makeMiniflare(overrides, mfFetchMock)

  const bindings = await mf.getBindings()
  const configGlobals = { ...versionInfo(), ...bindings }
  const serviceConfig = serviceConfigFromVariables(configGlobals)
  t.context = { mf, serviceConfig, mfFetchMock }
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

/**
 *
 * @param {import('ava').ExecutionContext<unknown>} t
 * @returns {import('undici').MockAgent}
 */
export function getMiniflareFetchMock(t) {
  // @ts-ignore
  const { mfFetchMock } = t.context
  if (!mfFetchMock) {
    throw new Error(
      'no mfFetchMock found. make sure you call setupMiniflareContext in a before hook!'
    )
  }
  return mfFetchMock
}
