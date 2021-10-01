import { script } from 'subprogram'
import * as Migration from '../migrate.js'
import { Get, Var, Lambda, Let, Select, If, IsNull } from '../fauna.js'

export const query = Lambda(
  ['ref'],
  Let(
    {
      nil: null,
      resource: Get(Var('ref')),
      content_ref: Select(['data', 'content'], Var('resource'), Var('nil')),
      content_cid: If(
        IsNull(Var('content_ref')),
        null,
        Select(['data', 'cid'], Get(Var('content_ref')))
      ),
    },
    {
      ts: Select('ts', Var('resource')),
      ref: Var('ref'),
      resource: Var('resource'),
      data: {
        uri: Select(['data', 'uri'], Var('resource')),
        status: Select(['data', 'status'], Var('resource')),
        status_text: Select(['data', 'statusText'], Var('resource')),
        ipfs_url: Select(['data', 'ipfsURL'], Var('resource'), Var('nil')),
        content_cid: Var('content_cid'),
        inserted_at: Select(['data', 'created'], Var('resource'), Var('nil')),
      },
    }
  )
)

/**
 * @typedef {{
 *   uri: string
 *   ipfs_url: string | null
 *   content_cid: string | null
 *   status: import('../../gen/db/schema').ResourceStatus,
 *   status_text: string
 *   inserted_at: import('faunadb').values.FaunaTime | null
 * }} Resource
 *
 * @param {Migration.Document<Resource>} document
 */
const insert = ({
  ts,
  data: { uri, content_cid, ipfs_url, status, status_text, inserted_at },
}) => ({
  uri,
  ipfs_url,
  content_cid,
  status,
  status_text,
  // If created time isn't recorded we just derive it from `ts`.
  inserted_at: inserted_at ? inserted_at.date : Migration.fromTimestamp(ts),
  updated_at: Migration.fromTimestamp(ts),
})

/**
 * @param {Migration.Document<Resource>[]} documents
 * @returns {Migration.Mutation}
 */
export const mutation = (documents) => ({
  insert_resource_view: [
    {
      objects: documents.map(insert),
    },
    {
      affected_rows: true,
    },
  ],
})

export const main = () =>
  Migration.start({ collection: 'Resource', mutation, query })

script({ ...import.meta, main })
