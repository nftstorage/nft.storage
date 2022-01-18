/**
 * @param {Error & {status?: number;code?: string;}} err
 * @param {import('./env').Env} env
 */
export function errorHandler(err, env) {
  console.error(err.stack)

  const status = err.status || 500

  if (env.sentry && status >= 500) {
    env.sentry.captureException(err)
  }

  return new Response(err.message || 'Server Error', { status })
}
