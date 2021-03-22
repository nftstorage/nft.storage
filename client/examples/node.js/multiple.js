import fs from 'fs'
import { NFTStorage, File } from 'nft.storage'

const endpoint = 'https://nft.storage' // the default
const token = 'API_KEY' // your API key from https://nft.storage/manage

async function main() {
  const store = new NFTStorage({ endpoint, token })
  const cid = await store.storeDirectory([
    new File([await fs.promises.readFile('multiple.js')], 'multiple.js'),
    new File([await fs.promises.readFile('package.json')], 'package.json')
  ])
  console.log({ cid })
  const status = await store.status(cid)
  console.log(status)
}
main()
