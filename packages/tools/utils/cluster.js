import { URL } from 'url'
import got from 'got'

/**
 * @typedef {import('../../api/src/utils/db-types').definitions} definitions
 * @typedef {definitions['pin']['status']} Status
 */

class Cluster {
  /**
   * @param {String} token
   */
  constructor(token) {
    this.options = {
      url: 'https://nft.storage.ipfscluster.io/api/',
      headers: { Authorization: `Basic ${token}` },
    }
  }

  /**
   * @param {string} cid
   * @returns {Promise<Status>}
   */
  async status(cid) {
    const url = new URL(`pins/${cid}`, this.options.url)
    try {
      const data = await got(url, {
        headers: this.options.headers,
        timeout: 5000,
      }).json()

      /** @type {Status} */
      let status = 'PinError'

      // eslint-disable-next-line dot-notation
      const pinInfos = Object.values(data['peer_map'])
      if (pinInfos.some((i) => i.status === 'pinned')) {
        status = 'Pinned'
      } else if (pinInfos.some((i) => i.status === 'pinning')) {
        status = 'Pinning'
      } else if (pinInfos.some((i) => i.status === 'pin_queued')) {
        status = 'PinQueued'
      }

      return status
    } catch (err) {
      return 'PinError'
    }
  }

  /**
   * @param {string} cid
   */
  async recover(cid) {
    const url = new URL(
      `pins/${encodeURIComponent(cid)}/recover`,
      this.options.url
    )
    try {
      const data = await got
        .post(url, {
          headers: this.options.headers,
          timeout: 1000,
        })
        .json()

      return data
    } catch (err) {
      return err
    }
  }

  /**
   * @param {string} cid
   */
  async statusRaw(cid) {
    const url = new URL(`pins/${cid}`, this.options.url)

    const getStatus = (/** @type {string} */ s) => {
      switch (s) {
        case 'pinned':
          return 'pinned'
        case 'pinning':
          return 'pinning'
        case 'pin_queued':
          return 'queued'
        default:
          return 'failed'
      }
    }
    const rsp = await got(url, {
      headers: this.options.headers,
    }).json()
    const peers = Object.entries(rsp.peer_map)
    return peers.map((p) => ({
      peerId: p[0],
      peerName: p[1].peername,
      status: getStatus(p[1].status),
      error: p[1].error,
    }))
  }

  /**
   * @param {string} cid
   */
  async size(cid) {
    const url = new URL(
      `dag/stat?arg=${cid}&progress=false`,
      'https://nft.storage.ipfscluster.io/api/v0/'
    )
    try {
      const data = await got(url, {
        headers: this.options.headers,
        timeout: 20000,
      }).json()
      return data.Size
    } catch (err) {
      return 0
    }
  }
}

export default Cluster
