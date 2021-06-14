#!/usr/bin/env node

import dotenv from 'dotenv'
import * as nftsIndex from '../jobs/nfts-index.js'
import { getCloudflare } from '../lib/utils.js'

async function main() {
  const env = process.env.ENV || 'dev'
  const cf = getCloudflare(process.env)

  await nftsIndex.updateMeta({ cf, env })
}

dotenv.config()
main()
