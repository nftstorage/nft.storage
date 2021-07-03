import { updateSchema } from './update-schema.js'
import * as migration from './migration.js'
import { script } from 'subprogram'
import readConfig from './config.js'
export const main = async () => await createMigration(await readConfig())

/**
 * @param {migration.Config} config
 */
export const createMigration = async (config) => {
  const oldSchema = await migration.readLastSchema()
  const newSchema = await migration.readCurrentSchema()
  const hasSchemaChanged = oldSchema !== newSchema
  if (hasSchemaChanged) {
    console.log(`⚠️ Schema has changed, performing an update`)
    await updateSchema(config)
  }

  console.log('🚜 Generating migration')
  const url = await migration.generateMigrtation(config, newSchema)
  if (url) {
    console.log(`✨ Created new migration at ${url}`)
  } else if (hasSchemaChanged) {
    console.log('Still need to create migration because schema changed')
  } else {
    console.log(`✅ No changes to create migration for`)
  }
}

script({ ...import.meta, main })
