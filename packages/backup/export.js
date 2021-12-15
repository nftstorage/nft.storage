import debug from 'debug'
import * as raw from 'multiformats/codecs/raw'
import * as pb from '@ipld/dag-pb'
import formatNumber from 'format-number'

const fmt = formatNumber()

const BLOCK_TIMEOUT = 1000 * 60 * 3 // timeout if we don't receive a block after 3 mins
const REPORT_INTERVAL = 1000 * 60 // log download progress every minute
const MAX_DAG_SIZE = 1024 * 1024 * 1024 * 1 // don't try to transfer a DAG that's bigger than 1GB

/**
 * @param {() => Promise<import('ipfs-core').IPFS>} getIpfs
 */
export function exportCar(ipfs) {
  /**
   * @param {AsyncIterable<import('./bindings').BackupCandidate>} source
   * @returns {AsyncIterableIterator<import('./bindings').BackupContent>}
   */
  return async function* (source) {
    for await (const candidate of source) {
      yield { ...candidate, content: ipfsDagExport(ipfs, candidate.sourceCid) }
    }
  }
}

/**
 * Export a CAR for the passed CID.
 *
 * @param {import('ipfs-core').IPFS} ipfs
 * @param {import('multiformats').CID} cid
 */
async function* ipfsDagExport(ipfs, cid) {
  const log = debug(`backup:export:${cid}`)
  let reportInterval
  try {
    log('determining size...')
    let bytesReceived = 0
    const bytesTotal = await getSize(ipfs, cid)
    log(bytesTotal == null ? 'unknown size' : `${fmt(bytesTotal)} bytes`)

    if (bytesTotal != null && bytesTotal > MAX_DAG_SIZE) {
      throw new Error(`DAG too big: ${fmt(bytesTotal)} > ${fmt(MAX_DAG_SIZE)}`)
    }

    reportInterval = setInterval(() => {
      log(
        `received ${fmt(bytesReceived)} of ${
          bytesTotal ? fmt(bytesTotal) : 'unknown'
        } bytes`
      )
    }, REPORT_INTERVAL)

    const controller = new AbortController() // eslint-disable-line
    let timeoutId = setTimeout(() => controller.abort(), BLOCK_TIMEOUT)

    for await (const chunk of ipfs.dag.export(cid)) {
      clearTimeout(timeoutId)
      bytesReceived += chunk.byteLength
      yield chunk
      timeoutId = setTimeout(() => controller.abort(), BLOCK_TIMEOUT)
    }
    log('done')
  } finally {
    clearInterval(reportInterval)
  }
}

/**
 * @param {import('ipfs-core').IPFS} ipfs
 * @param {import('multiformats').CID} cid
 * @returns {Promise<number | undefined>}
 */
async function getSize(ipfs, cid) {
  if (cid.code === raw.code) {
    const block = await ipfs.block.get(cid, { timeout: BLOCK_TIMEOUT })
    return block.byteLength
  } else if (cid.code === pb.code) {
    const stat = await ipfs.object.stat(cid, { timeout: BLOCK_TIMEOUT })
    return stat.CumulativeSize
  }
}
