import path from 'path'
import fs from 'fs'
import { Client as Minio } from 'minio'
import pg from 'pg'
import { fileURLToPath } from 'url'
import { DockerComposeEnvironment, Wait } from 'testcontainers'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const composeDir = path.join(__dirname, '..', '..', 'docker')
const schemaDir = path.join(__dirname, '..', '..', 'db')

export async function startTestContainers() {
  const testEnvFile = path.join(__dirname, 'test.env')
  console.log('starting services')
  const compose = await new DockerComposeEnvironment(
    composeDir,
    'docker-compose.yml'
  )
    .withEnvFile(testEnvFile)
    .withBuild()
    // testcontainers seems to need this to avoid waiting forever... TODO: investigate why
    .withWaitStrategy('rest-1', Wait.forLogMessage('Listening on port'))
    .up()

  const ports = {
    minio: compose.getContainer('minio-1').getMappedPort(9000),
    postgrest: compose.getContainer('rest-1').getMappedPort(3000),
    cluster: compose.getContainer('cluster-1').getMappedPort(9094),
    db: compose.getContainer('db-1').getMappedPort(5432),
  }

  const overrides = {
    S3_ENDPOINT: `http://localhost:${ports.minio}`,
    DATABASE_URL: `http://localhost:${ports.postgrest}`,
    CLUSTER_API_URL: `http://localhost:${ports.cluster}`,
    DATABASE_CONNECTION: `postgresql://postgres:postgres@localhost:${ports.db}/postgres`,
  }

  return { ports, overrides }
}

/**
 *
 * @param {string} filename
 */
function loadSql(filename) {
  return fs.readFileSync(path.join(schemaDir, filename), 'utf-8')
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
 * @param {string} [minioBucket]
 */
async function createMinioBucket(minioPort, minioBucket) {
  const name = minioBucket || process.env.S3_BUCKET_NAME || 'dotstorage-dev-0'
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
 * AVA plugin to allow all test workers to share the same containers.
 *
 * @param {{negotiateProtocol: Function}} opts
 */
const avaPlugin = async ({ negotiateProtocol }) => {
  const main = negotiateProtocol(['ava-4'])

  const { ports, overrides } = await startTestContainers()

  await initDBSchema(overrides.DATABASE_CONNECTION)
  await createMinioBucket(ports.minio, 'dotstorage-test-0')

  main.ready()

  // when a new test worker starts, send them the env vars they
  // need to connect to the dockerized services
  for await (const _testWorker of main.testWorkers()) {
    main.broadcast({ overrides })
  }
}

export default avaPlugin
