import * as IPFS from 'ipfs-core'
import debug from 'debug'
import os from 'os'
import path from 'path'
import fs from 'fs'
import * as raw from 'multiformats/codecs/raw'
import * as pb from '@ipld/dag-pb'

const BLOCK_TIMEOUT = 1000 * 60 * 3 // timeout if we don't receive a block after 3 mins
const REPORT_INTERVAL = 1000 * 60 // log download progress every minute

/**
 * @param {import('multiformats').CID} cid
 * @param {[]string} fromAddrs
 */
export async function* fetch(cid, fromAddrs) {
  const log = debug(`backup:fetch:${cid}`)
  const repoPath = path.join(os.tmpdir(), `.ipfs${cid}`)

  log(`fetching ${cid} into ${repoPath} from nodes`, fromAddrs)

  const ipfs = await IPFS.create({
    init: { emptyRepo: true },
    preload: { enabled: false },
    repo: repoPath,
    config: { Bootstrap: fromAddrs },
  })

  let reportInterval
  try {
    let bytesReceived = 0
    const bytesTotal = getSize(cid)
    log(bytesTotal == null ? 'unknown size' : `${bytesTotal} bytes`)

    reportInterval = setInterval(() => {
      log(`received ${bytesReceived} of ${bytesTotal || 'unknown'} bytes`)
    }, REPORT_INTERVAL)

    const controller = new AbortController()
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
    try {
      await ipfs.stop()
    } catch (err) {
      log('failed to stop IPFS:', err)
    }
    try {
      await fs.promises.rmdir(repoPath, { recursive: true })
    } catch (err) {
      log(`failed to clean repo: ${repoPath}`, err)
    }
  }
}

/**
 * @param {import('ipfs-core').IPFS} ipfs
 * @param {import('multiformats').CID} cid
 * @returns {number | undefined}
 */
function getSize(ipfs, cid) {
  if (cid.code === raw.code) {
    const block = await ipfs.block.get(cid, { timeout: BLOCK_TIMEOUT })
    return block.byteLength
  } else if (cid.code === pb.code) {
    const stat = await ipfs.object.stat(cid, { timeout: BLOCK_TIMEOUT })
    return stat.CumulativeSize
  }
}
