import { script } from 'subprogram'
import * as migration from './migration.js'
import readConfig from './config.js'
export const main = async () => await applyMigrations(await readConfig())

/**
 *
 * @param {migration.Config} config
 */
export const applyMigrations = async (config) => {
  console.log(
    `🚧 Applying unapplied migrations to the database (this may take a while)`
  )

  await migration.applyMigrations(config)

  console.log(`💿 Reading GraphQL Schema`)
  const schema = await migration.readLastSchema()

  if (schema.trim().length > 0) {
    await migration.uploadSchema(config, schema)
  }
}

script({ ...import.meta, main })
