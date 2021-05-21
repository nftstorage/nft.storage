#!/usr/bin/env node

import dotenv from 'dotenv'
import * as metrics from '../jobs/metrics.js'
import { getCloudflare } from '../lib/utils.js'

async function main() {
  const env = process.env.ENV || 'dev'
  const cf = getCloudflare(process.env)

  await Promise.all([
    metrics.updateUserMetrics({ cf, env }),
    metrics.updateNftMetrics({ cf, env }),
    metrics.updatePinMetrics({ cf, env }),
    metrics.updateDealMetrics({ cf, env }),
  ])
}

dotenv.config()
main()
