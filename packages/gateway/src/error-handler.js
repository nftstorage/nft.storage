/**
 * @param {Error & {status?: number;code?: string;}} err
 */
export function errorHandler(err) {
  // TODO: setup sentry
  console.error(err.stack)

  let status = err.status || 500

  return new Response(err.message || 'Server Error', { status })
}
