import {
  fetchNFTs as fetchTheGraphNFTs,
  tranformIn as transformTheGraphNFTToFetchedRecord,
} from './subgraph'

import { fetchNFTs as fetchNFTPortNFts } from './nftport'

export const dataSources = [
  {
    id: 'the-graph',
    fetch: fetchTheGraphNFTs,
    tranformIn: transformTheGraphNFTToFetchedRecord,
  },
  {
    id: 'nftport-eth',
    fetch: () => fetchNFTPortNFts,
    tranformIn: (x) => x,
  },
]

export const getDataSourceStrategy = (id) => {
  return dataSources.reduce((acc, source) => {
    if (acc == null) {
      return source.id === id ? source : null
    } else {
      return acc
    }
  }, null)
}
