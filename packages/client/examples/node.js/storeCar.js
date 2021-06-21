import fs from 'fs'
import { pack } from 'ipfs-car/pack'
import { CarIndexedReader } from '@ipld/car'
import { NFTStorage } from '../../src/lib.js'

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

  // Create the car reader
  const carReader = await CarIndexedReader.fromIterable(out)

  // send the CAR to nft.storage, the returned CID will match the one we created above.
  const cid = await storage.storeCar(carReader)

  // verify the service stored the CID we expected
  const cidsMatch = expectedCid === cid
  console.log({ cid, expectedCid, cidsMatch })

  // check that the CID is pinned
  const status = await storage.status(cid)
  console.log(status)
}
main()
