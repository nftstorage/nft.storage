import path from 'path'
import { fileURLToPath } from 'url'
import execa from 'execa'
import net from 'net'

/**
 * @param {number} port
 */
export default async function isPortReachable(
  port,
  { host = 'localhost', timeout = 1000 } = {}
) {
  if (typeof host !== 'string') {
    throw new TypeError('Specify a `host`')
  }

  const promise = new Promise((resolve, reject) => {
    const socket = new net.Socket()

    const onError = () => {
      socket.destroy()
      reject()
    }

    socket.setTimeout(timeout)
    socket.once('error', onError)
    socket.once('timeout', onError)

    socket.connect(port, host, () => {
      socket.end()
      resolve(undefined)
    })
  })

  try {
    await promise
    return true
  } catch {
    return false
  }
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * @param {{ init?: boolean; project: string; start?: boolean; stop?: boolean; clean?: boolean; }} opts
 */
export async function dbCmd(opts) {
  const composePath = path.join(__dirname, '../../docker/docker-compose.yml')

  if (opts.init) {
    await execa(
      'docker-compose',
      ['--file', composePath, 'build', '--no-cache'],
      { stdio: 'inherit' }
    )

    await execa(
      'docker-compose',
      [
        '--file',
        composePath,
        '--project-name',
        opts.project,
        'up',
        '--build',
        '--no-start',
        '--renew-anon-volumes',
      ],
      { stdio: 'inherit' }
    )
  }

  if (opts.start) {
    if ((await isPortReachable(5432)) || (await isPortReachable(3000))) {
      console.error('⚠️ Docker project is already running.')
    }
    await execa(
      'docker-compose',
      ['--file', composePath, '--project-name', opts.project, 'up', '--detach'],
      { stdio: 'inherit' }
    )
  }

  if (opts.stop) {
    await execa(
      'docker-compose',
      ['--file', composePath, '--project-name', opts.project, 'stop'],
      { stdio: 'inherit' }
    )
  }

  if (opts.clean) {
    await execa(
      'docker-compose',
      [
        '--file',
        composePath,
        '--project-name',
        opts.project,
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
