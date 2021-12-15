import pipe from 'it-pipe'
import * as IPFS from 'ipfs-core'
import debug from 'debug'
import pg from 'pg'
import { S3Client } from '@aws-sdk/client-s3'
import { getCandidate } from './candidate.js'
import { exportCar } from './export.js'
import { uploadCar } from './remote.js'
import { registerBackup } from './register.js'
import { createMemRepo } from './ipfs-repo.js'

const log = debug('backup:index')

/**
 * @param {Object} config
 * @param {Date} [config.startDate] Date to consider backups for uploads from.
 * @param {string} config.app Where data is coming from/going to.
 * @param {string} config.dbConnString PostgreSQL connection string.
 * @param {string} config.ipfsAddrs Multiaddrs of IPFS nodes that have the content.
 * @param {string} config.s3Region S3 region.
 * @param {string} config.s3AccessKeyId S3 access key ID.
 * @param {string} config.s3SecretAccessKey S3 secret access key.
 * @param {string} config.s3BucketName S3 bucket name.
 */
export async function startBackup({
  app,
  startDate = new Date(0),
  dbConnString,
  ipfsAddrs,
  s3Region,
  s3AccessKeyId,
  s3SecretAccessKey,
  s3BucketName,
}) {
  log('creating in-memory IPFS repo...')
  const repo = await createMemRepo()
  log('starting IPFS...')
  const ipfs = await IPFS.create({
    init: { emptyRepo: true },
    preload: { enabled: false },
    repo,
    config: { Bootstrap: ipfsAddrs },
  })

  log('connecting to PostgreSQL...')
  const db = new pg.Client({ connectionString: dbConnString })
  await db.connect()

  log('configuring S3 client...')
  const s3 = new S3Client({
    region: s3Region,
    credentials: {
      accessKeyId: s3AccessKeyId,
      secretAccessKey: s3SecretAccessKey,
    },
  })

  try {
    await pipe(getCandidate(db, app, startDate), async (source) => {
      // TODO: parallelise
      for await (const candidate of source) {
        log(`processing candidate ${candidate.sourceCid}`)
        try {
          await pipe(
            [candidate],
            exportCar(ipfs),
            uploadCar(s3, s3BucketName),
            registerBackup(db)
          )
        } catch (err) {
          log(`failed to backup ${candidate.sourceCid}`, err)
        } finally {
          log('garbage collecting repo...')
          let count = 0
          for await (const res of repo.gc()) {
            if (res.err) {
              log(`failed to GC ${res.cid}:`, res.err)
            } else {
              count++
            }
          }
          log(`garbage collected ${count} CIDs`)
        }
      }
    })
  } finally {
    try {
      log('closing DB connection...')
      await db.end()
    } catch (err) {
      log('failed to close DB connection:', err)
    }
    try {
      log('stopping IPFS...')
      await ipfs.stop()
    } catch (err) {
      log('failed to stop IPFS:', err)
    }
  }
}
