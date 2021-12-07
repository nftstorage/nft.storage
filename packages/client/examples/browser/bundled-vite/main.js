import { NFTStorage } from 'nft.storage'
import { packToBlob } from 'ipfs-car/pack/blob'

const endpoint = 'https://api.nft.storage' // the default
const token =
  new URLSearchParams(window.location.search).get('key') || 'API_KEY' // your API key from https://nft.storage/manage

function log(msg) {
  msg = JSON.stringify(msg, null, 2)
  document.getElementById('out').innerHTML += `${msg}\n`
}

async function main() {
  const store = new NFTStorage({ endpoint, token })
  const data = 'Hello nft.storage!'

  // locally chunk'n'hash the data to get the CID and pack the blocks in to a CAR
  const { root, car } = await packToBlob({
    input: [new TextEncoder().encode(data)],
  })
  const expectedCid = root.toString()
  console.log({ expectedCid })

  // send the CAR to nft.storage, the returned CID will match the one we created above.
  const cid = await store.storeCar(car)

  // verify the service is storing the CID we expect
  const cidsMatch = expectedCid === cid
  log({ data, cid, expectedCid, cidsMatch })

  // check that the CID is pinned
  const status = await store.status(cid)
  log(status)
}
main()
