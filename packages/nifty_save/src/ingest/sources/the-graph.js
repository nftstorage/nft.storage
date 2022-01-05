/**
 * @param {Config} config
 * @param {Cursor.Cursor<number>} cursor
 */
const createSubgraphQuery = (config, cursor) => {
  const query = {
    first: config.ingestScraperBatchSize,
    skip: cursor.offset,
    where: { mintTime_gte: cursor.time.toString() },
    orderBy: 'mintTime',
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
 * READ
 * Calls Subgraph and returns a batch of NFT records.
 * Hydrates the inbox.
 * @param { Config } config
 * @param { Cursor.Cursor<number> } cursor
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
