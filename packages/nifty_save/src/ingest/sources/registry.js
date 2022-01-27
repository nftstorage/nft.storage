import { fetchNFTs as fetchNFTPortNFts } from './nftport'
import { fetchNFTs as fetchTheGraphNFTs } from './subgraph'

//TODO: convert to 'strategy reducer'.
export const registry = {
  'the-graph': fetchTheGraphNFTs,
  nftport: fetchNFTPortNFts,
}
