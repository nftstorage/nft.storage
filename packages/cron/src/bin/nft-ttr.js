#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fetch from '@web-std/fetch'
import { updatePendingPinStatuses } from '../jobs/pins.js'
import { getPg, getCluster1, getCluster2, getCluster3 } from '../lib/utils.js'
import { measureNftTimeToRetrievability } from '../jobs/measureNftTimeToRetrievability.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** @ts-ignore */
global.fetch = fetch

async function main() {
  const pg = getPg(process.env, 'rw')
  try {
    await pg.connect()
    await measureNftTimeToRetrievability()
  } finally {
    await pg.end()
  }
}

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
main()
