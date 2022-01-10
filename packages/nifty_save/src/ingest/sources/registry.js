import { fetchNFTs as fetchNFTPortNFts } from './nftport'
import { fetchNFTs as fetchTheGraphNFTs } from './subgraph'
export const registry = {
  'the-graph': fetchTheGraphNFTs,
  nftport: fetchNFTPortNFts,
}
