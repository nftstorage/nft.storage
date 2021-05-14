import pb from 'ipld-dag-pb'
import multicodec from 'multicodec'
import Multihash from 'multihashing-async'
import IPLD from 'ipld'
// @ts-ignore
import InMemory from 'ipld-in-memory'
import importer from 'ipfs-unixfs-importer'

const DagPB = pb.util

/** @type {(T:typeof IPLD) => IPLD} */
const inMemory = InMemory
const { multihash } = Multihash

/**
 * @typedef {import('ipfs-unixfs-importer').BlockAPI} BlockAPI
 * @implements {BlockAPI}
 */
class Block {
  /**
   * @param {Object} [options]
   * @param {IPLD} [options.ipld]
   * @param {typeof multihash} [options.mh]
   */
  constructor({ ipld = inMemory(IPLD), mh = multihash } = {}) {
    this.ipld = ipld
    this.mh = mh
  }
  /**
   * @param {Uint8Array} bytes
   * @param {{cid:import('ipfs-unixfs-importer').CID}} options
   */
  async put(bytes, { cid }) {
    const multihash = this.mh.decode(cid.multihash)
    const node = DagPB.deserialize(bytes)

    await this.ipld.put(node, multicodec.DAG_PB, {
      cidVersion: cid.version,
      hashAlg: multihash.code,
    })

    return { cid, data: bytes }
  }
  /**
   * @param {import('ipfs-unixfs-importer').CID} cid
   * @param {any} options
   */
  async get(cid, options) {
    const node = await this.ipld.get(cid, options)

    if (node instanceof Uint8Array) {
      return { cid, data: node }
    } else {
      return { cid, data: DagPB.serialize(node) }
    }
  }
}

/**
 * @param {Uint8Array|string} content
 */
export const importBlob = async (content) => {
  const results = importer([{ content }], new Block(), { onlyHash: true })
  for await (const result of results) {
    return result
  }
  throw new Error(`Import failed`)
}

/**
 * @param {File[]} files
 */
export const importDirectory = async (files) => {
  const entries = files.map((file) => ({
    // @ts-expect-error - webkitRelativePath is not known
    path: file.webkitRelativePath || file.name,
    // @ts-expect-error - file.stream() isn't typed as AsyncIterable.
    content: /** @type {AsyncIterable<Uint8Array>} */ (file.stream()),
  }))

  const results = importer(entries, new Block(), {
    onlyHash: true,
    wrapWithDirectory: true,
  })

  let last = null
  for await (const result of results) {
    last = result
  }

  if (last != null) {
    return last
  } else {
    throw new Error(`Import failed`)
  }
}
