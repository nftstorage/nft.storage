import path from 'path'
import { fileURLToPath } from 'url'
import { GenericContainer, Network, Wait } from 'testcontainers'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const schemaDir = path.join(__dirname, '..', '..', 'db')
/**
 *
 * @param {string} filename
 */
function schemaPath(filename) {
  return path.join(schemaDir, filename)
}

/**
 * @typedef {object} PGConnectionInfo
 * @property {string} host
 * @property {string} user
 * @property {string} password
 * @property {string} database
 * @property {number} port
 *
 * @typedef {object} DBContainerInfo
 * @property {import('testcontainers').StartedTestContainer} container
 * @property {string} connectionString
 *
 * @param {string} networkName
 *
 * @returns {Promise<DBContainerInfo>}
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

  const connectionString = `postgres://postgres:postgres@test-db:5432/postgres`

  return { container, connectionString }
}

/**
 * @typedef {object} PostgrestContainerInfo
 * @property {import('testcontainers').StartedTestContainer} container
 * @property {string} url
 *
 * @param {string} networkName
 * @param {DBContainerInfo} dbInfo
 * @returns {Promise<PostgrestContainerInfo>}
 */
async function makePostgrestContainer(networkName, dbInfo) {
  const container = await new GenericContainer('postgrest/postgrest:v9.0.0')
    .withExposedPorts(3000)
    .withWaitStrategy(Wait.forLogMessage('Listening on port'))
    .withNetworkMode(networkName)
    .withNetworkAliases('test-postgrest')
    .withEnv('PGRST_DB_URI', dbInfo.connectionString)
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
    .withNetworkMode(networkName)
    .withNetworkAliases('ipfs')
    .withExposedPorts(5001)
    .start()

  const ip = container.getIpAddress(networkName)
  const port = container.getMappedPort(5001)

  const multiaddr = `/ip4/${ip}/tcp/${port}`
  return { container, multiaddr }
}

/**
 *
 * @param {string} networkName
 * @param {string} ipfsMultiaddr
 */
async function makeClusterContainer(networkName, ipfsMultiaddr) {
  const container = await new GenericContainer('ipfs/ipfs-cluster:v1.0.0-rc4')
    .withNetworkMode(networkName)
    .withNetworkAliases('cluster')
    .withExposedPorts(9094)
    .withEnv('CLUSTER_PEERNAME', 'cluster')
    .withEnv('CLUSTER_IPFSHTTP_NODEMULTIADDRESS', ipfsMultiaddr)
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

export async function startTestContainers() {
  const network = await new Network().start()
  const db = await makeNftStorageDbContainer(network.getName())

  // console.log('started postgres. connection string: ', db.connectionString)
  const postgrest = await makePostgrestContainer(network.getName(), db)

  const ipfs = await makeIpfsContainer(network.getName())
  const cluster = await makeClusterContainer(network.getName(), ipfs.multiaddr)

  return { db, postgrest, ipfs, cluster }
}
