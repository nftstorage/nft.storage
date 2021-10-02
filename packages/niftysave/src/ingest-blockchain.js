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

//todo: make this a stream
let importInbox = []

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

const nextSubgraphQuery = () => {
  const query = {
    first: SCRAPE_BATCH_SIZE,
    where: { tokenURI_not: '', id_gt: lastScrapeId() },
  }
  return {
    tokens: [query, ERC721_RESULT_DEFINITON],
  }
}

//This needs to initialize with the current cursor
let _lastScrapeId = 0
const lastScrapeId = (id) => {
  if (id) {
    _lastScrapeId = id
  }

  //you're starting over from scratch
  if (lastScrapeId == 0 || id == 0) {
    //actually go get the last id from the database
    //TODO:_lastScrapeId = await (db, sort by time stamp extract id)
    //or its zero, the first time ever.
  }

  return _lastScrapeId
}

async function fetchNextNFTBatch() {
  const nftResults = await ERC721.query(ERC721_QUERYARGS, nextSubgraphQuery())
  //Ok { ok: true, value: { tokens: [ [Object] ] }, done: true }

  const lastId = nftResults.value.tokens.map((nft) => nft.id)[
    nftResults.value.tokens.length - 1
  ]
  //setId
  lastScrapeId(lastId)
  return nftResults
}

