import * as ERC721 from '../gen/erc721/index.js'
import * as Hasura from './hasura.js'

// import { TransformStream } from './stream.js'
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
 * @param { IngestorState } state
 * @returns {any}
 */
const nextSubgraphQuery = (state) => {
  const query = {
    first: state.scrapeBatchSize,
    where: { tokenURI_not: '', id_gt: lastScrapeId() },
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
 * @type {String}
 */
let _lastScrapeId = '0'
/**
 * @param {String=} id
 * @returns { Promise<String>}
 */
async function lastScrapeId(id) {
  if (typeof id === 'string') {
    _lastScrapeId = id
  }
  if (_lastScrapeId === '0') {
    //actually go get the last id from the database
    //TODO:_lastScrapeId = await (db, sort by time stamp extract id)
    //or its zero, the first time ever.
  }
  return _lastScrapeId
}

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
 * @param { IngestorState } state
 * @returns { Promise<ERC721ImportNFT[]> }
 */
async function fetchNextNFTBatch(config, state) {
  const nftsResult = await ERC721.query(config.erc721, nextSubgraphQuery(state))
  //something broke.
  if (nftsResult.ok === false) {
    console.error(nftsResult)
    return []
  }
  const { tokens } = nftsResult?.value || []
  const lastId = tokens.map((nft) => nft.id)[tokens.length - 1]
  if (lastId) {
    //this is where we keep track lat Id if successful.
    lastScrapeId(lastId)
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
 * A private flag that keeps track of whether the
 * drainInbox function is actively writing records
 * and depleting the inbox
 * @type {Boolean}
 */
let _draining = false
/**
 * Recursive function that either
 * 1. Writes a single record in the inbox buffer
 * 2. Has nothing to write, so it waits for the inbox to fill
 * 3. Encounters exception and returns false
 *
 * @param { Config } config
 * @param { IngestorState } state
 * @returns {Promise<Boolean | Function>}
 */
async function drainInbox(config, state) {
  if (state.importInbox.length > 0) {
    _draining = true
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
    _draining = false
    await setTimeout(state.emptyDrainThrottle)
  }

  console.log(`Inbox at: ${state.importInbox.length}`)
  return drainInbox(config, state)
}

/**
 * Recursive function that either
 * 1. Scrapes the chain
 * 2. Is full and waits a bit to scrape
 * 3. Encounters an exception and returns false.
 * @param { Config } config
 * @param { IngestorState } state
 * @returns {Promise<Boolean | Function>}
 */
async function scrapeBlockChain(config, state) {
  if (state.importInbox.length < state.maxInboxSize) {
    let scrape = []
    try {
      scrape = await fetchNextNFTBatch(config, state)
      state.importInbox = [...state.importInbox, ...scrape]
    } catch (err) {
      console.log(err)
      return false
    }
    console.log(`Inbox at ${state.importInbox.length}`)
    await setTimeout(10)
  } else {
    if (!_draining) {
      console.log('Start Drain.')
      drainInbox(config, state)
    }
    // this is going to be a stream, but until then,
    // prevent running too quickly on failure or empty
    await setTimeout(state.emptyScrapeThrottle)
  }
  return scrapeBlockChain(config, state)
}

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
 * @param {Config} config
 */

async function spawn(config) {
  console.log(config)
  console.log(`Begin Scraping the Blockchain.`)

  //init state.
  let state = {
    importInbox: [],
    lastScrapeId: '0',
    draining: false,
    maxInboxSize: 1000,
    scrapeBatchSize: 10,
    emptyDrainThrottle: 500,
    emptyScrapeThrottle: 500,
  }

  scrapeBlockChain(config, state)
}

export const main = async () => await spawn(await configure())

script({ ...import.meta, main })
