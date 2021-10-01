import { script } from 'subprogram'
import * as Migration from '../migrate.js'
import { Get, Var, Lambda, Let, Select } from '../fauna.js'

const query = Lambda(
  ['ref'],
  Let(
    {
      metadata: Get(Var('ref')),
      image: Get(Select(['data', 'image'], Var('metadata'))),
      content: Get(Select(['data', 'content'], Var('metadata'))),
    },
    {
      ref: Var('ref'),
      ts: Select('ts', Var('metadata')),
      data: {
        name: Select(['data', 'name'], Var('metadata')),
        description: Select(['data', 'description'], Var('metadata')),
        image_uri: Select(['data', 'uri'], Var('image')),
        content_cid: Select(['data', 'cid'], Var('content')),
      },
    }
  )
)

/**
 * @param {Migration.Document<Metadata>[]} documents
 * @returns {Migration.Mutation}
 */
export const mutation = (documents) => ({
  __alias: Object.fromEntries(documents.map(add)),
})

/**
 * @typedef {{
 *    name: string
 *    description: string
 *    image_uri: string
 *    content_cid: string
 * }} Metadata
 *
 * @param {Migration.Document<Metadata>} doc
 * @param {number} index
 * @returns {[number, Migration.Mutation]}
 */
const add = (doc, index) => [
  index,
  {
    add_nft_metadata: [
      { args: insert(doc) },
      {
        content_cid: true,
      },
    ],
  },
]

/**
 * @param {Migration.Document<Metadata>} document
 */
const insert = ({
  ts,
  data: { name, description, image_uri, content_cid },
}) => ({
  name,
  description,
  image_uri,
  content_cid,
  inserted_at: Migration.fromTimestamp(ts),
})

export const main = () =>
  Migration.start({ collection: 'Metadata', mutation, query })

script({ ...import.meta, main })
