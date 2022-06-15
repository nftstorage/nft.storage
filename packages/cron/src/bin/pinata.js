#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
import { pinToPinata } from '../jobs/pinata.js'
import { getDBClient, getPinata } from '../lib/utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function main() {
  const db = getDBClient(process.env)
  const pinata = getPinata(process.env)

  await pinToPinata({ db, pinata })
}

dotenv.config({ path: path.join(__dirname, '../../../../.env') })
await main()
