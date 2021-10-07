import * as ERC721 from '../gen/erc721/index.js'
import * as Hasura from './hasura.js'

import { exponentialBackoff, maxRetries, retry } from './retry.js'

import { TransformStream } from './stream.js'
import { configure } from './config.js'
import { lastScrapeId } from './ingest-blockchain/cursor.js'
import { script } from 'subprogram'
import { setTimeout as sleep } from 'timers/promises'

/**
 *
 * @typedef {{
 *  id: string
 *  name: string
 *  symbol: string
 *  supportsEIP721Metadata: Boolean
 * }} ERC721ImportNFTContract
 *
 * @typedef {{
 *   id: String
 * }} ERC721ImportNFTOwner
 *
 * @typedef {{
 *  id: string
 *  tokenID: string
 *  tokenURI: string
 *  mintTime: string
 *  blockNumber: Number
 *  blockHash: String
 *  contract: ERC721ImportNFTContract
 *  owner: ERC721ImportNFTOwner
 * }} ERC721ImportNFT
 */

/**
 *
 * @typedef {{
 *  scrapeRetryThrottle: Number
 * }} IngestBlockchainConfig
 */

/**
 * @typedef { Object } Config
 * @property { ERC721.Config } config.erc721
 * @property { Hasura.Config } config.hasura
 * @property { Number } config.ingestRetryThrottle
 * @property { Number } config.ingestHighWatermark
 * @property { Number } config.ingestBatchSize
 * @property { Number } config.ingestScraperRetryLimit
 * @property { Number } config.ingestScraperRetryInterval
 * @property { Number } config.ingestScraperRetryMaxInterval
 * @property { Number } config.ingestWriterRetryLimit
 * @property { Number } config.ingestWriterRetryInterval
 * @property { Number } config.ingestWriterRetryMaxInterval
 */

/**
 * @typedef {{
 *   importInbox: ERC721ImportNFT[]
 *   lastScrapeId: String
 *   draining: Boolean
 *   maxInboxSize: Number
 *   scrapeBatchSize: Number
 *   emptyDrainThrottle: Number
 *   emptyScrapeThrottle: Number
 * }} IngestorState
 */

/**
 * @typedef {{
 *  tokens: ERC721ImportNFT[]
 * }} NFTSSubGraphResultValue
 *
 * @typedef {{
 *  ok: Boolean
 *  value: NFTSSubGraphResultValue
 *  done: Boolean
 * }} NFTSSubgraphResult
 *
 */

/**
 * @param {Config} config
 * @returns {Promise<any>}
 */
const nextSubgraphQuery = async (config) => {
  const query = {
    first: config.ingestBatchSize,
    where: { tokenURI_not: '', id_gt: await lastScrapeId(config) },
  }
  const erc721ResultDefinition = {
    id: 1,
    tokenID: 1,
    tokenURI: 1,
    mintTime: 1,
    blockNumber: 1,
    blockHash: 1,
    contract: {
      id: 1,
      name: 1,
      symbol: 1,
      supportsEIP721Metadata: 1,
    },
    owner: {
      id: 1,
    },
  }
  return {
    tokens: [query, erc721ResultDefinition],
  }
}

/**
 * This function is a hook to clean up data (or loosen typing)
 * @param { ERC721.schema.Token } token
 * @returns { ERC721ImportNFT }
 */
function subgraphTokenToERC721ImportNFT(token) {
  const {
    id,
    tokenID,
    mintTime,
    tokenURI,
    blockNumber,
    blockHash,
    contract,
    owner,
  } = token
  return {
    id,
    tokenID: tokenID.toString() || '',
    mintTime: mintTime.toString() || '',
    tokenURI: tokenURI.toString(),
    blockNumber,
    blockHash,
    contract: {
      id: contract.id || '',
      name: contract.name || '',
      symbol: contract.symbol || '',
      supportsEIP721Metadata: contract.supportsEIP721Metadata,
    },
    owner: {
      id: owner.id,
    },
  }
}

