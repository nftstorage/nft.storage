import * as ERC721 from '../gen/erc721/index.js'
import * as Hasura from './hasura.js'

import { TransformStream } from './stream.js'
import { configure } from './config.js'
import { script } from 'subprogram'
import { setTimeout } from 'timers/promises'

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
 * @typedef { Object } Config
 * @property { ERC721.Config } config.erc721
 * @property { Hasura.Config } config.hasura
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
    first: state.scrapeBatchSize,
    where: { tokenURI_not: '', id_gt: await lastScrapeId(config) },
  }
  console.log(query)
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
 * @param { Config } config
 * @returns { Promise<String>}
 */
async function getLastScrapeIdFromHasura(config) {
  /**
   * @type {{
   *    limit: number
   *    order_by: Object[]
   * }}
   */
  const query = {
    limit: 1,
    order_by: [
      {
        inserted_at: 'desc',
      },
    ],
  }

  /**
   * required type annotation due to desin limitation in TS
   * https://github.com/microsoft/TypeScript/issues/19360
   * @type {{
   *    id: true | undefined
   *    updated_at: true | undefined
   * }}
   */
  const resultsDefinition = { id: true, updated_at: true }

  const lastNFT = await Hasura.query(config.hasura, {
    nft: [query, resultsDefinition],
  })

  let _lastNftId = lastNFT?.nft[0]?.id || '0'

  return _lastNftId
}

/**
 * @type {String}
 */
let _lastScrapeId = '0'
/**
 * @param {String=} id
 * @param {Config} config
 * @returns { Promise<String>}
 */
async function lastScrapeId(config, id) {
  if (typeof id === 'string') {
    _lastScrapeId = id
  }
  if (_lastScrapeId === '0') {
    _lastScrapeId = await getLastScrapeIdFromHasura(config)
  }
  return _lastScrapeId
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
  const query = await nextSubgraphQuery(config)
  const nftsResult = await ERC721.query(config.erc721, query)
  //something broke.
  //TODO add retry.
  if (nftsResult.ok === false) {
    console.error(nftsResult)
    return []
  }
  const { tokens } = nftsResult?.value || []
  const lastId = tokens.map((nft) => nft.id)[tokens.length - 1]
  if (lastId) {
    lastScrapeId(config, lastId)
  }
  return tokens.map(subgraphTokenToERC721ImportNFT)
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
 * Recursive function that either
 * 1. Writes a single record in the inbox buffer
 * 2. Has nothing to write, so it waits for the inbox to fill
 * 3. Encounters exception and returns false
 *
 * @param { Config } config
 * @returns {Promise<Boolean | Function>}
 */
async function drainInbox(config) {
  if (state.importInbox.length > 0) {
    state.draining = true
    const nextImport = state.importInbox[state.importInbox.length - 1]
    try {
      // this should literally never be undefined
      if (nextImport) {
        await writeScrapedRecord(config, nextImport)
        state.importInbox.pop()
      } else {
        console.error(
          `Attempted to get the next ERC721ImportNFT but instead got undefined`
        )
        return false
      }
    } catch (err) {
      console.log(err)
      return false
    }
  } else {
    state.draining = false
    await setTimeout(state.emptyDrainThrottle)
  }

  console.log(`Inbox at: ${state.importInbox.length}`)
  return drainInbox(config)
}

/**
 * Recursive function that either
 * 1. Scrapes the chain
 * 2. Is full and waits a bit to scrape
 * 3. Encounters an exception and returns false.
 * @param { Config } config
 * @returns {Promise<Boolean | Function>}
 */
async function scrapeBlockChain(config) {
  if (state.importInbox.length < state.maxInboxSize) {
    let scrape = []
    try {
      scrape = await fetchNextNFTBatch(config)
      state.importInbox = [...state.importInbox, ...scrape]
    } catch (err) {
      console.log(err)
      return false
    }
    console.log(`Inbox at ${state.importInbox.length}`)
    await setTimeout(10)
  } else {
    if (!state.draining) {
      console.log('Start Drain.')
      drainInbox(config)
    }
    // this is going to be a stream, but until then,
    // prevent running too quickly on failure or empty
    await setTimeout(state.emptyScrapeThrottle)
  }
  return scrapeBlockChain(config)
}

/**
 * @param { Config } config
 * @param { ReadableStream<ERC721ImportNFT>} readable
 */
async function scrapeFrom(config, readable) {
  console.log('start scraper here.')
}

async function writeFrom(config, writeable) {}

/**
 * @type { IngestorState }
 */
let state = {
  importInbox: [],
  lastScrapeId: '0',
  draining: false,
  maxInboxSize: 1000,

  //↓ move to config ↓
  scrapeBatchSize: 100,
  emptyDrainThrottle: 500,
  emptyScrapeThrottle: 500,
}

/**
 * @param {Config} config
 */
async function spawn(config) {
  console.log(`Begin Scraping the Blockchain.`)
  //scrapeBlockChain(config)

  const channel = new TransformStream(
    {},
    {
      highWater: state.maxInboxSize,
    }
  )

  scrapeFrom(config, channel.readable)
  writeFrom(config, channel.writeable)
}

export const main = async () => await spawn(await configure())

script({ ...import.meta, main })
