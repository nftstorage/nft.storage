import path from 'path'
import { fileURLToPath } from 'url'
import execa from 'execa'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const composeDir = path.join(__dirname, '../../docker')

const persistentVolumeNames = [
  'nftstorage-db-data',
  'nftstorage-ipfs-data',
  'nftstorage-cluster-data',
  'nftstorage-minio-data',
]

export async function servicesPullCmd() {
  await runDockerCompose(['build'])
  await runDockerCompose(['pull'])
}

/**
 * Runs a given command after starting docker-based services (database, etc).
 *
 * Overrides the following environment variables for the child process:
 * - DATABASE_CONNECTION
 * - MINIO_API_PORT
 * - DATABASE_URL
 * - CLUSTER_API_URL
 * - S3_ENDPOINT
 *
 * Automatically stops docker compose environment when command exits (including abnormal exit).
 * Restores the original values
 *
 * @param {string} command a command to run
 * @param {{ persistent: boolean }} opts
 */
export async function servicesExecCmd(command, { persistent }) {
  const action = async () => {
    await execa.command(command, { stdio: 'inherit' })
  }
  await runWithServices(action, { persistent })
}

/**
 *
 * @param {() => Promise<unknown>} action an async action to perform while services are running
 * @param {object} args
 * @param {boolean} [args.persistent]
 */
export async function runWithServices(action, { persistent } = {}) {
  const project = generateProjectName(persistent)

  const composeFiles = ['docker-compose.yml']
  if (persistent) {
    composeFiles.push('docker-compose-volumes.yml')
    await createNamedVolumes()
  }

  const originalEnv = getCurrentEnvVariableValues(
    'DATABASE_CONNECTION',
    'MINIO_API_PORT',
    'DATABASE_URL',
    'CLUSTER_API_URL',
    'S3_ENDPOINT'
  )

  const cleanup = async () => {
    const composeArgs = ['--project-name', project, 'down', '--remove-orphans']
    if (!persistent) {
      composeArgs.push('--volumes')
    }
    await runDockerCompose(composeArgs, composeFiles)

    // restore original environment variables
    setEnvVariables(originalEnv)
  }

  registerCleanupHook(cleanup)

  const composeArgs = ['--project-name', project, 'up', '--detach']
  if (!persistent) {
    composeArgs.push('--renew-anon-volumes')
  }
  await runDockerCompose(composeArgs, composeFiles)

  const ports = await getServicePorts({ project })
  const overrides = getConfigOverrides(ports)
  console.log('env overrides:', overrides)

  // override environment with vars containing dynamic port numbers.
  // note that the original env will be restored in the cleanup hook
  setEnvVariables(overrides)

  // run passed in action
  await action()
}

/**
 *
 * @param {string[]} args
 * @param {string[]} composeFiles
 */
async function runDockerCompose(args, composeFiles = ['docker-compose.yml']) {
  await execa(
    'docker',
    ['compose', ...composeFileArgs(composeFiles), ...args],
    { stdio: 'inherit' }
  )
}

async function createNamedVolumes() {
  for (const vol of persistentVolumeNames) {
    await execa('docker', ['volume', 'create', vol], { stdio: 'inherit' })
  }
}

/**
 *
 * @param {{ project: string }} args
 */
async function getServicePorts({ project }) {
  const [db, postgrest, cluster, minio] = await Promise.all([
    getMappedPort({ project, service: 'db', port: 5432 }),
    getMappedPort({ project, service: 'rest', port: 3000 }),
    getMappedPort({ project, service: 'cluster', port: 9094 }),
    getMappedPort({ project, service: 'minio', port: 9000 }),
  ])

  return { db, postgrest, cluster, minio }
}

/**
 *
 * @param {object} ports
 * @param {number} ports.db
 * @param {number} ports.postgrest
 * @param {number} ports.cluster
 * @param {number} ports.minio
 */
function getConfigOverrides(ports) {
  return {
    DATABASE_CONNECTION: `postgres://postgres:postgres@localhost:${ports.db}/postgres`,
    MINIO_API_PORT: ports.minio.toString(),
    DATABASE_URL: `http://localhost:${ports.postgrest}`,
    CLUSTER_API_URL: `http://localhost:${ports.cluster}`,
    S3_ENDPOINT: `http://localhost:${ports.minio}`,
  }
}

/**
 *
 * @param {Record<string, string>} env
 */
function setEnvVariables(env) {
  for (const [k, v] of Object.entries(env)) {
    process.env[k] = v
  }
}

/**
 * @param {string[]} names
 */
function getCurrentEnvVariableValues(...names) {
  /** @type Record<string, string> */
  const env = {}
  for (const name of names) {
    const val = process.env[name]
    if (typeof val === 'string') {
      env[name] = val
    }
  }
  return env
}

/**
 *
 * @param {object} opts
 * @param {string} opts.project
 * @param {string} opts.service
 * @param {number} opts.port
 */
async function getMappedPort({ project, service, port }) {
  const { stdout } = await execa('docker', [
    'compose',
    ...composeFileArgs(['docker-compose.yml']),
    '--project-name',
    project,
    'port',
    service,
    port.toString(),
  ])
  const components = stdout.split(':')
  const portStr = components[components.length - 1]
  return Number.parseInt(portStr)
}

/**
 * @param  {string[]} composeFiles
 */
function composeFileArgs(composeFiles) {
  return composeFiles.flatMap((filename) => [
    '--file',
    path.join(composeDir, filename),
  ])
}

/**
 *
 * @param {boolean} persistent
 */
function generateProjectName(persistent = false) {
  if (persistent) {
    return 'nft-storage-dev-persistent'
  }
  const timestamp = new Date().getTime()
  return `nft-storage-dev-${timestamp}`
}

/**
 * Registers a callback to be invoked in case of any exit condition.
 * Will call process.exit after the cleanup function resolves. If an
 * error is thrown during cleanup, exits with status code 1, otherwise,
 * exits with status code 0.
 *
 * @param {() => Promise<void>} cleanup an async cleanup function
 */
function registerCleanupHook(cleanup) {
  let started = false

  const events = [
    `exit`,
    `SIGINT`,
    `SIGUSR1`,
    `SIGUSR2`,
    `uncaughtException`,
    `SIGTERM`,
  ]
  events.forEach((eventType) => {
    process.on(eventType, () => {
      if (started) {
        return
      }
      started = true
      cleanup()
        .then(() => {
          process.exit(0)
        })
        .catch((err) => {
          console.error('Error occurred in cleanup hook: ', err)
          process.exit(1)
        })
    })
  })
}
