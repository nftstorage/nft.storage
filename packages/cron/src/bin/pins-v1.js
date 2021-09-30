#!/usr/bin/env node

import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { updatePinStatuses } from '../jobs/pins-v1.js'
import { getDBClient, getCluster, getClusterIPFSProxy } from '../lib/utils.js'

/** @ts-ignore */
global.fetch = fetch

async function main() {
  const env = process.env.ENV || 'dev'
  const db = getDBClient(process.env)
  const cluster = getCluster(process.env)
  const ipfs = getClusterIPFSProxy(process.env)

  await updatePinStatuses({ db, env, cluster, ipfs })
}

dotenv.config()
main()
