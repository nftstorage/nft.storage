import * as ERC721 from '../gen/erc721/index.js'

/* Note:
    this is still a timeb-xed "spike"
    not ready for review
    Will be refactored into existing config/typing patterns
*/

/* Abstract to the config */
const SCRAPE_BATCH_SIZE = 100
const MAX_INBOX_SIZE = 1000
const SUBGRAPH_URL = `https://api.thegraph.com/subgraphs/name/nftstorage/eip721-subgraph`
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

const nextQuery = () => {
  const query = {
    first: SCRAPE_BATCH_SIZE,
    where: { tokenURI_not: '', id_gt: 0 },
  }
  return {
    tokens: [query, ERC721_RESULT_DEFINITON],
  }
}

//for now
let importInbox = []

let lastScrapeCursor = () => {
  return 1
}

async function writeImportRecord() {}

async function fetchNextNFTBatch() {
  const nftResults = await ERC721.query(ERC721_QUERYARGS, nextQuery())
  //Ok { ok: true, value: { tokens: [ [Object] ] }, done: true }
  console.log(nftResults.value)
}

function scrapeBlockChain() {
  fetchNextNFTBatch()
}

//will be spawn
scrapeBlockChain()
