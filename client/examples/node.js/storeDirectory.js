import fs from 'fs'
import { NFTStorage, File } from 'nft.storage'

const endpoint = 'https://api.nft.storage' // the default
const token = 'API_KEY' // your API key from https://nft.storage/manage

async function main() {
  const storage = new NFTStorage({ endpoint, token })
  const cid = await storage.storeDirectory([
    new File(
      [await fs.promises.readFile('storeDirectory.js')],
      'storeDirectory.js'
    ),
    new File([await fs.promises.readFile('package.json')], 'package.json'),
  ])
  console.log({ cid })
  const status = await storage.status(cid)
  console.log(status)
}
main()
