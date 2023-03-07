#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fetch from '@web-std/fetch'
import { updatePendingPinStatuses } from '../jobs/pins.js'
import { getPg, getCluster1, getCluster2, getCluster3 } from '../lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
global.fetch = fetch

async function main() {
  const pg = getPg(process.env, 'rw')
  await pg.connect()

  try {
    const cluster1 = getCluster1(process.env)
    const cluster2 = getCluster2(process.env)
    const cluster3 = getCluster3(process.env)

    await updatePendingPinStatuses({ pg, cluster1, cluster2, cluster3 })
  } finally {
    await pg.end()
  }
}

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
main()
