export type ERC721ImportNFTContract = {
  id: string
  name: string
  symbol: string
  supportsEIP721Metadata: Boolean
}

export type ERC721ImportNFTOwner = {
  id: String
}

export type ERC721ImportNFT = {
  id: string
  tokenID: string
  tokenURI: string
  mintTime: string
  blockNumber: Number
  blockHash: String
  contract: ERC721ImportNFTContract
  owner: ERC721ImportNFTOwner
}

export type NFTEndpointRecord = {
  block_hash: String
  block_number: Number
  contract_id: String
  contract_name: String
  contract_supports_eip721_metadata: Boolean
  contract_symbol: String
  id: String
  mint_time: Date
  owner_id: String
  token_id: String
  token_uri: String
}
