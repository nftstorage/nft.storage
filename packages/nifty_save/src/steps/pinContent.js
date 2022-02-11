import { putOnProcessorBus } from './utils'
import { NFTStorage, Blob } from 'nft.storage'
import fetch from 'node-fetch'
const endpoint = 'https://api.nft.storage' // the default
const token = process.env.NFT_STORAGE_KEY // your API key from https://nft.storage/manage

/**
 * Actually store content on NFT.Storage, and return the cid.
 * @async
 * @param {object} content - The content to store.
 * @returns {Promise<object>} The cid and status.
 */
async function doPinContent(content) {
  const storage = new NFTStorage({ endpoint, token })
  const cid = await storage.storeBlob(await content.blob())
  const status = await storage.status(cid)
  return { cid, status }
}

export async function pinContent(event) {
  const data = event.detail

  try {
    console.log(data?.content_uri)
    if (
      data?.content_uri_format === 'HTTPS' ||
      data?.content_uri_format === 'http'
    ) {
      const response = await fetch(data?.content_uri, { method: 'GET' })
      const { cid } = await doPinContent(response)
      const _data = { ...data, content_uri_cid: cid }
      putOnProcessorBus('pinContent', _data)
    } else {
      // HALT FROR NOW
      //putOnProcessorBus('pinContent', data)
    }
  } catch (error) {
    console.log('error', error)
    putOnProcessorBus('failure', { ...data, error })
    return {
      statusCode: 500,
      message: 'step: pinContent ' + error,
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: pinContent' + data,
    }),
  }
}
