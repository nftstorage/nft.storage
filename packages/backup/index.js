import pipe from 'it-pipe'
import * as IPFS from 'ipfs-core'
import os from 'os'
import path from 'path'
import fs from 'fs'
import debug from 'debug'
import pg from 'pg'
import { S3Client } from '@aws-sdk/client-s3'
import { getCandidate } from './candidate.js'
import { exportCar } from './export.js'
import { writeCar } from './local.js'
import { uploadCar } from './remote.js'
import { registerBackup } from './register.js'

const log = debug('backup:index')

/**
 * @param {Object} config
 * @param {Date} [config.startDate] Date to consider backups for uploads from.
 * @param {string} config.dbConnString
 * @param {string} config.dbConnString
 */
export async function startBackup ({
  startDate = new Date(0),
  dbConnString,
  ipfsAddrs,
  s3Region,
  s3AccessKeyId,
  s3SecretAccessKey
}) {
  const repoPath = path.join(os.tmpdir(), `.ipfs${Date.now()}`)
  log(`starting IPFS at ${repoPath}...`)
  const ipfs = await IPFS.create({
    init: { emptyRepo: true },
    preload: { enabled: false },
    repo: repoPath,
    config: { Bootstrap: ipfsAddrs }
  })

  log('connecting to PostgreSQL...')
  const db = new pg.Client({ connectionString: dbConnString })
  await db.connect()

  log('configuring S3 client...')
  const s3 = new S3Client({
    region: s3Region,
    credentials: {
      accessKeyId: s3AccessKeyId,
      secretAccessKey: s3SecretAccessKey
    }
  })

  try {
    await pipe(
      getCandidate(db, startDate),
      async source => {
        for await (const candidate of source) {
          log(`processing candidate ${candidate.cid}`)
          try {
            await pipe(
              [candidate],
              exportCar(ipfs),
              writeCar,
              uploadCar(s3),
              registerBackup(db)
            )
          } catch (err) {
            log(`failed to backup ${candidate.cid}`, err)
          }
        }
      }
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
