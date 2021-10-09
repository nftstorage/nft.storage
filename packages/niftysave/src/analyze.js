import * as Result from './result.js'
import * as IPFSURL from './ipfs-url.js'
import * as Cluster from './cluster.js'
import * as IPFS from './ipfs.js'
import { fetchResource, timeout } from './net.js'
import { configure } from './config.js'
import { printURL } from './util.js'
import { script } from 'subprogram'
import * as Hasura from './hasura.js'
import { exponentialBackoff, maxRetries, retry } from './retry.js'
import * as Cursor from './hasura/cursor.js'
import { TransformStream } from './stream.js'
import { setTimeout as sleep } from 'timers/promises'

export const main = async () => await spawn(await configure())

/**
 * @typedef {Object} Config
 * @property {Hasura.Config} hasura
 * @property {import('./ipfs').Config} ipfs
 * @property {Cluster.Config} cluster
 * @property {number} budget
 * @property {number} batchSize
 * @property {number} concurrency
 * @property {number} fetchTimeout
 * @property {number} fetchRetryLimit
 * @property {number} retryInterval
 * @property {number} retryLimit
 * @property {number} queueSize
 *
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
    analyzeFrom(readable, config),
  ])
}

/**
 * Pulls queued nft assets from the database and queues them into a writer
 * stream. On error will close a stream and release a lock.
 *
 * @param {WritableStream<Asset>} writable
 * @param {Config} config
 * @returns {Promise<never>}
 */
const readInto = async (writable, config) => {
  const writer = writable.getWriter()
  try {
    let cursor = Cursor.init()

    while (true) {
      console.log(
        `📥 Fetch ${config.batchSize} queued nft assets from ${JSON.stringify(
          cursor
        )}`
      )
      // Pull queued tasks in FIFO order by `update_at`.
      const page = await retry(
        () => fetchQueuedAssets(config, cursor),
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
        const lastRecord = /** @type {Asset} */ (page[page.length - 1])
        cursor = Cursor.after(cursor, lastRecord)
      }
    }
  } finally {
    writer.close()
    writer.releaseLock()
  }
}

/**
 * @typedef {Object} Asset
 * @property {string} token_uri
 * @property {string} token_uri_hash
 * @property {string} [ipfs_url]
 * @property {string} updated_at
 *
 * Fetches batch of queued nft assets from the database from the given cursor.
 *
 * @param {Object} config
 * @param {Hasura.Config} config.hasura
 * @param {number} config.batchSize
 * @param {Cursor.Cursor} cursor
 * @returns {Promise<Asset[]>}
 */
const fetchQueuedAssets = async (config, cursor) => {
  const { nft_asset: page } = await Hasura.query(config.hasura, {
    nft_asset: [
      {
        where: {
          status: {
            _eq: 'Queued',
          },
          updated_at: {
            _gte: cursor.updated_at,
          },
        },
        order_by: [
          {
            updated_at: Hasura.schema.order_by.asc,
          },
        ],
        limit: config.batchSize,
        offset: cursor.offset,
      },
      {
        token_uri: true,
        token_uri_hash: true,
        ipfs_url: true,
        updated_at: true,
      },
    ],
  })

  return page
}

/**
 * Pulls nft assets from the given `readable` stream and after performing
 * analysis writes results out to database.
 *
 * @param {ReadableStream<Asset>} readable
 * @param {Config} config
 * @returns {Promise<void>}
 */
const analyzeFrom = async (readable, config) => {
  const inbox = readable.getReader()
  // spawn number of (as per configuration) concurrent
  // analyzer tasks that will pull incoming `nft_asset` records
  // and advance their state.
  const tasks = Array.from({ length: config.concurrency }, () =>
    analyzer(config, inbox)
  )

  await Promise.all(tasks)
  await inbox.cancel()
  inbox.releaseLock()
}

/**
 * @param {Config} config
 * @param {ReadableStreamDefaultReader<Asset>} inbox
 * @returns {Promise<void>}
 */
const analyzer = async (config, inbox) => {
  while (true) {
    console.log('📤 Pull nft asset from the queue')
    const next = await inbox.read()
    if (next.done) {
      break
    } else {
      const result = await analyze(config, next.value)
      console.log(
        `💾 (${result.hash}) Update nft assets status to ${result.status}`
      )
      await updateAsset(config, result)
      console.log(`⏭ (${result.hash}) update complete, moving one`)
    }
  }
}

/**
 * @typedef {AnalyzeOk|AnalyzeError} AnalyzeResult
 *
 * @param {Config} config
 * @param {Asset} asset
 * @returns {Promise<AnalyzeResult>}
 */

