import {
  modes as MaintenanceModes,
  DEFAULT_MODE,
} from './middleware/maintenance.js'

/**
 * @typedef {import('./bindings').ServiceConfiguration} ServiceConfiguration
 * @typedef {import('./bindings').RuntimeEnvironmentName} RuntimeEnvironmentName
 */

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
 * Load a {@link ServiceConfiguration} from the global environment.
 * @returns {ServiceConfiguration}
 */
export const getServiceConfig = () => {
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
  let clusterUrl
  if (!vars.CLUSTER_SERVICE) {
    clusterUrl = vars.CLUSTER_API_URL
  } else {
    clusterUrl = CLUSTER_SERVICE_URLS[vars.CLUSTER_SERVICE]
    if (!clusterUrl) {
      throw new Error(`unknown cluster service: ${vars.CLUSTER_SERVICE}`)
    }
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
    METAPLEX_AUTH_TOKEN: vars.METAPLEX_AUTH_TOKEN,
    MAILCHIMP_API_KEY: vars.MAILCHIMP_API_KEY,
    LOGTAIL_TOKEN: vars.LOGTAIL_TOKEN,
    S3_ENDPOINT: vars.S3_ENDPOINT,
    S3_REGION: vars.S3_REGION,
    S3_ACCESS_KEY_ID: vars.S3_ACCESS_KEY_ID,
    S3_SECRET_ACCESS_KEY: vars.S3_SECRET_ACCESS_KEY,
    S3_BUCKET_NAME: vars.S3_BUCKET_NAME,
    SLACK_USER_REQUEST_WEBHOOK_URL: vars.SLACK_USER_REQUEST_WEBHOOK_URL,
    PRIVATE_KEY: vars.PRIVATE_KEY,
    // These are injected in esbuild
    // @ts-ignore
    BRANCH: vars.NFT_STORAGE_BRANCH || NFT_STORAGE_BRANCH,
    // @ts-ignore
    VERSION: vars.NFT_STORAGE_VERSION || NFT_STORAGE_VERSION,
    // @ts-ignore
    COMMITHASH: vars.NFT_STORAGE_COMMITHASH || NFT_STORAGE_COMMITHASH,
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

  const required = [
    'ENV',
    'DEBUG',
    'SALT',
    'DATABASE_URL',
    'DATABASE_TOKEN',
    'MAGIC_SECRET_KEY',
    'MAILCHIMP_API_KEY',
    'METAPLEX_AUTH_TOKEN',
    'LOGTAIL_TOKEN',
    'PRIVATE_KEY',
    'SENTRY_DSN',
    'CLUSTER_BASIC_AUTH_TOKEN',
    'MAINTENANCE_MODE',
    'S3_REGION',
    'S3_ACCESS_KEY_ID',
    'S3_SECRET_ACCESS_KEY',
    'S3_BUCKET_NAME',
  ]

  for (const name of required) {
    const val = globals[name]
    if (typeof val === 'string') {
      vars[name] = val
    } else {
      throw new Error(
        `Missing required config variables: ${name}. Check your .env, testing globals or cloudflare vars.`
      )
    }
  }

  const optional = [
    'CLUSTER_SERVICE',
    'CLUSTER_API_URL',
    'S3_ENDPOINT',
    'SLACK_USER_REQUEST_WEBHOOK_URL',
  ]

  for (const name of optional) {
    const val = globals[name]
    if (typeof val === 'string') {
      vars[name] = val
    } else {
      console.warn(`Missing optional config variables: ${name}`)
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
