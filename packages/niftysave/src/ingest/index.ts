export type ERC721ImportNFTContract = {
  id: string
  name: string
  symbol: string
  supportsEIP721Metadata: boolean
}

export type ERC721ImportNFTOwner = {
  id: string
}

export type ERC721ImportNFT = {
  id: string
  tokenID: string
  tokenURI: string
  mintTime: string
  blockNumber: number
  blockHash: string
  contract: ERC721ImportNFTContract
  owner: ERC721ImportNFTOwner
}

export type NFTEndpointRecord = {
  block_hash: string
  block_number: number
  contract_id: string
  contract_name: string
  contract_supports_eip721_metadata: boolean
  contract_symbol: string
  id: string
  mint_time: Date
  owner_id: string
  token_id: string
  token_uri: string
}
