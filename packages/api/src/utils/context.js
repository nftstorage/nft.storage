import Toucan from 'toucan-js'
import { DBClient } from './db-client.js'
import { secrets, database, isDebug } from '../constants.js'
import { Logging } from './logs.js'
import pkg from '../../package.json'

const db = new DBClient(database.url, secrets.database)

const sentryOptions = {
  dsn: secrets.sentry,
  allowedHeaders: ['user-agent', 'x-client'],
  allowedSearchParams: /(.*)/,
  debug: false,
  environment: ENV,
  rewriteFrames: {
    root: '/',
  },
  release: VERSION,
  pkg,
}

/**
 * Obtains a route context object.
 *
 * @param {FetchEvent} event
 * @param {Record<string, string>} params Parameters from the URL
 * @returns {import('../bindings').RouteContext}
 */
export function getContext(event, params) {
  const sentry = new Toucan({
    event,
    ...sentryOptions,
  })
  const log = new Logging(event, {
    token: secrets.logtail,
    debug: isDebug,
    sentry,
  })
  return { params, db, log }
}
