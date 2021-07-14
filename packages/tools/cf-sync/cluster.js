const path = require('path')
const { URL } = require('url')
require('dotenv').config({
  path: path.resolve(__dirname, '.env.local'),
})
const got = require('got').default
const defaults = {
  url: 'https://nft.storage.ipfscluster.io/api/',
  headers: { Authorization: `Basic ${process.env.CLUSTER_TOKEN}` },
}

class Cluster {
  // @ts-ignore
  constructor(options) {
    this.options = {
      ...defaults,
      ...options,
    }
  }

  /**
   * @param {string} cid
   */
  async status(cid) {
    const url = new URL(`pins/${cid}`, this.options.url)

    const data = await got(url, {
      headers: this.options.headers,
    }).json()

    let status = 'failed'

    const pinInfos = Object.values(data['peer_map'])
    if (pinInfos.some((i) => i.status === 'pinned')) {
      status = 'pinned'
    } else if (pinInfos.some((i) => i.status === 'pinning')) {
      status = 'pinning'
    } else if (pinInfos.some((i) => i.status === 'queued')) {
      status = 'queued'
    }

    return {
      cid: data.cid['/'],
      status,
      date: pinInfos[0].timestamp,
    }
  }

  /**
   * @param {string} cid
   */
  async size(cid) {
    const url = new URL(
      `dag/stat?arg=${cid}&progress=false`,
      'https://nft.storage.ipfscluster.io/api/v0/'
    )

    const data = await got(url, {
      headers: this.options.headers,
    }).json()

    return data.Size
  }
}

module.exports = Cluster
