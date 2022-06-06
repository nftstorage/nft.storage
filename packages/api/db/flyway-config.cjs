const path = require('path')
const dotenv = require('dotenv')

dotenv.config({ path: path.join(__dirname, '../../../.env') })
const { env } = process

if (!env.DATABASE_CONNECTION) {
  throw new Error('Required env variable DATABASE_CONNECTION missing')
}

let placeholders = {
  NFT_STORAGE_USER: env.NFT_STORAGE_USER || 'CURRENT_USER',
  NFT_STORAGE_STATS_USER: env.NFT_STORAGE_STATS_USER || 'CURRENT_USER',
}

if (
  env.DAG_CARGO_HOST &&
  env.DAG_CARGO_DATABASE &&
  env.DAG_CARGO_USER &&
  env.DAG_CARGO_PASSWORD
) {
  placeholders.DAG_CARGO_TEST_MODE = 'false'
  placeholders.DAG_CARGO_HOST = env.DAG_CARGO_HOST
  placeholders.DAG_CARGO_DATABASE = env.DAG_CARGO_DATABASE
  placeholders.DAG_CARGO_USER = env.DAG_CARGO_USER
  placeholders.DAG_CARGO_PASSWORD = env.DAG_CARGO_PASSWORD
} else {
  placeholders.DAG_CARGO_TEST_MODE = 'true'
  placeholders.DAG_CARGO_HOST = 'test'
  placeholders.DAG_CARGO_DATABASE = 'test'
  placeholders.DAG_CARGO_USER = 'test'
  placeholders.DAG_CARGO_PASSWORD = 'test'
}

// To get the correct command line args, we need to give node-flywaydb keys like
// `{ 'placeholders.VARIABLE_NAME': 'VALUE' }`, which translates to the cli arg
// `-placeholders.VARIABLE_NAME=VALUE`
placeholders = Object.fromEntries(
  Object.entries(placeholders).map(([key, val]) => [`placeholders.${key}`, val])
)

module.exports = {
  flywayArgs: {
    url: `jdbc:${env.DATABASE_CONNECTION}`,
    schemas: 'public',
    locations: 'filesystem:db/migrations',
    sqlMigrationSuffixes: '.sql',
    baselineOnMigrate: true,
    ...placeholders,
  },
}
