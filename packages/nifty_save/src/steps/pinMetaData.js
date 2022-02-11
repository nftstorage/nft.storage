import { putOnProcessorBus } from './utils'
import { NFTStorage, Blob } from 'nft.storage'

const endpoint = 'https://api.nft.storage' // the default
const token = process.env.NFTSTORAGE_KEY // your API key from https://nft.storage/manage

async function doPinMetaData(data) {
  const storage = new NFTStorage({ endpoint, token })
  const metadata = data.token_uri_metadata
  const cid = await storage.storeBlob(new Blob([metadata]))
  console.log({ cid })
  const status = await storage.status(cid)
  console.log(status)

  return { cid, status }
}

export async function pinMetaData(event) {
  const data = event.detail

  try {
    const { cid, status } = await doPinMetaData(data)
    const _data = { ...data, token_uri_metadata_cid: cid }
    putOnProcessorBus('pinMetaData', _data)
  } catch (error) {
    putOnProcessorBus('failure', { ...data, error })
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: pinMetaData' + data,
    }),
  }
}