/**
 * @param { Config } config
 * @returns { Promise<ERC721ImportNFT[]> }
 */
async function fetchNextNFTBatch(config) {
  try {
    const query = await nextSubgraphQuery(config)
    const nftsResult = await ERC721.query(config.erc721, query)
    if (nftsResult.ok === false) {
      console.error(nftsResult)
      throw new Error(JSON.stringify(nftsResult))
    }
    const { tokens } = nftsResult?.value || []
    return tokens.map(subgraphTokenToERC721ImportNFT)
  } catch (err) {
    console.error(`🚨 Something unexpected happened scraping nfts`, err)
    throw err
  }
}

/**
 * @param { Config } config
 * @param { ERC721ImportNFT } erc721Import
 * @returns { Promise<any> }
 */
async function writeScrapedRecord(config, erc721Import) {
  const {
    blockHash,
    blockNumber,
    contract,
    id,
    mintTime,
    owner,
    tokenID,
    tokenURI,
  } = erc721Import

  const nft = {
    block_hash: blockHash || '',
    block_number: blockNumber || 0,
    contract_id: contract.id,
    contract_name: contract.name,
    contract_supports_eip721_metadata: contract.supportsEIP721Metadata,
    contract_symbol: contract.symbol,
    id: id,
    mint_time: new Date(parseInt(mintTime.padEnd(13, '0'))),
    owner_id: owner.id,
    token_id: tokenID,
    token_uri: tokenURI,
  }

  return Hasura.mutation(config.hasura, {
    ingest_erc721_token: [
      {
        args: nft,
      },
      {
        id: true,
      },
    ],
  })
}

/**
 * @param { Config } config
 * @param { ReadableStream<ERC721ImportNFT>} readable
 */
async function writeFromInbox(config, readable) {
  const inbox = readable.getReader()
  while (true) {
    const nextImport = await inbox.read()
    try {
      nextImport.value &&
        retry(
          async () => await writeScrapedRecord(config, nextImport.value),
          [
            maxRetries(config.ingestWriterRetryLimit),
            exponentialBackoff(
              config.ingestWriterRetryInterval,
              config.ingestWriterRetryMaxInterval
            ),
          ]
        )
    } catch (err) {
      console.log('Last NFT', nextImport)
      console.error(`Something went wrong when writing scraped nfts`, err)
      return err
    }
  }
}

/**
 * @param { Config } config
 * @param { WritableStream<ERC721ImportNFT>} writeable
 */
async function readIntoInbox(config, writeable) {
  const writer = writeable.getWriter()

  while (true) {
    let scrape = []
    try {
      scrape = await retry(
        async () => fetchNextNFTBatch(config),
        [
          maxRetries(config.ingestScraperRetryLimit),
          exponentialBackoff(
            config.ingestScraperRetryInterval,
            config.ingestScraperRetryMaxInterval
          ),
        ]
      )
    } catch (err) {
      console.error(`Something unexpected happened scraping nfts`, err)
      throw err
    }

    // you scraped successfully, got nothing.
    // you're caught up. Retry later
    if (scrape.length == 0) {
      sleep(config.ingestRetryThrottle)
    } else {
      await writer.ready
      for (const nft of scrape) {
        writer.write(nft)
        lastScrapeId(config, nft.id)
      }
    }
  }
}

/**
 * @param {Config} config
 */
async function spawn(config) {
  console.log(`Begin Scraping the Blockchain.`)
  /**
   * @type { TransformStream<ERC721ImportNFT> }
   */
  const inbox = new TransformStream(
    {},
    {
      highWaterMark: config.ingestHighWatermark,
    }
  )
  readIntoInbox(config, inbox.writable)
  writeFromInbox(config, inbox.readable)
}

export const main = async () => await spawn(await configure())

script({ ...import.meta, main })
