import {
  modes as MaintenanceModes,
  DEFAULT_MODE,
} from './middleware/maintenance.js'

/**
 * @typedef {import('./bindings').ServiceConfiguration} ServiceConfiguration
 * @typedef {import('./bindings').RuntimeEnvironmentName} RuntimeEnvironmentName
 */

/**
 * Defines all configuration keys that are read from the environment,
 * along with a default value that can be used in unit tests.
 *
 * To define a new configuration variable, you MUST add a default value
 * to this object, as the keys are used to figure out which variables to
 * look for when loading the runtime config.
 *
 * @type Record<string, string> */
export const DEFAULT_CONFIG_VALUES = {
  SALT: 'secret',
  DEBUG: 'true',
  DATABASE_URL: 'http://localhost:3000',
  DATABASE_TOKEN:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoic2VydmljZV9yb2xlIn0.necIJaiP7X2T2QjGeV-FhpkizcNTX8HjDDBAxpgQTEI',
  CLUSTER_SERVICE: '',
  CLUSTER_API_URL: 'http://localhost:9094',
  CLUSTER_BASIC_AUTH_TOKEN: 'dGVzdDp0ZXN0', // test:test
  MAGIC_SECRET_KEY: 'test',
  ENV: 'test',
  SENTRY_DSN: 'https://test@test.ingest.sentry.io/0000000',
  BRANCH: 'test',
  VERSION: 'test',
  COMMITHASH: 'test',
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

/** @type ServiceConfiguration|undefined */
let _globalConfig

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

  // in "strict" environments (staging & production), we force all config variables
  // to have a defined value. In dev & test, we allow falling back to default config values.
  const env = runtimeEnvFromString(vars['ENV'])
  if (allowDefaultConfigValues(env)) {
    mergeWithDefaultValues(vars, env)
  } else {
    ensureAllVarsAreDefined(vars, env)
  }

  return serviceConfigFromVariables(vars)
}

/**
 * Parse a {@link ServiceConfiguration} out of the given `configVars` map.
 * @param {Record<string, string>} configVars map of variable names to values.
 *
 * Exported for testing. See {@link getServiceConfig} for main public accessor.
 *
 * @returns {ServiceConfiguration}
 */
export function serviceConfigFromVariables(configVars) {
  let clusterUrl = configVars.CLUSTER_API_URL
  if (configVars.CLUSTER_SERVICE) {
    const serviceUrl = CLUSTER_SERVICE_URLS[configVars.CLUSTER_SERVICE]
    if (!serviceUrl) {
      throw new Error(`unknown cluster service: ${configVars.CLUSTER_SERVICE}`)
    }
    clusterUrl = serviceUrl
  }

  return {
    isDebugBuild: boolValue(configVars.DEBUG),
    runtimeEnvironment: runtimeEnvFromString(configVars.ENV),
    version: {
      semver: configVars.VERSION,
      branch: configVars.BRANCH,
      commitHash: configVars.COMMITHASH,
    },

    maintenanceMode: maintenanceModeFromString(configVars.MAINTENANCE_MODE),

    secrets: {
      salt: configVars.SALT,
      metaplexAuthToken: configVars.METAPLEX_AUTH_TOKEN,
      ucanPrivateKey: configVars.PRIVATE_KEY,
    },

    external: {
      cluster: {
        url: clusterUrl,
        basicAuthToken: configVars.CLUSTER_BASIC_AUTH_TOKEN,
      },

      database: {
        url: configVars.DATABASE_URL,
        authToken: configVars.DATABASE_TOKEN,
      },

      s3: {
        endpoint: configVars.S3_ENDPOINT,
        region: configVars.S3_REGION,
        accessKeyId: configVars.S3_ACCESS_KEY_ID,
        secretAccessKey: configVars.S3_SECRET_ACCESS_KEY,
        bucketName: configVars.S3_BUCKET_NAME,
      },

      magicLink: {
        secret: configVars.MAGIC_SECRET_KEY,
      },

      logtail: {
        authToken: configVars.LOGTAIL_TOKEN,
      },

      sentry: {
        dsn: configVars.SENTRY_DSN,
      },

      mailchimp: {
        apiKey: configVars.MAILCHIMP_API_KEY,
      },
    },
  }
}

/**
 * Loads configuration variables from the global environment and returns a JS object
 * keyed by variable names.
 *
 * Exported for testing. See {@link getServiceConfig} for main config accessor.
 *
 * @returns { Record<string, string>} an object with `vars` containing all found variables and their values, and a `notFound` array of variables that were not defined
 */
export function loadConfigVariables() {
  /** @type Record<string, string> */
  const vars = {}

  /** @type Record<string, unknown> */
  const globals = globalThis

  for (const name of Object.keys(DEFAULT_CONFIG_VALUES)) {
    const val = globals[name]
    if (typeof val === 'string') {
      vars[name] = val
    }
  }
  return vars
}

/**
 *
 * @param {Record<string, string>} vars
 * @param {string} runtimeEnv
 */
function ensureAllVarsAreDefined(vars, runtimeEnv) {
  for (const name of Object.keys(DEFAULT_CONFIG_VALUES)) {
    if (typeof vars[name] !== 'string') {
      throw new Error(
        `Missing configuration variable ${name}. required when runtime env == ${runtimeEnv}`
      )
    }
  }
}

/**
 * Mutates `vars` in-place, using values from {@link DEFAULT_CONFIG_VALUES} if any are missing in the input.
 * @param {Record<string, string>} vars
 * @param {string} runtimeEnv
 */
function mergeWithDefaultValues(vars, runtimeEnv) {
  for (const [name, defaultVal] of Object.entries(DEFAULT_CONFIG_VALUES)) {
    if (typeof vars[name] !== 'string') {
      console.warn(
        `Using default value for configuration variable ${name}. Allowed because runtime env == ${runtimeEnv}`
      )
      vars[name] = defaultVal
    }
  }
}

/**
 * Validates that `s` is a defined runtime environment name and returns it.
 *
 * @param {string} s
 * @returns {RuntimeEnvironmentName}
 */
function runtimeEnvFromString(s) {
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
