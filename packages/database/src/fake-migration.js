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
    `🚧 Creating a migration record in database (Do it only on test db)`
  )

  await migration.fakeLastMigration(config)
}

script({ ...import.meta, main })
