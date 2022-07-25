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
  const compose = await new DockerComposeEnvironment(
    composeDir,
    'docker-compose.yml'
  )
    // testcontainers has an issue with the default port-based healthcheck
    // that seems related to https://github.com/testcontainers/testcontainers-node/issues/40
    // using log-message wait strategy avoids this
    .withWaitStrategy('postgrest', Wait.forLogMessage('Listening on port'))
    .withWaitStrategy(
      'postgresql',
      Wait.forLogMessage('PostgreSQL init process complete')
    )
    .withWaitStrategy('ipfs', Wait.forLogMessage('Daemon is ready'))
    .withWaitStrategy('cluster', Wait.forLogMessage('IPFS Cluster is READY'))
    .withWaitStrategy('minio', Wait.forLogMessage('1 Online'))
    .up()

  const ports = {
    minio: compose.getContainer('minio').getMappedPort(9000),
    postgrest: compose.getContainer('postgrest').getMappedPort(3000),
    cluster: compose.getContainer('cluster').getMappedPort(9094),
    db: compose.getContainer('db').getMappedPort(5432),
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
 * AVA plugin to allow all test workers to share the same containers.
 *
 * @param {{negotiateProtocol: Function}} opts
 */
const avaPlugin = async ({ negotiateProtocol }) => {
  const main = negotiateProtocol(['ava-4'])

  const { ports, overrides } = await startTestContainers()

  await initDBSchema(overrides.DATABASE_CONNECTION)
  await createMinioBucket(ports.minio)

  main.ready()

  // when a new test worker starts, send them the env vars they
  // need to connect to the dockerized services
  for await (const _testWorker of main.testWorkers()) {
    main.broadcast({ overrides })
  }
}

export default avaPlugin
