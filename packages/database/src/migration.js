import fs from 'fs'
import fetch from '@web-std/fetch'
import { clientGenerator } from '@fauna-labs/fauna-schema-migrate/dist/util/fauna-client.js'
import migrations from '@fauna-labs/fauna-schema-migrate/dist/migrations/advance.js'
import taskMigrate from '@fauna-labs/fauna-schema-migrate/dist/tasks/migrate.js'
import taskApply from '@fauna-labs/fauna-schema-migrate/dist/tasks/apply.js'
import * as files from '@fauna-labs/fauna-schema-migrate/dist/util/files.js'
import { config } from '@fauna-labs/fauna-schema-migrate/dist/util/config.js'
import { evalFQLCode as readFQL } from '@fauna-labs/fauna-schema-migrate/dist/fql/eval.js'
import prettier from 'prettier'
import * as Fauna from './fauna.js'

const tasks = {
  /** @type {typeof taskMigrate} */
  // @ts-ignore - types do not have default.
  migrate: taskMigrate.default,
  /** @type {typeof taskApply} */
  // @ts-ignore - types do not have default.
  apply: taskApply.default,
}

/**
 * @typedef {import('faunadb').ClientConfig} Config
 */

/**
 * @template T
 * @param {Config} config
 * @param {() => T} fn
 * @returns {T}
 */
const withConfig = (config, fn) => {
  process.env['FAUNA_ADMIN_KEY'] = config.secret
  return fn()
}

/**
 * Returns list of schema migrations that have not been applied yet.
 * @param {Config} config
 */
export const unappliedMigrations = (config) =>
  withConfig(config, async () => {
    const { allCloudMigrations, allLocalMigrations } =
      await migrations.retrieveMigrationInfo(await clientGenerator.getClient())

    const local = new Set(allLocalMigrations)
    for (const migration of allCloudMigrations) {
      local.delete(migration.timestamp)
    }

    return local
  })

/**
 * Generates new migration from changes in the fauna/resources directory.
 *
 * @param {Config} config
 * @param {string} schema
 */
export const generateMigrtation = async (config, schema) =>
  withConfig(config, async () => {
    const old = await getLastMigrationURL()
    await tasks.migrate()
    const base = await getLastMigrationURL()
    if (base && base.href != old?.href) {
      await fs.promises.writeFile(new URL('schema.graphql', base), schema)
      return base
    }
    return null
  })

/**
 * Applies migrations from fauna/migrations directory to the data base.s
 *
 * @param {Config} config
 */
export const applyMigrations = async (config) =>
  withConfig(config, () => tasks.apply('all'))

/**
 * @param {Config} config
 * @param {string} schema
 */
