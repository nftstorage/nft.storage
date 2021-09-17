import { script } from 'subprogram'
import { configure } from './config.js'
import * as Hasura from '../gen/db-v2/index.js'
import * as Fauna from './fauna.js'
import * as Result from './result.js'
import {
  Create,
  Collection,
  Get,
  Var,
  Documents,
  Lambda,
  Paginate,
  Call,
  Expr,
  Update,
  Now,
  Map,
  Ref,
  Do,
} from './fauna.js'

export const main = async () => await migrate(await configure(), 'Content')

/**
 * @typedef {{
 *   batchSize:number,
 *   budget: number,
 *   dryRun: boolean,
 *   fauna: Fauna.Config
 *   hasura: Hasura.Config
 * }} Config
 * @param {Config} config
 * @param {string} collection
 */
export const migrate = async (config, collection) => {
  console.log(`🚧 Performing migration`)
  const deadline = Date.now() + config.budget
  const state = await init2(config, collection)
  while (state.cursor !== '' && deadline - Date.now() > 0) {
    console.log(state)

    let {
      after = [{ id: '' }],
      data,
    } = /** @type {{after?:[{id:string}], data:any[]}} */ (await Fauna.query(
      config.fauna,
      Map(
        Paginate(Documents(Collection(collection)), {
          size: config.batchSize,
          after: state.cursor
            ? Ref(Collection(collection), state.cursor)
            : undefined,
        }),
        Lambda(['ref'], Get(Var('ref')))
      )
    ))
    const inserts = []
    for (const {
      data: { cid, dagSize, created },
    } of data) {
      inserts.push({
        cid,
        dag_size: dagSize || null,
        inserted_at: created.value,
      })
    }

    state.cursor = after[0].id
    if (inserts.length > 0 && !config.dryRun) {
      const result = await Hasura.mutation(config.hasura, {
        insert_content: [
          {
            objects: inserts,
          },
          {
            affected_rows: 1,
          },
        ],
        insert_niftysave_migration_one: [
          {
            object: {
              id: `fauna-${collection}`,
              collection,
              cursor: state.cursor,
              metadata: {},
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

      if (!result.ok) {
        console.log(`💣 Failed to insert into db, aborting`)
        return
      }
    }
    // If there was nothing we're done
    if (inserts.length === 0) {
      break
    } else {
      console.log('⏭ Page migrated', {
        cursor: state.cursor,
      })
    }
  }
  if (state.cursor === '') {
    console.log('🏁 Migration is complete', state)
  } else {
    console.log('⌛️ Finish migration, time is up')
  }
}

/**
 * @param {{hasura: Hasura.Config}} config
 * @param {string} collection
 */
const init2 = async (config, collection) => {
  const state =
    (await readMigrationState(config, collection)) ||
    (await writeMigrationState(config, {
      collection,
      cursor: null,
      metadata: {},
    }))

  return state
}

/**
 * @param {{hasura: Hasura.Config}} config
 * @param {string} collection
 */
const readMigrationState = async ({ hasura }, collection) => {
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
 * @param {{hasura: Hasura.Config}} config
 * @param {{collection:string, cursor:string|null, metadata:object|null}} data
 */
const writeMigrationState = async (
  { hasura },
  { collection, cursor, metadata }
) => {
  const result = await Hasura.mutation(hasura, {
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

script({ ...import.meta, main })
