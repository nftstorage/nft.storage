import debug from 'debug'

const log = debug('dagcargo:refreshMaterializedViews')

/**
 * Refreshes the materialized views.
 *
 * @param {{ pg: import('pg').Client }} config
 */
export async function refreshMaterializedViews({ pg }) {
  if (!log.enabled) {
    console.log(
      'ℹ️ Enable logging by setting DEBUG=dagcargo:refreshMaterializedViews'
    )
  }

  log(`🔁 REFRESH MATERIALIZED VIEW public.deal;`)
  await pg.query('REFRESH MATERIALIZED VIEW public.deal;')

  log(`🔁 REFRESH MATERIALIZED VIEW public.aggregate;`)
  await pg.query('REFRESH MATERIALIZED VIEW public.aggregate;')

  log(`🔁 REFRESH MATERIALIZED VIEW public.aggregate_entry;`)
  await pg.query('REFRESH MATERIALIZED VIEW public.aggregate_entry;')

  log('✅ Done')
}
