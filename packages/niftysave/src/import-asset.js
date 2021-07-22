import { mutate, query } from './graphql.js'
import * as Result from './result.js'
import * as Schema from '../gen/db/schema.js'
import * as IPFSURL from './ipfs-url.js'
import * as Cluster from './cluster.js'
import { fetchWebResource } from './net.js'
import { configure } from './config.js'
import { script } from 'subprogram'

export const main = () => spawn(configure())

/**
 * @param {Object} config
 * @param {number} config.budget - Time budget
 * @param {number} config.batchSize - Number of tokens in each import
 * @param {import('./cluster').Config} config.cluster
 * @param {import('./config').DBConfig} config.db
 */
export const spawn = async (config) => {
  const deadline = Date.now() + config.budget
  while (deadline - Date.now() > 0) {
    console.log('🔍 Fetching resources linked referrenced by tokens')
    const resources = await fetchTokenResources(config)
    if (resources.length === 0) {
      return console.log('🏁 Finish, no more queued task were found')
    } else {
      console.log(`🤹 Spawn ${resources.length} tasks to process each resource`)
      const updates = await Promise.all(
        resources.map((resource) => archive(config, resource))
      )
      await updateResources(config, updates)
      console.log(`✨ Processed batch of ${resources.length} assets`)
    }
  }
  console.log('⌛️ Finish, time is up')
}

/**
 * @typedef {{ _id:string, uri: string, ipfsURL?: string }} Resource
 *
 * @param {Object} options
 * @param {number} options.batchSize
 * @param {import('./config').DBConfig} options.db
 * @returns {Promise<Resource[]>}
 */

const fetchTokenResources = async ({ db, batchSize }) => {
  const result = await query(db, {
    findResources: [
      {
        where: {
          status: Schema.ResourceStatus.Queued,
        },
        _size: batchSize,
      },
      {
        data: {
          _id: 1,
          uri: 1,
          ipfsURL: 1,
        },
      },
    ],
  })

  const resources =
    /** @type {Resource[]} */
    (Result.value(result).findResources.data.filter(Boolean))

  return resources
}

/**
 * @param {Object} config
 * @param {import('./config').DBConfig} config.db
 * @param {Schema.ResourceUpdate[]} updates
 */

const updateResources = async (config, updates) => {
  console.log(`📝 Update resources in the db`)
  const result = await mutate(config.db, {
    updateResources: [
      {
        input: {
          updates,
        },
      },
      {
        _id: 1,
      },
    ],
  })

  if (result.ok) {
    console.log(`✅ Resource were updated`)
    return result.value.updateResources?.map((r) => r._id) || []
  } else {
    console.error(
      `💣 Attempt to update resource failed with ${result.error}, letting it crash`
    )
    throw result.error
  }
}

/**
 * @typedef {{id:string, problem: string, status:Schema.ResourceStatus}} Problem
 *
 * @param {Object} config
 * @param {import('./cluster').Config} config.cluster
 * @param {Resource} resource
 * @returns {Promise<Schema.ResourceUpdate>}
 */
const archive = async (config, resource) => {
  const { _id: id } = resource
  console.log(`🔬 (${id}) Parsing resource uri`)

  const urlResult = Result.fromTry(() => new URL(resource.uri))
  if (!urlResult.ok) {
    return {
      id,
      status: Schema.ResourceStatus.URIParseFailed,
      statusText: String(urlResult.error),
    }
  }
  const url = urlResult.value

  const ipfsURL = IPFSURL.asIPFSURL(url)
  return ipfsURL
    ? await archiveIPFSResource(config, { ...resource, id, ipfsURL })
    : await archiveWebResource(config, { ...resource, id, url })
}

/**
 * @param {{cluster: import('./cluster').Config}} config
 * @param {{id: string, uri: string, ipfsURL: IPFSURL.IPFSURL}} resource
 * @returns {Promise<Schema.ResourceUpdate>}
 */
const archiveIPFSResource = async (config, { ipfsURL, uri, id }) => {
  console.log(`📌 (${id}) Pin a resource ${ipfsURL}`)
  const pin = await Result.fromPromise(
    Cluster.pin(config.cluster, ipfsURL, {
      metadata: {
        assetID: id,
        sourceURL: uri,
      },
    })
  )

  if (!pin.ok) {
    return {
      id,
      ipfsURL: ipfsURL.href,
      status: Schema.ResourceStatus.PinRequestFailed,
      statusText: String(pin.error),
    }
  }
  const { cid } = pin.value

  console.log(`📝 (${id}) Update resource in the db`)
  return {
    id,
    ipfsURL: ipfsURL.href,
    status: Schema.ResourceStatus.ContentLinked,
    statusText: 'ContentLinked',
    cid,
  }
}

/**
 * @param {{cluster: import('./cluster').Config}} config
 * @param {Resource & {id: string, url: URL}} resource
 * @returns {Promise<Schema.ResourceUpdate>}
 */
const archiveWebResource = async (config, { id, url }) => {
  const from = url.protocol === 'data:' ? 'data: url' : url.href
  console.log(`📡 (${id}) Fetching content from ${from}`)
  const fetch = await Result.fromPromise(fetchWebResource(url))
  if (!fetch.ok) {
    return {
      id,
      status: Schema.ResourceStatus.ContentFetchFailed,
      statusText: String(fetch.error),
    }
  }
  const content = fetch.value

  console.log(
    `📌 (${id}) Pin fetched content Blob<{type:"${content.type}", size:${content.size}>`
  )

  const pin = await Result.fromPromise(
    Cluster.add(config.cluster, content, {
      id,
      sourceURL: url.protocol === 'data:' ? 'data:...' : url.href,
    })
  )

  if (!pin.ok) {
    return {
      id,
      status: Schema.ResourceStatus.PinRequestFailed,
      statusText: String(pin.error),
    }
  }

  const { cid } = pin.value

  return {
    id,
    status: Schema.ResourceStatus.ContentLinked,
    statusText: 'ContentLinked',
    cid,
  }
}

script({ ...import.meta, main })
