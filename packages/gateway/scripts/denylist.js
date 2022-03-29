import fetch from '@web-std/fetch'

/**
 * @typedef {{ id: string, title: string }} Namespace
 * @typedef {{ name: string, metadata: any }} Key
 * @typedef {{ key: string, value: any, metadata?: any }} BulkWritePair
 */

const SOURCES = [
  'https://raw.githubusercontent.com/nftstorage/nft.storage/main/packages/gateway/denylist.json',
  'https://badbits.dwebops.pub/denylist.json',
]

export function denylistCmd() {
  for (const url of SOURCES) {
    const denyList = getDenyList(url)
  }
}

async function getDenyList(url) {
  const res = await fetch(url)
  if (!res.ok)
    throw new Error(`unexpected status fetching denylist.json: ${res.status}`)
  const list = await res.json()
  return list
}

/**
 * @param {string} nsId KV namespace ID
 * @param {Array<BulkWritePair>} kvs
 * @returns {Promise<{ success: boolean, errors: Array<{ code: number, message; string }>, messages: any[] }>}
 */
async function writeKVMulti(nsId, kvs) {
  const url = new URL(`${this.kvNsPath}/${nsId}/bulk`, endpoint)
  kvs = kvs.map((kv) => ({
    ...kv,
    value: JSON.stringify(kv.value),
  }))

  const chunkSize = 10
  for (let i = 0; i < kvs.length; i += chunkSize) {
    const kvsChunk = kvs.slice(i, i + chunkSize)
    await fetch(url.toString(), {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kvs),
    })
  }
}
