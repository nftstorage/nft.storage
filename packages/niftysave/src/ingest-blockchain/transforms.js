import * as ERC721 from '../../gen/erc721/index.js'

import { ERC721ImportNFT, NFTEndpointRecord } from './types.d'

/**
 * This converts the Ttype returned from the ERC721 (token) to
 * the type stored in the TransformStream (ERC721ImportNFT)
 * @param { ERC721.schema.Token } token
 * @returns { ERC721ImportNFT }
 */
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

/**
 * Converts a scraped NFT record into the expected shape
 * The Hasura Endpoint expects (which is flattened)
 * @param { ERC721ImportNFT} erc721Import
 * @returns { NFTEndpointRecord }
 */
export function erc721ImportToNFTEndpoint(erc721Import) {
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

  return nft
}