const exampleERC721Import = {
  blockHash:
    '0xb9251c163c0af58a7bddefcefc716f4793a9a3160f89894e99c33e2109022e05',
  blockNumber: '7958619',
  contract: {
    id: '0x0000000000001b84b1cb32787b0d64758d019317',
    name: 'HomeWork ��️',
    supportsEIP721Metadata: true,
    symbol: 'HWK',
  },
  id: '0x0000000000001b84b1cb32787b0d64758d019317_3259539015542658014133428223780909702996875844351442210272826656189482860544',
  mintTime: '1560540472',
  owner: { id: '0x2eb0cb70a97764d6e19bbfaf0d37ae099e48d43a' },
  tokenID:
    '3259539015542658014133428223780909702996875844351442210272826656189482860544',
  tokenURI:
    'data:application/json,{"name":"Home%20Address%20-%200x00000000003bc353606C3e5a622B57e7fd8f621E","description":"This%20NFT%20can%20be%20redeemed%20on%20HomeWork%20to%20grant%20a%20controller%20the%20exclusive%20right%20to%20deploy%20contracts%20with%20arbitrary%20bytecode%20to%20the%20designated%20home%20address.","image":"data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDQgNzIiPjxzdHlsZT48IVtDREFUQVsuQntzdHJva2UtbGluZWpvaW46cm91bmR9LkN7c3Ryb2tlLW1pdGVybGltaXQ6MTB9LkR7c3Ryb2tlLXdpZHRoOjJ9LkV7ZmlsbDojOWI5YjlhfS5Ge3N0cm9rZS1saW5lY2FwOnJvdW5kfV1dPjwvc3R5bGU+PGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4wMiAwIDAgMS4wMiA4LjEgMCkiPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik0xOSAzMmgzNHYyNEgxOXoiLz48ZyBzdHJva2U9IiMwMDAiIGNsYXNzPSJCIEMgRCI+PHBhdGggZmlsbD0iI2E1NzkzOSIgZD0iTTI1IDQwaDl2MTZoLTl6Ii8+PHBhdGggZmlsbD0iIzkyZDNmNSIgZD0iTTQwIDQwaDh2N2gtOHoiLz48cGF0aCBmaWxsPSIjZWE1YTQ3IiBkPSJNNTMgMzJIMTl2LTFsMTYtMTYgMTggMTZ6Ii8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTE5IDMyaDM0djI0SDE5eiIvPjxwYXRoIGZpbGw9IiNlYTVhNDciIGQ9Ik0yOSAyMWwtNSA1di05aDV6Ii8+PC9nPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCguODQgMCAwIC44NCA2NSA1KSI+PHBhdGggZD0iTTkuNSAyMi45bDQuOCA2LjRhMy4xMiAzLjEyIDAgMCAxLTMgMi4ybC00LjgtNi40Yy4zLTEuNCAxLjYtMi40IDMtMi4yeiIgZmlsbD0iI2QwY2ZjZSIvPjxwYXRoIGZpbGw9IiMwMTAxMDEiIGQ9Ik00MS43IDM4LjVsNS4xLTYuNSIvPjxwYXRoIGQ9Ik00Mi45IDI3LjhMMTguNCA1OC4xIDI0IDYybDIxLjgtMjcuMyAyLjMtMi44eiIgY2xhc3M9IkUiLz48cGF0aCBmaWxsPSIjMDEwMTAxIiBkPSJNNDMuNCAyOS4zbC00LjcgNS44Ii8+PHBhdGggZD0iTTQ2LjggMzJjMy4yIDIuNiA4LjcgMS4yIDEyLjEtMy4yczMuNi05LjkuMy0xMi41bC01LjEgNi41LTIuOC0uMS0uNy0yLjcgNS4xLTYuNWMtMy4yLTIuNi04LjctMS4yLTEyLjEgMy4ycy0zLjYgOS45LS4zIDEyLjUiIGNsYXNzPSJFIi8+PHBhdGggZmlsbD0iI2E1NzkzOSIgZD0iTTI3LjMgMjZsMTEuOCAxNS43IDMuNCAyLjQgOS4xIDE0LjQtMy4yIDIuMy0xIC43LTEwLjItMTMuNi0xLjMtMy45LTExLjgtMTUuN3oiLz48cGF0aCBkPSJNMTIgMTkuOWw1LjkgNy45IDEwLjItNy42LTMuNC00LjVzNi44LTUuMSAxMC43LTQuNWMwIDAtNi42LTMtMTMuMyAxLjFTMTIgMTkuOSAxMiAxOS45eiIgY2xhc3M9IkUiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiMwMDAiIGNsYXNzPSJCIEMgRCI+PHBhdGggZD0iTTUyIDU4LjlMNDAuOSA0My4ybC0zLjEtMi4zLTEwLjYtMTQuNy0yLjkgMi4yIDEwLjYgMTQuNyAxLjEgMy42IDExLjUgMTUuNXpNMTIuNSAxOS44bDUuOCA4IDEwLjMtNy40LTMuMy00LjZzNi45LTUgMTAuOC00LjNjMCAwLTYuNi0zLjEtMTMuMy45cy0xMC4zIDcuNC0xMC4zIDcuNHptLTIuNiAyLjlsNC43IDYuNWMtLjUgMS4zLTEuNyAyLjEtMyAyLjJsLTQuNy02LjVjLjMtMS40IDEuNi0yLjQgMy0yLjJ6Ii8+PHBhdGggZD0iTTQxLjMgMzguNWw1LjEtNi41bS0zLjUtMi43bC00LjYgNS44bTguMS0zLjFjMy4yIDIuNiA4LjcgMS4yIDEyLjEtMy4yczMuNi05LjkuMy0xMi41bC01LjEgNi41LTIuOC0uMS0uOC0yLjcgNS4xLTYuNWMtMy4yLTIuNi04LjctMS4yLTEyLjEgMy4yLTMuNCA0LjMtMy42IDkuOS0uMyAxMi41IiBjbGFzcz0iRiIvPjxwYXRoIGQ9Ik0zMC44IDQ0LjRMMTkgNTguOWw0IDMgMTAtMTIuNyIgY2xhc3M9IkYiLz48L2c+PC9nPjwvc3ZnPg=="}',
}

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

async function scrapeBlockChain() {
  if (importInbox.length < MAX_INBOX_SIZE) {
    let scrape = []
    try {
      scrape = await fetchNextNFTBatch()
      importInbox = [...importInbox, ...scrape.value.tokens]
      console.log(importInbox)
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
