import { DBClient } from './db-client.js'
import { getSentry } from './debug.js'
import { secrets, database } from '../constants.js'

const db = new DBClient(database.url, secrets.database)

/**
 * Obtains a route context object.
 *
 * @param {FetchEvent} event
 * @param {Record<string, string>} params Parameters from the URL
 * @returns {import('../bindings').RouteContext}
 */
export function getContext(event, params) {
  const sentry = getSentry(event)
  return { params, sentry, db }
}
