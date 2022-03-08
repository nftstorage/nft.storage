#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { updateMetrics } from '../jobs/metrics.js'
import { getPgPool } from '../lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const rwPg = getPgPool(process.env, 'rw')
  const roPg = getPgPool(process.env, 'ro')

  try {
    await updateMetrics({ rwPg, roPg })
  } finally {
    await rwPg.end()
    await roPg.end()
  }
}

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
main()
