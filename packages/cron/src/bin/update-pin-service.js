#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { updatePinService } from '../jobs/update-pin-service.js'
import { getPgPool, getCluster3 } from '../lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** @ts-ignore */
global.fetch = fetch

async function main() {
  const rwPg = getPgPool(process.env, 'rw')
  const roPg = getPgPool(process.env, 'ro')

  try {
    const cluster3 = getCluster3(process.env)
    await updatePinService({ roPg, rwPg, cluster3 })
  } finally {
    await Promise.all([roPg.end(), rwPg.end()])
  }
}

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
main()
