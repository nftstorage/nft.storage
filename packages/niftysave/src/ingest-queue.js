import * as Cursor from './hasura/cursor.js'
import * as ERC721 from '../gen/erc721/index.js'
import * as Hasura from './hasura.js'

import { enqueueScrapedRecords, fetchNFTBatch } from './ingest/repo.js'
import { exponentialBackoff, maxRetries, retry } from './retry.js'

import { TransformStream } from './stream.js'
import { checkIsBinRange } from './hasura/cursor.js'
import { configure } from './config.js'
import { initIngestionQueueCursor } from './ingest/cursor.js'
import { script } from 'subprogram'
import { setTimeout as sleep } from 'timers/promises'

/**
 * @typedef {import('./ingest').ERC721ImportNFT} ERC721ImportNFT
 * @typedef {import('./ingest').NFTSSubgraphResult} NFTSSubgraphResult
 */

/**
 * @typedef { Object } Config
 * @property { ERC721.Config } config.erc721
 * @property { Hasura.Config } config.hasura
 * @property { number } config.ingestRetryThrottle
 * @property { number } config.ingestHighWatermark
 * @property {string} ingestLastUpdatedDate
 * @property {string} ingestRangeStartDate
 * @property {string} ingestRangeEndDate
 * @property { number } config.ingestScraperBatchSize
 * @property { number } config.ingestScraperRetryLimit
 * @property { number } config.ingestScraperRetryInterval
 * @property { number } config.ingestScraperRetryMaxInterval
 * @property { number } config.ingestWriterBatchSize
 * @property { number } config.ingestWriterRetryLimit
 * @property { number } config.ingestWriterRetryInterval
 * @property { number } config.ingestWriterRetryMaxInterval
 */

export const main = async () => await spawn(await configure())

/**
 * Spawn process and create a TransformStream to store and write from.
 * Storing and writing are independent processes running asynchronously
 * Backpressure is managed by the Transform Stream's high Watermark.
 *
 * The TransformStream is 'the inbox'.
 * @param {Config} config
 */
async function spawn(config) {
  console.log(`⏲️ Begin Scraping the Ethereum Blockchain.`)
  /**
   * @type { TransformStream<ERC721ImportNFT> }
   */
  const inbox = new TransformStream(
    {},
    {
      highWaterMark: config.ingestHighWatermark,
    }
  )

  const reader = readIntoInbox(config, inbox.writable)
  const writer = writeFromInbox(config, inbox.readable)

  await Promise.all([reader, writer])
  return undefined
}

/**
 * Inserts nft records by batches into the inbox.
 * @param { Config } config
 * @param { WritableStream<ERC721ImportNFT>} writeable
 * @return { Promise<never> }
 */
async function readIntoInbox(config, writeable) {
  const writer = writeable.getWriter()

  let cursor = Cursor.init(await initIngestionQueueCursor(config))

  Cursor.print(cursor)

  while (true) {
    let scrape = []
    try {
      /*
       * Attempt to call subgraph, and make a scrape.
       * if something goes wrong, we can retry, each time waiting longer.
       * This is to account for intermittent 'yellow flag' failures, like
       * network temporary outages.
       * Eventually after enough failures, we can actually throw
       */
      scrape = await retry(
        async () => await fetchNFTBatch(config, cursor),
        [
          maxRetries(config.ingestScraperRetryLimit),
          exponentialBackoff(
            config.ingestScraperRetryInterval,
            config.ingestScraperRetryMaxInterval
          ),
        ]
      )
      // you scraped successfully, got nothing.
      // you're caught up. Retry later
      if (scrape.length == 0) {
        console.log(
          `🥂 You're caught up, retry in ${config.ingestRetryThrottle}`
        )
        await sleep(config.ingestRetryThrottle)
      } else {
        await writer.ready
        console.log(`📨 Adding ${scrape.length} items into Queue.`)
        for (const nft of scrape) {
          writer.write(nft)
          //Continuously update the in-memory cursor
          cursor = Cursor.after(cursor, parseInt(nft.mintTime))
        }
        //Its useful to see what the cursor is periodically.
        Cursor.print(cursor)
      }
    } catch (err) {
      console.error(`Something unexpected happened scraping nfts`, err)
      writer.close()
      throw err
    }
  }
}

/**
 * Drains records sequentially from the inbox
 * @param { Config } config
 * @param { ReadableStream<ERC721ImportNFT>} readable
 *
 */
async function writeFromInbox(config, readable) {
  const reader = readable.getReader()

  const hasBinRange = checkIsBinRange(
    config.ingestRangeStartDate,
    config.ingestRangeEndDate
  )

  const endBinTimeInSeconds = hasBinRange
    ? new Date(config.ingestRangeEndDate).getTime() / 1000
    : 0

  while (true) {
    /**
     * @type ERC721ImportNFT[]
     */
    let nextBatch = []
    let lastNFT = null
    try {
      /**
       * We will attempt to write several import records that have been scraped.
       * If the write is a failure, we will retry, to account for intermittent outages
       * If failure occurs several times and for long enough, we throw an error.
       * We write from the Transform stream, in specified batches.
       * this stream should typically never be closed,
       * unless the writeable end has unexpectely closed due to an error
       */

      //Assemble next batch.
      while (nextBatch.length < config.ingestWriterBatchSize) {
        const nextImport = await reader.read()
        if (nextImport.done) {
          console.log(
            `⚠️ The Ingestion Stream was closed while assembling a new batch.`
          )
          reader.cancel()
        } else {
          nextBatch.push(nextImport.value)
          lastNFT = nextImport.value
        }
      }

      await retry(
        async () => await enqueueScrapedRecords(config, nextBatch),
        [maxRetries(1)]
      )

      //Reset the batch after writing.
      nextBatch = []

      //check for end of time.
      const endOfTime =
        endBinTimeInSeconds &&
        lastNFT &&
        parseInt(lastNFT.mintTime) > endBinTimeInSeconds

      if (lastNFT && endOfTime) {
        printEndOfTime(config, lastNFT)
        reader.cancel()
        throw `Reach end of time-slice at ${config.ingestRangeEndDate}`
      }

      lastNFT = null
    } catch (err) {
      console.log('Last NFT Batch', JSON.stringify(nextBatch, null, 2))
      console.error(`Something went wrong when writing scraped nfts`, err)
      reader.cancel(err)
      throw err
    }
  }
}
/**
 *
 * @param {Config} config
 * @param {ERC721ImportNFT} nft
 */
const printEndOfTime = (config, nft) => {
  const { id, mintTime } = nft
  const nftDate = new Date(parseInt(mintTime) * 1000)
  const endOfTimeDate = new Date(config.ingestRangeEndDate)
  const endOftimeInSeconds =
    new Date(config.ingestRangeEndDate).getTime() / 1000

  console.log(`
    \n🥂 You've completed the time-slice [${config.ingestRangeStartDate} to  ${
    config.ingestRangeEndDate
  }]!
    \nNFT (${id})'s mint-time of ${nftDate.toUTCString()} occurs later than ${endOfTimeDate.toUTCString()}
    \nnft.mintTime ${mintTime}\t slice-end(s) ${endOftimeInSeconds}
    `)
}

script({ ...import.meta, main })
