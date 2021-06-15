import fs from 'fs'
import { packToBlob } from 'ipfs-car/pack/blob'
import { NFTStorage } from '../../src/lib.js'

const endpoint = 'https://api.nft.storage' // the default
const token = 'API_KEY' // your API key from https://nft.storage/manage

async function main() {
  const storage = new NFTStorage({ endpoint, token })

  // locally chunk'n'hash the file to get the CID and pack the blocks in to a CAR
  const { root, car } = await packToBlob({
    input: fs.createReadStream('pinpie.jpg'),
  })

  const expectedCid = root.toString()
  console.log({ expectedCid })

  // send the CAR to nft.storage, setting isCar to true
  const cid = await storage.storeCar(car)

  // verify the service stored the CID we expected
  const cidsMatch = expectedCid === cid
  console.log({ cid, expectedCid, cidsMatch })

  // check that the CID is pinned
  const status = await storage.status(cid)
  console.log(status)
}
main()
