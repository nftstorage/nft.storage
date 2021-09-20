import * as Service from './service.js'
import fauna from 'faunadb'

const {
  Client,
  Ref,
  Expr,
  Create,
  Collection,
  Get,
  Var,
  Documents,
  Lambda,
  Paginate,
  Call,
  Update,
  Now,
  Map,
  Do,
} = fauna

export {
  Create,
  Expr,
  Collection,
  Get,
  Var,
  Documents,
  Lambda,
  Paginate,
  Call,
  Update,
  Now,
  Map,
  Do,
  Ref,
}

/**
 * @typedef {import('faunadb').ClientConfig} Config
 * @param {Config} config
 * @returns {import('faunadb').Client}
 */

const connect = (config) => new Client({ secret: config.secret })
const service = Service.create(connect)

/**
 *
 * @param {Config} config
 * @param {import('faunadb').Expr} expr
 * @param {import('faunadb').QueryOptions} [options]
 */
export const query = (config, expr, options) =>
  service(config).query(expr, options)
