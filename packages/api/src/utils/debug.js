import Toucan from 'toucan-js'
import { secrets } from '../constants.js'
import pkg from '../../package.json'
import _debug from 'debug'

_debug.enable(DEBUG)

/**
 * @param {string} name
 */
export function debug(name) {
  return _debug(name)
}

/**
 * @param {any} obj
 */
export function debugJson(obj) {
  console.log(JSON.stringify(obj))
}

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
 * @param {FetchEvent} event
 */
export function getSentry(event) {
  const sentry = new Toucan({
    event,
    ...sentryOptions,
  })

  return sentry
}

/**
 * @param {ScheduledEvent} event
 */
export function getSentrySchedule(event) {
  const sentry = new Toucan({
    event,
    ...sentryOptions,
  })
  sentry.setUser({ username: 'cron' })
  sentry.addBreadcrumb({
    message: `${event.type} ${new Date(event.scheduledTime)}`,
    category: 'cron',
  })

  return sentry
}
