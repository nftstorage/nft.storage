import { mutate, query } from './graphql.js'
import * as Result from './result.js'
import * as Schema from '../gen/db/schema.js'
import * as IPFSURL from './ipfs-url.js'
import * as Cluster from './cluster.js'
import * as IPFS from './ipfs.js'
import { fetchWebResource } from './net.js'
import { configure } from './config.js'
import { script } from 'subprogram'

const { TokenAssetStatus } = Schema

export const main = async () => await spawn(configure())

/**
 * @param {import('./config').Config} config
 */
export const spawn = async (config) => {
  const deadline = Date.now() + config.budget
  while (deadline - Date.now() > 0) {
    console.log('🔍 Fetching token assets that were queued')
    const assets = await fetchTokenURIs(config)
    if (assets.length === 0) {
      return console.log('🏁 Finish, no more queued task were found')
    } else {
      console.log(`🤹 Spawn ${assets.length} tasks to process fetched assets`)
      const updates = await Promise.all(
        assets.map((asset) => analyze(config, asset))
      )

      console.log('💾 Update token assets')
      await updateTokenAssets(config, updates)
      console.log(`✨ Processed batch of ${assets.length} assets`)
    }
  }
  console.log('⌛️ Finish, time is up')
}

/**
 * @typedef {{ tokenURI:string, _id:string }} TokenAsset
 *
 * Returns batch of queued tokens.
 *
 * @param {Object} options
 * @param {number} options.batchSize
 * @param {import('./config').DBConfig} options.db
 * @returns {Promise<TokenAsset[]>}
 */

const fetchTokenURIs = async ({ db, batchSize }) => {
  const result = await query(db, {
    findTokenAssets: [
      {
        where: {
          status: Schema.TokenAssetStatus.Queued,
        },
        _size: batchSize,
      },
      {
        data: {
          _id: 1,
          tokenURI: 1,
        },
      },
    ],
  })

  const assets =
    /** @type {TokenAsset[]} */
    (Result.value(result).findTokenAssets.data.filter(Boolean))

  return assets
}

/**
 * @param {import('./config').Config} config
 * @param {TokenAsset} _asset
 * @returns {Promise<Schema.TokenAssetUpdate>}
 */
const analyze = async (config, { _id: id, tokenURI }) => {
  console.log(`🔬 (${id}) Parsing tokenURI`)
  const urlResult = Result.fromTry(() => new URL(tokenURI))
  if (!urlResult.ok) {
    console.error(
      `🚨 (${id}) Parsing URL failed ${urlResult.error}, report problem`
    )

    return {
      id,
      status: TokenAssetStatus.URIParseFailed,
      statusText: `${urlResult.error}`,
    }
  }
  const url = urlResult.value
  const ipfsURL = IPFSURL.asIPFSURL(url)
  const asset = ipfsURL ? { id, ipfsURL: ipfsURL.href } : { id }

  const blob = ipfsURL
    ? await Result.fromPromise(IPFS.cat(config.ipfs, ipfsURL))
    : await Result.fromPromise(fetchWebResource(url))
  const content = blob.ok ? await Result.fromPromise(blob.value.text()) : blob

  if (!content.ok) {
    console.error(`🚨 (${id}) Fetch failed ${content.error}`)

    return {
      ...asset,
      status: TokenAssetStatus.ContentFetchFailed,
      statusText: `${content.error}`,
    }
  }

  const metadata = await Result.fromPromise(parseERC721Metadata(content.value))
  if (!metadata.ok) {
    console.error(`🚨 (${id}) Parse failed ${metadata.error}`)

    return {
      ...asset,
      status: TokenAssetStatus.ContentParseFailed,
      statusText: metadata.error,
    }
  }

  const pin = ipfsURL
    ? await Result.fromPromise(
        Cluster.pin(config.cluster, ipfsURL, {
          assetID: id,
          sourceURL: tokenURI,
        })
      )
    : await Result.fromPromise(
        Cluster.add(config.cluster, new Blob([content.value]), {
          assetID: id,
          // if it is a data uri just omit it.
          ...(url.protocol !== 'data:' && { sourceURL: url.href }),
        })
      )

  if (!pin.ok) {
    console.error(`🚨 (${id}) Failed to pin ${pin.error}`)
    return {
      ...asset,
      status: TokenAssetStatus.PinRequestFailed,
      statusText: `${pin.error}`,
    }
  }
  const { cid } = pin.value
  console.log(`📌 (${id}) Pinned metadata ${cid}`)

  console.log(`📝 (${id}) Link token asset to metadata & resources`)
  return {
    ...asset,
    status: TokenAssetStatus.Linked,
    statusText: 'Linked',
    metadata: { ...metadata.value, cid },
  }
}

/**
 * @param {string} content
 */
const parseERC721Metadata = async (content) => {
  const json = JSON.parse(content)
  const { name, description, image } = json
  if (typeof name !== 'string') {
    throw new Error('name field is missing')
  }
  if (typeof description !== 'string') {
    throw new Error('descript field is missing')
  }
  if (typeof image !== 'string') {
    throw new Error('image field is missing')
  }

  const imageResource = parseResource(image)

  /** @type {Schema.ResourceInput[]} */
  const assets = []

  /** @type {Schema.MetadataInput} */
  const metadata = { cid: '', name, description, image: imageResource, assets }
  for (const [value] of iterate({ ...metadata, image: null })) {
    const asset = typeof value === 'string' ? tryParseResource(value) : null
    if (asset) {
      assets.push(asset)
    }
  }

  return metadata
}

/**
 * @param {string} input
 * @returns {Schema.ResourceInput}
 */
const parseResource = (input) => {
  const url = new URL(input)
  const ipfsURL = IPFSURL.asIPFSURL(url)
  if (ipfsURL) {
    return {
      uri: input,
      ipfsURL: ipfsURL.href,
    }
  } else {
    return {
      uri: input,
    }
  }
}

/**
 *
 * @param {string} input
 */
const tryParseResource = (input) => {
  try {
    return parseResource(input)
  } catch (error) {
    return null
  }
}

/**
 * @param {Object} data
 * @param {PropertyKey[]} [path]
 * @returns {Iterable<[string|number|boolean|null, PropertyKey[]]>}
 */
const iterate = function* (data, path = []) {
  if (Array.isArray(data)) {
    for (const [index, element] of data) {
      yield* iterate(element, [...path, index])
    }
  } else if (data && typeof data === 'object') {
    for (const [key, value] of Object.entries(data)) {
      yield* iterate(value, [...path, key])
    }
  } else {
    yield [data, path]
  }
}

/**
 * @param {Object} config
 * @param {import('./config').DBConfig} config.db
 * @param {Schema.TokenAssetUpdate[]} updates
 * @returns {Promise<string[]>}
 */
const updateTokenAssets = async ({ db }, updates) => {
  const result = await mutate(db, {
    updateTokenAssets: [
      {
        input: { updates },
      },
      {
        _id: 1,
      },
    ],
  })

  return Result.value(result).updateTokenAssets?.map((token) => token._id) || []
}

script({ ...import.meta, main })
