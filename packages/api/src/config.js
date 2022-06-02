import {
  modes as MaintenanceModes,
  DEFAULT_MODE,
} from './middleware/maintenance.js'

/**
 * @typedef {import('./bindings').ServiceConfiguration} ServiceConfiguration
 * @typedef {import('./bindings').RuntimeEnvironmentName} RuntimeEnvironmentName
 */

/**
 * Default configuration values to be used in test and dev if no explicit definition is found.
 *
 * @type Record<string, string>
 */
export const DEFAULT_CONFIG_VALUES = {
  SALT: 'secret',
  DEBUG: 'true',
  DATABASE_URL: 'http://post-rest:3000',
  DATABASE_TOKEN:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoic2VydmljZV9yb2xlIn0.necIJaiP7X2T2QjGeV-FhpkizcNTX8HjDDBAxpgQTEI',
  CLUSTER_API_URL: 'http://ipfs-cluster:9094',
  CLUSTER_BASIC_AUTH_TOKEN: 'dGVzdDp0ZXN0', // test:test
  MAGIC_SECRET_KEY: 'test',
  ENV: 'test',
  SENTRY_DSN: 'https://test@test.ingest.sentry.io/0000000',
  NFT_STORAGE_BRANCH: 'test',
  NFT_STORAGE_VERSION: 'test',
  NFT_STORAGE_COMMITHASH: 'test',
  MAINTENANCE_MODE: 'rw',
  METAPLEX_AUTH_TOKEN: 'metaplex-test-token',
  MAILCHIMP_API_KEY: '',
  LOGTAIL_TOKEN: '',
  S3_ENDPOINT: 'http://localhost:9095',
  S3_REGION: 'test',
  S3_ACCESS_KEY_ID: 'test',
  S3_SECRET_ACCESS_KEY: 'test',
  S3_BUCKET_NAME: 'test',
  PRIVATE_KEY: 'xmbtWjE9eYuAxae9G65lQSkw36HV6H+0LSFq2aKqVwY=',
}
// export const DEFAULT_CONFIG_VALUES = process && process.env ? process.env : {}
/**
 * If the CLUSTER_SERVICE variable is set, the service URL will be resolved from here.
 *
 * @type Record<string, string> */
const CLUSTER_SERVICE_URLS = {
  IpfsCluster: 'https://nft.storage.ipfscluster.io/api/',
  IpfsCluster2: 'https://nft2.storage.ipfscluster.io/api/',
  IpfsCluster3: 'https://nft3.storage.ipfscluster.io/api/',
}

/**
 * @param {RuntimeEnvironmentName} env
 * @returns {boolean} true if the named runtime environment should fallback to values from DEFAULT_CONFIG_VALUES if no config var is present.
 */
const allowDefaultConfigValues = (env) => env === 'test' || env === 'dev'

/** @type ServiceConfiguration|undefined */
let _globalConfig

/**
 * Returns a {@link ServiceConfiguration} object containing the runtime config options for the API service.
 * Includes anything injected by the environment (secrets, URLs for services we call out to, maintenance flag, etc).
 *
 * Loaded from global variables injected by CloudFlare Worker runtime.
 *
 * Lazily loaded and cached on first access.
 */
export const getServiceConfig = () => {
  if (_globalConfig) {
    return _globalConfig
  }
  _globalConfig = loadServiceConfig()
  return _globalConfig
}

/**
 * Override the global service configuration for testing purposes.
 * Note that some files call {@link getServiceConfig} at module scope,
 * so they may not pick up the overriden config.
 *
 * @param {ServiceConfiguration} config
 */
export const overrideServiceConfigForTesting = (config) => {
  _globalConfig = config
}

/**
 * Load a {@link ServiceConfiguration} from the global environment.
 *
 * Exported for testing. See {@link getServiceConfig} for main public accessor.
 *
 * Config values are resolved by looking for global variables with the names matching the keys of {@link DEFAULT_CONFIG_VALUES}.
 *
 * If no global value is found for a variable, an error will be thrown if the runtimeEnvironment (ENV variable)
 * is set to a "production like" environment.
 *
 * If {@link allowDefaultConfigValues} returns true for the current environment, the value from {@link DEFAULT_CONFIG_VALUES} will be
 * used if a variable is missing.
 *
 * @returns {ServiceConfiguration}
 */
export function loadServiceConfig() {
  const vars = loadConfigVariables()
  return serviceConfigFromVariables(vars)
}

/**
 * Parse a {@link ServiceConfiguration} out of the given `configVars` map.
 * @param {Record<string, string>} vars map of variable names to values.
 *
 * Exported for testing. See {@link getServiceConfig} for main public accessor.
 *
 * @returns {ServiceConfiguration}
 */
