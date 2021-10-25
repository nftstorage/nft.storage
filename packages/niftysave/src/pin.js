import * as CID from './cid.js'
import * as Cluster from './cluster.js'
import * as Cursor from './hasura/cursor.js'
import * as Hasura from './hasura.js'
import * as IPFSURL from './ipfs-url.js'
import * as Result from './result.js'

import { exponentialBackoff, maxRetries, retry } from './retry.js'
import { fetchWebResource, timeout } from './net.js'

import { TransformStream } from './stream.js'
import { configure } from './config.js'
import { printURL } from './util.js'
import { script } from 'subprogram'
import { setTimeout as sleep } from 'timers/promises'

export const main = async () => await spawn(await configure())

/**
 * @typedef {Object} Config
 * @property {number} budget - Time budget
 * @property {number} fetchTimeout
 * @property {number} batchSize - Number of tokens in each import
 * @property {number} fetchRetryLimit
 * @property {number} retryInterval
 * @property {number} retryLimit
 * @property {number} queueSize
 * @property {number} concurrency
 * @property {Cluster.Config} cluster
 * @property {Hasura.Config} hasura
 */

/**
 * @param {Config} config
 */
const spawn = async (config) => {
  // Create channel for reader to push data into & writer
  // to pull data from.
  const { writable, readable } = new TransformStream(
    {},
    {
      highWaterMark: config.queueSize,
    }
  )

  // wait for task completion before resuming.
  await Promise.all([
    // create read task that will pull queued nft assets and queue them for
    // analyzer to process.
    readInto(writable, config),
    // create an analyzer task that will pull nft assets from the queue and
    // write updated state to the database.
    archiveFrom(readable, config),
  ])
}

/**
 * Pulls queued resources from the database and queues them into a writer
 * stream. On error will close a stream and release a lock.
 *
 * @param {WritableStream<Resource>} writable
 * @param {Config} config
 * @returns {Promise<never>}
 */
const readInto = async (writable, config) => {
  const writer = writable.getWriter()
  try {
    let cursor = Cursor.init(new Date(0).toISOString())

    while (true) {
      console.log(
        `📥 Fetch ${config.batchSize} queued nft assets from ${JSON.stringify(
          cursor
        )}`
      )
      // Pull queued tasks in FIFO order by `update_at`.
      const page = await retry(
        () => fetchQueuedResources(config, cursor),
        [
          exponentialBackoff(config.retryInterval),
          maxRetries(config.retryLimit),
        ]
      )

      // If we got no queued assets we just sleep for some time and try again.
      if (page.length == 0) {
        console.log(
          `📭  No more queued nft assets, pause for ${config.retryInterval}ms`
        )
        await sleep(config.retryInterval)
      } else {
        console.log('📬 Wait for space in a queue')
        // Now if queue is full, we wait until there is more space.
        await writer.ready
        console.log(`📨 Push ${page.length} nft assets into a queue`)
        // Then we drain all the records even if queue will overflow (no point)
        // in keeping some in memory and constant awaits are likely to slow us
        // down here. One we flush the batch we also pull new batch, chances are
        // items are picked off of queue while we're fetching and if not, then
        // we will wait (see await above).
        for (const record of page) {
          writer.write(record)
        }

        // Update cursor to point to the record after the last one.
        const lastRecord = /** @type {Resource} */ (page[page.length - 1])
        cursor = Cursor.after(cursor, lastRecord.updated_at)
      }
    }
  } finally {
    writer.close()
    writer.releaseLock()
  }
}

/**
 * @typedef {Object} Resource
 * @property {string} uri
 * @property {string} uri_hash
 * @property {string} [ipfs_url]
 * @property {string} updated_at
 *
 * Fetches batch of queued nft assets from the database from the given cursor.
 *
 * @param {Object} config
 * @param {Hasura.Config} config.hasura
 * @param {number} config.batchSize
 * @param {Cursor.Cursor<string>} cursor
 * @returns {Promise<Resource[]>}
 */
