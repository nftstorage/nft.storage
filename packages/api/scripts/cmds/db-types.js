import path from 'path'
import { fileURLToPath } from 'node:url'
import execa from 'execa'
import { runWithServices } from './services.js'
import delay from 'delay'
import { dbSqlCmd } from './db-sql.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export async function dbTypesCmd() {
  await runWithServices(async () => {
    await dbSqlCmd({ cargo: true, testing: true })
    await delay(2000)
    const url = `${process.env.DATABASE_URL}/?apikey=${process.env.DATABASE_TOKEN}`
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
  })
}
