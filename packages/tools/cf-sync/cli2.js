import path from 'path'
import Store from './store.js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'
import Listr from 'listr'
import Cluster from '../utils/cluster.js'
import Cloudflare from '../utils/cloudflare.js'
import { DBClient } from '../../api/src/utils/db-client.js'
import { syncUsers, syncUsersData } from './users.js'
import { syncNFTs, syncNFTData, syncCheck } from './nft.js'
import { validateLocal, checkStatus } from './validation.js'
import { pushToDB } from './push-to-db.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
})

const tasks = new Listr(
  [
    // {
    //   title: 'Sync users',
    //   task: syncUsers,
    // },
    // {
    //   title: 'Sync users data',
    //   task: syncUsersData,
    // },
    // {
    //   title: 'Sync nfts',
    //   task: syncNFTs,
    // },
    // {
    //   title: 'Sync nfts data',
    //   task: () => {
    //     return new Listr(
    //       [
    //         {
    //           title: 'Sync nfts info',
    //           task: syncNFTData,
    //         },
    //         {
    //           title: 'Sync nfts status and deals',
    //           task: syncCheck,
    //         },
    //       ],
    //       { concurrent: true }
    //     )
    //   },
    // },
    // {
    //   title: 'Validate nft data',
    //   task: checkStatus,
    // },
    // {
    //   title: 'Test',
    //   task: async (/** @type {Context} */ ctx, task) => {
    //     for await (const { key, value } of ctx.nftStore.iterator()) {
    //       const { size, checked, pinStatus, data } = value
    //       if (data && data.type === 'remote' && data.pin && data.pin.meta) {
    //         console.log(data, key)
    //       }
    //     }
    //   },
    // },
    {
      title: 'Push to DB',
      task: pushToDB,
    },
  ],
  { renderer: 'verbose' }
)

const userStore = new Store(path.join(__dirname, '../../../.local/users'))
const nftStore = new Store(path.join(__dirname, '../../../.local/nft-meta'))
const cluster = new Cluster(process.env.CLUSTER_TOKEN || '')
const cf = new Cloudflare({ token: process.env.CF_TOKEN })
const db = new DBClient(
  process.env.DATABASE_URL || '',
  process.env.DATABASE_TOKEN || ''
)

/** @type {Context} */
const ctx = {
  nftStorageToken: process.env.NFT_STORAGE_TOKEN,
  kvNFT: '9610798d5e5845fa94e4392cc1288ddf',
  kvUser: '8a5a55b5d1af49ed8fcfab16e9fa8c41',
  cfAccount: process.env.CF_ACCOUNT_ID || '',
  userStore,
  nftStore,
  cluster,
  cf,
  db,
}
tasks
  .run(ctx)
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
  })

/**
 * @typedef {Object} Context
 * @prop {string} kvNFT
 * @prop {string} kvUser
 * @prop {Store} userStore
 * @prop {Store} nftStore
 * @prop {Cluster} cluster
 * @prop {Cloudflare} cf
 * @prop {string} cfAccount
 * @prop {DBClient} db
 * @prop {string} [nftStorageToken]
 *
 */
