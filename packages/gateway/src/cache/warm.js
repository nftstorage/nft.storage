/* global Response caches */
import { GetObjectCommand } from '@aws-sdk/client-s3/dist-es/commands/GetObjectCommand.js'

/**
 * Warm cache from
 * @param {Request} request
 * @param {import('../env').Env} env
 * @param {import('../index').Ctx} ctx
 * @returns {Promise<Response>}
 */
export async function cacheWarmFromBackupUrlGet(request, env, ctx) {
  // TODO: Auth?
  const params = request.params
  let url
  try {
    url = new URL(decodeURIComponent(params.url))
  } catch (err) {
    // throw Error of invalid URL
  }

  console.log('url', url)
  console.log('cmd', env.S3_BUCKET_NAME, env.S3_BUCKET_REGION)
  try {
    const s3Object = await env.s3Client.send(
      new GetObjectCommand({
        Bucket: env.S3_BUCKET_NAME || 'dotstorage-prod-0',
        Region: env.S3_BUCKET_REGION || 'us-east-2',
        Key: url.pathname,
      })
    )
  } catch (err) {
    console.log('err', err)
  }
  return new Response()
}