const analyze = async (config, asset) => {
  const { token_uri_hash: hash } = asset
  console.log(`🔬 (${hash}) Parsing tokenURI`)
  const urlResult = Result.fromTry(() => new URL(asset.token_uri))
  if (!urlResult.ok) {
    console.error(
      `🚨 (${asset.token_uri_hash}) Parsing URL failed ${urlResult.error}, report problem`
    )

    return {
      hash,
      status: 'URIParseFailed',
      statusText: `${urlResult.error}\n${urlResult.error.stack}`,
    }
  }

  const url = urlResult.value
  console.log(`🧬 (${hash}) Parsed URL ${printURL(url)}`)
  const ipfsURL = IPFSURL.asIPFSURL(url)
  ipfsURL && console.log(`🚀 (${hash}) Derived IPFS URL ${ipfsURL}`)

  console.log(
    `🌐 (${hash}) Fetching token metadata from ${printURL(ipfsURL || url)}`
  )

  // Use exponentian backoff on network requests and retry several times before
  // bailing
  const blob = await Result.fromPromise(
    retry(
      () =>
        fetchResource(
          config,
          { url, ipfsURL },
          { signal: timeout(config.fetchTimeout) }
        ),
      [
        exponentialBackoff(config.retryInterval),
        maxRetries(config.fetchRetryLimit),
      ]
    )
  )
  const content = blob.ok ? await Result.fromPromise(blob.value.text()) : blob

  if (!content.ok) {
    console.error(`🚨 (${hash}) Fetch failed ${content.error}`)

    return {
      hash,
      status: 'ContentFetchFailed',
      statusText: `${content.error}\n${content.error.stack}`,
      ipfsURL,
    }
  }

  console.log(`🔬 (${hash}) Parsing token metadata`)

  const metadata = await Result.fromPromise(parseERC721Metadata(content.value))
  if (!metadata.ok) {
    console.error(`🚨 (${hash}) Parse failed ${metadata.error}`)

    return {
      hash,
      status: 'ContentParseFailed',
      statusText: `${metadata.error}\n${metadata.error.stack}`,
      ipfsURL: ipfsURL,
    }
  }

  console.log(`📝 (${hash}) Link metadata ${metadata.value.cid}`)

  return {
    hash,
    status: 'Linked',
    statusText: 'Linked',
    ipfsURL: ipfsURL,
    metadata: metadata.value,
  }
}

/**
 * @param {Object} config
 * @param {Hasura.Config} config.hasura
 * @param {AnalyzeResult} state
 */
const updateAsset = async (config, state) =>
  state.status === 'Linked'
    ? linkAsset(config, state)
    : failAsset(config, state)

/**
 * @typedef {Object} AnalyzeOk
 * @property {string} hash
 * @property {'Linked'} status
 * @property {string} statusText
 * @property {URL|null} ipfsURL
 * @property {Metadata} metadata
 *
 * @param {Object} config
 * @param {Hasura.Config} config.hasura
 * @param {AnalyzeOk} state
 */
const linkAsset = async (
  config,
  { hash, statusText, ipfsURL, metadata: { cid, content, links } }
) => {
  const resources = links.map((url) => linkResource(cid, url))

  const { link_nft_asset } = await Hasura.mutation(
    config.hasura,
    {
      link_nft_asset: [
        {
          args: {
            token_uri_hash: hash,
            status_text: statusText,
            ipfs_url: ipfsURL ? ipfsURL.href : null,
            content_cid: cid,
            // note need to use variable to workaround
            // https://github.com/graphql-editor/graphql-zeus/issues/144
            metadata: Hasura.$`metadata`,
          },
        },
        {
          updated_at: true,
          status: true,
        },
      ],
      __alias: Object.fromEntries(resources.entries()),
    },
    {
      variables: {
        metadata: content,
      },
    }
  )

  return link_nft_asset
}

/**
 * @param {string} cid
 * @param {string} uri
 * @returns {Hasura.Mutation}
 */
const linkResource = (cid, uri) => ({
  link_nft_resource: [
    {
      args: {
        cid,
        uri,
      },
    },
    {
      uri_hash: true,
    },
  ],
})

/**
 * @typedef {Object} AnalyzeError
 * @property {string} hash
 * @property {'URIParseFailed'|'ContentFetchFailed'|'ContentParseFailed'} status
 * @property {string} statusText
 * @property {URL|null} [ipfsURL]
 *
 * @param {Object} config
 * @param {Hasura.Config} config.hasura
 * @param {AnalyzeError} state
 */
const failAsset = async (config, { hash, status, statusText, ipfsURL }) => {
  const { fail_nft_asset } = await Hasura.mutation(config.hasura, {
    fail_nft_asset: [
      {
        args: {
          token_uri_hash: hash,
          status,
          status_text: statusText,
          ipfs_url: ipfsURL ? ipfsURL.href : null,
        },
      },
      {
        status: true,
        updated_at: true,
      },
    ],
  })

  return fail_nft_asset
}

/**
 * @typedef {Object} Metadata
 * @property {string} cid - CID for the metadata content.
 * @property {Object} content - actual JSON data.
 * @property {string[]} links
 *
 * @param {string} content
 * @returns {Promise<Metadata>}
 */
const parseERC721Metadata = async (content) => {
  const json = JSON.parse(content)

  const { cid } = await IPFS.importBlob(new Blob([content]))

  const urls = new Set()

  /** @type {Metadata} */
  for (const [value] of iterate({ ...json, image: null })) {
    const url = typeof value === 'string' ? tryParseURL(value) : null
    if (url) {
      urls.add(url.href)
    }
  }

  return { cid: cid.toString(), links: [...urls], content: json }
}

/**
 *
 * @param {string} input
 */
const tryParseURL = (input) => {
  try {
    return new URL(input)
  } catch (error) {
    return null
  }
}

/**
 * @param {Object} data
 * @param {PropertyKey[]} [path]
 * @returns {Iterable<[string|number|boolean|null, PropertyKey[]]>}
 */
const iterate = function* (data, path = []) {
  if (Array.isArray(data)) {
    for (const [index, element] of data) {
      yield* iterate(element, [...path, index])
    }
  } else if (data && typeof data === 'object') {
    for (const [key, value] of Object.entries(data)) {
      yield* iterate(value, [...path, key])
    }
  } else {
    yield [data, path]
  }
}

script({ ...import.meta, main })
