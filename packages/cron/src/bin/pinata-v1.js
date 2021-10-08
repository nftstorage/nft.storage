#!/usr/bin/env node

import dotenv from 'dotenv'
import { pinToPinata } from '../jobs/pinata-v1.js'
import { getDBClient, getPinata } from '../lib/utils.js'

async function main() {
  const env = process.env.ENV || 'dev'
  const db = getDBClient(process.env)
  const pinata = getPinata(process.env)

  await pinToPinata({ db, pinata, env })
}

dotenv.config()
main()
