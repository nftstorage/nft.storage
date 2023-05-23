import fs from 'fs'
import { NFTStorage, File } from 'nft.storage'

const token = 'API_KEY' // your API key from https://nft.storage/manage

async function main() {
  const storage = new NFTStorage({ token })

  const { cid, car } = await NFTStorage.encodeDirectory([
    new File([await fs.promises.readFile('pinpie.jpg')], 'pinpie.jpg'),
    new File([await fs.promises.readFile('seamonster.jpg')], 'seamonster.jpg'),
  ])
  console.log(`Directory CID: ${cid}`)

  console.log('Sending file...')
  await storage.storeCar(car, {
    onStoredChunk: (size) => console.log(`Stored a chunk of ${size} bytes`),
  })

  console.log('✅ Done')
}
main()
