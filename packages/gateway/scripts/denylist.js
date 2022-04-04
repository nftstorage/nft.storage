import fetch from '@web-std/fetch'
import path from 'path'
import toml from 'toml'
import { CID } from 'multiformats'
import { base32 } from 'multiformats/bases/base32'
import { sha256 } from 'multiformats/hashes/sha2'
import fs from 'fs'
import * as uint8arrays from 'uint8arrays'

/**
 * @typedef {{ id: string, title: string }} Namespace
 * @typedef {{ name: string, metadata: any }} Key
 * @typedef {{ key: string, value: any, metadata?: any }} BulkWritePair
 */

const rootDir = path.dirname(path.dirname(import.meta.url))
const wranglerConfigPath = `${rootDir}/wrangler.toml`
const denyListPath = `${rootDir}/denylist.json`

const DENY_LIST_SOURCES = [
  'https://badbits.dwebops.pub/denylist.json',
  denyListPath,
]

export async function denylistSyncCmd({ env }) {
  const cfApiToken = mustGetEnv('CF_API_TOKEN')

  const wranglerConfig = await getWranglerToml(wranglerConfigPath)
  const wranglerEnvConfig = wranglerConfig.env[env]
  if (!wranglerEnvConfig) {
    throw new Error(`missing wrangler configuration for env: ${env}`)
  }
  console.log(`🧩 using wrangler config: ${wranglerConfigPath}`)

  const cfAccountId = wranglerEnvConfig.account_id
  if (!cfAccountId) {
    throw new Error(`missing Cloudflare account_id in env: ${env}`)
  }
  console.log(`🏕 using env: ${env} (${cfAccountId})`)

  const kvNamespaces = wranglerEnvConfig.kv_namespaces || []
  const denyListKv = kvNamespaces.find((kv) => kv.binding === 'DENYLIST')
  if (!denyListKv) {
    throw new Error('missing binding in kv_namespaces: DENYLIST')
  }
  console.log(`🪢 using KV binding: DENYLIST (${denyListKv.id})`)

  for (const url of DENY_LIST_SOURCES) {
    console.log(`🦴 fetching ${url}`)
    const denyList = await getDenyList(url)
    const kvs = denyList.map(({ anchor: key, status, reason }) => ({
      key,
      value: { status, reason },
    }))
    console.log(`📝 writing ${kvs.length} entries`)
    await writeKVMulti(cfApiToken, cfAccountId, denyListKv.id, kvs)
  }
  console.log('✅ Done')
}

async function getWranglerToml(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`unexpected status fetching wrangler.toml: ${res.status}`)
  }
  return toml.parse(await res.text())
}

async function getDenyList(url) {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`unexpected status fetching denylist.json: ${res.status}`)
  }
  const list = await res.json()
  return list
}

/**
 * @param {string} apiToken Cloudflare API token
 * @param {string} accountId Cloudflare account ID
 * @param {string} nsId KV namespace ID
 * @param {Array<BulkWritePair>} kvs
 * @returns {Promise<{ success: boolean, errors: Array<{ code: number, message: string }>, messages: any[] }>}
 */
async function writeKVMulti(apiToken, accountId, nsId, kvs) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/storage/kv/namespaces/${nsId}/bulk`
  kvs = kvs.map((kv) => ({
    ...kv,
    value: JSON.stringify(kv.value),
  }))

  const chunkSize = 10000
  for (let i = 0; i < kvs.length; i += chunkSize) {
    const kvsChunk = kvs.slice(i, i + chunkSize)
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${apiToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kvsChunk),
    })
    const { success, errors } = await res.json()
    if (!success) {
      const error = Array.isArray(errors) && errors[0]
      throw new Error(
        error ? `${error.code}: ${error.message}` : 'failed to write to KV'
      )
    }
  }
}

/**
 * @param {string} key
 * @returns {string}
 */
function mustGetEnv(key) {
  if (!process.env[key]) {
    throw new Error(`missing environment variable: ${key}`)
  }
  return process.env[key]
}

export async function denylistAddCmd(cid, options) {
  const parts = cid.split('/')
  const cidv1 = CID.parse(parts[0]).toV1().toString(base32.encoder)
  const cidv1Path = `${cidv1}/${parts.slice(1).join('/')}`
  console.log(`🆔 normalized CID + path: ${cidv1Path}`)

  const multihash = await sha256.digest(uint8arrays.fromString(cidv1Path))
  const digest = multihash.bytes.subarray(2)
  const anchor = uint8arrays.toString(digest, 'hex')
  const entry = { anchor, status: options.status, reason: options.reason }
  console.log(`🎫 entry: ${JSON.stringify(entry)}`)

  console.log(`🦴 fetching ${denyListPath}`)
  const denyList = await getDenyList(denyListPath)
  if (denyList.some((e) => e.anchor === anchor)) {
    throw new Error('already exists')
  }

  denyList.push(entry)
  console.log('📝 writing update')
  fs.writeFileSync(
    denyListPath.replace('file://', ''),
    JSON.stringify(denyList, null, 2)
  )
  console.log('✅ Done')
}
