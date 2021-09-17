import { Observable } from 'graphql-typed-client'

export interface query_root {
  /** fetch data from the table: "blockchain_block" */
  blockchain_block: blockchain_block[]
  /** fetch aggregated fields from the table: "blockchain_block" */
  blockchain_block_aggregate: blockchain_block_aggregate
  /** fetch data from the table: "blockchain_block" using primary key columns */
  blockchain_block_by_pk: blockchain_block | null
  /** fetch data from the table: "blockchain_contract" */
  blockchain_contract: blockchain_contract[]
  /** fetch aggregated fields from the table: "blockchain_contract" */
  blockchain_contract_aggregate: blockchain_contract_aggregate
  /** fetch data from the table: "blockchain_contract" using primary key columns */
  blockchain_contract_by_pk: blockchain_contract | null
  /** fetch data from the table: "content" */
  content: content[]
  /** fetch aggregated fields from the table: "content" */
  content_aggregate: content_aggregate
  /** fetch data from the table: "content" using primary key columns */
  content_by_pk: content | null
  /** fetch data from the table: "erc721_import" */
  erc721_import: erc721_import[]
  /** fetch aggregated fields from the table: "erc721_import" */
  erc721_import_aggregate: erc721_import_aggregate
  /** fetch data from the table: "erc721_import_by_nft" */
  erc721_import_by_nft: erc721_import_by_nft[]
  /** fetch aggregated fields from the table: "erc721_import_by_nft" */
  erc721_import_by_nft_aggregate: erc721_import_by_nft_aggregate
  /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
  erc721_import_by_nft_by_pk: erc721_import_by_nft | null
  /** fetch data from the table: "erc721_import" using primary key columns */
  erc721_import_by_pk: erc721_import | null
  /** fetch data from the table: "nft" */
  nft: nft[]
  /** fetch aggregated fields from the table: "nft" */
  nft_aggregate: nft_aggregate
  /** fetch data from the table: "nft_asset" */
  nft_asset: nft_asset[]
  /** fetch aggregated fields from the table: "nft_asset" */
  nft_asset_aggregate: nft_asset_aggregate
  /** fetch data from the table: "nft_asset" using primary key columns */
  nft_asset_by_pk: nft_asset | null
  /** fetch data from the table: "nft" using primary key columns */
  nft_by_pk: nft | null
  /** fetch data from the table: "nft_metadata" */
  nft_metadata: nft_metadata[]
  /** fetch aggregated fields from the table: "nft_metadata" */
  nft_metadata_aggregate: nft_metadata_aggregate
  /** fetch data from the table: "nft_metadata" using primary key columns */
  nft_metadata_by_pk: nft_metadata | null
  /** fetch data from the table: "nft_owner" */
  nft_owner: nft_owner[]
  /** fetch aggregated fields from the table: "nft_owner" */
  nft_owner_aggregate: nft_owner_aggregate
  /** fetch data from the table: "nft_owner" using primary key columns */
  nft_owner_by_pk: nft_owner | null
  /** fetch data from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks: nfts_by_blockchain_blocks[]
  /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks_aggregate: nfts_by_blockchain_blocks_aggregate
  /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
  nfts_by_blockchain_blocks_by_pk: nfts_by_blockchain_blocks | null
  /** fetch data from the table: "niftysave_migration" */
  niftysave_migration: niftysave_migration[]
  /** fetch aggregated fields from the table: "niftysave_migration" */
  niftysave_migration_aggregate: niftysave_migration_aggregate
  /** fetch data from the table: "niftysave_migration" using primary key columns */
  niftysave_migration_by_pk: niftysave_migration | null
  /** fetch data from the table: "other_nft_resources" */
  other_nft_resources: other_nft_resources[]
  /** fetch aggregated fields from the table: "other_nft_resources" */
  other_nft_resources_aggregate: other_nft_resources_aggregate
  /** fetch data from the table: "other_nft_resources" using primary key columns */
  other_nft_resources_by_pk: other_nft_resources | null
  /** fetch data from the table: "pin" */
  pin: pin[]
  /** fetch aggregated fields from the table: "pin" */
  pin_aggregate: pin_aggregate
  /** fetch data from the table: "pin" using primary key columns */
  pin_by_pk: pin | null
  /** fetch data from the table: "resource" */
  resource: resource[]
  /** fetch aggregated fields from the table: "resource" */
  resource_aggregate: resource_aggregate
  /** fetch data from the table: "resource" using primary key columns */
  resource_by_pk: resource | null
  __typename: 'query_root'
}

/** select columns of table "blockchain_block" */
export enum blockchain_block_select_column {
  /** column name */
  hash = 'hash',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  number = 'number',
  /** column name */
  updated_at = 'updated_at',
}

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

/** column ordering options */
export enum order_by {
  /** in ascending order, nulls last */
  asc = 'asc',
  /** in ascending order, nulls first */
  asc_nulls_first = 'asc_nulls_first',
  /** in ascending order, nulls last */
  asc_nulls_last = 'asc_nulls_last',
  /** in descending order, nulls first */
  desc = 'desc',
  /** in descending order, nulls first */
  desc_nulls_first = 'desc_nulls_first',
  /** in descending order, nulls last */
  desc_nulls_last = 'desc_nulls_last',
}

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type String = string

/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean = boolean

export type timestamp = any

/** columns and relationships of "blockchain_block" */
export interface blockchain_block {
  hash: String
  inserted_at: timestamp
  number: Int
  updated_at: timestamp
  __typename: 'blockchain_block'
}

/** aggregated selection of "blockchain_block" */
export interface blockchain_block_aggregate {
  aggregate: blockchain_block_aggregate_fields | null
  nodes: blockchain_block[]
  __typename: 'blockchain_block_aggregate'
}

/** aggregate fields of "blockchain_block" */
export interface blockchain_block_aggregate_fields {
  avg: blockchain_block_avg_fields | null
  count: Int
  max: blockchain_block_max_fields | null
  min: blockchain_block_min_fields | null
  stddev: blockchain_block_stddev_fields | null
  stddev_pop: blockchain_block_stddev_pop_fields | null
  stddev_samp: blockchain_block_stddev_samp_fields | null
  sum: blockchain_block_sum_fields | null
  var_pop: blockchain_block_var_pop_fields | null
  var_samp: blockchain_block_var_samp_fields | null
  variance: blockchain_block_variance_fields | null
  __typename: 'blockchain_block_aggregate_fields'
}

/** aggregate avg on columns */
export interface blockchain_block_avg_fields {
  number: Float | null
  __typename: 'blockchain_block_avg_fields'
}

/** The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point). */
export type Float = number

/** aggregate max on columns */
export interface blockchain_block_max_fields {
  hash: String | null
  inserted_at: timestamp | null
  number: Int | null
  updated_at: timestamp | null
  __typename: 'blockchain_block_max_fields'
}

/** aggregate min on columns */
export interface blockchain_block_min_fields {
  hash: String | null
  inserted_at: timestamp | null
  number: Int | null
  updated_at: timestamp | null
  __typename: 'blockchain_block_min_fields'
}

/** aggregate stddev on columns */
export interface blockchain_block_stddev_fields {
  number: Float | null
  __typename: 'blockchain_block_stddev_fields'
}

/** aggregate stddev_pop on columns */
export interface blockchain_block_stddev_pop_fields {
  number: Float | null
  __typename: 'blockchain_block_stddev_pop_fields'
}

/** aggregate stddev_samp on columns */
export interface blockchain_block_stddev_samp_fields {
  number: Float | null
  __typename: 'blockchain_block_stddev_samp_fields'
}

/** aggregate sum on columns */
export interface blockchain_block_sum_fields {
  number: Int | null
  __typename: 'blockchain_block_sum_fields'
}

/** aggregate var_pop on columns */
export interface blockchain_block_var_pop_fields {
  number: Float | null
  __typename: 'blockchain_block_var_pop_fields'
}

/** aggregate var_samp on columns */
export interface blockchain_block_var_samp_fields {
  number: Float | null
  __typename: 'blockchain_block_var_samp_fields'
}

/** aggregate variance on columns */
export interface blockchain_block_variance_fields {
  number: Float | null
  __typename: 'blockchain_block_variance_fields'
}

/** select columns of table "blockchain_contract" */
export enum blockchain_contract_select_column {
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  name = 'name',
  /** column name */
  supports_eip721_metadata = 'supports_eip721_metadata',
  /** column name */
  symbol = 'symbol',
  /** column name */
  updated_at = 'updated_at',
}

/** columns and relationships of "blockchain_contract" */
export interface blockchain_contract {
  id: String
  inserted_at: timestamp
  name: String | null
  supports_eip721_metadata: Boolean
  symbol: String | null
  updated_at: timestamp
  __typename: 'blockchain_contract'
}

/** aggregated selection of "blockchain_contract" */
export interface blockchain_contract_aggregate {
  aggregate: blockchain_contract_aggregate_fields | null
  nodes: blockchain_contract[]
  __typename: 'blockchain_contract_aggregate'
}

/** aggregate fields of "blockchain_contract" */
export interface blockchain_contract_aggregate_fields {
  count: Int
  max: blockchain_contract_max_fields | null
  min: blockchain_contract_min_fields | null
  __typename: 'blockchain_contract_aggregate_fields'
}

/** aggregate max on columns */
export interface blockchain_contract_max_fields {
  id: String | null
  inserted_at: timestamp | null
  name: String | null
  symbol: String | null
  updated_at: timestamp | null
  __typename: 'blockchain_contract_max_fields'
}

/** aggregate min on columns */
export interface blockchain_contract_min_fields {
  id: String | null
  inserted_at: timestamp | null
  name: String | null
  symbol: String | null
  updated_at: timestamp | null
  __typename: 'blockchain_contract_min_fields'
}

/** select columns of table "content" */
export enum content_select_column {
  /** column name */
  cid = 'cid',
  /** column name */
  dag_size = 'dag_size',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  updated_at = 'updated_at',
}

/** columns and relationships of "content" */
export interface content {
  cid: String
  dag_size: Int | null
  inserted_at: timestamp
  updated_at: timestamp
  __typename: 'content'
}

/** aggregated selection of "content" */
export interface content_aggregate {
  aggregate: content_aggregate_fields | null
  nodes: content[]
  __typename: 'content_aggregate'
}

/** aggregate fields of "content" */
export interface content_aggregate_fields {
  avg: content_avg_fields | null
  count: Int
  max: content_max_fields | null
  min: content_min_fields | null
  stddev: content_stddev_fields | null
  stddev_pop: content_stddev_pop_fields | null
  stddev_samp: content_stddev_samp_fields | null
  sum: content_sum_fields | null
  var_pop: content_var_pop_fields | null
  var_samp: content_var_samp_fields | null
  variance: content_variance_fields | null
  __typename: 'content_aggregate_fields'
}

/** aggregate avg on columns */
export interface content_avg_fields {
  dag_size: Float | null
  __typename: 'content_avg_fields'
}

/** aggregate max on columns */
export interface content_max_fields {
  cid: String | null
  dag_size: Int | null
  inserted_at: timestamp | null
  updated_at: timestamp | null
  __typename: 'content_max_fields'
}

/** aggregate min on columns */
export interface content_min_fields {
  cid: String | null
  dag_size: Int | null
  inserted_at: timestamp | null
  updated_at: timestamp | null
  __typename: 'content_min_fields'
}

/** aggregate stddev on columns */
export interface content_stddev_fields {
  dag_size: Float | null
  __typename: 'content_stddev_fields'
}

/** aggregate stddev_pop on columns */
export interface content_stddev_pop_fields {
  dag_size: Float | null
  __typename: 'content_stddev_pop_fields'
}

/** aggregate stddev_samp on columns */
export interface content_stddev_samp_fields {
  dag_size: Float | null
  __typename: 'content_stddev_samp_fields'
}

/** aggregate sum on columns */
export interface content_sum_fields {
  dag_size: Int | null
  __typename: 'content_sum_fields'
}

/** aggregate var_pop on columns */
export interface content_var_pop_fields {
  dag_size: Float | null
  __typename: 'content_var_pop_fields'
}

/** aggregate var_samp on columns */
export interface content_var_samp_fields {
  dag_size: Float | null
  __typename: 'content_var_samp_fields'
}

/** aggregate variance on columns */
export interface content_variance_fields {
  dag_size: Float | null
  __typename: 'content_variance_fields'
}

/** select columns of table "erc721_import" */
export enum erc721_import_select_column {
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  next_id = 'next_id',
  /** column name */
  updated_at = 'updated_at',
}

/** columns and relationships of "erc721_import" */
export interface erc721_import {
  id: String
  inserted_at: timestamp
  next_id: String
  updated_at: timestamp
  __typename: 'erc721_import'
}

/** aggregated selection of "erc721_import" */
export interface erc721_import_aggregate {
  aggregate: erc721_import_aggregate_fields | null
  nodes: erc721_import[]
  __typename: 'erc721_import_aggregate'
}

/** aggregate fields of "erc721_import" */
export interface erc721_import_aggregate_fields {
  count: Int
  max: erc721_import_max_fields | null
  min: erc721_import_min_fields | null
  __typename: 'erc721_import_aggregate_fields'
}

/** aggregate max on columns */
export interface erc721_import_max_fields {
  id: String | null
  inserted_at: timestamp | null
  next_id: String | null
  updated_at: timestamp | null
  __typename: 'erc721_import_max_fields'
}

/** aggregate min on columns */
export interface erc721_import_min_fields {
  id: String | null
  inserted_at: timestamp | null
  next_id: String | null
  updated_at: timestamp | null
  __typename: 'erc721_import_min_fields'
}

/** select columns of table "erc721_import_by_nft" */
export enum erc721_import_by_nft_select_column {
  /** column name */
  erc721_import_id = 'erc721_import_id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  nft_id = 'nft_id',
  /** column name */
  updated_at = 'updated_at',
}

/** columns and relationships of "erc721_import_by_nft" */
export interface erc721_import_by_nft {
  erc721_import_id: String
  inserted_at: timestamp
  nft_id: String
  updated_at: timestamp
  __typename: 'erc721_import_by_nft'
}

/** aggregated selection of "erc721_import_by_nft" */
export interface erc721_import_by_nft_aggregate {
  aggregate: erc721_import_by_nft_aggregate_fields | null
  nodes: erc721_import_by_nft[]
  __typename: 'erc721_import_by_nft_aggregate'
}

/** aggregate fields of "erc721_import_by_nft" */
export interface erc721_import_by_nft_aggregate_fields {
  count: Int
  max: erc721_import_by_nft_max_fields | null
  min: erc721_import_by_nft_min_fields | null
  __typename: 'erc721_import_by_nft_aggregate_fields'
}

/** aggregate max on columns */
export interface erc721_import_by_nft_max_fields {
  erc721_import_id: String | null
  inserted_at: timestamp | null
  nft_id: String | null
  updated_at: timestamp | null
  __typename: 'erc721_import_by_nft_max_fields'
}

/** aggregate min on columns */
export interface erc721_import_by_nft_min_fields {
  erc721_import_id: String | null
  inserted_at: timestamp | null
  nft_id: String | null
  updated_at: timestamp | null
  __typename: 'erc721_import_by_nft_min_fields'
}

/** select columns of table "nft" */
export enum nft_select_column {
  /** column name */
  contract_id = 'contract_id',
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  mint_time = 'mint_time',
  /** column name */
  nft_owner_id = 'nft_owner_id',
  /** column name */
  token_id = 'token_id',
  /** column name */
  token_uri = 'token_uri',
  /** column name */
  updated_at = 'updated_at',
}

/** columns and relationships of "nft" */
export interface nft {
  contract_id: String
  id: String
  inserted_at: timestamp
  mint_time: timestamp
  nft_owner_id: String
  token_id: String
  token_uri: String
  updated_at: timestamp
  __typename: 'nft'
}

/** aggregated selection of "nft" */
export interface nft_aggregate {
  aggregate: nft_aggregate_fields | null
  nodes: nft[]
  __typename: 'nft_aggregate'
}

/** aggregate fields of "nft" */
export interface nft_aggregate_fields {
  count: Int
  max: nft_max_fields | null
  min: nft_min_fields | null
  __typename: 'nft_aggregate_fields'
}

/** aggregate max on columns */
export interface nft_max_fields {
  contract_id: String | null
  id: String | null
  inserted_at: timestamp | null
  mint_time: timestamp | null
  nft_owner_id: String | null
  token_id: String | null
  token_uri: String | null
  updated_at: timestamp | null
  __typename: 'nft_max_fields'
}

/** aggregate min on columns */
export interface nft_min_fields {
  contract_id: String | null
  id: String | null
  inserted_at: timestamp | null
  mint_time: timestamp | null
  nft_owner_id: String | null
  token_id: String | null
  token_uri: String | null
  updated_at: timestamp | null
  __typename: 'nft_min_fields'
}

/** select columns of table "nft_asset" */
export enum nft_asset_select_column {
  /** column name */
  content_cid = 'content_cid',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  ipfs_url = 'ipfs_url',
  /** column name */
  status = 'status',
  /** column name */
  status_text = 'status_text',
  /** column name */
  token_uri = 'token_uri',
  /** column name */
  updated_at = 'updated_at',
}

export type nft_asset_status = any

/** columns and relationships of "nft_asset" */
export interface nft_asset {
  content_cid: String | null
  inserted_at: timestamp
  ipfs_url: String | null
  status: nft_asset_status
  status_text: String
  token_uri: String
  updated_at: timestamp
  __typename: 'nft_asset'
}

/** aggregated selection of "nft_asset" */
export interface nft_asset_aggregate {
  aggregate: nft_asset_aggregate_fields | null
  nodes: nft_asset[]
  __typename: 'nft_asset_aggregate'
}

/** aggregate fields of "nft_asset" */
export interface nft_asset_aggregate_fields {
  count: Int
  max: nft_asset_max_fields | null
  min: nft_asset_min_fields | null
  __typename: 'nft_asset_aggregate_fields'
}

/** aggregate max on columns */
export interface nft_asset_max_fields {
  content_cid: String | null
  inserted_at: timestamp | null
  ipfs_url: String | null
  status_text: String | null
  token_uri: String | null
  updated_at: timestamp | null
  __typename: 'nft_asset_max_fields'
}

/** aggregate min on columns */
export interface nft_asset_min_fields {
  content_cid: String | null
  inserted_at: timestamp | null
  ipfs_url: String | null
  status_text: String | null
  token_uri: String | null
  updated_at: timestamp | null
  __typename: 'nft_asset_min_fields'
}

/** select columns of table "nft_metadata" */
export enum nft_metadata_select_column {
  /** column name */
  content_cid = 'content_cid',
  /** column name */
  description = 'description',
  /** column name */
  image_uri = 'image_uri',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  name = 'name',
  /** column name */
  updated_at = 'updated_at',
}

/** columns and relationships of "nft_metadata" */
export interface nft_metadata {
  content_cid: String
  description: String
  image_uri: String
  inserted_at: timestamp
  name: String
  updated_at: timestamp
  __typename: 'nft_metadata'
}

/** aggregated selection of "nft_metadata" */
export interface nft_metadata_aggregate {
  aggregate: nft_metadata_aggregate_fields | null
  nodes: nft_metadata[]
  __typename: 'nft_metadata_aggregate'
}

/** aggregate fields of "nft_metadata" */
export interface nft_metadata_aggregate_fields {
  count: Int
  max: nft_metadata_max_fields | null
  min: nft_metadata_min_fields | null
  __typename: 'nft_metadata_aggregate_fields'
}

/** aggregate max on columns */
export interface nft_metadata_max_fields {
  content_cid: String | null
  description: String | null
  image_uri: String | null
  inserted_at: timestamp | null
  name: String | null
  updated_at: timestamp | null
  __typename: 'nft_metadata_max_fields'
}

/** aggregate min on columns */
export interface nft_metadata_min_fields {
  content_cid: String | null
  description: String | null
  image_uri: String | null
  inserted_at: timestamp | null
  name: String | null
  updated_at: timestamp | null
  __typename: 'nft_metadata_min_fields'
}

/** select columns of table "nft_owner" */
export enum nft_owner_select_column {
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  updated_at = 'updated_at',
}

/** columns and relationships of "nft_owner" */
export interface nft_owner {
  id: String
  inserted_at: timestamp
  updated_at: timestamp
  __typename: 'nft_owner'
}

/** aggregated selection of "nft_owner" */
export interface nft_owner_aggregate {
  aggregate: nft_owner_aggregate_fields | null
  nodes: nft_owner[]
  __typename: 'nft_owner_aggregate'
}

/** aggregate fields of "nft_owner" */
export interface nft_owner_aggregate_fields {
  count: Int
  max: nft_owner_max_fields | null
  min: nft_owner_min_fields | null
  __typename: 'nft_owner_aggregate_fields'
}

/** aggregate max on columns */
export interface nft_owner_max_fields {
  id: String | null
  inserted_at: timestamp | null
  updated_at: timestamp | null
  __typename: 'nft_owner_max_fields'
}

/** aggregate min on columns */
export interface nft_owner_min_fields {
  id: String | null
  inserted_at: timestamp | null
  updated_at: timestamp | null
  __typename: 'nft_owner_min_fields'
}

/** select columns of table "nfts_by_blockchain_blocks" */
export enum nfts_by_blockchain_blocks_select_column {
  /** column name */
  blockchain_block_hash = 'blockchain_block_hash',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  nft_id = 'nft_id',
  /** column name */
  updated_at = 'updated_at',
}

/** columns and relationships of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks {
  blockchain_block_hash: String
  inserted_at: timestamp
  nft_id: String
  updated_at: timestamp
  __typename: 'nfts_by_blockchain_blocks'
}

/** aggregated selection of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_aggregate {
  aggregate: nfts_by_blockchain_blocks_aggregate_fields | null
  nodes: nfts_by_blockchain_blocks[]
  __typename: 'nfts_by_blockchain_blocks_aggregate'
}

/** aggregate fields of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_aggregate_fields {
  count: Int
  max: nfts_by_blockchain_blocks_max_fields | null
  min: nfts_by_blockchain_blocks_min_fields | null
  __typename: 'nfts_by_blockchain_blocks_aggregate_fields'
}

/** aggregate max on columns */
export interface nfts_by_blockchain_blocks_max_fields {
  blockchain_block_hash: String | null
  inserted_at: timestamp | null
  nft_id: String | null
  updated_at: timestamp | null
  __typename: 'nfts_by_blockchain_blocks_max_fields'
}

/** aggregate min on columns */
export interface nfts_by_blockchain_blocks_min_fields {
  blockchain_block_hash: String | null
  inserted_at: timestamp | null
  nft_id: String | null
  updated_at: timestamp | null
  __typename: 'nfts_by_blockchain_blocks_min_fields'
}

/** select columns of table "niftysave_migration" */
export enum niftysave_migration_select_column {
  /** column name */
  collection = 'collection',
  /** column name */
  cursor = 'cursor',
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  metadata = 'metadata',
  /** column name */
  updated_at = 'updated_at',
}

export type timestamptz = any

export type jsonb = any

/**
 * Utility table to keep track of migrations
 *
 *
 * columns and relationships of "niftysave_migration"
 *
 */
export interface niftysave_migration {
  collection: String
  cursor: String | null
  id: String
  inserted_at: timestamptz
  metadata: jsonb | null
  updated_at: timestamptz
  __typename: 'niftysave_migration'
}

/** aggregated selection of "niftysave_migration" */
export interface niftysave_migration_aggregate {
  aggregate: niftysave_migration_aggregate_fields | null
  nodes: niftysave_migration[]
  __typename: 'niftysave_migration_aggregate'
}

/** aggregate fields of "niftysave_migration" */
export interface niftysave_migration_aggregate_fields {
  count: Int
  max: niftysave_migration_max_fields | null
  min: niftysave_migration_min_fields | null
  __typename: 'niftysave_migration_aggregate_fields'
}

/** aggregate max on columns */
export interface niftysave_migration_max_fields {
  collection: String | null
  cursor: String | null
  id: String | null
  inserted_at: timestamptz | null
  updated_at: timestamptz | null
  __typename: 'niftysave_migration_max_fields'
}

/** aggregate min on columns */
export interface niftysave_migration_min_fields {
  collection: String | null
  cursor: String | null
  id: String | null
  inserted_at: timestamptz | null
  updated_at: timestamptz | null
  __typename: 'niftysave_migration_min_fields'
}

/** select columns of table "other_nft_resources" */
export enum other_nft_resources_select_column {
  /** column name */
  content_cid = 'content_cid',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  resource_uri = 'resource_uri',
  /** column name */
  updated_at = 'updated_at',
}

/** columns and relationships of "other_nft_resources" */
export interface other_nft_resources {
  content_cid: String
  inserted_at: timestamp
  resource_uri: String
  updated_at: timestamp
  __typename: 'other_nft_resources'
}

/** aggregated selection of "other_nft_resources" */
export interface other_nft_resources_aggregate {
  aggregate: other_nft_resources_aggregate_fields | null
  nodes: other_nft_resources[]
  __typename: 'other_nft_resources_aggregate'
}

/** aggregate fields of "other_nft_resources" */
export interface other_nft_resources_aggregate_fields {
  count: Int
  max: other_nft_resources_max_fields | null
  min: other_nft_resources_min_fields | null
  __typename: 'other_nft_resources_aggregate_fields'
}

/** aggregate max on columns */
export interface other_nft_resources_max_fields {
  content_cid: String | null
  inserted_at: timestamp | null
  resource_uri: String | null
  updated_at: timestamp | null
  __typename: 'other_nft_resources_max_fields'
}

/** aggregate min on columns */
export interface other_nft_resources_min_fields {
  content_cid: String | null
  inserted_at: timestamp | null
  resource_uri: String | null
  updated_at: timestamp | null
  __typename: 'other_nft_resources_min_fields'
}

/** select columns of table "pin" */
export enum pin_select_column {
  /** column name */
  content_cid = 'content_cid',
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  service = 'service',
  /** column name */
  status = 'status',
  /** column name */
  status_text = 'status_text',
  /** column name */
  updated_at = 'updated_at',
}

// @ts-ignore
export type bigint = any

export type pin_service = any

export type pin_status = any

/** columns and relationships of "pin" */
export interface pin {
  content_cid: String
  id: bigint
  inserted_at: timestamp
  service: pin_service
  status: pin_status
  status_text: String | null
  updated_at: timestamp
  __typename: 'pin'
}

/** aggregated selection of "pin" */
export interface pin_aggregate {
  aggregate: pin_aggregate_fields | null
  nodes: pin[]
  __typename: 'pin_aggregate'
}

/** aggregate fields of "pin" */
export interface pin_aggregate_fields {
  avg: pin_avg_fields | null
  count: Int
  max: pin_max_fields | null
  min: pin_min_fields | null
  stddev: pin_stddev_fields | null
  stddev_pop: pin_stddev_pop_fields | null
  stddev_samp: pin_stddev_samp_fields | null
  sum: pin_sum_fields | null
  var_pop: pin_var_pop_fields | null
  var_samp: pin_var_samp_fields | null
  variance: pin_variance_fields | null
  __typename: 'pin_aggregate_fields'
}

/** aggregate avg on columns */
export interface pin_avg_fields {
  id: Float | null
  __typename: 'pin_avg_fields'
}

/** aggregate max on columns */
export interface pin_max_fields {
  content_cid: String | null
  id: bigint | null
  inserted_at: timestamp | null
  status_text: String | null
  updated_at: timestamp | null
  __typename: 'pin_max_fields'
}

/** aggregate min on columns */
export interface pin_min_fields {
  content_cid: String | null
  id: bigint | null
  inserted_at: timestamp | null
  status_text: String | null
  updated_at: timestamp | null
  __typename: 'pin_min_fields'
}

/** aggregate stddev on columns */
export interface pin_stddev_fields {
  id: Float | null
  __typename: 'pin_stddev_fields'
}

/** aggregate stddev_pop on columns */
export interface pin_stddev_pop_fields {
  id: Float | null
  __typename: 'pin_stddev_pop_fields'
}

/** aggregate stddev_samp on columns */
export interface pin_stddev_samp_fields {
  id: Float | null
  __typename: 'pin_stddev_samp_fields'
}

/** aggregate sum on columns */
export interface pin_sum_fields {
  id: bigint | null
  __typename: 'pin_sum_fields'
}

/** aggregate var_pop on columns */
export interface pin_var_pop_fields {
  id: Float | null
  __typename: 'pin_var_pop_fields'
}

/** aggregate var_samp on columns */
export interface pin_var_samp_fields {
  id: Float | null
  __typename: 'pin_var_samp_fields'
}

/** aggregate variance on columns */
export interface pin_variance_fields {
  id: Float | null
  __typename: 'pin_variance_fields'
}

/** select columns of table "resource" */
export enum resource_select_column {
  /** column name */
  content_cid = 'content_cid',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  ipfs_url = 'ipfs_url',
  /** column name */
  status = 'status',
  /** column name */
  status_text = 'status_text',
  /** column name */
  updated_at = 'updated_at',
  /** column name */
  uri = 'uri',
}

export type resource_status = any

/** columns and relationships of "resource" */
export interface resource {
  content_cid: String | null
  inserted_at: timestamp
  ipfs_url: String | null
  status: resource_status
  status_text: String | null
  updated_at: timestamp
  uri: String
  __typename: 'resource'
}

/** aggregated selection of "resource" */
export interface resource_aggregate {
  aggregate: resource_aggregate_fields | null
  nodes: resource[]
  __typename: 'resource_aggregate'
}

/** aggregate fields of "resource" */
export interface resource_aggregate_fields {
  count: Int
  max: resource_max_fields | null
  min: resource_min_fields | null
  __typename: 'resource_aggregate_fields'
}

/** aggregate max on columns */
export interface resource_max_fields {
  content_cid: String | null
  inserted_at: timestamp | null
  ipfs_url: String | null
  status_text: String | null
  updated_at: timestamp | null
  uri: String | null
  __typename: 'resource_max_fields'
}

/** aggregate min on columns */
export interface resource_min_fields {
  content_cid: String | null
  inserted_at: timestamp | null
  ipfs_url: String | null
  status_text: String | null
  updated_at: timestamp | null
  uri: String | null
  __typename: 'resource_min_fields'
}

/** mutation root */
export interface mutation_root {
  /** delete data from the table: "blockchain_block" */
  delete_blockchain_block: blockchain_block_mutation_response | null
  /** delete single row from the table: "blockchain_block" */
  delete_blockchain_block_by_pk: blockchain_block | null
  /** delete data from the table: "blockchain_contract" */
  delete_blockchain_contract: blockchain_contract_mutation_response | null
  /** delete single row from the table: "blockchain_contract" */
  delete_blockchain_contract_by_pk: blockchain_contract | null
  /** delete data from the table: "content" */
  delete_content: content_mutation_response | null
  /** delete single row from the table: "content" */
  delete_content_by_pk: content | null
  /** delete data from the table: "erc721_import" */
  delete_erc721_import: erc721_import_mutation_response | null
  /** delete data from the table: "erc721_import_by_nft" */
  delete_erc721_import_by_nft: erc721_import_by_nft_mutation_response | null
  /** delete single row from the table: "erc721_import_by_nft" */
  delete_erc721_import_by_nft_by_pk: erc721_import_by_nft | null
  /** delete single row from the table: "erc721_import" */
  delete_erc721_import_by_pk: erc721_import | null
  /** delete data from the table: "nft" */
  delete_nft: nft_mutation_response | null
  /** delete data from the table: "nft_asset" */
  delete_nft_asset: nft_asset_mutation_response | null
  /** delete single row from the table: "nft_asset" */
  delete_nft_asset_by_pk: nft_asset | null
  /** delete single row from the table: "nft" */
  delete_nft_by_pk: nft | null
  /** delete data from the table: "nft_metadata" */
  delete_nft_metadata: nft_metadata_mutation_response | null
  /** delete single row from the table: "nft_metadata" */
  delete_nft_metadata_by_pk: nft_metadata | null
  /** delete data from the table: "nft_owner" */
  delete_nft_owner: nft_owner_mutation_response | null
  /** delete single row from the table: "nft_owner" */
  delete_nft_owner_by_pk: nft_owner | null
  /** delete data from the table: "nfts_by_blockchain_blocks" */
  delete_nfts_by_blockchain_blocks: nfts_by_blockchain_blocks_mutation_response | null
  /** delete single row from the table: "nfts_by_blockchain_blocks" */
  delete_nfts_by_blockchain_blocks_by_pk: nfts_by_blockchain_blocks | null
  /** delete data from the table: "niftysave_migration" */
  delete_niftysave_migration: niftysave_migration_mutation_response | null
  /** delete single row from the table: "niftysave_migration" */
  delete_niftysave_migration_by_pk: niftysave_migration | null
  /** delete data from the table: "other_nft_resources" */
  delete_other_nft_resources: other_nft_resources_mutation_response | null
  /** delete single row from the table: "other_nft_resources" */
  delete_other_nft_resources_by_pk: other_nft_resources | null
  /** delete data from the table: "pin" */
  delete_pin: pin_mutation_response | null
  /** delete single row from the table: "pin" */
  delete_pin_by_pk: pin | null
  /** delete data from the table: "resource" */
  delete_resource: resource_mutation_response | null
  /** delete single row from the table: "resource" */
  delete_resource_by_pk: resource | null
  /** insert data into the table: "blockchain_block" */
  insert_blockchain_block: blockchain_block_mutation_response | null
  /** insert a single row into the table: "blockchain_block" */
  insert_blockchain_block_one: blockchain_block | null
  /** insert data into the table: "blockchain_contract" */
  insert_blockchain_contract: blockchain_contract_mutation_response | null
  /** insert a single row into the table: "blockchain_contract" */
  insert_blockchain_contract_one: blockchain_contract | null
  /** insert data into the table: "content" */
  insert_content: content_mutation_response | null
  /** insert a single row into the table: "content" */
  insert_content_one: content | null
  /** insert data into the table: "erc721_import" */
  insert_erc721_import: erc721_import_mutation_response | null
  /** insert data into the table: "erc721_import_by_nft" */
  insert_erc721_import_by_nft: erc721_import_by_nft_mutation_response | null
  /** insert a single row into the table: "erc721_import_by_nft" */
  insert_erc721_import_by_nft_one: erc721_import_by_nft | null
  /** insert a single row into the table: "erc721_import" */
  insert_erc721_import_one: erc721_import | null
  /** insert data into the table: "nft" */
  insert_nft: nft_mutation_response | null
  /** insert data into the table: "nft_asset" */
  insert_nft_asset: nft_asset_mutation_response | null
  /** insert a single row into the table: "nft_asset" */
  insert_nft_asset_one: nft_asset | null
  /** insert data into the table: "nft_metadata" */
  insert_nft_metadata: nft_metadata_mutation_response | null
  /** insert a single row into the table: "nft_metadata" */
  insert_nft_metadata_one: nft_metadata | null
  /** insert a single row into the table: "nft" */
  insert_nft_one: nft | null
  /** insert data into the table: "nft_owner" */
  insert_nft_owner: nft_owner_mutation_response | null
  /** insert a single row into the table: "nft_owner" */
  insert_nft_owner_one: nft_owner | null
  /** insert data into the table: "nfts_by_blockchain_blocks" */
  insert_nfts_by_blockchain_blocks: nfts_by_blockchain_blocks_mutation_response | null
  /** insert a single row into the table: "nfts_by_blockchain_blocks" */
  insert_nfts_by_blockchain_blocks_one: nfts_by_blockchain_blocks | null
  /** insert data into the table: "niftysave_migration" */
  insert_niftysave_migration: niftysave_migration_mutation_response | null
  /** insert a single row into the table: "niftysave_migration" */
  insert_niftysave_migration_one: niftysave_migration | null
  /** insert data into the table: "other_nft_resources" */
  insert_other_nft_resources: other_nft_resources_mutation_response | null
  /** insert a single row into the table: "other_nft_resources" */
  insert_other_nft_resources_one: other_nft_resources | null
  /** insert data into the table: "pin" */
  insert_pin: pin_mutation_response | null
  /** insert a single row into the table: "pin" */
  insert_pin_one: pin | null
  /** insert data into the table: "resource" */
  insert_resource: resource_mutation_response | null
  /** insert a single row into the table: "resource" */
  insert_resource_one: resource | null
  /** update data of the table: "blockchain_block" */
  update_blockchain_block: blockchain_block_mutation_response | null
  /** update single row of the table: "blockchain_block" */
  update_blockchain_block_by_pk: blockchain_block | null
  /** update data of the table: "blockchain_contract" */
  update_blockchain_contract: blockchain_contract_mutation_response | null
  /** update single row of the table: "blockchain_contract" */
  update_blockchain_contract_by_pk: blockchain_contract | null
  /** update data of the table: "content" */
  update_content: content_mutation_response | null
  /** update single row of the table: "content" */
  update_content_by_pk: content | null
  /** update data of the table: "erc721_import" */
  update_erc721_import: erc721_import_mutation_response | null
  /** update data of the table: "erc721_import_by_nft" */
  update_erc721_import_by_nft: erc721_import_by_nft_mutation_response | null
  /** update single row of the table: "erc721_import_by_nft" */
  update_erc721_import_by_nft_by_pk: erc721_import_by_nft | null
  /** update single row of the table: "erc721_import" */
  update_erc721_import_by_pk: erc721_import | null
  /** update data of the table: "nft" */
  update_nft: nft_mutation_response | null
  /** update data of the table: "nft_asset" */
  update_nft_asset: nft_asset_mutation_response | null
  /** update single row of the table: "nft_asset" */
  update_nft_asset_by_pk: nft_asset | null
  /** update single row of the table: "nft" */
  update_nft_by_pk: nft | null
  /** update data of the table: "nft_metadata" */
  update_nft_metadata: nft_metadata_mutation_response | null
  /** update single row of the table: "nft_metadata" */
  update_nft_metadata_by_pk: nft_metadata | null
  /** update data of the table: "nft_owner" */
  update_nft_owner: nft_owner_mutation_response | null
  /** update single row of the table: "nft_owner" */
  update_nft_owner_by_pk: nft_owner | null
  /** update data of the table: "nfts_by_blockchain_blocks" */
  update_nfts_by_blockchain_blocks: nfts_by_blockchain_blocks_mutation_response | null
  /** update single row of the table: "nfts_by_blockchain_blocks" */
  update_nfts_by_blockchain_blocks_by_pk: nfts_by_blockchain_blocks | null
  /** update data of the table: "niftysave_migration" */
  update_niftysave_migration: niftysave_migration_mutation_response | null
  /** update single row of the table: "niftysave_migration" */
  update_niftysave_migration_by_pk: niftysave_migration | null
  /** update data of the table: "other_nft_resources" */
  update_other_nft_resources: other_nft_resources_mutation_response | null
  /** update single row of the table: "other_nft_resources" */
  update_other_nft_resources_by_pk: other_nft_resources | null
  /** update data of the table: "pin" */
  update_pin: pin_mutation_response | null
  /** update single row of the table: "pin" */
  update_pin_by_pk: pin | null
  /** update data of the table: "resource" */
  update_resource: resource_mutation_response | null
  /** update single row of the table: "resource" */
  update_resource_by_pk: resource | null
  __typename: 'mutation_root'
}

/** response of any mutation on the table "blockchain_block" */
export interface blockchain_block_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: blockchain_block[]
  __typename: 'blockchain_block_mutation_response'
}

/** response of any mutation on the table "blockchain_contract" */
export interface blockchain_contract_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: blockchain_contract[]
  __typename: 'blockchain_contract_mutation_response'
}

/** response of any mutation on the table "content" */
export interface content_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: content[]
  __typename: 'content_mutation_response'
}

/** response of any mutation on the table "erc721_import" */
export interface erc721_import_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: erc721_import[]
  __typename: 'erc721_import_mutation_response'
}

/** response of any mutation on the table "erc721_import_by_nft" */
export interface erc721_import_by_nft_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: erc721_import_by_nft[]
  __typename: 'erc721_import_by_nft_mutation_response'
}

/** response of any mutation on the table "nft" */
export interface nft_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: nft[]
  __typename: 'nft_mutation_response'
}

/** response of any mutation on the table "nft_asset" */
export interface nft_asset_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: nft_asset[]
  __typename: 'nft_asset_mutation_response'
}

/** response of any mutation on the table "nft_metadata" */
export interface nft_metadata_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: nft_metadata[]
  __typename: 'nft_metadata_mutation_response'
}

/** response of any mutation on the table "nft_owner" */
export interface nft_owner_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: nft_owner[]
  __typename: 'nft_owner_mutation_response'
}

/** response of any mutation on the table "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: nfts_by_blockchain_blocks[]
  __typename: 'nfts_by_blockchain_blocks_mutation_response'
}

/** response of any mutation on the table "niftysave_migration" */
export interface niftysave_migration_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: niftysave_migration[]
  __typename: 'niftysave_migration_mutation_response'
}

/** response of any mutation on the table "other_nft_resources" */
export interface other_nft_resources_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: other_nft_resources[]
  __typename: 'other_nft_resources_mutation_response'
}

/** response of any mutation on the table "pin" */
export interface pin_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: pin[]
  __typename: 'pin_mutation_response'
}

/** response of any mutation on the table "resource" */
export interface resource_mutation_response {
  /** number of rows affected by the mutation */
  affected_rows: Int
  /** data from the rows affected by the mutation */
  returning: resource[]
  __typename: 'resource_mutation_response'
}

/** unique or primary key constraints on table "blockchain_block" */
export enum blockchain_block_constraint {
  /** unique or primary key constraint */
  blockchain_block_pkey = 'blockchain_block_pkey',
  /** unique or primary key constraint */
  unique_blockchain_block_hash = 'unique_blockchain_block_hash',
}

/** update columns of table "blockchain_block" */
export enum blockchain_block_update_column {
  /** column name */
  hash = 'hash',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  number = 'number',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "blockchain_contract" */
export enum blockchain_contract_constraint {
  /** unique or primary key constraint */
  blockchain_contract_pkey = 'blockchain_contract_pkey',
}

/** update columns of table "blockchain_contract" */
export enum blockchain_contract_update_column {
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  name = 'name',
  /** column name */
  supports_eip721_metadata = 'supports_eip721_metadata',
  /** column name */
  symbol = 'symbol',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "content" */
export enum content_constraint {
  /** unique or primary key constraint */
  content_pkey = 'content_pkey',
}

/** update columns of table "content" */
export enum content_update_column {
  /** column name */
  cid = 'cid',
  /** column name */
  dag_size = 'dag_size',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "erc721_import" */
export enum erc721_import_constraint {
  /** unique or primary key constraint */
  erc721_import_pkey = 'erc721_import_pkey',
}

/** update columns of table "erc721_import" */
export enum erc721_import_update_column {
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  next_id = 'next_id',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "erc721_import_by_nft" */
export enum erc721_import_by_nft_constraint {
  /** unique or primary key constraint */
  erc721_import_by_nft_pkey = 'erc721_import_by_nft_pkey',
}

/** update columns of table "erc721_import_by_nft" */
export enum erc721_import_by_nft_update_column {
  /** column name */
  erc721_import_id = 'erc721_import_id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  nft_id = 'nft_id',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "nft" */
export enum nft_constraint {
  /** unique or primary key constraint */
  nft_pkey = 'nft_pkey',
}

/** update columns of table "nft" */
export enum nft_update_column {
  /** column name */
  contract_id = 'contract_id',
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  mint_time = 'mint_time',
  /** column name */
  nft_owner_id = 'nft_owner_id',
  /** column name */
  token_id = 'token_id',
  /** column name */
  token_uri = 'token_uri',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "nft_asset" */
export enum nft_asset_constraint {
  /** unique or primary key constraint */
  nft_asset_pkey = 'nft_asset_pkey',
}

/** update columns of table "nft_asset" */
export enum nft_asset_update_column {
  /** column name */
  content_cid = 'content_cid',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  ipfs_url = 'ipfs_url',
  /** column name */
  status = 'status',
  /** column name */
  status_text = 'status_text',
  /** column name */
  token_uri = 'token_uri',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "nft_metadata" */
export enum nft_metadata_constraint {
  /** unique or primary key constraint */
  nft_metadata_pkey = 'nft_metadata_pkey',
}

/** update columns of table "nft_metadata" */
export enum nft_metadata_update_column {
  /** column name */
  content_cid = 'content_cid',
  /** column name */
  description = 'description',
  /** column name */
  image_uri = 'image_uri',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  name = 'name',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "nft_owner" */
export enum nft_owner_constraint {
  /** unique or primary key constraint */
  nft_owner_pkey = 'nft_owner_pkey',
}

/** update columns of table "nft_owner" */
export enum nft_owner_update_column {
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "nfts_by_blockchain_blocks" */
export enum nfts_by_blockchain_blocks_constraint {
  /** unique or primary key constraint */
  nfts_by_blockchain_blocks_pkey = 'nfts_by_blockchain_blocks_pkey',
}

/** update columns of table "nfts_by_blockchain_blocks" */
export enum nfts_by_blockchain_blocks_update_column {
  /** column name */
  blockchain_block_hash = 'blockchain_block_hash',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  nft_id = 'nft_id',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "niftysave_migration" */
export enum niftysave_migration_constraint {
  /** unique or primary key constraint */
  niftysave_migration_pkey = 'niftysave_migration_pkey',
}

/** update columns of table "niftysave_migration" */
export enum niftysave_migration_update_column {
  /** column name */
  collection = 'collection',
  /** column name */
  cursor = 'cursor',
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  metadata = 'metadata',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "other_nft_resources" */
export enum other_nft_resources_constraint {
  /** unique or primary key constraint */
  other_nft_resources_pkey = 'other_nft_resources_pkey',
}

/** update columns of table "other_nft_resources" */
export enum other_nft_resources_update_column {
  /** column name */
  content_cid = 'content_cid',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  resource_uri = 'resource_uri',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "pin" */
export enum pin_constraint {
  /** unique or primary key constraint */
  pin_pkey = 'pin_pkey',
}

/** update columns of table "pin" */
export enum pin_update_column {
  /** column name */
  content_cid = 'content_cid',
  /** column name */
  id = 'id',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  service = 'service',
  /** column name */
  status = 'status',
  /** column name */
  status_text = 'status_text',
  /** column name */
  updated_at = 'updated_at',
}

/** unique or primary key constraints on table "resource" */
export enum resource_constraint {
  /** unique or primary key constraint */
  resource_pkey = 'resource_pkey',
}

/** update columns of table "resource" */
export enum resource_update_column {
  /** column name */
  content_cid = 'content_cid',
  /** column name */
  inserted_at = 'inserted_at',
  /** column name */
  ipfs_url = 'ipfs_url',
  /** column name */
  status = 'status',
  /** column name */
  status_text = 'status_text',
  /** column name */
  updated_at = 'updated_at',
  /** column name */
  uri = 'uri',
}

export interface subscription_root {
  /** fetch data from the table: "blockchain_block" */
  blockchain_block: blockchain_block[]
  /** fetch aggregated fields from the table: "blockchain_block" */
  blockchain_block_aggregate: blockchain_block_aggregate
  /** fetch data from the table: "blockchain_block" using primary key columns */
  blockchain_block_by_pk: blockchain_block | null
  /** fetch data from the table: "blockchain_contract" */
  blockchain_contract: blockchain_contract[]
  /** fetch aggregated fields from the table: "blockchain_contract" */
  blockchain_contract_aggregate: blockchain_contract_aggregate
  /** fetch data from the table: "blockchain_contract" using primary key columns */
  blockchain_contract_by_pk: blockchain_contract | null
  /** fetch data from the table: "content" */
  content: content[]
  /** fetch aggregated fields from the table: "content" */
  content_aggregate: content_aggregate
  /** fetch data from the table: "content" using primary key columns */
  content_by_pk: content | null
  /** fetch data from the table: "erc721_import" */
  erc721_import: erc721_import[]
  /** fetch aggregated fields from the table: "erc721_import" */
  erc721_import_aggregate: erc721_import_aggregate
  /** fetch data from the table: "erc721_import_by_nft" */
  erc721_import_by_nft: erc721_import_by_nft[]
  /** fetch aggregated fields from the table: "erc721_import_by_nft" */
  erc721_import_by_nft_aggregate: erc721_import_by_nft_aggregate
  /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
  erc721_import_by_nft_by_pk: erc721_import_by_nft | null
  /** fetch data from the table: "erc721_import" using primary key columns */
  erc721_import_by_pk: erc721_import | null
  /** fetch data from the table: "nft" */
  nft: nft[]
  /** fetch aggregated fields from the table: "nft" */
  nft_aggregate: nft_aggregate
  /** fetch data from the table: "nft_asset" */
  nft_asset: nft_asset[]
  /** fetch aggregated fields from the table: "nft_asset" */
  nft_asset_aggregate: nft_asset_aggregate
  /** fetch data from the table: "nft_asset" using primary key columns */
  nft_asset_by_pk: nft_asset | null
  /** fetch data from the table: "nft" using primary key columns */
  nft_by_pk: nft | null
  /** fetch data from the table: "nft_metadata" */
  nft_metadata: nft_metadata[]
  /** fetch aggregated fields from the table: "nft_metadata" */
  nft_metadata_aggregate: nft_metadata_aggregate
  /** fetch data from the table: "nft_metadata" using primary key columns */
  nft_metadata_by_pk: nft_metadata | null
  /** fetch data from the table: "nft_owner" */
  nft_owner: nft_owner[]
  /** fetch aggregated fields from the table: "nft_owner" */
  nft_owner_aggregate: nft_owner_aggregate
  /** fetch data from the table: "nft_owner" using primary key columns */
  nft_owner_by_pk: nft_owner | null
  /** fetch data from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks: nfts_by_blockchain_blocks[]
  /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks_aggregate: nfts_by_blockchain_blocks_aggregate
  /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
  nfts_by_blockchain_blocks_by_pk: nfts_by_blockchain_blocks | null
  /** fetch data from the table: "niftysave_migration" */
  niftysave_migration: niftysave_migration[]
  /** fetch aggregated fields from the table: "niftysave_migration" */
  niftysave_migration_aggregate: niftysave_migration_aggregate
  /** fetch data from the table: "niftysave_migration" using primary key columns */
  niftysave_migration_by_pk: niftysave_migration | null
  /** fetch data from the table: "other_nft_resources" */
  other_nft_resources: other_nft_resources[]
  /** fetch aggregated fields from the table: "other_nft_resources" */
  other_nft_resources_aggregate: other_nft_resources_aggregate
  /** fetch data from the table: "other_nft_resources" using primary key columns */
  other_nft_resources_by_pk: other_nft_resources | null
  /** fetch data from the table: "pin" */
  pin: pin[]
  /** fetch aggregated fields from the table: "pin" */
  pin_aggregate: pin_aggregate
  /** fetch data from the table: "pin" using primary key columns */
  pin_by_pk: pin | null
  /** fetch data from the table: "resource" */
  resource: resource[]
  /** fetch aggregated fields from the table: "resource" */
  resource_aggregate: resource_aggregate
  /** fetch data from the table: "resource" using primary key columns */
  resource_by_pk: resource | null
  __typename: 'subscription_root'
}

export interface query_rootRequest {
  /** fetch data from the table: "blockchain_block" */
  blockchain_block?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: blockchain_block_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: blockchain_block_order_by[] | null
          /** filter the rows returned */
          where?: blockchain_block_bool_exp | null
        },
        blockchain_blockRequest
      ]
    | blockchain_blockRequest
  /** fetch aggregated fields from the table: "blockchain_block" */
  blockchain_block_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: blockchain_block_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: blockchain_block_order_by[] | null
          /** filter the rows returned */
          where?: blockchain_block_bool_exp | null
        },
        blockchain_block_aggregateRequest
      ]
    | blockchain_block_aggregateRequest
  /** fetch data from the table: "blockchain_block" using primary key columns */
  blockchain_block_by_pk?: [{ hash: String }, blockchain_blockRequest]
  /** fetch data from the table: "blockchain_contract" */
  blockchain_contract?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: blockchain_contract_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: blockchain_contract_order_by[] | null
          /** filter the rows returned */
          where?: blockchain_contract_bool_exp | null
        },
        blockchain_contractRequest
      ]
    | blockchain_contractRequest
  /** fetch aggregated fields from the table: "blockchain_contract" */
  blockchain_contract_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: blockchain_contract_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: blockchain_contract_order_by[] | null
          /** filter the rows returned */
          where?: blockchain_contract_bool_exp | null
        },
        blockchain_contract_aggregateRequest
      ]
    | blockchain_contract_aggregateRequest
  /** fetch data from the table: "blockchain_contract" using primary key columns */
  blockchain_contract_by_pk?: [{ id: String }, blockchain_contractRequest]
  /** fetch data from the table: "content" */
  content?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: content_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: content_order_by[] | null
          /** filter the rows returned */
          where?: content_bool_exp | null
        },
        contentRequest
      ]
    | contentRequest
  /** fetch aggregated fields from the table: "content" */
  content_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: content_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: content_order_by[] | null
          /** filter the rows returned */
          where?: content_bool_exp | null
        },
        content_aggregateRequest
      ]
    | content_aggregateRequest
  /** fetch data from the table: "content" using primary key columns */
  content_by_pk?: [{ cid: String }, contentRequest]
  /** fetch data from the table: "erc721_import" */
  erc721_import?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: erc721_import_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: erc721_import_order_by[] | null
          /** filter the rows returned */
          where?: erc721_import_bool_exp | null
        },
        erc721_importRequest
      ]
    | erc721_importRequest
  /** fetch aggregated fields from the table: "erc721_import" */
  erc721_import_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: erc721_import_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: erc721_import_order_by[] | null
          /** filter the rows returned */
          where?: erc721_import_bool_exp | null
        },
        erc721_import_aggregateRequest
      ]
    | erc721_import_aggregateRequest
  /** fetch data from the table: "erc721_import_by_nft" */
  erc721_import_by_nft?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: erc721_import_by_nft_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: erc721_import_by_nft_order_by[] | null
          /** filter the rows returned */
          where?: erc721_import_by_nft_bool_exp | null
        },
        erc721_import_by_nftRequest
      ]
    | erc721_import_by_nftRequest
  /** fetch aggregated fields from the table: "erc721_import_by_nft" */
  erc721_import_by_nft_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: erc721_import_by_nft_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: erc721_import_by_nft_order_by[] | null
          /** filter the rows returned */
          where?: erc721_import_by_nft_bool_exp | null
        },
        erc721_import_by_nft_aggregateRequest
      ]
    | erc721_import_by_nft_aggregateRequest
  /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
  erc721_import_by_nft_by_pk?: [
    { erc721_import_id: String; nft_id: String },
    erc721_import_by_nftRequest
  ]
  /** fetch data from the table: "erc721_import" using primary key columns */
  erc721_import_by_pk?: [{ id: String }, erc721_importRequest]
  /** fetch data from the table: "nft" */
  nft?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_order_by[] | null
          /** filter the rows returned */
          where?: nft_bool_exp | null
        },
        nftRequest
      ]
    | nftRequest
  /** fetch aggregated fields from the table: "nft" */
  nft_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_order_by[] | null
          /** filter the rows returned */
          where?: nft_bool_exp | null
        },
        nft_aggregateRequest
      ]
    | nft_aggregateRequest
  /** fetch data from the table: "nft_asset" */
  nft_asset?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_asset_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_asset_order_by[] | null
          /** filter the rows returned */
          where?: nft_asset_bool_exp | null
        },
        nft_assetRequest
      ]
    | nft_assetRequest
  /** fetch aggregated fields from the table: "nft_asset" */
  nft_asset_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_asset_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_asset_order_by[] | null
          /** filter the rows returned */
          where?: nft_asset_bool_exp | null
        },
        nft_asset_aggregateRequest
      ]
    | nft_asset_aggregateRequest
  /** fetch data from the table: "nft_asset" using primary key columns */
  nft_asset_by_pk?: [{ token_uri: String }, nft_assetRequest]
  /** fetch data from the table: "nft" using primary key columns */
  nft_by_pk?: [{ id: String }, nftRequest]
  /** fetch data from the table: "nft_metadata" */
  nft_metadata?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_metadata_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_metadata_order_by[] | null
          /** filter the rows returned */
          where?: nft_metadata_bool_exp | null
        },
        nft_metadataRequest
      ]
    | nft_metadataRequest
  /** fetch aggregated fields from the table: "nft_metadata" */
  nft_metadata_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_metadata_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_metadata_order_by[] | null
          /** filter the rows returned */
          where?: nft_metadata_bool_exp | null
        },
        nft_metadata_aggregateRequest
      ]
    | nft_metadata_aggregateRequest
  /** fetch data from the table: "nft_metadata" using primary key columns */
  nft_metadata_by_pk?: [{ content_cid: String }, nft_metadataRequest]
  /** fetch data from the table: "nft_owner" */
  nft_owner?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_owner_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_owner_order_by[] | null
          /** filter the rows returned */
          where?: nft_owner_bool_exp | null
        },
        nft_ownerRequest
      ]
    | nft_ownerRequest
  /** fetch aggregated fields from the table: "nft_owner" */
  nft_owner_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_owner_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_owner_order_by[] | null
          /** filter the rows returned */
          where?: nft_owner_bool_exp | null
        },
        nft_owner_aggregateRequest
      ]
    | nft_owner_aggregateRequest
  /** fetch data from the table: "nft_owner" using primary key columns */
  nft_owner_by_pk?: [{ id: String }, nft_ownerRequest]
  /** fetch data from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nfts_by_blockchain_blocks_order_by[] | null
          /** filter the rows returned */
          where?: nfts_by_blockchain_blocks_bool_exp | null
        },
        nfts_by_blockchain_blocksRequest
      ]
    | nfts_by_blockchain_blocksRequest
  /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nfts_by_blockchain_blocks_order_by[] | null
          /** filter the rows returned */
          where?: nfts_by_blockchain_blocks_bool_exp | null
        },
        nfts_by_blockchain_blocks_aggregateRequest
      ]
    | nfts_by_blockchain_blocks_aggregateRequest
  /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
  nfts_by_blockchain_blocks_by_pk?: [
    { blockchain_block_hash: String; nft_id: String },
    nfts_by_blockchain_blocksRequest
  ]
  /** fetch data from the table: "niftysave_migration" */
  niftysave_migration?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: niftysave_migration_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: niftysave_migration_order_by[] | null
          /** filter the rows returned */
          where?: niftysave_migration_bool_exp | null
        },
        niftysave_migrationRequest
      ]
    | niftysave_migrationRequest
  /** fetch aggregated fields from the table: "niftysave_migration" */
  niftysave_migration_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: niftysave_migration_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: niftysave_migration_order_by[] | null
          /** filter the rows returned */
          where?: niftysave_migration_bool_exp | null
        },
        niftysave_migration_aggregateRequest
      ]
    | niftysave_migration_aggregateRequest
  /** fetch data from the table: "niftysave_migration" using primary key columns */
  niftysave_migration_by_pk?: [{ id: String }, niftysave_migrationRequest]
  /** fetch data from the table: "other_nft_resources" */
  other_nft_resources?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: other_nft_resources_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: other_nft_resources_order_by[] | null
          /** filter the rows returned */
          where?: other_nft_resources_bool_exp | null
        },
        other_nft_resourcesRequest
      ]
    | other_nft_resourcesRequest
  /** fetch aggregated fields from the table: "other_nft_resources" */
  other_nft_resources_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: other_nft_resources_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: other_nft_resources_order_by[] | null
          /** filter the rows returned */
          where?: other_nft_resources_bool_exp | null
        },
        other_nft_resources_aggregateRequest
      ]
    | other_nft_resources_aggregateRequest
  /** fetch data from the table: "other_nft_resources" using primary key columns */
  other_nft_resources_by_pk?: [
    { content_cid: String; resource_uri: String },
    other_nft_resourcesRequest
  ]
  /** fetch data from the table: "pin" */
  pin?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: pin_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: pin_order_by[] | null
          /** filter the rows returned */
          where?: pin_bool_exp | null
        },
        pinRequest
      ]
    | pinRequest
  /** fetch aggregated fields from the table: "pin" */
  pin_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: pin_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: pin_order_by[] | null
          /** filter the rows returned */
          where?: pin_bool_exp | null
        },
        pin_aggregateRequest
      ]
    | pin_aggregateRequest
  /** fetch data from the table: "pin" using primary key columns */
  pin_by_pk?: [{ id: bigint }, pinRequest]
  /** fetch data from the table: "resource" */
  resource?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: resource_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: resource_order_by[] | null
          /** filter the rows returned */
          where?: resource_bool_exp | null
        },
        resourceRequest
      ]
    | resourceRequest
  /** fetch aggregated fields from the table: "resource" */
  resource_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: resource_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: resource_order_by[] | null
          /** filter the rows returned */
          where?: resource_bool_exp | null
        },
        resource_aggregateRequest
      ]
    | resource_aggregateRequest
  /** fetch data from the table: "resource" using primary key columns */
  resource_by_pk?: [{ uri: String }, resourceRequest]
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "blockchain_block". */
export interface blockchain_block_order_by {
  hash?: order_by | null
  inserted_at?: order_by | null
  number?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "blockchain_block". All fields are combined with a logical 'AND'. */
export interface blockchain_block_bool_exp {
  _and?: blockchain_block_bool_exp[] | null
  _not?: blockchain_block_bool_exp | null
  _or?: blockchain_block_bool_exp[] | null
  hash?: String_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  number?: Int_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export interface String_comparison_exp {
  _eq?: String | null
  _gt?: String | null
  _gte?: String | null
  /** does the column match the given case-insensitive pattern */
  _ilike?: String | null
  _in?: String[] | null
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: String | null
  _is_null?: Boolean | null
  /** does the column match the given pattern */
  _like?: String | null
  _lt?: String | null
  _lte?: String | null
  _neq?: String | null
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: String | null
  _nin?: String[] | null
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: String | null
  /** does the column NOT match the given pattern */
  _nlike?: String | null
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: String | null
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: String | null
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: String | null
  /** does the column match the given SQL regular expression */
  _similar?: String | null
}

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export interface timestamp_comparison_exp {
  _eq?: timestamp | null
  _gt?: timestamp | null
  _gte?: timestamp | null
  _in?: timestamp[] | null
  _is_null?: Boolean | null
  _lt?: timestamp | null
  _lte?: timestamp | null
  _neq?: timestamp | null
  _nin?: timestamp[] | null
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export interface Int_comparison_exp {
  _eq?: Int | null
  _gt?: Int | null
  _gte?: Int | null
  _in?: Int[] | null
  _is_null?: Boolean | null
  _lt?: Int | null
  _lte?: Int | null
  _neq?: Int | null
  _nin?: Int[] | null
}

/** columns and relationships of "blockchain_block" */
export interface blockchain_blockRequest {
  hash?: boolean | number
  inserted_at?: boolean | number
  number?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "blockchain_block" */
export interface blockchain_block_aggregateRequest {
  aggregate?: blockchain_block_aggregate_fieldsRequest
  nodes?: blockchain_blockRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "blockchain_block" */
export interface blockchain_block_aggregate_fieldsRequest {
  avg?: blockchain_block_avg_fieldsRequest
  count?:
    | [
        {
          columns?: blockchain_block_select_column[] | null
          distinct?: Boolean | null
        }
      ]
    | boolean
    | number
  max?: blockchain_block_max_fieldsRequest
  min?: blockchain_block_min_fieldsRequest
  stddev?: blockchain_block_stddev_fieldsRequest
  stddev_pop?: blockchain_block_stddev_pop_fieldsRequest
  stddev_samp?: blockchain_block_stddev_samp_fieldsRequest
  sum?: blockchain_block_sum_fieldsRequest
  var_pop?: blockchain_block_var_pop_fieldsRequest
  var_samp?: blockchain_block_var_samp_fieldsRequest
  variance?: blockchain_block_variance_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate avg on columns */
export interface blockchain_block_avg_fieldsRequest {
  number?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface blockchain_block_max_fieldsRequest {
  hash?: boolean | number
  inserted_at?: boolean | number
  number?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface blockchain_block_min_fieldsRequest {
  hash?: boolean | number
  inserted_at?: boolean | number
  number?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev on columns */
export interface blockchain_block_stddev_fieldsRequest {
  number?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_pop on columns */
export interface blockchain_block_stddev_pop_fieldsRequest {
  number?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_samp on columns */
export interface blockchain_block_stddev_samp_fieldsRequest {
  number?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate sum on columns */
export interface blockchain_block_sum_fieldsRequest {
  number?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_pop on columns */
export interface blockchain_block_var_pop_fieldsRequest {
  number?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_samp on columns */
export interface blockchain_block_var_samp_fieldsRequest {
  number?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate variance on columns */
export interface blockchain_block_variance_fieldsRequest {
  number?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "blockchain_contract". */
export interface blockchain_contract_order_by {
  id?: order_by | null
  inserted_at?: order_by | null
  name?: order_by | null
  supports_eip721_metadata?: order_by | null
  symbol?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "blockchain_contract". All fields are combined with a logical 'AND'. */
export interface blockchain_contract_bool_exp {
  _and?: blockchain_contract_bool_exp[] | null
  _not?: blockchain_contract_bool_exp | null
  _or?: blockchain_contract_bool_exp[] | null
  id?: String_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  name?: String_comparison_exp | null
  supports_eip721_metadata?: Boolean_comparison_exp | null
  symbol?: String_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export interface Boolean_comparison_exp {
  _eq?: Boolean | null
  _gt?: Boolean | null
  _gte?: Boolean | null
  _in?: Boolean[] | null
  _is_null?: Boolean | null
  _lt?: Boolean | null
  _lte?: Boolean | null
  _neq?: Boolean | null
  _nin?: Boolean[] | null
}

/** columns and relationships of "blockchain_contract" */
export interface blockchain_contractRequest {
  id?: boolean | number
  inserted_at?: boolean | number
  name?: boolean | number
  supports_eip721_metadata?: boolean | number
  symbol?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "blockchain_contract" */
export interface blockchain_contract_aggregateRequest {
  aggregate?: blockchain_contract_aggregate_fieldsRequest
  nodes?: blockchain_contractRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "blockchain_contract" */
export interface blockchain_contract_aggregate_fieldsRequest {
  count?:
    | [
        {
          columns?: blockchain_contract_select_column[] | null
          distinct?: Boolean | null
        }
      ]
    | boolean
    | number
  max?: blockchain_contract_max_fieldsRequest
  min?: blockchain_contract_min_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface blockchain_contract_max_fieldsRequest {
  id?: boolean | number
  inserted_at?: boolean | number
  name?: boolean | number
  symbol?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface blockchain_contract_min_fieldsRequest {
  id?: boolean | number
  inserted_at?: boolean | number
  name?: boolean | number
  symbol?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "content". */
export interface content_order_by {
  cid?: order_by | null
  dag_size?: order_by | null
  inserted_at?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "content". All fields are combined with a logical 'AND'. */
export interface content_bool_exp {
  _and?: content_bool_exp[] | null
  _not?: content_bool_exp | null
  _or?: content_bool_exp[] | null
  cid?: String_comparison_exp | null
  dag_size?: Int_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** columns and relationships of "content" */
export interface contentRequest {
  cid?: boolean | number
  dag_size?: boolean | number
  inserted_at?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "content" */
export interface content_aggregateRequest {
  aggregate?: content_aggregate_fieldsRequest
  nodes?: contentRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "content" */
export interface content_aggregate_fieldsRequest {
  avg?: content_avg_fieldsRequest
  count?:
    | [{ columns?: content_select_column[] | null; distinct?: Boolean | null }]
    | boolean
    | number
  max?: content_max_fieldsRequest
  min?: content_min_fieldsRequest
  stddev?: content_stddev_fieldsRequest
  stddev_pop?: content_stddev_pop_fieldsRequest
  stddev_samp?: content_stddev_samp_fieldsRequest
  sum?: content_sum_fieldsRequest
  var_pop?: content_var_pop_fieldsRequest
  var_samp?: content_var_samp_fieldsRequest
  variance?: content_variance_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate avg on columns */
export interface content_avg_fieldsRequest {
  dag_size?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface content_max_fieldsRequest {
  cid?: boolean | number
  dag_size?: boolean | number
  inserted_at?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface content_min_fieldsRequest {
  cid?: boolean | number
  dag_size?: boolean | number
  inserted_at?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev on columns */
export interface content_stddev_fieldsRequest {
  dag_size?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_pop on columns */
export interface content_stddev_pop_fieldsRequest {
  dag_size?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_samp on columns */
export interface content_stddev_samp_fieldsRequest {
  dag_size?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate sum on columns */
export interface content_sum_fieldsRequest {
  dag_size?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_pop on columns */
export interface content_var_pop_fieldsRequest {
  dag_size?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_samp on columns */
export interface content_var_samp_fieldsRequest {
  dag_size?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate variance on columns */
export interface content_variance_fieldsRequest {
  dag_size?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "erc721_import". */
export interface erc721_import_order_by {
  id?: order_by | null
  inserted_at?: order_by | null
  next_id?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "erc721_import". All fields are combined with a logical 'AND'. */
export interface erc721_import_bool_exp {
  _and?: erc721_import_bool_exp[] | null
  _not?: erc721_import_bool_exp | null
  _or?: erc721_import_bool_exp[] | null
  id?: String_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  next_id?: String_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** columns and relationships of "erc721_import" */
export interface erc721_importRequest {
  id?: boolean | number
  inserted_at?: boolean | number
  next_id?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "erc721_import" */
export interface erc721_import_aggregateRequest {
  aggregate?: erc721_import_aggregate_fieldsRequest
  nodes?: erc721_importRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "erc721_import" */
export interface erc721_import_aggregate_fieldsRequest {
  count?:
    | [
        {
          columns?: erc721_import_select_column[] | null
          distinct?: Boolean | null
        }
      ]
    | boolean
    | number
  max?: erc721_import_max_fieldsRequest
  min?: erc721_import_min_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface erc721_import_max_fieldsRequest {
  id?: boolean | number
  inserted_at?: boolean | number
  next_id?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface erc721_import_min_fieldsRequest {
  id?: boolean | number
  inserted_at?: boolean | number
  next_id?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "erc721_import_by_nft". */
export interface erc721_import_by_nft_order_by {
  erc721_import_id?: order_by | null
  inserted_at?: order_by | null
  nft_id?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "erc721_import_by_nft". All fields are combined with a logical 'AND'. */
export interface erc721_import_by_nft_bool_exp {
  _and?: erc721_import_by_nft_bool_exp[] | null
  _not?: erc721_import_by_nft_bool_exp | null
  _or?: erc721_import_by_nft_bool_exp[] | null
  erc721_import_id?: String_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  nft_id?: String_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** columns and relationships of "erc721_import_by_nft" */
export interface erc721_import_by_nftRequest {
  erc721_import_id?: boolean | number
  inserted_at?: boolean | number
  nft_id?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "erc721_import_by_nft" */
export interface erc721_import_by_nft_aggregateRequest {
  aggregate?: erc721_import_by_nft_aggregate_fieldsRequest
  nodes?: erc721_import_by_nftRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "erc721_import_by_nft" */
export interface erc721_import_by_nft_aggregate_fieldsRequest {
  count?:
    | [
        {
          columns?: erc721_import_by_nft_select_column[] | null
          distinct?: Boolean | null
        }
      ]
    | boolean
    | number
  max?: erc721_import_by_nft_max_fieldsRequest
  min?: erc721_import_by_nft_min_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface erc721_import_by_nft_max_fieldsRequest {
  erc721_import_id?: boolean | number
  inserted_at?: boolean | number
  nft_id?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface erc721_import_by_nft_min_fieldsRequest {
  erc721_import_id?: boolean | number
  inserted_at?: boolean | number
  nft_id?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "nft". */
export interface nft_order_by {
  contract_id?: order_by | null
  id?: order_by | null
  inserted_at?: order_by | null
  mint_time?: order_by | null
  nft_owner_id?: order_by | null
  token_id?: order_by | null
  token_uri?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "nft". All fields are combined with a logical 'AND'. */
export interface nft_bool_exp {
  _and?: nft_bool_exp[] | null
  _not?: nft_bool_exp | null
  _or?: nft_bool_exp[] | null
  contract_id?: String_comparison_exp | null
  id?: String_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  mint_time?: timestamp_comparison_exp | null
  nft_owner_id?: String_comparison_exp | null
  token_id?: String_comparison_exp | null
  token_uri?: String_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** columns and relationships of "nft" */
export interface nftRequest {
  contract_id?: boolean | number
  id?: boolean | number
  inserted_at?: boolean | number
  mint_time?: boolean | number
  nft_owner_id?: boolean | number
  token_id?: boolean | number
  token_uri?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "nft" */
export interface nft_aggregateRequest {
  aggregate?: nft_aggregate_fieldsRequest
  nodes?: nftRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "nft" */
export interface nft_aggregate_fieldsRequest {
  count?:
    | [{ columns?: nft_select_column[] | null; distinct?: Boolean | null }]
    | boolean
    | number
  max?: nft_max_fieldsRequest
  min?: nft_min_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface nft_max_fieldsRequest {
  contract_id?: boolean | number
  id?: boolean | number
  inserted_at?: boolean | number
  mint_time?: boolean | number
  nft_owner_id?: boolean | number
  token_id?: boolean | number
  token_uri?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface nft_min_fieldsRequest {
  contract_id?: boolean | number
  id?: boolean | number
  inserted_at?: boolean | number
  mint_time?: boolean | number
  nft_owner_id?: boolean | number
  token_id?: boolean | number
  token_uri?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "nft_asset". */
export interface nft_asset_order_by {
  content_cid?: order_by | null
  inserted_at?: order_by | null
  ipfs_url?: order_by | null
  status?: order_by | null
  status_text?: order_by | null
  token_uri?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "nft_asset". All fields are combined with a logical 'AND'. */
export interface nft_asset_bool_exp {
  _and?: nft_asset_bool_exp[] | null
  _not?: nft_asset_bool_exp | null
  _or?: nft_asset_bool_exp[] | null
  content_cid?: String_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  ipfs_url?: String_comparison_exp | null
  status?: nft_asset_status_comparison_exp | null
  status_text?: String_comparison_exp | null
  token_uri?: String_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** Boolean expression to compare columns of type "nft_asset_status". All fields are combined with logical 'AND'. */
export interface nft_asset_status_comparison_exp {
  _eq?: nft_asset_status | null
  _gt?: nft_asset_status | null
  _gte?: nft_asset_status | null
  _in?: nft_asset_status[] | null
  _is_null?: Boolean | null
  _lt?: nft_asset_status | null
  _lte?: nft_asset_status | null
  _neq?: nft_asset_status | null
  _nin?: nft_asset_status[] | null
}

/** columns and relationships of "nft_asset" */
export interface nft_assetRequest {
  content_cid?: boolean | number
  inserted_at?: boolean | number
  ipfs_url?: boolean | number
  status?: boolean | number
  status_text?: boolean | number
  token_uri?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "nft_asset" */
export interface nft_asset_aggregateRequest {
  aggregate?: nft_asset_aggregate_fieldsRequest
  nodes?: nft_assetRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "nft_asset" */
export interface nft_asset_aggregate_fieldsRequest {
  count?:
    | [
        {
          columns?: nft_asset_select_column[] | null
          distinct?: Boolean | null
        }
      ]
    | boolean
    | number
  max?: nft_asset_max_fieldsRequest
  min?: nft_asset_min_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface nft_asset_max_fieldsRequest {
  content_cid?: boolean | number
  inserted_at?: boolean | number
  ipfs_url?: boolean | number
  status_text?: boolean | number
  token_uri?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface nft_asset_min_fieldsRequest {
  content_cid?: boolean | number
  inserted_at?: boolean | number
  ipfs_url?: boolean | number
  status_text?: boolean | number
  token_uri?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "nft_metadata". */
export interface nft_metadata_order_by {
  content_cid?: order_by | null
  description?: order_by | null
  image_uri?: order_by | null
  inserted_at?: order_by | null
  name?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "nft_metadata". All fields are combined with a logical 'AND'. */
export interface nft_metadata_bool_exp {
  _and?: nft_metadata_bool_exp[] | null
  _not?: nft_metadata_bool_exp | null
  _or?: nft_metadata_bool_exp[] | null
  content_cid?: String_comparison_exp | null
  description?: String_comparison_exp | null
  image_uri?: String_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  name?: String_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** columns and relationships of "nft_metadata" */
export interface nft_metadataRequest {
  content_cid?: boolean | number
  description?: boolean | number
  image_uri?: boolean | number
  inserted_at?: boolean | number
  name?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "nft_metadata" */
export interface nft_metadata_aggregateRequest {
  aggregate?: nft_metadata_aggregate_fieldsRequest
  nodes?: nft_metadataRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "nft_metadata" */
export interface nft_metadata_aggregate_fieldsRequest {
  count?:
    | [
        {
          columns?: nft_metadata_select_column[] | null
          distinct?: Boolean | null
        }
      ]
    | boolean
    | number
  max?: nft_metadata_max_fieldsRequest
  min?: nft_metadata_min_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface nft_metadata_max_fieldsRequest {
  content_cid?: boolean | number
  description?: boolean | number
  image_uri?: boolean | number
  inserted_at?: boolean | number
  name?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface nft_metadata_min_fieldsRequest {
  content_cid?: boolean | number
  description?: boolean | number
  image_uri?: boolean | number
  inserted_at?: boolean | number
  name?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "nft_owner". */
export interface nft_owner_order_by {
  id?: order_by | null
  inserted_at?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "nft_owner". All fields are combined with a logical 'AND'. */
export interface nft_owner_bool_exp {
  _and?: nft_owner_bool_exp[] | null
  _not?: nft_owner_bool_exp | null
  _or?: nft_owner_bool_exp[] | null
  id?: String_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** columns and relationships of "nft_owner" */
export interface nft_ownerRequest {
  id?: boolean | number
  inserted_at?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "nft_owner" */
export interface nft_owner_aggregateRequest {
  aggregate?: nft_owner_aggregate_fieldsRequest
  nodes?: nft_ownerRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "nft_owner" */
export interface nft_owner_aggregate_fieldsRequest {
  count?:
    | [
        {
          columns?: nft_owner_select_column[] | null
          distinct?: Boolean | null
        }
      ]
    | boolean
    | number
  max?: nft_owner_max_fieldsRequest
  min?: nft_owner_min_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface nft_owner_max_fieldsRequest {
  id?: boolean | number
  inserted_at?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface nft_owner_min_fieldsRequest {
  id?: boolean | number
  inserted_at?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "nfts_by_blockchain_blocks". */
export interface nfts_by_blockchain_blocks_order_by {
  blockchain_block_hash?: order_by | null
  inserted_at?: order_by | null
  nft_id?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "nfts_by_blockchain_blocks". All fields are combined with a logical 'AND'. */
export interface nfts_by_blockchain_blocks_bool_exp {
  _and?: nfts_by_blockchain_blocks_bool_exp[] | null
  _not?: nfts_by_blockchain_blocks_bool_exp | null
  _or?: nfts_by_blockchain_blocks_bool_exp[] | null
  blockchain_block_hash?: String_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  nft_id?: String_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** columns and relationships of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocksRequest {
  blockchain_block_hash?: boolean | number
  inserted_at?: boolean | number
  nft_id?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_aggregateRequest {
  aggregate?: nfts_by_blockchain_blocks_aggregate_fieldsRequest
  nodes?: nfts_by_blockchain_blocksRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_aggregate_fieldsRequest {
  count?:
    | [
        {
          columns?: nfts_by_blockchain_blocks_select_column[] | null
          distinct?: Boolean | null
        }
      ]
    | boolean
    | number
  max?: nfts_by_blockchain_blocks_max_fieldsRequest
  min?: nfts_by_blockchain_blocks_min_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface nfts_by_blockchain_blocks_max_fieldsRequest {
  blockchain_block_hash?: boolean | number
  inserted_at?: boolean | number
  nft_id?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface nfts_by_blockchain_blocks_min_fieldsRequest {
  blockchain_block_hash?: boolean | number
  inserted_at?: boolean | number
  nft_id?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "niftysave_migration". */
export interface niftysave_migration_order_by {
  collection?: order_by | null
  cursor?: order_by | null
  id?: order_by | null
  inserted_at?: order_by | null
  metadata?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "niftysave_migration". All fields are combined with a logical 'AND'. */
export interface niftysave_migration_bool_exp {
  _and?: niftysave_migration_bool_exp[] | null
  _not?: niftysave_migration_bool_exp | null
  _or?: niftysave_migration_bool_exp[] | null
  collection?: String_comparison_exp | null
  cursor?: String_comparison_exp | null
  id?: String_comparison_exp | null
  inserted_at?: timestamptz_comparison_exp | null
  metadata?: jsonb_comparison_exp | null
  updated_at?: timestamptz_comparison_exp | null
}

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export interface timestamptz_comparison_exp {
  _eq?: timestamptz | null
  _gt?: timestamptz | null
  _gte?: timestamptz | null
  _in?: timestamptz[] | null
  _is_null?: Boolean | null
  _lt?: timestamptz | null
  _lte?: timestamptz | null
  _neq?: timestamptz | null
  _nin?: timestamptz[] | null
}

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export interface jsonb_comparison_exp {
  /** is the column contained in the given json value */
  _contained_in?: jsonb | null
  /** does the column contain the given json value at the top level */
  _contains?: jsonb | null
  _eq?: jsonb | null
  _gt?: jsonb | null
  _gte?: jsonb | null
  /** does the string exist as a top-level key in the column */
  _has_key?: String | null
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: String[] | null
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: String[] | null
  _in?: jsonb[] | null
  _is_null?: Boolean | null
  _lt?: jsonb | null
  _lte?: jsonb | null
  _neq?: jsonb | null
  _nin?: jsonb[] | null
}

/**
 * Utility table to keep track of migrations
 *
 *
 * columns and relationships of "niftysave_migration"
 *
 */
export interface niftysave_migrationRequest {
  collection?: boolean | number
  cursor?: boolean | number
  id?: boolean | number
  inserted_at?: boolean | number
  metadata?:
    | [
        {
          /** JSON select path */
          path?: String | null
        }
      ]
    | boolean
    | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "niftysave_migration" */
export interface niftysave_migration_aggregateRequest {
  aggregate?: niftysave_migration_aggregate_fieldsRequest
  nodes?: niftysave_migrationRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "niftysave_migration" */
export interface niftysave_migration_aggregate_fieldsRequest {
  count?:
    | [
        {
          columns?: niftysave_migration_select_column[] | null
          distinct?: Boolean | null
        }
      ]
    | boolean
    | number
  max?: niftysave_migration_max_fieldsRequest
  min?: niftysave_migration_min_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface niftysave_migration_max_fieldsRequest {
  collection?: boolean | number
  cursor?: boolean | number
  id?: boolean | number
  inserted_at?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface niftysave_migration_min_fieldsRequest {
  collection?: boolean | number
  cursor?: boolean | number
  id?: boolean | number
  inserted_at?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "other_nft_resources". */
export interface other_nft_resources_order_by {
  content_cid?: order_by | null
  inserted_at?: order_by | null
  resource_uri?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "other_nft_resources". All fields are combined with a logical 'AND'. */
export interface other_nft_resources_bool_exp {
  _and?: other_nft_resources_bool_exp[] | null
  _not?: other_nft_resources_bool_exp | null
  _or?: other_nft_resources_bool_exp[] | null
  content_cid?: String_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  resource_uri?: String_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** columns and relationships of "other_nft_resources" */
export interface other_nft_resourcesRequest {
  content_cid?: boolean | number
  inserted_at?: boolean | number
  resource_uri?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "other_nft_resources" */
export interface other_nft_resources_aggregateRequest {
  aggregate?: other_nft_resources_aggregate_fieldsRequest
  nodes?: other_nft_resourcesRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "other_nft_resources" */
export interface other_nft_resources_aggregate_fieldsRequest {
  count?:
    | [
        {
          columns?: other_nft_resources_select_column[] | null
          distinct?: Boolean | null
        }
      ]
    | boolean
    | number
  max?: other_nft_resources_max_fieldsRequest
  min?: other_nft_resources_min_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface other_nft_resources_max_fieldsRequest {
  content_cid?: boolean | number
  inserted_at?: boolean | number
  resource_uri?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface other_nft_resources_min_fieldsRequest {
  content_cid?: boolean | number
  inserted_at?: boolean | number
  resource_uri?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "pin". */
export interface pin_order_by {
  content_cid?: order_by | null
  id?: order_by | null
  inserted_at?: order_by | null
  service?: order_by | null
  status?: order_by | null
  status_text?: order_by | null
  updated_at?: order_by | null
}

/** Boolean expression to filter rows from the table "pin". All fields are combined with a logical 'AND'. */
export interface pin_bool_exp {
  _and?: pin_bool_exp[] | null
  _not?: pin_bool_exp | null
  _or?: pin_bool_exp[] | null
  content_cid?: String_comparison_exp | null
  id?: bigint_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  service?: pin_service_comparison_exp | null
  status?: pin_status_comparison_exp | null
  status_text?: String_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
}

/** Boolean expression to compare columns of type "bigint". All fields are combined with logical 'AND'. */
export interface bigint_comparison_exp {
  _eq?: bigint | null
  _gt?: bigint | null
  _gte?: bigint | null
  _in?: bigint[] | null
  _is_null?: Boolean | null
  _lt?: bigint | null
  _lte?: bigint | null
  _neq?: bigint | null
  _nin?: bigint[] | null
}

/** Boolean expression to compare columns of type "pin_service". All fields are combined with logical 'AND'. */
export interface pin_service_comparison_exp {
  _eq?: pin_service | null
  _gt?: pin_service | null
  _gte?: pin_service | null
  _in?: pin_service[] | null
  _is_null?: Boolean | null
  _lt?: pin_service | null
  _lte?: pin_service | null
  _neq?: pin_service | null
  _nin?: pin_service[] | null
}

/** Boolean expression to compare columns of type "pin_status". All fields are combined with logical 'AND'. */
export interface pin_status_comparison_exp {
  _eq?: pin_status | null
  _gt?: pin_status | null
  _gte?: pin_status | null
  _in?: pin_status[] | null
  _is_null?: Boolean | null
  _lt?: pin_status | null
  _lte?: pin_status | null
  _neq?: pin_status | null
  _nin?: pin_status[] | null
}

/** columns and relationships of "pin" */
export interface pinRequest {
  content_cid?: boolean | number
  id?: boolean | number
  inserted_at?: boolean | number
  service?: boolean | number
  status?: boolean | number
  status_text?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "pin" */
export interface pin_aggregateRequest {
  aggregate?: pin_aggregate_fieldsRequest
  nodes?: pinRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "pin" */
export interface pin_aggregate_fieldsRequest {
  avg?: pin_avg_fieldsRequest
  count?:
    | [{ columns?: pin_select_column[] | null; distinct?: Boolean | null }]
    | boolean
    | number
  max?: pin_max_fieldsRequest
  min?: pin_min_fieldsRequest
  stddev?: pin_stddev_fieldsRequest
  stddev_pop?: pin_stddev_pop_fieldsRequest
  stddev_samp?: pin_stddev_samp_fieldsRequest
  sum?: pin_sum_fieldsRequest
  var_pop?: pin_var_pop_fieldsRequest
  var_samp?: pin_var_samp_fieldsRequest
  variance?: pin_variance_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate avg on columns */
export interface pin_avg_fieldsRequest {
  id?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface pin_max_fieldsRequest {
  content_cid?: boolean | number
  id?: boolean | number
  inserted_at?: boolean | number
  status_text?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface pin_min_fieldsRequest {
  content_cid?: boolean | number
  id?: boolean | number
  inserted_at?: boolean | number
  status_text?: boolean | number
  updated_at?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev on columns */
export interface pin_stddev_fieldsRequest {
  id?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_pop on columns */
export interface pin_stddev_pop_fieldsRequest {
  id?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate stddev_samp on columns */
export interface pin_stddev_samp_fieldsRequest {
  id?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate sum on columns */
export interface pin_sum_fieldsRequest {
  id?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_pop on columns */
export interface pin_var_pop_fieldsRequest {
  id?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate var_samp on columns */
export interface pin_var_samp_fieldsRequest {
  id?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate variance on columns */
export interface pin_variance_fieldsRequest {
  id?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Ordering options when selecting data from "resource". */
export interface resource_order_by {
  content_cid?: order_by | null
  inserted_at?: order_by | null
  ipfs_url?: order_by | null
  status?: order_by | null
  status_text?: order_by | null
  updated_at?: order_by | null
  uri?: order_by | null
}

/** Boolean expression to filter rows from the table "resource". All fields are combined with a logical 'AND'. */
export interface resource_bool_exp {
  _and?: resource_bool_exp[] | null
  _not?: resource_bool_exp | null
  _or?: resource_bool_exp[] | null
  content_cid?: String_comparison_exp | null
  inserted_at?: timestamp_comparison_exp | null
  ipfs_url?: String_comparison_exp | null
  status?: resource_status_comparison_exp | null
  status_text?: String_comparison_exp | null
  updated_at?: timestamp_comparison_exp | null
  uri?: String_comparison_exp | null
}

/** Boolean expression to compare columns of type "resource_status". All fields are combined with logical 'AND'. */
export interface resource_status_comparison_exp {
  _eq?: resource_status | null
  _gt?: resource_status | null
  _gte?: resource_status | null
  _in?: resource_status[] | null
  _is_null?: Boolean | null
  _lt?: resource_status | null
  _lte?: resource_status | null
  _neq?: resource_status | null
  _nin?: resource_status[] | null
}

/** columns and relationships of "resource" */
export interface resourceRequest {
  content_cid?: boolean | number
  inserted_at?: boolean | number
  ipfs_url?: boolean | number
  status?: boolean | number
  status_text?: boolean | number
  updated_at?: boolean | number
  uri?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregated selection of "resource" */
export interface resource_aggregateRequest {
  aggregate?: resource_aggregate_fieldsRequest
  nodes?: resourceRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate fields of "resource" */
export interface resource_aggregate_fieldsRequest {
  count?:
    | [{ columns?: resource_select_column[] | null; distinct?: Boolean | null }]
    | boolean
    | number
  max?: resource_max_fieldsRequest
  min?: resource_min_fieldsRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate max on columns */
export interface resource_max_fieldsRequest {
  content_cid?: boolean | number
  inserted_at?: boolean | number
  ipfs_url?: boolean | number
  status_text?: boolean | number
  updated_at?: boolean | number
  uri?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** aggregate min on columns */
export interface resource_min_fieldsRequest {
  content_cid?: boolean | number
  inserted_at?: boolean | number
  ipfs_url?: boolean | number
  status_text?: boolean | number
  updated_at?: boolean | number
  uri?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** mutation root */
export interface mutation_rootRequest {
  /** delete data from the table: "blockchain_block" */
  delete_blockchain_block?: [
    {
      /** filter the rows which have to be deleted */
      where: blockchain_block_bool_exp
    },
    blockchain_block_mutation_responseRequest
  ]
  /** delete single row from the table: "blockchain_block" */
  delete_blockchain_block_by_pk?: [{ hash: String }, blockchain_blockRequest]
  /** delete data from the table: "blockchain_contract" */
  delete_blockchain_contract?: [
    {
      /** filter the rows which have to be deleted */
      where: blockchain_contract_bool_exp
    },
    blockchain_contract_mutation_responseRequest
  ]
  /** delete single row from the table: "blockchain_contract" */
  delete_blockchain_contract_by_pk?: [
    { id: String },
    blockchain_contractRequest
  ]
  /** delete data from the table: "content" */
  delete_content?: [
    {
      /** filter the rows which have to be deleted */
      where: content_bool_exp
    },
    content_mutation_responseRequest
  ]
  /** delete single row from the table: "content" */
  delete_content_by_pk?: [{ cid: String }, contentRequest]
  /** delete data from the table: "erc721_import" */
  delete_erc721_import?: [
    {
      /** filter the rows which have to be deleted */
      where: erc721_import_bool_exp
    },
    erc721_import_mutation_responseRequest
  ]
  /** delete data from the table: "erc721_import_by_nft" */
  delete_erc721_import_by_nft?: [
    {
      /** filter the rows which have to be deleted */
      where: erc721_import_by_nft_bool_exp
    },
    erc721_import_by_nft_mutation_responseRequest
  ]
  /** delete single row from the table: "erc721_import_by_nft" */
  delete_erc721_import_by_nft_by_pk?: [
    { erc721_import_id: String; nft_id: String },
    erc721_import_by_nftRequest
  ]
  /** delete single row from the table: "erc721_import" */
  delete_erc721_import_by_pk?: [{ id: String }, erc721_importRequest]
  /** delete data from the table: "nft" */
  delete_nft?: [
    {
      /** filter the rows which have to be deleted */
      where: nft_bool_exp
    },
    nft_mutation_responseRequest
  ]
  /** delete data from the table: "nft_asset" */
  delete_nft_asset?: [
    {
      /** filter the rows which have to be deleted */
      where: nft_asset_bool_exp
    },
    nft_asset_mutation_responseRequest
  ]
  /** delete single row from the table: "nft_asset" */
  delete_nft_asset_by_pk?: [{ token_uri: String }, nft_assetRequest]
  /** delete single row from the table: "nft" */
  delete_nft_by_pk?: [{ id: String }, nftRequest]
  /** delete data from the table: "nft_metadata" */
  delete_nft_metadata?: [
    {
      /** filter the rows which have to be deleted */
      where: nft_metadata_bool_exp
    },
    nft_metadata_mutation_responseRequest
  ]
  /** delete single row from the table: "nft_metadata" */
  delete_nft_metadata_by_pk?: [{ content_cid: String }, nft_metadataRequest]
  /** delete data from the table: "nft_owner" */
  delete_nft_owner?: [
    {
      /** filter the rows which have to be deleted */
      where: nft_owner_bool_exp
    },
    nft_owner_mutation_responseRequest
  ]
  /** delete single row from the table: "nft_owner" */
  delete_nft_owner_by_pk?: [{ id: String }, nft_ownerRequest]
  /** delete data from the table: "nfts_by_blockchain_blocks" */
  delete_nfts_by_blockchain_blocks?: [
    {
      /** filter the rows which have to be deleted */
      where: nfts_by_blockchain_blocks_bool_exp
    },
    nfts_by_blockchain_blocks_mutation_responseRequest
  ]
  /** delete single row from the table: "nfts_by_blockchain_blocks" */
  delete_nfts_by_blockchain_blocks_by_pk?: [
    { blockchain_block_hash: String; nft_id: String },
    nfts_by_blockchain_blocksRequest
  ]
  /** delete data from the table: "niftysave_migration" */
  delete_niftysave_migration?: [
    {
      /** filter the rows which have to be deleted */
      where: niftysave_migration_bool_exp
    },
    niftysave_migration_mutation_responseRequest
  ]
  /** delete single row from the table: "niftysave_migration" */
  delete_niftysave_migration_by_pk?: [
    { id: String },
    niftysave_migrationRequest
  ]
  /** delete data from the table: "other_nft_resources" */
  delete_other_nft_resources?: [
    {
      /** filter the rows which have to be deleted */
      where: other_nft_resources_bool_exp
    },
    other_nft_resources_mutation_responseRequest
  ]
  /** delete single row from the table: "other_nft_resources" */
  delete_other_nft_resources_by_pk?: [
    { content_cid: String; resource_uri: String },
    other_nft_resourcesRequest
  ]
  /** delete data from the table: "pin" */
  delete_pin?: [
    {
      /** filter the rows which have to be deleted */
      where: pin_bool_exp
    },
    pin_mutation_responseRequest
  ]
  /** delete single row from the table: "pin" */
  delete_pin_by_pk?: [{ id: bigint }, pinRequest]
  /** delete data from the table: "resource" */
  delete_resource?: [
    {
      /** filter the rows which have to be deleted */
      where: resource_bool_exp
    },
    resource_mutation_responseRequest
  ]
  /** delete single row from the table: "resource" */
  delete_resource_by_pk?: [{ uri: String }, resourceRequest]
  /** insert data into the table: "blockchain_block" */
  insert_blockchain_block?: [
    {
      /** the rows to be inserted */
      objects: blockchain_block_insert_input[]
      /** on conflict condition */
      on_conflict?: blockchain_block_on_conflict | null
    },
    blockchain_block_mutation_responseRequest
  ]
  /** insert a single row into the table: "blockchain_block" */
  insert_blockchain_block_one?: [
    {
      /** the row to be inserted */
      object: blockchain_block_insert_input
      /** on conflict condition */
      on_conflict?: blockchain_block_on_conflict | null
    },
    blockchain_blockRequest
  ]
  /** insert data into the table: "blockchain_contract" */
  insert_blockchain_contract?: [
    {
      /** the rows to be inserted */
      objects: blockchain_contract_insert_input[]
      /** on conflict condition */
      on_conflict?: blockchain_contract_on_conflict | null
    },
    blockchain_contract_mutation_responseRequest
  ]
  /** insert a single row into the table: "blockchain_contract" */
  insert_blockchain_contract_one?: [
    {
      /** the row to be inserted */
      object: blockchain_contract_insert_input
      /** on conflict condition */
      on_conflict?: blockchain_contract_on_conflict | null
    },
    blockchain_contractRequest
  ]
  /** insert data into the table: "content" */
  insert_content?: [
    {
      /** the rows to be inserted */
      objects: content_insert_input[]
      /** on conflict condition */
      on_conflict?: content_on_conflict | null
    },
    content_mutation_responseRequest
  ]
  /** insert a single row into the table: "content" */
  insert_content_one?: [
    {
      /** the row to be inserted */
      object: content_insert_input
      /** on conflict condition */
      on_conflict?: content_on_conflict | null
    },
    contentRequest
  ]
  /** insert data into the table: "erc721_import" */
  insert_erc721_import?: [
    {
      /** the rows to be inserted */
      objects: erc721_import_insert_input[]
      /** on conflict condition */
      on_conflict?: erc721_import_on_conflict | null
    },
    erc721_import_mutation_responseRequest
  ]
  /** insert data into the table: "erc721_import_by_nft" */
  insert_erc721_import_by_nft?: [
    {
      /** the rows to be inserted */
      objects: erc721_import_by_nft_insert_input[]
      /** on conflict condition */
      on_conflict?: erc721_import_by_nft_on_conflict | null
    },
    erc721_import_by_nft_mutation_responseRequest
  ]
  /** insert a single row into the table: "erc721_import_by_nft" */
  insert_erc721_import_by_nft_one?: [
    {
      /** the row to be inserted */
      object: erc721_import_by_nft_insert_input
      /** on conflict condition */
      on_conflict?: erc721_import_by_nft_on_conflict | null
    },
    erc721_import_by_nftRequest
  ]
  /** insert a single row into the table: "erc721_import" */
  insert_erc721_import_one?: [
    {
      /** the row to be inserted */
      object: erc721_import_insert_input
      /** on conflict condition */
      on_conflict?: erc721_import_on_conflict | null
    },
    erc721_importRequest
  ]
  /** insert data into the table: "nft" */
  insert_nft?: [
    {
      /** the rows to be inserted */
      objects: nft_insert_input[]
      /** on conflict condition */
      on_conflict?: nft_on_conflict | null
    },
    nft_mutation_responseRequest
  ]
  /** insert data into the table: "nft_asset" */
  insert_nft_asset?: [
    {
      /** the rows to be inserted */
      objects: nft_asset_insert_input[]
      /** on conflict condition */
      on_conflict?: nft_asset_on_conflict | null
    },
    nft_asset_mutation_responseRequest
  ]
  /** insert a single row into the table: "nft_asset" */
  insert_nft_asset_one?: [
    {
      /** the row to be inserted */
      object: nft_asset_insert_input
      /** on conflict condition */
      on_conflict?: nft_asset_on_conflict | null
    },
    nft_assetRequest
  ]
  /** insert data into the table: "nft_metadata" */
  insert_nft_metadata?: [
    {
      /** the rows to be inserted */
      objects: nft_metadata_insert_input[]
      /** on conflict condition */
      on_conflict?: nft_metadata_on_conflict | null
    },
    nft_metadata_mutation_responseRequest
  ]
  /** insert a single row into the table: "nft_metadata" */
  insert_nft_metadata_one?: [
    {
      /** the row to be inserted */
      object: nft_metadata_insert_input
      /** on conflict condition */
      on_conflict?: nft_metadata_on_conflict | null
    },
    nft_metadataRequest
  ]
  /** insert a single row into the table: "nft" */
  insert_nft_one?: [
    {
      /** the row to be inserted */
      object: nft_insert_input
      /** on conflict condition */
      on_conflict?: nft_on_conflict | null
    },
    nftRequest
  ]
  /** insert data into the table: "nft_owner" */
  insert_nft_owner?: [
    {
      /** the rows to be inserted */
      objects: nft_owner_insert_input[]
      /** on conflict condition */
      on_conflict?: nft_owner_on_conflict | null
    },
    nft_owner_mutation_responseRequest
  ]
  /** insert a single row into the table: "nft_owner" */
  insert_nft_owner_one?: [
    {
      /** the row to be inserted */
      object: nft_owner_insert_input
      /** on conflict condition */
      on_conflict?: nft_owner_on_conflict | null
    },
    nft_ownerRequest
  ]
  /** insert data into the table: "nfts_by_blockchain_blocks" */
  insert_nfts_by_blockchain_blocks?: [
    {
      /** the rows to be inserted */
      objects: nfts_by_blockchain_blocks_insert_input[]
      /** on conflict condition */
      on_conflict?: nfts_by_blockchain_blocks_on_conflict | null
    },
    nfts_by_blockchain_blocks_mutation_responseRequest
  ]
  /** insert a single row into the table: "nfts_by_blockchain_blocks" */
  insert_nfts_by_blockchain_blocks_one?: [
    {
      /** the row to be inserted */
      object: nfts_by_blockchain_blocks_insert_input
      /** on conflict condition */
      on_conflict?: nfts_by_blockchain_blocks_on_conflict | null
    },
    nfts_by_blockchain_blocksRequest
  ]
  /** insert data into the table: "niftysave_migration" */
  insert_niftysave_migration?: [
    {
      /** the rows to be inserted */
      objects: niftysave_migration_insert_input[]
      /** on conflict condition */
      on_conflict?: niftysave_migration_on_conflict | null
    },
    niftysave_migration_mutation_responseRequest
  ]
  /** insert a single row into the table: "niftysave_migration" */
  insert_niftysave_migration_one?: [
    {
      /** the row to be inserted */
      object: niftysave_migration_insert_input
      /** on conflict condition */
      on_conflict?: niftysave_migration_on_conflict | null
    },
    niftysave_migrationRequest
  ]
  /** insert data into the table: "other_nft_resources" */
  insert_other_nft_resources?: [
    {
      /** the rows to be inserted */
      objects: other_nft_resources_insert_input[]
      /** on conflict condition */
      on_conflict?: other_nft_resources_on_conflict | null
    },
    other_nft_resources_mutation_responseRequest
  ]
  /** insert a single row into the table: "other_nft_resources" */
  insert_other_nft_resources_one?: [
    {
      /** the row to be inserted */
      object: other_nft_resources_insert_input
      /** on conflict condition */
      on_conflict?: other_nft_resources_on_conflict | null
    },
    other_nft_resourcesRequest
  ]
  /** insert data into the table: "pin" */
  insert_pin?: [
    {
      /** the rows to be inserted */
      objects: pin_insert_input[]
      /** on conflict condition */
      on_conflict?: pin_on_conflict | null
    },
    pin_mutation_responseRequest
  ]
  /** insert a single row into the table: "pin" */
  insert_pin_one?: [
    {
      /** the row to be inserted */
      object: pin_insert_input
      /** on conflict condition */
      on_conflict?: pin_on_conflict | null
    },
    pinRequest
  ]
  /** insert data into the table: "resource" */
  insert_resource?: [
    {
      /** the rows to be inserted */
      objects: resource_insert_input[]
      /** on conflict condition */
      on_conflict?: resource_on_conflict | null
    },
    resource_mutation_responseRequest
  ]
  /** insert a single row into the table: "resource" */
  insert_resource_one?: [
    {
      /** the row to be inserted */
      object: resource_insert_input
      /** on conflict condition */
      on_conflict?: resource_on_conflict | null
    },
    resourceRequest
  ]
  /** update data of the table: "blockchain_block" */
  update_blockchain_block?: [
    {
      /** increments the numeric columns with given value of the filtered values */
      _inc?: blockchain_block_inc_input | null
      /** sets the columns of the filtered rows to the given values */
      _set?: blockchain_block_set_input | null
      /** filter the rows which have to be updated */
      where: blockchain_block_bool_exp
    },
    blockchain_block_mutation_responseRequest
  ]
  /** update single row of the table: "blockchain_block" */
  update_blockchain_block_by_pk?: [
    {
      /** increments the numeric columns with given value of the filtered values */
      _inc?: blockchain_block_inc_input | null
      /** sets the columns of the filtered rows to the given values */
      _set?: blockchain_block_set_input | null
      pk_columns: blockchain_block_pk_columns_input
    },
    blockchain_blockRequest
  ]
  /** update data of the table: "blockchain_contract" */
  update_blockchain_contract?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: blockchain_contract_set_input | null
      /** filter the rows which have to be updated */
      where: blockchain_contract_bool_exp
    },
    blockchain_contract_mutation_responseRequest
  ]
  /** update single row of the table: "blockchain_contract" */
  update_blockchain_contract_by_pk?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: blockchain_contract_set_input | null
      pk_columns: blockchain_contract_pk_columns_input
    },
    blockchain_contractRequest
  ]
  /** update data of the table: "content" */
  update_content?: [
    {
      /** increments the numeric columns with given value of the filtered values */
      _inc?: content_inc_input | null
      /** sets the columns of the filtered rows to the given values */
      _set?: content_set_input | null
      /** filter the rows which have to be updated */
      where: content_bool_exp
    },
    content_mutation_responseRequest
  ]
  /** update single row of the table: "content" */
  update_content_by_pk?: [
    {
      /** increments the numeric columns with given value of the filtered values */
      _inc?: content_inc_input | null
      /** sets the columns of the filtered rows to the given values */
      _set?: content_set_input | null
      pk_columns: content_pk_columns_input
    },
    contentRequest
  ]
  /** update data of the table: "erc721_import" */
  update_erc721_import?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: erc721_import_set_input | null
      /** filter the rows which have to be updated */
      where: erc721_import_bool_exp
    },
    erc721_import_mutation_responseRequest
  ]
  /** update data of the table: "erc721_import_by_nft" */
  update_erc721_import_by_nft?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: erc721_import_by_nft_set_input | null
      /** filter the rows which have to be updated */
      where: erc721_import_by_nft_bool_exp
    },
    erc721_import_by_nft_mutation_responseRequest
  ]
  /** update single row of the table: "erc721_import_by_nft" */
  update_erc721_import_by_nft_by_pk?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: erc721_import_by_nft_set_input | null
      pk_columns: erc721_import_by_nft_pk_columns_input
    },
    erc721_import_by_nftRequest
  ]
  /** update single row of the table: "erc721_import" */
  update_erc721_import_by_pk?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: erc721_import_set_input | null
      pk_columns: erc721_import_pk_columns_input
    },
    erc721_importRequest
  ]
  /** update data of the table: "nft" */
  update_nft?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: nft_set_input | null
      /** filter the rows which have to be updated */
      where: nft_bool_exp
    },
    nft_mutation_responseRequest
  ]
  /** update data of the table: "nft_asset" */
  update_nft_asset?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: nft_asset_set_input | null
      /** filter the rows which have to be updated */
      where: nft_asset_bool_exp
    },
    nft_asset_mutation_responseRequest
  ]
  /** update single row of the table: "nft_asset" */
  update_nft_asset_by_pk?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: nft_asset_set_input | null
      pk_columns: nft_asset_pk_columns_input
    },
    nft_assetRequest
  ]
  /** update single row of the table: "nft" */
  update_nft_by_pk?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: nft_set_input | null
      pk_columns: nft_pk_columns_input
    },
    nftRequest
  ]
  /** update data of the table: "nft_metadata" */
  update_nft_metadata?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: nft_metadata_set_input | null
      /** filter the rows which have to be updated */
      where: nft_metadata_bool_exp
    },
    nft_metadata_mutation_responseRequest
  ]
  /** update single row of the table: "nft_metadata" */
  update_nft_metadata_by_pk?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: nft_metadata_set_input | null
      pk_columns: nft_metadata_pk_columns_input
    },
    nft_metadataRequest
  ]
  /** update data of the table: "nft_owner" */
  update_nft_owner?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: nft_owner_set_input | null
      /** filter the rows which have to be updated */
      where: nft_owner_bool_exp
    },
    nft_owner_mutation_responseRequest
  ]
  /** update single row of the table: "nft_owner" */
  update_nft_owner_by_pk?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: nft_owner_set_input | null
      pk_columns: nft_owner_pk_columns_input
    },
    nft_ownerRequest
  ]
  /** update data of the table: "nfts_by_blockchain_blocks" */
  update_nfts_by_blockchain_blocks?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: nfts_by_blockchain_blocks_set_input | null
      /** filter the rows which have to be updated */
      where: nfts_by_blockchain_blocks_bool_exp
    },
    nfts_by_blockchain_blocks_mutation_responseRequest
  ]
  /** update single row of the table: "nfts_by_blockchain_blocks" */
  update_nfts_by_blockchain_blocks_by_pk?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: nfts_by_blockchain_blocks_set_input | null
      pk_columns: nfts_by_blockchain_blocks_pk_columns_input
    },
    nfts_by_blockchain_blocksRequest
  ]
  /** update data of the table: "niftysave_migration" */
  update_niftysave_migration?: [
    {
      /** append existing jsonb value of filtered columns with new jsonb value */
      _append?: niftysave_migration_append_input | null
      /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
      _delete_at_path?: niftysave_migration_delete_at_path_input | null
      /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
      _delete_elem?: niftysave_migration_delete_elem_input | null
      /** delete key/value pair or string element. key/value pairs are matched based on their key value */
      _delete_key?: niftysave_migration_delete_key_input | null
      /** prepend existing jsonb value of filtered columns with new jsonb value */
      _prepend?: niftysave_migration_prepend_input | null
      /** sets the columns of the filtered rows to the given values */
      _set?: niftysave_migration_set_input | null
      /** filter the rows which have to be updated */
      where: niftysave_migration_bool_exp
    },
    niftysave_migration_mutation_responseRequest
  ]
  /** update single row of the table: "niftysave_migration" */
  update_niftysave_migration_by_pk?: [
    {
      /** append existing jsonb value of filtered columns with new jsonb value */
      _append?: niftysave_migration_append_input | null
      /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
      _delete_at_path?: niftysave_migration_delete_at_path_input | null
      /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
      _delete_elem?: niftysave_migration_delete_elem_input | null
      /** delete key/value pair or string element. key/value pairs are matched based on their key value */
      _delete_key?: niftysave_migration_delete_key_input | null
      /** prepend existing jsonb value of filtered columns with new jsonb value */
      _prepend?: niftysave_migration_prepend_input | null
      /** sets the columns of the filtered rows to the given values */
      _set?: niftysave_migration_set_input | null
      pk_columns: niftysave_migration_pk_columns_input
    },
    niftysave_migrationRequest
  ]
  /** update data of the table: "other_nft_resources" */
  update_other_nft_resources?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: other_nft_resources_set_input | null
      /** filter the rows which have to be updated */
      where: other_nft_resources_bool_exp
    },
    other_nft_resources_mutation_responseRequest
  ]
  /** update single row of the table: "other_nft_resources" */
  update_other_nft_resources_by_pk?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: other_nft_resources_set_input | null
      pk_columns: other_nft_resources_pk_columns_input
    },
    other_nft_resourcesRequest
  ]
  /** update data of the table: "pin" */
  update_pin?: [
    {
      /** increments the numeric columns with given value of the filtered values */
      _inc?: pin_inc_input | null
      /** sets the columns of the filtered rows to the given values */
      _set?: pin_set_input | null
      /** filter the rows which have to be updated */
      where: pin_bool_exp
    },
    pin_mutation_responseRequest
  ]
  /** update single row of the table: "pin" */
  update_pin_by_pk?: [
    {
      /** increments the numeric columns with given value of the filtered values */
      _inc?: pin_inc_input | null
      /** sets the columns of the filtered rows to the given values */
      _set?: pin_set_input | null
      pk_columns: pin_pk_columns_input
    },
    pinRequest
  ]
  /** update data of the table: "resource" */
  update_resource?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: resource_set_input | null
      /** filter the rows which have to be updated */
      where: resource_bool_exp
    },
    resource_mutation_responseRequest
  ]
  /** update single row of the table: "resource" */
  update_resource_by_pk?: [
    {
      /** sets the columns of the filtered rows to the given values */
      _set?: resource_set_input | null
      pk_columns: resource_pk_columns_input
    },
    resourceRequest
  ]
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "blockchain_block" */
export interface blockchain_block_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: blockchain_blockRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "blockchain_contract" */
export interface blockchain_contract_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: blockchain_contractRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "content" */
export interface content_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: contentRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "erc721_import" */
export interface erc721_import_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: erc721_importRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "erc721_import_by_nft" */
export interface erc721_import_by_nft_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: erc721_import_by_nftRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "nft" */
export interface nft_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: nftRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "nft_asset" */
export interface nft_asset_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: nft_assetRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "nft_metadata" */
export interface nft_metadata_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: nft_metadataRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "nft_owner" */
export interface nft_owner_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: nft_ownerRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: nfts_by_blockchain_blocksRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "niftysave_migration" */
export interface niftysave_migration_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: niftysave_migrationRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "other_nft_resources" */
export interface other_nft_resources_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: other_nft_resourcesRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "pin" */
export interface pin_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: pinRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** response of any mutation on the table "resource" */
export interface resource_mutation_responseRequest {
  /** number of rows affected by the mutation */
  affected_rows?: boolean | number
  /** data from the rows affected by the mutation */
  returning?: resourceRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** input type for inserting data into table "blockchain_block" */
export interface blockchain_block_insert_input {
  hash?: String | null
  inserted_at?: timestamp | null
  number?: Int | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "blockchain_block" */
export interface blockchain_block_on_conflict {
  constraint: blockchain_block_constraint
  update_columns: blockchain_block_update_column[]
  where?: blockchain_block_bool_exp | null
}

/** input type for inserting data into table "blockchain_contract" */
export interface blockchain_contract_insert_input {
  id?: String | null
  inserted_at?: timestamp | null
  name?: String | null
  supports_eip721_metadata?: Boolean | null
  symbol?: String | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "blockchain_contract" */
export interface blockchain_contract_on_conflict {
  constraint: blockchain_contract_constraint
  update_columns: blockchain_contract_update_column[]
  where?: blockchain_contract_bool_exp | null
}

/** input type for inserting data into table "content" */
export interface content_insert_input {
  cid?: String | null
  dag_size?: Int | null
  inserted_at?: timestamp | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "content" */
export interface content_on_conflict {
  constraint: content_constraint
  update_columns: content_update_column[]
  where?: content_bool_exp | null
}

/** input type for inserting data into table "erc721_import" */
export interface erc721_import_insert_input {
  id?: String | null
  inserted_at?: timestamp | null
  next_id?: String | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "erc721_import" */
export interface erc721_import_on_conflict {
  constraint: erc721_import_constraint
  update_columns: erc721_import_update_column[]
  where?: erc721_import_bool_exp | null
}

/** input type for inserting data into table "erc721_import_by_nft" */
export interface erc721_import_by_nft_insert_input {
  erc721_import_id?: String | null
  inserted_at?: timestamp | null
  nft_id?: String | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "erc721_import_by_nft" */
export interface erc721_import_by_nft_on_conflict {
  constraint: erc721_import_by_nft_constraint
  update_columns: erc721_import_by_nft_update_column[]
  where?: erc721_import_by_nft_bool_exp | null
}

/** input type for inserting data into table "nft" */
export interface nft_insert_input {
  contract_id?: String | null
  id?: String | null
  inserted_at?: timestamp | null
  mint_time?: timestamp | null
  nft_owner_id?: String | null
  token_id?: String | null
  token_uri?: String | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "nft" */
export interface nft_on_conflict {
  constraint: nft_constraint
  update_columns: nft_update_column[]
  where?: nft_bool_exp | null
}

/** input type for inserting data into table "nft_asset" */
export interface nft_asset_insert_input {
  content_cid?: String | null
  inserted_at?: timestamp | null
  ipfs_url?: String | null
  status?: nft_asset_status | null
  status_text?: String | null
  token_uri?: String | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "nft_asset" */
export interface nft_asset_on_conflict {
  constraint: nft_asset_constraint
  update_columns: nft_asset_update_column[]
  where?: nft_asset_bool_exp | null
}

/** input type for inserting data into table "nft_metadata" */
export interface nft_metadata_insert_input {
  content_cid?: String | null
  description?: String | null
  image_uri?: String | null
  inserted_at?: timestamp | null
  name?: String | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "nft_metadata" */
export interface nft_metadata_on_conflict {
  constraint: nft_metadata_constraint
  update_columns: nft_metadata_update_column[]
  where?: nft_metadata_bool_exp | null
}

/** input type for inserting data into table "nft_owner" */
export interface nft_owner_insert_input {
  id?: String | null
  inserted_at?: timestamp | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "nft_owner" */
export interface nft_owner_on_conflict {
  constraint: nft_owner_constraint
  update_columns: nft_owner_update_column[]
  where?: nft_owner_bool_exp | null
}

/** input type for inserting data into table "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_insert_input {
  blockchain_block_hash?: String | null
  inserted_at?: timestamp | null
  nft_id?: String | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_on_conflict {
  constraint: nfts_by_blockchain_blocks_constraint
  update_columns: nfts_by_blockchain_blocks_update_column[]
  where?: nfts_by_blockchain_blocks_bool_exp | null
}

/** input type for inserting data into table "niftysave_migration" */
export interface niftysave_migration_insert_input {
  collection?: String | null
  cursor?: String | null
  id?: String | null
  inserted_at?: timestamptz | null
  metadata?: jsonb | null
  updated_at?: timestamptz | null
}

/** on conflict condition type for table "niftysave_migration" */
export interface niftysave_migration_on_conflict {
  constraint: niftysave_migration_constraint
  update_columns: niftysave_migration_update_column[]
  where?: niftysave_migration_bool_exp | null
}

/** input type for inserting data into table "other_nft_resources" */
export interface other_nft_resources_insert_input {
  content_cid?: String | null
  inserted_at?: timestamp | null
  resource_uri?: String | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "other_nft_resources" */
export interface other_nft_resources_on_conflict {
  constraint: other_nft_resources_constraint
  update_columns: other_nft_resources_update_column[]
  where?: other_nft_resources_bool_exp | null
}

/** input type for inserting data into table "pin" */
export interface pin_insert_input {
  content_cid?: String | null
  id?: bigint | null
  inserted_at?: timestamp | null
  service?: pin_service | null
  status?: pin_status | null
  status_text?: String | null
  updated_at?: timestamp | null
}

/** on conflict condition type for table "pin" */
export interface pin_on_conflict {
  constraint: pin_constraint
  update_columns: pin_update_column[]
  where?: pin_bool_exp | null
}

/** input type for inserting data into table "resource" */
export interface resource_insert_input {
  content_cid?: String | null
  inserted_at?: timestamp | null
  ipfs_url?: String | null
  status?: resource_status | null
  status_text?: String | null
  updated_at?: timestamp | null
  uri?: String | null
}

/** on conflict condition type for table "resource" */
export interface resource_on_conflict {
  constraint: resource_constraint
  update_columns: resource_update_column[]
  where?: resource_bool_exp | null
}

/** input type for incrementing numeric columns in table "blockchain_block" */
export interface blockchain_block_inc_input {
  number?: Int | null
}

/** input type for updating data in table "blockchain_block" */
export interface blockchain_block_set_input {
  hash?: String | null
  inserted_at?: timestamp | null
  number?: Int | null
  updated_at?: timestamp | null
}

/** primary key columns input for table: blockchain_block */
export interface blockchain_block_pk_columns_input {
  hash: String
}

/** input type for updating data in table "blockchain_contract" */
export interface blockchain_contract_set_input {
  id?: String | null
  inserted_at?: timestamp | null
  name?: String | null
  supports_eip721_metadata?: Boolean | null
  symbol?: String | null
  updated_at?: timestamp | null
}

/** primary key columns input for table: blockchain_contract */
export interface blockchain_contract_pk_columns_input {
  id: String
}

/** input type for incrementing numeric columns in table "content" */
export interface content_inc_input {
  dag_size?: Int | null
}

/** input type for updating data in table "content" */
export interface content_set_input {
  cid?: String | null
  dag_size?: Int | null
  inserted_at?: timestamp | null
  updated_at?: timestamp | null
}

/** primary key columns input for table: content */
export interface content_pk_columns_input {
  cid: String
}

/** input type for updating data in table "erc721_import" */
export interface erc721_import_set_input {
  id?: String | null
  inserted_at?: timestamp | null
  next_id?: String | null
  updated_at?: timestamp | null
}

/** input type for updating data in table "erc721_import_by_nft" */
export interface erc721_import_by_nft_set_input {
  erc721_import_id?: String | null
  inserted_at?: timestamp | null
  nft_id?: String | null
  updated_at?: timestamp | null
}

/** primary key columns input for table: erc721_import_by_nft */
export interface erc721_import_by_nft_pk_columns_input {
  erc721_import_id: String
  nft_id: String
}

/** primary key columns input for table: erc721_import */
export interface erc721_import_pk_columns_input {
  id: String
}

/** input type for updating data in table "nft" */
export interface nft_set_input {
  contract_id?: String | null
  id?: String | null
  inserted_at?: timestamp | null
  mint_time?: timestamp | null
  nft_owner_id?: String | null
  token_id?: String | null
  token_uri?: String | null
  updated_at?: timestamp | null
}

/** input type for updating data in table "nft_asset" */
export interface nft_asset_set_input {
  content_cid?: String | null
  inserted_at?: timestamp | null
  ipfs_url?: String | null
  status?: nft_asset_status | null
  status_text?: String | null
  token_uri?: String | null
  updated_at?: timestamp | null
}

/** primary key columns input for table: nft_asset */
export interface nft_asset_pk_columns_input {
  token_uri: String
}

/** primary key columns input for table: nft */
export interface nft_pk_columns_input {
  id: String
}

/** input type for updating data in table "nft_metadata" */
export interface nft_metadata_set_input {
  content_cid?: String | null
  description?: String | null
  image_uri?: String | null
  inserted_at?: timestamp | null
  name?: String | null
  updated_at?: timestamp | null
}

/** primary key columns input for table: nft_metadata */
export interface nft_metadata_pk_columns_input {
  content_cid: String
}

/** input type for updating data in table "nft_owner" */
export interface nft_owner_set_input {
  id?: String | null
  inserted_at?: timestamp | null
  updated_at?: timestamp | null
}

/** primary key columns input for table: nft_owner */
export interface nft_owner_pk_columns_input {
  id: String
}

/** input type for updating data in table "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_set_input {
  blockchain_block_hash?: String | null
  inserted_at?: timestamp | null
  nft_id?: String | null
  updated_at?: timestamp | null
}

/** primary key columns input for table: nfts_by_blockchain_blocks */
export interface nfts_by_blockchain_blocks_pk_columns_input {
  blockchain_block_hash: String
  nft_id: String
}

/** append existing jsonb value of filtered columns with new jsonb value */
export interface niftysave_migration_append_input {
  metadata?: jsonb | null
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export interface niftysave_migration_delete_at_path_input {
  metadata?: String[] | null
}

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export interface niftysave_migration_delete_elem_input {
  metadata?: Int | null
}

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export interface niftysave_migration_delete_key_input {
  metadata?: String | null
}

/** prepend existing jsonb value of filtered columns with new jsonb value */
export interface niftysave_migration_prepend_input {
  metadata?: jsonb | null
}

/** input type for updating data in table "niftysave_migration" */
export interface niftysave_migration_set_input {
  collection?: String | null
  cursor?: String | null
  id?: String | null
  inserted_at?: timestamptz | null
  metadata?: jsonb | null
  updated_at?: timestamptz | null
}

/** primary key columns input for table: niftysave_migration */
export interface niftysave_migration_pk_columns_input {
  id: String
}

/** input type for updating data in table "other_nft_resources" */
export interface other_nft_resources_set_input {
  content_cid?: String | null
  inserted_at?: timestamp | null
  resource_uri?: String | null
  updated_at?: timestamp | null
}

/** primary key columns input for table: other_nft_resources */
export interface other_nft_resources_pk_columns_input {
  content_cid: String
  resource_uri: String
}

/** input type for incrementing numeric columns in table "pin" */
export interface pin_inc_input {
  id?: bigint | null
}

/** input type for updating data in table "pin" */
export interface pin_set_input {
  content_cid?: String | null
  id?: bigint | null
  inserted_at?: timestamp | null
  service?: pin_service | null
  status?: pin_status | null
  status_text?: String | null
  updated_at?: timestamp | null
}

/** primary key columns input for table: pin */
export interface pin_pk_columns_input {
  id: bigint
}

/** input type for updating data in table "resource" */
export interface resource_set_input {
  content_cid?: String | null
  inserted_at?: timestamp | null
  ipfs_url?: String | null
  status?: resource_status | null
  status_text?: String | null
  updated_at?: timestamp | null
  uri?: String | null
}

/** primary key columns input for table: resource */
export interface resource_pk_columns_input {
  uri: String
}

export interface subscription_rootRequest {
  /** fetch data from the table: "blockchain_block" */
  blockchain_block?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: blockchain_block_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: blockchain_block_order_by[] | null
          /** filter the rows returned */
          where?: blockchain_block_bool_exp | null
        },
        blockchain_blockRequest
      ]
    | blockchain_blockRequest
  /** fetch aggregated fields from the table: "blockchain_block" */
  blockchain_block_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: blockchain_block_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: blockchain_block_order_by[] | null
          /** filter the rows returned */
          where?: blockchain_block_bool_exp | null
        },
        blockchain_block_aggregateRequest
      ]
    | blockchain_block_aggregateRequest
  /** fetch data from the table: "blockchain_block" using primary key columns */
  blockchain_block_by_pk?: [{ hash: String }, blockchain_blockRequest]
  /** fetch data from the table: "blockchain_contract" */
  blockchain_contract?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: blockchain_contract_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: blockchain_contract_order_by[] | null
          /** filter the rows returned */
          where?: blockchain_contract_bool_exp | null
        },
        blockchain_contractRequest
      ]
    | blockchain_contractRequest
  /** fetch aggregated fields from the table: "blockchain_contract" */
  blockchain_contract_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: blockchain_contract_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: blockchain_contract_order_by[] | null
          /** filter the rows returned */
          where?: blockchain_contract_bool_exp | null
        },
        blockchain_contract_aggregateRequest
      ]
    | blockchain_contract_aggregateRequest
  /** fetch data from the table: "blockchain_contract" using primary key columns */
  blockchain_contract_by_pk?: [{ id: String }, blockchain_contractRequest]
  /** fetch data from the table: "content" */
  content?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: content_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: content_order_by[] | null
          /** filter the rows returned */
          where?: content_bool_exp | null
        },
        contentRequest
      ]
    | contentRequest
  /** fetch aggregated fields from the table: "content" */
  content_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: content_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: content_order_by[] | null
          /** filter the rows returned */
          where?: content_bool_exp | null
        },
        content_aggregateRequest
      ]
    | content_aggregateRequest
  /** fetch data from the table: "content" using primary key columns */
  content_by_pk?: [{ cid: String }, contentRequest]
  /** fetch data from the table: "erc721_import" */
  erc721_import?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: erc721_import_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: erc721_import_order_by[] | null
          /** filter the rows returned */
          where?: erc721_import_bool_exp | null
        },
        erc721_importRequest
      ]
    | erc721_importRequest
  /** fetch aggregated fields from the table: "erc721_import" */
  erc721_import_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: erc721_import_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: erc721_import_order_by[] | null
          /** filter the rows returned */
          where?: erc721_import_bool_exp | null
        },
        erc721_import_aggregateRequest
      ]
    | erc721_import_aggregateRequest
  /** fetch data from the table: "erc721_import_by_nft" */
  erc721_import_by_nft?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: erc721_import_by_nft_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: erc721_import_by_nft_order_by[] | null
          /** filter the rows returned */
          where?: erc721_import_by_nft_bool_exp | null
        },
        erc721_import_by_nftRequest
      ]
    | erc721_import_by_nftRequest
  /** fetch aggregated fields from the table: "erc721_import_by_nft" */
  erc721_import_by_nft_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: erc721_import_by_nft_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: erc721_import_by_nft_order_by[] | null
          /** filter the rows returned */
          where?: erc721_import_by_nft_bool_exp | null
        },
        erc721_import_by_nft_aggregateRequest
      ]
    | erc721_import_by_nft_aggregateRequest
  /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
  erc721_import_by_nft_by_pk?: [
    { erc721_import_id: String; nft_id: String },
    erc721_import_by_nftRequest
  ]
  /** fetch data from the table: "erc721_import" using primary key columns */
  erc721_import_by_pk?: [{ id: String }, erc721_importRequest]
  /** fetch data from the table: "nft" */
  nft?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_order_by[] | null
          /** filter the rows returned */
          where?: nft_bool_exp | null
        },
        nftRequest
      ]
    | nftRequest
  /** fetch aggregated fields from the table: "nft" */
  nft_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_order_by[] | null
          /** filter the rows returned */
          where?: nft_bool_exp | null
        },
        nft_aggregateRequest
      ]
    | nft_aggregateRequest
  /** fetch data from the table: "nft_asset" */
  nft_asset?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_asset_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_asset_order_by[] | null
          /** filter the rows returned */
          where?: nft_asset_bool_exp | null
        },
        nft_assetRequest
      ]
    | nft_assetRequest
  /** fetch aggregated fields from the table: "nft_asset" */
  nft_asset_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_asset_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_asset_order_by[] | null
          /** filter the rows returned */
          where?: nft_asset_bool_exp | null
        },
        nft_asset_aggregateRequest
      ]
    | nft_asset_aggregateRequest
  /** fetch data from the table: "nft_asset" using primary key columns */
  nft_asset_by_pk?: [{ token_uri: String }, nft_assetRequest]
  /** fetch data from the table: "nft" using primary key columns */
  nft_by_pk?: [{ id: String }, nftRequest]
  /** fetch data from the table: "nft_metadata" */
  nft_metadata?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_metadata_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_metadata_order_by[] | null
          /** filter the rows returned */
          where?: nft_metadata_bool_exp | null
        },
        nft_metadataRequest
      ]
    | nft_metadataRequest
  /** fetch aggregated fields from the table: "nft_metadata" */
  nft_metadata_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_metadata_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_metadata_order_by[] | null
          /** filter the rows returned */
          where?: nft_metadata_bool_exp | null
        },
        nft_metadata_aggregateRequest
      ]
    | nft_metadata_aggregateRequest
  /** fetch data from the table: "nft_metadata" using primary key columns */
  nft_metadata_by_pk?: [{ content_cid: String }, nft_metadataRequest]
  /** fetch data from the table: "nft_owner" */
  nft_owner?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_owner_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_owner_order_by[] | null
          /** filter the rows returned */
          where?: nft_owner_bool_exp | null
        },
        nft_ownerRequest
      ]
    | nft_ownerRequest
  /** fetch aggregated fields from the table: "nft_owner" */
  nft_owner_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nft_owner_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nft_owner_order_by[] | null
          /** filter the rows returned */
          where?: nft_owner_bool_exp | null
        },
        nft_owner_aggregateRequest
      ]
    | nft_owner_aggregateRequest
  /** fetch data from the table: "nft_owner" using primary key columns */
  nft_owner_by_pk?: [{ id: String }, nft_ownerRequest]
  /** fetch data from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nfts_by_blockchain_blocks_order_by[] | null
          /** filter the rows returned */
          where?: nfts_by_blockchain_blocks_bool_exp | null
        },
        nfts_by_blockchain_blocksRequest
      ]
    | nfts_by_blockchain_blocksRequest
  /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: nfts_by_blockchain_blocks_order_by[] | null
          /** filter the rows returned */
          where?: nfts_by_blockchain_blocks_bool_exp | null
        },
        nfts_by_blockchain_blocks_aggregateRequest
      ]
    | nfts_by_blockchain_blocks_aggregateRequest
  /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
  nfts_by_blockchain_blocks_by_pk?: [
    { blockchain_block_hash: String; nft_id: String },
    nfts_by_blockchain_blocksRequest
  ]
  /** fetch data from the table: "niftysave_migration" */
  niftysave_migration?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: niftysave_migration_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: niftysave_migration_order_by[] | null
          /** filter the rows returned */
          where?: niftysave_migration_bool_exp | null
        },
        niftysave_migrationRequest
      ]
    | niftysave_migrationRequest
  /** fetch aggregated fields from the table: "niftysave_migration" */
  niftysave_migration_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: niftysave_migration_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: niftysave_migration_order_by[] | null
          /** filter the rows returned */
          where?: niftysave_migration_bool_exp | null
        },
        niftysave_migration_aggregateRequest
      ]
    | niftysave_migration_aggregateRequest
  /** fetch data from the table: "niftysave_migration" using primary key columns */
  niftysave_migration_by_pk?: [{ id: String }, niftysave_migrationRequest]
  /** fetch data from the table: "other_nft_resources" */
  other_nft_resources?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: other_nft_resources_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: other_nft_resources_order_by[] | null
          /** filter the rows returned */
          where?: other_nft_resources_bool_exp | null
        },
        other_nft_resourcesRequest
      ]
    | other_nft_resourcesRequest
  /** fetch aggregated fields from the table: "other_nft_resources" */
  other_nft_resources_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: other_nft_resources_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: other_nft_resources_order_by[] | null
          /** filter the rows returned */
          where?: other_nft_resources_bool_exp | null
        },
        other_nft_resources_aggregateRequest
      ]
    | other_nft_resources_aggregateRequest
  /** fetch data from the table: "other_nft_resources" using primary key columns */
  other_nft_resources_by_pk?: [
    { content_cid: String; resource_uri: String },
    other_nft_resourcesRequest
  ]
  /** fetch data from the table: "pin" */
  pin?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: pin_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: pin_order_by[] | null
          /** filter the rows returned */
          where?: pin_bool_exp | null
        },
        pinRequest
      ]
    | pinRequest
  /** fetch aggregated fields from the table: "pin" */
  pin_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: pin_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: pin_order_by[] | null
          /** filter the rows returned */
          where?: pin_bool_exp | null
        },
        pin_aggregateRequest
      ]
    | pin_aggregateRequest
  /** fetch data from the table: "pin" using primary key columns */
  pin_by_pk?: [{ id: bigint }, pinRequest]
  /** fetch data from the table: "resource" */
  resource?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: resource_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: resource_order_by[] | null
          /** filter the rows returned */
          where?: resource_bool_exp | null
        },
        resourceRequest
      ]
    | resourceRequest
  /** fetch aggregated fields from the table: "resource" */
  resource_aggregate?:
    | [
        {
          /** distinct select on columns */
          distinct_on?: resource_select_column[] | null
          /** limit the number of rows returned */
          limit?: Int | null
          /** skip the first n rows. Use only with order_by */
          offset?: Int | null
          /** sort the rows by one or more columns */
          order_by?: resource_order_by[] | null
          /** filter the rows returned */
          where?: resource_bool_exp | null
        },
        resource_aggregateRequest
      ]
    | resource_aggregateRequest
  /** fetch data from the table: "resource" using primary key columns */
  resource_by_pk?: [{ uri: String }, resourceRequest]
  __typename?: boolean | number
  __scalar?: boolean | number
}

const query_root_possibleTypes = ['query_root']
export const isquery_root = (obj: {
  __typename: String
}): obj is query_root => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return query_root_possibleTypes.includes(obj.__typename)
}

const blockchain_block_possibleTypes = ['blockchain_block']
export const isblockchain_block = (obj: {
  __typename: String
}): obj is blockchain_block => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_possibleTypes.includes(obj.__typename)
}

const blockchain_block_aggregate_possibleTypes = ['blockchain_block_aggregate']
export const isblockchain_block_aggregate = (obj: {
  __typename: String
}): obj is blockchain_block_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_aggregate_possibleTypes.includes(obj.__typename)
}

const blockchain_block_aggregate_fields_possibleTypes = [
  'blockchain_block_aggregate_fields',
]
export const isblockchain_block_aggregate_fields = (obj: {
  __typename: String
}): obj is blockchain_block_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}

const blockchain_block_avg_fields_possibleTypes = [
  'blockchain_block_avg_fields',
]
export const isblockchain_block_avg_fields = (obj: {
  __typename: String
}): obj is blockchain_block_avg_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_avg_fields_possibleTypes.includes(obj.__typename)
}

const blockchain_block_max_fields_possibleTypes = [
  'blockchain_block_max_fields',
]
export const isblockchain_block_max_fields = (obj: {
  __typename: String
}): obj is blockchain_block_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_max_fields_possibleTypes.includes(obj.__typename)
}

const blockchain_block_min_fields_possibleTypes = [
  'blockchain_block_min_fields',
]
export const isblockchain_block_min_fields = (obj: {
  __typename: String
}): obj is blockchain_block_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_min_fields_possibleTypes.includes(obj.__typename)
}

const blockchain_block_stddev_fields_possibleTypes = [
  'blockchain_block_stddev_fields',
]
export const isblockchain_block_stddev_fields = (obj: {
  __typename: String
}): obj is blockchain_block_stddev_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_stddev_fields_possibleTypes.includes(obj.__typename)
}

const blockchain_block_stddev_pop_fields_possibleTypes = [
  'blockchain_block_stddev_pop_fields',
]
export const isblockchain_block_stddev_pop_fields = (obj: {
  __typename: String
}): obj is blockchain_block_stddev_pop_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_stddev_pop_fields_possibleTypes.includes(
    obj.__typename
  )
}

const blockchain_block_stddev_samp_fields_possibleTypes = [
  'blockchain_block_stddev_samp_fields',
]
export const isblockchain_block_stddev_samp_fields = (obj: {
  __typename: String
}): obj is blockchain_block_stddev_samp_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_stddev_samp_fields_possibleTypes.includes(
    obj.__typename
  )
}

const blockchain_block_sum_fields_possibleTypes = [
  'blockchain_block_sum_fields',
]
export const isblockchain_block_sum_fields = (obj: {
  __typename: String
}): obj is blockchain_block_sum_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_sum_fields_possibleTypes.includes(obj.__typename)
}

const blockchain_block_var_pop_fields_possibleTypes = [
  'blockchain_block_var_pop_fields',
]
export const isblockchain_block_var_pop_fields = (obj: {
  __typename: String
}): obj is blockchain_block_var_pop_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_var_pop_fields_possibleTypes.includes(obj.__typename)
}

const blockchain_block_var_samp_fields_possibleTypes = [
  'blockchain_block_var_samp_fields',
]
export const isblockchain_block_var_samp_fields = (obj: {
  __typename: String
}): obj is blockchain_block_var_samp_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_var_samp_fields_possibleTypes.includes(obj.__typename)
}

const blockchain_block_variance_fields_possibleTypes = [
  'blockchain_block_variance_fields',
]
export const isblockchain_block_variance_fields = (obj: {
  __typename: String
}): obj is blockchain_block_variance_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_variance_fields_possibleTypes.includes(obj.__typename)
}

const blockchain_contract_possibleTypes = ['blockchain_contract']
export const isblockchain_contract = (obj: {
  __typename: String
}): obj is blockchain_contract => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_possibleTypes.includes(obj.__typename)
}

const blockchain_contract_aggregate_possibleTypes = [
  'blockchain_contract_aggregate',
]
export const isblockchain_contract_aggregate = (obj: {
  __typename: String
}): obj is blockchain_contract_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_aggregate_possibleTypes.includes(obj.__typename)
}

const blockchain_contract_aggregate_fields_possibleTypes = [
  'blockchain_contract_aggregate_fields',
]
export const isblockchain_contract_aggregate_fields = (obj: {
  __typename: String
}): obj is blockchain_contract_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}

const blockchain_contract_max_fields_possibleTypes = [
  'blockchain_contract_max_fields',
]
export const isblockchain_contract_max_fields = (obj: {
  __typename: String
}): obj is blockchain_contract_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_max_fields_possibleTypes.includes(obj.__typename)
}

const blockchain_contract_min_fields_possibleTypes = [
  'blockchain_contract_min_fields',
]
export const isblockchain_contract_min_fields = (obj: {
  __typename: String
}): obj is blockchain_contract_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_min_fields_possibleTypes.includes(obj.__typename)
}

const content_possibleTypes = ['content']
export const iscontent = (obj: { __typename: String }): obj is content => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_possibleTypes.includes(obj.__typename)
}

const content_aggregate_possibleTypes = ['content_aggregate']
export const iscontent_aggregate = (obj: {
  __typename: String
}): obj is content_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_aggregate_possibleTypes.includes(obj.__typename)
}

const content_aggregate_fields_possibleTypes = ['content_aggregate_fields']
export const iscontent_aggregate_fields = (obj: {
  __typename: String
}): obj is content_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const content_avg_fields_possibleTypes = ['content_avg_fields']
export const iscontent_avg_fields = (obj: {
  __typename: String
}): obj is content_avg_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_avg_fields_possibleTypes.includes(obj.__typename)
}

const content_max_fields_possibleTypes = ['content_max_fields']
export const iscontent_max_fields = (obj: {
  __typename: String
}): obj is content_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_max_fields_possibleTypes.includes(obj.__typename)
}

const content_min_fields_possibleTypes = ['content_min_fields']
export const iscontent_min_fields = (obj: {
  __typename: String
}): obj is content_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_min_fields_possibleTypes.includes(obj.__typename)
}

const content_stddev_fields_possibleTypes = ['content_stddev_fields']
export const iscontent_stddev_fields = (obj: {
  __typename: String
}): obj is content_stddev_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_stddev_fields_possibleTypes.includes(obj.__typename)
}

const content_stddev_pop_fields_possibleTypes = ['content_stddev_pop_fields']
export const iscontent_stddev_pop_fields = (obj: {
  __typename: String
}): obj is content_stddev_pop_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_stddev_pop_fields_possibleTypes.includes(obj.__typename)
}

const content_stddev_samp_fields_possibleTypes = ['content_stddev_samp_fields']
export const iscontent_stddev_samp_fields = (obj: {
  __typename: String
}): obj is content_stddev_samp_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_stddev_samp_fields_possibleTypes.includes(obj.__typename)
}

const content_sum_fields_possibleTypes = ['content_sum_fields']
export const iscontent_sum_fields = (obj: {
  __typename: String
}): obj is content_sum_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_sum_fields_possibleTypes.includes(obj.__typename)
}

const content_var_pop_fields_possibleTypes = ['content_var_pop_fields']
export const iscontent_var_pop_fields = (obj: {
  __typename: String
}): obj is content_var_pop_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_var_pop_fields_possibleTypes.includes(obj.__typename)
}

const content_var_samp_fields_possibleTypes = ['content_var_samp_fields']
export const iscontent_var_samp_fields = (obj: {
  __typename: String
}): obj is content_var_samp_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_var_samp_fields_possibleTypes.includes(obj.__typename)
}

const content_variance_fields_possibleTypes = ['content_variance_fields']
export const iscontent_variance_fields = (obj: {
  __typename: String
}): obj is content_variance_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_variance_fields_possibleTypes.includes(obj.__typename)
}

const erc721_import_possibleTypes = ['erc721_import']
export const iserc721_import = (obj: {
  __typename: String
}): obj is erc721_import => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_possibleTypes.includes(obj.__typename)
}

const erc721_import_aggregate_possibleTypes = ['erc721_import_aggregate']
export const iserc721_import_aggregate = (obj: {
  __typename: String
}): obj is erc721_import_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_aggregate_possibleTypes.includes(obj.__typename)
}

const erc721_import_aggregate_fields_possibleTypes = [
  'erc721_import_aggregate_fields',
]
export const iserc721_import_aggregate_fields = (obj: {
  __typename: String
}): obj is erc721_import_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const erc721_import_max_fields_possibleTypes = ['erc721_import_max_fields']
export const iserc721_import_max_fields = (obj: {
  __typename: String
}): obj is erc721_import_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_max_fields_possibleTypes.includes(obj.__typename)
}

const erc721_import_min_fields_possibleTypes = ['erc721_import_min_fields']
export const iserc721_import_min_fields = (obj: {
  __typename: String
}): obj is erc721_import_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_min_fields_possibleTypes.includes(obj.__typename)
}

const erc721_import_by_nft_possibleTypes = ['erc721_import_by_nft']
export const iserc721_import_by_nft = (obj: {
  __typename: String
}): obj is erc721_import_by_nft => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_possibleTypes.includes(obj.__typename)
}

const erc721_import_by_nft_aggregate_possibleTypes = [
  'erc721_import_by_nft_aggregate',
]
export const iserc721_import_by_nft_aggregate = (obj: {
  __typename: String
}): obj is erc721_import_by_nft_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_aggregate_possibleTypes.includes(obj.__typename)
}

const erc721_import_by_nft_aggregate_fields_possibleTypes = [
  'erc721_import_by_nft_aggregate_fields',
]
export const iserc721_import_by_nft_aggregate_fields = (obj: {
  __typename: String
}): obj is erc721_import_by_nft_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}

const erc721_import_by_nft_max_fields_possibleTypes = [
  'erc721_import_by_nft_max_fields',
]
export const iserc721_import_by_nft_max_fields = (obj: {
  __typename: String
}): obj is erc721_import_by_nft_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_max_fields_possibleTypes.includes(obj.__typename)
}

const erc721_import_by_nft_min_fields_possibleTypes = [
  'erc721_import_by_nft_min_fields',
]
export const iserc721_import_by_nft_min_fields = (obj: {
  __typename: String
}): obj is erc721_import_by_nft_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_min_fields_possibleTypes.includes(obj.__typename)
}

const nft_possibleTypes = ['nft']
export const isnft = (obj: { __typename: String }): obj is nft => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_possibleTypes.includes(obj.__typename)
}

const nft_aggregate_possibleTypes = ['nft_aggregate']
export const isnft_aggregate = (obj: {
  __typename: String
}): obj is nft_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_aggregate_possibleTypes.includes(obj.__typename)
}

const nft_aggregate_fields_possibleTypes = ['nft_aggregate_fields']
export const isnft_aggregate_fields = (obj: {
  __typename: String
}): obj is nft_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const nft_max_fields_possibleTypes = ['nft_max_fields']
export const isnft_max_fields = (obj: {
  __typename: String
}): obj is nft_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_max_fields_possibleTypes.includes(obj.__typename)
}

const nft_min_fields_possibleTypes = ['nft_min_fields']
export const isnft_min_fields = (obj: {
  __typename: String
}): obj is nft_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_min_fields_possibleTypes.includes(obj.__typename)
}

const nft_asset_possibleTypes = ['nft_asset']
export const isnft_asset = (obj: { __typename: String }): obj is nft_asset => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_possibleTypes.includes(obj.__typename)
}

const nft_asset_aggregate_possibleTypes = ['nft_asset_aggregate']
export const isnft_asset_aggregate = (obj: {
  __typename: String
}): obj is nft_asset_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_aggregate_possibleTypes.includes(obj.__typename)
}

const nft_asset_aggregate_fields_possibleTypes = ['nft_asset_aggregate_fields']
export const isnft_asset_aggregate_fields = (obj: {
  __typename: String
}): obj is nft_asset_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const nft_asset_max_fields_possibleTypes = ['nft_asset_max_fields']
export const isnft_asset_max_fields = (obj: {
  __typename: String
}): obj is nft_asset_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_max_fields_possibleTypes.includes(obj.__typename)
}

const nft_asset_min_fields_possibleTypes = ['nft_asset_min_fields']
export const isnft_asset_min_fields = (obj: {
  __typename: String
}): obj is nft_asset_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_min_fields_possibleTypes.includes(obj.__typename)
}

const nft_metadata_possibleTypes = ['nft_metadata']
export const isnft_metadata = (obj: {
  __typename: String
}): obj is nft_metadata => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_possibleTypes.includes(obj.__typename)
}

const nft_metadata_aggregate_possibleTypes = ['nft_metadata_aggregate']
export const isnft_metadata_aggregate = (obj: {
  __typename: String
}): obj is nft_metadata_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_aggregate_possibleTypes.includes(obj.__typename)
}

const nft_metadata_aggregate_fields_possibleTypes = [
  'nft_metadata_aggregate_fields',
]
export const isnft_metadata_aggregate_fields = (obj: {
  __typename: String
}): obj is nft_metadata_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const nft_metadata_max_fields_possibleTypes = ['nft_metadata_max_fields']
export const isnft_metadata_max_fields = (obj: {
  __typename: String
}): obj is nft_metadata_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_max_fields_possibleTypes.includes(obj.__typename)
}

const nft_metadata_min_fields_possibleTypes = ['nft_metadata_min_fields']
export const isnft_metadata_min_fields = (obj: {
  __typename: String
}): obj is nft_metadata_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_min_fields_possibleTypes.includes(obj.__typename)
}

const nft_owner_possibleTypes = ['nft_owner']
export const isnft_owner = (obj: { __typename: String }): obj is nft_owner => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_possibleTypes.includes(obj.__typename)
}

const nft_owner_aggregate_possibleTypes = ['nft_owner_aggregate']
export const isnft_owner_aggregate = (obj: {
  __typename: String
}): obj is nft_owner_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_aggregate_possibleTypes.includes(obj.__typename)
}

const nft_owner_aggregate_fields_possibleTypes = ['nft_owner_aggregate_fields']
export const isnft_owner_aggregate_fields = (obj: {
  __typename: String
}): obj is nft_owner_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const nft_owner_max_fields_possibleTypes = ['nft_owner_max_fields']
export const isnft_owner_max_fields = (obj: {
  __typename: String
}): obj is nft_owner_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_max_fields_possibleTypes.includes(obj.__typename)
}

const nft_owner_min_fields_possibleTypes = ['nft_owner_min_fields']
export const isnft_owner_min_fields = (obj: {
  __typename: String
}): obj is nft_owner_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_min_fields_possibleTypes.includes(obj.__typename)
}

const nfts_by_blockchain_blocks_possibleTypes = ['nfts_by_blockchain_blocks']
export const isnfts_by_blockchain_blocks = (obj: {
  __typename: String
}): obj is nfts_by_blockchain_blocks => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_possibleTypes.includes(obj.__typename)
}

const nfts_by_blockchain_blocks_aggregate_possibleTypes = [
  'nfts_by_blockchain_blocks_aggregate',
]
export const isnfts_by_blockchain_blocks_aggregate = (obj: {
  __typename: String
}): obj is nfts_by_blockchain_blocks_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_aggregate_possibleTypes.includes(
    obj.__typename
  )
}

const nfts_by_blockchain_blocks_aggregate_fields_possibleTypes = [
  'nfts_by_blockchain_blocks_aggregate_fields',
]
export const isnfts_by_blockchain_blocks_aggregate_fields = (obj: {
  __typename: String
}): obj is nfts_by_blockchain_blocks_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}

const nfts_by_blockchain_blocks_max_fields_possibleTypes = [
  'nfts_by_blockchain_blocks_max_fields',
]
export const isnfts_by_blockchain_blocks_max_fields = (obj: {
  __typename: String
}): obj is nfts_by_blockchain_blocks_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_max_fields_possibleTypes.includes(
    obj.__typename
  )
}

const nfts_by_blockchain_blocks_min_fields_possibleTypes = [
  'nfts_by_blockchain_blocks_min_fields',
]
export const isnfts_by_blockchain_blocks_min_fields = (obj: {
  __typename: String
}): obj is nfts_by_blockchain_blocks_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_min_fields_possibleTypes.includes(
    obj.__typename
  )
}

const niftysave_migration_possibleTypes = ['niftysave_migration']
export const isniftysave_migration = (obj: {
  __typename: String
}): obj is niftysave_migration => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_possibleTypes.includes(obj.__typename)
}

const niftysave_migration_aggregate_possibleTypes = [
  'niftysave_migration_aggregate',
]
export const isniftysave_migration_aggregate = (obj: {
  __typename: String
}): obj is niftysave_migration_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_aggregate_possibleTypes.includes(obj.__typename)
}

const niftysave_migration_aggregate_fields_possibleTypes = [
  'niftysave_migration_aggregate_fields',
]
export const isniftysave_migration_aggregate_fields = (obj: {
  __typename: String
}): obj is niftysave_migration_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}

const niftysave_migration_max_fields_possibleTypes = [
  'niftysave_migration_max_fields',
]
export const isniftysave_migration_max_fields = (obj: {
  __typename: String
}): obj is niftysave_migration_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_max_fields_possibleTypes.includes(obj.__typename)
}

const niftysave_migration_min_fields_possibleTypes = [
  'niftysave_migration_min_fields',
]
export const isniftysave_migration_min_fields = (obj: {
  __typename: String
}): obj is niftysave_migration_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_min_fields_possibleTypes.includes(obj.__typename)
}

const other_nft_resources_possibleTypes = ['other_nft_resources']
export const isother_nft_resources = (obj: {
  __typename: String
}): obj is other_nft_resources => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_possibleTypes.includes(obj.__typename)
}

const other_nft_resources_aggregate_possibleTypes = [
  'other_nft_resources_aggregate',
]
export const isother_nft_resources_aggregate = (obj: {
  __typename: String
}): obj is other_nft_resources_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_aggregate_possibleTypes.includes(obj.__typename)
}

const other_nft_resources_aggregate_fields_possibleTypes = [
  'other_nft_resources_aggregate_fields',
]
export const isother_nft_resources_aggregate_fields = (obj: {
  __typename: String
}): obj is other_nft_resources_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}

const other_nft_resources_max_fields_possibleTypes = [
  'other_nft_resources_max_fields',
]
export const isother_nft_resources_max_fields = (obj: {
  __typename: String
}): obj is other_nft_resources_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_max_fields_possibleTypes.includes(obj.__typename)
}

const other_nft_resources_min_fields_possibleTypes = [
  'other_nft_resources_min_fields',
]
export const isother_nft_resources_min_fields = (obj: {
  __typename: String
}): obj is other_nft_resources_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_min_fields_possibleTypes.includes(obj.__typename)
}

const pin_possibleTypes = ['pin']
export const ispin = (obj: { __typename: String }): obj is pin => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_possibleTypes.includes(obj.__typename)
}

const pin_aggregate_possibleTypes = ['pin_aggregate']
export const ispin_aggregate = (obj: {
  __typename: String
}): obj is pin_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_aggregate_possibleTypes.includes(obj.__typename)
}

const pin_aggregate_fields_possibleTypes = ['pin_aggregate_fields']
export const ispin_aggregate_fields = (obj: {
  __typename: String
}): obj is pin_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const pin_avg_fields_possibleTypes = ['pin_avg_fields']
export const ispin_avg_fields = (obj: {
  __typename: String
}): obj is pin_avg_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_avg_fields_possibleTypes.includes(obj.__typename)
}

const pin_max_fields_possibleTypes = ['pin_max_fields']
export const ispin_max_fields = (obj: {
  __typename: String
}): obj is pin_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_max_fields_possibleTypes.includes(obj.__typename)
}

const pin_min_fields_possibleTypes = ['pin_min_fields']
export const ispin_min_fields = (obj: {
  __typename: String
}): obj is pin_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_min_fields_possibleTypes.includes(obj.__typename)
}

const pin_stddev_fields_possibleTypes = ['pin_stddev_fields']
export const ispin_stddev_fields = (obj: {
  __typename: String
}): obj is pin_stddev_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_stddev_fields_possibleTypes.includes(obj.__typename)
}

const pin_stddev_pop_fields_possibleTypes = ['pin_stddev_pop_fields']
export const ispin_stddev_pop_fields = (obj: {
  __typename: String
}): obj is pin_stddev_pop_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_stddev_pop_fields_possibleTypes.includes(obj.__typename)
}

const pin_stddev_samp_fields_possibleTypes = ['pin_stddev_samp_fields']
export const ispin_stddev_samp_fields = (obj: {
  __typename: String
}): obj is pin_stddev_samp_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_stddev_samp_fields_possibleTypes.includes(obj.__typename)
}

const pin_sum_fields_possibleTypes = ['pin_sum_fields']
export const ispin_sum_fields = (obj: {
  __typename: String
}): obj is pin_sum_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_sum_fields_possibleTypes.includes(obj.__typename)
}

const pin_var_pop_fields_possibleTypes = ['pin_var_pop_fields']
export const ispin_var_pop_fields = (obj: {
  __typename: String
}): obj is pin_var_pop_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_var_pop_fields_possibleTypes.includes(obj.__typename)
}

const pin_var_samp_fields_possibleTypes = ['pin_var_samp_fields']
export const ispin_var_samp_fields = (obj: {
  __typename: String
}): obj is pin_var_samp_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_var_samp_fields_possibleTypes.includes(obj.__typename)
}

const pin_variance_fields_possibleTypes = ['pin_variance_fields']
export const ispin_variance_fields = (obj: {
  __typename: String
}): obj is pin_variance_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_variance_fields_possibleTypes.includes(obj.__typename)
}

const resource_possibleTypes = ['resource']
export const isresource = (obj: { __typename: String }): obj is resource => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_possibleTypes.includes(obj.__typename)
}

const resource_aggregate_possibleTypes = ['resource_aggregate']
export const isresource_aggregate = (obj: {
  __typename: String
}): obj is resource_aggregate => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_aggregate_possibleTypes.includes(obj.__typename)
}

const resource_aggregate_fields_possibleTypes = ['resource_aggregate_fields']
export const isresource_aggregate_fields = (obj: {
  __typename: String
}): obj is resource_aggregate_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_aggregate_fields_possibleTypes.includes(obj.__typename)
}

const resource_max_fields_possibleTypes = ['resource_max_fields']
export const isresource_max_fields = (obj: {
  __typename: String
}): obj is resource_max_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_max_fields_possibleTypes.includes(obj.__typename)
}

const resource_min_fields_possibleTypes = ['resource_min_fields']
export const isresource_min_fields = (obj: {
  __typename: String
}): obj is resource_min_fields => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_min_fields_possibleTypes.includes(obj.__typename)
}

const mutation_root_possibleTypes = ['mutation_root']
export const ismutation_root = (obj: {
  __typename: String
}): obj is mutation_root => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return mutation_root_possibleTypes.includes(obj.__typename)
}

const blockchain_block_mutation_response_possibleTypes = [
  'blockchain_block_mutation_response',
]
export const isblockchain_block_mutation_response = (obj: {
  __typename: String
}): obj is blockchain_block_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}

const blockchain_contract_mutation_response_possibleTypes = [
  'blockchain_contract_mutation_response',
]
export const isblockchain_contract_mutation_response = (obj: {
  __typename: String
}): obj is blockchain_contract_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}

const content_mutation_response_possibleTypes = ['content_mutation_response']
export const iscontent_mutation_response = (obj: {
  __typename: String
}): obj is content_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_mutation_response_possibleTypes.includes(obj.__typename)
}

const erc721_import_mutation_response_possibleTypes = [
  'erc721_import_mutation_response',
]
export const iserc721_import_mutation_response = (obj: {
  __typename: String
}): obj is erc721_import_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_mutation_response_possibleTypes.includes(obj.__typename)
}

const erc721_import_by_nft_mutation_response_possibleTypes = [
  'erc721_import_by_nft_mutation_response',
]
export const iserc721_import_by_nft_mutation_response = (obj: {
  __typename: String
}): obj is erc721_import_by_nft_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}

const nft_mutation_response_possibleTypes = ['nft_mutation_response']
export const isnft_mutation_response = (obj: {
  __typename: String
}): obj is nft_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_mutation_response_possibleTypes.includes(obj.__typename)
}

const nft_asset_mutation_response_possibleTypes = [
  'nft_asset_mutation_response',
]
export const isnft_asset_mutation_response = (obj: {
  __typename: String
}): obj is nft_asset_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_mutation_response_possibleTypes.includes(obj.__typename)
}

const nft_metadata_mutation_response_possibleTypes = [
  'nft_metadata_mutation_response',
]
export const isnft_metadata_mutation_response = (obj: {
  __typename: String
}): obj is nft_metadata_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_mutation_response_possibleTypes.includes(obj.__typename)
}

const nft_owner_mutation_response_possibleTypes = [
  'nft_owner_mutation_response',
]
export const isnft_owner_mutation_response = (obj: {
  __typename: String
}): obj is nft_owner_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_mutation_response_possibleTypes.includes(obj.__typename)
}

const nfts_by_blockchain_blocks_mutation_response_possibleTypes = [
  'nfts_by_blockchain_blocks_mutation_response',
]
export const isnfts_by_blockchain_blocks_mutation_response = (obj: {
  __typename: String
}): obj is nfts_by_blockchain_blocks_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}

const niftysave_migration_mutation_response_possibleTypes = [
  'niftysave_migration_mutation_response',
]
export const isniftysave_migration_mutation_response = (obj: {
  __typename: String
}): obj is niftysave_migration_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}

const other_nft_resources_mutation_response_possibleTypes = [
  'other_nft_resources_mutation_response',
]
export const isother_nft_resources_mutation_response = (obj: {
  __typename: String
}): obj is other_nft_resources_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}

const pin_mutation_response_possibleTypes = ['pin_mutation_response']
export const ispin_mutation_response = (obj: {
  __typename: String
}): obj is pin_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_mutation_response_possibleTypes.includes(obj.__typename)
}

const resource_mutation_response_possibleTypes = ['resource_mutation_response']
export const isresource_mutation_response = (obj: {
  __typename: String
}): obj is resource_mutation_response => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_mutation_response_possibleTypes.includes(obj.__typename)
}

const subscription_root_possibleTypes = ['subscription_root']
export const issubscription_root = (obj: {
  __typename: String
}): obj is subscription_root => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return subscription_root_possibleTypes.includes(obj.__typename)
}

export interface query_rootPromiseChain {
  /** fetch data from the table: "blockchain_block" */
  blockchain_block: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_block_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_block_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_block_bool_exp | null
  }) => {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Promise<blockchain_block[]>
  }) & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Promise<blockchain_block[]>
  }
  /** fetch aggregated fields from the table: "blockchain_block" */
  blockchain_block_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_block_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_block_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_block_bool_exp | null
  }) => blockchain_block_aggregatePromiseChain & {
    execute: (
      request: blockchain_block_aggregateRequest,
      defaultValue?: blockchain_block_aggregate
    ) => Promise<blockchain_block_aggregate>
  }) &
    (blockchain_block_aggregatePromiseChain & {
      execute: (
        request: blockchain_block_aggregateRequest,
        defaultValue?: blockchain_block_aggregate
      ) => Promise<blockchain_block_aggregate>
    })
  /** fetch data from the table: "blockchain_block" using primary key columns */
  blockchain_block_by_pk: (args: {
    hash: String
  }) => blockchain_blockPromiseChain & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block | null
    ) => Promise<blockchain_block | null>
  }
  /** fetch data from the table: "blockchain_contract" */
  blockchain_contract: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_contract_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_contract_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_contract_bool_exp | null
  }) => {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Promise<blockchain_contract[]>
  }) & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Promise<blockchain_contract[]>
  }
  /** fetch aggregated fields from the table: "blockchain_contract" */
  blockchain_contract_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_contract_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_contract_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_contract_bool_exp | null
  }) => blockchain_contract_aggregatePromiseChain & {
    execute: (
      request: blockchain_contract_aggregateRequest,
      defaultValue?: blockchain_contract_aggregate
    ) => Promise<blockchain_contract_aggregate>
  }) &
    (blockchain_contract_aggregatePromiseChain & {
      execute: (
        request: blockchain_contract_aggregateRequest,
        defaultValue?: blockchain_contract_aggregate
      ) => Promise<blockchain_contract_aggregate>
    })
  /** fetch data from the table: "blockchain_contract" using primary key columns */
  blockchain_contract_by_pk: (args: {
    id: String
  }) => blockchain_contractPromiseChain & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract | null
    ) => Promise<blockchain_contract | null>
  }
  /** fetch data from the table: "content" */
  content: ((args?: {
    /** distinct select on columns */
    distinct_on?: content_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: content_order_by[] | null
    /** filter the rows returned */
    where?: content_bool_exp | null
  }) => {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Promise<content[]>
  }) & {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Promise<content[]>
  }
  /** fetch aggregated fields from the table: "content" */
  content_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: content_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: content_order_by[] | null
    /** filter the rows returned */
    where?: content_bool_exp | null
  }) => content_aggregatePromiseChain & {
    execute: (
      request: content_aggregateRequest,
      defaultValue?: content_aggregate
    ) => Promise<content_aggregate>
  }) &
    (content_aggregatePromiseChain & {
      execute: (
        request: content_aggregateRequest,
        defaultValue?: content_aggregate
      ) => Promise<content_aggregate>
    })
  /** fetch data from the table: "content" using primary key columns */
  content_by_pk: (args: {
    cid: String
  }) => contentPromiseChain & {
    execute: (
      request: contentRequest,
      defaultValue?: content | null
    ) => Promise<content | null>
  }
  /** fetch data from the table: "erc721_import" */
  erc721_import: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_bool_exp | null
  }) => {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Promise<erc721_import[]>
  }) & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Promise<erc721_import[]>
  }
  /** fetch aggregated fields from the table: "erc721_import" */
  erc721_import_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_bool_exp | null
  }) => erc721_import_aggregatePromiseChain & {
    execute: (
      request: erc721_import_aggregateRequest,
      defaultValue?: erc721_import_aggregate
    ) => Promise<erc721_import_aggregate>
  }) &
    (erc721_import_aggregatePromiseChain & {
      execute: (
        request: erc721_import_aggregateRequest,
        defaultValue?: erc721_import_aggregate
      ) => Promise<erc721_import_aggregate>
    })
  /** fetch data from the table: "erc721_import_by_nft" */
  erc721_import_by_nft: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_by_nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_by_nft_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_by_nft_bool_exp | null
  }) => {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Promise<erc721_import_by_nft[]>
  }) & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Promise<erc721_import_by_nft[]>
  }
  /** fetch aggregated fields from the table: "erc721_import_by_nft" */
  erc721_import_by_nft_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_by_nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_by_nft_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_by_nft_bool_exp | null
  }) => erc721_import_by_nft_aggregatePromiseChain & {
    execute: (
      request: erc721_import_by_nft_aggregateRequest,
      defaultValue?: erc721_import_by_nft_aggregate
    ) => Promise<erc721_import_by_nft_aggregate>
  }) &
    (erc721_import_by_nft_aggregatePromiseChain & {
      execute: (
        request: erc721_import_by_nft_aggregateRequest,
        defaultValue?: erc721_import_by_nft_aggregate
      ) => Promise<erc721_import_by_nft_aggregate>
    })
  /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
  erc721_import_by_nft_by_pk: (args: {
    erc721_import_id: String
    nft_id: String
  }) => erc721_import_by_nftPromiseChain & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft | null
    ) => Promise<erc721_import_by_nft | null>
  }
  /** fetch data from the table: "erc721_import" using primary key columns */
  erc721_import_by_pk: (args: {
    id: String
  }) => erc721_importPromiseChain & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import | null
    ) => Promise<erc721_import | null>
  }
  /** fetch data from the table: "nft" */
  nft: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_order_by[] | null
    /** filter the rows returned */
    where?: nft_bool_exp | null
  }) => {
    execute: (request: nftRequest, defaultValue?: nft[]) => Promise<nft[]>
  }) & {
    execute: (request: nftRequest, defaultValue?: nft[]) => Promise<nft[]>
  }
  /** fetch aggregated fields from the table: "nft" */
  nft_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_order_by[] | null
    /** filter the rows returned */
    where?: nft_bool_exp | null
  }) => nft_aggregatePromiseChain & {
    execute: (
      request: nft_aggregateRequest,
      defaultValue?: nft_aggregate
    ) => Promise<nft_aggregate>
  }) &
    (nft_aggregatePromiseChain & {
      execute: (
        request: nft_aggregateRequest,
        defaultValue?: nft_aggregate
      ) => Promise<nft_aggregate>
    })
  /** fetch data from the table: "nft_asset" */
  nft_asset: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_asset_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_asset_order_by[] | null
    /** filter the rows returned */
    where?: nft_asset_bool_exp | null
  }) => {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Promise<nft_asset[]>
  }) & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Promise<nft_asset[]>
  }
  /** fetch aggregated fields from the table: "nft_asset" */
  nft_asset_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_asset_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_asset_order_by[] | null
    /** filter the rows returned */
    where?: nft_asset_bool_exp | null
  }) => nft_asset_aggregatePromiseChain & {
    execute: (
      request: nft_asset_aggregateRequest,
      defaultValue?: nft_asset_aggregate
    ) => Promise<nft_asset_aggregate>
  }) &
    (nft_asset_aggregatePromiseChain & {
      execute: (
        request: nft_asset_aggregateRequest,
        defaultValue?: nft_asset_aggregate
      ) => Promise<nft_asset_aggregate>
    })
  /** fetch data from the table: "nft_asset" using primary key columns */
  nft_asset_by_pk: (args: {
    token_uri: String
  }) => nft_assetPromiseChain & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset | null
    ) => Promise<nft_asset | null>
  }
  /** fetch data from the table: "nft" using primary key columns */
  nft_by_pk: (args: {
    id: String
  }) => nftPromiseChain & {
    execute: (
      request: nftRequest,
      defaultValue?: nft | null
    ) => Promise<nft | null>
  }
  /** fetch data from the table: "nft_metadata" */
  nft_metadata: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_metadata_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_metadata_order_by[] | null
    /** filter the rows returned */
    where?: nft_metadata_bool_exp | null
  }) => {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Promise<nft_metadata[]>
  }) & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Promise<nft_metadata[]>
  }
  /** fetch aggregated fields from the table: "nft_metadata" */
  nft_metadata_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_metadata_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_metadata_order_by[] | null
    /** filter the rows returned */
    where?: nft_metadata_bool_exp | null
  }) => nft_metadata_aggregatePromiseChain & {
    execute: (
      request: nft_metadata_aggregateRequest,
      defaultValue?: nft_metadata_aggregate
    ) => Promise<nft_metadata_aggregate>
  }) &
    (nft_metadata_aggregatePromiseChain & {
      execute: (
        request: nft_metadata_aggregateRequest,
        defaultValue?: nft_metadata_aggregate
      ) => Promise<nft_metadata_aggregate>
    })
  /** fetch data from the table: "nft_metadata" using primary key columns */
  nft_metadata_by_pk: (args: {
    content_cid: String
  }) => nft_metadataPromiseChain & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata | null
    ) => Promise<nft_metadata | null>
  }
  /** fetch data from the table: "nft_owner" */
  nft_owner: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_owner_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_owner_order_by[] | null
    /** filter the rows returned */
    where?: nft_owner_bool_exp | null
  }) => {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Promise<nft_owner[]>
  }) & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Promise<nft_owner[]>
  }
  /** fetch aggregated fields from the table: "nft_owner" */
  nft_owner_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_owner_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_owner_order_by[] | null
    /** filter the rows returned */
    where?: nft_owner_bool_exp | null
  }) => nft_owner_aggregatePromiseChain & {
    execute: (
      request: nft_owner_aggregateRequest,
      defaultValue?: nft_owner_aggregate
    ) => Promise<nft_owner_aggregate>
  }) &
    (nft_owner_aggregatePromiseChain & {
      execute: (
        request: nft_owner_aggregateRequest,
        defaultValue?: nft_owner_aggregate
      ) => Promise<nft_owner_aggregate>
    })
  /** fetch data from the table: "nft_owner" using primary key columns */
  nft_owner_by_pk: (args: {
    id: String
  }) => nft_ownerPromiseChain & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner | null
    ) => Promise<nft_owner | null>
  }
  /** fetch data from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks: ((args?: {
    /** distinct select on columns */
    distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nfts_by_blockchain_blocks_order_by[] | null
    /** filter the rows returned */
    where?: nfts_by_blockchain_blocks_bool_exp | null
  }) => {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Promise<nfts_by_blockchain_blocks[]>
  }) & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Promise<nfts_by_blockchain_blocks[]>
  }
  /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nfts_by_blockchain_blocks_order_by[] | null
    /** filter the rows returned */
    where?: nfts_by_blockchain_blocks_bool_exp | null
  }) => nfts_by_blockchain_blocks_aggregatePromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocks_aggregateRequest,
      defaultValue?: nfts_by_blockchain_blocks_aggregate
    ) => Promise<nfts_by_blockchain_blocks_aggregate>
  }) &
    (nfts_by_blockchain_blocks_aggregatePromiseChain & {
      execute: (
        request: nfts_by_blockchain_blocks_aggregateRequest,
        defaultValue?: nfts_by_blockchain_blocks_aggregate
      ) => Promise<nfts_by_blockchain_blocks_aggregate>
    })
  /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
  nfts_by_blockchain_blocks_by_pk: (args: {
    blockchain_block_hash: String
    nft_id: String
  }) => nfts_by_blockchain_blocksPromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks | null
    ) => Promise<nfts_by_blockchain_blocks | null>
  }
  /** fetch data from the table: "niftysave_migration" */
  niftysave_migration: ((args?: {
    /** distinct select on columns */
    distinct_on?: niftysave_migration_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: niftysave_migration_order_by[] | null
    /** filter the rows returned */
    where?: niftysave_migration_bool_exp | null
  }) => {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Promise<niftysave_migration[]>
  }) & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Promise<niftysave_migration[]>
  }
  /** fetch aggregated fields from the table: "niftysave_migration" */
  niftysave_migration_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: niftysave_migration_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: niftysave_migration_order_by[] | null
    /** filter the rows returned */
    where?: niftysave_migration_bool_exp | null
  }) => niftysave_migration_aggregatePromiseChain & {
    execute: (
      request: niftysave_migration_aggregateRequest,
      defaultValue?: niftysave_migration_aggregate
    ) => Promise<niftysave_migration_aggregate>
  }) &
    (niftysave_migration_aggregatePromiseChain & {
      execute: (
        request: niftysave_migration_aggregateRequest,
        defaultValue?: niftysave_migration_aggregate
      ) => Promise<niftysave_migration_aggregate>
    })
  /** fetch data from the table: "niftysave_migration" using primary key columns */
  niftysave_migration_by_pk: (args: {
    id: String
  }) => niftysave_migrationPromiseChain & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration | null
    ) => Promise<niftysave_migration | null>
  }
  /** fetch data from the table: "other_nft_resources" */
  other_nft_resources: ((args?: {
    /** distinct select on columns */
    distinct_on?: other_nft_resources_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: other_nft_resources_order_by[] | null
    /** filter the rows returned */
    where?: other_nft_resources_bool_exp | null
  }) => {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Promise<other_nft_resources[]>
  }) & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Promise<other_nft_resources[]>
  }
  /** fetch aggregated fields from the table: "other_nft_resources" */
  other_nft_resources_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: other_nft_resources_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: other_nft_resources_order_by[] | null
    /** filter the rows returned */
    where?: other_nft_resources_bool_exp | null
  }) => other_nft_resources_aggregatePromiseChain & {
    execute: (
      request: other_nft_resources_aggregateRequest,
      defaultValue?: other_nft_resources_aggregate
    ) => Promise<other_nft_resources_aggregate>
  }) &
    (other_nft_resources_aggregatePromiseChain & {
      execute: (
        request: other_nft_resources_aggregateRequest,
        defaultValue?: other_nft_resources_aggregate
      ) => Promise<other_nft_resources_aggregate>
    })
  /** fetch data from the table: "other_nft_resources" using primary key columns */
  other_nft_resources_by_pk: (args: {
    content_cid: String
    resource_uri: String
  }) => other_nft_resourcesPromiseChain & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources | null
    ) => Promise<other_nft_resources | null>
  }
  /** fetch data from the table: "pin" */
  pin: ((args?: {
    /** distinct select on columns */
    distinct_on?: pin_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: pin_order_by[] | null
    /** filter the rows returned */
    where?: pin_bool_exp | null
  }) => {
    execute: (request: pinRequest, defaultValue?: pin[]) => Promise<pin[]>
  }) & {
    execute: (request: pinRequest, defaultValue?: pin[]) => Promise<pin[]>
  }
  /** fetch aggregated fields from the table: "pin" */
  pin_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: pin_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: pin_order_by[] | null
    /** filter the rows returned */
    where?: pin_bool_exp | null
  }) => pin_aggregatePromiseChain & {
    execute: (
      request: pin_aggregateRequest,
      defaultValue?: pin_aggregate
    ) => Promise<pin_aggregate>
  }) &
    (pin_aggregatePromiseChain & {
      execute: (
        request: pin_aggregateRequest,
        defaultValue?: pin_aggregate
      ) => Promise<pin_aggregate>
    })
  /** fetch data from the table: "pin" using primary key columns */
  pin_by_pk: (args: {
    id: bigint
  }) => pinPromiseChain & {
    execute: (
      request: pinRequest,
      defaultValue?: pin | null
    ) => Promise<pin | null>
  }
  /** fetch data from the table: "resource" */
  resource: ((args?: {
    /** distinct select on columns */
    distinct_on?: resource_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: resource_order_by[] | null
    /** filter the rows returned */
    where?: resource_bool_exp | null
  }) => {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Promise<resource[]>
  }) & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Promise<resource[]>
  }
  /** fetch aggregated fields from the table: "resource" */
  resource_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: resource_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: resource_order_by[] | null
    /** filter the rows returned */
    where?: resource_bool_exp | null
  }) => resource_aggregatePromiseChain & {
    execute: (
      request: resource_aggregateRequest,
      defaultValue?: resource_aggregate
    ) => Promise<resource_aggregate>
  }) &
    (resource_aggregatePromiseChain & {
      execute: (
        request: resource_aggregateRequest,
        defaultValue?: resource_aggregate
      ) => Promise<resource_aggregate>
    })
  /** fetch data from the table: "resource" using primary key columns */
  resource_by_pk: (args: {
    uri: String
  }) => resourcePromiseChain & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource | null
    ) => Promise<resource | null>
  }
}

export interface query_rootObservableChain {
  /** fetch data from the table: "blockchain_block" */
  blockchain_block: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_block_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_block_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_block_bool_exp | null
  }) => {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Observable<blockchain_block[]>
  }) & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Observable<blockchain_block[]>
  }
  /** fetch aggregated fields from the table: "blockchain_block" */
  blockchain_block_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_block_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_block_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_block_bool_exp | null
  }) => blockchain_block_aggregateObservableChain & {
    execute: (
      request: blockchain_block_aggregateRequest,
      defaultValue?: blockchain_block_aggregate
    ) => Observable<blockchain_block_aggregate>
  }) &
    (blockchain_block_aggregateObservableChain & {
      execute: (
        request: blockchain_block_aggregateRequest,
        defaultValue?: blockchain_block_aggregate
      ) => Observable<blockchain_block_aggregate>
    })
  /** fetch data from the table: "blockchain_block" using primary key columns */
  blockchain_block_by_pk: (args: {
    hash: String
  }) => blockchain_blockObservableChain & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block | null
    ) => Observable<blockchain_block | null>
  }
  /** fetch data from the table: "blockchain_contract" */
  blockchain_contract: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_contract_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_contract_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_contract_bool_exp | null
  }) => {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Observable<blockchain_contract[]>
  }) & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Observable<blockchain_contract[]>
  }
  /** fetch aggregated fields from the table: "blockchain_contract" */
  blockchain_contract_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_contract_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_contract_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_contract_bool_exp | null
  }) => blockchain_contract_aggregateObservableChain & {
    execute: (
      request: blockchain_contract_aggregateRequest,
      defaultValue?: blockchain_contract_aggregate
    ) => Observable<blockchain_contract_aggregate>
  }) &
    (blockchain_contract_aggregateObservableChain & {
      execute: (
        request: blockchain_contract_aggregateRequest,
        defaultValue?: blockchain_contract_aggregate
      ) => Observable<blockchain_contract_aggregate>
    })
  /** fetch data from the table: "blockchain_contract" using primary key columns */
  blockchain_contract_by_pk: (args: {
    id: String
  }) => blockchain_contractObservableChain & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract | null
    ) => Observable<blockchain_contract | null>
  }
  /** fetch data from the table: "content" */
  content: ((args?: {
    /** distinct select on columns */
    distinct_on?: content_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: content_order_by[] | null
    /** filter the rows returned */
    where?: content_bool_exp | null
  }) => {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Observable<content[]>
  }) & {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Observable<content[]>
  }
  /** fetch aggregated fields from the table: "content" */
  content_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: content_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: content_order_by[] | null
    /** filter the rows returned */
    where?: content_bool_exp | null
  }) => content_aggregateObservableChain & {
    execute: (
      request: content_aggregateRequest,
      defaultValue?: content_aggregate
    ) => Observable<content_aggregate>
  }) &
    (content_aggregateObservableChain & {
      execute: (
        request: content_aggregateRequest,
        defaultValue?: content_aggregate
      ) => Observable<content_aggregate>
    })
  /** fetch data from the table: "content" using primary key columns */
  content_by_pk: (args: {
    cid: String
  }) => contentObservableChain & {
    execute: (
      request: contentRequest,
      defaultValue?: content | null
    ) => Observable<content | null>
  }
  /** fetch data from the table: "erc721_import" */
  erc721_import: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_bool_exp | null
  }) => {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Observable<erc721_import[]>
  }) & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Observable<erc721_import[]>
  }
  /** fetch aggregated fields from the table: "erc721_import" */
  erc721_import_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_bool_exp | null
  }) => erc721_import_aggregateObservableChain & {
    execute: (
      request: erc721_import_aggregateRequest,
      defaultValue?: erc721_import_aggregate
    ) => Observable<erc721_import_aggregate>
  }) &
    (erc721_import_aggregateObservableChain & {
      execute: (
        request: erc721_import_aggregateRequest,
        defaultValue?: erc721_import_aggregate
      ) => Observable<erc721_import_aggregate>
    })
  /** fetch data from the table: "erc721_import_by_nft" */
  erc721_import_by_nft: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_by_nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_by_nft_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_by_nft_bool_exp | null
  }) => {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Observable<erc721_import_by_nft[]>
  }) & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Observable<erc721_import_by_nft[]>
  }
  /** fetch aggregated fields from the table: "erc721_import_by_nft" */
  erc721_import_by_nft_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_by_nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_by_nft_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_by_nft_bool_exp | null
  }) => erc721_import_by_nft_aggregateObservableChain & {
    execute: (
      request: erc721_import_by_nft_aggregateRequest,
      defaultValue?: erc721_import_by_nft_aggregate
    ) => Observable<erc721_import_by_nft_aggregate>
  }) &
    (erc721_import_by_nft_aggregateObservableChain & {
      execute: (
        request: erc721_import_by_nft_aggregateRequest,
        defaultValue?: erc721_import_by_nft_aggregate
      ) => Observable<erc721_import_by_nft_aggregate>
    })
  /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
  erc721_import_by_nft_by_pk: (args: {
    erc721_import_id: String
    nft_id: String
  }) => erc721_import_by_nftObservableChain & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft | null
    ) => Observable<erc721_import_by_nft | null>
  }
  /** fetch data from the table: "erc721_import" using primary key columns */
  erc721_import_by_pk: (args: {
    id: String
  }) => erc721_importObservableChain & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import | null
    ) => Observable<erc721_import | null>
  }
  /** fetch data from the table: "nft" */
  nft: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_order_by[] | null
    /** filter the rows returned */
    where?: nft_bool_exp | null
  }) => {
    execute: (request: nftRequest, defaultValue?: nft[]) => Observable<nft[]>
  }) & {
    execute: (request: nftRequest, defaultValue?: nft[]) => Observable<nft[]>
  }
  /** fetch aggregated fields from the table: "nft" */
  nft_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_order_by[] | null
    /** filter the rows returned */
    where?: nft_bool_exp | null
  }) => nft_aggregateObservableChain & {
    execute: (
      request: nft_aggregateRequest,
      defaultValue?: nft_aggregate
    ) => Observable<nft_aggregate>
  }) &
    (nft_aggregateObservableChain & {
      execute: (
        request: nft_aggregateRequest,
        defaultValue?: nft_aggregate
      ) => Observable<nft_aggregate>
    })
  /** fetch data from the table: "nft_asset" */
  nft_asset: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_asset_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_asset_order_by[] | null
    /** filter the rows returned */
    where?: nft_asset_bool_exp | null
  }) => {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Observable<nft_asset[]>
  }) & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Observable<nft_asset[]>
  }
  /** fetch aggregated fields from the table: "nft_asset" */
  nft_asset_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_asset_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_asset_order_by[] | null
    /** filter the rows returned */
    where?: nft_asset_bool_exp | null
  }) => nft_asset_aggregateObservableChain & {
    execute: (
      request: nft_asset_aggregateRequest,
      defaultValue?: nft_asset_aggregate
    ) => Observable<nft_asset_aggregate>
  }) &
    (nft_asset_aggregateObservableChain & {
      execute: (
        request: nft_asset_aggregateRequest,
        defaultValue?: nft_asset_aggregate
      ) => Observable<nft_asset_aggregate>
    })
  /** fetch data from the table: "nft_asset" using primary key columns */
  nft_asset_by_pk: (args: {
    token_uri: String
  }) => nft_assetObservableChain & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset | null
    ) => Observable<nft_asset | null>
  }
  /** fetch data from the table: "nft" using primary key columns */
  nft_by_pk: (args: {
    id: String
  }) => nftObservableChain & {
    execute: (
      request: nftRequest,
      defaultValue?: nft | null
    ) => Observable<nft | null>
  }
  /** fetch data from the table: "nft_metadata" */
  nft_metadata: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_metadata_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_metadata_order_by[] | null
    /** filter the rows returned */
    where?: nft_metadata_bool_exp | null
  }) => {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Observable<nft_metadata[]>
  }) & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Observable<nft_metadata[]>
  }
  /** fetch aggregated fields from the table: "nft_metadata" */
  nft_metadata_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_metadata_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_metadata_order_by[] | null
    /** filter the rows returned */
    where?: nft_metadata_bool_exp | null
  }) => nft_metadata_aggregateObservableChain & {
    execute: (
      request: nft_metadata_aggregateRequest,
      defaultValue?: nft_metadata_aggregate
    ) => Observable<nft_metadata_aggregate>
  }) &
    (nft_metadata_aggregateObservableChain & {
      execute: (
        request: nft_metadata_aggregateRequest,
        defaultValue?: nft_metadata_aggregate
      ) => Observable<nft_metadata_aggregate>
    })
  /** fetch data from the table: "nft_metadata" using primary key columns */
  nft_metadata_by_pk: (args: {
    content_cid: String
  }) => nft_metadataObservableChain & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata | null
    ) => Observable<nft_metadata | null>
  }
  /** fetch data from the table: "nft_owner" */
  nft_owner: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_owner_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_owner_order_by[] | null
    /** filter the rows returned */
    where?: nft_owner_bool_exp | null
  }) => {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Observable<nft_owner[]>
  }) & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Observable<nft_owner[]>
  }
  /** fetch aggregated fields from the table: "nft_owner" */
  nft_owner_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_owner_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_owner_order_by[] | null
    /** filter the rows returned */
    where?: nft_owner_bool_exp | null
  }) => nft_owner_aggregateObservableChain & {
    execute: (
      request: nft_owner_aggregateRequest,
      defaultValue?: nft_owner_aggregate
    ) => Observable<nft_owner_aggregate>
  }) &
    (nft_owner_aggregateObservableChain & {
      execute: (
        request: nft_owner_aggregateRequest,
        defaultValue?: nft_owner_aggregate
      ) => Observable<nft_owner_aggregate>
    })
  /** fetch data from the table: "nft_owner" using primary key columns */
  nft_owner_by_pk: (args: {
    id: String
  }) => nft_ownerObservableChain & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner | null
    ) => Observable<nft_owner | null>
  }
  /** fetch data from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks: ((args?: {
    /** distinct select on columns */
    distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nfts_by_blockchain_blocks_order_by[] | null
    /** filter the rows returned */
    where?: nfts_by_blockchain_blocks_bool_exp | null
  }) => {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Observable<nfts_by_blockchain_blocks[]>
  }) & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Observable<nfts_by_blockchain_blocks[]>
  }
  /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nfts_by_blockchain_blocks_order_by[] | null
    /** filter the rows returned */
    where?: nfts_by_blockchain_blocks_bool_exp | null
  }) => nfts_by_blockchain_blocks_aggregateObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocks_aggregateRequest,
      defaultValue?: nfts_by_blockchain_blocks_aggregate
    ) => Observable<nfts_by_blockchain_blocks_aggregate>
  }) &
    (nfts_by_blockchain_blocks_aggregateObservableChain & {
      execute: (
        request: nfts_by_blockchain_blocks_aggregateRequest,
        defaultValue?: nfts_by_blockchain_blocks_aggregate
      ) => Observable<nfts_by_blockchain_blocks_aggregate>
    })
  /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
  nfts_by_blockchain_blocks_by_pk: (args: {
    blockchain_block_hash: String
    nft_id: String
  }) => nfts_by_blockchain_blocksObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks | null
    ) => Observable<nfts_by_blockchain_blocks | null>
  }
  /** fetch data from the table: "niftysave_migration" */
  niftysave_migration: ((args?: {
    /** distinct select on columns */
    distinct_on?: niftysave_migration_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: niftysave_migration_order_by[] | null
    /** filter the rows returned */
    where?: niftysave_migration_bool_exp | null
  }) => {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Observable<niftysave_migration[]>
  }) & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Observable<niftysave_migration[]>
  }
  /** fetch aggregated fields from the table: "niftysave_migration" */
  niftysave_migration_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: niftysave_migration_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: niftysave_migration_order_by[] | null
    /** filter the rows returned */
    where?: niftysave_migration_bool_exp | null
  }) => niftysave_migration_aggregateObservableChain & {
    execute: (
      request: niftysave_migration_aggregateRequest,
      defaultValue?: niftysave_migration_aggregate
    ) => Observable<niftysave_migration_aggregate>
  }) &
    (niftysave_migration_aggregateObservableChain & {
      execute: (
        request: niftysave_migration_aggregateRequest,
        defaultValue?: niftysave_migration_aggregate
      ) => Observable<niftysave_migration_aggregate>
    })
  /** fetch data from the table: "niftysave_migration" using primary key columns */
  niftysave_migration_by_pk: (args: {
    id: String
  }) => niftysave_migrationObservableChain & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration | null
    ) => Observable<niftysave_migration | null>
  }
  /** fetch data from the table: "other_nft_resources" */
  other_nft_resources: ((args?: {
    /** distinct select on columns */
    distinct_on?: other_nft_resources_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: other_nft_resources_order_by[] | null
    /** filter the rows returned */
    where?: other_nft_resources_bool_exp | null
  }) => {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Observable<other_nft_resources[]>
  }) & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Observable<other_nft_resources[]>
  }
  /** fetch aggregated fields from the table: "other_nft_resources" */
  other_nft_resources_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: other_nft_resources_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: other_nft_resources_order_by[] | null
    /** filter the rows returned */
    where?: other_nft_resources_bool_exp | null
  }) => other_nft_resources_aggregateObservableChain & {
    execute: (
      request: other_nft_resources_aggregateRequest,
      defaultValue?: other_nft_resources_aggregate
    ) => Observable<other_nft_resources_aggregate>
  }) &
    (other_nft_resources_aggregateObservableChain & {
      execute: (
        request: other_nft_resources_aggregateRequest,
        defaultValue?: other_nft_resources_aggregate
      ) => Observable<other_nft_resources_aggregate>
    })
  /** fetch data from the table: "other_nft_resources" using primary key columns */
  other_nft_resources_by_pk: (args: {
    content_cid: String
    resource_uri: String
  }) => other_nft_resourcesObservableChain & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources | null
    ) => Observable<other_nft_resources | null>
  }
  /** fetch data from the table: "pin" */
  pin: ((args?: {
    /** distinct select on columns */
    distinct_on?: pin_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: pin_order_by[] | null
    /** filter the rows returned */
    where?: pin_bool_exp | null
  }) => {
    execute: (request: pinRequest, defaultValue?: pin[]) => Observable<pin[]>
  }) & {
    execute: (request: pinRequest, defaultValue?: pin[]) => Observable<pin[]>
  }
  /** fetch aggregated fields from the table: "pin" */
  pin_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: pin_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: pin_order_by[] | null
    /** filter the rows returned */
    where?: pin_bool_exp | null
  }) => pin_aggregateObservableChain & {
    execute: (
      request: pin_aggregateRequest,
      defaultValue?: pin_aggregate
    ) => Observable<pin_aggregate>
  }) &
    (pin_aggregateObservableChain & {
      execute: (
        request: pin_aggregateRequest,
        defaultValue?: pin_aggregate
      ) => Observable<pin_aggregate>
    })
  /** fetch data from the table: "pin" using primary key columns */
  pin_by_pk: (args: {
    id: bigint
  }) => pinObservableChain & {
    execute: (
      request: pinRequest,
      defaultValue?: pin | null
    ) => Observable<pin | null>
  }
  /** fetch data from the table: "resource" */
  resource: ((args?: {
    /** distinct select on columns */
    distinct_on?: resource_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: resource_order_by[] | null
    /** filter the rows returned */
    where?: resource_bool_exp | null
  }) => {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Observable<resource[]>
  }) & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Observable<resource[]>
  }
  /** fetch aggregated fields from the table: "resource" */
  resource_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: resource_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: resource_order_by[] | null
    /** filter the rows returned */
    where?: resource_bool_exp | null
  }) => resource_aggregateObservableChain & {
    execute: (
      request: resource_aggregateRequest,
      defaultValue?: resource_aggregate
    ) => Observable<resource_aggregate>
  }) &
    (resource_aggregateObservableChain & {
      execute: (
        request: resource_aggregateRequest,
        defaultValue?: resource_aggregate
      ) => Observable<resource_aggregate>
    })
  /** fetch data from the table: "resource" using primary key columns */
  resource_by_pk: (args: {
    uri: String
  }) => resourceObservableChain & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource | null
    ) => Observable<resource | null>
  }
}

/** columns and relationships of "blockchain_block" */
export interface blockchain_blockPromiseChain {
  hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  number: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "blockchain_block" */
export interface blockchain_blockObservableChain {
  hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  number: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "blockchain_block" */
export interface blockchain_block_aggregatePromiseChain {
  aggregate: blockchain_block_aggregate_fieldsPromiseChain & {
    execute: (
      request: blockchain_block_aggregate_fieldsRequest,
      defaultValue?: blockchain_block_aggregate_fields | null
    ) => Promise<blockchain_block_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Promise<blockchain_block[]>
  }
}

/** aggregated selection of "blockchain_block" */
export interface blockchain_block_aggregateObservableChain {
  aggregate: blockchain_block_aggregate_fieldsObservableChain & {
    execute: (
      request: blockchain_block_aggregate_fieldsRequest,
      defaultValue?: blockchain_block_aggregate_fields | null
    ) => Observable<blockchain_block_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Observable<blockchain_block[]>
  }
}

/** aggregate fields of "blockchain_block" */
export interface blockchain_block_aggregate_fieldsPromiseChain {
  avg: blockchain_block_avg_fieldsPromiseChain & {
    execute: (
      request: blockchain_block_avg_fieldsRequest,
      defaultValue?: blockchain_block_avg_fields | null
    ) => Promise<blockchain_block_avg_fields | null>
  }
  count: ((args?: {
    columns?: blockchain_block_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: blockchain_block_max_fieldsPromiseChain & {
    execute: (
      request: blockchain_block_max_fieldsRequest,
      defaultValue?: blockchain_block_max_fields | null
    ) => Promise<blockchain_block_max_fields | null>
  }
  min: blockchain_block_min_fieldsPromiseChain & {
    execute: (
      request: blockchain_block_min_fieldsRequest,
      defaultValue?: blockchain_block_min_fields | null
    ) => Promise<blockchain_block_min_fields | null>
  }
  stddev: blockchain_block_stddev_fieldsPromiseChain & {
    execute: (
      request: blockchain_block_stddev_fieldsRequest,
      defaultValue?: blockchain_block_stddev_fields | null
    ) => Promise<blockchain_block_stddev_fields | null>
  }
  stddev_pop: blockchain_block_stddev_pop_fieldsPromiseChain & {
    execute: (
      request: blockchain_block_stddev_pop_fieldsRequest,
      defaultValue?: blockchain_block_stddev_pop_fields | null
    ) => Promise<blockchain_block_stddev_pop_fields | null>
  }
  stddev_samp: blockchain_block_stddev_samp_fieldsPromiseChain & {
    execute: (
      request: blockchain_block_stddev_samp_fieldsRequest,
      defaultValue?: blockchain_block_stddev_samp_fields | null
    ) => Promise<blockchain_block_stddev_samp_fields | null>
  }
  sum: blockchain_block_sum_fieldsPromiseChain & {
    execute: (
      request: blockchain_block_sum_fieldsRequest,
      defaultValue?: blockchain_block_sum_fields | null
    ) => Promise<blockchain_block_sum_fields | null>
  }
  var_pop: blockchain_block_var_pop_fieldsPromiseChain & {
    execute: (
      request: blockchain_block_var_pop_fieldsRequest,
      defaultValue?: blockchain_block_var_pop_fields | null
    ) => Promise<blockchain_block_var_pop_fields | null>
  }
  var_samp: blockchain_block_var_samp_fieldsPromiseChain & {
    execute: (
      request: blockchain_block_var_samp_fieldsRequest,
      defaultValue?: blockchain_block_var_samp_fields | null
    ) => Promise<blockchain_block_var_samp_fields | null>
  }
  variance: blockchain_block_variance_fieldsPromiseChain & {
    execute: (
      request: blockchain_block_variance_fieldsRequest,
      defaultValue?: blockchain_block_variance_fields | null
    ) => Promise<blockchain_block_variance_fields | null>
  }
}

/** aggregate fields of "blockchain_block" */
export interface blockchain_block_aggregate_fieldsObservableChain {
  avg: blockchain_block_avg_fieldsObservableChain & {
    execute: (
      request: blockchain_block_avg_fieldsRequest,
      defaultValue?: blockchain_block_avg_fields | null
    ) => Observable<blockchain_block_avg_fields | null>
  }
  count: ((args?: {
    columns?: blockchain_block_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: blockchain_block_max_fieldsObservableChain & {
    execute: (
      request: blockchain_block_max_fieldsRequest,
      defaultValue?: blockchain_block_max_fields | null
    ) => Observable<blockchain_block_max_fields | null>
  }
  min: blockchain_block_min_fieldsObservableChain & {
    execute: (
      request: blockchain_block_min_fieldsRequest,
      defaultValue?: blockchain_block_min_fields | null
    ) => Observable<blockchain_block_min_fields | null>
  }
  stddev: blockchain_block_stddev_fieldsObservableChain & {
    execute: (
      request: blockchain_block_stddev_fieldsRequest,
      defaultValue?: blockchain_block_stddev_fields | null
    ) => Observable<blockchain_block_stddev_fields | null>
  }
  stddev_pop: blockchain_block_stddev_pop_fieldsObservableChain & {
    execute: (
      request: blockchain_block_stddev_pop_fieldsRequest,
      defaultValue?: blockchain_block_stddev_pop_fields | null
    ) => Observable<blockchain_block_stddev_pop_fields | null>
  }
  stddev_samp: blockchain_block_stddev_samp_fieldsObservableChain & {
    execute: (
      request: blockchain_block_stddev_samp_fieldsRequest,
      defaultValue?: blockchain_block_stddev_samp_fields | null
    ) => Observable<blockchain_block_stddev_samp_fields | null>
  }
  sum: blockchain_block_sum_fieldsObservableChain & {
    execute: (
      request: blockchain_block_sum_fieldsRequest,
      defaultValue?: blockchain_block_sum_fields | null
    ) => Observable<blockchain_block_sum_fields | null>
  }
  var_pop: blockchain_block_var_pop_fieldsObservableChain & {
    execute: (
      request: blockchain_block_var_pop_fieldsRequest,
      defaultValue?: blockchain_block_var_pop_fields | null
    ) => Observable<blockchain_block_var_pop_fields | null>
  }
  var_samp: blockchain_block_var_samp_fieldsObservableChain & {
    execute: (
      request: blockchain_block_var_samp_fieldsRequest,
      defaultValue?: blockchain_block_var_samp_fields | null
    ) => Observable<blockchain_block_var_samp_fields | null>
  }
  variance: blockchain_block_variance_fieldsObservableChain & {
    execute: (
      request: blockchain_block_variance_fieldsRequest,
      defaultValue?: blockchain_block_variance_fields | null
    ) => Observable<blockchain_block_variance_fields | null>
  }
}

/** aggregate avg on columns */
export interface blockchain_block_avg_fieldsPromiseChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate avg on columns */
export interface blockchain_block_avg_fieldsObservableChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate max on columns */
export interface blockchain_block_max_fieldsPromiseChain {
  hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Promise<Int | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface blockchain_block_max_fieldsObservableChain {
  hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Observable<Int | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface blockchain_block_min_fieldsPromiseChain {
  hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Promise<Int | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface blockchain_block_min_fieldsObservableChain {
  hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Observable<Int | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate stddev on columns */
export interface blockchain_block_stddev_fieldsPromiseChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate stddev on columns */
export interface blockchain_block_stddev_fieldsObservableChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate stddev_pop on columns */
export interface blockchain_block_stddev_pop_fieldsPromiseChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate stddev_pop on columns */
export interface blockchain_block_stddev_pop_fieldsObservableChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate stddev_samp on columns */
export interface blockchain_block_stddev_samp_fieldsPromiseChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate stddev_samp on columns */
export interface blockchain_block_stddev_samp_fieldsObservableChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate sum on columns */
export interface blockchain_block_sum_fieldsPromiseChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Promise<Int | null>
  }
}

/** aggregate sum on columns */
export interface blockchain_block_sum_fieldsObservableChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Observable<Int | null>
  }
}

/** aggregate var_pop on columns */
export interface blockchain_block_var_pop_fieldsPromiseChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate var_pop on columns */
export interface blockchain_block_var_pop_fieldsObservableChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate var_samp on columns */
export interface blockchain_block_var_samp_fieldsPromiseChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate var_samp on columns */
export interface blockchain_block_var_samp_fieldsObservableChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate variance on columns */
export interface blockchain_block_variance_fieldsPromiseChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate variance on columns */
export interface blockchain_block_variance_fieldsObservableChain {
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** columns and relationships of "blockchain_contract" */
export interface blockchain_contractPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  supports_eip721_metadata: {
    execute: (
      request?: boolean | number,
      defaultValue?: Boolean
    ) => Promise<Boolean>
  }
  symbol: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "blockchain_contract" */
export interface blockchain_contractObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  supports_eip721_metadata: {
    execute: (
      request?: boolean | number,
      defaultValue?: Boolean
    ) => Observable<Boolean>
  }
  symbol: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "blockchain_contract" */
export interface blockchain_contract_aggregatePromiseChain {
  aggregate: blockchain_contract_aggregate_fieldsPromiseChain & {
    execute: (
      request: blockchain_contract_aggregate_fieldsRequest,
      defaultValue?: blockchain_contract_aggregate_fields | null
    ) => Promise<blockchain_contract_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Promise<blockchain_contract[]>
  }
}

/** aggregated selection of "blockchain_contract" */
export interface blockchain_contract_aggregateObservableChain {
  aggregate: blockchain_contract_aggregate_fieldsObservableChain & {
    execute: (
      request: blockchain_contract_aggregate_fieldsRequest,
      defaultValue?: blockchain_contract_aggregate_fields | null
    ) => Observable<blockchain_contract_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Observable<blockchain_contract[]>
  }
}

/** aggregate fields of "blockchain_contract" */
export interface blockchain_contract_aggregate_fieldsPromiseChain {
  count: ((args?: {
    columns?: blockchain_contract_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: blockchain_contract_max_fieldsPromiseChain & {
    execute: (
      request: blockchain_contract_max_fieldsRequest,
      defaultValue?: blockchain_contract_max_fields | null
    ) => Promise<blockchain_contract_max_fields | null>
  }
  min: blockchain_contract_min_fieldsPromiseChain & {
    execute: (
      request: blockchain_contract_min_fieldsRequest,
      defaultValue?: blockchain_contract_min_fields | null
    ) => Promise<blockchain_contract_min_fields | null>
  }
}

/** aggregate fields of "blockchain_contract" */
export interface blockchain_contract_aggregate_fieldsObservableChain {
  count: ((args?: {
    columns?: blockchain_contract_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: blockchain_contract_max_fieldsObservableChain & {
    execute: (
      request: blockchain_contract_max_fieldsRequest,
      defaultValue?: blockchain_contract_max_fields | null
    ) => Observable<blockchain_contract_max_fields | null>
  }
  min: blockchain_contract_min_fieldsObservableChain & {
    execute: (
      request: blockchain_contract_min_fieldsRequest,
      defaultValue?: blockchain_contract_min_fields | null
    ) => Observable<blockchain_contract_min_fields | null>
  }
}

/** aggregate max on columns */
export interface blockchain_contract_max_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  symbol: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface blockchain_contract_max_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  symbol: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface blockchain_contract_min_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  symbol: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface blockchain_contract_min_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  symbol: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** columns and relationships of "content" */
export interface contentPromiseChain {
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Promise<Int | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "content" */
export interface contentObservableChain {
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Observable<Int | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "content" */
export interface content_aggregatePromiseChain {
  aggregate: content_aggregate_fieldsPromiseChain & {
    execute: (
      request: content_aggregate_fieldsRequest,
      defaultValue?: content_aggregate_fields | null
    ) => Promise<content_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Promise<content[]>
  }
}

/** aggregated selection of "content" */
export interface content_aggregateObservableChain {
  aggregate: content_aggregate_fieldsObservableChain & {
    execute: (
      request: content_aggregate_fieldsRequest,
      defaultValue?: content_aggregate_fields | null
    ) => Observable<content_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Observable<content[]>
  }
}

/** aggregate fields of "content" */
export interface content_aggregate_fieldsPromiseChain {
  avg: content_avg_fieldsPromiseChain & {
    execute: (
      request: content_avg_fieldsRequest,
      defaultValue?: content_avg_fields | null
    ) => Promise<content_avg_fields | null>
  }
  count: ((args?: {
    columns?: content_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: content_max_fieldsPromiseChain & {
    execute: (
      request: content_max_fieldsRequest,
      defaultValue?: content_max_fields | null
    ) => Promise<content_max_fields | null>
  }
  min: content_min_fieldsPromiseChain & {
    execute: (
      request: content_min_fieldsRequest,
      defaultValue?: content_min_fields | null
    ) => Promise<content_min_fields | null>
  }
  stddev: content_stddev_fieldsPromiseChain & {
    execute: (
      request: content_stddev_fieldsRequest,
      defaultValue?: content_stddev_fields | null
    ) => Promise<content_stddev_fields | null>
  }
  stddev_pop: content_stddev_pop_fieldsPromiseChain & {
    execute: (
      request: content_stddev_pop_fieldsRequest,
      defaultValue?: content_stddev_pop_fields | null
    ) => Promise<content_stddev_pop_fields | null>
  }
  stddev_samp: content_stddev_samp_fieldsPromiseChain & {
    execute: (
      request: content_stddev_samp_fieldsRequest,
      defaultValue?: content_stddev_samp_fields | null
    ) => Promise<content_stddev_samp_fields | null>
  }
  sum: content_sum_fieldsPromiseChain & {
    execute: (
      request: content_sum_fieldsRequest,
      defaultValue?: content_sum_fields | null
    ) => Promise<content_sum_fields | null>
  }
  var_pop: content_var_pop_fieldsPromiseChain & {
    execute: (
      request: content_var_pop_fieldsRequest,
      defaultValue?: content_var_pop_fields | null
    ) => Promise<content_var_pop_fields | null>
  }
  var_samp: content_var_samp_fieldsPromiseChain & {
    execute: (
      request: content_var_samp_fieldsRequest,
      defaultValue?: content_var_samp_fields | null
    ) => Promise<content_var_samp_fields | null>
  }
  variance: content_variance_fieldsPromiseChain & {
    execute: (
      request: content_variance_fieldsRequest,
      defaultValue?: content_variance_fields | null
    ) => Promise<content_variance_fields | null>
  }
}

/** aggregate fields of "content" */
export interface content_aggregate_fieldsObservableChain {
  avg: content_avg_fieldsObservableChain & {
    execute: (
      request: content_avg_fieldsRequest,
      defaultValue?: content_avg_fields | null
    ) => Observable<content_avg_fields | null>
  }
  count: ((args?: {
    columns?: content_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: content_max_fieldsObservableChain & {
    execute: (
      request: content_max_fieldsRequest,
      defaultValue?: content_max_fields | null
    ) => Observable<content_max_fields | null>
  }
  min: content_min_fieldsObservableChain & {
    execute: (
      request: content_min_fieldsRequest,
      defaultValue?: content_min_fields | null
    ) => Observable<content_min_fields | null>
  }
  stddev: content_stddev_fieldsObservableChain & {
    execute: (
      request: content_stddev_fieldsRequest,
      defaultValue?: content_stddev_fields | null
    ) => Observable<content_stddev_fields | null>
  }
  stddev_pop: content_stddev_pop_fieldsObservableChain & {
    execute: (
      request: content_stddev_pop_fieldsRequest,
      defaultValue?: content_stddev_pop_fields | null
    ) => Observable<content_stddev_pop_fields | null>
  }
  stddev_samp: content_stddev_samp_fieldsObservableChain & {
    execute: (
      request: content_stddev_samp_fieldsRequest,
      defaultValue?: content_stddev_samp_fields | null
    ) => Observable<content_stddev_samp_fields | null>
  }
  sum: content_sum_fieldsObservableChain & {
    execute: (
      request: content_sum_fieldsRequest,
      defaultValue?: content_sum_fields | null
    ) => Observable<content_sum_fields | null>
  }
  var_pop: content_var_pop_fieldsObservableChain & {
    execute: (
      request: content_var_pop_fieldsRequest,
      defaultValue?: content_var_pop_fields | null
    ) => Observable<content_var_pop_fields | null>
  }
  var_samp: content_var_samp_fieldsObservableChain & {
    execute: (
      request: content_var_samp_fieldsRequest,
      defaultValue?: content_var_samp_fields | null
    ) => Observable<content_var_samp_fields | null>
  }
  variance: content_variance_fieldsObservableChain & {
    execute: (
      request: content_variance_fieldsRequest,
      defaultValue?: content_variance_fields | null
    ) => Observable<content_variance_fields | null>
  }
}

/** aggregate avg on columns */
export interface content_avg_fieldsPromiseChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate avg on columns */
export interface content_avg_fieldsObservableChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate max on columns */
export interface content_max_fieldsPromiseChain {
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Promise<Int | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface content_max_fieldsObservableChain {
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Observable<Int | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface content_min_fieldsPromiseChain {
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Promise<Int | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface content_min_fieldsObservableChain {
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Observable<Int | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate stddev on columns */
export interface content_stddev_fieldsPromiseChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate stddev on columns */
export interface content_stddev_fieldsObservableChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate stddev_pop on columns */
export interface content_stddev_pop_fieldsPromiseChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate stddev_pop on columns */
export interface content_stddev_pop_fieldsObservableChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate stddev_samp on columns */
export interface content_stddev_samp_fieldsPromiseChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate stddev_samp on columns */
export interface content_stddev_samp_fieldsObservableChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate sum on columns */
export interface content_sum_fieldsPromiseChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Promise<Int | null>
  }
}

/** aggregate sum on columns */
export interface content_sum_fieldsObservableChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Observable<Int | null>
  }
}

/** aggregate var_pop on columns */
export interface content_var_pop_fieldsPromiseChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate var_pop on columns */
export interface content_var_pop_fieldsObservableChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate var_samp on columns */
export interface content_var_samp_fieldsPromiseChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate var_samp on columns */
export interface content_var_samp_fieldsObservableChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate variance on columns */
export interface content_variance_fieldsPromiseChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate variance on columns */
export interface content_variance_fieldsObservableChain {
  dag_size: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** columns and relationships of "erc721_import" */
export interface erc721_importPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  next_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "erc721_import" */
export interface erc721_importObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  next_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "erc721_import" */
export interface erc721_import_aggregatePromiseChain {
  aggregate: erc721_import_aggregate_fieldsPromiseChain & {
    execute: (
      request: erc721_import_aggregate_fieldsRequest,
      defaultValue?: erc721_import_aggregate_fields | null
    ) => Promise<erc721_import_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Promise<erc721_import[]>
  }
}

/** aggregated selection of "erc721_import" */
export interface erc721_import_aggregateObservableChain {
  aggregate: erc721_import_aggregate_fieldsObservableChain & {
    execute: (
      request: erc721_import_aggregate_fieldsRequest,
      defaultValue?: erc721_import_aggregate_fields | null
    ) => Observable<erc721_import_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Observable<erc721_import[]>
  }
}

/** aggregate fields of "erc721_import" */
export interface erc721_import_aggregate_fieldsPromiseChain {
  count: ((args?: {
    columns?: erc721_import_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: erc721_import_max_fieldsPromiseChain & {
    execute: (
      request: erc721_import_max_fieldsRequest,
      defaultValue?: erc721_import_max_fields | null
    ) => Promise<erc721_import_max_fields | null>
  }
  min: erc721_import_min_fieldsPromiseChain & {
    execute: (
      request: erc721_import_min_fieldsRequest,
      defaultValue?: erc721_import_min_fields | null
    ) => Promise<erc721_import_min_fields | null>
  }
}

/** aggregate fields of "erc721_import" */
export interface erc721_import_aggregate_fieldsObservableChain {
  count: ((args?: {
    columns?: erc721_import_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: erc721_import_max_fieldsObservableChain & {
    execute: (
      request: erc721_import_max_fieldsRequest,
      defaultValue?: erc721_import_max_fields | null
    ) => Observable<erc721_import_max_fields | null>
  }
  min: erc721_import_min_fieldsObservableChain & {
    execute: (
      request: erc721_import_min_fieldsRequest,
      defaultValue?: erc721_import_min_fields | null
    ) => Observable<erc721_import_min_fields | null>
  }
}

/** aggregate max on columns */
export interface erc721_import_max_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  next_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface erc721_import_max_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  next_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface erc721_import_min_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  next_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface erc721_import_min_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  next_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** columns and relationships of "erc721_import_by_nft" */
export interface erc721_import_by_nftPromiseChain {
  erc721_import_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "erc721_import_by_nft" */
export interface erc721_import_by_nftObservableChain {
  erc721_import_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "erc721_import_by_nft" */
export interface erc721_import_by_nft_aggregatePromiseChain {
  aggregate: erc721_import_by_nft_aggregate_fieldsPromiseChain & {
    execute: (
      request: erc721_import_by_nft_aggregate_fieldsRequest,
      defaultValue?: erc721_import_by_nft_aggregate_fields | null
    ) => Promise<erc721_import_by_nft_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Promise<erc721_import_by_nft[]>
  }
}

/** aggregated selection of "erc721_import_by_nft" */
export interface erc721_import_by_nft_aggregateObservableChain {
  aggregate: erc721_import_by_nft_aggregate_fieldsObservableChain & {
    execute: (
      request: erc721_import_by_nft_aggregate_fieldsRequest,
      defaultValue?: erc721_import_by_nft_aggregate_fields | null
    ) => Observable<erc721_import_by_nft_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Observable<erc721_import_by_nft[]>
  }
}

/** aggregate fields of "erc721_import_by_nft" */
export interface erc721_import_by_nft_aggregate_fieldsPromiseChain {
  count: ((args?: {
    columns?: erc721_import_by_nft_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: erc721_import_by_nft_max_fieldsPromiseChain & {
    execute: (
      request: erc721_import_by_nft_max_fieldsRequest,
      defaultValue?: erc721_import_by_nft_max_fields | null
    ) => Promise<erc721_import_by_nft_max_fields | null>
  }
  min: erc721_import_by_nft_min_fieldsPromiseChain & {
    execute: (
      request: erc721_import_by_nft_min_fieldsRequest,
      defaultValue?: erc721_import_by_nft_min_fields | null
    ) => Promise<erc721_import_by_nft_min_fields | null>
  }
}

/** aggregate fields of "erc721_import_by_nft" */
export interface erc721_import_by_nft_aggregate_fieldsObservableChain {
  count: ((args?: {
    columns?: erc721_import_by_nft_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: erc721_import_by_nft_max_fieldsObservableChain & {
    execute: (
      request: erc721_import_by_nft_max_fieldsRequest,
      defaultValue?: erc721_import_by_nft_max_fields | null
    ) => Observable<erc721_import_by_nft_max_fields | null>
  }
  min: erc721_import_by_nft_min_fieldsObservableChain & {
    execute: (
      request: erc721_import_by_nft_min_fieldsRequest,
      defaultValue?: erc721_import_by_nft_min_fields | null
    ) => Observable<erc721_import_by_nft_min_fields | null>
  }
}

/** aggregate max on columns */
export interface erc721_import_by_nft_max_fieldsPromiseChain {
  erc721_import_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface erc721_import_by_nft_max_fieldsObservableChain {
  erc721_import_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface erc721_import_by_nft_min_fieldsPromiseChain {
  erc721_import_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface erc721_import_by_nft_min_fieldsObservableChain {
  erc721_import_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** columns and relationships of "nft" */
export interface nftPromiseChain {
  contract_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  mint_time: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  nft_owner_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  token_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "nft" */
export interface nftObservableChain {
  contract_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  mint_time: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  nft_owner_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  token_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "nft" */
export interface nft_aggregatePromiseChain {
  aggregate: nft_aggregate_fieldsPromiseChain & {
    execute: (
      request: nft_aggregate_fieldsRequest,
      defaultValue?: nft_aggregate_fields | null
    ) => Promise<nft_aggregate_fields | null>
  }
  nodes: {
    execute: (request: nftRequest, defaultValue?: nft[]) => Promise<nft[]>
  }
}

/** aggregated selection of "nft" */
export interface nft_aggregateObservableChain {
  aggregate: nft_aggregate_fieldsObservableChain & {
    execute: (
      request: nft_aggregate_fieldsRequest,
      defaultValue?: nft_aggregate_fields | null
    ) => Observable<nft_aggregate_fields | null>
  }
  nodes: {
    execute: (request: nftRequest, defaultValue?: nft[]) => Observable<nft[]>
  }
}

/** aggregate fields of "nft" */
export interface nft_aggregate_fieldsPromiseChain {
  count: ((args?: {
    columns?: nft_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: nft_max_fieldsPromiseChain & {
    execute: (
      request: nft_max_fieldsRequest,
      defaultValue?: nft_max_fields | null
    ) => Promise<nft_max_fields | null>
  }
  min: nft_min_fieldsPromiseChain & {
    execute: (
      request: nft_min_fieldsRequest,
      defaultValue?: nft_min_fields | null
    ) => Promise<nft_min_fields | null>
  }
}

/** aggregate fields of "nft" */
export interface nft_aggregate_fieldsObservableChain {
  count: ((args?: {
    columns?: nft_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: nft_max_fieldsObservableChain & {
    execute: (
      request: nft_max_fieldsRequest,
      defaultValue?: nft_max_fields | null
    ) => Observable<nft_max_fields | null>
  }
  min: nft_min_fieldsObservableChain & {
    execute: (
      request: nft_min_fieldsRequest,
      defaultValue?: nft_min_fields | null
    ) => Observable<nft_min_fields | null>
  }
}

/** aggregate max on columns */
export interface nft_max_fieldsPromiseChain {
  contract_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  mint_time: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  nft_owner_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  token_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface nft_max_fieldsObservableChain {
  contract_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  mint_time: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  nft_owner_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  token_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface nft_min_fieldsPromiseChain {
  contract_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  mint_time: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  nft_owner_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  token_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface nft_min_fieldsObservableChain {
  contract_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  mint_time: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  nft_owner_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  token_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** columns and relationships of "nft_asset" */
export interface nft_assetPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: nft_asset_status
    ) => Promise<nft_asset_status>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "nft_asset" */
export interface nft_assetObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: nft_asset_status
    ) => Observable<nft_asset_status>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "nft_asset" */
export interface nft_asset_aggregatePromiseChain {
  aggregate: nft_asset_aggregate_fieldsPromiseChain & {
    execute: (
      request: nft_asset_aggregate_fieldsRequest,
      defaultValue?: nft_asset_aggregate_fields | null
    ) => Promise<nft_asset_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Promise<nft_asset[]>
  }
}

/** aggregated selection of "nft_asset" */
export interface nft_asset_aggregateObservableChain {
  aggregate: nft_asset_aggregate_fieldsObservableChain & {
    execute: (
      request: nft_asset_aggregate_fieldsRequest,
      defaultValue?: nft_asset_aggregate_fields | null
    ) => Observable<nft_asset_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Observable<nft_asset[]>
  }
}

/** aggregate fields of "nft_asset" */
export interface nft_asset_aggregate_fieldsPromiseChain {
  count: ((args?: {
    columns?: nft_asset_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: nft_asset_max_fieldsPromiseChain & {
    execute: (
      request: nft_asset_max_fieldsRequest,
      defaultValue?: nft_asset_max_fields | null
    ) => Promise<nft_asset_max_fields | null>
  }
  min: nft_asset_min_fieldsPromiseChain & {
    execute: (
      request: nft_asset_min_fieldsRequest,
      defaultValue?: nft_asset_min_fields | null
    ) => Promise<nft_asset_min_fields | null>
  }
}

/** aggregate fields of "nft_asset" */
export interface nft_asset_aggregate_fieldsObservableChain {
  count: ((args?: {
    columns?: nft_asset_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: nft_asset_max_fieldsObservableChain & {
    execute: (
      request: nft_asset_max_fieldsRequest,
      defaultValue?: nft_asset_max_fields | null
    ) => Observable<nft_asset_max_fields | null>
  }
  min: nft_asset_min_fieldsObservableChain & {
    execute: (
      request: nft_asset_min_fieldsRequest,
      defaultValue?: nft_asset_min_fields | null
    ) => Observable<nft_asset_min_fields | null>
  }
}

/** aggregate max on columns */
export interface nft_asset_max_fieldsPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface nft_asset_max_fieldsObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface nft_asset_min_fieldsPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface nft_asset_min_fieldsObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  token_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** columns and relationships of "nft_metadata" */
export interface nft_metadataPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  description: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  image_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "nft_metadata" */
export interface nft_metadataObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  description: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  image_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "nft_metadata" */
export interface nft_metadata_aggregatePromiseChain {
  aggregate: nft_metadata_aggregate_fieldsPromiseChain & {
    execute: (
      request: nft_metadata_aggregate_fieldsRequest,
      defaultValue?: nft_metadata_aggregate_fields | null
    ) => Promise<nft_metadata_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Promise<nft_metadata[]>
  }
}

/** aggregated selection of "nft_metadata" */
export interface nft_metadata_aggregateObservableChain {
  aggregate: nft_metadata_aggregate_fieldsObservableChain & {
    execute: (
      request: nft_metadata_aggregate_fieldsRequest,
      defaultValue?: nft_metadata_aggregate_fields | null
    ) => Observable<nft_metadata_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Observable<nft_metadata[]>
  }
}

/** aggregate fields of "nft_metadata" */
export interface nft_metadata_aggregate_fieldsPromiseChain {
  count: ((args?: {
    columns?: nft_metadata_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: nft_metadata_max_fieldsPromiseChain & {
    execute: (
      request: nft_metadata_max_fieldsRequest,
      defaultValue?: nft_metadata_max_fields | null
    ) => Promise<nft_metadata_max_fields | null>
  }
  min: nft_metadata_min_fieldsPromiseChain & {
    execute: (
      request: nft_metadata_min_fieldsRequest,
      defaultValue?: nft_metadata_min_fields | null
    ) => Promise<nft_metadata_min_fields | null>
  }
}

/** aggregate fields of "nft_metadata" */
export interface nft_metadata_aggregate_fieldsObservableChain {
  count: ((args?: {
    columns?: nft_metadata_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: nft_metadata_max_fieldsObservableChain & {
    execute: (
      request: nft_metadata_max_fieldsRequest,
      defaultValue?: nft_metadata_max_fields | null
    ) => Observable<nft_metadata_max_fields | null>
  }
  min: nft_metadata_min_fieldsObservableChain & {
    execute: (
      request: nft_metadata_min_fieldsRequest,
      defaultValue?: nft_metadata_min_fields | null
    ) => Observable<nft_metadata_min_fields | null>
  }
}

/** aggregate max on columns */
export interface nft_metadata_max_fieldsPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  description: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  image_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface nft_metadata_max_fieldsObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  description: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  image_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface nft_metadata_min_fieldsPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  description: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  image_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface nft_metadata_min_fieldsObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  description: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  image_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** columns and relationships of "nft_owner" */
export interface nft_ownerPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "nft_owner" */
export interface nft_ownerObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "nft_owner" */
export interface nft_owner_aggregatePromiseChain {
  aggregate: nft_owner_aggregate_fieldsPromiseChain & {
    execute: (
      request: nft_owner_aggregate_fieldsRequest,
      defaultValue?: nft_owner_aggregate_fields | null
    ) => Promise<nft_owner_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Promise<nft_owner[]>
  }
}

/** aggregated selection of "nft_owner" */
export interface nft_owner_aggregateObservableChain {
  aggregate: nft_owner_aggregate_fieldsObservableChain & {
    execute: (
      request: nft_owner_aggregate_fieldsRequest,
      defaultValue?: nft_owner_aggregate_fields | null
    ) => Observable<nft_owner_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Observable<nft_owner[]>
  }
}

/** aggregate fields of "nft_owner" */
export interface nft_owner_aggregate_fieldsPromiseChain {
  count: ((args?: {
    columns?: nft_owner_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: nft_owner_max_fieldsPromiseChain & {
    execute: (
      request: nft_owner_max_fieldsRequest,
      defaultValue?: nft_owner_max_fields | null
    ) => Promise<nft_owner_max_fields | null>
  }
  min: nft_owner_min_fieldsPromiseChain & {
    execute: (
      request: nft_owner_min_fieldsRequest,
      defaultValue?: nft_owner_min_fields | null
    ) => Promise<nft_owner_min_fields | null>
  }
}

/** aggregate fields of "nft_owner" */
export interface nft_owner_aggregate_fieldsObservableChain {
  count: ((args?: {
    columns?: nft_owner_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: nft_owner_max_fieldsObservableChain & {
    execute: (
      request: nft_owner_max_fieldsRequest,
      defaultValue?: nft_owner_max_fields | null
    ) => Observable<nft_owner_max_fields | null>
  }
  min: nft_owner_min_fieldsObservableChain & {
    execute: (
      request: nft_owner_min_fieldsRequest,
      defaultValue?: nft_owner_min_fields | null
    ) => Observable<nft_owner_min_fields | null>
  }
}

/** aggregate max on columns */
export interface nft_owner_max_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface nft_owner_max_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface nft_owner_min_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface nft_owner_min_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** columns and relationships of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocksPromiseChain {
  blockchain_block_hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocksObservableChain {
  blockchain_block_hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_aggregatePromiseChain {
  aggregate: nfts_by_blockchain_blocks_aggregate_fieldsPromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocks_aggregate_fieldsRequest,
      defaultValue?: nfts_by_blockchain_blocks_aggregate_fields | null
    ) => Promise<nfts_by_blockchain_blocks_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Promise<nfts_by_blockchain_blocks[]>
  }
}

/** aggregated selection of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_aggregateObservableChain {
  aggregate: nfts_by_blockchain_blocks_aggregate_fieldsObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocks_aggregate_fieldsRequest,
      defaultValue?: nfts_by_blockchain_blocks_aggregate_fields | null
    ) => Observable<nfts_by_blockchain_blocks_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Observable<nfts_by_blockchain_blocks[]>
  }
}

/** aggregate fields of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_aggregate_fieldsPromiseChain {
  count: ((args?: {
    columns?: nfts_by_blockchain_blocks_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: nfts_by_blockchain_blocks_max_fieldsPromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocks_max_fieldsRequest,
      defaultValue?: nfts_by_blockchain_blocks_max_fields | null
    ) => Promise<nfts_by_blockchain_blocks_max_fields | null>
  }
  min: nfts_by_blockchain_blocks_min_fieldsPromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocks_min_fieldsRequest,
      defaultValue?: nfts_by_blockchain_blocks_min_fields | null
    ) => Promise<nfts_by_blockchain_blocks_min_fields | null>
  }
}

/** aggregate fields of "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_aggregate_fieldsObservableChain {
  count: ((args?: {
    columns?: nfts_by_blockchain_blocks_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: nfts_by_blockchain_blocks_max_fieldsObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocks_max_fieldsRequest,
      defaultValue?: nfts_by_blockchain_blocks_max_fields | null
    ) => Observable<nfts_by_blockchain_blocks_max_fields | null>
  }
  min: nfts_by_blockchain_blocks_min_fieldsObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocks_min_fieldsRequest,
      defaultValue?: nfts_by_blockchain_blocks_min_fields | null
    ) => Observable<nfts_by_blockchain_blocks_min_fields | null>
  }
}

/** aggregate max on columns */
export interface nfts_by_blockchain_blocks_max_fieldsPromiseChain {
  blockchain_block_hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface nfts_by_blockchain_blocks_max_fieldsObservableChain {
  blockchain_block_hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface nfts_by_blockchain_blocks_min_fieldsPromiseChain {
  blockchain_block_hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface nfts_by_blockchain_blocks_min_fieldsObservableChain {
  blockchain_block_hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  nft_id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/**
 * Utility table to keep track of migrations
 *
 *
 * columns and relationships of "niftysave_migration"
 *
 */
export interface niftysave_migrationPromiseChain {
  collection: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  cursor: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz
    ) => Promise<timestamptz>
  }
  metadata: ((args?: {
    /** JSON select path */
    path?: String | null
  }) => {
    execute: (
      request?: boolean | number,
      defaultValue?: jsonb | null
    ) => Promise<jsonb | null>
  }) & {
    execute: (
      request?: boolean | number,
      defaultValue?: jsonb | null
    ) => Promise<jsonb | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz
    ) => Promise<timestamptz>
  }
}

/**
 * Utility table to keep track of migrations
 *
 *
 * columns and relationships of "niftysave_migration"
 *
 */
export interface niftysave_migrationObservableChain {
  collection: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  cursor: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz
    ) => Observable<timestamptz>
  }
  metadata: ((args?: {
    /** JSON select path */
    path?: String | null
  }) => {
    execute: (
      request?: boolean | number,
      defaultValue?: jsonb | null
    ) => Observable<jsonb | null>
  }) & {
    execute: (
      request?: boolean | number,
      defaultValue?: jsonb | null
    ) => Observable<jsonb | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz
    ) => Observable<timestamptz>
  }
}

/** aggregated selection of "niftysave_migration" */
export interface niftysave_migration_aggregatePromiseChain {
  aggregate: niftysave_migration_aggregate_fieldsPromiseChain & {
    execute: (
      request: niftysave_migration_aggregate_fieldsRequest,
      defaultValue?: niftysave_migration_aggregate_fields | null
    ) => Promise<niftysave_migration_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Promise<niftysave_migration[]>
  }
}

/** aggregated selection of "niftysave_migration" */
export interface niftysave_migration_aggregateObservableChain {
  aggregate: niftysave_migration_aggregate_fieldsObservableChain & {
    execute: (
      request: niftysave_migration_aggregate_fieldsRequest,
      defaultValue?: niftysave_migration_aggregate_fields | null
    ) => Observable<niftysave_migration_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Observable<niftysave_migration[]>
  }
}

/** aggregate fields of "niftysave_migration" */
export interface niftysave_migration_aggregate_fieldsPromiseChain {
  count: ((args?: {
    columns?: niftysave_migration_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: niftysave_migration_max_fieldsPromiseChain & {
    execute: (
      request: niftysave_migration_max_fieldsRequest,
      defaultValue?: niftysave_migration_max_fields | null
    ) => Promise<niftysave_migration_max_fields | null>
  }
  min: niftysave_migration_min_fieldsPromiseChain & {
    execute: (
      request: niftysave_migration_min_fieldsRequest,
      defaultValue?: niftysave_migration_min_fields | null
    ) => Promise<niftysave_migration_min_fields | null>
  }
}

/** aggregate fields of "niftysave_migration" */
export interface niftysave_migration_aggregate_fieldsObservableChain {
  count: ((args?: {
    columns?: niftysave_migration_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: niftysave_migration_max_fieldsObservableChain & {
    execute: (
      request: niftysave_migration_max_fieldsRequest,
      defaultValue?: niftysave_migration_max_fields | null
    ) => Observable<niftysave_migration_max_fields | null>
  }
  min: niftysave_migration_min_fieldsObservableChain & {
    execute: (
      request: niftysave_migration_min_fieldsRequest,
      defaultValue?: niftysave_migration_min_fields | null
    ) => Observable<niftysave_migration_min_fields | null>
  }
}

/** aggregate max on columns */
export interface niftysave_migration_max_fieldsPromiseChain {
  collection: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  cursor: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz | null
    ) => Promise<timestamptz | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz | null
    ) => Promise<timestamptz | null>
  }
}

/** aggregate max on columns */
export interface niftysave_migration_max_fieldsObservableChain {
  collection: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  cursor: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz | null
    ) => Observable<timestamptz | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz | null
    ) => Observable<timestamptz | null>
  }
}

/** aggregate min on columns */
export interface niftysave_migration_min_fieldsPromiseChain {
  collection: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  cursor: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz | null
    ) => Promise<timestamptz | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz | null
    ) => Promise<timestamptz | null>
  }
}

/** aggregate min on columns */
export interface niftysave_migration_min_fieldsObservableChain {
  collection: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  cursor: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz | null
    ) => Observable<timestamptz | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamptz | null
    ) => Observable<timestamptz | null>
  }
}

/** columns and relationships of "other_nft_resources" */
export interface other_nft_resourcesPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  resource_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "other_nft_resources" */
export interface other_nft_resourcesObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  resource_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "other_nft_resources" */
export interface other_nft_resources_aggregatePromiseChain {
  aggregate: other_nft_resources_aggregate_fieldsPromiseChain & {
    execute: (
      request: other_nft_resources_aggregate_fieldsRequest,
      defaultValue?: other_nft_resources_aggregate_fields | null
    ) => Promise<other_nft_resources_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Promise<other_nft_resources[]>
  }
}

/** aggregated selection of "other_nft_resources" */
export interface other_nft_resources_aggregateObservableChain {
  aggregate: other_nft_resources_aggregate_fieldsObservableChain & {
    execute: (
      request: other_nft_resources_aggregate_fieldsRequest,
      defaultValue?: other_nft_resources_aggregate_fields | null
    ) => Observable<other_nft_resources_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Observable<other_nft_resources[]>
  }
}

/** aggregate fields of "other_nft_resources" */
export interface other_nft_resources_aggregate_fieldsPromiseChain {
  count: ((args?: {
    columns?: other_nft_resources_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: other_nft_resources_max_fieldsPromiseChain & {
    execute: (
      request: other_nft_resources_max_fieldsRequest,
      defaultValue?: other_nft_resources_max_fields | null
    ) => Promise<other_nft_resources_max_fields | null>
  }
  min: other_nft_resources_min_fieldsPromiseChain & {
    execute: (
      request: other_nft_resources_min_fieldsRequest,
      defaultValue?: other_nft_resources_min_fields | null
    ) => Promise<other_nft_resources_min_fields | null>
  }
}

/** aggregate fields of "other_nft_resources" */
export interface other_nft_resources_aggregate_fieldsObservableChain {
  count: ((args?: {
    columns?: other_nft_resources_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: other_nft_resources_max_fieldsObservableChain & {
    execute: (
      request: other_nft_resources_max_fieldsRequest,
      defaultValue?: other_nft_resources_max_fields | null
    ) => Observable<other_nft_resources_max_fields | null>
  }
  min: other_nft_resources_min_fieldsObservableChain & {
    execute: (
      request: other_nft_resources_min_fieldsRequest,
      defaultValue?: other_nft_resources_min_fields | null
    ) => Observable<other_nft_resources_min_fields | null>
  }
}

/** aggregate max on columns */
export interface other_nft_resources_max_fieldsPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  resource_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface other_nft_resources_max_fieldsObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  resource_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface other_nft_resources_min_fieldsPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  resource_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface other_nft_resources_min_fieldsObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  resource_uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** columns and relationships of "pin" */
export interface pinPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: bigint
    ) => Promise<bigint>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  service: {
    execute: (
      request?: boolean | number,
      defaultValue?: pin_service
    ) => Promise<pin_service>
  }
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: pin_status
    ) => Promise<pin_status>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
}

/** columns and relationships of "pin" */
export interface pinObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: bigint
    ) => Observable<bigint>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  service: {
    execute: (
      request?: boolean | number,
      defaultValue?: pin_service
    ) => Observable<pin_service>
  }
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: pin_status
    ) => Observable<pin_status>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
}

/** aggregated selection of "pin" */
export interface pin_aggregatePromiseChain {
  aggregate: pin_aggregate_fieldsPromiseChain & {
    execute: (
      request: pin_aggregate_fieldsRequest,
      defaultValue?: pin_aggregate_fields | null
    ) => Promise<pin_aggregate_fields | null>
  }
  nodes: {
    execute: (request: pinRequest, defaultValue?: pin[]) => Promise<pin[]>
  }
}

/** aggregated selection of "pin" */
export interface pin_aggregateObservableChain {
  aggregate: pin_aggregate_fieldsObservableChain & {
    execute: (
      request: pin_aggregate_fieldsRequest,
      defaultValue?: pin_aggregate_fields | null
    ) => Observable<pin_aggregate_fields | null>
  }
  nodes: {
    execute: (request: pinRequest, defaultValue?: pin[]) => Observable<pin[]>
  }
}

/** aggregate fields of "pin" */
export interface pin_aggregate_fieldsPromiseChain {
  avg: pin_avg_fieldsPromiseChain & {
    execute: (
      request: pin_avg_fieldsRequest,
      defaultValue?: pin_avg_fields | null
    ) => Promise<pin_avg_fields | null>
  }
  count: ((args?: {
    columns?: pin_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: pin_max_fieldsPromiseChain & {
    execute: (
      request: pin_max_fieldsRequest,
      defaultValue?: pin_max_fields | null
    ) => Promise<pin_max_fields | null>
  }
  min: pin_min_fieldsPromiseChain & {
    execute: (
      request: pin_min_fieldsRequest,
      defaultValue?: pin_min_fields | null
    ) => Promise<pin_min_fields | null>
  }
  stddev: pin_stddev_fieldsPromiseChain & {
    execute: (
      request: pin_stddev_fieldsRequest,
      defaultValue?: pin_stddev_fields | null
    ) => Promise<pin_stddev_fields | null>
  }
  stddev_pop: pin_stddev_pop_fieldsPromiseChain & {
    execute: (
      request: pin_stddev_pop_fieldsRequest,
      defaultValue?: pin_stddev_pop_fields | null
    ) => Promise<pin_stddev_pop_fields | null>
  }
  stddev_samp: pin_stddev_samp_fieldsPromiseChain & {
    execute: (
      request: pin_stddev_samp_fieldsRequest,
      defaultValue?: pin_stddev_samp_fields | null
    ) => Promise<pin_stddev_samp_fields | null>
  }
  sum: pin_sum_fieldsPromiseChain & {
    execute: (
      request: pin_sum_fieldsRequest,
      defaultValue?: pin_sum_fields | null
    ) => Promise<pin_sum_fields | null>
  }
  var_pop: pin_var_pop_fieldsPromiseChain & {
    execute: (
      request: pin_var_pop_fieldsRequest,
      defaultValue?: pin_var_pop_fields | null
    ) => Promise<pin_var_pop_fields | null>
  }
  var_samp: pin_var_samp_fieldsPromiseChain & {
    execute: (
      request: pin_var_samp_fieldsRequest,
      defaultValue?: pin_var_samp_fields | null
    ) => Promise<pin_var_samp_fields | null>
  }
  variance: pin_variance_fieldsPromiseChain & {
    execute: (
      request: pin_variance_fieldsRequest,
      defaultValue?: pin_variance_fields | null
    ) => Promise<pin_variance_fields | null>
  }
}

/** aggregate fields of "pin" */
export interface pin_aggregate_fieldsObservableChain {
  avg: pin_avg_fieldsObservableChain & {
    execute: (
      request: pin_avg_fieldsRequest,
      defaultValue?: pin_avg_fields | null
    ) => Observable<pin_avg_fields | null>
  }
  count: ((args?: {
    columns?: pin_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: pin_max_fieldsObservableChain & {
    execute: (
      request: pin_max_fieldsRequest,
      defaultValue?: pin_max_fields | null
    ) => Observable<pin_max_fields | null>
  }
  min: pin_min_fieldsObservableChain & {
    execute: (
      request: pin_min_fieldsRequest,
      defaultValue?: pin_min_fields | null
    ) => Observable<pin_min_fields | null>
  }
  stddev: pin_stddev_fieldsObservableChain & {
    execute: (
      request: pin_stddev_fieldsRequest,
      defaultValue?: pin_stddev_fields | null
    ) => Observable<pin_stddev_fields | null>
  }
  stddev_pop: pin_stddev_pop_fieldsObservableChain & {
    execute: (
      request: pin_stddev_pop_fieldsRequest,
      defaultValue?: pin_stddev_pop_fields | null
    ) => Observable<pin_stddev_pop_fields | null>
  }
  stddev_samp: pin_stddev_samp_fieldsObservableChain & {
    execute: (
      request: pin_stddev_samp_fieldsRequest,
      defaultValue?: pin_stddev_samp_fields | null
    ) => Observable<pin_stddev_samp_fields | null>
  }
  sum: pin_sum_fieldsObservableChain & {
    execute: (
      request: pin_sum_fieldsRequest,
      defaultValue?: pin_sum_fields | null
    ) => Observable<pin_sum_fields | null>
  }
  var_pop: pin_var_pop_fieldsObservableChain & {
    execute: (
      request: pin_var_pop_fieldsRequest,
      defaultValue?: pin_var_pop_fields | null
    ) => Observable<pin_var_pop_fields | null>
  }
  var_samp: pin_var_samp_fieldsObservableChain & {
    execute: (
      request: pin_var_samp_fieldsRequest,
      defaultValue?: pin_var_samp_fields | null
    ) => Observable<pin_var_samp_fields | null>
  }
  variance: pin_variance_fieldsObservableChain & {
    execute: (
      request: pin_variance_fieldsRequest,
      defaultValue?: pin_variance_fields | null
    ) => Observable<pin_variance_fields | null>
  }
}

/** aggregate avg on columns */
export interface pin_avg_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate avg on columns */
export interface pin_avg_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate max on columns */
export interface pin_max_fieldsPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: bigint | null
    ) => Promise<bigint | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate max on columns */
export interface pin_max_fieldsObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: bigint | null
    ) => Observable<bigint | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate min on columns */
export interface pin_min_fieldsPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: bigint | null
    ) => Promise<bigint | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
}

/** aggregate min on columns */
export interface pin_min_fieldsObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: bigint | null
    ) => Observable<bigint | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
}

/** aggregate stddev on columns */
export interface pin_stddev_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate stddev on columns */
export interface pin_stddev_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate stddev_pop on columns */
export interface pin_stddev_pop_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate stddev_pop on columns */
export interface pin_stddev_pop_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate stddev_samp on columns */
export interface pin_stddev_samp_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate stddev_samp on columns */
export interface pin_stddev_samp_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate sum on columns */
export interface pin_sum_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: bigint | null
    ) => Promise<bigint | null>
  }
}

/** aggregate sum on columns */
export interface pin_sum_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: bigint | null
    ) => Observable<bigint | null>
  }
}

/** aggregate var_pop on columns */
export interface pin_var_pop_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate var_pop on columns */
export interface pin_var_pop_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate var_samp on columns */
export interface pin_var_samp_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate var_samp on columns */
export interface pin_var_samp_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** aggregate variance on columns */
export interface pin_variance_fieldsPromiseChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Promise<Float | null>
  }
}

/** aggregate variance on columns */
export interface pin_variance_fieldsObservableChain {
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: Float | null
    ) => Observable<Float | null>
  }
}

/** columns and relationships of "resource" */
export interface resourcePromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: resource_status
    ) => Promise<resource_status>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Promise<timestamp>
  }
  uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
}

/** columns and relationships of "resource" */
export interface resourceObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: resource_status
    ) => Observable<resource_status>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp
    ) => Observable<timestamp>
  }
  uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
}

/** aggregated selection of "resource" */
export interface resource_aggregatePromiseChain {
  aggregate: resource_aggregate_fieldsPromiseChain & {
    execute: (
      request: resource_aggregate_fieldsRequest,
      defaultValue?: resource_aggregate_fields | null
    ) => Promise<resource_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Promise<resource[]>
  }
}

/** aggregated selection of "resource" */
export interface resource_aggregateObservableChain {
  aggregate: resource_aggregate_fieldsObservableChain & {
    execute: (
      request: resource_aggregate_fieldsRequest,
      defaultValue?: resource_aggregate_fields | null
    ) => Observable<resource_aggregate_fields | null>
  }
  nodes: {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Observable<resource[]>
  }
}

/** aggregate fields of "resource" */
export interface resource_aggregate_fieldsPromiseChain {
  count: ((args?: {
    columns?: resource_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  max: resource_max_fieldsPromiseChain & {
    execute: (
      request: resource_max_fieldsRequest,
      defaultValue?: resource_max_fields | null
    ) => Promise<resource_max_fields | null>
  }
  min: resource_min_fieldsPromiseChain & {
    execute: (
      request: resource_min_fieldsRequest,
      defaultValue?: resource_min_fields | null
    ) => Promise<resource_min_fields | null>
  }
}

/** aggregate fields of "resource" */
export interface resource_aggregate_fieldsObservableChain {
  count: ((args?: {
    columns?: resource_select_column[] | null
    distinct?: Boolean | null
  }) => {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }) & {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  max: resource_max_fieldsObservableChain & {
    execute: (
      request: resource_max_fieldsRequest,
      defaultValue?: resource_max_fields | null
    ) => Observable<resource_max_fields | null>
  }
  min: resource_min_fieldsObservableChain & {
    execute: (
      request: resource_min_fieldsRequest,
      defaultValue?: resource_min_fields | null
    ) => Observable<resource_min_fields | null>
  }
}

/** aggregate max on columns */
export interface resource_max_fieldsPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
}

/** aggregate max on columns */
export interface resource_max_fieldsObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
}

/** aggregate min on columns */
export interface resource_min_fieldsPromiseChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Promise<timestamp | null>
  }
  uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
}

/** aggregate min on columns */
export interface resource_min_fieldsObservableChain {
  content_cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  inserted_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  ipfs_url: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  status_text: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  updated_at: {
    execute: (
      request?: boolean | number,
      defaultValue?: timestamp | null
    ) => Observable<timestamp | null>
  }
  uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
}

/** mutation root */
export interface mutation_rootPromiseChain {
  /** delete data from the table: "blockchain_block" */
  delete_blockchain_block: (args: {
    /** filter the rows which have to be deleted */
    where: blockchain_block_bool_exp
  }) => blockchain_block_mutation_responsePromiseChain & {
    execute: (
      request: blockchain_block_mutation_responseRequest,
      defaultValue?: blockchain_block_mutation_response | null
    ) => Promise<blockchain_block_mutation_response | null>
  }
  /** delete single row from the table: "blockchain_block" */
  delete_blockchain_block_by_pk: (args: {
    hash: String
  }) => blockchain_blockPromiseChain & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block | null
    ) => Promise<blockchain_block | null>
  }
  /** delete data from the table: "blockchain_contract" */
  delete_blockchain_contract: (args: {
    /** filter the rows which have to be deleted */
    where: blockchain_contract_bool_exp
  }) => blockchain_contract_mutation_responsePromiseChain & {
    execute: (
      request: blockchain_contract_mutation_responseRequest,
      defaultValue?: blockchain_contract_mutation_response | null
    ) => Promise<blockchain_contract_mutation_response | null>
  }
  /** delete single row from the table: "blockchain_contract" */
  delete_blockchain_contract_by_pk: (args: {
    id: String
  }) => blockchain_contractPromiseChain & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract | null
    ) => Promise<blockchain_contract | null>
  }
  /** delete data from the table: "content" */
  delete_content: (args: {
    /** filter the rows which have to be deleted */
    where: content_bool_exp
  }) => content_mutation_responsePromiseChain & {
    execute: (
      request: content_mutation_responseRequest,
      defaultValue?: content_mutation_response | null
    ) => Promise<content_mutation_response | null>
  }
  /** delete single row from the table: "content" */
  delete_content_by_pk: (args: {
    cid: String
  }) => contentPromiseChain & {
    execute: (
      request: contentRequest,
      defaultValue?: content | null
    ) => Promise<content | null>
  }
  /** delete data from the table: "erc721_import" */
  delete_erc721_import: (args: {
    /** filter the rows which have to be deleted */
    where: erc721_import_bool_exp
  }) => erc721_import_mutation_responsePromiseChain & {
    execute: (
      request: erc721_import_mutation_responseRequest,
      defaultValue?: erc721_import_mutation_response | null
    ) => Promise<erc721_import_mutation_response | null>
  }
  /** delete data from the table: "erc721_import_by_nft" */
  delete_erc721_import_by_nft: (args: {
    /** filter the rows which have to be deleted */
    where: erc721_import_by_nft_bool_exp
  }) => erc721_import_by_nft_mutation_responsePromiseChain & {
    execute: (
      request: erc721_import_by_nft_mutation_responseRequest,
      defaultValue?: erc721_import_by_nft_mutation_response | null
    ) => Promise<erc721_import_by_nft_mutation_response | null>
  }
  /** delete single row from the table: "erc721_import_by_nft" */
  delete_erc721_import_by_nft_by_pk: (args: {
    erc721_import_id: String
    nft_id: String
  }) => erc721_import_by_nftPromiseChain & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft | null
    ) => Promise<erc721_import_by_nft | null>
  }
  /** delete single row from the table: "erc721_import" */
  delete_erc721_import_by_pk: (args: {
    id: String
  }) => erc721_importPromiseChain & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import | null
    ) => Promise<erc721_import | null>
  }
  /** delete data from the table: "nft" */
  delete_nft: (args: {
    /** filter the rows which have to be deleted */
    where: nft_bool_exp
  }) => nft_mutation_responsePromiseChain & {
    execute: (
      request: nft_mutation_responseRequest,
      defaultValue?: nft_mutation_response | null
    ) => Promise<nft_mutation_response | null>
  }
  /** delete data from the table: "nft_asset" */
  delete_nft_asset: (args: {
    /** filter the rows which have to be deleted */
    where: nft_asset_bool_exp
  }) => nft_asset_mutation_responsePromiseChain & {
    execute: (
      request: nft_asset_mutation_responseRequest,
      defaultValue?: nft_asset_mutation_response | null
    ) => Promise<nft_asset_mutation_response | null>
  }
  /** delete single row from the table: "nft_asset" */
  delete_nft_asset_by_pk: (args: {
    token_uri: String
  }) => nft_assetPromiseChain & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset | null
    ) => Promise<nft_asset | null>
  }
  /** delete single row from the table: "nft" */
  delete_nft_by_pk: (args: {
    id: String
  }) => nftPromiseChain & {
    execute: (
      request: nftRequest,
      defaultValue?: nft | null
    ) => Promise<nft | null>
  }
  /** delete data from the table: "nft_metadata" */
  delete_nft_metadata: (args: {
    /** filter the rows which have to be deleted */
    where: nft_metadata_bool_exp
  }) => nft_metadata_mutation_responsePromiseChain & {
    execute: (
      request: nft_metadata_mutation_responseRequest,
      defaultValue?: nft_metadata_mutation_response | null
    ) => Promise<nft_metadata_mutation_response | null>
  }
  /** delete single row from the table: "nft_metadata" */
  delete_nft_metadata_by_pk: (args: {
    content_cid: String
  }) => nft_metadataPromiseChain & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata | null
    ) => Promise<nft_metadata | null>
  }
  /** delete data from the table: "nft_owner" */
  delete_nft_owner: (args: {
    /** filter the rows which have to be deleted */
    where: nft_owner_bool_exp
  }) => nft_owner_mutation_responsePromiseChain & {
    execute: (
      request: nft_owner_mutation_responseRequest,
      defaultValue?: nft_owner_mutation_response | null
    ) => Promise<nft_owner_mutation_response | null>
  }
  /** delete single row from the table: "nft_owner" */
  delete_nft_owner_by_pk: (args: {
    id: String
  }) => nft_ownerPromiseChain & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner | null
    ) => Promise<nft_owner | null>
  }
  /** delete data from the table: "nfts_by_blockchain_blocks" */
  delete_nfts_by_blockchain_blocks: (args: {
    /** filter the rows which have to be deleted */
    where: nfts_by_blockchain_blocks_bool_exp
  }) => nfts_by_blockchain_blocks_mutation_responsePromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocks_mutation_responseRequest,
      defaultValue?: nfts_by_blockchain_blocks_mutation_response | null
    ) => Promise<nfts_by_blockchain_blocks_mutation_response | null>
  }
  /** delete single row from the table: "nfts_by_blockchain_blocks" */
  delete_nfts_by_blockchain_blocks_by_pk: (args: {
    blockchain_block_hash: String
    nft_id: String
  }) => nfts_by_blockchain_blocksPromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks | null
    ) => Promise<nfts_by_blockchain_blocks | null>
  }
  /** delete data from the table: "niftysave_migration" */
  delete_niftysave_migration: (args: {
    /** filter the rows which have to be deleted */
    where: niftysave_migration_bool_exp
  }) => niftysave_migration_mutation_responsePromiseChain & {
    execute: (
      request: niftysave_migration_mutation_responseRequest,
      defaultValue?: niftysave_migration_mutation_response | null
    ) => Promise<niftysave_migration_mutation_response | null>
  }
  /** delete single row from the table: "niftysave_migration" */
  delete_niftysave_migration_by_pk: (args: {
    id: String
  }) => niftysave_migrationPromiseChain & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration | null
    ) => Promise<niftysave_migration | null>
  }
  /** delete data from the table: "other_nft_resources" */
  delete_other_nft_resources: (args: {
    /** filter the rows which have to be deleted */
    where: other_nft_resources_bool_exp
  }) => other_nft_resources_mutation_responsePromiseChain & {
    execute: (
      request: other_nft_resources_mutation_responseRequest,
      defaultValue?: other_nft_resources_mutation_response | null
    ) => Promise<other_nft_resources_mutation_response | null>
  }
  /** delete single row from the table: "other_nft_resources" */
  delete_other_nft_resources_by_pk: (args: {
    content_cid: String
    resource_uri: String
  }) => other_nft_resourcesPromiseChain & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources | null
    ) => Promise<other_nft_resources | null>
  }
  /** delete data from the table: "pin" */
  delete_pin: (args: {
    /** filter the rows which have to be deleted */
    where: pin_bool_exp
  }) => pin_mutation_responsePromiseChain & {
    execute: (
      request: pin_mutation_responseRequest,
      defaultValue?: pin_mutation_response | null
    ) => Promise<pin_mutation_response | null>
  }
  /** delete single row from the table: "pin" */
  delete_pin_by_pk: (args: {
    id: bigint
  }) => pinPromiseChain & {
    execute: (
      request: pinRequest,
      defaultValue?: pin | null
    ) => Promise<pin | null>
  }
  /** delete data from the table: "resource" */
  delete_resource: (args: {
    /** filter the rows which have to be deleted */
    where: resource_bool_exp
  }) => resource_mutation_responsePromiseChain & {
    execute: (
      request: resource_mutation_responseRequest,
      defaultValue?: resource_mutation_response | null
    ) => Promise<resource_mutation_response | null>
  }
  /** delete single row from the table: "resource" */
  delete_resource_by_pk: (args: {
    uri: String
  }) => resourcePromiseChain & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource | null
    ) => Promise<resource | null>
  }
  /** insert data into the table: "blockchain_block" */
  insert_blockchain_block: (args: {
    /** the rows to be inserted */
    objects: blockchain_block_insert_input[]
    /** on conflict condition */
    on_conflict?: blockchain_block_on_conflict | null
  }) => blockchain_block_mutation_responsePromiseChain & {
    execute: (
      request: blockchain_block_mutation_responseRequest,
      defaultValue?: blockchain_block_mutation_response | null
    ) => Promise<blockchain_block_mutation_response | null>
  }
  /** insert a single row into the table: "blockchain_block" */
  insert_blockchain_block_one: (args: {
    /** the row to be inserted */
    object: blockchain_block_insert_input
    /** on conflict condition */
    on_conflict?: blockchain_block_on_conflict | null
  }) => blockchain_blockPromiseChain & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block | null
    ) => Promise<blockchain_block | null>
  }
  /** insert data into the table: "blockchain_contract" */
  insert_blockchain_contract: (args: {
    /** the rows to be inserted */
    objects: blockchain_contract_insert_input[]
    /** on conflict condition */
    on_conflict?: blockchain_contract_on_conflict | null
  }) => blockchain_contract_mutation_responsePromiseChain & {
    execute: (
      request: blockchain_contract_mutation_responseRequest,
      defaultValue?: blockchain_contract_mutation_response | null
    ) => Promise<blockchain_contract_mutation_response | null>
  }
  /** insert a single row into the table: "blockchain_contract" */
  insert_blockchain_contract_one: (args: {
    /** the row to be inserted */
    object: blockchain_contract_insert_input
    /** on conflict condition */
    on_conflict?: blockchain_contract_on_conflict | null
  }) => blockchain_contractPromiseChain & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract | null
    ) => Promise<blockchain_contract | null>
  }
  /** insert data into the table: "content" */
  insert_content: (args: {
    /** the rows to be inserted */
    objects: content_insert_input[]
    /** on conflict condition */
    on_conflict?: content_on_conflict | null
  }) => content_mutation_responsePromiseChain & {
    execute: (
      request: content_mutation_responseRequest,
      defaultValue?: content_mutation_response | null
    ) => Promise<content_mutation_response | null>
  }
  /** insert a single row into the table: "content" */
  insert_content_one: (args: {
    /** the row to be inserted */
    object: content_insert_input
    /** on conflict condition */
    on_conflict?: content_on_conflict | null
  }) => contentPromiseChain & {
    execute: (
      request: contentRequest,
      defaultValue?: content | null
    ) => Promise<content | null>
  }
  /** insert data into the table: "erc721_import" */
  insert_erc721_import: (args: {
    /** the rows to be inserted */
    objects: erc721_import_insert_input[]
    /** on conflict condition */
    on_conflict?: erc721_import_on_conflict | null
  }) => erc721_import_mutation_responsePromiseChain & {
    execute: (
      request: erc721_import_mutation_responseRequest,
      defaultValue?: erc721_import_mutation_response | null
    ) => Promise<erc721_import_mutation_response | null>
  }
  /** insert data into the table: "erc721_import_by_nft" */
  insert_erc721_import_by_nft: (args: {
    /** the rows to be inserted */
    objects: erc721_import_by_nft_insert_input[]
    /** on conflict condition */
    on_conflict?: erc721_import_by_nft_on_conflict | null
  }) => erc721_import_by_nft_mutation_responsePromiseChain & {
    execute: (
      request: erc721_import_by_nft_mutation_responseRequest,
      defaultValue?: erc721_import_by_nft_mutation_response | null
    ) => Promise<erc721_import_by_nft_mutation_response | null>
  }
  /** insert a single row into the table: "erc721_import_by_nft" */
  insert_erc721_import_by_nft_one: (args: {
    /** the row to be inserted */
    object: erc721_import_by_nft_insert_input
    /** on conflict condition */
    on_conflict?: erc721_import_by_nft_on_conflict | null
  }) => erc721_import_by_nftPromiseChain & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft | null
    ) => Promise<erc721_import_by_nft | null>
  }
  /** insert a single row into the table: "erc721_import" */
  insert_erc721_import_one: (args: {
    /** the row to be inserted */
    object: erc721_import_insert_input
    /** on conflict condition */
    on_conflict?: erc721_import_on_conflict | null
  }) => erc721_importPromiseChain & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import | null
    ) => Promise<erc721_import | null>
  }
  /** insert data into the table: "nft" */
  insert_nft: (args: {
    /** the rows to be inserted */
    objects: nft_insert_input[]
    /** on conflict condition */
    on_conflict?: nft_on_conflict | null
  }) => nft_mutation_responsePromiseChain & {
    execute: (
      request: nft_mutation_responseRequest,
      defaultValue?: nft_mutation_response | null
    ) => Promise<nft_mutation_response | null>
  }
  /** insert data into the table: "nft_asset" */
  insert_nft_asset: (args: {
    /** the rows to be inserted */
    objects: nft_asset_insert_input[]
    /** on conflict condition */
    on_conflict?: nft_asset_on_conflict | null
  }) => nft_asset_mutation_responsePromiseChain & {
    execute: (
      request: nft_asset_mutation_responseRequest,
      defaultValue?: nft_asset_mutation_response | null
    ) => Promise<nft_asset_mutation_response | null>
  }
  /** insert a single row into the table: "nft_asset" */
  insert_nft_asset_one: (args: {
    /** the row to be inserted */
    object: nft_asset_insert_input
    /** on conflict condition */
    on_conflict?: nft_asset_on_conflict | null
  }) => nft_assetPromiseChain & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset | null
    ) => Promise<nft_asset | null>
  }
  /** insert data into the table: "nft_metadata" */
  insert_nft_metadata: (args: {
    /** the rows to be inserted */
    objects: nft_metadata_insert_input[]
    /** on conflict condition */
    on_conflict?: nft_metadata_on_conflict | null
  }) => nft_metadata_mutation_responsePromiseChain & {
    execute: (
      request: nft_metadata_mutation_responseRequest,
      defaultValue?: nft_metadata_mutation_response | null
    ) => Promise<nft_metadata_mutation_response | null>
  }
  /** insert a single row into the table: "nft_metadata" */
  insert_nft_metadata_one: (args: {
    /** the row to be inserted */
    object: nft_metadata_insert_input
    /** on conflict condition */
    on_conflict?: nft_metadata_on_conflict | null
  }) => nft_metadataPromiseChain & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata | null
    ) => Promise<nft_metadata | null>
  }
  /** insert a single row into the table: "nft" */
  insert_nft_one: (args: {
    /** the row to be inserted */
    object: nft_insert_input
    /** on conflict condition */
    on_conflict?: nft_on_conflict | null
  }) => nftPromiseChain & {
    execute: (
      request: nftRequest,
      defaultValue?: nft | null
    ) => Promise<nft | null>
  }
  /** insert data into the table: "nft_owner" */
  insert_nft_owner: (args: {
    /** the rows to be inserted */
    objects: nft_owner_insert_input[]
    /** on conflict condition */
    on_conflict?: nft_owner_on_conflict | null
  }) => nft_owner_mutation_responsePromiseChain & {
    execute: (
      request: nft_owner_mutation_responseRequest,
      defaultValue?: nft_owner_mutation_response | null
    ) => Promise<nft_owner_mutation_response | null>
  }
  /** insert a single row into the table: "nft_owner" */
  insert_nft_owner_one: (args: {
    /** the row to be inserted */
    object: nft_owner_insert_input
    /** on conflict condition */
    on_conflict?: nft_owner_on_conflict | null
  }) => nft_ownerPromiseChain & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner | null
    ) => Promise<nft_owner | null>
  }
  /** insert data into the table: "nfts_by_blockchain_blocks" */
  insert_nfts_by_blockchain_blocks: (args: {
    /** the rows to be inserted */
    objects: nfts_by_blockchain_blocks_insert_input[]
    /** on conflict condition */
    on_conflict?: nfts_by_blockchain_blocks_on_conflict | null
  }) => nfts_by_blockchain_blocks_mutation_responsePromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocks_mutation_responseRequest,
      defaultValue?: nfts_by_blockchain_blocks_mutation_response | null
    ) => Promise<nfts_by_blockchain_blocks_mutation_response | null>
  }
  /** insert a single row into the table: "nfts_by_blockchain_blocks" */
  insert_nfts_by_blockchain_blocks_one: (args: {
    /** the row to be inserted */
    object: nfts_by_blockchain_blocks_insert_input
    /** on conflict condition */
    on_conflict?: nfts_by_blockchain_blocks_on_conflict | null
  }) => nfts_by_blockchain_blocksPromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks | null
    ) => Promise<nfts_by_blockchain_blocks | null>
  }
  /** insert data into the table: "niftysave_migration" */
  insert_niftysave_migration: (args: {
    /** the rows to be inserted */
    objects: niftysave_migration_insert_input[]
    /** on conflict condition */
    on_conflict?: niftysave_migration_on_conflict | null
  }) => niftysave_migration_mutation_responsePromiseChain & {
    execute: (
      request: niftysave_migration_mutation_responseRequest,
      defaultValue?: niftysave_migration_mutation_response | null
    ) => Promise<niftysave_migration_mutation_response | null>
  }
  /** insert a single row into the table: "niftysave_migration" */
  insert_niftysave_migration_one: (args: {
    /** the row to be inserted */
    object: niftysave_migration_insert_input
    /** on conflict condition */
    on_conflict?: niftysave_migration_on_conflict | null
  }) => niftysave_migrationPromiseChain & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration | null
    ) => Promise<niftysave_migration | null>
  }
  /** insert data into the table: "other_nft_resources" */
  insert_other_nft_resources: (args: {
    /** the rows to be inserted */
    objects: other_nft_resources_insert_input[]
    /** on conflict condition */
    on_conflict?: other_nft_resources_on_conflict | null
  }) => other_nft_resources_mutation_responsePromiseChain & {
    execute: (
      request: other_nft_resources_mutation_responseRequest,
      defaultValue?: other_nft_resources_mutation_response | null
    ) => Promise<other_nft_resources_mutation_response | null>
  }
  /** insert a single row into the table: "other_nft_resources" */
  insert_other_nft_resources_one: (args: {
    /** the row to be inserted */
    object: other_nft_resources_insert_input
    /** on conflict condition */
    on_conflict?: other_nft_resources_on_conflict | null
  }) => other_nft_resourcesPromiseChain & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources | null
    ) => Promise<other_nft_resources | null>
  }
  /** insert data into the table: "pin" */
  insert_pin: (args: {
    /** the rows to be inserted */
    objects: pin_insert_input[]
    /** on conflict condition */
    on_conflict?: pin_on_conflict | null
  }) => pin_mutation_responsePromiseChain & {
    execute: (
      request: pin_mutation_responseRequest,
      defaultValue?: pin_mutation_response | null
    ) => Promise<pin_mutation_response | null>
  }
  /** insert a single row into the table: "pin" */
  insert_pin_one: (args: {
    /** the row to be inserted */
    object: pin_insert_input
    /** on conflict condition */
    on_conflict?: pin_on_conflict | null
  }) => pinPromiseChain & {
    execute: (
      request: pinRequest,
      defaultValue?: pin | null
    ) => Promise<pin | null>
  }
  /** insert data into the table: "resource" */
  insert_resource: (args: {
    /** the rows to be inserted */
    objects: resource_insert_input[]
    /** on conflict condition */
    on_conflict?: resource_on_conflict | null
  }) => resource_mutation_responsePromiseChain & {
    execute: (
      request: resource_mutation_responseRequest,
      defaultValue?: resource_mutation_response | null
    ) => Promise<resource_mutation_response | null>
  }
  /** insert a single row into the table: "resource" */
  insert_resource_one: (args: {
    /** the row to be inserted */
    object: resource_insert_input
    /** on conflict condition */
    on_conflict?: resource_on_conflict | null
  }) => resourcePromiseChain & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource | null
    ) => Promise<resource | null>
  }
  /** update data of the table: "blockchain_block" */
  update_blockchain_block: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: blockchain_block_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: blockchain_block_set_input | null
    /** filter the rows which have to be updated */
    where: blockchain_block_bool_exp
  }) => blockchain_block_mutation_responsePromiseChain & {
    execute: (
      request: blockchain_block_mutation_responseRequest,
      defaultValue?: blockchain_block_mutation_response | null
    ) => Promise<blockchain_block_mutation_response | null>
  }
  /** update single row of the table: "blockchain_block" */
  update_blockchain_block_by_pk: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: blockchain_block_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: blockchain_block_set_input | null
    pk_columns: blockchain_block_pk_columns_input
  }) => blockchain_blockPromiseChain & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block | null
    ) => Promise<blockchain_block | null>
  }
  /** update data of the table: "blockchain_contract" */
  update_blockchain_contract: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: blockchain_contract_set_input | null
    /** filter the rows which have to be updated */
    where: blockchain_contract_bool_exp
  }) => blockchain_contract_mutation_responsePromiseChain & {
    execute: (
      request: blockchain_contract_mutation_responseRequest,
      defaultValue?: blockchain_contract_mutation_response | null
    ) => Promise<blockchain_contract_mutation_response | null>
  }
  /** update single row of the table: "blockchain_contract" */
  update_blockchain_contract_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: blockchain_contract_set_input | null
    pk_columns: blockchain_contract_pk_columns_input
  }) => blockchain_contractPromiseChain & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract | null
    ) => Promise<blockchain_contract | null>
  }
  /** update data of the table: "content" */
  update_content: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: content_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: content_set_input | null
    /** filter the rows which have to be updated */
    where: content_bool_exp
  }) => content_mutation_responsePromiseChain & {
    execute: (
      request: content_mutation_responseRequest,
      defaultValue?: content_mutation_response | null
    ) => Promise<content_mutation_response | null>
  }
  /** update single row of the table: "content" */
  update_content_by_pk: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: content_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: content_set_input | null
    pk_columns: content_pk_columns_input
  }) => contentPromiseChain & {
    execute: (
      request: contentRequest,
      defaultValue?: content | null
    ) => Promise<content | null>
  }
  /** update data of the table: "erc721_import" */
  update_erc721_import: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: erc721_import_set_input | null
    /** filter the rows which have to be updated */
    where: erc721_import_bool_exp
  }) => erc721_import_mutation_responsePromiseChain & {
    execute: (
      request: erc721_import_mutation_responseRequest,
      defaultValue?: erc721_import_mutation_response | null
    ) => Promise<erc721_import_mutation_response | null>
  }
  /** update data of the table: "erc721_import_by_nft" */
  update_erc721_import_by_nft: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: erc721_import_by_nft_set_input | null
    /** filter the rows which have to be updated */
    where: erc721_import_by_nft_bool_exp
  }) => erc721_import_by_nft_mutation_responsePromiseChain & {
    execute: (
      request: erc721_import_by_nft_mutation_responseRequest,
      defaultValue?: erc721_import_by_nft_mutation_response | null
    ) => Promise<erc721_import_by_nft_mutation_response | null>
  }
  /** update single row of the table: "erc721_import_by_nft" */
  update_erc721_import_by_nft_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: erc721_import_by_nft_set_input | null
    pk_columns: erc721_import_by_nft_pk_columns_input
  }) => erc721_import_by_nftPromiseChain & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft | null
    ) => Promise<erc721_import_by_nft | null>
  }
  /** update single row of the table: "erc721_import" */
  update_erc721_import_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: erc721_import_set_input | null
    pk_columns: erc721_import_pk_columns_input
  }) => erc721_importPromiseChain & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import | null
    ) => Promise<erc721_import | null>
  }
  /** update data of the table: "nft" */
  update_nft: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_set_input | null
    /** filter the rows which have to be updated */
    where: nft_bool_exp
  }) => nft_mutation_responsePromiseChain & {
    execute: (
      request: nft_mutation_responseRequest,
      defaultValue?: nft_mutation_response | null
    ) => Promise<nft_mutation_response | null>
  }
  /** update data of the table: "nft_asset" */
  update_nft_asset: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_asset_set_input | null
    /** filter the rows which have to be updated */
    where: nft_asset_bool_exp
  }) => nft_asset_mutation_responsePromiseChain & {
    execute: (
      request: nft_asset_mutation_responseRequest,
      defaultValue?: nft_asset_mutation_response | null
    ) => Promise<nft_asset_mutation_response | null>
  }
  /** update single row of the table: "nft_asset" */
  update_nft_asset_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_asset_set_input | null
    pk_columns: nft_asset_pk_columns_input
  }) => nft_assetPromiseChain & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset | null
    ) => Promise<nft_asset | null>
  }
  /** update single row of the table: "nft" */
  update_nft_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_set_input | null
    pk_columns: nft_pk_columns_input
  }) => nftPromiseChain & {
    execute: (
      request: nftRequest,
      defaultValue?: nft | null
    ) => Promise<nft | null>
  }
  /** update data of the table: "nft_metadata" */
  update_nft_metadata: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_metadata_set_input | null
    /** filter the rows which have to be updated */
    where: nft_metadata_bool_exp
  }) => nft_metadata_mutation_responsePromiseChain & {
    execute: (
      request: nft_metadata_mutation_responseRequest,
      defaultValue?: nft_metadata_mutation_response | null
    ) => Promise<nft_metadata_mutation_response | null>
  }
  /** update single row of the table: "nft_metadata" */
  update_nft_metadata_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_metadata_set_input | null
    pk_columns: nft_metadata_pk_columns_input
  }) => nft_metadataPromiseChain & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata | null
    ) => Promise<nft_metadata | null>
  }
  /** update data of the table: "nft_owner" */
  update_nft_owner: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_owner_set_input | null
    /** filter the rows which have to be updated */
    where: nft_owner_bool_exp
  }) => nft_owner_mutation_responsePromiseChain & {
    execute: (
      request: nft_owner_mutation_responseRequest,
      defaultValue?: nft_owner_mutation_response | null
    ) => Promise<nft_owner_mutation_response | null>
  }
  /** update single row of the table: "nft_owner" */
  update_nft_owner_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_owner_set_input | null
    pk_columns: nft_owner_pk_columns_input
  }) => nft_ownerPromiseChain & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner | null
    ) => Promise<nft_owner | null>
  }
  /** update data of the table: "nfts_by_blockchain_blocks" */
  update_nfts_by_blockchain_blocks: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nfts_by_blockchain_blocks_set_input | null
    /** filter the rows which have to be updated */
    where: nfts_by_blockchain_blocks_bool_exp
  }) => nfts_by_blockchain_blocks_mutation_responsePromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocks_mutation_responseRequest,
      defaultValue?: nfts_by_blockchain_blocks_mutation_response | null
    ) => Promise<nfts_by_blockchain_blocks_mutation_response | null>
  }
  /** update single row of the table: "nfts_by_blockchain_blocks" */
  update_nfts_by_blockchain_blocks_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nfts_by_blockchain_blocks_set_input | null
    pk_columns: nfts_by_blockchain_blocks_pk_columns_input
  }) => nfts_by_blockchain_blocksPromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks | null
    ) => Promise<nfts_by_blockchain_blocks | null>
  }
  /** update data of the table: "niftysave_migration" */
  update_niftysave_migration: (args: {
    /** append existing jsonb value of filtered columns with new jsonb value */
    _append?: niftysave_migration_append_input | null
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    _delete_at_path?: niftysave_migration_delete_at_path_input | null
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    _delete_elem?: niftysave_migration_delete_elem_input | null
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    _delete_key?: niftysave_migration_delete_key_input | null
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    _prepend?: niftysave_migration_prepend_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: niftysave_migration_set_input | null
    /** filter the rows which have to be updated */
    where: niftysave_migration_bool_exp
  }) => niftysave_migration_mutation_responsePromiseChain & {
    execute: (
      request: niftysave_migration_mutation_responseRequest,
      defaultValue?: niftysave_migration_mutation_response | null
    ) => Promise<niftysave_migration_mutation_response | null>
  }
  /** update single row of the table: "niftysave_migration" */
  update_niftysave_migration_by_pk: (args: {
    /** append existing jsonb value of filtered columns with new jsonb value */
    _append?: niftysave_migration_append_input | null
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    _delete_at_path?: niftysave_migration_delete_at_path_input | null
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    _delete_elem?: niftysave_migration_delete_elem_input | null
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    _delete_key?: niftysave_migration_delete_key_input | null
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    _prepend?: niftysave_migration_prepend_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: niftysave_migration_set_input | null
    pk_columns: niftysave_migration_pk_columns_input
  }) => niftysave_migrationPromiseChain & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration | null
    ) => Promise<niftysave_migration | null>
  }
  /** update data of the table: "other_nft_resources" */
  update_other_nft_resources: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: other_nft_resources_set_input | null
    /** filter the rows which have to be updated */
    where: other_nft_resources_bool_exp
  }) => other_nft_resources_mutation_responsePromiseChain & {
    execute: (
      request: other_nft_resources_mutation_responseRequest,
      defaultValue?: other_nft_resources_mutation_response | null
    ) => Promise<other_nft_resources_mutation_response | null>
  }
  /** update single row of the table: "other_nft_resources" */
  update_other_nft_resources_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: other_nft_resources_set_input | null
    pk_columns: other_nft_resources_pk_columns_input
  }) => other_nft_resourcesPromiseChain & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources | null
    ) => Promise<other_nft_resources | null>
  }
  /** update data of the table: "pin" */
  update_pin: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: pin_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: pin_set_input | null
    /** filter the rows which have to be updated */
    where: pin_bool_exp
  }) => pin_mutation_responsePromiseChain & {
    execute: (
      request: pin_mutation_responseRequest,
      defaultValue?: pin_mutation_response | null
    ) => Promise<pin_mutation_response | null>
  }
  /** update single row of the table: "pin" */
  update_pin_by_pk: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: pin_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: pin_set_input | null
    pk_columns: pin_pk_columns_input
  }) => pinPromiseChain & {
    execute: (
      request: pinRequest,
      defaultValue?: pin | null
    ) => Promise<pin | null>
  }
  /** update data of the table: "resource" */
  update_resource: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: resource_set_input | null
    /** filter the rows which have to be updated */
    where: resource_bool_exp
  }) => resource_mutation_responsePromiseChain & {
    execute: (
      request: resource_mutation_responseRequest,
      defaultValue?: resource_mutation_response | null
    ) => Promise<resource_mutation_response | null>
  }
  /** update single row of the table: "resource" */
  update_resource_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: resource_set_input | null
    pk_columns: resource_pk_columns_input
  }) => resourcePromiseChain & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource | null
    ) => Promise<resource | null>
  }
}

/** mutation root */
export interface mutation_rootObservableChain {
  /** delete data from the table: "blockchain_block" */
  delete_blockchain_block: (args: {
    /** filter the rows which have to be deleted */
    where: blockchain_block_bool_exp
  }) => blockchain_block_mutation_responseObservableChain & {
    execute: (
      request: blockchain_block_mutation_responseRequest,
      defaultValue?: blockchain_block_mutation_response | null
    ) => Observable<blockchain_block_mutation_response | null>
  }
  /** delete single row from the table: "blockchain_block" */
  delete_blockchain_block_by_pk: (args: {
    hash: String
  }) => blockchain_blockObservableChain & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block | null
    ) => Observable<blockchain_block | null>
  }
  /** delete data from the table: "blockchain_contract" */
  delete_blockchain_contract: (args: {
    /** filter the rows which have to be deleted */
    where: blockchain_contract_bool_exp
  }) => blockchain_contract_mutation_responseObservableChain & {
    execute: (
      request: blockchain_contract_mutation_responseRequest,
      defaultValue?: blockchain_contract_mutation_response | null
    ) => Observable<blockchain_contract_mutation_response | null>
  }
  /** delete single row from the table: "blockchain_contract" */
  delete_blockchain_contract_by_pk: (args: {
    id: String
  }) => blockchain_contractObservableChain & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract | null
    ) => Observable<blockchain_contract | null>
  }
  /** delete data from the table: "content" */
  delete_content: (args: {
    /** filter the rows which have to be deleted */
    where: content_bool_exp
  }) => content_mutation_responseObservableChain & {
    execute: (
      request: content_mutation_responseRequest,
      defaultValue?: content_mutation_response | null
    ) => Observable<content_mutation_response | null>
  }
  /** delete single row from the table: "content" */
  delete_content_by_pk: (args: {
    cid: String
  }) => contentObservableChain & {
    execute: (
      request: contentRequest,
      defaultValue?: content | null
    ) => Observable<content | null>
  }
  /** delete data from the table: "erc721_import" */
  delete_erc721_import: (args: {
    /** filter the rows which have to be deleted */
    where: erc721_import_bool_exp
  }) => erc721_import_mutation_responseObservableChain & {
    execute: (
      request: erc721_import_mutation_responseRequest,
      defaultValue?: erc721_import_mutation_response | null
    ) => Observable<erc721_import_mutation_response | null>
  }
  /** delete data from the table: "erc721_import_by_nft" */
  delete_erc721_import_by_nft: (args: {
    /** filter the rows which have to be deleted */
    where: erc721_import_by_nft_bool_exp
  }) => erc721_import_by_nft_mutation_responseObservableChain & {
    execute: (
      request: erc721_import_by_nft_mutation_responseRequest,
      defaultValue?: erc721_import_by_nft_mutation_response | null
    ) => Observable<erc721_import_by_nft_mutation_response | null>
  }
  /** delete single row from the table: "erc721_import_by_nft" */
  delete_erc721_import_by_nft_by_pk: (args: {
    erc721_import_id: String
    nft_id: String
  }) => erc721_import_by_nftObservableChain & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft | null
    ) => Observable<erc721_import_by_nft | null>
  }
  /** delete single row from the table: "erc721_import" */
  delete_erc721_import_by_pk: (args: {
    id: String
  }) => erc721_importObservableChain & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import | null
    ) => Observable<erc721_import | null>
  }
  /** delete data from the table: "nft" */
  delete_nft: (args: {
    /** filter the rows which have to be deleted */
    where: nft_bool_exp
  }) => nft_mutation_responseObservableChain & {
    execute: (
      request: nft_mutation_responseRequest,
      defaultValue?: nft_mutation_response | null
    ) => Observable<nft_mutation_response | null>
  }
  /** delete data from the table: "nft_asset" */
  delete_nft_asset: (args: {
    /** filter the rows which have to be deleted */
    where: nft_asset_bool_exp
  }) => nft_asset_mutation_responseObservableChain & {
    execute: (
      request: nft_asset_mutation_responseRequest,
      defaultValue?: nft_asset_mutation_response | null
    ) => Observable<nft_asset_mutation_response | null>
  }
  /** delete single row from the table: "nft_asset" */
  delete_nft_asset_by_pk: (args: {
    token_uri: String
  }) => nft_assetObservableChain & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset | null
    ) => Observable<nft_asset | null>
  }
  /** delete single row from the table: "nft" */
  delete_nft_by_pk: (args: {
    id: String
  }) => nftObservableChain & {
    execute: (
      request: nftRequest,
      defaultValue?: nft | null
    ) => Observable<nft | null>
  }
  /** delete data from the table: "nft_metadata" */
  delete_nft_metadata: (args: {
    /** filter the rows which have to be deleted */
    where: nft_metadata_bool_exp
  }) => nft_metadata_mutation_responseObservableChain & {
    execute: (
      request: nft_metadata_mutation_responseRequest,
      defaultValue?: nft_metadata_mutation_response | null
    ) => Observable<nft_metadata_mutation_response | null>
  }
  /** delete single row from the table: "nft_metadata" */
  delete_nft_metadata_by_pk: (args: {
    content_cid: String
  }) => nft_metadataObservableChain & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata | null
    ) => Observable<nft_metadata | null>
  }
  /** delete data from the table: "nft_owner" */
  delete_nft_owner: (args: {
    /** filter the rows which have to be deleted */
    where: nft_owner_bool_exp
  }) => nft_owner_mutation_responseObservableChain & {
    execute: (
      request: nft_owner_mutation_responseRequest,
      defaultValue?: nft_owner_mutation_response | null
    ) => Observable<nft_owner_mutation_response | null>
  }
  /** delete single row from the table: "nft_owner" */
  delete_nft_owner_by_pk: (args: {
    id: String
  }) => nft_ownerObservableChain & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner | null
    ) => Observable<nft_owner | null>
  }
  /** delete data from the table: "nfts_by_blockchain_blocks" */
  delete_nfts_by_blockchain_blocks: (args: {
    /** filter the rows which have to be deleted */
    where: nfts_by_blockchain_blocks_bool_exp
  }) => nfts_by_blockchain_blocks_mutation_responseObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocks_mutation_responseRequest,
      defaultValue?: nfts_by_blockchain_blocks_mutation_response | null
    ) => Observable<nfts_by_blockchain_blocks_mutation_response | null>
  }
  /** delete single row from the table: "nfts_by_blockchain_blocks" */
  delete_nfts_by_blockchain_blocks_by_pk: (args: {
    blockchain_block_hash: String
    nft_id: String
  }) => nfts_by_blockchain_blocksObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks | null
    ) => Observable<nfts_by_blockchain_blocks | null>
  }
  /** delete data from the table: "niftysave_migration" */
  delete_niftysave_migration: (args: {
    /** filter the rows which have to be deleted */
    where: niftysave_migration_bool_exp
  }) => niftysave_migration_mutation_responseObservableChain & {
    execute: (
      request: niftysave_migration_mutation_responseRequest,
      defaultValue?: niftysave_migration_mutation_response | null
    ) => Observable<niftysave_migration_mutation_response | null>
  }
  /** delete single row from the table: "niftysave_migration" */
  delete_niftysave_migration_by_pk: (args: {
    id: String
  }) => niftysave_migrationObservableChain & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration | null
    ) => Observable<niftysave_migration | null>
  }
  /** delete data from the table: "other_nft_resources" */
  delete_other_nft_resources: (args: {
    /** filter the rows which have to be deleted */
    where: other_nft_resources_bool_exp
  }) => other_nft_resources_mutation_responseObservableChain & {
    execute: (
      request: other_nft_resources_mutation_responseRequest,
      defaultValue?: other_nft_resources_mutation_response | null
    ) => Observable<other_nft_resources_mutation_response | null>
  }
  /** delete single row from the table: "other_nft_resources" */
  delete_other_nft_resources_by_pk: (args: {
    content_cid: String
    resource_uri: String
  }) => other_nft_resourcesObservableChain & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources | null
    ) => Observable<other_nft_resources | null>
  }
  /** delete data from the table: "pin" */
  delete_pin: (args: {
    /** filter the rows which have to be deleted */
    where: pin_bool_exp
  }) => pin_mutation_responseObservableChain & {
    execute: (
      request: pin_mutation_responseRequest,
      defaultValue?: pin_mutation_response | null
    ) => Observable<pin_mutation_response | null>
  }
  /** delete single row from the table: "pin" */
  delete_pin_by_pk: (args: {
    id: bigint
  }) => pinObservableChain & {
    execute: (
      request: pinRequest,
      defaultValue?: pin | null
    ) => Observable<pin | null>
  }
  /** delete data from the table: "resource" */
  delete_resource: (args: {
    /** filter the rows which have to be deleted */
    where: resource_bool_exp
  }) => resource_mutation_responseObservableChain & {
    execute: (
      request: resource_mutation_responseRequest,
      defaultValue?: resource_mutation_response | null
    ) => Observable<resource_mutation_response | null>
  }
  /** delete single row from the table: "resource" */
  delete_resource_by_pk: (args: {
    uri: String
  }) => resourceObservableChain & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource | null
    ) => Observable<resource | null>
  }
  /** insert data into the table: "blockchain_block" */
  insert_blockchain_block: (args: {
    /** the rows to be inserted */
    objects: blockchain_block_insert_input[]
    /** on conflict condition */
    on_conflict?: blockchain_block_on_conflict | null
  }) => blockchain_block_mutation_responseObservableChain & {
    execute: (
      request: blockchain_block_mutation_responseRequest,
      defaultValue?: blockchain_block_mutation_response | null
    ) => Observable<blockchain_block_mutation_response | null>
  }
  /** insert a single row into the table: "blockchain_block" */
  insert_blockchain_block_one: (args: {
    /** the row to be inserted */
    object: blockchain_block_insert_input
    /** on conflict condition */
    on_conflict?: blockchain_block_on_conflict | null
  }) => blockchain_blockObservableChain & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block | null
    ) => Observable<blockchain_block | null>
  }
  /** insert data into the table: "blockchain_contract" */
  insert_blockchain_contract: (args: {
    /** the rows to be inserted */
    objects: blockchain_contract_insert_input[]
    /** on conflict condition */
    on_conflict?: blockchain_contract_on_conflict | null
  }) => blockchain_contract_mutation_responseObservableChain & {
    execute: (
      request: blockchain_contract_mutation_responseRequest,
      defaultValue?: blockchain_contract_mutation_response | null
    ) => Observable<blockchain_contract_mutation_response | null>
  }
  /** insert a single row into the table: "blockchain_contract" */
  insert_blockchain_contract_one: (args: {
    /** the row to be inserted */
    object: blockchain_contract_insert_input
    /** on conflict condition */
    on_conflict?: blockchain_contract_on_conflict | null
  }) => blockchain_contractObservableChain & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract | null
    ) => Observable<blockchain_contract | null>
  }
  /** insert data into the table: "content" */
  insert_content: (args: {
    /** the rows to be inserted */
    objects: content_insert_input[]
    /** on conflict condition */
    on_conflict?: content_on_conflict | null
  }) => content_mutation_responseObservableChain & {
    execute: (
      request: content_mutation_responseRequest,
      defaultValue?: content_mutation_response | null
    ) => Observable<content_mutation_response | null>
  }
  /** insert a single row into the table: "content" */
  insert_content_one: (args: {
    /** the row to be inserted */
    object: content_insert_input
    /** on conflict condition */
    on_conflict?: content_on_conflict | null
  }) => contentObservableChain & {
    execute: (
      request: contentRequest,
      defaultValue?: content | null
    ) => Observable<content | null>
  }
  /** insert data into the table: "erc721_import" */
  insert_erc721_import: (args: {
    /** the rows to be inserted */
    objects: erc721_import_insert_input[]
    /** on conflict condition */
    on_conflict?: erc721_import_on_conflict | null
  }) => erc721_import_mutation_responseObservableChain & {
    execute: (
      request: erc721_import_mutation_responseRequest,
      defaultValue?: erc721_import_mutation_response | null
    ) => Observable<erc721_import_mutation_response | null>
  }
  /** insert data into the table: "erc721_import_by_nft" */
  insert_erc721_import_by_nft: (args: {
    /** the rows to be inserted */
    objects: erc721_import_by_nft_insert_input[]
    /** on conflict condition */
    on_conflict?: erc721_import_by_nft_on_conflict | null
  }) => erc721_import_by_nft_mutation_responseObservableChain & {
    execute: (
      request: erc721_import_by_nft_mutation_responseRequest,
      defaultValue?: erc721_import_by_nft_mutation_response | null
    ) => Observable<erc721_import_by_nft_mutation_response | null>
  }
  /** insert a single row into the table: "erc721_import_by_nft" */
  insert_erc721_import_by_nft_one: (args: {
    /** the row to be inserted */
    object: erc721_import_by_nft_insert_input
    /** on conflict condition */
    on_conflict?: erc721_import_by_nft_on_conflict | null
  }) => erc721_import_by_nftObservableChain & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft | null
    ) => Observable<erc721_import_by_nft | null>
  }
  /** insert a single row into the table: "erc721_import" */
  insert_erc721_import_one: (args: {
    /** the row to be inserted */
    object: erc721_import_insert_input
    /** on conflict condition */
    on_conflict?: erc721_import_on_conflict | null
  }) => erc721_importObservableChain & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import | null
    ) => Observable<erc721_import | null>
  }
  /** insert data into the table: "nft" */
  insert_nft: (args: {
    /** the rows to be inserted */
    objects: nft_insert_input[]
    /** on conflict condition */
    on_conflict?: nft_on_conflict | null
  }) => nft_mutation_responseObservableChain & {
    execute: (
      request: nft_mutation_responseRequest,
      defaultValue?: nft_mutation_response | null
    ) => Observable<nft_mutation_response | null>
  }
  /** insert data into the table: "nft_asset" */
  insert_nft_asset: (args: {
    /** the rows to be inserted */
    objects: nft_asset_insert_input[]
    /** on conflict condition */
    on_conflict?: nft_asset_on_conflict | null
  }) => nft_asset_mutation_responseObservableChain & {
    execute: (
      request: nft_asset_mutation_responseRequest,
      defaultValue?: nft_asset_mutation_response | null
    ) => Observable<nft_asset_mutation_response | null>
  }
  /** insert a single row into the table: "nft_asset" */
  insert_nft_asset_one: (args: {
    /** the row to be inserted */
    object: nft_asset_insert_input
    /** on conflict condition */
    on_conflict?: nft_asset_on_conflict | null
  }) => nft_assetObservableChain & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset | null
    ) => Observable<nft_asset | null>
  }
  /** insert data into the table: "nft_metadata" */
  insert_nft_metadata: (args: {
    /** the rows to be inserted */
    objects: nft_metadata_insert_input[]
    /** on conflict condition */
    on_conflict?: nft_metadata_on_conflict | null
  }) => nft_metadata_mutation_responseObservableChain & {
    execute: (
      request: nft_metadata_mutation_responseRequest,
      defaultValue?: nft_metadata_mutation_response | null
    ) => Observable<nft_metadata_mutation_response | null>
  }
  /** insert a single row into the table: "nft_metadata" */
  insert_nft_metadata_one: (args: {
    /** the row to be inserted */
    object: nft_metadata_insert_input
    /** on conflict condition */
    on_conflict?: nft_metadata_on_conflict | null
  }) => nft_metadataObservableChain & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata | null
    ) => Observable<nft_metadata | null>
  }
  /** insert a single row into the table: "nft" */
  insert_nft_one: (args: {
    /** the row to be inserted */
    object: nft_insert_input
    /** on conflict condition */
    on_conflict?: nft_on_conflict | null
  }) => nftObservableChain & {
    execute: (
      request: nftRequest,
      defaultValue?: nft | null
    ) => Observable<nft | null>
  }
  /** insert data into the table: "nft_owner" */
  insert_nft_owner: (args: {
    /** the rows to be inserted */
    objects: nft_owner_insert_input[]
    /** on conflict condition */
    on_conflict?: nft_owner_on_conflict | null
  }) => nft_owner_mutation_responseObservableChain & {
    execute: (
      request: nft_owner_mutation_responseRequest,
      defaultValue?: nft_owner_mutation_response | null
    ) => Observable<nft_owner_mutation_response | null>
  }
  /** insert a single row into the table: "nft_owner" */
  insert_nft_owner_one: (args: {
    /** the row to be inserted */
    object: nft_owner_insert_input
    /** on conflict condition */
    on_conflict?: nft_owner_on_conflict | null
  }) => nft_ownerObservableChain & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner | null
    ) => Observable<nft_owner | null>
  }
  /** insert data into the table: "nfts_by_blockchain_blocks" */
  insert_nfts_by_blockchain_blocks: (args: {
    /** the rows to be inserted */
    objects: nfts_by_blockchain_blocks_insert_input[]
    /** on conflict condition */
    on_conflict?: nfts_by_blockchain_blocks_on_conflict | null
  }) => nfts_by_blockchain_blocks_mutation_responseObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocks_mutation_responseRequest,
      defaultValue?: nfts_by_blockchain_blocks_mutation_response | null
    ) => Observable<nfts_by_blockchain_blocks_mutation_response | null>
  }
  /** insert a single row into the table: "nfts_by_blockchain_blocks" */
  insert_nfts_by_blockchain_blocks_one: (args: {
    /** the row to be inserted */
    object: nfts_by_blockchain_blocks_insert_input
    /** on conflict condition */
    on_conflict?: nfts_by_blockchain_blocks_on_conflict | null
  }) => nfts_by_blockchain_blocksObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks | null
    ) => Observable<nfts_by_blockchain_blocks | null>
  }
  /** insert data into the table: "niftysave_migration" */
  insert_niftysave_migration: (args: {
    /** the rows to be inserted */
    objects: niftysave_migration_insert_input[]
    /** on conflict condition */
    on_conflict?: niftysave_migration_on_conflict | null
  }) => niftysave_migration_mutation_responseObservableChain & {
    execute: (
      request: niftysave_migration_mutation_responseRequest,
      defaultValue?: niftysave_migration_mutation_response | null
    ) => Observable<niftysave_migration_mutation_response | null>
  }
  /** insert a single row into the table: "niftysave_migration" */
  insert_niftysave_migration_one: (args: {
    /** the row to be inserted */
    object: niftysave_migration_insert_input
    /** on conflict condition */
    on_conflict?: niftysave_migration_on_conflict | null
  }) => niftysave_migrationObservableChain & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration | null
    ) => Observable<niftysave_migration | null>
  }
  /** insert data into the table: "other_nft_resources" */
  insert_other_nft_resources: (args: {
    /** the rows to be inserted */
    objects: other_nft_resources_insert_input[]
    /** on conflict condition */
    on_conflict?: other_nft_resources_on_conflict | null
  }) => other_nft_resources_mutation_responseObservableChain & {
    execute: (
      request: other_nft_resources_mutation_responseRequest,
      defaultValue?: other_nft_resources_mutation_response | null
    ) => Observable<other_nft_resources_mutation_response | null>
  }
  /** insert a single row into the table: "other_nft_resources" */
  insert_other_nft_resources_one: (args: {
    /** the row to be inserted */
    object: other_nft_resources_insert_input
    /** on conflict condition */
    on_conflict?: other_nft_resources_on_conflict | null
  }) => other_nft_resourcesObservableChain & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources | null
    ) => Observable<other_nft_resources | null>
  }
  /** insert data into the table: "pin" */
  insert_pin: (args: {
    /** the rows to be inserted */
    objects: pin_insert_input[]
    /** on conflict condition */
    on_conflict?: pin_on_conflict | null
  }) => pin_mutation_responseObservableChain & {
    execute: (
      request: pin_mutation_responseRequest,
      defaultValue?: pin_mutation_response | null
    ) => Observable<pin_mutation_response | null>
  }
  /** insert a single row into the table: "pin" */
  insert_pin_one: (args: {
    /** the row to be inserted */
    object: pin_insert_input
    /** on conflict condition */
    on_conflict?: pin_on_conflict | null
  }) => pinObservableChain & {
    execute: (
      request: pinRequest,
      defaultValue?: pin | null
    ) => Observable<pin | null>
  }
  /** insert data into the table: "resource" */
  insert_resource: (args: {
    /** the rows to be inserted */
    objects: resource_insert_input[]
    /** on conflict condition */
    on_conflict?: resource_on_conflict | null
  }) => resource_mutation_responseObservableChain & {
    execute: (
      request: resource_mutation_responseRequest,
      defaultValue?: resource_mutation_response | null
    ) => Observable<resource_mutation_response | null>
  }
  /** insert a single row into the table: "resource" */
  insert_resource_one: (args: {
    /** the row to be inserted */
    object: resource_insert_input
    /** on conflict condition */
    on_conflict?: resource_on_conflict | null
  }) => resourceObservableChain & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource | null
    ) => Observable<resource | null>
  }
  /** update data of the table: "blockchain_block" */
  update_blockchain_block: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: blockchain_block_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: blockchain_block_set_input | null
    /** filter the rows which have to be updated */
    where: blockchain_block_bool_exp
  }) => blockchain_block_mutation_responseObservableChain & {
    execute: (
      request: blockchain_block_mutation_responseRequest,
      defaultValue?: blockchain_block_mutation_response | null
    ) => Observable<blockchain_block_mutation_response | null>
  }
  /** update single row of the table: "blockchain_block" */
  update_blockchain_block_by_pk: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: blockchain_block_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: blockchain_block_set_input | null
    pk_columns: blockchain_block_pk_columns_input
  }) => blockchain_blockObservableChain & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block | null
    ) => Observable<blockchain_block | null>
  }
  /** update data of the table: "blockchain_contract" */
  update_blockchain_contract: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: blockchain_contract_set_input | null
    /** filter the rows which have to be updated */
    where: blockchain_contract_bool_exp
  }) => blockchain_contract_mutation_responseObservableChain & {
    execute: (
      request: blockchain_contract_mutation_responseRequest,
      defaultValue?: blockchain_contract_mutation_response | null
    ) => Observable<blockchain_contract_mutation_response | null>
  }
  /** update single row of the table: "blockchain_contract" */
  update_blockchain_contract_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: blockchain_contract_set_input | null
    pk_columns: blockchain_contract_pk_columns_input
  }) => blockchain_contractObservableChain & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract | null
    ) => Observable<blockchain_contract | null>
  }
  /** update data of the table: "content" */
  update_content: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: content_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: content_set_input | null
    /** filter the rows which have to be updated */
    where: content_bool_exp
  }) => content_mutation_responseObservableChain & {
    execute: (
      request: content_mutation_responseRequest,
      defaultValue?: content_mutation_response | null
    ) => Observable<content_mutation_response | null>
  }
  /** update single row of the table: "content" */
  update_content_by_pk: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: content_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: content_set_input | null
    pk_columns: content_pk_columns_input
  }) => contentObservableChain & {
    execute: (
      request: contentRequest,
      defaultValue?: content | null
    ) => Observable<content | null>
  }
  /** update data of the table: "erc721_import" */
  update_erc721_import: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: erc721_import_set_input | null
    /** filter the rows which have to be updated */
    where: erc721_import_bool_exp
  }) => erc721_import_mutation_responseObservableChain & {
    execute: (
      request: erc721_import_mutation_responseRequest,
      defaultValue?: erc721_import_mutation_response | null
    ) => Observable<erc721_import_mutation_response | null>
  }
  /** update data of the table: "erc721_import_by_nft" */
  update_erc721_import_by_nft: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: erc721_import_by_nft_set_input | null
    /** filter the rows which have to be updated */
    where: erc721_import_by_nft_bool_exp
  }) => erc721_import_by_nft_mutation_responseObservableChain & {
    execute: (
      request: erc721_import_by_nft_mutation_responseRequest,
      defaultValue?: erc721_import_by_nft_mutation_response | null
    ) => Observable<erc721_import_by_nft_mutation_response | null>
  }
  /** update single row of the table: "erc721_import_by_nft" */
  update_erc721_import_by_nft_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: erc721_import_by_nft_set_input | null
    pk_columns: erc721_import_by_nft_pk_columns_input
  }) => erc721_import_by_nftObservableChain & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft | null
    ) => Observable<erc721_import_by_nft | null>
  }
  /** update single row of the table: "erc721_import" */
  update_erc721_import_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: erc721_import_set_input | null
    pk_columns: erc721_import_pk_columns_input
  }) => erc721_importObservableChain & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import | null
    ) => Observable<erc721_import | null>
  }
  /** update data of the table: "nft" */
  update_nft: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_set_input | null
    /** filter the rows which have to be updated */
    where: nft_bool_exp
  }) => nft_mutation_responseObservableChain & {
    execute: (
      request: nft_mutation_responseRequest,
      defaultValue?: nft_mutation_response | null
    ) => Observable<nft_mutation_response | null>
  }
  /** update data of the table: "nft_asset" */
  update_nft_asset: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_asset_set_input | null
    /** filter the rows which have to be updated */
    where: nft_asset_bool_exp
  }) => nft_asset_mutation_responseObservableChain & {
    execute: (
      request: nft_asset_mutation_responseRequest,
      defaultValue?: nft_asset_mutation_response | null
    ) => Observable<nft_asset_mutation_response | null>
  }
  /** update single row of the table: "nft_asset" */
  update_nft_asset_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_asset_set_input | null
    pk_columns: nft_asset_pk_columns_input
  }) => nft_assetObservableChain & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset | null
    ) => Observable<nft_asset | null>
  }
  /** update single row of the table: "nft" */
  update_nft_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_set_input | null
    pk_columns: nft_pk_columns_input
  }) => nftObservableChain & {
    execute: (
      request: nftRequest,
      defaultValue?: nft | null
    ) => Observable<nft | null>
  }
  /** update data of the table: "nft_metadata" */
  update_nft_metadata: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_metadata_set_input | null
    /** filter the rows which have to be updated */
    where: nft_metadata_bool_exp
  }) => nft_metadata_mutation_responseObservableChain & {
    execute: (
      request: nft_metadata_mutation_responseRequest,
      defaultValue?: nft_metadata_mutation_response | null
    ) => Observable<nft_metadata_mutation_response | null>
  }
  /** update single row of the table: "nft_metadata" */
  update_nft_metadata_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_metadata_set_input | null
    pk_columns: nft_metadata_pk_columns_input
  }) => nft_metadataObservableChain & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata | null
    ) => Observable<nft_metadata | null>
  }
  /** update data of the table: "nft_owner" */
  update_nft_owner: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_owner_set_input | null
    /** filter the rows which have to be updated */
    where: nft_owner_bool_exp
  }) => nft_owner_mutation_responseObservableChain & {
    execute: (
      request: nft_owner_mutation_responseRequest,
      defaultValue?: nft_owner_mutation_response | null
    ) => Observable<nft_owner_mutation_response | null>
  }
  /** update single row of the table: "nft_owner" */
  update_nft_owner_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nft_owner_set_input | null
    pk_columns: nft_owner_pk_columns_input
  }) => nft_ownerObservableChain & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner | null
    ) => Observable<nft_owner | null>
  }
  /** update data of the table: "nfts_by_blockchain_blocks" */
  update_nfts_by_blockchain_blocks: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nfts_by_blockchain_blocks_set_input | null
    /** filter the rows which have to be updated */
    where: nfts_by_blockchain_blocks_bool_exp
  }) => nfts_by_blockchain_blocks_mutation_responseObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocks_mutation_responseRequest,
      defaultValue?: nfts_by_blockchain_blocks_mutation_response | null
    ) => Observable<nfts_by_blockchain_blocks_mutation_response | null>
  }
  /** update single row of the table: "nfts_by_blockchain_blocks" */
  update_nfts_by_blockchain_blocks_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: nfts_by_blockchain_blocks_set_input | null
    pk_columns: nfts_by_blockchain_blocks_pk_columns_input
  }) => nfts_by_blockchain_blocksObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks | null
    ) => Observable<nfts_by_blockchain_blocks | null>
  }
  /** update data of the table: "niftysave_migration" */
  update_niftysave_migration: (args: {
    /** append existing jsonb value of filtered columns with new jsonb value */
    _append?: niftysave_migration_append_input | null
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    _delete_at_path?: niftysave_migration_delete_at_path_input | null
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    _delete_elem?: niftysave_migration_delete_elem_input | null
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    _delete_key?: niftysave_migration_delete_key_input | null
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    _prepend?: niftysave_migration_prepend_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: niftysave_migration_set_input | null
    /** filter the rows which have to be updated */
    where: niftysave_migration_bool_exp
  }) => niftysave_migration_mutation_responseObservableChain & {
    execute: (
      request: niftysave_migration_mutation_responseRequest,
      defaultValue?: niftysave_migration_mutation_response | null
    ) => Observable<niftysave_migration_mutation_response | null>
  }
  /** update single row of the table: "niftysave_migration" */
  update_niftysave_migration_by_pk: (args: {
    /** append existing jsonb value of filtered columns with new jsonb value */
    _append?: niftysave_migration_append_input | null
    /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
    _delete_at_path?: niftysave_migration_delete_at_path_input | null
    /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
    _delete_elem?: niftysave_migration_delete_elem_input | null
    /** delete key/value pair or string element. key/value pairs are matched based on their key value */
    _delete_key?: niftysave_migration_delete_key_input | null
    /** prepend existing jsonb value of filtered columns with new jsonb value */
    _prepend?: niftysave_migration_prepend_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: niftysave_migration_set_input | null
    pk_columns: niftysave_migration_pk_columns_input
  }) => niftysave_migrationObservableChain & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration | null
    ) => Observable<niftysave_migration | null>
  }
  /** update data of the table: "other_nft_resources" */
  update_other_nft_resources: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: other_nft_resources_set_input | null
    /** filter the rows which have to be updated */
    where: other_nft_resources_bool_exp
  }) => other_nft_resources_mutation_responseObservableChain & {
    execute: (
      request: other_nft_resources_mutation_responseRequest,
      defaultValue?: other_nft_resources_mutation_response | null
    ) => Observable<other_nft_resources_mutation_response | null>
  }
  /** update single row of the table: "other_nft_resources" */
  update_other_nft_resources_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: other_nft_resources_set_input | null
    pk_columns: other_nft_resources_pk_columns_input
  }) => other_nft_resourcesObservableChain & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources | null
    ) => Observable<other_nft_resources | null>
  }
  /** update data of the table: "pin" */
  update_pin: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: pin_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: pin_set_input | null
    /** filter the rows which have to be updated */
    where: pin_bool_exp
  }) => pin_mutation_responseObservableChain & {
    execute: (
      request: pin_mutation_responseRequest,
      defaultValue?: pin_mutation_response | null
    ) => Observable<pin_mutation_response | null>
  }
  /** update single row of the table: "pin" */
  update_pin_by_pk: (args: {
    /** increments the numeric columns with given value of the filtered values */
    _inc?: pin_inc_input | null
    /** sets the columns of the filtered rows to the given values */
    _set?: pin_set_input | null
    pk_columns: pin_pk_columns_input
  }) => pinObservableChain & {
    execute: (
      request: pinRequest,
      defaultValue?: pin | null
    ) => Observable<pin | null>
  }
  /** update data of the table: "resource" */
  update_resource: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: resource_set_input | null
    /** filter the rows which have to be updated */
    where: resource_bool_exp
  }) => resource_mutation_responseObservableChain & {
    execute: (
      request: resource_mutation_responseRequest,
      defaultValue?: resource_mutation_response | null
    ) => Observable<resource_mutation_response | null>
  }
  /** update single row of the table: "resource" */
  update_resource_by_pk: (args: {
    /** sets the columns of the filtered rows to the given values */
    _set?: resource_set_input | null
    pk_columns: resource_pk_columns_input
  }) => resourceObservableChain & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource | null
    ) => Observable<resource | null>
  }
}

/** response of any mutation on the table "blockchain_block" */
export interface blockchain_block_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Promise<blockchain_block[]>
  }
}

/** response of any mutation on the table "blockchain_block" */
export interface blockchain_block_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Observable<blockchain_block[]>
  }
}

/** response of any mutation on the table "blockchain_contract" */
export interface blockchain_contract_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Promise<blockchain_contract[]>
  }
}

/** response of any mutation on the table "blockchain_contract" */
export interface blockchain_contract_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Observable<blockchain_contract[]>
  }
}

/** response of any mutation on the table "content" */
export interface content_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Promise<content[]>
  }
}

/** response of any mutation on the table "content" */
export interface content_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Observable<content[]>
  }
}

/** response of any mutation on the table "erc721_import" */
export interface erc721_import_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Promise<erc721_import[]>
  }
}

/** response of any mutation on the table "erc721_import" */
export interface erc721_import_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Observable<erc721_import[]>
  }
}

/** response of any mutation on the table "erc721_import_by_nft" */
export interface erc721_import_by_nft_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Promise<erc721_import_by_nft[]>
  }
}

/** response of any mutation on the table "erc721_import_by_nft" */
export interface erc721_import_by_nft_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Observable<erc721_import_by_nft[]>
  }
}

/** response of any mutation on the table "nft" */
export interface nft_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (request: nftRequest, defaultValue?: nft[]) => Promise<nft[]>
  }
}

/** response of any mutation on the table "nft" */
export interface nft_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (request: nftRequest, defaultValue?: nft[]) => Observable<nft[]>
  }
}

/** response of any mutation on the table "nft_asset" */
export interface nft_asset_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Promise<nft_asset[]>
  }
}

/** response of any mutation on the table "nft_asset" */
export interface nft_asset_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Observable<nft_asset[]>
  }
}

/** response of any mutation on the table "nft_metadata" */
export interface nft_metadata_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Promise<nft_metadata[]>
  }
}

/** response of any mutation on the table "nft_metadata" */
export interface nft_metadata_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Observable<nft_metadata[]>
  }
}

/** response of any mutation on the table "nft_owner" */
export interface nft_owner_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Promise<nft_owner[]>
  }
}

/** response of any mutation on the table "nft_owner" */
export interface nft_owner_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Observable<nft_owner[]>
  }
}

/** response of any mutation on the table "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Promise<nfts_by_blockchain_blocks[]>
  }
}

/** response of any mutation on the table "nfts_by_blockchain_blocks" */
export interface nfts_by_blockchain_blocks_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Observable<nfts_by_blockchain_blocks[]>
  }
}

/** response of any mutation on the table "niftysave_migration" */
export interface niftysave_migration_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Promise<niftysave_migration[]>
  }
}

/** response of any mutation on the table "niftysave_migration" */
export interface niftysave_migration_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Observable<niftysave_migration[]>
  }
}

/** response of any mutation on the table "other_nft_resources" */
export interface other_nft_resources_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Promise<other_nft_resources[]>
  }
}

/** response of any mutation on the table "other_nft_resources" */
export interface other_nft_resources_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Observable<other_nft_resources[]>
  }
}

/** response of any mutation on the table "pin" */
export interface pin_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (request: pinRequest, defaultValue?: pin[]) => Promise<pin[]>
  }
}

/** response of any mutation on the table "pin" */
export interface pin_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (request: pinRequest, defaultValue?: pin[]) => Observable<pin[]>
  }
}

/** response of any mutation on the table "resource" */
export interface resource_mutation_responsePromiseChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Promise<resource[]>
  }
}

/** response of any mutation on the table "resource" */
export interface resource_mutation_responseObservableChain {
  /** number of rows affected by the mutation */
  affected_rows: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** data from the rows affected by the mutation */
  returning: {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Observable<resource[]>
  }
}

export interface subscription_rootPromiseChain {
  /** fetch data from the table: "blockchain_block" */
  blockchain_block: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_block_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_block_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_block_bool_exp | null
  }) => {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Promise<blockchain_block[]>
  }) & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Promise<blockchain_block[]>
  }
  /** fetch aggregated fields from the table: "blockchain_block" */
  blockchain_block_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_block_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_block_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_block_bool_exp | null
  }) => blockchain_block_aggregatePromiseChain & {
    execute: (
      request: blockchain_block_aggregateRequest,
      defaultValue?: blockchain_block_aggregate
    ) => Promise<blockchain_block_aggregate>
  }) &
    (blockchain_block_aggregatePromiseChain & {
      execute: (
        request: blockchain_block_aggregateRequest,
        defaultValue?: blockchain_block_aggregate
      ) => Promise<blockchain_block_aggregate>
    })
  /** fetch data from the table: "blockchain_block" using primary key columns */
  blockchain_block_by_pk: (args: {
    hash: String
  }) => blockchain_blockPromiseChain & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block | null
    ) => Promise<blockchain_block | null>
  }
  /** fetch data from the table: "blockchain_contract" */
  blockchain_contract: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_contract_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_contract_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_contract_bool_exp | null
  }) => {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Promise<blockchain_contract[]>
  }) & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Promise<blockchain_contract[]>
  }
  /** fetch aggregated fields from the table: "blockchain_contract" */
  blockchain_contract_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_contract_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_contract_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_contract_bool_exp | null
  }) => blockchain_contract_aggregatePromiseChain & {
    execute: (
      request: blockchain_contract_aggregateRequest,
      defaultValue?: blockchain_contract_aggregate
    ) => Promise<blockchain_contract_aggregate>
  }) &
    (blockchain_contract_aggregatePromiseChain & {
      execute: (
        request: blockchain_contract_aggregateRequest,
        defaultValue?: blockchain_contract_aggregate
      ) => Promise<blockchain_contract_aggregate>
    })
  /** fetch data from the table: "blockchain_contract" using primary key columns */
  blockchain_contract_by_pk: (args: {
    id: String
  }) => blockchain_contractPromiseChain & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract | null
    ) => Promise<blockchain_contract | null>
  }
  /** fetch data from the table: "content" */
  content: ((args?: {
    /** distinct select on columns */
    distinct_on?: content_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: content_order_by[] | null
    /** filter the rows returned */
    where?: content_bool_exp | null
  }) => {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Promise<content[]>
  }) & {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Promise<content[]>
  }
  /** fetch aggregated fields from the table: "content" */
  content_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: content_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: content_order_by[] | null
    /** filter the rows returned */
    where?: content_bool_exp | null
  }) => content_aggregatePromiseChain & {
    execute: (
      request: content_aggregateRequest,
      defaultValue?: content_aggregate
    ) => Promise<content_aggregate>
  }) &
    (content_aggregatePromiseChain & {
      execute: (
        request: content_aggregateRequest,
        defaultValue?: content_aggregate
      ) => Promise<content_aggregate>
    })
  /** fetch data from the table: "content" using primary key columns */
  content_by_pk: (args: {
    cid: String
  }) => contentPromiseChain & {
    execute: (
      request: contentRequest,
      defaultValue?: content | null
    ) => Promise<content | null>
  }
  /** fetch data from the table: "erc721_import" */
  erc721_import: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_bool_exp | null
  }) => {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Promise<erc721_import[]>
  }) & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Promise<erc721_import[]>
  }
  /** fetch aggregated fields from the table: "erc721_import" */
  erc721_import_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_bool_exp | null
  }) => erc721_import_aggregatePromiseChain & {
    execute: (
      request: erc721_import_aggregateRequest,
      defaultValue?: erc721_import_aggregate
    ) => Promise<erc721_import_aggregate>
  }) &
    (erc721_import_aggregatePromiseChain & {
      execute: (
        request: erc721_import_aggregateRequest,
        defaultValue?: erc721_import_aggregate
      ) => Promise<erc721_import_aggregate>
    })
  /** fetch data from the table: "erc721_import_by_nft" */
  erc721_import_by_nft: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_by_nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_by_nft_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_by_nft_bool_exp | null
  }) => {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Promise<erc721_import_by_nft[]>
  }) & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Promise<erc721_import_by_nft[]>
  }
  /** fetch aggregated fields from the table: "erc721_import_by_nft" */
  erc721_import_by_nft_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_by_nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_by_nft_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_by_nft_bool_exp | null
  }) => erc721_import_by_nft_aggregatePromiseChain & {
    execute: (
      request: erc721_import_by_nft_aggregateRequest,
      defaultValue?: erc721_import_by_nft_aggregate
    ) => Promise<erc721_import_by_nft_aggregate>
  }) &
    (erc721_import_by_nft_aggregatePromiseChain & {
      execute: (
        request: erc721_import_by_nft_aggregateRequest,
        defaultValue?: erc721_import_by_nft_aggregate
      ) => Promise<erc721_import_by_nft_aggregate>
    })
  /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
  erc721_import_by_nft_by_pk: (args: {
    erc721_import_id: String
    nft_id: String
  }) => erc721_import_by_nftPromiseChain & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft | null
    ) => Promise<erc721_import_by_nft | null>
  }
  /** fetch data from the table: "erc721_import" using primary key columns */
  erc721_import_by_pk: (args: {
    id: String
  }) => erc721_importPromiseChain & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import | null
    ) => Promise<erc721_import | null>
  }
  /** fetch data from the table: "nft" */
  nft: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_order_by[] | null
    /** filter the rows returned */
    where?: nft_bool_exp | null
  }) => {
    execute: (request: nftRequest, defaultValue?: nft[]) => Promise<nft[]>
  }) & {
    execute: (request: nftRequest, defaultValue?: nft[]) => Promise<nft[]>
  }
  /** fetch aggregated fields from the table: "nft" */
  nft_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_order_by[] | null
    /** filter the rows returned */
    where?: nft_bool_exp | null
  }) => nft_aggregatePromiseChain & {
    execute: (
      request: nft_aggregateRequest,
      defaultValue?: nft_aggregate
    ) => Promise<nft_aggregate>
  }) &
    (nft_aggregatePromiseChain & {
      execute: (
        request: nft_aggregateRequest,
        defaultValue?: nft_aggregate
      ) => Promise<nft_aggregate>
    })
  /** fetch data from the table: "nft_asset" */
  nft_asset: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_asset_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_asset_order_by[] | null
    /** filter the rows returned */
    where?: nft_asset_bool_exp | null
  }) => {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Promise<nft_asset[]>
  }) & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Promise<nft_asset[]>
  }
  /** fetch aggregated fields from the table: "nft_asset" */
  nft_asset_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_asset_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_asset_order_by[] | null
    /** filter the rows returned */
    where?: nft_asset_bool_exp | null
  }) => nft_asset_aggregatePromiseChain & {
    execute: (
      request: nft_asset_aggregateRequest,
      defaultValue?: nft_asset_aggregate
    ) => Promise<nft_asset_aggregate>
  }) &
    (nft_asset_aggregatePromiseChain & {
      execute: (
        request: nft_asset_aggregateRequest,
        defaultValue?: nft_asset_aggregate
      ) => Promise<nft_asset_aggregate>
    })
  /** fetch data from the table: "nft_asset" using primary key columns */
  nft_asset_by_pk: (args: {
    token_uri: String
  }) => nft_assetPromiseChain & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset | null
    ) => Promise<nft_asset | null>
  }
  /** fetch data from the table: "nft" using primary key columns */
  nft_by_pk: (args: {
    id: String
  }) => nftPromiseChain & {
    execute: (
      request: nftRequest,
      defaultValue?: nft | null
    ) => Promise<nft | null>
  }
  /** fetch data from the table: "nft_metadata" */
  nft_metadata: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_metadata_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_metadata_order_by[] | null
    /** filter the rows returned */
    where?: nft_metadata_bool_exp | null
  }) => {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Promise<nft_metadata[]>
  }) & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Promise<nft_metadata[]>
  }
  /** fetch aggregated fields from the table: "nft_metadata" */
  nft_metadata_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_metadata_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_metadata_order_by[] | null
    /** filter the rows returned */
    where?: nft_metadata_bool_exp | null
  }) => nft_metadata_aggregatePromiseChain & {
    execute: (
      request: nft_metadata_aggregateRequest,
      defaultValue?: nft_metadata_aggregate
    ) => Promise<nft_metadata_aggregate>
  }) &
    (nft_metadata_aggregatePromiseChain & {
      execute: (
        request: nft_metadata_aggregateRequest,
        defaultValue?: nft_metadata_aggregate
      ) => Promise<nft_metadata_aggregate>
    })
  /** fetch data from the table: "nft_metadata" using primary key columns */
  nft_metadata_by_pk: (args: {
    content_cid: String
  }) => nft_metadataPromiseChain & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata | null
    ) => Promise<nft_metadata | null>
  }
  /** fetch data from the table: "nft_owner" */
  nft_owner: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_owner_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_owner_order_by[] | null
    /** filter the rows returned */
    where?: nft_owner_bool_exp | null
  }) => {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Promise<nft_owner[]>
  }) & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Promise<nft_owner[]>
  }
  /** fetch aggregated fields from the table: "nft_owner" */
  nft_owner_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_owner_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_owner_order_by[] | null
    /** filter the rows returned */
    where?: nft_owner_bool_exp | null
  }) => nft_owner_aggregatePromiseChain & {
    execute: (
      request: nft_owner_aggregateRequest,
      defaultValue?: nft_owner_aggregate
    ) => Promise<nft_owner_aggregate>
  }) &
    (nft_owner_aggregatePromiseChain & {
      execute: (
        request: nft_owner_aggregateRequest,
        defaultValue?: nft_owner_aggregate
      ) => Promise<nft_owner_aggregate>
    })
  /** fetch data from the table: "nft_owner" using primary key columns */
  nft_owner_by_pk: (args: {
    id: String
  }) => nft_ownerPromiseChain & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner | null
    ) => Promise<nft_owner | null>
  }
  /** fetch data from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks: ((args?: {
    /** distinct select on columns */
    distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nfts_by_blockchain_blocks_order_by[] | null
    /** filter the rows returned */
    where?: nfts_by_blockchain_blocks_bool_exp | null
  }) => {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Promise<nfts_by_blockchain_blocks[]>
  }) & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Promise<nfts_by_blockchain_blocks[]>
  }
  /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nfts_by_blockchain_blocks_order_by[] | null
    /** filter the rows returned */
    where?: nfts_by_blockchain_blocks_bool_exp | null
  }) => nfts_by_blockchain_blocks_aggregatePromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocks_aggregateRequest,
      defaultValue?: nfts_by_blockchain_blocks_aggregate
    ) => Promise<nfts_by_blockchain_blocks_aggregate>
  }) &
    (nfts_by_blockchain_blocks_aggregatePromiseChain & {
      execute: (
        request: nfts_by_blockchain_blocks_aggregateRequest,
        defaultValue?: nfts_by_blockchain_blocks_aggregate
      ) => Promise<nfts_by_blockchain_blocks_aggregate>
    })
  /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
  nfts_by_blockchain_blocks_by_pk: (args: {
    blockchain_block_hash: String
    nft_id: String
  }) => nfts_by_blockchain_blocksPromiseChain & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks | null
    ) => Promise<nfts_by_blockchain_blocks | null>
  }
  /** fetch data from the table: "niftysave_migration" */
  niftysave_migration: ((args?: {
    /** distinct select on columns */
    distinct_on?: niftysave_migration_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: niftysave_migration_order_by[] | null
    /** filter the rows returned */
    where?: niftysave_migration_bool_exp | null
  }) => {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Promise<niftysave_migration[]>
  }) & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Promise<niftysave_migration[]>
  }
  /** fetch aggregated fields from the table: "niftysave_migration" */
  niftysave_migration_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: niftysave_migration_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: niftysave_migration_order_by[] | null
    /** filter the rows returned */
    where?: niftysave_migration_bool_exp | null
  }) => niftysave_migration_aggregatePromiseChain & {
    execute: (
      request: niftysave_migration_aggregateRequest,
      defaultValue?: niftysave_migration_aggregate
    ) => Promise<niftysave_migration_aggregate>
  }) &
    (niftysave_migration_aggregatePromiseChain & {
      execute: (
        request: niftysave_migration_aggregateRequest,
        defaultValue?: niftysave_migration_aggregate
      ) => Promise<niftysave_migration_aggregate>
    })
  /** fetch data from the table: "niftysave_migration" using primary key columns */
  niftysave_migration_by_pk: (args: {
    id: String
  }) => niftysave_migrationPromiseChain & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration | null
    ) => Promise<niftysave_migration | null>
  }
  /** fetch data from the table: "other_nft_resources" */
  other_nft_resources: ((args?: {
    /** distinct select on columns */
    distinct_on?: other_nft_resources_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: other_nft_resources_order_by[] | null
    /** filter the rows returned */
    where?: other_nft_resources_bool_exp | null
  }) => {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Promise<other_nft_resources[]>
  }) & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Promise<other_nft_resources[]>
  }
  /** fetch aggregated fields from the table: "other_nft_resources" */
  other_nft_resources_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: other_nft_resources_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: other_nft_resources_order_by[] | null
    /** filter the rows returned */
    where?: other_nft_resources_bool_exp | null
  }) => other_nft_resources_aggregatePromiseChain & {
    execute: (
      request: other_nft_resources_aggregateRequest,
      defaultValue?: other_nft_resources_aggregate
    ) => Promise<other_nft_resources_aggregate>
  }) &
    (other_nft_resources_aggregatePromiseChain & {
      execute: (
        request: other_nft_resources_aggregateRequest,
        defaultValue?: other_nft_resources_aggregate
      ) => Promise<other_nft_resources_aggregate>
    })
  /** fetch data from the table: "other_nft_resources" using primary key columns */
  other_nft_resources_by_pk: (args: {
    content_cid: String
    resource_uri: String
  }) => other_nft_resourcesPromiseChain & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources | null
    ) => Promise<other_nft_resources | null>
  }
  /** fetch data from the table: "pin" */
  pin: ((args?: {
    /** distinct select on columns */
    distinct_on?: pin_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: pin_order_by[] | null
    /** filter the rows returned */
    where?: pin_bool_exp | null
  }) => {
    execute: (request: pinRequest, defaultValue?: pin[]) => Promise<pin[]>
  }) & {
    execute: (request: pinRequest, defaultValue?: pin[]) => Promise<pin[]>
  }
  /** fetch aggregated fields from the table: "pin" */
  pin_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: pin_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: pin_order_by[] | null
    /** filter the rows returned */
    where?: pin_bool_exp | null
  }) => pin_aggregatePromiseChain & {
    execute: (
      request: pin_aggregateRequest,
      defaultValue?: pin_aggregate
    ) => Promise<pin_aggregate>
  }) &
    (pin_aggregatePromiseChain & {
      execute: (
        request: pin_aggregateRequest,
        defaultValue?: pin_aggregate
      ) => Promise<pin_aggregate>
    })
  /** fetch data from the table: "pin" using primary key columns */
  pin_by_pk: (args: {
    id: bigint
  }) => pinPromiseChain & {
    execute: (
      request: pinRequest,
      defaultValue?: pin | null
    ) => Promise<pin | null>
  }
  /** fetch data from the table: "resource" */
  resource: ((args?: {
    /** distinct select on columns */
    distinct_on?: resource_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: resource_order_by[] | null
    /** filter the rows returned */
    where?: resource_bool_exp | null
  }) => {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Promise<resource[]>
  }) & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Promise<resource[]>
  }
  /** fetch aggregated fields from the table: "resource" */
  resource_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: resource_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: resource_order_by[] | null
    /** filter the rows returned */
    where?: resource_bool_exp | null
  }) => resource_aggregatePromiseChain & {
    execute: (
      request: resource_aggregateRequest,
      defaultValue?: resource_aggregate
    ) => Promise<resource_aggregate>
  }) &
    (resource_aggregatePromiseChain & {
      execute: (
        request: resource_aggregateRequest,
        defaultValue?: resource_aggregate
      ) => Promise<resource_aggregate>
    })
  /** fetch data from the table: "resource" using primary key columns */
  resource_by_pk: (args: {
    uri: String
  }) => resourcePromiseChain & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource | null
    ) => Promise<resource | null>
  }
}

export interface subscription_rootObservableChain {
  /** fetch data from the table: "blockchain_block" */
  blockchain_block: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_block_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_block_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_block_bool_exp | null
  }) => {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Observable<blockchain_block[]>
  }) & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block[]
    ) => Observable<blockchain_block[]>
  }
  /** fetch aggregated fields from the table: "blockchain_block" */
  blockchain_block_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_block_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_block_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_block_bool_exp | null
  }) => blockchain_block_aggregateObservableChain & {
    execute: (
      request: blockchain_block_aggregateRequest,
      defaultValue?: blockchain_block_aggregate
    ) => Observable<blockchain_block_aggregate>
  }) &
    (blockchain_block_aggregateObservableChain & {
      execute: (
        request: blockchain_block_aggregateRequest,
        defaultValue?: blockchain_block_aggregate
      ) => Observable<blockchain_block_aggregate>
    })
  /** fetch data from the table: "blockchain_block" using primary key columns */
  blockchain_block_by_pk: (args: {
    hash: String
  }) => blockchain_blockObservableChain & {
    execute: (
      request: blockchain_blockRequest,
      defaultValue?: blockchain_block | null
    ) => Observable<blockchain_block | null>
  }
  /** fetch data from the table: "blockchain_contract" */
  blockchain_contract: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_contract_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_contract_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_contract_bool_exp | null
  }) => {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Observable<blockchain_contract[]>
  }) & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract[]
    ) => Observable<blockchain_contract[]>
  }
  /** fetch aggregated fields from the table: "blockchain_contract" */
  blockchain_contract_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: blockchain_contract_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: blockchain_contract_order_by[] | null
    /** filter the rows returned */
    where?: blockchain_contract_bool_exp | null
  }) => blockchain_contract_aggregateObservableChain & {
    execute: (
      request: blockchain_contract_aggregateRequest,
      defaultValue?: blockchain_contract_aggregate
    ) => Observable<blockchain_contract_aggregate>
  }) &
    (blockchain_contract_aggregateObservableChain & {
      execute: (
        request: blockchain_contract_aggregateRequest,
        defaultValue?: blockchain_contract_aggregate
      ) => Observable<blockchain_contract_aggregate>
    })
  /** fetch data from the table: "blockchain_contract" using primary key columns */
  blockchain_contract_by_pk: (args: {
    id: String
  }) => blockchain_contractObservableChain & {
    execute: (
      request: blockchain_contractRequest,
      defaultValue?: blockchain_contract | null
    ) => Observable<blockchain_contract | null>
  }
  /** fetch data from the table: "content" */
  content: ((args?: {
    /** distinct select on columns */
    distinct_on?: content_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: content_order_by[] | null
    /** filter the rows returned */
    where?: content_bool_exp | null
  }) => {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Observable<content[]>
  }) & {
    execute: (
      request: contentRequest,
      defaultValue?: content[]
    ) => Observable<content[]>
  }
  /** fetch aggregated fields from the table: "content" */
  content_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: content_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: content_order_by[] | null
    /** filter the rows returned */
    where?: content_bool_exp | null
  }) => content_aggregateObservableChain & {
    execute: (
      request: content_aggregateRequest,
      defaultValue?: content_aggregate
    ) => Observable<content_aggregate>
  }) &
    (content_aggregateObservableChain & {
      execute: (
        request: content_aggregateRequest,
        defaultValue?: content_aggregate
      ) => Observable<content_aggregate>
    })
  /** fetch data from the table: "content" using primary key columns */
  content_by_pk: (args: {
    cid: String
  }) => contentObservableChain & {
    execute: (
      request: contentRequest,
      defaultValue?: content | null
    ) => Observable<content | null>
  }
  /** fetch data from the table: "erc721_import" */
  erc721_import: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_bool_exp | null
  }) => {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Observable<erc721_import[]>
  }) & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import[]
    ) => Observable<erc721_import[]>
  }
  /** fetch aggregated fields from the table: "erc721_import" */
  erc721_import_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_bool_exp | null
  }) => erc721_import_aggregateObservableChain & {
    execute: (
      request: erc721_import_aggregateRequest,
      defaultValue?: erc721_import_aggregate
    ) => Observable<erc721_import_aggregate>
  }) &
    (erc721_import_aggregateObservableChain & {
      execute: (
        request: erc721_import_aggregateRequest,
        defaultValue?: erc721_import_aggregate
      ) => Observable<erc721_import_aggregate>
    })
  /** fetch data from the table: "erc721_import_by_nft" */
  erc721_import_by_nft: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_by_nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_by_nft_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_by_nft_bool_exp | null
  }) => {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Observable<erc721_import_by_nft[]>
  }) & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft[]
    ) => Observable<erc721_import_by_nft[]>
  }
  /** fetch aggregated fields from the table: "erc721_import_by_nft" */
  erc721_import_by_nft_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: erc721_import_by_nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: erc721_import_by_nft_order_by[] | null
    /** filter the rows returned */
    where?: erc721_import_by_nft_bool_exp | null
  }) => erc721_import_by_nft_aggregateObservableChain & {
    execute: (
      request: erc721_import_by_nft_aggregateRequest,
      defaultValue?: erc721_import_by_nft_aggregate
    ) => Observable<erc721_import_by_nft_aggregate>
  }) &
    (erc721_import_by_nft_aggregateObservableChain & {
      execute: (
        request: erc721_import_by_nft_aggregateRequest,
        defaultValue?: erc721_import_by_nft_aggregate
      ) => Observable<erc721_import_by_nft_aggregate>
    })
  /** fetch data from the table: "erc721_import_by_nft" using primary key columns */
  erc721_import_by_nft_by_pk: (args: {
    erc721_import_id: String
    nft_id: String
  }) => erc721_import_by_nftObservableChain & {
    execute: (
      request: erc721_import_by_nftRequest,
      defaultValue?: erc721_import_by_nft | null
    ) => Observable<erc721_import_by_nft | null>
  }
  /** fetch data from the table: "erc721_import" using primary key columns */
  erc721_import_by_pk: (args: {
    id: String
  }) => erc721_importObservableChain & {
    execute: (
      request: erc721_importRequest,
      defaultValue?: erc721_import | null
    ) => Observable<erc721_import | null>
  }
  /** fetch data from the table: "nft" */
  nft: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_order_by[] | null
    /** filter the rows returned */
    where?: nft_bool_exp | null
  }) => {
    execute: (request: nftRequest, defaultValue?: nft[]) => Observable<nft[]>
  }) & {
    execute: (request: nftRequest, defaultValue?: nft[]) => Observable<nft[]>
  }
  /** fetch aggregated fields from the table: "nft" */
  nft_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_order_by[] | null
    /** filter the rows returned */
    where?: nft_bool_exp | null
  }) => nft_aggregateObservableChain & {
    execute: (
      request: nft_aggregateRequest,
      defaultValue?: nft_aggregate
    ) => Observable<nft_aggregate>
  }) &
    (nft_aggregateObservableChain & {
      execute: (
        request: nft_aggregateRequest,
        defaultValue?: nft_aggregate
      ) => Observable<nft_aggregate>
    })
  /** fetch data from the table: "nft_asset" */
  nft_asset: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_asset_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_asset_order_by[] | null
    /** filter the rows returned */
    where?: nft_asset_bool_exp | null
  }) => {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Observable<nft_asset[]>
  }) & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset[]
    ) => Observable<nft_asset[]>
  }
  /** fetch aggregated fields from the table: "nft_asset" */
  nft_asset_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_asset_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_asset_order_by[] | null
    /** filter the rows returned */
    where?: nft_asset_bool_exp | null
  }) => nft_asset_aggregateObservableChain & {
    execute: (
      request: nft_asset_aggregateRequest,
      defaultValue?: nft_asset_aggregate
    ) => Observable<nft_asset_aggregate>
  }) &
    (nft_asset_aggregateObservableChain & {
      execute: (
        request: nft_asset_aggregateRequest,
        defaultValue?: nft_asset_aggregate
      ) => Observable<nft_asset_aggregate>
    })
  /** fetch data from the table: "nft_asset" using primary key columns */
  nft_asset_by_pk: (args: {
    token_uri: String
  }) => nft_assetObservableChain & {
    execute: (
      request: nft_assetRequest,
      defaultValue?: nft_asset | null
    ) => Observable<nft_asset | null>
  }
  /** fetch data from the table: "nft" using primary key columns */
  nft_by_pk: (args: {
    id: String
  }) => nftObservableChain & {
    execute: (
      request: nftRequest,
      defaultValue?: nft | null
    ) => Observable<nft | null>
  }
  /** fetch data from the table: "nft_metadata" */
  nft_metadata: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_metadata_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_metadata_order_by[] | null
    /** filter the rows returned */
    where?: nft_metadata_bool_exp | null
  }) => {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Observable<nft_metadata[]>
  }) & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata[]
    ) => Observable<nft_metadata[]>
  }
  /** fetch aggregated fields from the table: "nft_metadata" */
  nft_metadata_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_metadata_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_metadata_order_by[] | null
    /** filter the rows returned */
    where?: nft_metadata_bool_exp | null
  }) => nft_metadata_aggregateObservableChain & {
    execute: (
      request: nft_metadata_aggregateRequest,
      defaultValue?: nft_metadata_aggregate
    ) => Observable<nft_metadata_aggregate>
  }) &
    (nft_metadata_aggregateObservableChain & {
      execute: (
        request: nft_metadata_aggregateRequest,
        defaultValue?: nft_metadata_aggregate
      ) => Observable<nft_metadata_aggregate>
    })
  /** fetch data from the table: "nft_metadata" using primary key columns */
  nft_metadata_by_pk: (args: {
    content_cid: String
  }) => nft_metadataObservableChain & {
    execute: (
      request: nft_metadataRequest,
      defaultValue?: nft_metadata | null
    ) => Observable<nft_metadata | null>
  }
  /** fetch data from the table: "nft_owner" */
  nft_owner: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_owner_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_owner_order_by[] | null
    /** filter the rows returned */
    where?: nft_owner_bool_exp | null
  }) => {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Observable<nft_owner[]>
  }) & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner[]
    ) => Observable<nft_owner[]>
  }
  /** fetch aggregated fields from the table: "nft_owner" */
  nft_owner_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nft_owner_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nft_owner_order_by[] | null
    /** filter the rows returned */
    where?: nft_owner_bool_exp | null
  }) => nft_owner_aggregateObservableChain & {
    execute: (
      request: nft_owner_aggregateRequest,
      defaultValue?: nft_owner_aggregate
    ) => Observable<nft_owner_aggregate>
  }) &
    (nft_owner_aggregateObservableChain & {
      execute: (
        request: nft_owner_aggregateRequest,
        defaultValue?: nft_owner_aggregate
      ) => Observable<nft_owner_aggregate>
    })
  /** fetch data from the table: "nft_owner" using primary key columns */
  nft_owner_by_pk: (args: {
    id: String
  }) => nft_ownerObservableChain & {
    execute: (
      request: nft_ownerRequest,
      defaultValue?: nft_owner | null
    ) => Observable<nft_owner | null>
  }
  /** fetch data from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks: ((args?: {
    /** distinct select on columns */
    distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nfts_by_blockchain_blocks_order_by[] | null
    /** filter the rows returned */
    where?: nfts_by_blockchain_blocks_bool_exp | null
  }) => {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Observable<nfts_by_blockchain_blocks[]>
  }) & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks[]
    ) => Observable<nfts_by_blockchain_blocks[]>
  }
  /** fetch aggregated fields from the table: "nfts_by_blockchain_blocks" */
  nfts_by_blockchain_blocks_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: nfts_by_blockchain_blocks_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: nfts_by_blockchain_blocks_order_by[] | null
    /** filter the rows returned */
    where?: nfts_by_blockchain_blocks_bool_exp | null
  }) => nfts_by_blockchain_blocks_aggregateObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocks_aggregateRequest,
      defaultValue?: nfts_by_blockchain_blocks_aggregate
    ) => Observable<nfts_by_blockchain_blocks_aggregate>
  }) &
    (nfts_by_blockchain_blocks_aggregateObservableChain & {
      execute: (
        request: nfts_by_blockchain_blocks_aggregateRequest,
        defaultValue?: nfts_by_blockchain_blocks_aggregate
      ) => Observable<nfts_by_blockchain_blocks_aggregate>
    })
  /** fetch data from the table: "nfts_by_blockchain_blocks" using primary key columns */
  nfts_by_blockchain_blocks_by_pk: (args: {
    blockchain_block_hash: String
    nft_id: String
  }) => nfts_by_blockchain_blocksObservableChain & {
    execute: (
      request: nfts_by_blockchain_blocksRequest,
      defaultValue?: nfts_by_blockchain_blocks | null
    ) => Observable<nfts_by_blockchain_blocks | null>
  }
  /** fetch data from the table: "niftysave_migration" */
  niftysave_migration: ((args?: {
    /** distinct select on columns */
    distinct_on?: niftysave_migration_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: niftysave_migration_order_by[] | null
    /** filter the rows returned */
    where?: niftysave_migration_bool_exp | null
  }) => {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Observable<niftysave_migration[]>
  }) & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration[]
    ) => Observable<niftysave_migration[]>
  }
  /** fetch aggregated fields from the table: "niftysave_migration" */
  niftysave_migration_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: niftysave_migration_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: niftysave_migration_order_by[] | null
    /** filter the rows returned */
    where?: niftysave_migration_bool_exp | null
  }) => niftysave_migration_aggregateObservableChain & {
    execute: (
      request: niftysave_migration_aggregateRequest,
      defaultValue?: niftysave_migration_aggregate
    ) => Observable<niftysave_migration_aggregate>
  }) &
    (niftysave_migration_aggregateObservableChain & {
      execute: (
        request: niftysave_migration_aggregateRequest,
        defaultValue?: niftysave_migration_aggregate
      ) => Observable<niftysave_migration_aggregate>
    })
  /** fetch data from the table: "niftysave_migration" using primary key columns */
  niftysave_migration_by_pk: (args: {
    id: String
  }) => niftysave_migrationObservableChain & {
    execute: (
      request: niftysave_migrationRequest,
      defaultValue?: niftysave_migration | null
    ) => Observable<niftysave_migration | null>
  }
  /** fetch data from the table: "other_nft_resources" */
  other_nft_resources: ((args?: {
    /** distinct select on columns */
    distinct_on?: other_nft_resources_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: other_nft_resources_order_by[] | null
    /** filter the rows returned */
    where?: other_nft_resources_bool_exp | null
  }) => {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Observable<other_nft_resources[]>
  }) & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources[]
    ) => Observable<other_nft_resources[]>
  }
  /** fetch aggregated fields from the table: "other_nft_resources" */
  other_nft_resources_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: other_nft_resources_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: other_nft_resources_order_by[] | null
    /** filter the rows returned */
    where?: other_nft_resources_bool_exp | null
  }) => other_nft_resources_aggregateObservableChain & {
    execute: (
      request: other_nft_resources_aggregateRequest,
      defaultValue?: other_nft_resources_aggregate
    ) => Observable<other_nft_resources_aggregate>
  }) &
    (other_nft_resources_aggregateObservableChain & {
      execute: (
        request: other_nft_resources_aggregateRequest,
        defaultValue?: other_nft_resources_aggregate
      ) => Observable<other_nft_resources_aggregate>
    })
  /** fetch data from the table: "other_nft_resources" using primary key columns */
  other_nft_resources_by_pk: (args: {
    content_cid: String
    resource_uri: String
  }) => other_nft_resourcesObservableChain & {
    execute: (
      request: other_nft_resourcesRequest,
      defaultValue?: other_nft_resources | null
    ) => Observable<other_nft_resources | null>
  }
  /** fetch data from the table: "pin" */
  pin: ((args?: {
    /** distinct select on columns */
    distinct_on?: pin_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: pin_order_by[] | null
    /** filter the rows returned */
    where?: pin_bool_exp | null
  }) => {
    execute: (request: pinRequest, defaultValue?: pin[]) => Observable<pin[]>
  }) & {
    execute: (request: pinRequest, defaultValue?: pin[]) => Observable<pin[]>
  }
  /** fetch aggregated fields from the table: "pin" */
  pin_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: pin_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: pin_order_by[] | null
    /** filter the rows returned */
    where?: pin_bool_exp | null
  }) => pin_aggregateObservableChain & {
    execute: (
      request: pin_aggregateRequest,
      defaultValue?: pin_aggregate
    ) => Observable<pin_aggregate>
  }) &
    (pin_aggregateObservableChain & {
      execute: (
        request: pin_aggregateRequest,
        defaultValue?: pin_aggregate
      ) => Observable<pin_aggregate>
    })
  /** fetch data from the table: "pin" using primary key columns */
  pin_by_pk: (args: {
    id: bigint
  }) => pinObservableChain & {
    execute: (
      request: pinRequest,
      defaultValue?: pin | null
    ) => Observable<pin | null>
  }
  /** fetch data from the table: "resource" */
  resource: ((args?: {
    /** distinct select on columns */
    distinct_on?: resource_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: resource_order_by[] | null
    /** filter the rows returned */
    where?: resource_bool_exp | null
  }) => {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Observable<resource[]>
  }) & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource[]
    ) => Observable<resource[]>
  }
  /** fetch aggregated fields from the table: "resource" */
  resource_aggregate: ((args?: {
    /** distinct select on columns */
    distinct_on?: resource_select_column[] | null
    /** limit the number of rows returned */
    limit?: Int | null
    /** skip the first n rows. Use only with order_by */
    offset?: Int | null
    /** sort the rows by one or more columns */
    order_by?: resource_order_by[] | null
    /** filter the rows returned */
    where?: resource_bool_exp | null
  }) => resource_aggregateObservableChain & {
    execute: (
      request: resource_aggregateRequest,
      defaultValue?: resource_aggregate
    ) => Observable<resource_aggregate>
  }) &
    (resource_aggregateObservableChain & {
      execute: (
        request: resource_aggregateRequest,
        defaultValue?: resource_aggregate
      ) => Observable<resource_aggregate>
    })
  /** fetch data from the table: "resource" using primary key columns */
  resource_by_pk: (args: {
    uri: String
  }) => resourceObservableChain & {
    execute: (
      request: resourceRequest,
      defaultValue?: resource | null
    ) => Observable<resource | null>
  }
}
