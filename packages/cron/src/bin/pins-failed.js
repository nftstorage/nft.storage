#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { checkFailedPinStatuses } from '../jobs/pins-v1.js'
import { getDBClient, getCluster } from '../lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
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

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
main()
