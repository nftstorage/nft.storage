import fs from 'fs'
import { pack } from 'ipfs-car/pack'
import { NFTStorage } from '../../src/lib.js'
import { Blob } from '../../src/platform.js'

const endpoint = 'https://api.nft.storage' // the default
const token = 'API_KEY' // your API key from https://nft.storage/manage

async function main() {
  const storage = new NFTStorage({ endpoint, token })

  // locally chunk'n'hash the file to get the CID and pack the blocks in to a CAR
  const { root, out } = await pack({
    input: fs.createReadStream('pinpie.jpg'),
  })

  const expectedCid = root.toString()
  console.log({ expectedCid })

  const carParts = []
  for await (const part of out) {
    carParts.push(part)
  }
  const car = new Blob(carParts, { type: 'application/car' })

  // send the CAR to nft.storage, setting isCar to true
  const isCar = true
  const cid = await storage.storeBlob(car, isCar)

  // verify the service stored the CID we expected
  const cidsMatch = expectedCid === cid
  console.log({ cid, expectedCid, cidsMatch })

  // check that the CID is pinned
  const status = await storage.status(cid)
  console.log(status)
}
main()
