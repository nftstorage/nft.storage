import pg from 'pg'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import retry from 'p-retry'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const { Client } = pg

/**
 * @param {{ reset?: boolean; cargo?: boolean; testing?: boolean; }} opts
 */
export async function dbSqlCmd(opts) {
  if (opts.cargo && !opts.testing) {
    expectEnv('DAG_CARGO_HOST')
    expectEnv('DAG_CARGO_DATABASE')
    expectEnv('DAG_CARGO_USER')
    expectEnv('DAG_CARGO_PASSWORD')
  }
  expectEnv('DATABASE_CONNECTION')

  const { env } = process
  const configSql = loadSql('config.sql')
  const tables = loadSql('tables.sql')
  const functions = loadSql('functions.sql')
  const reset = loadSql('reset.sql')
  const cargo = loadSql('cargo.sql')
  const cargoTesting = loadSql('cargo.testing.sql')
  const fdw = loadSql('fdw.sql')
    // Replace secrets in the FDW sql file
    .replace(":'DAG_CARGO_HOST'", `'${env.DAG_CARGO_HOST}'`)
    .replace(":'DAG_CARGO_DATABASE'", `'${env.DAG_CARGO_DATABASE}'`)
    .replace(":'DAG_CARGO_USER'", `'${env.DAG_CARGO_USER}'`)
    .replace(":'DAG_CARGO_PASSWORD'", `'${env.DAG_CARGO_PASSWORD}'`)
    .replace(':NFT_STORAGE_USER', env.NFT_STORAGE_USER || 'CURRENT_USER')

  const client = await getDbClient(env.DATABASE_CONNECTION)

  if (opts.reset) {
    await client.query(reset)
  }

  await client.query(configSql)
  await client.query(tables)

  if (opts.cargo) {
    if (opts.testing) {
      await client.query(cargoTesting)
    } else {
      await client.query(fdw)
      await client.query(cargo)
    }
  }

  await client.query(functions)
  await client.end()
}

/**
 * @param {string|undefined} connectionString
 */
function getDbClient(connectionString) {
  return retry(
    async () => {
      const c = new Client({ connectionString })
      await c.connect()
      return c
    },
    { minTimeout: 100 }
  )
}

/**
 * @param {string} name
 */
function expectEnv(name) {
  if (!process.env[name]) {
    throw new Error(`missing environment variable: ${name}`)
  }
}

/**
 * @param {string} file
 */
function loadSql(file) {
  return fs.readFileSync(path.join(__dirname, '..', '..', 'db', file), 'utf8')
}
