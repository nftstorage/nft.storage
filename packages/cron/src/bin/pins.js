#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { updatePendingPinStatuses } from '../jobs/pins.js'
import { getDBClient, getCluster1, getCluster2 } from '../lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** @ts-ignore */
global.fetch = fetch

async function main() {
  const db = getDBClient(process.env)
  const cluster1 = getCluster1(process.env)
  const cluster2 = getCluster2(process.env)

  await updatePendingPinStatuses({ db, cluster1, cluster2 })
}

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
main()
