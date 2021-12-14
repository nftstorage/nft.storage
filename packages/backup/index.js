import pipe from 'it-pipe'
import * as IPFS from 'ipfs-core'
import os from 'os'
import path from 'path'
import fs from 'fs'
import debug from 'debug'
import pg from 'pg'
import { getCandidate } from './candidate.js'
import { exportCar } from './export.js'
import { writeCar } from './local.js'
import { uploadCar } from './remote.js'
import { registerBackup } from './register.js'

const log = debug('backup:main')

async function main() {
  const startDate = process.argv[2] || new Date(0)
  const connectionString = process.env.DATABASE_CONNECTION
  if (!connectionString) {
    throw new Error('missing DATABASE_CONNECTION environment variable')
  }
  const ipfsAddrs = (process.env.IPFS_ADDRS || '').split(',')
  if (!ipfsAddrs.length) {
    throw new Error('missing IPFS_ADDRS environment variable')
  }

  const repoPath = path.join(os.tmpdir(), `.ipfs${Date.now()}`)
  log(`starting IPFS at ${repoPath}`)
  const ipfs = await IPFS.create({
    init: { emptyRepo: true },
    preload: { enabled: false },
    repo: repoPath,
    config: { Bootstrap: ipfsAddrs },
  })

  log('connecting to PostgreSQL')
  const db = new pg.Client({ connectionString })
  await db.connect()

  try {
    await pipe(
      getCandidate(db, startDate),
      exportCar(async () => ipfs),
      writeCar,
      uploadCar(s3),
      registerBackup(db)
    )
  } finally {
    try {
      await db.end()
    } catch (err) {
      log('failed to close DB connection:', err)
    }
    try {
      await ipfs.stop()
    } catch (err) {
      log('failed to stop IPFS:', err)
    }
    try {
      await fs.promises.rmdir(repoPath, { recursive: true })
    } catch (err) {
      log(`failed to clean repo: ${repoPath}`, err)
    }
  }
}

main()
