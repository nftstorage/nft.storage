import path from 'path'
import fs from 'fs'
import pg from 'pg'
import { Client as Minio } from 'minio'
import { fileURLToPath } from 'url'
import { DockerComposeEnvironment, Wait } from 'testcontainers'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

/**
 * @param {object} opts
 * @param {boolean} [opts.persistentVolumes]
 */
export async function startServiceContainers({ persistentVolumes } = {}) {
  const composeFileDir = path.resolve(__dirname, '../docker')
  const composeFilenames = ['docker-compose.yml']
  if (persistentVolumes) {
    composeFilenames.push('docker-compose-persist.yml')
  }

  const comp = await new DockerComposeEnvironment(
    composeFileDir,
    composeFilenames
  )
    .withBuild()
    .withWaitStrategy('rest-1', Wait.forLogMessage('Listening on port'))
    .withWaitStrategy('ipfs-1', Wait.forLogMessage('Daemon is ready'))
    .withWaitStrategy('cluster-1', Wait.forLogMessage('IPFS Cluster is READY'))
    .withWaitStrategy('minio-11', Wait.forLogMessage('1 Online'))
    .up()

  const minioContainer = comp.getContainer('minio-1')
  const minioPort = minioContainer.getMappedPort(9000)
  const S3_ENDPOINT = `http://localhost:${minioPort}`

  const dbContainer = comp.getContainer('db-1')
  const dbPort = dbContainer.getMappedPort(5432)
  const DATABASE_CONNECTION = `postgresql://postgres:postgres@localhost:${dbPort}/postgres`

  const postgrestContainer = comp.getContainer('rest-1')
  const postgrestPort = postgrestContainer.getMappedPort(3000)
  const DATABASE_URL = `http://localhost:${postgrestPort}`

  const clusterContainer = comp.getContainer('cluster-1')
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
 * @param {string} file
 */
function loadSql(file) {
  return fs.readFileSync(path.join(__dirname, '..', 'db', file), 'utf8')
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
