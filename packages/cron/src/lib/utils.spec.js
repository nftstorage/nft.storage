import { test } from './testing.js'
import {
  getDBClient,
  getPgConnString,
  getPgPool,
  hasOwnProperty,
} from './utils.js'

test('getDBClient', (t) => {
  const prod = {
    ENV: 'production',
    PROD_DATABASE_URL: 'PROD_DATABASE_URL',
    PROD_DATABASE_TOKEN: 'PROD_DATABASE_TOKEN',
  }
  t.assert(getDBClient(prod))

  const staging = {
    ENV: 'staging',
    STAGING_DATABASE_URL: 'STAGING_DATABASE_URL',
    STAGING_DATABASE_TOKEN: 'STAGING_DATABASE_TOKEN',
  }
  t.assert(getDBClient(staging))

  const other = {
    DATABASE_URL: 'DATABASE_URL',
    DATABASE_TOKEN: 'DATABASE_TOKEN',
  }
  t.assert(getDBClient(other))
})

test('getPgConnString', (t) => {
  const prod = {
    ENV: 'production',
    PROD_DATABASE_CONNECTION: 'PROD_RO_DATABASE_CONNECTION',
    PROD_RO_DATABASE_CONNECTION: 'PROD_RO_DATABASE_CONNECTION',
  }
  t.is(getPgConnString(prod, 'rw'), prod.PROD_DATABASE_CONNECTION)
  t.is(getPgConnString(prod, 'ro'), prod.PROD_RO_DATABASE_CONNECTION)

  const staging = {
    ENV: 'staging',
    STAGING_DATABASE_CONNECTION: 'STAGING_RO_DATABASE_CONNECTION',
    STAGING_RO_DATABASE_CONNECTION: 'STAGING_RO_DATABASE_CONNECTION',
  }
  t.is(getPgConnString(staging, 'rw'), staging.STAGING_DATABASE_CONNECTION)
  t.is(getPgConnString(staging, 'ro'), staging.STAGING_RO_DATABASE_CONNECTION)

  const other = {
    DATABASE_CONNECTION: 'DATABASE_CONNECTION',
    RO_DATABASE_CONNECTION: 'RO_DATABASE_CONNECTION',
  }
  t.is(getPgConnString(other, 'rw'), other.DATABASE_CONNECTION)
  t.is(getPgConnString(other, 'ro'), other.RO_DATABASE_CONNECTION)
})

test('getPgPool', (t) => {
  t.assert(getPgPool({ DATABASE_CONNECTION: 'postgres://' }))
})

test('hasOwnProperty', (t) => {
  t.assert(hasOwnProperty({ prop: 1 }, 'prop'))
  t.assert(!hasOwnProperty({}, 'prop'))
})
