import fs from 'fs'
import { NFTStorage, Blob } from 'nft.storage'

const endpoint = 'https://api.nft.storage' // the default
const token = 'API_KEY' // your API key from https://nft.storage/manage

async function main() {
  const storage = new NFTStorage({ endpoint, token })
  let data = ""
  const readStream = fs.createReadStream('pinpie.jpg')
  // on data will receive data from the stream and concatenate it to the variable data
  readStream.on('data', (chunk) => {
    data += chunk
  })
  // on end will finish the stream
  readStream.on('end', async () => {
    const cid = await storage.storeBlob(new Blob([data]))
    console.log({ cid })
    const status = await storage.status(cid)
    console.log(status)
  })
}
main()
