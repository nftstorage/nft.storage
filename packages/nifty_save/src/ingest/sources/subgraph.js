import { Cursor } from '../../cursor'
import { CustomResourceProviderRuntime } from '@aws-cdk/core'
import fetch from 'node-fetch'
import { sleep } from '../../timers'

//https://thegraph.com/hosted-service/subgraph/nftstorage/eip721-subgraph

const INGEST_BATCH_SIZE = 1000
const SUBGRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/nftstorage/eip721-subgraph'

function makeTheGraphQuery(time, offset) {
  return `
{
  tokens(
    first: ${INGEST_BATCH_SIZE}
    skip: ${offset}
    orderBy: mintTime
    where: { mintTime_gt: ${time} })
  {
    id
    tokenID
    contract {
        id
    }
    tokenID
    owner {
        id
    }
  }
}
`
}

export async function fetchNFTs(event, context) {
  const { detail } = event

  const cursor = new Cursor(detail.rangeStartTime / 1000)

  const results = await fetch(SUBGRAPH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: makeTheGraphQuery(cursor.time, cursor.offset),
      variables: null,
    }),
  })

  let nftBatch = await results.json()

  for (const nft of nftBatch) {
    cursor.advanceOffset(nft.mintTime)
  }

  console.log(nftBatch)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `📤 Scraped ${nftBatch.length} nfts from Subgraph.`,
    }),
  }
}

/* Maps from the graph to our DB */
export function subgraphTokenToERC721ImportNFT(token) {
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
