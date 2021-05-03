import Toucan from 'toucan-js'
import { secrets } from '../constants'
const pkg = require('../../package.json')
const _debug = require('debug')

_debug.enable(DEBUG)

/**
 * @param {string} name
 */
export function debug(name) {
  return _debug(name)
}

const sentryOptions = {
  dsn: secrets.sentry,
  allowedHeaders: ['user-agent'],
  allowedSearchParams: /(.*)/,
  debug: false,
  environment: ENV,
  rewriteFrames: {
    root: '/',
  },
  release: `${pkg.name}-${pkg.version}`,
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
