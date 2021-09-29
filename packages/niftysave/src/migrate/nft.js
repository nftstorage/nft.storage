import * as Migration from '../migrate.js'

import { Get, Lambda, Let, Select, Var } from '../fauna.js'

import { script } from 'subprogram'

export const query = Lambda(
  ['ref'],
  Let(
    {
      token: Get(Var('ref')),
      contract: Get(Select(['data', 'contract'], Var('token'))),
      owner: Get(Select(['data', 'owner'], Var('token'))),
      tokenAsset: Get(Select(['data', 'tokenAsset'], Var('token'))),
    },
    {
      ts: Select('ts', Var('token')),
      ref: Var('ref'),
      token: Var('token'),
      data: {
        id: Select(['data', 'id'], Var('token')),
        contract_id: Select(['data', 'id'], Var('contract')),
        token_id: Select(['data', 'tokenID'], Var('token')),
        token_uri: Select(['data', 'tokenURI'], Var('tokenAsset')),
        mint_time: Select(['data', 'mintTime'], Var('token')),
        nft_owner_id: Select(['data', 'id'], Var('owner')),
      },
    }
  )
)

/**
 * @typedef {{
 *   id: string
 *   contract_id: string
 *   token_id: string
 *   token_uri: string
 *   mint_time: string
 *   nft_owner_id: string
 * }}
 * NFT
 *
 * @param {Migration.Document<NFT>} document
 */
const insert = ({
  ts,
  data: { id, token_id, token_uri, mint_time, nft_owner_id, contract_id },
}) => ({
  id,
  token_id,
  token_uri,
  mint_time: new Date(parseInt(mint_time.padEnd(13, '0'))),
  nft_owner_id,
  contract_id,
  inserted_at: Migration.fromTimestamp(ts),
})

//this will break the build until we fix the client
/**
 * @param {Migration.Document<NFT>[]} documents
 * @returns { Migration.Mutation}
 */
export const mutation = (documents) => {
  return documents.reduce(
    (acc: Migration.Mutation, doc: Migration.Document<NFT>, index: number) => {
      acc[`nft_${index}`] = { add_nft: insert(doc) }
      return acc
    },
    {}
  )
}
//Object.fromEntries(records.map(rec) => [rec.id, insert(rec)])

export const main = () =>
  Migration.start({ collection: 'Token', mutations, query })

script({ ...import.meta, main })
