import path from 'path'
import { fileURLToPath } from 'node:url'
import execa from 'execa'
import { dbCmd } from './db.js'
import delay from 'delay'
import { dbSqlCmd } from './db-sql.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function dbTypesCmd() {
  const project = `nft-storage-db-types-${Date.now()}`
  const dbConnection = ENV === 'test' ? TEST_DATABASE_URL : DATABASE_URL

  await dbCmd({ start: true, project })
  await delay(2000)

  try {
    await dbSqlCmd({ cargo: true, testing: true })
    await delay(2000)

    const url = `${dbConnection}/?apikey=${DATABASE_TOKEN}`
    await execa(
      'openapi-typescript',
      [
        url,
        '--output',
        'src/utils/db-types.d.ts',
        '--prettier-config',
        path.join(__dirname, '../../../../package.json'),
      ],
      {
        preferLocal: true,
      }
    )
  } finally {
    await dbCmd({ clean: true, project })
  }
}
