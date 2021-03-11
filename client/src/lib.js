import * as API from "./api.js"
import CID from "multiformats/cid"



/**
 * @implements {API.Service}
 */
export default class NFTStore {
  /**
   * @param {Object} options
   * @param {string} options.token
   * @param {URL} [options.endpoint]
   */
  constructor({ token, endpoint = new URL("https://api.nft.storage") }) {
    /** @readonly */
    this.token = token
    /** @readonly */
    this.endpoint = endpoint
  }

  /**
   * @param {string} token
   */
  static auth(token) {
    return { Authorization: `Bearer ${token}` }
  }
  /**
   * @param {API.Service} service
   * @param {Blob} blob
   */
  static async storeBlob({ endpoint, token }, blob) {
    const url = new URL("/api/upload", endpoint)
    const request = await fetch(url.toString(), {
      method: "POST",
      headers: NFTStore.auth(token),
      body: blob
    })
    const result = await request.json()

    if (result.ok) {
      return CID.parse(result.value.cid)
    } else {
      throw new Error(result.error)
    }
  }
  /**
   * @param {API.Service} service
   * @param {Iterable<File>} files
   */
  static async storeDirectory({ endpoint, token }, files) {
    const url = new URL("/api/upload", endpoint)
    const body = new FormData()
    for (const file of files) {
      body.append("file", file, file.name)
    }

    const request = await fetch(url.toString(), {
      method: "POST",
      headers: NFTStore.auth(token),
      body,
    })
    const { cid } = await request.json()

    return CID.parse(cid)
  }

  /**
   * @param {API.Service} service
   * @param {CID} cid
   * @returns {Promise<API.StatusResult>}
   */
  static async status({ endpoint, token }, cid) {
    const url = new URL(`/api/status/${cid}`, endpoint)
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: NFTStore.auth(token),
    })   
    const result = await response.json()
    
    if (result.ok) {
      return {
        cid: CID.parse(result.value.cid),
        deals: result.value.deals,
        pin: {
          ...result.value.pin,
          cid: CID.parse(result.value.pin.cid),
        },
        created: new Date(result.value.created),
      }
    } else {
      throw new Error(result.error.message)
    }
  }

  /**
   * @param {API.Service} service
   * @param {CID} cid
   * @returns {Promise<void>}
   */
  static async delete({ endpoint, token }, cid) {
    const url = new URL(`/api/delete/${cid}`, endpoint)
    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: NFTStore.auth(token),
    })
    const result = await response.json()
    if (!result.ok) {
      throw new Error(result.error.message)
    }
  }

  // Just a sugar so you don't have to pass around endpoint and token around.

  /**
   * @param {Blob} blob 
   */
  storeBlob(blob) {
    return NFTStore.storeBlob(this, blob)
  }
  /**
   * @param {Iterable<File>} files
   */
  storeDirectory(files) {
    return NFTStore.storeDirectory(this, files)
  }
  /**
   * @param {CID} cid
   */
  status(cid) {
    return NFTStore.status(this, cid)
  }
  /**
   * @param {CID} cid
   */
  delete(cid) {
    return NFTStore.delete(this, cid)
  }
}

/**
 * Just to verify API compatibility.
 * @type {API.API}
 */
const api = NFTStore
void api
