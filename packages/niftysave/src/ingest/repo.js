import * as Cursor from './../hasura/cursor.js'
import * as ERC721 from '../../gen/erc721/index.js'
import * as Hasura from './../hasura.js'

import {
  erc721ImportToNFTEndpoint,
  subgraphTokenToERC721ImportNFT,
} from './transforms.js'

/**
 * @typedef {import('./index').ERC721ImportNFT} ERC721ImportNFT
 * @typedef {import('./index').NFTSSubgraphResult} NFTSSubgraphResult
 * @typedef {import('./index').NFTEndpointRecord } NFTEndpointRecord
 */

/**
 * @typedef { Object } Config
 * @property { ERC721.Config } config.erc721
 * @property { Hasura.Config } config.hasura
 * @property { number } config.ingestScraperBatchSize
 */

/**
 * WRITE
 * Persist a single NFT Record that was imported.
 * Drains the inbox.
 * @param { Config } config
 * @param { ERC721ImportNFT[] } erc721Imports
 */
export async function writeScrapedRecords(config, erc721Imports) {
  const records = erc721Imports.map(erc721ImportToNFTEndpoint)
  const startTime = Date.now()
  printBatch(records)
  const batchMutation = Object.fromEntries(
    records.map(recordToMutation).entries()
  )
  const done = await Hasura.mutation(config.hasura, {
    __alias: batchMutation,
  })

  printTiming(startTime, records.length)
  return done
}

/**
 *
 * @param {number} startTime
 * @param {number} recordsAmount
 */
function printTiming(startTime, recordsAmount) {
  const stopTime = Date.now()
  const elapsed = stopTime - startTime
  const perRecord = (elapsed / recordsAmount).toFixed(6)
  console.log(
    `📝Completed...\n🧮 ${recordsAmount} records\t⏲️ over ${elapsed}ms\t averaging 🐇 ${perRecord}ms per record`
  )
}

/**
 * @param {NFTEndpointRecord[]} records
 */
function printBatch(records) {
  console.log(
    `✍️ Writing ${
      records.length
    } records... \n⎾ 🌿 ${records[0]?.mint_time.toUTCString()}\t🏷️ ${
      records[0]?.id
    }\n⎿ 🌿 ${records[records.length - 1]?.mint_time.toUTCString()}\t🏷️ ${
      records[records.length - 1]?.id
    }`
  )
}

/**
 * @param {NFTEndpointRecord} record
 * @returns {Hasura.Mutation}
 */
function recordToMutation(record) {
  return {
    ingest_erc721_token: [
      {
        args: record,
      },
      {
        id: true,
      },
    ],
  }
}

/**
 * READ
 * Calls Subgraph and returns a batch of NFT records.
 * Hydrates the inbox.
 * @param { Config } config
 * @param { Cursor.Cursor<number> } cursor
 * @returns { Promise<ERC721ImportNFT[]> }
 */
export async function fetchNFTBatch(config, cursor) {
  try {
    const nftsResult = await ERC721.query(
      config.erc721,
      createSubgraphQuery(config, cursor)
    )
    if (nftsResult.ok === false) {
      console.error(nftsResult)
      throw new Error(JSON.stringify(nftsResult))
    }
    const { tokens } = nftsResult?.value || []
    console.log(`📤 Scraped ${tokens.length} nfts from Subgraph.`)
    return tokens.map(subgraphTokenToERC721ImportNFT)
  } catch (err) {
    console.error(`🚨 Something unexpected happened scraping nfts`, err)
    throw err
  }
}

/**
 * Returns a query for the subgraph that provisions the correct batch size
 * and starts at the correct NFT Id (the cursor).
 * If this is the first query, starting this module for the first time, the cursor
 * will be the id of whatever record was written last in our database.
 * @param {Config} config
 * @param {Cursor.Cursor<number>} cursor
 * @returns { ERC721.schema.QueryRequest }
 */
const createSubgraphQuery = (config, cursor) => {
  const query = {
    first: config.ingestScraperBatchSize,
    skip: cursor.offset,
    where: { mintTime_gte: cursor.time.toString() },
    orderBy: ERC721.schema.Token_orderBy.mintTime,
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
