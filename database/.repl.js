import fauna from 'faunadb'
import dotenv from 'dotenv'
import * as migration from './src/migration.js'

dotenv.config()
const config = { secret: process.env['FAUNA_KEY'] || '' }
const client = new fauna.Client(config)

Object.assign(globalThis, {
  fauna,
  config,
  client,
  migration,
})
