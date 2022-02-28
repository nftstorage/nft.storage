import { UPLOAD_TYPES, PIN_SERVICES, PIN_STATUSES } from '../utils/db-client.js'
import { JSONResponse } from '../utils/json-response.js'

/**
 * TODO: basic auth
 */
/** @type {import('../bindings').Handler} */
export async function metrics(_, { db }) {
  return new Response(await exportPromMetrics(db))
}

/** @type {import('../bindings').Handler} */
export async function getUploadStats(_, { db }) {
  let stats = await db.getUploadStats()

  return new JSONResponse(
    {
      ok: true,
      data: stats,
    },
    { status: 202 }
  )
}

/**
 * Exports metrics in prometheus exposition format.
 * https://prometheus.io/docs/instrumenting/exposition_formats/
 * @param {import('../utils/db-client').DBClient} db
 * @returns {Promise<string>}
 */
async function exportPromMetrics(db) {
  const [usersTotal, contentDagSizeTotal, uploadsMetrics, pinsMetrics] =
    await Promise.all([
      db.getMetric('users_total'),
      db.getMetric('content_dag_size_total'),
      Promise.all(
        UPLOAD_TYPES.map(async (t) => ({
          type: t,
          total: await db.getMetric(`uploads_${t.toLowerCase()}_total`),
        }))
      ),
      Promise.all(
        PIN_SERVICES.map(async (svc) => ({
          service: svc,
          totals: await Promise.all(
            PIN_STATUSES.map(async (s) => {
              const name = `pins_${svc.toLowerCase()}_${s.toLowerCase()}_total`
              return { status: s, total: await db.getMetric(name) }
            })
          ),
        }))
      ),
    ])

  return [
    '# HELP nftstorage_users_total Total users registered.',
    '# TYPE nftstorage_users_total counter',
    `nftstorage_users_total ${usersTotal || 0}`,

    '# HELP nftstorage_content_bytes_total Total bytes of all root DAGs stored.',
    '# TYPE nftstorage_content_bytes_total counter',
    `nftstorage_content_bytes_total ${contentDagSizeTotal || 0}`,

    '# HELP nftstorage_uploads_total Total number of uploads by type.',
    '# TYPE nftstorage_uploads_total counter',
    ...uploadsMetrics.map(
      ({ type, total }) =>
        `nftstorage_uploads_total{type="${type}"} ${total || 0}`
    ),

    '# HELP nftstorage_pins_total Total number of pins by service and status.',
    '# TYPE nftstorage_pins_total counter',
    ...pinsMetrics.map(({ service, totals }) => {
      return totals
        .map(
          ({ status, total }) =>
            `nftstorage_pins_total{service="${service}",status="${status}"} ${
              total || 0
            }`
        )
        .join('\n')
    }),
  ].join('\n')
}
