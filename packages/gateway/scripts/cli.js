#!/usr/bin/env node
import net from 'net'
import fs from 'fs'
import path from 'path'
import { execa } from 'execa'
import { fileURLToPath } from 'url'
import sade from 'sade'
import { build } from 'esbuild'
import git from 'git-rev-sync'
import Sentry from '@sentry/cli'
import delay from 'delay'
import pWaitFor from 'p-wait-for'
import { create } from 'ipfs-http-client'
import globSource from 'ipfs-utils/src/files/glob-source.js'

const IPFS_API_URL = 'http://127.0.0.1:9089'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')
)

const prog = sade('gateway')

prog
  .command('build')
  .describe('Build the worker.')
  .option('--env', 'Environment', 'dev')
  .action(buildCmd)
  .command('ipfs')
  .describe('Run ipfs node')
  .option('--start', 'Start docker container', false)
  .option('--stop', 'Stop and clean all dockers artifacts', false)
  .action(ipfsCmd)

async function buildCmd(opts) {
  const version = `${pkg.name}@${pkg.version}-${opts.env}+${git.short(
    __dirname
  )}`

  await build({
    entryPoints: [path.join(__dirname, '../src/index.js')],
    bundle: true,
    format: 'esm',
    outfile: 'dist/index.mjs',
    legalComments: 'external',
    define: {
      VERSION: JSON.stringify(version),
      COMMITHASH: JSON.stringify(git.long(__dirname)),
      BRANCH: JSON.stringify(git.branch(__dirname)),
      ENV: opts.env || 'dev',
      global: 'globalThis',
    },
    minify: opts.env === 'dev' ? false : true,
    sourcemap: true,
  })

  // Sentry release and sourcemap upload
  if (process.env.SENTRY_UPLOAD === 'true') {
    const cli = new Sentry(undefined, {
      authToken: process.env.SENTRY_TOKEN,
      org: 'protocol-labs-it',
      project: 'nft-gateway',
      dist: git.short(__dirname),
    })

    await cli.releases.new(version)
    await cli.releases.setCommits(version, {
      auto: true,
      ignoreEmpty: true,
      ignoreMissing: true,
    })
    await cli.releases.uploadSourceMaps(version, {
      include: ['./dist'],
      urlPrefix: '/',
    })
    await cli.releases.finalize(version)
    await cli.releases.newDeploy(version, {
      env: opts.env,
    })
  }
}

async function ipfsCmd({ start, stop }) {
  const project = 'ipfs-daemon'
  const composePath = path.join(__dirname, '../docker/docker-compose.yml')

  if (start) {
    if (await isPortReachable(8080)) {
      throw new Error(
        'IPFS daemon is already running. Please check if you have any docker project or cluster deamon already running.'
      )
    }

    await execa('docker-compose', [
      '--file',
      composePath,
      '--project-name',
      project,
      'up',
      '--detach',
    ])

    await pWaitFor(async () => {
      const { stdout } = await execa('docker', ['logs', '-t', 'ipfs0'])
      return stdout.includes('Daemon is ready')
    })
    console.log('docker started')

    // Add fixture files
    const client = create({ url: IPFS_API_URL })

    await Promise.all([
      // bafkreidyeivj7adnnac6ljvzj2e3rd5xdw3revw4da7mx2ckrstapoupoq
      client.add('Hello nft.storage! 😎', {
        rawLeaves: true,
      }),
      // bafkreibxkbyybantsznyvlq2bhf24u4gew7pj6erjgduqp4mvqv54qjng4
      client.add('Hello nft.storage! 😎😎', {
        rawLeaves: true,
      }),
      // bafkreihbjbbccwxn7hzv5hun5pxuswide7q3lhjvfbvmd7r3kf2sodybgi
      client.add('Hello nft.storage! 😎😎😎', {
        rawLeaves: true,
      }),
    ])

    // bafybeih74zqc6kamjpruyra4e4pblnwdpickrvk4hvturisbtveghflovq
    for await (const _ of client.addAll(
      globSource(path.join(__dirname, '../test/fixtures/directory'), '**/*'),
      {
        rawLeaves: true,
        wrapWithDirectory: true,
        cidVersion: 1,
      }
    )) {
    }
  }

  if (stop) {
    await execa('docker-compose', [
      '--file',
      composePath,
      '--project-name',
      project,
      'stop',
    ])
    await execa('docker-compose', [
      '--file',
      composePath,
      '--project-name',
      project,
      'down',
      '--volumes',
      '--rmi',
      'local',
      '--remove-orphans',
    ])
  }
}

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

    const onError = (err) => {
      socket.destroy()
      reject(err)
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

prog.parse(process.argv)
