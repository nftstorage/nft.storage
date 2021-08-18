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
    `🚧 Erasing a migration record in database and repo (Do it only on test db)`
  )

  await migration.resetLastMigration(config)
}

script({ ...import.meta, main })
