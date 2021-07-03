import * as Result from './result.js'

/**
 * @template QR, QC, Q, MR, MC, M, SR, SC, S
 * @param {{source: import("graphql-typed-client").Client<QR, QC, Q, MR, MC, M, SR, SC, S>}} endpoint
 * @param {QR} query
 * @returns {Promise<Result.Result<Failure, Q>>}
 */
export const query = async ({ source }, query) =>
  asResult(await source.query(query))

/**
 * @template QR, QC, Q, MR, MC, M, SR, SC, S
 * @param {{source: import("graphql-typed-client").Client<QR, QC, Q, MR, MC, M, SR, SC, S>}} endpoint
 * @param {MR} request
 * @returns {Promise<Result.Result<Failure, M>>}
 */
export const mutate = async ({ source }, request) =>
  asResult(await source.mutation(request))

/**
 * @template T
 * @param {import('graphql').ExecutionResult<T>} input
 * @returns {Result.Result<Failure, T>}
 */

const asResult = (input) => {
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
    return this.errors.map((error) => error.message).join('\n')
  }
}