export const uploadSchema = async (config, schema) => {
  console.log('🏗 Uploading GraphQL Schema to be merged into Fauna DB')
  const response = await fetch('https://graphql.fauna.com/import', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${config.secret}`,
    },
    body: schema,
  })
  if (response.ok) {
    console.log(`🎉 Schema upload succeeded`)
  } else {
    console.log(`🚨 Import failed ${response.status}`)
    const reason = await response.text()
    throw Error(`Schema import failed ${response.status} ${reason}`)
  }
}

export const migrationsBase = async () =>
  new URL(`${await config.getMigrationsDir()}/`, baseURL())

export const resourcesBase = async () =>
  new URL(`${await config.getResourcesDir()}/`, baseURL())

export const baseURL = () => new URL(`${process.cwd()}/`, import.meta.url)

export const migrationsCollectionName = () => config.getMigrationCollection()

/**
 * Returns file URL for last migration or `null` if no migrations
 * are present.
 *
 * @returns {Promise<URL|null>}
 */
export const getLastMigrationURL = async () => {
  const revisions = await files.retrieveAllMigrations()
  const last = revisions.sort().pop()
  return last
    ? new URL(`${last.replace(/:/g, '_')}/`, await migrationsBase())
    : null
}

export const readLastSchema = async () => {
  const base = await getLastMigrationURL()
  const url = base ? new URL('schema.graphql', base) : null
  return url ? await fs.promises.readFile(url, { encoding: 'utf8' }) : ''
}

export const readCurrentSchema = async () => {
  const url = new URL('schema.graphql', await resourcesBase())
  const source = await fs.promises.readFile(url, { encoding: 'utf8' })
  return prettier.format(source, {
    parser: 'graphql',
  })
}

/**
 * @typedef {'Function'|'Collection'|'Index'} ResourceType
 *
 * @param {ResourceType} type
 * @param {string} name
 * @returns {Promise<URL>}
 */

export const resolveResourceURL = async (type, name) =>
  new URL(`./${type}/${name}.fql`, await resourcesBase())

/**
 * @param {URL} url
 * @returns {Promise<Fauna.Expr|null>}>
 */
export const readResource = async (url) => {
  try {
    return readFQL(await fs.promises.readFile(url, 'utf-8'))
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null
    } else {
      throw error
    }
  }
}

/**
 * @param {URL} url
 * @returns {Fauna.Expr|null}>
 */
export const readResourceSync = (url) => {
  try {
    return readFQL(fs.readFileSync(url, 'utf-8'))
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null
    } else {
      throw error
    }
  }
}

/**
 * @param {URL} url
 * @param {Fauna.Expr} exp
 */
export const writeResource = async (url, exp) =>
  await fs.promises.writeFile(
    url,
    prettier.format(Fauna.Expr.toString(exp), {
      parser: 'babel',
      semi: false,
      singleQuote: true,
    })
  )

/**
 * @param {Config} config
 */
export const importCollections = async (config) =>
  await importFrom(
    config,
    Fauna.Collections(),
    createCollection,
    (_previous, next) => next,
    'Collection',
    { ignore: new Set([await migrationsCollectionName()]) }
  )

/**
 * @param {Config} config
 */
export const importIndexes = async (config) =>
  await importFrom(
    config,
    Fauna.Indexes(),
    createIndex,
    // can not update indexes so merge is no-op
    (previous, _next) => previous,
    'Index'
  )

/**
 * @param {Config} config
 */
export const importFunctions = async (config) =>
  await importFrom(
    config,
    Fauna.Functions(),
    createFunction,
    // if we update functions we will loose all the comments which is not
    // worth it. Instead we just retain current version.
    (previous, _next) => previous,
    'Function'
  )

/**
 * Pulls all collections/indexes/functions from the fauna db and writes it into
 * `../fauna/resources/` witch a matching name. Unless `options.overwrite` is
 * `true` it will not overwrite existing files.
 *
 * @template {Fauna.Expr} T
 * @param {Config} config
 * @param {Fauna.Expr} source
 * @param {(param:any) => T} create
 * @param {(before:T, after:T) => T} merge
 * @param {ResourceType} type
 * @param {{ignore?:Set<string>}} [options]
 */
const importFrom = (
  config,
  source,
  create,
  merge,
  type,
  { ignore = new Set() } = {}
) =>
  withConfig(config, async () => {
    const client = await clientGenerator.getClient()
    const baseURL = await resourcesBase()

    /** @type {Promise<any>[]} */
    const promises = []

    const pages = client.paginate(source).map((ref) => Fauna.Get(ref))
    /** @type {string[]} */
    const failed = []

    await pages.each((page) => {
      for (const doc of /** @type{any[]} */ (page)) {
        if (!ignore.has(doc.name)) {
          const url = new URL(`./${type}/${doc.name}.fql`, baseURL)
          const previous = /** @type {null|T} */ (readResourceSync(url))
          const next = create(doc)
          const current = previous != null ? merge(previous, next) : next
          if (current != previous) {
            const promise = writeResource(url, current).catch((_error) => {
              failed.push(doc.name)
            })

            promises.push(promise)
          }
        }
      }
    })

    await Promise.all(promises)
    if (failed.length != 0) {
      throw new Error(`Failed to write ${failed.join(', ')}`)
    }
  })

/**
 * @param {Fauna.CreateFunctionParam} input
 */
const createFunction = ({ name, body, data, role }) =>
  Fauna.CreateFunction({
    name,
    body,
    ...withoutGQLTimestamp(data),
    ...(role && { role }),
  })

/**
 * @param {Fauna.CreateFunctionExpr} before
 * @param {Fauna.CreateFunctionExpr} after
 */
export const mergeFunctions = (before, after) => {
  const { name, body } = before.toJSON().create_function.toJSON().object
  const { data, role } = after.toJSON().create_function.toJSON().object
  return createFunction({ name, body, data, role })
}

/**
 * @param {Fauna.CreateCollectionParam} input
 */
const createCollection = ({
  name,
  data,
  history_days,
  ttl_days,
  permissions,
}) =>
  Fauna.CreateCollection({
    name,
    ...withoutGQLTimestamp(data),
    ...(history_days !== undefined && { history_days }),
    ...(ttl_days !== undefined && { ttl_days }),
    ...(permissions !== undefined && { permissions }),
  })

/**
 * @param {Fauna.CreateIndexParam} input
 * @returns
 */
const createIndex = ({
  name,
  source,
  terms,
  values,
  unique,
  serialized,
  permissions,
  data,
}) =>
  Fauna.CreateIndex({
    name,
    source,
    ...(terms && { terms }),
    ...(values && { values }),
    ...(unique && { unique }),
    ...(serialized && { serialized }),
    ...(permissions && { permissions }),
    ...withoutGQLTimestamp(data),
  })

/**
 * @template {Fauna.fauna.Expr & {gql?:{ts?:any}}} T
 * @param {undefined|T} data
 * @returns {undefined|{data:T}}
 */
const withoutGQLTimestamp = (data) => {
  if (data == null) {
    return undefined
  }
  if (data.gql) {
    delete data.gql.ts
  }
  return { data }
}
