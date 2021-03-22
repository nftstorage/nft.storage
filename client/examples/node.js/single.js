import fs from 'fs'
import { NFTStorage, Blob } from 'nft.storage'

const endpoint = 'https://nft.storage' // the default
const token = 'API_KEY' // your API key from https://nft.storage/manage

async function main() {
  const store = new NFTStorage({ endpoint, token })
  const data = await fs.promises.readFile('single.js')
  const cid = await store.storeBlob(new Blob([data]))
  console.log({ cid })
  const status = await store.status(cid)
  console.log(status)
}
main()
