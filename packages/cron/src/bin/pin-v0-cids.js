#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import { pinV0Cids } from '../jobs/pin-v0-cids.js'
import { getPg, getCluster3 } from '../lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
/** @ts-ignore */
global.fetch = fetch

async function main() {
  while (true) {
    try {
      const pg = getPg(process.env, 'ro')
      await pg.connect()

      try {
        const cluster3 = getCluster3(process.env)
        await pinV0Cids({ pg, cluster3 })
      } finally {
        await pg.end()
      }
    } catch (err) {
      console.error(err)
      await new Promise((resolve) => setTimeout(resolve, 10000))
      continue
    }
    break
  }
}

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
main()