export function serviceConfigFromVariables(vars) {
  let clusterUrl = vars.CLUSTER_API_URL
  if (vars.CLUSTER_SERVICE) {
    const serviceUrl = CLUSTER_SERVICE_URLS[vars.CLUSTER_SERVICE]
    if (!serviceUrl) {
      throw new Error(`unknown cluster service: ${vars.CLUSTER_SERVICE}`)
    }
    clusterUrl = serviceUrl
  }

  return {
    ENV: parseRuntimeEnv(vars.ENV),
    DEBUG: boolValue(vars.DEBUG),
    MAINTENANCE_MODE: maintenanceModeFromString(vars.MAINTENANCE_MODE),

    SALT: vars.SALT,
    DATABASE_URL: vars.DATABASE_URL,
    DATABASE_TOKEN: vars.DATABASE_TOKEN,
    CLUSTER_API_URL: clusterUrl,
    CLUSTER_BASIC_AUTH_TOKEN: vars.CLUSTER_BASIC_AUTH_TOKEN,
    MAGIC_SECRET_KEY: vars.MAGIC_SECRET_KEY,
    SENTRY_DSN: vars.SENTRY_DSN,
    NFT_STORAGE_BRANCH: vars.NFT_STORAGE_BRANCH,
    NFT_STORAGE_VERSION: vars.NFT_STORAGE_VERSION,
    NFT_STORAGE_COMMITHASH: vars.NFT_STORAGE_COMMITHASH,
    METAPLEX_AUTH_TOKEN: vars.METAPLEX_AUTH_TOKEN,
    MAILCHIMP_API_KEY: vars.MAILCHIMP_API_KEY,
    LOGTAIL_TOKEN: vars.LOGTAIL_TOKEN,
    S3_ENDPOINT: vars.S3_ENDPOINT,
    S3_REGION: vars.S3_REGION,
    S3_ACCESS_KEY_ID: vars.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: vars.S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME: vars.S3_BUCKET_NAME,
    PRIVATE_KEY: vars.PRIVATE_KEY,
  }
}

/**
 * Loads configuration variables from the global environment and returns a JS object
 * keyed by variable names.
 *
 * Exported for testing. See {@link getServiceConfig} for main config accessor.
 *
 * @returns { Record<string, string>} an object with `vars` containing all config variables and their values. guaranteed to have a value for each key defined in DEFAULT_CONFIG_VALUES
 * @throws if a config variable is missing, unless ENV is 'test' or 'dev', in which case the default value will be used for missing vars.
 */
export function loadConfigVariables() {
  /** @type Record<string, string> */
  const vars = {}

  /** @type Record<string, unknown> */
  const globals = globalThis

  const notFound = []
  for (const name of Object.keys(DEFAULT_CONFIG_VALUES)) {
    const val = globals[name]
    if (typeof val === 'string') {
      vars[name] = val
    } else {
      notFound.push(name)
    }
  }

  if (notFound.length !== 0) {
    const env = parseRuntimeEnv(vars.ENV)
    if (!allowDefaultConfigValues(env)) {
      throw new Error(
        'Missing required config variables: ' + notFound.join(', ')
      )
    }
    console.warn(
      'Using default values for config variables: ',
      notFound.join(', ')
    )
    for (const name of notFound) {
      vars[name] = DEFAULT_CONFIG_VALUES[name]
    }
  }

  return vars
}

/**
 * Validates that `s` is a defined runtime environment name and returns it.
 *
 * @param {unknown} s
 * @returns {RuntimeEnvironmentName}
 */
function parseRuntimeEnv(s) {
  if (!s) {
    return 'test'
  }

  switch (s) {
    case 'test':
    case 'dev':
    case 'staging':
    case 'production':
      return s
    default:
      throw new Error('invalid runtime environment name: ' + s)
  }
}

/**
 * If `s` is undefined, return the default maintenance mode. Otherwise, make sure it's a valid mode and return.
 *
 * @param {string|undefined} s
 * @returns {import('./middleware/maintenance').Mode}
 */
function maintenanceModeFromString(s) {
  if (s === undefined) {
    return DEFAULT_MODE
  }
  for (const m of MaintenanceModes) {
    if (s === m) {
      return m
    }
  }
  throw new Error(
    `invalid maintenance mode value "${s}". valid choices: ${MaintenanceModes}`
  )
}

/**
 * Returns `true` if the string `s` is equal to `"true"` (case-insensitive) or `"1", and false for `"false"`, `"0"` or an empty value.
 *
 * @param {string} s
 * @returns {boolean}
 */
function boolValue(s) {
  return Boolean(s && JSON.parse(String(s).toLowerCase()))
}
