import settle from 'p-settle'

/**
 * @typedef {import('pg').Client} Client
 * @typedef {{ name: string, value: number }} Metric
 */

const COUNT_USERS = 'SELECT COUNT(*) AS total FROM public.user'

const COUNT_UPLOADS = 'SELECT COUNT(*) AS total FROM upload WHERE type = $1'

const COUNT_PINS =
  'SELECT COUNT(*) AS total FROM pin WHERE service = $1 AND status = $2'

const UPDATE_METRIC = `
INSERT INTO metric (name, value, updated_at)
     VALUES ($1, $2, NOW())
ON CONFLICT (name) DO UPDATE
        SET value = $2, updated_at = NOW()
`

const UPLOAD_TYPES = ['Car', 'Blob', 'Multipart', 'Remote', 'Nft']
const PIN_SERVICES = ['IpfsCluster2', 'IpfsCluster', 'Pinata']
const PIN_STATUSES = ['PinQueued', 'Pinning', 'Pinned', 'PinError']

/**
 * Calculate metrics and update their current values in the DB.
 *
 * @param {{ pg: Client, roPg: Client }} config
 */
export async function updateMetrics({ pg, roPg }) {
  const metrics = await settle([
    getUsersCount(roPg),
    ...UPLOAD_TYPES.map((t) => getUploadsCount(roPg, t)),
    ...PIN_SERVICES.map((svc) =>
      PIN_STATUSES.map((s) => getPinsCount(roPg, svc, s))
    ).flat(),
  ])

  let error
  for (const promise of metrics) {
    if (promise.isRejected) {
      error = error || promise.reason
      console.error(promise.reason)
      continue
    }
    const metric = promise.value
    await pg.query(UPDATE_METRIC, [metric.name, metric.value])
  }

  if (error) throw error
}

/**
 * @param {Client} pg
 * @returns {Promise<Metric>}
 */
async function getUsersCount(pg) {
  const { rows } = await pg.query(COUNT_USERS)
  if (!rows.length) throw new Error('no rows returned counting users')
  return { name: 'users_total', value: rows[0].total }
}

/**
 * @param {Client} pg
 * @param {string} type
 * @returns {Promise<Metric>}
 */
async function getUploadsCount(pg, type) {
  const { rows } = await pg.query(COUNT_UPLOADS, [type])
  if (!rows.length) throw new Error(`no rows returned counting ${type} uploads`)
  return { name: `uploads_${type.toLowerCase()}_total`, value: rows[0].total }
}

/**
 * @param {Client} pg
 * @param {string} service
 * @param {string} status
 * @returns {Promise<Metric>}
 */
async function getPinsCount(pg, service, status) {
  const { rows } = await pg.query(COUNT_PINS, [service, status])
  if (!rows.length)
    throw new Error(`no rows returned counting ${service} ${status} pins`)
  return {
    name: `uploads_${service.toLowerCase()}_${status.toLowerCase()}_total`,
    value: rows[0].total,
  }
}
