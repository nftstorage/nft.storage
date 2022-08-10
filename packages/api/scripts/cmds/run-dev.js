import execa from 'execa'
import path from 'path'
import { fileURLToPath } from 'url'

import { runWithServices } from './services.js'
import { dbSqlCmd } from './db-sql.js'
import { minioBucketCreateCmd } from './minio.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const workerPath = path.join(__dirname, '../../dist/worker.js')
const envFilePath = path.join(__dirname, '../../../../.env')

/**
 *
 * @param {object} opts
 * @param {boolean} opts.persistent
 */
export async function runDevServerCmd({ persistent }) {
  const action = async () => {
    console.log('initializing DB schema')
    await dbSqlCmd({ cargo: true, testing: true, reset: true })

    console.log('creating minio bucket')
    await minioBucketCreateCmd('dotstorage-dev-0')

    console.log('running dev server')
    await runMiniflare(workerPath, '--watch', '--debug', '--env', envFilePath)
  }

  await runWithServices(action, { persistent })
}

/**
 *
 * @param {string[]} miniflareArgs
 */
async function runMiniflare(...miniflareArgs) {
  await execa('npx', ['miniflare', ...miniflareArgs], { stdio: 'inherit' })
}
