#!/usr/bin/env node
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import execa from 'execa'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({
  path: path.join(__dirname, '../.env.local'),
})

async function run() {
  const url = `${process.env.DATABASE_URL}/?apikey=${process.env.DATABASE_TOKEN}`
  await execa(
    'openapi-typescript',
    [url, '--output', 'src/utils/db-types.d.ts'],
    {
      preferLocal: true,
    }
  )
}
run()
