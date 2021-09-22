import { configure } from './config.js'
import * as Hasura from '../gen/db-v2/index.js'
import * as Fauna from './fauna.js'
import * as Result from './result.js'

import {
  Collection,
  Get,
  Var,
  Documents,
  Lambda,
  Paginate,
  Map,
  Ref,
} from './fauna.js'

/**
 * @typedef {{
 *   batchSize:number,
 *   budget: number,
 *   dryRun: boolean,
 *   fauna: Fauna.Config
 *   hasura: Hasura.Config
 * }} Config
 *
 * @typedef {Hasura.schema.niftysave_migration} Migration
 * @typedef {import('faunadb').Expr} Query
 * @typedef {Hasura.schema.mutation_rootRequest} Mutation
 */

/**
 * @template T
 * @typedef {import('faunadb').values.Document<T>} Document
 */

/**
 * @template T
 * @typedef {{
 *   collection: string
 *   query?: Query
 *   mutation: (input:T[]) => Mutation
 * }} MigrationConfig
 */
/**
 * @template T
 * @param {MigrationConfig<T>} options
 */
export const start = async ({ collection, query, mutation }) =>
  migrate({ ...(await configure()), collection, mutation, query })

/**
 * @template T
 * @param {Config & MigrationConfig<T> } config
 */
export const migrate = async (config) => {
  console.log(`🚧 Performing migration`)
  const deadline = Date.now() + config.budget
  const state = await init(config)
  while (state.cursor !== '' && deadline - Date.now() > 0) {
    console.log(state)

    let { after = [{ id: '' }], data } =
      /** @type {{after?:[{id:string}], data:T[]}} */ (
        await Fauna.query(
          config.fauna,
          Map(
            Paginate(Documents(Collection(config.collection)), {
              size: config.batchSize,
              after: state.cursor
                ? Ref(Collection(config.collection), state.cursor)
                : undefined,
            }),
            config.query || Lambda(['ref'], Get(Var('ref')))
          )
        )
      )

    if (data.length > 0 && !config.dryRun) {
      const { cursor } = await writeMigrationState(
        config,
        {
          cursor: after[0].id,
          metadata: {},
        },
        config.mutation(data)
      )
      state.cursor = cursor
    }

    // If there was nothing we're done
    if (data.length === 0) {
      break
    } else {
      console.log('⏭ Page migrated', state)
    }
  }

  if (state.cursor === '') {
    console.log('🏁 Migration is complete', state)
  } else {
    console.log('⌛️ Finish migration, time is up')
  }
}

/**
 * @param {{hasura: Hasura.Config, collection:string}} config
 */
const init = async (config) => {
  const state =
    (await readMigrationState(config)) ||
    (await writeMigrationState(config, {
      cursor: null,
      metadata: {},
    }))

  return state
}

/**
 * @param {{hasura: Hasura.Config, collection: string}} config
 */
const readMigrationState = async ({ hasura, collection }) => {
  const result = await Hasura.query(hasura, {
    niftysave_migration_by_pk: [
      {
        id: `fauna-${collection}`,
      },
      {
        cursor: 1,
        collection: 1,
        metadata: 1,
      },
    ],
  })

  return Result.value(result).niftysave_migration_by_pk
}

/**
 * @param {{hasura: Hasura.Config, collection:string}} config
 * @param {{cursor:string|null, metadata:object|null}} data
 * @param {Hasura.schema.mutation_rootRequest} [mutation]
 */
const writeMigrationState = async (
  { hasura, collection },
  { cursor, metadata },
  mutation
) => {
  const result = await Hasura.mutation(hasura, {
    ...mutation,
    insert_niftysave_migration_one: [
      {
        object: {
          id: `fauna-${collection}`,
          collection,
          cursor,
          metadata,
        },
        on_conflict: {
          constraint:
            Hasura.schema.niftysave_migration_constraint
              .niftysave_migration_pkey,
          update_columns: [
            Hasura.schema.niftysave_migration_update_column.cursor,
            Hasura.schema.niftysave_migration_update_column.collection,
            Hasura.schema.niftysave_migration_update_column.metadata,
          ],
        },
      },
      {
        cursor: 1,
        collection: 1,
        metadata: 1,
      },
    ],
  })

  const value = Result.value(result).insert_niftysave_migration_one
  if (value == null) {
    throw new Error('Invalid result')
  }

  return value
}

/**
 * Takes timestamp from fauana document and turns it into a JS date.
 *
 * @param {number} ts - Timestamp of the fauna doucemnt
 * @returns {Date}
 * @see https://docs.fauna.com/fauna/current/api/fql/documents
 */
export const fromTimestamp = (ts) => new Date(ts / 1000)

export const schema = Hasura.schema
