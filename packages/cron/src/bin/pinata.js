#!/usr/bin/env node

import dotenv from 'dotenv'
import { pinToPinata } from '../jobs/pinata.js'
import { getCloudflare, getPinata } from '../lib/utils.js'

async function main() {
  const env = process.env.ENV || 'dev'
  const cf = getCloudflare(process.env)
  const pinata = getPinata(process.env)

  await pinToPinata({ cf, pinata, env })
}

dotenv.config()
main()
