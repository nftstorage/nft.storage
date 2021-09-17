/** select columns of table "blockchain_block" */
export var blockchain_block_select_column
;(function(blockchain_block_select_column) {
  /** column name */
  blockchain_block_select_column['hash'] = 'hash'
  /** column name */
  blockchain_block_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  blockchain_block_select_column['number'] = 'number'
  /** column name */
  blockchain_block_select_column['updated_at'] = 'updated_at'
})(blockchain_block_select_column || (blockchain_block_select_column = {}))
/** column ordering options */
export var order_by
;(function(order_by) {
  /** in ascending order, nulls last */
  order_by['asc'] = 'asc'
  /** in ascending order, nulls first */
  order_by['asc_nulls_first'] = 'asc_nulls_first'
  /** in ascending order, nulls last */
  order_by['asc_nulls_last'] = 'asc_nulls_last'
  /** in descending order, nulls first */
  order_by['desc'] = 'desc'
  /** in descending order, nulls first */
  order_by['desc_nulls_first'] = 'desc_nulls_first'
  /** in descending order, nulls last */
  order_by['desc_nulls_last'] = 'desc_nulls_last'
})(order_by || (order_by = {}))
/** select columns of table "blockchain_contract" */
export var blockchain_contract_select_column
;(function(blockchain_contract_select_column) {
  /** column name */
  blockchain_contract_select_column['id'] = 'id'
  /** column name */
  blockchain_contract_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  blockchain_contract_select_column['name'] = 'name'
  /** column name */
  blockchain_contract_select_column['supports_eip721_metadata'] =
    'supports_eip721_metadata'
  /** column name */
  blockchain_contract_select_column['symbol'] = 'symbol'
  /** column name */
  blockchain_contract_select_column['updated_at'] = 'updated_at'
})(
  blockchain_contract_select_column || (blockchain_contract_select_column = {})
)
/** select columns of table "content" */
export var content_select_column
;(function(content_select_column) {
  /** column name */
  content_select_column['cid'] = 'cid'
  /** column name */
  content_select_column['dag_size'] = 'dag_size'
  /** column name */
  content_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  content_select_column['updated_at'] = 'updated_at'
})(content_select_column || (content_select_column = {}))
/** select columns of table "erc721_import" */
export var erc721_import_select_column
;(function(erc721_import_select_column) {
  /** column name */
  erc721_import_select_column['id'] = 'id'
  /** column name */
  erc721_import_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  erc721_import_select_column['next_id'] = 'next_id'
  /** column name */
  erc721_import_select_column['updated_at'] = 'updated_at'
})(erc721_import_select_column || (erc721_import_select_column = {}))
/** select columns of table "erc721_import_by_nft" */
export var erc721_import_by_nft_select_column
;(function(erc721_import_by_nft_select_column) {
  /** column name */
  erc721_import_by_nft_select_column['erc721_import_id'] = 'erc721_import_id'
  /** column name */
  erc721_import_by_nft_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  erc721_import_by_nft_select_column['nft_id'] = 'nft_id'
  /** column name */
  erc721_import_by_nft_select_column['updated_at'] = 'updated_at'
})(
  erc721_import_by_nft_select_column ||
    (erc721_import_by_nft_select_column = {})
)
/** select columns of table "nft" */
export var nft_select_column
;(function(nft_select_column) {
  /** column name */
  nft_select_column['contract_id'] = 'contract_id'
  /** column name */
  nft_select_column['id'] = 'id'
  /** column name */
  nft_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  nft_select_column['mint_time'] = 'mint_time'
  /** column name */
  nft_select_column['nft_owner_id'] = 'nft_owner_id'
  /** column name */
  nft_select_column['token_id'] = 'token_id'
  /** column name */
  nft_select_column['token_uri'] = 'token_uri'
  /** column name */
  nft_select_column['updated_at'] = 'updated_at'
})(nft_select_column || (nft_select_column = {}))
/** select columns of table "nft_asset" */
export var nft_asset_select_column
;(function(nft_asset_select_column) {
  /** column name */
  nft_asset_select_column['content_cid'] = 'content_cid'
  /** column name */
  nft_asset_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  nft_asset_select_column['ipfs_url'] = 'ipfs_url'
  /** column name */
  nft_asset_select_column['status'] = 'status'
  /** column name */
  nft_asset_select_column['status_text'] = 'status_text'
  /** column name */
  nft_asset_select_column['token_uri'] = 'token_uri'
  /** column name */
  nft_asset_select_column['updated_at'] = 'updated_at'
})(nft_asset_select_column || (nft_asset_select_column = {}))
/** select columns of table "nft_metadata" */
export var nft_metadata_select_column
;(function(nft_metadata_select_column) {
  /** column name */
  nft_metadata_select_column['content_cid'] = 'content_cid'
  /** column name */
  nft_metadata_select_column['description'] = 'description'
  /** column name */
  nft_metadata_select_column['image_uri'] = 'image_uri'
  /** column name */
  nft_metadata_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  nft_metadata_select_column['name'] = 'name'
  /** column name */
  nft_metadata_select_column['updated_at'] = 'updated_at'
})(nft_metadata_select_column || (nft_metadata_select_column = {}))
/** select columns of table "nft_owner" */
export var nft_owner_select_column
;(function(nft_owner_select_column) {
  /** column name */
  nft_owner_select_column['id'] = 'id'
  /** column name */
  nft_owner_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  nft_owner_select_column['updated_at'] = 'updated_at'
})(nft_owner_select_column || (nft_owner_select_column = {}))
/** select columns of table "nfts_by_blockchain_blocks" */
export var nfts_by_blockchain_blocks_select_column
;(function(nfts_by_blockchain_blocks_select_column) {
  /** column name */
  nfts_by_blockchain_blocks_select_column['blockchain_block_hash'] =
    'blockchain_block_hash'
  /** column name */
  nfts_by_blockchain_blocks_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  nfts_by_blockchain_blocks_select_column['nft_id'] = 'nft_id'
  /** column name */
  nfts_by_blockchain_blocks_select_column['updated_at'] = 'updated_at'
})(
  nfts_by_blockchain_blocks_select_column ||
    (nfts_by_blockchain_blocks_select_column = {})
)
/** select columns of table "niftysave_migration" */
export var niftysave_migration_select_column
;(function(niftysave_migration_select_column) {
  /** column name */
  niftysave_migration_select_column['collection'] = 'collection'
  /** column name */
  niftysave_migration_select_column['cursor'] = 'cursor'
  /** column name */
  niftysave_migration_select_column['id'] = 'id'
  /** column name */
  niftysave_migration_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  niftysave_migration_select_column['metadata'] = 'metadata'
  /** column name */
  niftysave_migration_select_column['updated_at'] = 'updated_at'
})(
  niftysave_migration_select_column || (niftysave_migration_select_column = {})
)
/** select columns of table "other_nft_resources" */
export var other_nft_resources_select_column
;(function(other_nft_resources_select_column) {
  /** column name */
  other_nft_resources_select_column['content_cid'] = 'content_cid'
  /** column name */
  other_nft_resources_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  other_nft_resources_select_column['resource_uri'] = 'resource_uri'
  /** column name */
  other_nft_resources_select_column['updated_at'] = 'updated_at'
})(
  other_nft_resources_select_column || (other_nft_resources_select_column = {})
)
/** select columns of table "pin" */
export var pin_select_column
;(function(pin_select_column) {
  /** column name */
  pin_select_column['content_cid'] = 'content_cid'
  /** column name */
  pin_select_column['id'] = 'id'
  /** column name */
  pin_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  pin_select_column['service'] = 'service'
  /** column name */
  pin_select_column['status'] = 'status'
  /** column name */
  pin_select_column['status_text'] = 'status_text'
  /** column name */
  pin_select_column['updated_at'] = 'updated_at'
})(pin_select_column || (pin_select_column = {}))
/** select columns of table "resource" */
export var resource_select_column
;(function(resource_select_column) {
  /** column name */
  resource_select_column['content_cid'] = 'content_cid'
  /** column name */
  resource_select_column['inserted_at'] = 'inserted_at'
  /** column name */
  resource_select_column['ipfs_url'] = 'ipfs_url'
  /** column name */
  resource_select_column['status'] = 'status'
  /** column name */
  resource_select_column['status_text'] = 'status_text'
  /** column name */
  resource_select_column['updated_at'] = 'updated_at'
  /** column name */
  resource_select_column['uri'] = 'uri'
})(resource_select_column || (resource_select_column = {}))
/** unique or primary key constraints on table "blockchain_block" */
export var blockchain_block_constraint
;(function(blockchain_block_constraint) {
  /** unique or primary key constraint */
  blockchain_block_constraint['blockchain_block_pkey'] = 'blockchain_block_pkey'
  /** unique or primary key constraint */
  blockchain_block_constraint['unique_blockchain_block_hash'] =
    'unique_blockchain_block_hash'
})(blockchain_block_constraint || (blockchain_block_constraint = {}))
/** update columns of table "blockchain_block" */
export var blockchain_block_update_column
;(function(blockchain_block_update_column) {
  /** column name */
  blockchain_block_update_column['hash'] = 'hash'
  /** column name */
  blockchain_block_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  blockchain_block_update_column['number'] = 'number'
  /** column name */
  blockchain_block_update_column['updated_at'] = 'updated_at'
})(blockchain_block_update_column || (blockchain_block_update_column = {}))
/** unique or primary key constraints on table "blockchain_contract" */
export var blockchain_contract_constraint
;(function(blockchain_contract_constraint) {
  /** unique or primary key constraint */
  blockchain_contract_constraint['blockchain_contract_pkey'] =
    'blockchain_contract_pkey'
})(blockchain_contract_constraint || (blockchain_contract_constraint = {}))
/** update columns of table "blockchain_contract" */
export var blockchain_contract_update_column
;(function(blockchain_contract_update_column) {
  /** column name */
  blockchain_contract_update_column['id'] = 'id'
  /** column name */
  blockchain_contract_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  blockchain_contract_update_column['name'] = 'name'
  /** column name */
  blockchain_contract_update_column['supports_eip721_metadata'] =
    'supports_eip721_metadata'
  /** column name */
  blockchain_contract_update_column['symbol'] = 'symbol'
  /** column name */
  blockchain_contract_update_column['updated_at'] = 'updated_at'
})(
  blockchain_contract_update_column || (blockchain_contract_update_column = {})
)
/** unique or primary key constraints on table "content" */
export var content_constraint
;(function(content_constraint) {
  /** unique or primary key constraint */
  content_constraint['content_pkey'] = 'content_pkey'
})(content_constraint || (content_constraint = {}))
/** update columns of table "content" */
export var content_update_column
;(function(content_update_column) {
  /** column name */
  content_update_column['cid'] = 'cid'
  /** column name */
  content_update_column['dag_size'] = 'dag_size'
  /** column name */
  content_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  content_update_column['updated_at'] = 'updated_at'
})(content_update_column || (content_update_column = {}))
/** unique or primary key constraints on table "erc721_import" */
export var erc721_import_constraint
;(function(erc721_import_constraint) {
  /** unique or primary key constraint */
  erc721_import_constraint['erc721_import_pkey'] = 'erc721_import_pkey'
})(erc721_import_constraint || (erc721_import_constraint = {}))
/** update columns of table "erc721_import" */
export var erc721_import_update_column
;(function(erc721_import_update_column) {
  /** column name */
  erc721_import_update_column['id'] = 'id'
  /** column name */
  erc721_import_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  erc721_import_update_column['next_id'] = 'next_id'
  /** column name */
  erc721_import_update_column['updated_at'] = 'updated_at'
})(erc721_import_update_column || (erc721_import_update_column = {}))
/** unique or primary key constraints on table "erc721_import_by_nft" */
export var erc721_import_by_nft_constraint
;(function(erc721_import_by_nft_constraint) {
  /** unique or primary key constraint */
  erc721_import_by_nft_constraint['erc721_import_by_nft_pkey'] =
    'erc721_import_by_nft_pkey'
})(erc721_import_by_nft_constraint || (erc721_import_by_nft_constraint = {}))
/** update columns of table "erc721_import_by_nft" */
export var erc721_import_by_nft_update_column
;(function(erc721_import_by_nft_update_column) {
  /** column name */
  erc721_import_by_nft_update_column['erc721_import_id'] = 'erc721_import_id'
  /** column name */
  erc721_import_by_nft_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  erc721_import_by_nft_update_column['nft_id'] = 'nft_id'
  /** column name */
  erc721_import_by_nft_update_column['updated_at'] = 'updated_at'
})(
  erc721_import_by_nft_update_column ||
    (erc721_import_by_nft_update_column = {})
)
/** unique or primary key constraints on table "nft" */
export var nft_constraint
;(function(nft_constraint) {
  /** unique or primary key constraint */
  nft_constraint['nft_pkey'] = 'nft_pkey'
})(nft_constraint || (nft_constraint = {}))
/** update columns of table "nft" */
export var nft_update_column
;(function(nft_update_column) {
  /** column name */
  nft_update_column['contract_id'] = 'contract_id'
  /** column name */
  nft_update_column['id'] = 'id'
  /** column name */
  nft_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  nft_update_column['mint_time'] = 'mint_time'
  /** column name */
  nft_update_column['nft_owner_id'] = 'nft_owner_id'
  /** column name */
  nft_update_column['token_id'] = 'token_id'
  /** column name */
  nft_update_column['token_uri'] = 'token_uri'
  /** column name */
  nft_update_column['updated_at'] = 'updated_at'
})(nft_update_column || (nft_update_column = {}))
/** unique or primary key constraints on table "nft_asset" */
export var nft_asset_constraint
;(function(nft_asset_constraint) {
  /** unique or primary key constraint */
  nft_asset_constraint['nft_asset_pkey'] = 'nft_asset_pkey'
})(nft_asset_constraint || (nft_asset_constraint = {}))
/** update columns of table "nft_asset" */
export var nft_asset_update_column
;(function(nft_asset_update_column) {
  /** column name */
  nft_asset_update_column['content_cid'] = 'content_cid'
  /** column name */
  nft_asset_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  nft_asset_update_column['ipfs_url'] = 'ipfs_url'
  /** column name */
  nft_asset_update_column['status'] = 'status'
  /** column name */
  nft_asset_update_column['status_text'] = 'status_text'
  /** column name */
  nft_asset_update_column['token_uri'] = 'token_uri'
  /** column name */
  nft_asset_update_column['updated_at'] = 'updated_at'
})(nft_asset_update_column || (nft_asset_update_column = {}))
/** unique or primary key constraints on table "nft_metadata" */
export var nft_metadata_constraint
;(function(nft_metadata_constraint) {
  /** unique or primary key constraint */
  nft_metadata_constraint['nft_metadata_pkey'] = 'nft_metadata_pkey'
})(nft_metadata_constraint || (nft_metadata_constraint = {}))
/** update columns of table "nft_metadata" */
export var nft_metadata_update_column
;(function(nft_metadata_update_column) {
  /** column name */
  nft_metadata_update_column['content_cid'] = 'content_cid'
  /** column name */
  nft_metadata_update_column['description'] = 'description'
  /** column name */
  nft_metadata_update_column['image_uri'] = 'image_uri'
  /** column name */
  nft_metadata_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  nft_metadata_update_column['name'] = 'name'
  /** column name */
  nft_metadata_update_column['updated_at'] = 'updated_at'
})(nft_metadata_update_column || (nft_metadata_update_column = {}))
/** unique or primary key constraints on table "nft_owner" */
export var nft_owner_constraint
;(function(nft_owner_constraint) {
  /** unique or primary key constraint */
  nft_owner_constraint['nft_owner_pkey'] = 'nft_owner_pkey'
})(nft_owner_constraint || (nft_owner_constraint = {}))
/** update columns of table "nft_owner" */
export var nft_owner_update_column
;(function(nft_owner_update_column) {
  /** column name */
  nft_owner_update_column['id'] = 'id'
  /** column name */
  nft_owner_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  nft_owner_update_column['updated_at'] = 'updated_at'
})(nft_owner_update_column || (nft_owner_update_column = {}))
/** unique or primary key constraints on table "nfts_by_blockchain_blocks" */
export var nfts_by_blockchain_blocks_constraint
;(function(nfts_by_blockchain_blocks_constraint) {
  /** unique or primary key constraint */
  nfts_by_blockchain_blocks_constraint['nfts_by_blockchain_blocks_pkey'] =
    'nfts_by_blockchain_blocks_pkey'
})(
  nfts_by_blockchain_blocks_constraint ||
    (nfts_by_blockchain_blocks_constraint = {})
)
/** update columns of table "nfts_by_blockchain_blocks" */
export var nfts_by_blockchain_blocks_update_column
;(function(nfts_by_blockchain_blocks_update_column) {
  /** column name */
  nfts_by_blockchain_blocks_update_column['blockchain_block_hash'] =
    'blockchain_block_hash'
  /** column name */
  nfts_by_blockchain_blocks_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  nfts_by_blockchain_blocks_update_column['nft_id'] = 'nft_id'
  /** column name */
  nfts_by_blockchain_blocks_update_column['updated_at'] = 'updated_at'
})(
  nfts_by_blockchain_blocks_update_column ||
    (nfts_by_blockchain_blocks_update_column = {})
)
/** unique or primary key constraints on table "niftysave_migration" */
export var niftysave_migration_constraint
;(function(niftysave_migration_constraint) {
  /** unique or primary key constraint */
  niftysave_migration_constraint['niftysave_migration_pkey'] =
    'niftysave_migration_pkey'
})(niftysave_migration_constraint || (niftysave_migration_constraint = {}))
/** update columns of table "niftysave_migration" */
export var niftysave_migration_update_column
;(function(niftysave_migration_update_column) {
  /** column name */
  niftysave_migration_update_column['collection'] = 'collection'
  /** column name */
  niftysave_migration_update_column['cursor'] = 'cursor'
  /** column name */
  niftysave_migration_update_column['id'] = 'id'
  /** column name */
  niftysave_migration_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  niftysave_migration_update_column['metadata'] = 'metadata'
  /** column name */
  niftysave_migration_update_column['updated_at'] = 'updated_at'
})(
  niftysave_migration_update_column || (niftysave_migration_update_column = {})
)
/** unique or primary key constraints on table "other_nft_resources" */
export var other_nft_resources_constraint
;(function(other_nft_resources_constraint) {
  /** unique or primary key constraint */
  other_nft_resources_constraint['other_nft_resources_pkey'] =
    'other_nft_resources_pkey'
})(other_nft_resources_constraint || (other_nft_resources_constraint = {}))
/** update columns of table "other_nft_resources" */
export var other_nft_resources_update_column
;(function(other_nft_resources_update_column) {
  /** column name */
  other_nft_resources_update_column['content_cid'] = 'content_cid'
  /** column name */
  other_nft_resources_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  other_nft_resources_update_column['resource_uri'] = 'resource_uri'
  /** column name */
  other_nft_resources_update_column['updated_at'] = 'updated_at'
})(
  other_nft_resources_update_column || (other_nft_resources_update_column = {})
)
/** unique or primary key constraints on table "pin" */
export var pin_constraint
;(function(pin_constraint) {
  /** unique or primary key constraint */
  pin_constraint['pin_pkey'] = 'pin_pkey'
})(pin_constraint || (pin_constraint = {}))
/** update columns of table "pin" */
export var pin_update_column
;(function(pin_update_column) {
  /** column name */
  pin_update_column['content_cid'] = 'content_cid'
  /** column name */
  pin_update_column['id'] = 'id'
  /** column name */
  pin_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  pin_update_column['service'] = 'service'
  /** column name */
  pin_update_column['status'] = 'status'
  /** column name */
  pin_update_column['status_text'] = 'status_text'
  /** column name */
  pin_update_column['updated_at'] = 'updated_at'
})(pin_update_column || (pin_update_column = {}))
/** unique or primary key constraints on table "resource" */
export var resource_constraint
;(function(resource_constraint) {
  /** unique or primary key constraint */
  resource_constraint['resource_pkey'] = 'resource_pkey'
})(resource_constraint || (resource_constraint = {}))
/** update columns of table "resource" */
export var resource_update_column
;(function(resource_update_column) {
  /** column name */
  resource_update_column['content_cid'] = 'content_cid'
  /** column name */
  resource_update_column['inserted_at'] = 'inserted_at'
  /** column name */
  resource_update_column['ipfs_url'] = 'ipfs_url'
  /** column name */
  resource_update_column['status'] = 'status'
  /** column name */
  resource_update_column['status_text'] = 'status_text'
  /** column name */
  resource_update_column['updated_at'] = 'updated_at'
  /** column name */
  resource_update_column['uri'] = 'uri'
})(resource_update_column || (resource_update_column = {}))
const query_root_possibleTypes = ['query_root']
export const isquery_root = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return query_root_possibleTypes.includes(obj.__typename)
}
const blockchain_block_possibleTypes = ['blockchain_block']
export const isblockchain_block = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_possibleTypes.includes(obj.__typename)
}
const blockchain_block_aggregate_possibleTypes = ['blockchain_block_aggregate']
export const isblockchain_block_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_aggregate_possibleTypes.includes(obj.__typename)
}
const blockchain_block_aggregate_fields_possibleTypes = [
  'blockchain_block_aggregate_fields',
]
export const isblockchain_block_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}
const blockchain_block_avg_fields_possibleTypes = [
  'blockchain_block_avg_fields',
]
export const isblockchain_block_avg_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_avg_fields_possibleTypes.includes(obj.__typename)
}
const blockchain_block_max_fields_possibleTypes = [
  'blockchain_block_max_fields',
]
export const isblockchain_block_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_max_fields_possibleTypes.includes(obj.__typename)
}
const blockchain_block_min_fields_possibleTypes = [
  'blockchain_block_min_fields',
]
export const isblockchain_block_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_min_fields_possibleTypes.includes(obj.__typename)
}
const blockchain_block_stddev_fields_possibleTypes = [
  'blockchain_block_stddev_fields',
]
export const isblockchain_block_stddev_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_stddev_fields_possibleTypes.includes(obj.__typename)
}
const blockchain_block_stddev_pop_fields_possibleTypes = [
  'blockchain_block_stddev_pop_fields',
]
export const isblockchain_block_stddev_pop_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_stddev_pop_fields_possibleTypes.includes(
    obj.__typename
  )
}
const blockchain_block_stddev_samp_fields_possibleTypes = [
  'blockchain_block_stddev_samp_fields',
]
export const isblockchain_block_stddev_samp_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_stddev_samp_fields_possibleTypes.includes(
    obj.__typename
  )
}
const blockchain_block_sum_fields_possibleTypes = [
  'blockchain_block_sum_fields',
]
export const isblockchain_block_sum_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_sum_fields_possibleTypes.includes(obj.__typename)
}
const blockchain_block_var_pop_fields_possibleTypes = [
  'blockchain_block_var_pop_fields',
]
export const isblockchain_block_var_pop_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_var_pop_fields_possibleTypes.includes(obj.__typename)
}
const blockchain_block_var_samp_fields_possibleTypes = [
  'blockchain_block_var_samp_fields',
]
export const isblockchain_block_var_samp_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_var_samp_fields_possibleTypes.includes(obj.__typename)
}
const blockchain_block_variance_fields_possibleTypes = [
  'blockchain_block_variance_fields',
]
export const isblockchain_block_variance_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_variance_fields_possibleTypes.includes(obj.__typename)
}
const blockchain_contract_possibleTypes = ['blockchain_contract']
export const isblockchain_contract = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_possibleTypes.includes(obj.__typename)
}
const blockchain_contract_aggregate_possibleTypes = [
  'blockchain_contract_aggregate',
]
export const isblockchain_contract_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_aggregate_possibleTypes.includes(obj.__typename)
}
const blockchain_contract_aggregate_fields_possibleTypes = [
  'blockchain_contract_aggregate_fields',
]
export const isblockchain_contract_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}
const blockchain_contract_max_fields_possibleTypes = [
  'blockchain_contract_max_fields',
]
export const isblockchain_contract_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_max_fields_possibleTypes.includes(obj.__typename)
}
const blockchain_contract_min_fields_possibleTypes = [
  'blockchain_contract_min_fields',
]
export const isblockchain_contract_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_min_fields_possibleTypes.includes(obj.__typename)
}
const content_possibleTypes = ['content']
export const iscontent = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_possibleTypes.includes(obj.__typename)
}
const content_aggregate_possibleTypes = ['content_aggregate']
export const iscontent_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_aggregate_possibleTypes.includes(obj.__typename)
}
const content_aggregate_fields_possibleTypes = ['content_aggregate_fields']
export const iscontent_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_aggregate_fields_possibleTypes.includes(obj.__typename)
}
const content_avg_fields_possibleTypes = ['content_avg_fields']
export const iscontent_avg_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_avg_fields_possibleTypes.includes(obj.__typename)
}
const content_max_fields_possibleTypes = ['content_max_fields']
export const iscontent_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_max_fields_possibleTypes.includes(obj.__typename)
}
const content_min_fields_possibleTypes = ['content_min_fields']
export const iscontent_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_min_fields_possibleTypes.includes(obj.__typename)
}
const content_stddev_fields_possibleTypes = ['content_stddev_fields']
export const iscontent_stddev_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_stddev_fields_possibleTypes.includes(obj.__typename)
}
const content_stddev_pop_fields_possibleTypes = ['content_stddev_pop_fields']
export const iscontent_stddev_pop_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_stddev_pop_fields_possibleTypes.includes(obj.__typename)
}
const content_stddev_samp_fields_possibleTypes = ['content_stddev_samp_fields']
export const iscontent_stddev_samp_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_stddev_samp_fields_possibleTypes.includes(obj.__typename)
}
const content_sum_fields_possibleTypes = ['content_sum_fields']
export const iscontent_sum_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_sum_fields_possibleTypes.includes(obj.__typename)
}
const content_var_pop_fields_possibleTypes = ['content_var_pop_fields']
export const iscontent_var_pop_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_var_pop_fields_possibleTypes.includes(obj.__typename)
}
const content_var_samp_fields_possibleTypes = ['content_var_samp_fields']
export const iscontent_var_samp_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_var_samp_fields_possibleTypes.includes(obj.__typename)
}
const content_variance_fields_possibleTypes = ['content_variance_fields']
export const iscontent_variance_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_variance_fields_possibleTypes.includes(obj.__typename)
}
const erc721_import_possibleTypes = ['erc721_import']
export const iserc721_import = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_possibleTypes.includes(obj.__typename)
}
const erc721_import_aggregate_possibleTypes = ['erc721_import_aggregate']
export const iserc721_import_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_aggregate_possibleTypes.includes(obj.__typename)
}
const erc721_import_aggregate_fields_possibleTypes = [
  'erc721_import_aggregate_fields',
]
export const iserc721_import_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_aggregate_fields_possibleTypes.includes(obj.__typename)
}
const erc721_import_max_fields_possibleTypes = ['erc721_import_max_fields']
export const iserc721_import_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_max_fields_possibleTypes.includes(obj.__typename)
}
const erc721_import_min_fields_possibleTypes = ['erc721_import_min_fields']
export const iserc721_import_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_min_fields_possibleTypes.includes(obj.__typename)
}
const erc721_import_by_nft_possibleTypes = ['erc721_import_by_nft']
export const iserc721_import_by_nft = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_possibleTypes.includes(obj.__typename)
}
const erc721_import_by_nft_aggregate_possibleTypes = [
  'erc721_import_by_nft_aggregate',
]
export const iserc721_import_by_nft_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_aggregate_possibleTypes.includes(obj.__typename)
}
const erc721_import_by_nft_aggregate_fields_possibleTypes = [
  'erc721_import_by_nft_aggregate_fields',
]
export const iserc721_import_by_nft_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}
const erc721_import_by_nft_max_fields_possibleTypes = [
  'erc721_import_by_nft_max_fields',
]
export const iserc721_import_by_nft_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_max_fields_possibleTypes.includes(obj.__typename)
}
const erc721_import_by_nft_min_fields_possibleTypes = [
  'erc721_import_by_nft_min_fields',
]
export const iserc721_import_by_nft_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_min_fields_possibleTypes.includes(obj.__typename)
}
const nft_possibleTypes = ['nft']
export const isnft = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_possibleTypes.includes(obj.__typename)
}
const nft_aggregate_possibleTypes = ['nft_aggregate']
export const isnft_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_aggregate_possibleTypes.includes(obj.__typename)
}
const nft_aggregate_fields_possibleTypes = ['nft_aggregate_fields']
export const isnft_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_aggregate_fields_possibleTypes.includes(obj.__typename)
}
const nft_max_fields_possibleTypes = ['nft_max_fields']
export const isnft_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_max_fields_possibleTypes.includes(obj.__typename)
}
const nft_min_fields_possibleTypes = ['nft_min_fields']
export const isnft_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_min_fields_possibleTypes.includes(obj.__typename)
}
const nft_asset_possibleTypes = ['nft_asset']
export const isnft_asset = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_possibleTypes.includes(obj.__typename)
}
const nft_asset_aggregate_possibleTypes = ['nft_asset_aggregate']
export const isnft_asset_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_aggregate_possibleTypes.includes(obj.__typename)
}
const nft_asset_aggregate_fields_possibleTypes = ['nft_asset_aggregate_fields']
export const isnft_asset_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_aggregate_fields_possibleTypes.includes(obj.__typename)
}
const nft_asset_max_fields_possibleTypes = ['nft_asset_max_fields']
export const isnft_asset_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_max_fields_possibleTypes.includes(obj.__typename)
}
const nft_asset_min_fields_possibleTypes = ['nft_asset_min_fields']
export const isnft_asset_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_min_fields_possibleTypes.includes(obj.__typename)
}
const nft_metadata_possibleTypes = ['nft_metadata']
export const isnft_metadata = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_possibleTypes.includes(obj.__typename)
}
const nft_metadata_aggregate_possibleTypes = ['nft_metadata_aggregate']
export const isnft_metadata_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_aggregate_possibleTypes.includes(obj.__typename)
}
const nft_metadata_aggregate_fields_possibleTypes = [
  'nft_metadata_aggregate_fields',
]
export const isnft_metadata_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_aggregate_fields_possibleTypes.includes(obj.__typename)
}
const nft_metadata_max_fields_possibleTypes = ['nft_metadata_max_fields']
export const isnft_metadata_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_max_fields_possibleTypes.includes(obj.__typename)
}
const nft_metadata_min_fields_possibleTypes = ['nft_metadata_min_fields']
export const isnft_metadata_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_min_fields_possibleTypes.includes(obj.__typename)
}
const nft_owner_possibleTypes = ['nft_owner']
export const isnft_owner = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_possibleTypes.includes(obj.__typename)
}
const nft_owner_aggregate_possibleTypes = ['nft_owner_aggregate']
export const isnft_owner_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_aggregate_possibleTypes.includes(obj.__typename)
}
const nft_owner_aggregate_fields_possibleTypes = ['nft_owner_aggregate_fields']
export const isnft_owner_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_aggregate_fields_possibleTypes.includes(obj.__typename)
}
const nft_owner_max_fields_possibleTypes = ['nft_owner_max_fields']
export const isnft_owner_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_max_fields_possibleTypes.includes(obj.__typename)
}
const nft_owner_min_fields_possibleTypes = ['nft_owner_min_fields']
export const isnft_owner_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_min_fields_possibleTypes.includes(obj.__typename)
}
const nfts_by_blockchain_blocks_possibleTypes = ['nfts_by_blockchain_blocks']
export const isnfts_by_blockchain_blocks = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_possibleTypes.includes(obj.__typename)
}
const nfts_by_blockchain_blocks_aggregate_possibleTypes = [
  'nfts_by_blockchain_blocks_aggregate',
]
export const isnfts_by_blockchain_blocks_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_aggregate_possibleTypes.includes(
    obj.__typename
  )
}
const nfts_by_blockchain_blocks_aggregate_fields_possibleTypes = [
  'nfts_by_blockchain_blocks_aggregate_fields',
]
export const isnfts_by_blockchain_blocks_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}
const nfts_by_blockchain_blocks_max_fields_possibleTypes = [
  'nfts_by_blockchain_blocks_max_fields',
]
export const isnfts_by_blockchain_blocks_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_max_fields_possibleTypes.includes(
    obj.__typename
  )
}
const nfts_by_blockchain_blocks_min_fields_possibleTypes = [
  'nfts_by_blockchain_blocks_min_fields',
]
export const isnfts_by_blockchain_blocks_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_min_fields_possibleTypes.includes(
    obj.__typename
  )
}
const niftysave_migration_possibleTypes = ['niftysave_migration']
export const isniftysave_migration = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_possibleTypes.includes(obj.__typename)
}
const niftysave_migration_aggregate_possibleTypes = [
  'niftysave_migration_aggregate',
]
export const isniftysave_migration_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_aggregate_possibleTypes.includes(obj.__typename)
}
const niftysave_migration_aggregate_fields_possibleTypes = [
  'niftysave_migration_aggregate_fields',
]
export const isniftysave_migration_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}
const niftysave_migration_max_fields_possibleTypes = [
  'niftysave_migration_max_fields',
]
export const isniftysave_migration_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_max_fields_possibleTypes.includes(obj.__typename)
}
const niftysave_migration_min_fields_possibleTypes = [
  'niftysave_migration_min_fields',
]
export const isniftysave_migration_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_min_fields_possibleTypes.includes(obj.__typename)
}
const other_nft_resources_possibleTypes = ['other_nft_resources']
export const isother_nft_resources = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_possibleTypes.includes(obj.__typename)
}
const other_nft_resources_aggregate_possibleTypes = [
  'other_nft_resources_aggregate',
]
export const isother_nft_resources_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_aggregate_possibleTypes.includes(obj.__typename)
}
const other_nft_resources_aggregate_fields_possibleTypes = [
  'other_nft_resources_aggregate_fields',
]
export const isother_nft_resources_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_aggregate_fields_possibleTypes.includes(
    obj.__typename
  )
}
const other_nft_resources_max_fields_possibleTypes = [
  'other_nft_resources_max_fields',
]
export const isother_nft_resources_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_max_fields_possibleTypes.includes(obj.__typename)
}
const other_nft_resources_min_fields_possibleTypes = [
  'other_nft_resources_min_fields',
]
export const isother_nft_resources_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_min_fields_possibleTypes.includes(obj.__typename)
}
const pin_possibleTypes = ['pin']
export const ispin = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_possibleTypes.includes(obj.__typename)
}
const pin_aggregate_possibleTypes = ['pin_aggregate']
export const ispin_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_aggregate_possibleTypes.includes(obj.__typename)
}
const pin_aggregate_fields_possibleTypes = ['pin_aggregate_fields']
export const ispin_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_aggregate_fields_possibleTypes.includes(obj.__typename)
}
const pin_avg_fields_possibleTypes = ['pin_avg_fields']
export const ispin_avg_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_avg_fields_possibleTypes.includes(obj.__typename)
}
const pin_max_fields_possibleTypes = ['pin_max_fields']
export const ispin_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_max_fields_possibleTypes.includes(obj.__typename)
}
const pin_min_fields_possibleTypes = ['pin_min_fields']
export const ispin_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_min_fields_possibleTypes.includes(obj.__typename)
}
const pin_stddev_fields_possibleTypes = ['pin_stddev_fields']
export const ispin_stddev_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_stddev_fields_possibleTypes.includes(obj.__typename)
}
const pin_stddev_pop_fields_possibleTypes = ['pin_stddev_pop_fields']
export const ispin_stddev_pop_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_stddev_pop_fields_possibleTypes.includes(obj.__typename)
}
const pin_stddev_samp_fields_possibleTypes = ['pin_stddev_samp_fields']
export const ispin_stddev_samp_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_stddev_samp_fields_possibleTypes.includes(obj.__typename)
}
const pin_sum_fields_possibleTypes = ['pin_sum_fields']
export const ispin_sum_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_sum_fields_possibleTypes.includes(obj.__typename)
}
const pin_var_pop_fields_possibleTypes = ['pin_var_pop_fields']
export const ispin_var_pop_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_var_pop_fields_possibleTypes.includes(obj.__typename)
}
const pin_var_samp_fields_possibleTypes = ['pin_var_samp_fields']
export const ispin_var_samp_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_var_samp_fields_possibleTypes.includes(obj.__typename)
}
const pin_variance_fields_possibleTypes = ['pin_variance_fields']
export const ispin_variance_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_variance_fields_possibleTypes.includes(obj.__typename)
}
const resource_possibleTypes = ['resource']
export const isresource = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_possibleTypes.includes(obj.__typename)
}
const resource_aggregate_possibleTypes = ['resource_aggregate']
export const isresource_aggregate = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_aggregate_possibleTypes.includes(obj.__typename)
}
const resource_aggregate_fields_possibleTypes = ['resource_aggregate_fields']
export const isresource_aggregate_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_aggregate_fields_possibleTypes.includes(obj.__typename)
}
const resource_max_fields_possibleTypes = ['resource_max_fields']
export const isresource_max_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_max_fields_possibleTypes.includes(obj.__typename)
}
const resource_min_fields_possibleTypes = ['resource_min_fields']
export const isresource_min_fields = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_min_fields_possibleTypes.includes(obj.__typename)
}
const mutation_root_possibleTypes = ['mutation_root']
export const ismutation_root = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return mutation_root_possibleTypes.includes(obj.__typename)
}
const blockchain_block_mutation_response_possibleTypes = [
  'blockchain_block_mutation_response',
]
export const isblockchain_block_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_block_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}
const blockchain_contract_mutation_response_possibleTypes = [
  'blockchain_contract_mutation_response',
]
export const isblockchain_contract_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return blockchain_contract_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}
const content_mutation_response_possibleTypes = ['content_mutation_response']
export const iscontent_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return content_mutation_response_possibleTypes.includes(obj.__typename)
}
const erc721_import_mutation_response_possibleTypes = [
  'erc721_import_mutation_response',
]
export const iserc721_import_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_mutation_response_possibleTypes.includes(obj.__typename)
}
const erc721_import_by_nft_mutation_response_possibleTypes = [
  'erc721_import_by_nft_mutation_response',
]
export const iserc721_import_by_nft_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return erc721_import_by_nft_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}
const nft_mutation_response_possibleTypes = ['nft_mutation_response']
export const isnft_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_mutation_response_possibleTypes.includes(obj.__typename)
}
const nft_asset_mutation_response_possibleTypes = [
  'nft_asset_mutation_response',
]
export const isnft_asset_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_asset_mutation_response_possibleTypes.includes(obj.__typename)
}
const nft_metadata_mutation_response_possibleTypes = [
  'nft_metadata_mutation_response',
]
export const isnft_metadata_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_metadata_mutation_response_possibleTypes.includes(obj.__typename)
}
const nft_owner_mutation_response_possibleTypes = [
  'nft_owner_mutation_response',
]
export const isnft_owner_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nft_owner_mutation_response_possibleTypes.includes(obj.__typename)
}
const nfts_by_blockchain_blocks_mutation_response_possibleTypes = [
  'nfts_by_blockchain_blocks_mutation_response',
]
export const isnfts_by_blockchain_blocks_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return nfts_by_blockchain_blocks_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}
const niftysave_migration_mutation_response_possibleTypes = [
  'niftysave_migration_mutation_response',
]
export const isniftysave_migration_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return niftysave_migration_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}
const other_nft_resources_mutation_response_possibleTypes = [
  'other_nft_resources_mutation_response',
]
export const isother_nft_resources_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return other_nft_resources_mutation_response_possibleTypes.includes(
    obj.__typename
  )
}
const pin_mutation_response_possibleTypes = ['pin_mutation_response']
export const ispin_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return pin_mutation_response_possibleTypes.includes(obj.__typename)
}
const resource_mutation_response_possibleTypes = ['resource_mutation_response']
export const isresource_mutation_response = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return resource_mutation_response_possibleTypes.includes(obj.__typename)
}
const subscription_root_possibleTypes = ['subscription_root']
export const issubscription_root = obj => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return subscription_root_possibleTypes.includes(obj.__typename)
}
