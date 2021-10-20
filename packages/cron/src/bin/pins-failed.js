#!/usr/bin/env node

import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { checkFailedPinStatuses } from '../jobs/pins-v1.js'
import { getDBClient, getCluster } from '../lib/utils.js'

/** @ts-ignore */
global.fetch = fetch

const oneMonthAgo = () =>
  new Date(new Date().setMonth(new Date().getMonth() - 1))

async function main() {
  const db = getDBClient(process.env)
  const cluster = getCluster(process.env)
  const after = process.env.AFTER ? new Date(process.env.AFTER) : oneMonthAgo()

  await checkFailedPinStatuses({ db, cluster, after })
}

dotenv.config()
main()
