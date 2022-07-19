import debug from 'debug'

const COUNT_CONTENT_WITHOUT_SIZE = `
SELECT COUNT(*)
  FROM public.content
 WHERE (dag_size IS NULL OR dag_size = 0)
   AND inserted_at > $1
`

const FIND_CONTENT_WITHOUT_SIZE = `
SELECT cid
  FROM public.content
 WHERE (dag_size IS NULL OR dag_size = 0)
   AND inserted_at > $1
OFFSET $2
 LIMIT $3
`

const FIND_DAG_SIZES = `
SELECT cid_v1,
       size_actual
  FROM cargo.dags
 WHERE size_actual IS NOT NULL
   AND cid_v1 = ANY ($1)
`

const UPDATE_CONTENT_DAG_SIZE = `
UPDATE public.content
   SET dag_size = $1,
       updated_at = timezone('utc'::TEXT, NOW())
 WHERE cid = $2
`

/**
 * Sets dag_size for content that does not yet have a size.
 *
 * @param {{ pg: import('pg').Client, after: Date }} config
 */
export async function updateDagSizes({ pg, after }) {
  const log = debug('dagcargo:updateDagSizes')
  if (!log.enabled) {
    console.log('ℹ️ Enable logging by setting DEBUG=dagcargo:updateDagSizes')
  }

  log(`🎯 Updating DAG sizes for content inserted after ${after.toISOString()}`)

  /** @type {import('pg').QueryResult<{ count: number }> } */
  const countRes = await pg.query(COUNT_CONTENT_WITHOUT_SIZE, [
    after.toISOString(),
  ])
  const total = countRes.rows[0].count
  log(`ℹ️ ${total} records without dag_size`)

  let offset = 0
  const limit = 1000
  while (true) {
    /** @type {import('pg').QueryResult<{ cid: string }>} */
    const { rows: contents } = await pg.query(FIND_CONTENT_WITHOUT_SIZE, [
      after.toISOString(),
      offset,
      limit,
    ])
    if (!contents.length) break

    const cids = contents.map((c) => c.cid)
    /** @type {import('pg').QueryResult<{ cid_v1: string, size_actual: number }>} */
    const { rows: sizes } = await pg.query(FIND_DAG_SIZES, [cids])

    for (const s of sizes) {
      log(`💪 ${s.cid_v1} ${String(s.size_actual)} bytes`)
      await pg.query(UPDATE_CONTENT_DAG_SIZE, [s.size_actual, s.cid_v1])
    }

    log(`ℹ️ ${offset + contents.length} of ${total} processed in total`)
    offset += limit
  }

  log('✅ Done')
}
