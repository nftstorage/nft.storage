import Toucan from 'toucan-js'
import { DBClient } from './db-client.js'
import { S3Uploader } from './uploader/s3-uploader.js'
import { R2Uploader } from './uploader/r2-uploader.js'
import { getServiceConfig } from '../config.js'
import { Logging } from './logs.js'
import pkg from '../../package.json'
import { Service } from 'ucan-storage/service'
import { LinkdexApi } from './linkdex.js'
import { createW3upClientFromConfig } from './w3up.js'
import { DID } from '@ucanto/core'
import * as contentClaims from '@web3-storage/content-claims/client'

/**
 * Obtains a route context object.
 *
 * @param {FetchEvent} event
 * @param {Record<string, string>} params Parameters from the URL
 * @returns {Promise<import('../bindings').RouteContext>}
 */
export async function getContext(event, params) {
  const config = getServiceConfig()
  const db = new DBClient(config.DATABASE_URL, config.DATABASE_TOKEN)

  const s3Uploader = new S3Uploader(
    config.S3_REGION,
    config.S3_ACCESS_KEY_ID,
    config.S3_SECRET_ACCESS_KEY,
    config.S3_BUCKET_NAME,
    { endpoint: config.S3_ENDPOINT, appName: 'nft' }
  )

  const r2Uploader = new R2Uploader({
    carpark: config.CARPARK,
    publicUrl: config.CARPARK_URL,
    dudewhere: config.DUDEWHERE,
    satnav: config.SATNAV,
  })

  const linkdexApi = new LinkdexApi({
    apiUrl: config.LINKDEX_URL ? new URL(config.LINKDEX_URL) : undefined,
    bucket: config.CARPARK,
  })

  const sentryOptions = {
    dsn: config.SENTRY_DSN,
    allowedHeaders: ['user-agent', 'x-client'],
    allowedSearchParams: /(.*)/,
    debug: false,
    environment: config.ENV,
    rewriteFrames: {
      root: '/',
    },
    release: config.VERSION,
    pkg,
  }

  const sentry = new Toucan({
    event,
    ...sentryOptions,
  })
  const log = new Logging(event, {
    token: config.LOGTAIL_TOKEN,
    debug: config.DEBUG,
    sentry,
  })

  const ucanService = await Service.fromPrivateKey(config.PRIVATE_KEY)

  const w3upConfig = {
    W3UP_URL: config.W3UP_URL,
    W3UP_DID: config.W3UP_DID,
    W3_NFTSTORAGE_PRINCIPAL: config.W3_NFTSTORAGE_PRINCIPAL,
    W3_NFTSTORAGE_PROOF: config.W3_NFTSTORAGE_PROOF,
    W3_NFTSTORAGE_SPACE: config.W3_NFTSTORAGE_SPACE,
    W3_NFTSTORAGE_ENABLE_W3UP_FOR_EMAILS:
      config.W3_NFTSTORAGE_ENABLE_W3UP_FOR_EMAILS,
  }
  let w3up
  if (
    config.W3UP_URL &&
    config.W3UP_DID &&
    config.W3_NFTSTORAGE_PRINCIPAL &&
    config.W3_NFTSTORAGE_PROOF
  ) {
    try {
      const w3upWIP = await createW3upClientFromConfig({
        url: config.W3UP_URL,
        did: DID.parse(config.W3UP_DID).did(),
        principal: config.W3_NFTSTORAGE_PRINCIPAL,
        proof: config.W3_NFTSTORAGE_PROOF,
      })
      // @ts-expect-error todo add DID check
      w3upWIP.setCurrentSpace(config.W3_NFTSTORAGE_SPACE)
      w3up = w3upWIP
    } catch (error) {
      console.error(`error creating w3up-client from config`, error)
    }
  }
  return {
    ...w3upConfig,
    params,
    db,
    linkdexApi,
    s3Uploader,
    r2Uploader,
    log,
    ucanService,
    contentClaims,
    w3up,
  }
}
