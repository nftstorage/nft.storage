import execa from 'execa'
import { runWithServices } from './services.js'
import { dbSqlCmd } from './db-sql.js'
import { minioBucketCreateCmd } from './minio.js'

/**
 *
 * @param {object} opts
 * @param {string[]} opts._
 */
export async function runTestSuiteCmd(opts) {
  await runWithServices(async () => {
    console.log('initializing DB schema')
    await dbSqlCmd({ cargo: true, testing: true })

    console.log('creating minio bucket')
    await minioBucketCreateCmd('dotstorage-dev-0')

    console.log('running tests')
    await runAva(opts._)
  })
}

/**
 *
 * @param {string[]} avaArgs
 */
async function runAva(avaArgs) {
  await execa('npx', ['ava', ...avaArgs], { stdio: 'inherit' })
}
