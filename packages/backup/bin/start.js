#!/usr/bin/env node

import dotenv from 'dotenv'
import { startBackup } from '../index.js'

dotenv.config()

startBackup({
  app: mustGetEnv('APP'),
  startDate: process.argv[2],
  dbConnString: mustGetEnv('DATABASE_CONNECTION'),
  ipfsAddrs: mustGetEnv('IPFS_ADDRS').split(','),
  s3Region: mustGetEnv('S3_REGION'),
  s3AccessKeyId: mustGetEnv('S3_ACCESS_KEY_ID'),
  s3SecretAccessKey: mustGetEnv('S3_SECRET_ACCESS_KEY'),
  s3BucketName: mustGetEnv('S3_BUCKET_NAME'),
})

/**
 * @param {string} name
 */
function mustGetEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`missing ${name} environment variable`)
  return value
}
