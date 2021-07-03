import * as migration from './migration.js'
import { script } from 'subprogram'
import readConfig from './config.js'
export const main = async () => await updateSchema(await readConfig())

/**
 *
 * @param {migration.Config} config
 */
export const updateSchema = async (config) => {
  const pendingMigrations = await migration.unappliedMigrations(config)
  if (pendingMigrations.size > 0) {
    console.error(
      `⛔️ You have following unapplied schema migrations:
  - ${[...pendingMigrations].join('\n  - ')}

You need to apply those migrations before you will be able to update schema.`
    )
    process.exit(1)
  }

  await migration.uploadSchema(config, await migration.readCurrentSchema())

  console.log(`💾 Downloanding database collections, indexes, functions`)
  await Promise.all([
    migration.importCollections(config),
    migration.importIndexes(config),
    migration.importFunctions(config),
  ])

  console.log('🎉 Schema upload complete')
}

script({ ...import.meta, main })
