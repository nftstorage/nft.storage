import { db } from './sources.js'
import { mutate, query } from './graphql.js'
import * as Result from './result.js'
import * as Schema from '../gen/db/schema.js'
import * as IPFSURL from './ipfs-url.js'
import * as Cluster from './cluster.js'
import { fetchWebResource } from './net.js'
import { CID } from 'multiformats'

/**
 * @param {Object} options
 * @param {number} options.budget - Time budget
 * @param {number} options.batchSize - Number of tokens in each import
 */
export const spawn = async ({ budget, batchSize }) => {
  const deadline = Date.now() + budget
  while (deadline - Date.now() > 0) {
    console.log('🔍 Fetching resources linked referrenced by tokens')
    const resources = await fetchTokenResources({ batchSize })
    if (resources.length === 0) {
      return console.log('🏁 Finish, no more queued task were found')
    } else {
      console.log(`🤹 Spawn ${resources.length} tasks to process each resource`)
      const results = resources.map(processTokenResource)
      await Promise.all(results)
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
 * @returns {Promise<Resource[]>}
 */

const fetchTokenResources = async ({ batchSize }) => {
  const result = await query(db, {
    findResources: [
      {
        where: {
          status: Schema.ResourceStatus.Idle,
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
 * @typedef {{id:string, problem: string, status:Schema.ResourceStatus}} Problem
 * @param {Resource} resource
 */
const processTokenResource = async (resource) => {
  console.log(`🔬 (${resource._id}) Parsing resource uri`)

  const urlResult = Result.fromTry(() => new URL(resource.uri))
  if (!urlResult.ok) {
    return await abort(
      resource._id,
      Schema.ResourceStatus.FailedURIParse,
      urlResult.error
    )
  }
  const url = urlResult.value

  const ipfsURL = IPFSURL.asIPFSURL(url)
  return ipfsURL
    ? await processIPFSResource({ ...resource, ipfsURL })
    : await processWebResource({ ...resource, url })
}

/**
 * @param {{_id: string, uri: string, ipfsURL: IPFSURL.IPFSURL}} resource
 */
const processIPFSResource = async ({ ipfsURL, uri, _id }) => {
  console.log(`📌 (${_id}) Pin a resource ${ipfsURL}`)
  const pin = await Result.fromPromise(
    Cluster.pin(ipfsURL, {
      assetID: _id,
      sourceURL: uri,
    })
  )

  if (!pin.ok) {
    return await abort(_id, Schema.ResourceStatus.PinFailure, pin.error)
  }
  const { cid } = pin.value

  console.log(`📝 (${_id}) Update resource in the db`)
  return await updateResourcePin(_id, {
    ipfsURL,
    status: Schema.ResourceStatus.Pinned,
    cid,
  })
}

/**
 *
 * @param {string} id
 * @param {{status: Schema.ResourceStatus, ipfsURL: URL, cid: string}} options
 */

const updateResourcePin = async (id, { status, ipfsURL, cid }) => {
  console.log(`📝 (${id}) Update resource in the db`)
  const result = await mutate(db, {
    updateResourcePin: [
      {
        input: {
          resourceID: id,
          status,
          cid,
          ipfsURL: ipfsURL.href,
        },
      },
      {
        _id: 1,
      },
    ],
  })

  if (result.ok) {
    console.log(`✅ (${id}) Resource is updated`)
    return result.value.updateResourcePin
  } else {
    console.error(
      `💣 (${id}) Attempt to update resource failed with ${result.error}, letting it crash`
    )
    throw result.error
  }
}

/**
 *
 * @param {string} id
 * @param {Schema.ResourceStatus} status
 * @param {Error} error
 */
const abort = async (id, status, error) => {
  console.error(
    `🚨 (${id}) Task failed, report ${status} with a message ${error}`
  )
  const result = await mutate(db, {
    reportResourceProblem: [
      {
        input: {
          resourceID: id,
          status,
          problem: `${error.message} ${error.stack}`,
        },
      },
      {
        _id: 1,
      },
    ],
  })
  if (!result.ok) {
    console.error(
      `💣 (${id}) Attempt to report an error failed with ${result.error}, letting it crash`
    )
    throw result.error
  }

  return result.value.reportResourceProblem._id
}

/**
 * @param {Resource & {url: URL}} resource
 */
const processWebResource = async ({ _id, url }) => {
  const from = url.protocol === 'data:' ? 'data: url' : url.href
  console.log(`📡 (${_id}) Fetching content from ${from}`)
  const fetch = await Result.fromPromise(fetchWebResource(url))
  if (!fetch.ok) {
    return await abort(_id, Schema.ResourceStatus.FailedFetch, fetch.error)
  }
  const content = fetch.value

  console.log(
    `📌 (${_id}) Pin fetched content Blob<{type:"${content.type}", size:${content.size}>`
  )

  const pin = await Result.fromPromise(
    Cluster.add(content, {
      id: _id,
      sourceURL: url.protocol === 'data:' ? 'data:...' : url.href,
    })
  )

  if (!pin.ok) {
    return await abort(_id, Schema.ResourceStatus.PinFailure, pin.error)
  }

  const { cid } = pin.value

  return await updateResourcePin(_id, {
    status: Schema.ResourceStatus.Pinned,
    cid,
    ipfsURL: IPFSURL.create(CID.parse(cid)),
  })
}
