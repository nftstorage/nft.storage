import * as API from "./api.js"
import CID from "multiformats/cid"

/**
 * @implements {API.Service}
 * @implements {API.API}
 */
export class NFTStore {
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
   * @private
   * @param {string} token
   */
  static auth(token) {
    return { Authorization: `Bearer ${token}` }
  }
  /**
   * @param {Iterable<File>} files
   * @param {API.Service} service
   */
  static async store(files, { endpoint, token }) {
    const url = new URL("/", endpoint)
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
   * @param {CID} cid
   * @param {API.Service} service
   * @returns {Promise<API.StatusResult>}
   */
  static async status(cid, { endpoint, token }) {
    const url = new URL(`/${cid}`, endpoint)
    const request = await fetch(url.toString(), {
      method: "GET",
      headers: NFTStore.auth(token),
    })
    const json = await request.json()

    return {
      cid: CID.parse(json.cid),
      deals: json.deals,
      pin: {
        ...json.pin,
        cid: CID.parse(json.pin.cid),
      },
      created: new Date(json.created),
    }
  }

  /**
   *
   * @param {CID} cid
   * @param {API.Service} service
   * @returns {Promise<void>}
   */
  static async delete(cid, { endpoint, token }) {
    const url = new URL(`/${cid}`, endpoint)
    const request = await fetch(url.toString(), {
      method: "DELETE",
      headers: NFTStore.auth(token),
    })
    await request.json()
  }
}
