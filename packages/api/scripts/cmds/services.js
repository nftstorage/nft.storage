import path from 'path'
import { fileURLToPath } from 'url'
import execa from 'execa'
import { MINIO_API_PORT } from './minio.js'
import { isPortReachable } from '../utils.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const composeDir = path.join(__dirname, '../../docker')
const composeFiles = [
  'docker-compose.yml',
  'docker-compose-local-ports.yml',
  'docker-compose-volumes.yml',
]

const composeFileArgs = composeFiles.flatMap((filename) => [
  '--file',
  path.join(composeDir, filename),
])

const PG_PORT = 3000
const PGRST_PORT = 5432
const CLUSTER_PORT = 9094

export async function servicesPullCmd() {
  await execa('docker-compose', [...composeFileArgs, 'build'], {
    stdio: 'inherit',
  })
  await execa('docker-compose', [...composeFileArgs, 'pull'], {
    stdio: 'inherit',
  })
}

/**
 * @param {{ project: string }} opts
 */
export async function servicesStartCmd({ project }) {
  const ports = [PG_PORT, PGRST_PORT, MINIO_API_PORT, CLUSTER_PORT]
  const reachablePorts = await Promise.all(ports.map((p) => isPortReachable(p)))
  // if any port is reachable a service is running on it
  if (reachablePorts.some((r) => r)) {
    console.error('⚠️ Services are already running.')
  }
  await execa(
    'docker-compose',
    [...composeFileArgs, '--project-name', project, 'up', '--detach'],
    { stdio: 'inherit' }
  )
}

/**
 * @param {{ project: string, clean?: boolean }} opts
 */
export async function servicesStopCmd({ project, clean }) {
  await execa(
    'docker-compose',
    [...composeFileArgs, '--project-name', project, 'stop'],
    { stdio: 'inherit' }
  )

  if (clean) {
    await execa(
      'docker-compose',
      [
        ...composeFileArgs,
        '--project-name',
        project,
        'down',
        '--rmi',
        'local',
        '-v',
        '--remove-orphans',
      ],
      { stdio: 'inherit' }
    )
  }
}
