import * as ERC721 from '../../gen/erc721/index.js'
import * as Hasura from './../hasura.js'

import {
  erc721ImportToNFTEndpoint,
  subgraphTokenToERC721ImportNFT,
} from './transforms.js'

/**
 * @typedef {import('./index').ERC721ImportNFT} ERC721ImportNFT
 * @typedef {import('./index').NFTSSubgraphResult} NFTSSubgraphResult
 */

/**
 * @typedef { Object } Config
 * @property { ERC721.Config } config.erc721
 * @property { Hasura.Config } config.hasura
 * @property { number } config.ingestBatchSize
 */

/**
 * WRITE
 * Persist a single NFT Record that was imported.
 * Drains the inbox.
 * @param { Config } config
 * @param { ERC721ImportNFT } erc721Import
 */
export async function writeScrapedRecord(config, erc721Import) {
  console.log(`📥 Write ${erc721Import.id} to Hasura`)
  return Hasura.mutation(config.hasura, {
    ingest_erc721_token: [
      {
        args: erc721ImportToNFTEndpoint(erc721Import),
      },
      {
        id: true,
      },
    ],
  })
}

/**
 * READ
 * Calls Subgraph and returns a batch of NFT records.
 * Hydrates the inbox.
 * @param { Config } config
 * @param { number } cursor
 * @returns { Promise<ERC721ImportNFT[]> }
 */
export async function fetchNextNFTBatch(config, cursor) {
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
 * @param {number} cursor
 * @returns { ERC721.schema.QueryRequest }
 */
const createSubgraphQuery = (config, cursor) => {
  const query = {
    first: config.ingestBatchSize,
    where: { tokenURI_not: '', mint_time: cursor },
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
