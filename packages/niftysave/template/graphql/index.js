import { createClient } from './createClient.js'
import * as schema from './schema.js'
import * as Service from '../../src/service.js'
import * as Result from '../../src/result.js'
/**
 * @typedef {Object} Config
 * @property {URL} url
 * @property {Record<string, string>} [headers]
 */
export { schema }

/**
 * @typedef {ReturnType<typeof createClient>} Service
 * @param {Config} config
 * @returns {Service}
 */
const connect = ({ url, headers }) =>
  createClient({
    async fetcher({ query, variables }) {
      const response = await fetch(url.href, {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      })

      return /** @type {import('graphql').ExecutionResult<any>} */ (await response.json())
    },
  })

export const service = Service.create(connect)

/**
 *
 * @param {Config} config
 * @param {schema.QueryRequest} request
 */
export const query = async (config, request) =>
  asResult(await service(config).query(request))

/**
 * @param {Config} config
 * @param {schema.MutationRequest} request
 */
export const mutation = async (config, request) =>
  asResult(await service(config).mutation(request))

/**
 * @template T
 * @param {import('graphql').ExecutionResult<T>} input
 * @returns {Result.Result<Failure, T>}
 */

const asResult = input => {
  if (input.data) {
    return Result.ok(input.data)
  } else {
    return Result.error(new Failure(input.errors || []))
  }
}

export class Failure extends Error {
  /**
   * @param {readonly import('graphql').GraphQLError[]} errors
   */
  constructor(errors) {
    super()
    this.errors = errors
  }
  get message() {
    return this.errors.map(error => error.message).join('\n')
  }
}
