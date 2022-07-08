import path from 'path'
import { Client as Minio } from 'minio'
import { fileURLToPath } from 'url'
import { GenericContainer, Network, Wait } from 'testcontainers'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const schemaDir = path.join(__dirname, '..', '..', 'db')

/** @typedef {import('testcontainers').StartedTestContainer} StartedTestContainer */

/**
 *
 * @param {string} filename
 */
function schemaPath(filename) {
  return path.join(schemaDir, filename)
}

/**
 * @param {string} networkName
 *
 * @returns {Promise<{ container: StartedTestContainer }>}
 */
async function makeNftStorageDbContainer(networkName) {
  // console.log('starting nft.storage DB container...')
  const initialSchemaFilename = path.join(
    __dirname,
    '..',
    '..',
    'docker',
    'postgres',
    '00-initial-schema.sql'
  )

  /**
   * @param {string} filename
   */
  const dest = (filename) => `/docker-entrypoint-initdb.d/${filename}`

  const container = await new GenericContainer('supabase/postgres:13.3.0')
    .withName(uniqueName('test-db'))
    .withNetworkAliases('test-db')
    .withNetworkMode(networkName)
    .withCopyFileToContainer(
      initialSchemaFilename,
      dest('00-initial-schema.sql')
    )
    .withCopyFileToContainer(schemaPath('config.sql'), dest('01-config.sql'))
    .withCopyFileToContainer(schemaPath('reset.sql'), dest('02-reset.sql'))
    .withCopyFileToContainer(schemaPath('tables.sql'), dest('03-tables.sql'))
    .withCopyFileToContainer(
      schemaPath('cargo.testing.sql'),
      dest('04-cargo.testing.sql')
    )
    .withCopyFileToContainer(
      schemaPath('functions.sql'),
      dest('05-functions.sql')
    )
    .withEnv('POSTGRES_DB', 'postgres')
    .withEnv('POSTGRES_USER', 'postgres')
    .withEnv('POSTGRES_PASSWORD', 'postgres')
    .withEnv('POSTGRES_PORT', '5432')
    .start()

  return { container }
}

/**
 * @typedef {object} PostgrestContainerInfo
 * @property {StartedTestContainer} container
 * @property {string} url
 *
 * @param {string} networkName
 * @returns {Promise<PostgrestContainerInfo>}
 */
async function makePostgrestContainer(networkName) {
  const container = await new GenericContainer('postgrest/postgrest:v9.0.0')
    .withExposedPorts(3000)
    .withWaitStrategy(Wait.forLogMessage('Listening on port'))
    .withNetworkMode(networkName)
    .withName(uniqueName('test-postgrest'))
    .withNetworkAliases('test-postgrest')
    .withEnv(
      'PGRST_DB_URI',
      'postgres://postgres:postgres@test-db:5432/postgres'
    )
    .withEnv('PGRST_DB_SCHEMAS', 'public,cargo')
    .withEnv('PGRST_DB_ANON_ROLE', 'postgres')
    .withEnv(
      'PGRST_JWT_SECRET',
      'super-secret-jwt-token-with-at-least-32-characters-long'
    )
    .start()

  const port = container.getMappedPort(3000)
  const url = `http://localhost:${port}`
  return { container, url }
}

/**
 *
 * @param {string} networkName
 */
async function makeIpfsContainer(networkName) {
  const container = await new GenericContainer('ipfs/go-ipfs:v0.10.0')
    .withName(uniqueName('test-ipfs'))
    .withNetworkAliases('test-ipfs')
    .withNetworkMode(networkName)
    // .withExposedPorts(4001, 5001)
    .start()

  // const ip = container.getIpAddress(networkName)
  // const port = container.getMappedPort(5001)

  // const multiaddr = `/dns4/ipfs/tcp/${port}`
  return { container }
}

/**
 *
 * @param {string} networkName
 */
async function makeClusterContainer(networkName) {
  const container = await new GenericContainer('ipfs/ipfs-cluster:v1.0.0-rc4')
    .withName(uniqueName('test-cluster'))
    .withNetworkAliases('test-cluster')
    .withNetworkMode(networkName)
    .withExposedPorts(9094)
    .withEnv('CLUSTER_PEERNAME', 'cluster')
    .withEnv('CLUSTER_IPFSHTTP_NODEMULTIADDRESS', '/dns4/test-ipfs/tcp/5001')
    .withEnv('CLUSTER_CRDT_TRUSTEDPEERS', '*')
    .withEnv('CLUSTER_RESTAPI_HTTPLISTENMULTIADDRESS', '/ip4/0.0.0.0/tcp/9094')
    .withEnv('CLUSTER_RESTAPI_BASICAUTHCREDENTIALS', 'test:test')
    .withEnv('CLUSTER_RESTAPI_CORSALLOWEDMETHODS', 'GET,POST,OPTIONS')
    .withEnv('CLUSTER_RESTAPI_CORSALLOWEDHEADERS', 'authorization')
    .withEnv('CLUSTER_MONITORPINGINTERVAL', '2s')
    .start()

  const port = container.getMappedPort(9094)
  const url = `http://localhost:${port}`
  return { container, url }
}

/**
 *
 * @param {string} networkName
 */
async function makeMinioContainer(networkName) {
  const container = await new GenericContainer('quay.io/minio/minio')
    .withName(uniqueName('test-minio'))
    .withNetworkAliases('test-minio')
    .withWaitStrategy(Wait.forLogMessage('1 Online'))
    .withNetworkMode(networkName)
    .withCmd(['server', '/data/minio', '--console-address', ':9001'])
    .withExposedPorts(9000)
    .withEnv('MINIO_ROOT_USER', 'minioadmin')
    .withEnv('MINIO_ROOT_PASSWORD', 'minioadmin')
    .start()

  const port = container.getMappedPort(9000)
  const url = `http://localhost:${port}`

  // create test bucket
  const minio = new Minio({
    useSSL: false,
    endPoint: '127.0.0.1',
    port: port,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  })
  await minio.makeBucket('dotstorage-test-0', 'us-east-1')

  return { container, url }
}

/**
 * @param {string} networkName
 */
async function makeDBContainers(networkName) {
  const db = await makeNftStorageDbContainer(networkName)
  const postgrest = await makePostgrestContainer(networkName)
  return { db, postgrest }
}

/**
 * @param {string} networkName
 */
async function makeIpfsContainers(networkName) {
  const ipfs = await makeIpfsContainer(networkName)
  const cluster = await makeClusterContainer(networkName)
  return { ipfs, cluster }
}

export async function startTestContainers() {
  const network = await new Network().start()
  // start containers that don't depend on each other in parallel
  const [{ db, postgrest }, { ipfs, cluster }, minio] = await Promise.all([
    makeDBContainers(network.getName()),
    makeIpfsContainers(network.getName()),
    makeMinioContainer(network.getName()),
  ])

  return { db, postgrest, ipfs, cluster, minio }
}

/**
 * @param {string} name
 */
function uniqueName(name) {
  const suffix = `-${new Date().getTime()}`
  return name + suffix
}
