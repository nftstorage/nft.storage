import test from 'ava'
import {
  serviceConfigFromVariables,
  loadConfigVariables,
} from '../src/config.js'

import { setupMiniflareContext } from './scripts/test-context.js'

test.before(async (t) => {
  await setupMiniflareContext(t)
})

const BASE_CONFIG = {
  ENV: 'test',
  MAGIC_SECRET_KEY: 'secret',
  DEBUG: 'true',
  SALT: 'secret',
  MAILCHIMP_API_KEY: 'secret',
  METAPLEX_AUTH_TOKEN: 'metaplex-test-token',
  LOGTAIL_TOKEN: 'secret',
  PRIVATE_KEY: 'xmbtWjE9eYuAxae9G65lQSkw36HV6H+0LSFq2aKqVwY=',
  SENTRY_DSN: 'https://000000@0000000.ingest.sentry.io/00000',
  SENTRY_TOKEN: 'secret',
  SENTRY_UPLOAD: 'false',
  DATABASE_URL: 'http://localhost:3000',
  DATABASE_TOKEN:
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsImlhdCI6MTYwMzk2ODgzNCwiZXhwIjoyNTUwNjUzNjM0LCJyb2xlIjoic2VydmljZV9yb2xlIn0.necIJaiP7X2T2QjGeV-FhpkizcNTX8HjDDBAxpgQTEI',
  DATABASE_CONNECTION: 'postgresql://postgres:postgres@localhost:5432/postgres',
  CLUSTER_BASIC_AUTH_TOKEN: 'dGVzdDp0ZXN0',
  MAINTENANCE_MODE: 'rw',
  S3_REGION: 'us-east-1',
  S3_ACCESS_KEY_ID: 'minioadmin',
  S3_SECRET_ACCESS_KEY: 'minioadmin',
  S3_BUCKET_NAME: 'dotstorage-dev-0',
  CLUSTER_SERVICE: '',
  CLUSTER_API_URL: 'http://127.0.0.1:9094',
  S3_ENDPOINT: 'http://127.0.0.1:9000',
  SLACK_USER_REQUEST_WEBHOOK_URL: '',

  // Since we're calling serviceConfigFromVariables outside of the test worker scope,
  // we need to define these version constants. In worker scope, they are injected by
  // esbuild.
  NFT_STORAGE_VERSION: 'test',
  NFT_STORAGE_BRANCH: 'test',
  NFT_STORAGE_COMMITHASH: 'test',
}

/**
 * Returns BASE_CONFIG with the given key omitted
 * @param {string[]} keys
 * @returns {Record<string, string>}
 */
function omit(...keys) {
  return Object.fromEntries(
    Object.entries(BASE_CONFIG).filter(([key]) => !keys.includes(key))
  )
}

/**
 * Returns BASE_CONFIG, overridden with the given vars
 * @param {Record<string, string>} vars
 */
function override(vars) {
  return { ...BASE_CONFIG, ...vars }
}

test.serial(
  'loadConfigVariables looks up values on the globalThis object',
  (t) => {
    defineGlobals({ ...BASE_CONFIG, SALT: 'extra-salty' })
    const vars = loadConfigVariables()
    t.is(vars.SALT, 'extra-salty')
  }
)

test.serial(
  'loadConfigVariables only includes known configuration variables',
  (t) => {
    defineGlobals({ ...BASE_CONFIG, FOO: 'ignored', SALT: 'extra-salty' })
    const vars = loadConfigVariables()
    t.is(vars.SALT, 'extra-salty')
    t.false('FOO' in vars)
  }
)

test.serial(
  'serviceConfigFromVariables sets DEBUG to true if DEBUG is equal to "true" or "1"',
  (t) => {
    const truthyValues = ['true', 'TRUE', '1']
    for (const v of truthyValues) {
      const cfg = serviceConfigFromVariables(override({ DEBUG: v }))
      t.true(cfg.DEBUG)
    }
  }
)

test.serial(
  'serviceConfigFromVariables sets isDebugBuild to false if DEBUG is missing or has a falsy string value ("false", "0", "")',
  (t) => {
    t.false(serviceConfigFromVariables(omit('DEBUG')).DEBUG)

    const falsyValues = ['false', 'FALSE', '0', '']

    for (const f of falsyValues) {
      t.false(serviceConfigFromVariables(override({ DEBUG: f })).DEBUG)
    }
  }
)

test.serial(
  'serviceConfigFromVariables fails if ENV is set to an unknown environment name',
  (t) => {
    t.throws(() =>
      serviceConfigFromVariables(override({ ENV: 'not-a-real-env' }))
    )
  }
)

test.serial(
  'serviceConfigFromVariables sets ENV if it contains a valid environment name',
  (t) => {
    const envs = ['test', 'dev', 'staging', 'production']
    for (const e of envs) {
      t.is(serviceConfigFromVariables(override({ ENV: e })).ENV.toString(), e)
    }
  }
)

test.serial(
  'serviceConfigFromVariables fails if MAINTENANCE_MODE is set to an invalid mode string',
  (t) => {
    t.throws(() =>
      serviceConfigFromVariables(
        override({ MAINTENANCE_MODE: 'not-a-real-mode' })
      )
    )
  }
)

test.serial(
  'serviceConfigFromVariables sets MAINTENANCE_MODE if it contains a valid mode string',
  (t) => {
    const modes = ['--', 'r-', 'rw']
    for (const m of modes) {
      t.is(
        serviceConfigFromVariables(
          override({
            MAINTENANCE_MODE: m,
          })
        ).MAINTENANCE_MODE.toString(),
        m
      )
    }
  }
)

test.serial(
  'serviceConfigFromVariables uses unaltered values for string config variables',
  (t) => {
    const stringValuedVars = [
      'SALT',
      'METAPLEX_AUTH_TOKEN',
      'PRIVATE_KEY',
      'CLUSTER_API_URL',
      'CLUSTER_BASIC_AUTH_TOKEN',
      'DATABASE_URL',
      'DATABASE_TOKEN',
      'S3_ENDPOINT',
      'S3_REGION',
      'S3_ACCESS_KEY_ID',
      'S3_BUCKET_NAME',
      'MAGIC_SECRET_KEY',
      'LOGTAIL_TOKEN',
      'SENTRY_DSN',
      'MAILCHIMP_API_KEY',
    ]

    for (const key of stringValuedVars) {
      const val = `value for ${key}`
      const cfg = serviceConfigFromVariables(override({ [key]: val }))
      // @ts-expect-error TS doesn't like us indexing the config object with arbitrary strings
      t.is(cfg[key], val)
    }
  }
)

/**
 * @param {Record<string, string>} vars
 */
const defineGlobals = (vars) => {
  /** @type Record<string, unknown> */
  const globals = globalThis
  for (const [k, v] of Object.entries(vars)) {
    globals[k] = v
  }
}
