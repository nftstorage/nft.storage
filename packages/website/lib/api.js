import { getMagicUserToken } from './magic'
import constants from './constants'
import { NFTStorage } from 'nft.storage'

const API = constants.API

/**
 * TODO(maybe): define a "common types" package, so we can share definitions with the api?
 *
 * @typedef {object} APITokenInfo an object describing an nft.storage API token
 * @property {number} id
 * @property {string} name
 * @property {string} secret
 * @property {number} user_id
 * @property {string} inserted_at
 * @property {string} updated_at
 * @property {string} [deleted_at]
 *
 * @typedef {'queued' | 'pinning' | 'pinned' | 'failed'} PinStatus
 * @typedef {object} Pin an object describing a remote "pin" of an NFT.
 * @property {string} cid
 * @property {PinStatus} status
 * @property {string} created
 * @property {string} [name]
 * @property {number} [size]
 * @property {Record<string, string>} [meta]
 *
 * @typedef {'queued' | 'active' | 'published' | 'terminated'} DealStatus
 * @typedef {object} Deal an object describing a Filecoin deal
 * @property {DealStatus} status
 * @property {string} datamodelSelector
 * @property {string} pieceCid
 * @property {string} batchRootCid
 * @property {string} [lastChanged]
 * @property {number} [chainDealID]
 * @property {string} [statusText]
 * @property {string} [dealActivation]
 * @property {string} [dealExpiration]
 * @property {string} [miner]
 *
 * @typedef {object} NFTResponse an object describing an uploaded NFT, including pinning and deal info
 * @property {string} cid - content identifier for the NFT data
 * @property {string} type - either "directory" or the value of Blob.type (mime type)
 * @property {Array<{ name?: string, type?: string }>} files - files in the directory (only if this NFT is a directory).
 * @property {string} [name] - optional name of the file(s) uploaded as NFT.
 * @property {string} scope - name of the JWT token used to create this NFT.
 * @property {string} created - date this NFT was created in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: YYYY-MM-DDTHH:MM:SSZ.
 * @property {number} size
 * @property {Pin} pin
 * @property {Deal[]} deals
 *
 *
 * @typedef {object} VersionInfo an object with version info for the nft.storage service
 * @property {string} version - semver version number
 * @property {string} commit - git commit hash
 * @property {string} branch - git branch name
 * @property {string} mode - maintenance mode state
 *
 * @typedef {object} StatsData an object with global stats about the nft.storage service
 * @property {number} deals_total
 * @property {number} deals_size_total
 * @property {number} uploads_past_7_total
 * @property {number} uploads_blob_total
 * @property {number} uploads_car_total
 * @property {number} uploads_nft_total
 * @property {number} uploads_remote_total
 * @property {number} uploads_multipart_total
 */

/**
 * @returns {Promise<NFTStorage>} an NFTStorage client instance, authenticated with the current user's auth token.
 */
export async function getStorageClient() {
  return new NFTStorage({
    token: await getMagicUserToken(),
    endpoint: new URL(API + '/'),
  })
}

/**
 * Get a list of objects describing the user's API tokens.
 *
 * @returns {Promise<APITokenInfo[]>} (async) a list of APITokenInfo objects for each of the user's API tokens
 */
export async function getTokens() {
  return (await fetchAuthenticated('/internal/tokens')).value
}

/**
 * Delete one of the user's API tokens with the given name
 *
 * @param {string} name
 */
export async function deleteToken(name) {
  return fetchAuthenticated('/internal/tokens', {
    method: 'DELETE',
    body: JSON.stringify({ id: name }),
  })
}

/**
 * Create an API token with the given name.
 *
 * @param {string} name
 */
export async function createToken(name) {
  return fetchAuthenticated('/internal/tokens', {
    method: 'POST',
    body: JSON.stringify({ name }),
  })
}

/**
 * Get a list of the user's stored NFTs.
 *
 * @param {object} query
 * @param {number} query.limit - maximum number of NFTs to return
 * @param {string} query.before - only return NFTs uploaded before this date (ISO-8601 datetime string)
 *
 * @returns {Promise<NFTResponse[]>}
 */
export async function getNfts({ limit, before }) {
  const params = new URLSearchParams({ before, limit: String(limit) })
  const result = await fetchAuthenticated(`/?${params}`)
  return result.value.filter(Boolean)
}

/**
 * Get the set of tags applied to this user account.
 *
 * See `packages/api/src/routes/user-tags.js` for tag definitions.
 *
 * @returns {Promise<Record<string, boolean>>} (async) object whose keys are tag names, with boolean values for tag state.
 */
export async function getUserTags() {
  return (await fetchAuthenticated('/user/tags')).value
}

/**
 * @returns {Promise<VersionInfo>} (async) version information for API service
 */
export async function getVersion() {
  const route = '/version'
  const res = await fetch(`${API}${route}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.ok) {
    return await res.json()
  } else {
    throw new Error(`failed to get version ${res.status} - ${res.statusText}`)
  }
}

/**
 * @returns {Promise<{ data: StatsData }>} (async) global service stats
 */
export async function getStats() {
  const res = await fetch(`${API}/stats`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.ok) {
    return res.json()
  }
  throw new Error(`failed to get stats: ${res.status} - ${res.statusText}`)
}

/**
 * Sends a `fetch` request to an API route, using the current user's authentiation token.
 *
 * See {@link fetchRoute}.
 *
 * @param {string} route api route (path + query portion of URL)
 * @param {Record<string, any>} fetchOptions options to pass through to `fetch`
 * @returns {Promise<{ok: boolean, value: any}>} JSON response body.
 */
async function fetchAuthenticated(route, fetchOptions = {}) {
  fetchOptions.headers = {
    ...fetchOptions.headers,
    Authorization: 'Bearer ' + (await getMagicUserToken()),
  }
  return fetchRoute(route, fetchOptions)
}

/**
 * Sends a `fetch` request to an API route and unpacks the JSON response body.
 *
 * Note that it does not unpack the `.value` field from the body, so
 * you get a response like: `{"ok": "true", "value": "thing you care about"}`
 *
 * Defaults to GET requests, but you can pass in whatever `method` you want to the `fetchOptions` param.
 *
 * @param {string} route
 * @param {Record<string, any>} fetchOptions
 * @returns {Promise<{ok: boolean, value: any}>} JSON response body.
 */
async function fetchRoute(route, fetchOptions = {}) {
  if (!route.startsWith('/')) {
    route = '/' + route
  }
  const url = API + route
  const defaultHeaders = {
    'Content-Type': 'application/json',
  }

  const options = {
    method: 'GET',
    ...fetchOptions,
    headers: { ...defaultHeaders, ...fetchOptions.headers },
  }

  const res = await fetch(url, options)
  if (!res.ok) {
    throw new Error(`HTTP error: [${res.status}] ${res.statusText}`)
  }

  const body = await res.json()
  if (body.ok) {
    return body
  } else {
    throw new Error(body.error.message)
  }
}
