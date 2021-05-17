#!/usr/bin/env node

import dotenv from 'dotenv'
import { Cloudflare } from '../lib/cloudflare.js'
import * as metrics from '../jobs/metrics.js'

async function main() {
  const env = process.env.ENV || 'dev'
  const accountId = process.env.CF_ACCOUNT
  const apiToken = process.env.CF_TOKEN
  if (!accountId || !apiToken) throw new Error('missing cloudflare credentials')
  const cf = new Cloudflare({ accountId, apiToken })

  await Promise.all([
    metrics.updateUserMetrics({ cf, env }),
    metrics.updateNftMetrics({ cf, env }),
    metrics.updatePinMetrics({ cf, env }),
    metrics.updateFollowupMetrics({ cf, env }),
    metrics.updateDealMetrics({ cf, env }),
  ])
}

dotenv.config()
main()
