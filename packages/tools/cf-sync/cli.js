const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '.env.local'),
})
const Listr = require('listr')
const Store = require('./store')
const Cluster = require('./cluster')
const { paginate } = require('./cf')
const { syncNFTsData, syncCheck, validateLocal } = require('./utils')

const tasks = new Listr(
  [
    {
      title: 'Sync KV metadata',
      task: async (/** @type {Context} */ ctx, task) => {
        let count = 0
        let missing = 0
        const metadata = paginate(ctx.kvNFT)

        for await (const item of metadata) {
          if (!(await store.has(item.name))) {
            await store.put(item.name, item)
            missing++
          }
          count++
          task.output = `Total: ${count} New: ${missing}`
        }

        task.title += ` -> Total: ${count} New: ${missing}`
      },
    },
    {
      title: 'Sync KV data',
      task: syncNFTsData,
    },
    {
      title: 'Sync deals and pin',
      task: syncCheck,
    },
    {
      title: 'Validate local data',
      task: validateLocal,
    },
  ],
  {
    renderer: 'default',
  }
)

const store = new Store(path.join(__dirname, 'nft-meta'))
const cluster = new Cluster()

tasks
  .run({
    nftStorageToken: process.env.NFT_STORAGE_TOKEN,
    kvNFT: '9610798d5e5845fa94e4392cc1288ddf',
    store,
    cluster,
  })
  .then(() => {
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
  })

/**
 * @typedef {Object} Context
 * @prop {string} kvNFT
 * @prop {Store} store
 * @prop {Cluster} cluster
 * @prop {string} [nftStorageToken]
 *
 */
