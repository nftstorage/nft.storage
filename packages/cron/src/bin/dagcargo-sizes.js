#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { updateDagSizes } from '../jobs/dagcargo.js'
import { getPg } from '../lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const oneMonthAgo = () => new Date().setMonth(new Date().getMonth() - 1)

async function main() {
  const pg = getPg(process.env)
  await pg.connect()

  try {
    const after = new Date(process.env.AFTER || oneMonthAgo())
    await updateDagSizes({ pg, after })
  } finally {
    await pg.end()
  }
}

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
main()
