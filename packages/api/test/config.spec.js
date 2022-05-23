import * as assert from 'assert'
import {
  serviceConfigFromVariables,
  DEFAULT_CONFIG_VALUES,
  loadConfigVariables,
  loadServiceConfig,
} from '../src/config.js'

/** @type Record<string, unknown> */
const globals = globalThis

/**
 * Helper to remove all the config variables we care about from the global context.
 */
const scrubGlobals = () => {
  for (const name of Object.keys(DEFAULT_CONFIG_VALUES)) {
    delete globals[name]
  }
}

/**
 * @param {Record<string, string>} vars
 */
const defineGlobals = (vars) => {
  for (const [name, value] of Object.entries(vars)) {
    globals[name] = value
  }
}

describe('loadServiceConfig', () => {
  beforeEach(scrubGlobals)
  afterEach(scrubGlobals)

  it('fails if config vars are missing when ENV == "staging" or "production"', () => {
    const strictEnvs = ['staging', 'production']
    for (const env of strictEnvs) {
      defineGlobals({ ENV: env })
      assert.throws(() => loadServiceConfig())
    }
  })

  it('uses default config values for missing vars when ENV == "test" or "dev"', () => {
    const lenientEnvs = ['test', 'dev']
    for (const env of lenientEnvs) {
      defineGlobals({ ENV: env })
      const cfg = loadServiceConfig()
      assert.equal(cfg.ENV, env)
      assert.ok(cfg.MAINTENANCE_MODE)
    }
  })
})

describe('loadConfigVariables', () => {
  beforeEach(scrubGlobals)
  afterEach(scrubGlobals)

  it('looks up values on the globalThis object', () => {
    globals['SALT'] = 'extra-salty'
    const vars = loadConfigVariables()
    assert.equal(vars.SALT, 'extra-salty')
  })

  it('only includes variables with keys in DEFAULT_CONFIG_VALUES', () => {
    globals['FOO'] = 'ignored'
    globals['SALT'] = 'extra-salty'
    const vars = loadConfigVariables()
    assert.equal(vars.SALT, 'extra-salty')
    assert.equal(vars['FOO'], undefined)
  })
})

describe('serviceConfigFromVariables', () => {
  it('sets DEBUG to true if DEBUG is equal to "true" or "1"', () => {
    const truthyValues = ['true', 'TRUE', '1']
    for (const t of truthyValues) {
      const cfg = serviceConfigFromVariables({ DEBUG: t })
      assert.equal(cfg.DEBUG, true)
    }
  })

  it('sets isDebugBuild to false if DEBUG is missing or has a falsy string value ("false", "0", "")', () => {
    assert.equal(serviceConfigFromVariables({}).DEBUG, false)

    const falsyValues = ['false', 'FALSE', '0', '']

    for (const f of falsyValues) {
      assert.equal(serviceConfigFromVariables({ DEBUG: f }).DEBUG, false)
    }
  })

  it('defaults ENV to "test" if ENV is not set', () => {
    assert.equal(serviceConfigFromVariables({}).ENV, 'test')
  })

  it('fails if ENV is set to an unknown environment name', () => {
    assert.throws(
      () => serviceConfigFromVariables({ ENV: 'not-a-real-env' }),
      /invalid/
    )
  })

  it('sets ENV if it contains a valid environment name', () => {
    const envs = ['test', 'dev', 'staging', 'production']
    for (const e of envs) {
      assert.equal(serviceConfigFromVariables({ ENV: e }).ENV, e)
    }
  })

  it('fails if MAINTENANCE_MODE is set to an invalid mode string', () => {
    assert.throws(
      () => serviceConfigFromVariables({ MAINTENANCE_MODE: 'not-a-real-mode' }),
      /invalid/
    )
  })

  it('sets MAINTENANCE_MODE if it contains a valid mode string', () => {
    const modes = ['--', 'r-', 'rw']
    for (const m of modes) {
      assert.equal(
        serviceConfigFromVariables({ MAINTENANCE_MODE: m }).MAINTENANCE_MODE,
        m
      )
    }
  })

  describe('uses unaltered values for string config variables', () => {
    const stringValuedVars = [
      'NFT_STORAGE_VERSION',
      'NFT_STORAGE_BRANCH',
      'NFT_STORAGE_COMMITHASH',
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
      assert.equal(cfg[key], val)
    }
  })
})
