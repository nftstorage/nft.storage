#!/usr/bin/env node

import dotenv from 'dotenv'
import { refreshMaterializedViews } from '../jobs/dagcargo.js'
import { getPg } from '../lib/utils.js'

async function main() {
  const pg = getPg(process.env)
  await pg.connect()

  try {
    await refreshMaterializedViews({ pg })
  } finally {
    await pg.end()
  }
}

dotenv.config()
main()
