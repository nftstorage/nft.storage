import * as ERC721 from '../gen/erc721/index.js'
import * as Hasura from './hasura.js'

import { setTimeout } from 'timers/promises'

/* Note:
    this is still a timeb-xed "spike"
    not ready for review
    Will be refactored into existing config/typing patterns
*/

/* Abstract to the config */
const SCRAPE_BATCH_SIZE = 100
const MAX_INBOX_SIZE = 1000
const SUBGRAPH_URL = `https://api.thegraph.com/subgraphs/name/nftstorage/eip721-subgraph`

const HASURA_CONFIG = {
  url: new URL(`http://localhost:8080/v1/graphql`),
  headers: {
    'x-hasura-admin-secret': process.env['HASURA_KEY'] || 'foo',
  },
}

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

const ERC721_QUERYARGS = {
  url: new URL(SUBGRAPH_URL),
}

const ERC721_RESULT_DEFINITON = {
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

/**
 * @returns {any}
 */
const nextSubgraphQuery = () => {
  const query = {
    first: SCRAPE_BATCH_SIZE,
    where: { tokenURI_not: '', id_gt: lastScrapeId() },
  }
  return {
    tokens: [query, ERC721_RESULT_DEFINITON],
  }
}

/**
 * @type {Number}
 */
let _lastScrapeId = 0
/**
 * @param {Number=} id
 * @returns {Number}
 */

function lastScrapeId(id) {
  if (typeof id === 'number') {
    _lastScrapeId = id
  }
  if (_lastScrapeId === 0) {
    //actually go get the last id from the database
    //TODO:_lastScrapeId = await (db, sort by time stamp extract id)
    //or its zero, the first time ever.
  }
  return _lastScrapeId
}

/**
 * @type {ERC721ImportNFT[]}
 */
let importInbox = []

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
 * @returns NFTSubgraphResult
 */

async function fetchNextNFTBatch() {
  const nftsResult = await ERC721.query(ERC721_QUERYARGS, nextSubgraphQuery())

  //something broke.
  if (nftsResult.ok === false) {
    console.error(nftsResult)
    return []
  }

  const { tokens } = nftsResult?.value || []
  const lastId = tokens.map((nft) => nft.id)[tokens.length - 1]
  if (lastId) {
    lastScrapeId(parseInt(lastId))
  }

  return nftsResult
}

/**
 *
 * @param {ERC721ImportNFT} erc721Import
 * @returns
 */
async function writeScrapedRecord(erc721Import) {
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

  const nftRecord = {
    block_hash: blockHash,
    block_number: blockNumber,
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

  return Hasura.mutation(HASURA_CONFIG, {
    ingest_erc721_token: [
      {
        args: nftRecord,
      },
      {
        contract_id: true,
        id: true,
        mint_time: true,
        nft_owner_id: true,
        token_id: true,
        token_uri_hash: true,
      },
    ],
  })
}

/**
 *
 * @returns
 */
let _draining = false
async function drainInbox() {
  if (importInbox.length > 0) {
    _draining = true
    const nextImport = { ...importInbox[importInbox.length - 1] }
    try {
      await writeScrapedRecord(nextImport)
      importInbox.pop()
    } catch (err) {
      console.log(err)
      return false
    }
  } else {
    _draining = false
    await setTimeout(500)
  }

  console.log(`Inbox at: ${importInbox.length}`)
  return drainInbox()
}

/**
 *
 * @returns
 */
async function scrapeBlockChain() {
  if (importInbox.length < MAX_INBOX_SIZE) {
    let scrape = []
    try {
      scrape = await fetchNextNFTBatch()
      importInbox = [...importInbox, ...scrape.value.tokens]
    } catch (err) {
      console.log(err)
      return false
    }
    console.log(`Inbox at ${importInbox.length}`)
    await setTimeout(10)
  } else {
    if (!_draining) {
      console.log('Start Drain.')
      drainInbox()
    }
    //this is going to be a stream, but until then
    await setTimeout(500)
  }
  return scrapeBlockChain()
}

//will be spawn
scrapeBlockChain()
