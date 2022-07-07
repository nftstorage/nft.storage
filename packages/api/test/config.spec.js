import test from 'ava'
import {
  serviceConfigFromVariables,
  loadConfigVariables,
  loadServiceConfig,
} from '../src/config.js'

import { setupMiniflareContext, defineGlobals } from './scripts/test-context.js'

test.beforeEach(async (t) => {
  await setupMiniflareContext(t)
})

test('loadServiceConfig uses default config values for missing vars when ENV == "test" or "dev"', (t) => {
  const lenientEnvs = ['test', 'dev']
  for (const env of lenientEnvs) {
    defineGlobals({ ENV: env })
    const cfg = loadServiceConfig()
    t.is(cfg.ENV.toString(), env)
    t.truthy(cfg.MAINTENANCE_MODE)
  }
})

test('loadConfigVariables looks up values on the globalThis object', (t) => {
  defineGlobals({ SALT: 'extra-salty' })
  const vars = loadConfigVariables()
  t.is(vars.SALT, 'extra-salty')
})

test('loadConfigVariables only includes known configuration variables', (t) => {
  defineGlobals({ FOO: 'ignored', SALT: 'extra-salty' })
  const vars = loadConfigVariables()
  t.is(vars.SALT, 'extra-salty')
  t.false('FOO' in vars)
})

test('serviceConfigFromVariables sets DEBUG to true if DEBUG is equal to "true" or "1"', (t) => {
  const truthyValues = ['true', 'TRUE', '1']
  for (const v of truthyValues) {
    const cfg = serviceConfigFromVariables({ DEBUG: v })
    t.true(cfg.DEBUG)
  }
})

test('serviceConfigFromVariables sets isDebugBuild to false if DEBUG is missing or has a falsy string value ("false", "0", "")', (t) => {
  t.false(serviceConfigFromVariables({}).DEBUG)

  const falsyValues = ['false', 'FALSE', '0', '']

  for (const f of falsyValues) {
    t.false(serviceConfigFromVariables({ DEBUG: f }).DEBUG)
  }
})

test('serviceConfigFromVariables defaults ENV to "test" if ENV is not set', (t) => {
  t.is(serviceConfigFromVariables({}).ENV, 'test')
})

test('serviceConfigFromVariables fails if ENV is set to an unknown environment name', (t) => {
  t.throws(() => serviceConfigFromVariables({ ENV: 'not-a-real-env' }))
})

test('serviceConfigFromVariables sets ENV if it contains a valid environment name', (t) => {
  const envs = ['test', 'dev', 'staging', 'production']
  for (const e of envs) {
    t.is(serviceConfigFromVariables({ ENV: e }).ENV.toString(), e)
  }
})

test('serviceConfigFromVariables fails if MAINTENANCE_MODE is set to an invalid mode string', (t) => {
  t.throws(() =>
    serviceConfigFromVariables({ MAINTENANCE_MODE: 'not-a-real-mode' })
  )
})

test('serviceConfigFromVariables sets MAINTENANCE_MODE if it contains a valid mode string', (t) => {
  const modes = ['--', 'r-', 'rw']
  for (const m of modes) {
    t.is(
      serviceConfigFromVariables({
        MAINTENANCE_MODE: m,
      }).MAINTENANCE_MODE.toString(),
      m
    )
  }
})

test('serviceConfigFromVariables uses unaltered values for string config variables', (t) => {
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
    const cfg = serviceConfigFromVariables({ [key]: val })
    // @ts-expect-error TS doesn't like us indexing the config object with arbitrary strings
    t.is(cfg[key], val)
  }
})
