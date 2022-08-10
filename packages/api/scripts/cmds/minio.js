import { Client as Minio } from 'minio'
import retry from 'p-retry'
import { isPortReachable } from '../utils.js'

function minioConfig() {
  const port = process.env.MINIO_API_PORT
    ? Number.parseInt(process.env.MINIO_API_PORT)
    : 9000

  return {
    useSSL: false,
    endPoint: '127.0.0.1',
    port: port,
    accessKey: 'minioadmin',
    secretKey: 'minioadmin',
  }
}

/**
 * @param {string} name Bucket name
 */
export async function minioBucketCreateCmd(name) {
  const config = minioConfig()
  await retry(async () => {
    if (!(await isPortReachable(config.port))) {
      throw new Error(`Minio API not reachable on port: ${config.port}`)
    }
  })

  const minio = new Minio(config)

  if (await minio.bucketExists(name)) {
    return console.log(`Cannot create bucket "${name}": already exists`)
  }

  await minio.makeBucket(name, 'us-east-1')
  console.log(`Created bucket "${name}"`)
}

/**
 * @param {string} name Bucket name
 */
export async function minioBucketRemoveCmd(name) {
  const minio = new Minio(minioConfig())

  if (!(await minio.bucketExists(name))) {
    return console.log(`Cannot remove bucket "${name}": not found`)
  }

  const keys = []
  for await (const item of minio.listObjectsV2(name, '', true)) {
    keys.push(item.name)
  }

  if (keys.length) {
    console.log(`Removing ${keys.length} items...`)
    await minio.removeObjects(name, keys)
  }

  await minio.removeBucket(name)
  console.log(`Removed bucket "${name}"`)
}
