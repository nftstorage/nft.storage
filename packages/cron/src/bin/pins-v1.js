#!/usr/bin/env node

import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { updatePendingPinStatuses } from '../jobs/pins-v1.js'
import { getDBClient, getCluster } from '../lib/utils.js'

/** @ts-ignore */
global.fetch = fetch

async function main() {
  const db = getDBClient(process.env)
  const cluster = getCluster(process.env)

  await updatePendingPinStatuses({ db, cluster })
}

dotenv.config()
main()
