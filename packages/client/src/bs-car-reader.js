/**
 * An implementation of the CAR reader interface that is backed by a blockstore.
 *
 * @typedef {import('multiformats').CID} CID
 * @typedef {import('@ipld/car/api').CarReader} CarReader
 * @implements {CarReader}
 */
export class BlockstoreCarReader {
  /**
   * @param {number} version
   * @param {CID[]} roots
   * @param {import('ipfs-car/blockstore').Blockstore} blockstore
   */
  constructor(version, roots, blockstore) {
    /**
     * @private
     */
    this._version = version
    /**
     * @private
     */
    this._roots = roots
    /**
     * @private
     */
    this._blockstore = blockstore
  }

  get version() {
    return this._version
  }

  get blockstore() {
    return this._blockstore
  }

  async getRoots() {
    return this._roots
  }

  /**
   * @param {CID} cid
   */
  has(cid) {
    return this._blockstore.has(cid)
  }

  /**
   * @param {CID} cid
   */
  async get(cid) {
    const bytes = await this._blockstore.get(cid)
    return { cid, bytes }
  }

  blocks() {
    return this._blockstore.blocks()
  }

  async *cids() {
    for await (const b of this.blocks()) {
      yield b.cid
    }
  }
}
