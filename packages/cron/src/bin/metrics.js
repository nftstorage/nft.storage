#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { updateMetrics } from '../jobs/metrics.js'
import { getPg } from '../lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const pg = getPg(process.env, 'rw')
  const roPg = getPg(process.env, 'ro')

  await pg.connect()
  await roPg.connect()

  try {
    await updateMetrics({ pg, roPg })
  } finally {
    await pg.end()
    await roPg.end()
  }
}

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
main()
