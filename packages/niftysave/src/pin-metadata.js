import * as Result from './result.js'
import * as Cluster from './cluster.js'
import { configure } from './config.js'
import { script } from 'subprogram'
import * as Hasura from './hasura.js'
import { exponentialBackoff, maxRetries, retry } from './retry.js'
import * as Cursor from './hasura/cursor.js'
import { TransformStream } from './stream.js'
import { setTimeout as sleep } from 'timers/promises'
import * as Car from './car.js'
import { NFTStorage } from 'nft.storage'

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
 * @property {import('nft.storage/src/lib/interface').Service} nftStorage
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
 * @param {WritableStream<ParsedAsset>} writable
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
        () => fetchParsedAssets(config, cursor),
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
        const lastRecord = /** @type {ParsedAsset} */ (page[page.length - 1])
        cursor = Cursor.after(cursor, lastRecord.updated_at)
      }
    }
  } finally {
    writer.close()
    writer.releaseLock()
  }
}

/**
 * @typedef {Object} ParsedAsset
 * @property {string} token_uri_hash
 * @property {string} updated_at
 * @property {{json?:any}} metadata
 */
/**
 * Fetches batch of parsed nft assets and corresponding metadata from the
 * given cursor position.
 *
 * @param {Object} config
 * @param {Hasura.Config} config.hasura
 * @param {number} config.batchSize
 * @param {Cursor.Cursor<string>} cursor
 * @returns {Promise<ParsedAsset[]>}
 */
const fetchParsedAssets = async (config, cursor) => {
  const { nft_asset } = await Hasura.query(config.hasura, {
    nft_asset: [
      {
        where: {
          status: {
            _eq: 'Parsed',
          },
          metadata_cid: {
            _is_null: false,
          },
          updated_at: {
            _gte: cursor.time,
          },
        },
        limit: config.batchSize,
        offset: cursor.offset,
        order_by: [{ updated_at: Hasura.schema.order_by.asc }],
      },
      {
        token_uri_hash: true,
        metadata: {
          json: [{}, true],
        },
        updated_at: true,
      },
    ],
  })

  return /** @type {ParsedAsset[]}*/ (nft_asset)
}

/**
 * Pulls resource from the given `readable` stream and after archiving
 * writes results out to database.
 *
 * @param {ReadableStream<ParsedAsset>} readable
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
 * @param {ReadableStreamDefaultReader<ParsedAsset>} inbox
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
      await updateAsset(config, result)
      console.log(`⏭ (${result.hash}) update complete, moving one`)
    }
  }
}

/**
 * @param {Object} config
 * @param {import('./cluster').Config} config.cluster
 * @param {import('nft.storage/src/lib/interface').Service} config.nftStorage
 * @param {number} config.fetchTimeout
 * @param {ParsedAsset} asset
 * @returns {Promise<AssetUpdate>}
 */
const archive = async (config, asset) => {
  const { token_uri_hash: hash, metadata } = asset
  console.log(`🔬 (${hash}) Archiving metadata`)

  // Note we use original source to keep the formatting so that CID will come
  // out exactly the same.
  const { car } = await Car.encodeJSON(metadata.json)

  console.log(`📌 (${hash}) Pin metadata to IPFS`)
  const pin = await Result.fromPromise(
    NFTStorage.storeCar(config.nftStorage, car)
  )

  if (!pin.ok) {
    console.error(
      `🚨 (${hash}) Pinning metadata failed ${pin.error}, set status to parsed`
    )

    return {
      hash,
      status: 'Parsed',
      statusText: `${pin.error}\n${pin.error.stack}`,
    }
  }

  console.log(`📝 (${hash}) Link metadata`)

  return {
    hash,
    status: 'Linked',
    statusText: 'Linked',
  }
}

/**
 * @typedef {Object} AssetUpdate
 * @property {string} hash
 * @property {'Parsed'|'Linked'} status
 * @property {string} statusText
 *
 * @param {Object} config
 * @param {Hasura.Config} config.hasura
 * @param {AssetUpdate} update
 */

const updateAsset = async (config, { hash, status, statusText }) => {
  // TODO: Consider exposing more limited interface from sql function which
  // upholds invariant of unidirectional status update.
  await Hasura.mutation(config.hasura, {
    update_nft_asset_by_pk: [
      {
        pk_columns: { token_uri_hash: hash },
        _set: {
          status,
          status_text: statusText,
        },
      },
      {
        __typename: true,
      },
    ],
  })
}

script({ ...import.meta, main })
