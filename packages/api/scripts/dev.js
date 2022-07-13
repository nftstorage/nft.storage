#!/usr/bin/env node

import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

import dotenv from 'dotenv'
import pg from 'pg'
import { Client as Minio } from 'minio'
import { DockerComposeEnvironment, Wait } from 'testcontainers'
import { Miniflare } from 'miniflare'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const envPath = path.resolve(__dirname, '../../../.env')

dotenv.config({ path: envPath })

async function main() {
  // simplest arg parsing ever, lol
  const persistentVolumes = process.argv.includes('--persist')
  const { overrides } = await startContainers(persistentVolumes)

  const mf = new Miniflare({
    envPath,
    packagePath: true,
    wranglerConfigPath: true,
    wranglerConfigEnv: 'dev',
    watch: true,
    bindings: {
      ...overrides,
    },
    buildCommand: 'yarn build',
    buildBasePath: path.resolve(__dirname, '..'),
    port: 8787,
  })
  await mf.startServer()
  console.log('Dev API server listening on :8787')
  console.log('Env overrides: ', overrides)
}

/**
 * @param {boolean} persistentVolumes
 */
async function startContainers(persistentVolumes) {
  const composeFileDir = path.resolve(__dirname, '../docker')
  const composeFilenames = ['docker-compose.yml']
  if (persistentVolumes) {
    composeFilenames.push('docker-compose-persist.yml')
  }

  const comp = await new DockerComposeEnvironment(
    composeFileDir,
    composeFilenames
  )
    // .withWaitStrategy('db_1', Wait.forLogMessage('PostgreSQL init process complete'))
    .withWaitStrategy('rest_1', Wait.forLogMessage('Listening on port'))
    .withWaitStrategy('ipfs_1', Wait.forLogMessage('Daemon is ready'))
    .withWaitStrategy('cluster_1', Wait.forLogMessage('IPFS Cluster is READY'))
    .withWaitStrategy('minio_1', Wait.forLogMessage('1 Online'))
    .up()

  const minioContainer = comp.getContainer('minio_1')
  const minioPort = minioContainer.getMappedPort(9000)
  const S3_ENDPOINT = `http://localhost:${minioPort}`

  const dbContainer = comp.getContainer('db_1')
  const dbPort = dbContainer.getMappedPort(5432)
  const DATABASE_CONNECTION = `postgresql://postgres:postgres@localhost:${dbPort}/postgres`

  const postgrestContainer = comp.getContainer('rest_1')
  const postgrestPort = postgrestContainer.getMappedPort(3000)
  const DATABASE_URL = `http://localhost:${postgrestPort}`

  const clusterContainer = comp.getContainer('cluster_1')
  const clusterPort = clusterContainer.getMappedPort(9094)
  const CLUSTER_API_URL = `http://localhost:${clusterPort}`

  try {
    await initDBSchema(DATABASE_CONNECTION)
    await createMinioBucket(minioPort)
  } catch (e) {
    if (!persistentVolumes) {
      throw e
    }
    console.warn(
      `ignoring errors creating initial schema when persistent volumes are used: ${e}`
    )
  }
  const overrides = {
    S3_ENDPOINT,
    DATABASE_URL,
    CLUSTER_API_URL,
    DATABASE_CONNECTION,
  }
  return { overrides }
}

/**
 * @param {string} connectionString
 */
async function initDBSchema(connectionString) {
  const client = new pg.Client({ connectionString })
  await client.connect()
  await client.query(loadSql('config.sql'))
  await client.query(loadSql('tables.sql'))
  await client.query(loadSql('cargo.testing.sql'))
  await client.query(loadSql('functions.sql'))
  await client.end()
}

/**
 *
 * @param {number} minioPort
 */
async function createMinioBucket(minioPort) {
  const name = process.env.S3_BUCKET_NAME || 'dotstorage-dev-0'
  const region = process.env.S3_REGION || 'us-east-1'
  const client = new Minio({
    useSSL: false,
    endPoint: '127.0.0.1',
    port: minioPort,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  })
  await client.makeBucket(name, region)
}

/**
 * @param {string} file
 */
function loadSql(file) {
  return fs.readFileSync(path.join(__dirname, '..', 'db', file), 'utf8')
}

// call entry point fn
main()
