import { Chain } from '../gen/hasura/zeus/index.js'
import * as schema from '../gen/hasura/zeus/index.js'
import { create } from './service.js'
import fetch from '@web-std/fetch'
// @ts-ignore - zeus client expects global fetch.
global.fetch = fetch
/**
 * @typedef {import('../gen/hasura/zeus/index').ValueTypes} ValueTypes
 * @typedef {ValueTypes['query_root']} Query
 * @typedef {ValueTypes['mutation_root']} Mutation
 * @typedef {ValueTypes['subscription_root']} Subscription
 * @typedef {Object} Config
 * @property {string|URL} url
 * @property {Record<string, string>} [headers]
 * @param {Config} config
 */
const connect = (config) => Chain(config.url.toString(), config)
export const service = create(connect)

/**
 * @template {Parameters<ReturnType<typeof service>['query']>[0]} R
 * @param {Config} config
 * @param {R} request
 * @returns
 */
export const query = (config, request) => service(config).query(request)

/**
 * @template {Parameters<ReturnType<typeof service>['mutation']>[0]} R
 * @param {Config} config
 * @param {R} request
 */
export const mutation = (config, request) => service(config).mutation(request)

/**
 * @template {Parameters<ReturnType<typeof service>['subscription']>[0]} R
 * @param {Config} config
 * @param {R} request
 */
export const subscriptions = (config, request) =>
  service(config).subscription(request)

export { schema }
