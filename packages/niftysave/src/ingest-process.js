import * as ERC721 from '../gen/erc721/index.js'
import * as Hasura from './hasura.js'

import { configure } from './config.js'
import { script } from 'subprogram'

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
 * Initialize and periodically run stored procedure to
 * process records in the ingestion queue
 * @param {Config} config
 */
async function spawn(config) {
  console.log(`⏲️ Begin Processing Ingestion Queue.`)
  // TODO: remotely initiate the queue-processor, only if it is not running
  // and new records have been enqueued
  console.log(config)
  return undefined
}

script({ ...import.meta, main })
