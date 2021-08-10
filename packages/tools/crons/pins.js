import path from 'path'
import pkg from 'faunadb'
import dotenv from 'dotenv'
import PQueue from 'p-queue'
import { fileURLToPath } from 'node:url'
import Pinata from '../utils/pinata.js'
import Cluster from '../utils/cluster.js'
import { toSingleStatus } from './utils.js'
import { faunaGQL } from '../utils/fauna.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
})
const { Client, Match, Index } = pkg
const fauna = new Client({ secret: process.env.FAUNA_TOKEN || '' })
const pinata = new Pinata(process.env.PINATA_TOKEN || '')
const faunaSDK = faunaGQL(process.env.FAUNA_TOKEN || '')
const cluster = new Cluster(process.env.CLUSTER_TOKEN || '')

/**
 * Update Unknown Pin
 *
 * @param {Object} opts
 * @param {any} opts.contentRef
 * @param {String} opts.pinId
 * @param {'IPFS_CLUSTER' | 'PINATA'} opts.service
 */
async function updateUnknownPin({ contentRef, pinId, service }) {
  const { findContentByID } = await faunaSDK.getContentbyID({
    id: contentRef.id,
  })

  if (!findContentByID) {
    throw new Error(`content ${contentRef.id} not found`)
  }

  const { cid } = findContentByID

  // Update IPFS
  if (service === 'IPFS_CLUSTER') {
    const status = await cluster.statusRaw(cid)
    await faunaSDK.updatePin({
      id: pinId,
      data: {
        updated: new Date().toISOString(),
        status: toSingleStatus(status),
        locations: status.map((s) => ({
          // TODO save multiaddr
          peerId: s.peerId,
          peerName: s.peerName,
        })),
      },
    })
  }

  // Update PINATA
  if (service === 'PINATA') {
    const pin = await pinata.addOrFind(cid)
    await faunaSDK.updatePin({
      id: pinId,
      data: {
        updated: new Date().toISOString(),
        status: pin.status,
        locations: pin.delegates.map((/** @type {string} */ s) => ({
          peerId: s,
        })),
      },
    })
  }
}

async function updateUnknownPins() {
  const queue = new PQueue({
    concurrency: 5,
    interval: 1000,
    intervalCap: 10,
  })
  let count = 0
  /**
   * @type {any[]}
   */
  const errors = []
  const helper = fauna.paginate(Match(Index('pin_by_status'), 'unknown'), {
    size: 1000,
  })
  queue.on('active', () => {
    console.log(`Queue: ${queue.size}. Count: ${count}`)
  })
  await helper.each((page) => {
    // @ts-ignore
    for (const [pinId, contentRef, service] of page) {
      count++

      const job = async () => {
        try {
          await updateUnknownPin({ pinId, contentRef, service })
        } catch (err) {
          if (err.response && err.response.body) {
            errors.push(err.response.body)
          } else {
            errors.push(err)
          }
        }
      }
      queue.add(() => job())
    }
  })
  await queue.onIdle()
  console.log(
    `Update done, ${count} pins processed with ${errors.length} errors`
  )
  console.log(errors.join('\n'))
}

updateUnknownPins()
