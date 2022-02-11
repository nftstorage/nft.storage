import { putOnProcessorBus } from './utils'
import { NFTStorage, Blob } from 'nft.storage'

const endpoint = 'https://api.nft.storage' // the default
const token = process.env.NFT_STORAGE_KEY // your API key from https://nft.storage/manage

/**
 * Actually store metadata on NFT.Storage, and return the cid.
 * @async
 * @param {object} metadata - The metadata to store.
 * @returns {Promise<object>} The cid and status.
 */
async function doPinMetaData(metadata) {
  const blob = new Blob([JSON.stringify(metadata)])
  const storage = new NFTStorage({ endpoint, token })
  const cid = await storage.storeBlob(blob)
  const status = await storage.status(cid)
  return { cid, status }
}

export async function pinMetaData(event) {
  const data = event.detail

  try {
    const { cid, status } = await doPinMetaData(data?.token_uri_metadata)
    const _data = { ...data, token_uri_metadata_cid: cid }
    putOnProcessorBus('pinMetaData', _data)
  } catch (error) {
    console.log('error', error)
    putOnProcessorBus('failure', { ...data, error })
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'step: pinMetaData ' + error,
      }),
    }
  }

  return {
    statusCode: 200,
    message: 'step: pinMetaData',
  }
}
