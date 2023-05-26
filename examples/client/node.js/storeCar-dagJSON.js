import { NFTStorage } from 'nft.storage'
import { CarWriter } from '@ipld/car'
import * as dagJSON from '@ipld/dag-json'
import { sha256 } from 'multiformats/hashes/sha2'
import { encode } from 'multiformats/block'

const token = 'API_KEY' // your API key from https://nft.storage/manage

async function main() {
  const storage = new NFTStorage({ token })

  // Encode data to DAG
  const objToStore = { hello: 'world' }
  const block = await encode({ value: objToStore, codec: dagJSON, hasher: sha256 })

  // Encode DAG to CAR
  const { writer, out } = CarWriter.create([block.cid])
  writer.put(block)
  writer.close()

  const chunks = []
  for await (const chunk of out) {
    chunks.push(chunk)
  }
  const car = new Blob(chunks)

  // Store CAR with NFT.Storage
  await storage.storeCar(car, { decoders: [dagJSON] })
  console.log(block.cid.toString())
}
main()
