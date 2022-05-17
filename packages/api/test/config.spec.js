import * as assert from 'assert'
import { serviceConfigFromVariables } from '../src/config.js'

describe('serviceConfigFromVariables', () => {
  it('sets isDebugBuild to true if DEBUG is equal to "true" or "1"', () => {
    const truthyValues = ['true', 'TRUE', '1']
    for (const t of truthyValues) {
      const cfg = serviceConfigFromVariables({ DEBUG: t })
      assert.equal(cfg.isDebugBuild, true)
    }
  })

  it('sets isDebugBuild to false if DEBUG is missing or has a falsy string value ("false", "0", "")', () => {
    assert.equal(serviceConfigFromVariables({}).isDebugBuild, false)

    const falsyValues = ['false', 'FALSE', '0', '']

    for (const f of falsyValues) {
      assert.equal(serviceConfigFromVariables({ DEBUG: f }).isDebugBuild, false)
    }
  })

  it('defaults runtimeEnvironment to "test" if ENV is not set', () => {
    assert.equal(serviceConfigFromVariables({}).runtimeEnvironment, 'test')
  })

  it('fails if ENV is set to an unknown environment name', () => {
    assert.throws(
      () => serviceConfigFromVariables({ ENV: 'not-a-real-env' }),
      /invalid/
    )
  })

  it('sets runtimeEnvironment to ENV if it contains a valid environment name', () => {
    const envs = ['test', 'dev', 'staging', 'production']
    for (const e of envs) {
      assert.equal(serviceConfigFromVariables({ ENV: e }).runtimeEnvironment, e)
    }
  })

  it('sets version information based on VERSION, BRANCH, and COMMITHASH', () => {
    const { version } = serviceConfigFromVariables({
      VERSION: '1.2.3',
      BRANCH: 'unit-test-branch',
      COMMITHASH: 'f00f00',
    })
    assert.deepEqual(version, {
      semver: '1.2.3',
      branch: 'unit-test-branch',
      commitHash: 'f00f00',
    })
  })

  it('fails if MAINTENANCE_MODE is set to an invalid mode string', () => {
    assert.throws(
      () => serviceConfigFromVariables({ MAINTENANCE_MODE: 'not-a-real-mode' }),
      /invalid/
    )
  })

  it('sets maintenanceMode to MAINTENANCE_MODE if it contains a valid mode string', () => {
    const modes = ['--', 'r-', 'rw']
    for (const m of modes) {
      assert.equal(
        serviceConfigFromVariables({ MAINTENANCE_MODE: m }).maintenanceMode,
        m
      )
    }
  })

  describe('secrets', () => {
    it('sets salt to the value of SALT', () => {
      assert.equal(
        serviceConfigFromVariables({ SALT: 'so-salty' }).secrets.salt,
        'so-salty'
      )
    })

    it('sets metaplexAuthToken to the value of METAPLEX_AUTH_TOKEN', () => {
      assert.equal(
        serviceConfigFromVariables({ METAPLEX_AUTH_TOKEN: 'unit-test-token' })
          .secrets.metaplexAuthToken,
        'unit-test-token'
      )
    })

    it('sets ucanPrivateKey to the value of PRIVATE_KEY', () => {
      assert.equal(
        serviceConfigFromVariables({ PRIVATE_KEY: 'unit-test-key' }).secrets
          .ucanPrivateKey,
        'unit-test-key'
      )
    })
  })

  describe('external', () => {
    describe('cluster', () => {
      it('sets url to CLUSTER_API_URL iff no CLUSTER_SERVICE var is present', () => {
        const manualUrl = 'http://cluster.unit.test'
        assert.equal(
          serviceConfigFromVariables({ CLUSTER_API_URL: manualUrl }).external
            .cluster.url,
          manualUrl
        )
        // manual url will be overridden if CLUSTER_SERVICE is set to a valid service name
        assert.notEqual(
          serviceConfigFromVariables({
            CLUSTER_API_URL: manualUrl,
            CLUSTER_SERVICE: 'IpfsCluster',
          }).external.cluster.url,
          manualUrl
        )
      })

      it('sets basicAuthToken to value of CLUSTER_BASIC_AUTH_TOKEN', () => {
        const token = 'unit-test-token'
        assert.equal(
          serviceConfigFromVariables({ CLUSTER_BASIC_AUTH_TOKEN: token })
            .external.cluster.basicAuthToken,
          token
        )
      })

      it('sets cluster url if a valid CLUSTER_SERVICE name is present', () => {
        const serviceNames = ['IpfsCluster', 'IpfsCluster2', 'IpfsCluster3']
        for (const name of serviceNames) {
          const cfg = serviceConfigFromVariables({
            CLUSTER_API_URL: 'http://should.be.overriden',
            CLUSTER_SERVICE: name,
          })
          assert.ok(cfg.external.cluster.url)
          assert.ok(cfg.external.cluster.url.match(/^https/))
          assert.notEqual(
            cfg.external.cluster.url,
            'http://should.be.overriden'
          )
        }
      })

      it('fails if CLUSTER_SERVICE is set to an unknown service name', () => {
        assert.throws(() => {
          serviceConfigFromVariables({
            CLUSTER_SERVICE: 'not-a-real-service-name',
          })
        }, /unknown/)
      })
    })

    describe('database', () => {
      it('sets url to the value of DATABASE_URL', () => {
        const url = 'http://db.example.com'
        assert.equal(
          serviceConfigFromVariables({ DATABASE_URL: url }).external.database
            .url,
          url
        )
      })

      it('sets authToken to the value of DATABASE_TOKEN', () => {
        const token = 'unit-test-token'
        assert.equal(
          serviceConfigFromVariables({ DATABASE_TOKEN: token }).external
            .database.authToken,
          token
        )
      })
    })

    describe('s3', () => {
      it('sets endpoint to the value of S3_ENDPOINT', () => {
        const endpoint = 'http://s3.example.com'
        assert.equal(
          serviceConfigFromVariables({ S3_ENDPOINT: endpoint }).external.s3
            .endpoint,
          endpoint
        )
      })

      it('sets region to the value of S3_REGION', () => {
        const region = 'testland'
        assert.equal(
          serviceConfigFromVariables({ S3_REGION: region }).external.s3.region,
          region
        )
      })

      it('sets accessKeyId to the value of S3_ACCESS_KEY_ID', () => {
        const id = 'an-access-key-id'
        assert.equal(
          serviceConfigFromVariables({ S3_ACCESS_KEY_ID: id }).external.s3
            .accessKeyId,
          id
        )
      })

      it('sets secretAccessKey to the value of S3_SECRET_ACCESS_KEY', () => {
        const id = 'a-secret-access-key'
        assert.equal(
          serviceConfigFromVariables({ S3_SECRET_ACCESS_KEY: id }).external.s3
            .secretAccessKey,
          id
        )
      })

      it('sets bucketName to the value of S3_BUCKET_NAME', () => {
        const bucket = 'a-bucket-name'
        assert.equal(
          serviceConfigFromVariables({ S3_BUCKET_NAME: bucket }).external.s3
            .bucketName,
          bucket
        )
      })
    })

    describe('magicLink', () => {
      it('sets secret to the value of MAGIC_SECRET_KEY', () => {
        const secret = 'dont-tell-anybody'
        assert.equal(
          serviceConfigFromVariables({ MAGIC_SECRET_KEY: secret }).external
            .magicLink.secret,
          secret
        )
      })
    })

    describe('logtail', () => {
      it('sets authToken to the value of LOGTAIL_TOKEN', () => {
        const token = 'a-token'
        assert.equal(
          serviceConfigFromVariables({ LOGTAIL_TOKEN: token }).external.logtail
            .authToken,
          token
        )
      })
    })

    describe('sentry', () => {
      it('sets dsn to the value of SENTRY_DSN', () => {
        const dsn = 'a-sentry-dsn'
        assert.equal(
          serviceConfigFromVariables({ SENTRY_DSN: dsn }).external.sentry.dsn,
          dsn
        )
      })
    })

    describe('mailchimp', () => {
      it('sets apiKey to the value of MAILCHIMP_API_KEY', () => {
        const key = 'an-api-key'
        assert.equal(
          serviceConfigFromVariables({ MAILCHIMP_API_KEY: key }).external
            .mailchimp.apiKey,
          key
        )
      })
    })
  })
})
