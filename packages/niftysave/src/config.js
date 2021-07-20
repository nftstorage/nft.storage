import dotenv from 'dotenv'
import DB from '../gen/db/index.js'
import ERC721 from '../gen/erc721/index.js'

/**
 * @typedef {ReturnType<DB>} DBConfig
 * @typedef {ReturnType<ERC721>} ERC721Config
 * @typedef {Object} Config
 * @property {number} budget
 * @property {number} batchSize
 * @property {number} fetchTimeout
 * @property {import('./cluster').Config} cluster
 * @property {import('./ipfs').Config} ipfs
 * @property {DBConfig} db
 * @property {ERC721Config} erc721
 *
 * @returns {Config}
 */
export const configure = () => {
  dotenv.config()

  return {
    batchSize: Number(process.env['BATCH_SIZE'] || 50),
    budget: Number(process.env['TIME_BUDGET'] || 30) * 1000,
    fetchTimeout: Number(process.env['FETCH_TIMEOUT'] || 30 * 100),

    cluster: {
      url: new URL('https://nft2.storage.ipfscluster.io/api/'),
      secret: process.env['NIFTYSAVE_CLUSTER_KEY'] || '',
    },

    ipfs: {
      url: new URL('https://nft2.storage.ipfscluster.io/api/v0/'),
      secret: process.env['NIFTYSAVE_IPFS_API_KEY'] || '',
    },

    db: DB({
      url: new URL('https://graphql.fauna.com/graphql'),
      authorization: `Bearer ${process.env['FAUNA_KEY']}`,
    }),

    erc721: ERC721({
      url: new URL(
        'https://api.thegraph.com/subgraphs/name/nftstorage/eip721-subgraph'
      ),
    }),
  }
}