const fetchQueuedResources = async (config, cursor) => {
  const { resource } = await Hasura.query(config.hasura, {
    resource: [
      {
        where: {
          status: {
            _eq: 'Queued',
          },
          updated_at: {
            _gte: cursor.time,
          },
        },
        limit: config.batchSize,
        offset: cursor.offset,
      },
      {
        uri: true,
        uri_hash: true,
        ipfs_url: true,
        updated_at: true,
      },
    ],
  })

  return resource
}

/**
 * Pulls resource from the given `readable` stream and after archiving
 * writes results out to database.
 *
 * @param {ReadableStream<Resource>} readable
 * @param {Config} config
 * @returns {Promise<void>}
 */
const archiveFrom = async (readable, config) => {
  const inbox = readable.getReader()
  // spawn number of (as per configuration) concurrent
  // analyzer tasks that will pull incoming `nft_asset` records
  // and advance their state.
  const tasks = Array.from({ length: config.concurrency }, () =>
    archiver(config, inbox)
  )

  await Promise.all(tasks)
  await inbox.cancel()
  inbox.releaseLock()
}

/**
 * @param {Config} config
 * @param {ReadableStreamDefaultReader<Resource>} inbox
 * @returns {Promise<void>}
 */
const archiver = async (config, inbox) => {
  while (true) {
    console.log('📤 Pull nft asset from the queue')
    const next = await inbox.read()
    if (next.done) {
      break
    } else {
      const result = await archive(config, next.value)
      console.log(
        `💾 (${result.hash}) Update nft assets status to ${result.status}`
      )
      await updateResource(config, result)
      console.log(`⏭ (${result.hash}) update complete, moving one`)
    }
  }
}

/**
 * @param {Object} config
 * @param {import('./cluster').Config} config.cluster
 * @param {number} config.fetchTimeout
 * @param {Resource} resource
 * @returns {Promise<ArchiveResult>}
 */
const archive = async (config, resource) => {
  const { uri_hash: hash } = resource
  console.log(`🔬 (${hash}) Parsing resource uri`)

  const urlResult = Result.fromTry(() => new URL(resource.uri))
  if (!urlResult.ok) {
    console.error(`🚨 (${hash}) Failed to parse uri ${urlResult.error}`)
    return {
      hash,
      status: 'URIParseFailed',
      statusText: String(urlResult.error),
    }
  }
  const url = urlResult.value
  console.log(`🧬 (${hash}) Parsed URL ${printURL(url)}`)

  const ipfsURL = IPFSURL.asIPFSURL(url)
  ipfsURL && console.log(`🚀 (${hash}) Derived IPFS URL ${ipfsURL}`)

  return ipfsURL
    ? await archiveIPFSResource(config, { ...resource, hash, ipfsURL })
    : await archiveWebResource(config, { ...resource, hash, url })
}

/**
 * @param {Object} config
 * @param {import('./cluster').Config} config.cluster
 * @param {number} config.fetchTimeout
 * @param {{hash: string, uri: string, ipfsURL: IPFSURL.IPFSURL}} resource
 * @returns {Promise<ArchiveResult>}
 */
const archiveIPFSResource = async (config, { ipfsURL, hash }) => {
  console.log(`📌 (${hash}) Pin an IPFS resource ${ipfsURL}`)
  const pin = await Result.fromPromise(
    Cluster.pin(config.cluster, ipfsURL, {
      signal: timeout(config.fetchTimeout),
      metadata: {
        uri_hash: hash,
      },
    })
  )

  if (!pin.ok) {
    console.error(`🚨 (${hash}) Failed to pin ${pin.error}`)
    return {
      hash,
      ipfsURL: ipfsURL,
      status: 'PinRequestFailed',
      statusText: String(pin.error),
    }
  }
  const cid = CID.parse(pin.value.cid)

  console.log(`📝 (${hash}) Link resource with content ${cid}`)
  return {
    status: 'ContentLinked',
    hash,
    ipfsURL: ipfsURL,
    statusText: 'ContentLinked',
    dagSize: null,
    cid,
  }
}

