import fs from 'fs'
import { NFTStorage, Blob } from 'nft.storage'

const endpoint = 'https://api.nft.storage' // the default
const token = 'API_KEY' // your API key from https://nft.storage/manage

async function main() {
  const storage = new NFTStorage({ endpoint, token })
  const data = await fs.promises.readFile('storeBlob.js')
  const cid = await storage.storeBlob(new Blob([data]))
  console.log({ cid })
  const status = await storage.status(cid)
  console.log(status)
}
main()
