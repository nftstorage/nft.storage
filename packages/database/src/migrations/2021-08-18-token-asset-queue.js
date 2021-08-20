import { script } from 'subprogram'
import readConfig from '../config.js'
import fauna from 'faunadb'

const {
  Client,
  Create,
  Collection,
  Get,
  Var,
  Documents,
  Lambda,
  Paginate,
  Call,
  Update,
  Now,
  Map,
  Do,
} = fauna

export const main = async () => await run(await readConfig())
const MIGRATION_TIME = '2021-08-19T16:23:16.984862Z'
const KEY = 'status-to-queue-migration-2021-08-18'

/**
 * @typedef {{
 *   secret:string,
 *   batchSize:number,
 *   budget: number,
 *   dryrun: boolean
 * }} Config
 * @param {Config} config
 */
export const run = async (config) => {
  console.log(`🚧 Performing migration`)

  const deadline = Date.now() + config.budget

  const client = new Client({ secret: config.secret })

  const state = await init(client)

  while (state.data.cursor !== -1 && deadline - Date.now() > 0) {
    // Fetch page of TokenAsset from the db.
    let { after, data } = /** @type {{after:fauna.Expr|null, data:any[]}} */ (
      await client.query(
        Map(
          Paginate(Documents(Collection('TokenAsset')), {
            size: config.batchSize,
            after: state.data.cursor,
          }),
          Lambda(['ref'], Get(Var('ref')))
        )
      )
    )

    // Create a document that corresponds to it's status
    const expressions = []
    for (const tokenAsset of data) {
      // If reached a document that was create after migration has started
      // we're done with a migration. Set `after` to null to stop the job.
      if (tokenAsset.data.created.value > MIGRATION_TIME) {
        after = null
        break
      }

      switch (tokenAsset.data.status) {
        case 'Linked':
          state.data.metadata.linked += 1
          expressions.push(
            Create(Collection('Analyzed'), {
              data: {
                tokenAsset: tokenAsset.ref,
                attempt: 1,
              },
            })
          )
          break
        case 'Queued':
          state.data.metadata.queued += 1
          expressions.push(
            Create(Collection('ScheduledAnalyze'), {
              data: {
                tokenAsset: tokenAsset.ref,
                attempt: 1,
              },
            })
          )
          break
        case 'ContentFetchFailed':
          state.data.metadata.queued += 1
          expressions.push(
            Create(Collection('ScheduledAnalyze'), {
              data: {
                tokenAsset: tokenAsset.ref,
                attempt: 2,
              },
            })
          )
          break
        default:
          state.data.metadata.failed += 1
          expressions.push(
            Create(Collection('FailedAnalyze'), {
              data: {
                tokenAsset: tokenAsset.ref,
                attempt: 1,
                status: tokenAsset.data.status,
                statusText: tokenAsset.data.statusText,
              },
            })
          )
          break
      }
    }

    if (expressions.length > 0) {
      const { linked, failed, queued } = state.data.metadata
      state.data.updated = Now()
      state.data.value = linked + queued + failed
      state.data.cursor = after || -1

      if (!config.dryrun) {
        await client.query(
          Do([
            ...expressions,
            Update(state.ref, {
              data: state.data,
            }),
          ])
        )
      }
    }

    // If there was nothing we're done
    if (expressions.length === 0) {
      break
    } else {
      console.log('⏭ Page migrated', {
        ...state.data.metadata,
        cursor: state.data.cursor,
      })
    }
  }

  if (state.data.cursor === -1) {
    console.log('🏁 Migration is complete', state.data.metadata)
  } else {
    console.log('⌛️ Finish migration, time is up')
  }
}

/**
 * @typedef {{
 *  ref: fauna.Exp
 *  data: {
 *    value: number
 *    updated: fauna.Expr
 *    metadata: {
 *      queued: number
 *      linked: number
 *      failed: number
 *    }
 *    cursor: fauna.Expr | undefined | -1
 *  }
 * }} State
 *
 * @param {fauna.Client} client
 * @returns {Promise<State>}
 */
const init = async (client) => {
  const state =
    (await client.query(Call('findMetricByKey', KEY))) ||
    (await client.query(
      Create(Collection('Metric'), {
        data: {
          key: KEY,
          value: 0,
          updated: Now(),
          metadata: { queued: 0, linked: 0, failed: 0 },
          cursor: undefined,
        },
      })
    ))

  return /** @type{State} */ (state)
}

script({ ...import.meta, main })
