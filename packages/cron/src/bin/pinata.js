#!/usr/bin/env node

import dotenv from 'dotenv'
import { syncPinata } from '../jobs/pinata.js'
import { getCloudflare, getPinata } from '../lib/utils.js'

async function main() {
  const env = process.env.ENV || 'dev'
  const cf = getCloudflare(process.env)
  const pinata = getPinata(process.env)
  const hostNodes = (process.env.CLUSTER_ADDRS || '').split(',').filter(Boolean)
  await syncPinata({ cf, pinata, env, hostNodes })
}

dotenv.config()
main()
