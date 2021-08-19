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
  Ref,
  Map,
  Do,
} = fauna

export const main = async () => await run(await readConfig())
const MIGRATION_TIME = '2021-08-19T16:23:16.984862Z'

/**
 *
 * @param {{secret:string, cursor?:string, size:number, dryrun: boolean}} config
 */
export const run = async (config) => {
  console.log(`🚧 Performing migration`)

  const client = new Client({ secret: config.secret })
  const cursor = config.cursor
    ? Ref(Collection('TokenAsset', config.cursor))
    : undefined
  const state = { cursor, linked: 0, failed: 0, queued: 0 }

  while (true) {
    // Fetch page of TokenAsset from the db.
    let { after, data } = /** @type {{after:fauna.Expr|null, data:any[]}} */ (
      await client.query(
        Map(
          Paginate(Documents(Collection('TokenAsset')), {
            size: config.size,
            after: state.cursor,
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

      switch (tokenAsset.status) {
        case 'Linked':
          state.linked += 1
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
          state.queued += 1
          expressions.push(
            Create(Collection('ScheduledAnalyze'), {
              data: {
                tokenAsset: tokenAsset.ref,
                attempt: 1,
              },
            })
          )
          break
        default:
          state.failed += 1
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

    // If there was nothing we're done
    if (expressions.length === 0 || after === null) {
      console.log('🏁 Migration is complete', state)
      break
    } else {
      if (!config.dryrun) {
        await client.query(Do(expressions))
      }
      state.cursor = after
      console.log('⏭ Moving to next page', state)
    }
  }
}

script({ ...import.meta, main })
