#!/usr/bin/env node

import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { updatePinStatuses } from '../jobs/pins.js'
import { getCloudflare, getCluster, getClusterIPFSProxy } from '../lib/utils.js'

/** @ts-ignore */
global.fetch = fetch

async function main() {
  const env = process.env.ENV || 'dev'
  const cf = getCloudflare(process.env)
  const cluster = getCluster(process.env)
  const ipfs = getClusterIPFSProxy(process.env)

  await updatePinStatuses({ cf, env, cluster, ipfs })
}

dotenv.config()
main()
