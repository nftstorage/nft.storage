import { MemoryDatastore } from 'datastore-core/memory'
import { BlockstoreDatastoreAdapter } from 'blockstore-datastore-adapter'
import { createRepo } from 'ipfs-repo'
import { MemoryLock } from 'ipfs-repo/locks/memory'
import { Multicodecs } from 'ipfs-core-utils/multicodecs'
import * as pb from '@ipld/dag-pb'
import * as cbor from '@ipld/dag-cbor'
import * as json from '@ipld/dag-json'
import * as raw from 'multiformats/codecs/raw'

export async function createMemRepo() {
  const path = `ipfs${Date.now()}`

  const backend = {
    datastore: new MemoryDatastore(),
    blocks: new BlockstoreDatastoreAdapter(new MemoryDatastore()),
    pins: new MemoryDatastore(),
    keys: new MemoryDatastore(),
    root: new MemoryDatastore(),
  }

  const codecs = new Multicodecs({
    codecs: [pb, cbor, json, raw],
    loadCodec: () => Promise.reject(new Error('No extra codecs configured')),
  })

  return createRepo(
    path,
    (codeOrName) => codecs.getCodec(codeOrName),
    backend,
    {
      repoLock: MemoryLock,
    }
  )
}