/**
 * @param {Object} config
 * @param {import('./cluster').Config} config.cluster
 * @param {number} config.fetchTimeout
 * @param {Resource & {hash: string, url: URL}} resource
 * @returns {Promise<ArchiveResult>}
 */
const archiveWebResource = async (config, { hash, url }) => {
  console.log(`📡 (${hash}) Fetching content from ${printURL(url)}`)
  const fetch = await Result.fromPromise(
    fetchWebResource(url, {
      signal: timeout(config.fetchTimeout),
    })
  )
  if (!fetch.ok) {
    console.error(
      `🚨 (${hash}) Failed to fetch from ${printURL(url)} ${fetch.error}`
    )

    return {
      hash,
      status: 'ContentFetchFailed',
      statusText: String(fetch.error),
    }
  }
  const content = fetch.value

  console.log(
    `📌 (${hash}) Pin fetched content by uploading ${content.size} bytes`
  )

  const pin = await Result.fromPromise(
    Cluster.add(config.cluster, content, {
      signal: timeout(config.fetchTimeout),
      metadata: {
        uri_hash: hash,
        sourceURL: url.protocol === 'data:' ? 'data:...' : url.href,
      },
    })
  )

  if (!pin.ok) {
    console.error(`🚨 (${hash}) Failed to pin ${pin.error}`)
    return {
      hash,
      status: 'PinRequestFailed',
      statusText: String(pin.error),
    }
  }

  const cid = CID.parse(pin.value.cid)

  console.log(`📝 (${hash}) Link resource with content ${cid}`)

  return {
    hash,
    ipfsURL: null,
    status: 'ContentLinked',
    statusText: 'ContentLinked',
    dagSize: pin.value.bytes || pin.value.size,
    cid,
  }
}

/**
 * @typedef {ArchiveOk|ArchiveError} ArchiveResult
 * @param {Object} config
 * @param {Hasura.Config} config.hasura
 * @param {ArchiveResult} state
 */

const updateResource = async (config, state) =>
  state.status === 'ContentLinked'
    ? linkResource(config, state)
    : failResource(config, state)

/**
 * @typedef {Object} ArchiveOk
 * @property {string} hash
 * @property {'ContentLinked'} status
 * @property {string} statusText
 * @property {URL|null} ipfsURL
 * @property {number|null} dagSize
 * @property {CID.CID} cid
 *
 * @param {Object} config
 * @param {Hasura.Config} config.hasura
 * @param {ArchiveOk} state
 */
const linkResource = async (
  config,
  { hash, statusText, ipfsURL, dagSize, cid }
) => {
  Hasura.mutation(config.hasura, {
    link_resource_content: [
      {
        args: {
          uri_hash: hash,
          cid: CID.format(cid),
          ipfs_url: ipfsURL ? ipfsURL.href : null,
          dag_size: dagSize,
          status_text: statusText,
        },
      },
      {
        updated_at: true,
      },
    ],
  })
}

/**
 * @typedef {Object} ArchiveError
 * @property {string} hash
 * @property {'URIParseFailed'|'ContentFetchFailed'|'PinRequestFailed'} status
 * @property {string} statusText
 * @property {URL|null} [ipfsURL]
 *
 * @param {Object} config
 * @param {Hasura.Config} config.hasura
 * @param {ArchiveError} result
 *
 */
const failResource = async (config, { hash, status, statusText, ipfsURL }) => {
  await Hasura.mutation(config.hasura, {
    fail_resource: [
      {
        args: {
          uri_hash: hash,
          status,
          status_text: statusText,
          ipfs_url: ipfsURL ? ipfsURL.href : null,
        },
      },
      {
        updated_at: true,
      },
    ],
  })
}

script({ ...import.meta, main })
