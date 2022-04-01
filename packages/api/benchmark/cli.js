#!/usr/bin/env node
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dbCmd } from '../scripts/cmds/db.js'
import { dbSqlCmd } from '../scripts/cmds/db-sql.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
  path: path.join(__dirname, '..', '..', '..', '.env'),
})

// set up env
console.log('Spinning up environment...')
await dbCmd({ init: true, start: true })
try {
  await dbSqlCmd({ cargo: true, testing: true })
} catch (err) {
  console.error(err)
}
console.log('Spinning down environment...')
await dbCmd({ stop: true, clean: true })
