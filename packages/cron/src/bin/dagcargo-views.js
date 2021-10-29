#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { refreshMaterializedViews } from '../jobs/dagcargo.js'
import { getPg } from '../lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const pg = getPg(process.env)
  await pg.connect()

  try {
    await refreshMaterializedViews({ pg })
  } finally {
    await pg.end()
  }
}

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
main()
