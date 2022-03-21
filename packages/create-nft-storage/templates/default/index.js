import fs from 'fs'
import { NFTStorage, Blob } from 'nft.storage'

const endpoint = 'https://api.nft.storage' // the default
const token = 'API_KEY' // your API key from https://nft.storage/manage

async function main() {
  const storage = new NFTStorage({ endpoint: new URL(endpoint), token })
  const data = await fs.promises.readFile('pinpie.jpg')
  const { cid, car } = await NFTStorage.encodeBlob(new Blob([data]))
  console.log(`File CID: ${cid}`)

  if (token === 'API_KEY') {
    throw new Error('Get a real API Key from https://nft.storage/manage')
  }

  console.log('Sending file...')
  await storage.storeCar(car, {
    onStoredChunk: (size) => console.log(`Stored a chunk of ${size} bytes`),
  })

  console.log('✅ Done')
}
main()
