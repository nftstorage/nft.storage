/* eslint-disable */
import { AllTypesProps, ReturnTypes } from './const.js'
/** unique or primary key constraints on table "blockchain_block" */
export var blockchain_block_constraint
;(function (blockchain_block_constraint) {
  blockchain_block_constraint['blockchain_block_pkey'] = 'blockchain_block_pkey'
  blockchain_block_constraint['unique_blockchain_block_hash'] =
    'unique_blockchain_block_hash'
})(blockchain_block_constraint || (blockchain_block_constraint = {}))
/** select columns of table "blockchain_block" */
export var blockchain_block_select_column
;(function (blockchain_block_select_column) {
  blockchain_block_select_column['hash'] = 'hash'
  blockchain_block_select_column['inserted_at'] = 'inserted_at'
  blockchain_block_select_column['number'] = 'number'
  blockchain_block_select_column['updated_at'] = 'updated_at'
})(blockchain_block_select_column || (blockchain_block_select_column = {}))
/** update columns of table "blockchain_block" */
export var blockchain_block_update_column
;(function (blockchain_block_update_column) {
  blockchain_block_update_column['hash'] = 'hash'
  blockchain_block_update_column['inserted_at'] = 'inserted_at'
  blockchain_block_update_column['number'] = 'number'
  blockchain_block_update_column['updated_at'] = 'updated_at'
})(blockchain_block_update_column || (blockchain_block_update_column = {}))
/** unique or primary key constraints on table "blockchain_contract" */
export var blockchain_contract_constraint
;(function (blockchain_contract_constraint) {
  blockchain_contract_constraint['blockchain_contract_pkey'] =
    'blockchain_contract_pkey'
})(blockchain_contract_constraint || (blockchain_contract_constraint = {}))
/** select columns of table "blockchain_contract" */
export var blockchain_contract_select_column
;(function (blockchain_contract_select_column) {
  blockchain_contract_select_column['id'] = 'id'
  blockchain_contract_select_column['inserted_at'] = 'inserted_at'
  blockchain_contract_select_column['name'] = 'name'
  blockchain_contract_select_column['supports_eip721_metadata'] =
    'supports_eip721_metadata'
  blockchain_contract_select_column['symbol'] = 'symbol'
  blockchain_contract_select_column['updated_at'] = 'updated_at'
})(
  blockchain_contract_select_column || (blockchain_contract_select_column = {})
)
/** update columns of table "blockchain_contract" */
export var blockchain_contract_update_column
;(function (blockchain_contract_update_column) {
  blockchain_contract_update_column['id'] = 'id'
  blockchain_contract_update_column['inserted_at'] = 'inserted_at'
  blockchain_contract_update_column['name'] = 'name'
  blockchain_contract_update_column['supports_eip721_metadata'] =
    'supports_eip721_metadata'
  blockchain_contract_update_column['symbol'] = 'symbol'
  blockchain_contract_update_column['updated_at'] = 'updated_at'
})(
  blockchain_contract_update_column || (blockchain_contract_update_column = {})
)
/** unique or primary key constraints on table "content" */
export var content_constraint
;(function (content_constraint) {
  content_constraint['content_pkey'] = 'content_pkey'
})(content_constraint || (content_constraint = {}))
/** select columns of table "content" */
export var content_select_column
;(function (content_select_column) {
  content_select_column['cid'] = 'cid'
  content_select_column['dag_size'] = 'dag_size'
  content_select_column['inserted_at'] = 'inserted_at'
  content_select_column['updated_at'] = 'updated_at'
})(content_select_column || (content_select_column = {}))
/** update columns of table "content" */
export var content_update_column
;(function (content_update_column) {
  content_update_column['cid'] = 'cid'
  content_update_column['dag_size'] = 'dag_size'
  content_update_column['inserted_at'] = 'inserted_at'
  content_update_column['updated_at'] = 'updated_at'
})(content_update_column || (content_update_column = {}))
/** unique or primary key constraints on table "erc721_import_by_nft" */
export var erc721_import_by_nft_constraint
;(function (erc721_import_by_nft_constraint) {
  erc721_import_by_nft_constraint['erc721_import_by_nft_pkey'] =
    'erc721_import_by_nft_pkey'
})(erc721_import_by_nft_constraint || (erc721_import_by_nft_constraint = {}))
/** select columns of table "erc721_import_by_nft" */
export var erc721_import_by_nft_select_column
;(function (erc721_import_by_nft_select_column) {
  erc721_import_by_nft_select_column['erc721_import_id'] = 'erc721_import_id'
  erc721_import_by_nft_select_column['inserted_at'] = 'inserted_at'
  erc721_import_by_nft_select_column['nft_id'] = 'nft_id'
  erc721_import_by_nft_select_column['updated_at'] = 'updated_at'
})(
  erc721_import_by_nft_select_column ||
    (erc721_import_by_nft_select_column = {})
)
/** update columns of table "erc721_import_by_nft" */
export var erc721_import_by_nft_update_column
;(function (erc721_import_by_nft_update_column) {
  erc721_import_by_nft_update_column['erc721_import_id'] = 'erc721_import_id'
  erc721_import_by_nft_update_column['inserted_at'] = 'inserted_at'
  erc721_import_by_nft_update_column['nft_id'] = 'nft_id'
  erc721_import_by_nft_update_column['updated_at'] = 'updated_at'
})(
  erc721_import_by_nft_update_column ||
    (erc721_import_by_nft_update_column = {})
)
/** unique or primary key constraints on table "erc721_import" */
export var erc721_import_constraint
;(function (erc721_import_constraint) {
  erc721_import_constraint['erc721_import_pkey'] = 'erc721_import_pkey'
})(erc721_import_constraint || (erc721_import_constraint = {}))
/** select columns of table "erc721_import" */
export var erc721_import_select_column
;(function (erc721_import_select_column) {
  erc721_import_select_column['id'] = 'id'
  erc721_import_select_column['inserted_at'] = 'inserted_at'
  erc721_import_select_column['next_id'] = 'next_id'
  erc721_import_select_column['updated_at'] = 'updated_at'
})(erc721_import_select_column || (erc721_import_select_column = {}))
/** update columns of table "erc721_import" */
export var erc721_import_update_column
;(function (erc721_import_update_column) {
  erc721_import_update_column['id'] = 'id'
  erc721_import_update_column['inserted_at'] = 'inserted_at'
  erc721_import_update_column['next_id'] = 'next_id'
  erc721_import_update_column['updated_at'] = 'updated_at'
})(erc721_import_update_column || (erc721_import_update_column = {}))
/** unique or primary key constraints on table "nft_asset" */
export var nft_asset_constraint
;(function (nft_asset_constraint) {
  nft_asset_constraint['nft_asset_pkey'] = 'nft_asset_pkey'
})(nft_asset_constraint || (nft_asset_constraint = {}))
/** select columns of table "nft_asset" */
export var nft_asset_select_column
;(function (nft_asset_select_column) {
  nft_asset_select_column['content_cid'] = 'content_cid'
  nft_asset_select_column['inserted_at'] = 'inserted_at'
  nft_asset_select_column['ipfs_url'] = 'ipfs_url'
  nft_asset_select_column['status'] = 'status'
  nft_asset_select_column['status_text'] = 'status_text'
  nft_asset_select_column['token_uri'] = 'token_uri'
  nft_asset_select_column['token_uri_hash'] = 'token_uri_hash'
  nft_asset_select_column['updated_at'] = 'updated_at'
})(nft_asset_select_column || (nft_asset_select_column = {}))
/** update columns of table "nft_asset" */
export var nft_asset_update_column
;(function (nft_asset_update_column) {
  nft_asset_update_column['content_cid'] = 'content_cid'
  nft_asset_update_column['inserted_at'] = 'inserted_at'
  nft_asset_update_column['ipfs_url'] = 'ipfs_url'
  nft_asset_update_column['status'] = 'status'
  nft_asset_update_column['status_text'] = 'status_text'
  nft_asset_update_column['token_uri'] = 'token_uri'
  nft_asset_update_column['token_uri_hash'] = 'token_uri_hash'
  nft_asset_update_column['updated_at'] = 'updated_at'
})(nft_asset_update_column || (nft_asset_update_column = {}))
/** select columns of table "nft_asset_view" */
export var nft_asset_view_select_column
;(function (nft_asset_view_select_column) {
  nft_asset_view_select_column['content_cid'] = 'content_cid'
  nft_asset_view_select_column['inserted_at'] = 'inserted_at'
  nft_asset_view_select_column['ipfs_url'] = 'ipfs_url'
  nft_asset_view_select_column['status'] = 'status'
  nft_asset_view_select_column['status_text'] = 'status_text'
  nft_asset_view_select_column['token_uri'] = 'token_uri'
  nft_asset_view_select_column['updated_at'] = 'updated_at'
})(nft_asset_view_select_column || (nft_asset_view_select_column = {}))
/** unique or primary key constraints on table "nft" */
export var nft_constraint
;(function (nft_constraint) {
  nft_constraint['nft_pkey'] = 'nft_pkey'
})(nft_constraint || (nft_constraint = {}))
/** unique or primary key constraints on table "nft_metadata" */
export var nft_metadata_constraint
;(function (nft_metadata_constraint) {
  nft_metadata_constraint['nft_metadata_pkey'] = 'nft_metadata_pkey'
})(nft_metadata_constraint || (nft_metadata_constraint = {}))
/** select columns of table "nft_metadata" */
export var nft_metadata_select_column
;(function (nft_metadata_select_column) {
  nft_metadata_select_column['content_cid'] = 'content_cid'
  nft_metadata_select_column['description'] = 'description'
  nft_metadata_select_column['image_uri_hash'] = 'image_uri_hash'
  nft_metadata_select_column['inserted_at'] = 'inserted_at'
  nft_metadata_select_column['name'] = 'name'
  nft_metadata_select_column['updated_at'] = 'updated_at'
})(nft_metadata_select_column || (nft_metadata_select_column = {}))
/** update columns of table "nft_metadata" */
export var nft_metadata_update_column
;(function (nft_metadata_update_column) {
  nft_metadata_update_column['content_cid'] = 'content_cid'
  nft_metadata_update_column['description'] = 'description'
  nft_metadata_update_column['image_uri_hash'] = 'image_uri_hash'
  nft_metadata_update_column['inserted_at'] = 'inserted_at'
  nft_metadata_update_column['name'] = 'name'
  nft_metadata_update_column['updated_at'] = 'updated_at'
})(nft_metadata_update_column || (nft_metadata_update_column = {}))
/** unique or primary key constraints on table "nft_owner" */
export var nft_owner_constraint
;(function (nft_owner_constraint) {
  nft_owner_constraint['nft_owner_pkey'] = 'nft_owner_pkey'
})(nft_owner_constraint || (nft_owner_constraint = {}))
/** select columns of table "nft_owner" */
export var nft_owner_select_column
;(function (nft_owner_select_column) {
  nft_owner_select_column['id'] = 'id'
  nft_owner_select_column['inserted_at'] = 'inserted_at'
  nft_owner_select_column['updated_at'] = 'updated_at'
})(nft_owner_select_column || (nft_owner_select_column = {}))
/** update columns of table "nft_owner" */
export var nft_owner_update_column
;(function (nft_owner_update_column) {
  nft_owner_update_column['id'] = 'id'
  nft_owner_update_column['inserted_at'] = 'inserted_at'
  nft_owner_update_column['updated_at'] = 'updated_at'
})(nft_owner_update_column || (nft_owner_update_column = {}))
/** select columns of table "nft" */
export var nft_select_column
;(function (nft_select_column) {
  nft_select_column['contract_id'] = 'contract_id'
  nft_select_column['id'] = 'id'
  nft_select_column['inserted_at'] = 'inserted_at'
  nft_select_column['mint_time'] = 'mint_time'
  nft_select_column['nft_owner_id'] = 'nft_owner_id'
  nft_select_column['token_id'] = 'token_id'
  nft_select_column['token_uri_hash'] = 'token_uri_hash'
  nft_select_column['updated_at'] = 'updated_at'
})(nft_select_column || (nft_select_column = {}))
/** update columns of table "nft" */
export var nft_update_column
;(function (nft_update_column) {
  nft_update_column['contract_id'] = 'contract_id'
  nft_update_column['id'] = 'id'
  nft_update_column['inserted_at'] = 'inserted_at'
  nft_update_column['mint_time'] = 'mint_time'
  nft_update_column['nft_owner_id'] = 'nft_owner_id'
  nft_update_column['token_id'] = 'token_id'
  nft_update_column['token_uri_hash'] = 'token_uri_hash'
  nft_update_column['updated_at'] = 'updated_at'
})(nft_update_column || (nft_update_column = {}))
/** unique or primary key constraints on table "nfts_by_blockchain_blocks" */
export var nfts_by_blockchain_blocks_constraint
;(function (nfts_by_blockchain_blocks_constraint) {
  nfts_by_blockchain_blocks_constraint['nfts_by_blockchain_blocks_pkey'] =
    'nfts_by_blockchain_blocks_pkey'
})(
  nfts_by_blockchain_blocks_constraint ||
    (nfts_by_blockchain_blocks_constraint = {})
)
/** select columns of table "nfts_by_blockchain_blocks" */
export var nfts_by_blockchain_blocks_select_column
;(function (nfts_by_blockchain_blocks_select_column) {
  nfts_by_blockchain_blocks_select_column['blockchain_block_hash'] =
    'blockchain_block_hash'
  nfts_by_blockchain_blocks_select_column['inserted_at'] = 'inserted_at'
  nfts_by_blockchain_blocks_select_column['nft_id'] = 'nft_id'
  nfts_by_blockchain_blocks_select_column['updated_at'] = 'updated_at'
})(
  nfts_by_blockchain_blocks_select_column ||
    (nfts_by_blockchain_blocks_select_column = {})
)
/** update columns of table "nfts_by_blockchain_blocks" */
export var nfts_by_blockchain_blocks_update_column
;(function (nfts_by_blockchain_blocks_update_column) {
  nfts_by_blockchain_blocks_update_column['blockchain_block_hash'] =
    'blockchain_block_hash'
  nfts_by_blockchain_blocks_update_column['inserted_at'] = 'inserted_at'
  nfts_by_blockchain_blocks_update_column['nft_id'] = 'nft_id'
  nfts_by_blockchain_blocks_update_column['updated_at'] = 'updated_at'
})(
  nfts_by_blockchain_blocks_update_column ||
    (nfts_by_blockchain_blocks_update_column = {})
)
/** unique or primary key constraints on table "niftysave_migration" */
export var niftysave_migration_constraint
;(function (niftysave_migration_constraint) {
  niftysave_migration_constraint['niftysave_migration_pkey'] =
    'niftysave_migration_pkey'
})(niftysave_migration_constraint || (niftysave_migration_constraint = {}))
/** select columns of table "niftysave_migration" */
export var niftysave_migration_select_column
;(function (niftysave_migration_select_column) {
  niftysave_migration_select_column['collection'] = 'collection'
  niftysave_migration_select_column['cursor'] = 'cursor'
  niftysave_migration_select_column['id'] = 'id'
  niftysave_migration_select_column['inserted_at'] = 'inserted_at'
  niftysave_migration_select_column['metadata'] = 'metadata'
  niftysave_migration_select_column['updated_at'] = 'updated_at'
})(
  niftysave_migration_select_column || (niftysave_migration_select_column = {})
)
/** update columns of table "niftysave_migration" */
export var niftysave_migration_update_column
;(function (niftysave_migration_update_column) {
  niftysave_migration_update_column['collection'] = 'collection'
  niftysave_migration_update_column['cursor'] = 'cursor'
  niftysave_migration_update_column['id'] = 'id'
  niftysave_migration_update_column['inserted_at'] = 'inserted_at'
  niftysave_migration_update_column['metadata'] = 'metadata'
  niftysave_migration_update_column['updated_at'] = 'updated_at'
})(
  niftysave_migration_update_column || (niftysave_migration_update_column = {})
)
/** column ordering options */
export var order_by
;(function (order_by) {
  order_by['asc'] = 'asc'
  order_by['asc_nulls_first'] = 'asc_nulls_first'
  order_by['asc_nulls_last'] = 'asc_nulls_last'
  order_by['desc'] = 'desc'
  order_by['desc_nulls_first'] = 'desc_nulls_first'
  order_by['desc_nulls_last'] = 'desc_nulls_last'
})(order_by || (order_by = {}))
/** unique or primary key constraints on table "other_nft_resources" */
export var other_nft_resources_constraint
;(function (other_nft_resources_constraint) {
  other_nft_resources_constraint['other_nft_resources_pkey'] =
    'other_nft_resources_pkey'
})(other_nft_resources_constraint || (other_nft_resources_constraint = {}))
/** select columns of table "other_nft_resources" */
export var other_nft_resources_select_column
;(function (other_nft_resources_select_column) {
  other_nft_resources_select_column['content_cid'] = 'content_cid'
  other_nft_resources_select_column['inserted_at'] = 'inserted_at'
  other_nft_resources_select_column['resource_uri_hash'] = 'resource_uri_hash'
  other_nft_resources_select_column['updated_at'] = 'updated_at'
})(
  other_nft_resources_select_column || (other_nft_resources_select_column = {})
)
/** update columns of table "other_nft_resources" */
export var other_nft_resources_update_column
;(function (other_nft_resources_update_column) {
  other_nft_resources_update_column['content_cid'] = 'content_cid'
  other_nft_resources_update_column['inserted_at'] = 'inserted_at'
  other_nft_resources_update_column['resource_uri_hash'] = 'resource_uri_hash'
  other_nft_resources_update_column['updated_at'] = 'updated_at'
})(
  other_nft_resources_update_column || (other_nft_resources_update_column = {})
)
/** unique or primary key constraints on table "pin" */
export var pin_constraint
;(function (pin_constraint) {
  pin_constraint['pin_pkey'] = 'pin_pkey'
})(pin_constraint || (pin_constraint = {}))
/** select columns of table "pin" */
export var pin_select_column
;(function (pin_select_column) {
  pin_select_column['content_cid'] = 'content_cid'
  pin_select_column['id'] = 'id'
  pin_select_column['inserted_at'] = 'inserted_at'
  pin_select_column['service'] = 'service'
  pin_select_column['status'] = 'status'
  pin_select_column['updated_at'] = 'updated_at'
})(pin_select_column || (pin_select_column = {}))
/** update columns of table "pin" */
export var pin_update_column
;(function (pin_update_column) {
  pin_update_column['content_cid'] = 'content_cid'
  pin_update_column['id'] = 'id'
  pin_update_column['inserted_at'] = 'inserted_at'
  pin_update_column['service'] = 'service'
  pin_update_column['status'] = 'status'
  pin_update_column['updated_at'] = 'updated_at'
})(pin_update_column || (pin_update_column = {}))
/** unique or primary key constraints on table "resource" */
export var resource_constraint
;(function (resource_constraint) {
  resource_constraint['resource_pkey'] = 'resource_pkey'
})(resource_constraint || (resource_constraint = {}))
/** select columns of table "resource" */
export var resource_select_column
;(function (resource_select_column) {
  resource_select_column['content_cid'] = 'content_cid'
  resource_select_column['inserted_at'] = 'inserted_at'
  resource_select_column['ipfs_url'] = 'ipfs_url'
  resource_select_column['status'] = 'status'
  resource_select_column['status_text'] = 'status_text'
  resource_select_column['updated_at'] = 'updated_at'
  resource_select_column['uri'] = 'uri'
  resource_select_column['uri_hash'] = 'uri_hash'
})(resource_select_column || (resource_select_column = {}))
/** update columns of table "resource" */
export var resource_update_column
;(function (resource_update_column) {
  resource_update_column['content_cid'] = 'content_cid'
  resource_update_column['inserted_at'] = 'inserted_at'
  resource_update_column['ipfs_url'] = 'ipfs_url'
  resource_update_column['status'] = 'status'
  resource_update_column['status_text'] = 'status_text'
  resource_update_column['updated_at'] = 'updated_at'
  resource_update_column['uri'] = 'uri'
  resource_update_column['uri_hash'] = 'uri_hash'
})(resource_update_column || (resource_update_column = {}))
/** select columns of table "resource_view" */
export var resource_view_select_column
;(function (resource_view_select_column) {
  resource_view_select_column['content_cid'] = 'content_cid'
  resource_view_select_column['inserted_at'] = 'inserted_at'
  resource_view_select_column['ipfs_url'] = 'ipfs_url'
  resource_view_select_column['status'] = 'status'
  resource_view_select_column['status_text'] = 'status_text'
  resource_view_select_column['updated_at'] = 'updated_at'
  resource_view_select_column['uri'] = 'uri'
})(resource_view_select_column || (resource_view_select_column = {}))
export class GraphQLError extends Error {
  response
  constructor(response) {
    super('')
    this.response = response
    console.error(response)
  }
  toString() {
    return 'GraphQL Response Error'
  }
}
export const ZeusSelect = () => (t) => t
export const ScalarResolver = (scalar, value) => {
  switch (scalar) {
    case 'String':
      return `${JSON.stringify(value)}`
    case 'Int':
      return `${value}`
    case 'Float':
      return `${value}`
    case 'Boolean':
      return `${value}`
    case 'ID':
      return `"${value}"`
    case 'enum':
      return `${value}`
    case 'scalar':
      return `${value}`
    default:
      return false
  }
}
export const TypesPropsResolver = ({ value, type, name, key, blockArrays }) => {
  if (value === null) {
    return `null`
  }
  let resolvedValue = AllTypesProps[type][name]
  if (key) {
    resolvedValue = resolvedValue[key]
  }
  if (!resolvedValue) {
    throw new Error(`Cannot resolve ${type} ${name}${key ? ` ${key}` : ''}`)
  }
  const typeResolved = resolvedValue.type
  const isArray = resolvedValue.array
  const isArrayRequired = resolvedValue.arrayRequired
  if (typeof value === 'string' && value.startsWith(`ZEUS_VAR$`)) {
    const isRequired = resolvedValue.required ? '!' : ''
    let t = `${typeResolved}`
    if (isArray) {
      if (isRequired) {
        t = `${t}!`
      }
      t = `[${t}]`
      if (isArrayRequired) {
        t = `${t}!`
      }
    } else {
      if (isRequired) {
        t = `${t}!`
      }
    }
    return `\$${value.split(`ZEUS_VAR$`)[1]}__ZEUS_VAR__${t}`
  }
  if (isArray && !blockArrays) {
    return `[${value
      .map((v) =>
        TypesPropsResolver({ value: v, type, name, key, blockArrays: true })
      )
      .join(',')}]`
  }
  const reslovedScalar = ScalarResolver(typeResolved, value)
  if (!reslovedScalar) {
    const resolvedType = AllTypesProps[typeResolved]
    if (typeof resolvedType === 'object') {
      const argsKeys = Object.keys(resolvedType)
      return `{${argsKeys
        .filter((ak) => value[ak] !== undefined)
        .map(
          (ak) =>
            `${ak}:${TypesPropsResolver({
              value: value[ak],
              type: typeResolved,
              name: ak,
            })}`
        )}}`
    }
    return ScalarResolver(AllTypesProps[typeResolved], value)
  }
  return reslovedScalar
}
const isArrayFunction = (parent, a) => {
  const [values, r] = a
  const [mainKey, key, ...keys] = parent
  const keyValues = Object.keys(values).filter(
    (k) => typeof values[k] !== 'undefined'
  )
  if (!keys.length) {
    return keyValues.length > 0
      ? `(${keyValues
          .map(
            (v) =>
              `${v}:${TypesPropsResolver({
                value: values[v],
                type: mainKey,
                name: key,
                key: v,
              })}`
          )
          .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
      : traverseToSeekArrays(parent, r)
  }
  const [typeResolverKey] = keys.splice(keys.length - 1, 1)
  let valueToResolve = ReturnTypes[mainKey][key]
  for (const k of keys) {
    valueToResolve = ReturnTypes[valueToResolve][k]
  }
  const argumentString =
    keyValues.length > 0
      ? `(${keyValues
          .map(
            (v) =>
              `${v}:${TypesPropsResolver({
                value: values[v],
                type: valueToResolve,
                name: typeResolverKey,
                key: v,
              })}`
          )
          .join(',')})${r ? traverseToSeekArrays(parent, r) : ''}`
      : traverseToSeekArrays(parent, r)
  return argumentString
}
const resolveKV = (k, v) =>
  typeof v === 'boolean'
    ? k
    : typeof v === 'object'
    ? `${k}{${objectToTree(v)}}`
    : `${k}${v}`
const objectToTree = (o) =>
  `{${Object.keys(o)
    .map((k) => `${resolveKV(k, o[k])}`)
    .join(' ')}}`
const traverseToSeekArrays = (parent, a) => {
  if (!a) return ''
  if (Object.keys(a).length === 0) {
    return ''
  }
  let b = {}
  if (Array.isArray(a)) {
    return isArrayFunction([...parent], a)
  } else {
    if (typeof a === 'object') {
      Object.keys(a)
        .filter((k) => typeof a[k] !== 'undefined')
        .forEach((k) => {
          if (k === '__alias') {
            Object.keys(a[k]).forEach((aliasKey) => {
              const aliasOperations = a[k][aliasKey]
              const aliasOperationName = Object.keys(aliasOperations)[0]
              const aliasOperation = aliasOperations[aliasOperationName]
              b[
                `${aliasOperationName}__alias__${aliasKey}: ${aliasOperationName}`
              ] = traverseToSeekArrays(
                [...parent, aliasOperationName],
                aliasOperation
              )
            })
          } else {
            b[k] = traverseToSeekArrays([...parent, k], a[k])
          }
        })
    } else {
      return ''
    }
  }
  return objectToTree(b)
}
const buildQuery = (type, a) => traverseToSeekArrays([type], a)
const inspectVariables = (query) => {
  const regex = /\$\b\w*__ZEUS_VAR__\[?[^!^\]^\s^,^\)^\}]*[!]?[\]]?[!]?/g
  let result
  const AllVariables = []
  while ((result = regex.exec(query))) {
    if (AllVariables.includes(result[0])) {
      continue
    }
    AllVariables.push(result[0])
  }
  if (!AllVariables.length) {
    return query
  }
  let filteredQuery = query
  AllVariables.forEach((variable) => {
    while (filteredQuery.includes(variable)) {
      filteredQuery = filteredQuery.replace(
        variable,
        variable.split('__ZEUS_VAR__')[0]
      )
    }
  })
  return `(${AllVariables.map((a) => a.split('__ZEUS_VAR__'))
    .map(([variableName, variableType]) => `${variableName}:${variableType}`)
    .join(', ')})${filteredQuery}`
}
export const queryConstruct = (t, tName, operationName) => (o) =>
  `${t.toLowerCase()}${
    operationName ? ' ' + operationName : ''
  }${inspectVariables(buildQuery(tName, o))}`
const fullChainConstruct = (fn) => (t, tName) => (o, options) =>
  fn(
    queryConstruct(t, tName, options?.operationName)(o),
    options?.variables
  ).then((r) => {
    seekForAliases(r)
    return r
  })
export const fullChainConstructor = (fn, operation, key) => (o, options) =>
  fullChainConstruct(fn)(operation, key)(o, options)
const fullSubscriptionConstruct = (fn) => (t, tName) => (o, options) =>
  fn(queryConstruct(t, tName, options?.operationName)(o))
export const fullSubscriptionConstructor =
  (fn, operation, key) => (o, options) =>
    fullSubscriptionConstruct(fn)(operation, key)(o, options)
const seekForAliases = (response) => {
  const traverseAlias = (value) => {
    if (Array.isArray(value)) {
      value.forEach(seekForAliases)
    } else {
      if (typeof value === 'object') {
        seekForAliases(value)
      }
    }
  }
  if (typeof response === 'object' && response) {
    const keys = Object.keys(response)
    if (keys.length < 1) {
      return
    }
    keys.forEach((k) => {
      const value = response[k]
      if (k.indexOf('__alias__') !== -1) {
        const [operation, alias] = k.split('__alias__')
        response[alias] = {
          [operation]: value,
        }
        delete response[k]
      }
      traverseAlias(value)
    })
  }
}
export const $ = (t) => `ZEUS_VAR$${t.join('')}`
export const resolverFor = (type, field, fn) => fn
const handleFetchResponse = (response) => {
  if (!response.ok) {
    return new Promise((_, reject) => {
      response
        .text()
        .then((text) => {
          try {
            reject(JSON.parse(text))
          } catch (err) {
            reject(text)
          }
        })
        .catch(reject)
    })
  }
  return response.json()
}
export const apiFetch =
  (options) =>
  (query, variables = {}) => {
    let fetchFunction = fetch
    let queryString = query
    let fetchOptions = options[1] || {}
    if (fetchOptions.method && fetchOptions.method === 'GET') {
      queryString = encodeURIComponent(query)
      return fetchFunction(`${options[0]}?query=${queryString}`, fetchOptions)
        .then(handleFetchResponse)
        .then((response) => {
          if (response.errors) {
            throw new GraphQLError(response)
          }
          return response.data
        })
    }
    return fetchFunction(`${options[0]}`, {
      body: JSON.stringify({ query: queryString, variables }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...fetchOptions,
    })
      .then(handleFetchResponse)
      .then((response) => {
        if (response.errors) {
          throw new GraphQLError(response)
        }
        return response.data
      })
  }
export const apiSubscription = (options) => (query) => {
  try {
    const queryString = options[0] + '?query=' + encodeURIComponent(query)
    const wsString = queryString.replace('http', 'ws')
    const host = (options.length > 1 && options[1]?.websocket?.[0]) || wsString
    const webSocketOptions = options[1]?.websocket || [host]
    const ws = new WebSocket(...webSocketOptions)
    return {
      ws,
      on: (e) => {
        ws.onmessage = (event) => {
          if (event.data) {
            const parsed = JSON.parse(event.data)
            const data = parsed.data
            if (data) {
              seekForAliases(data)
            }
            return e(data)
          }
        }
      },
      off: (e) => {
        ws.onclose = e
      },
      error: (e) => {
        ws.onerror = e
      },
      open: (e) => {
        ws.onopen = e
      },
    }
  } catch {
    throw new Error('No websockets implemented')
  }
}
export const Thunder = (fn, subscriptionFn) => ({
  query: fullChainConstructor(fn, 'query', 'query_root'),
  mutation: fullChainConstructor(fn, 'mutation', 'mutation_root'),
  subscription: fullSubscriptionConstructor(
    subscriptionFn,
    'subscription',
    'subscription_root'
  ),
})
export const Chain = (...options) => ({
  query: fullChainConstructor(apiFetch(options), 'query', 'query_root'),
  mutation: fullChainConstructor(
    apiFetch(options),
    'mutation',
    'mutation_root'
  ),
  subscription: fullSubscriptionConstructor(
    apiSubscription(options),
    'subscription',
    'subscription_root'
  ),
})
export const Zeus = {
  query: (o, operationName) =>
    queryConstruct('query', 'query_root', operationName)(o),
  mutation: (o, operationName) =>
    queryConstruct('mutation', 'mutation_root', operationName)(o),
  subscription: (o, operationName) =>
    queryConstruct('subscription', 'subscription_root', operationName)(o),
}
export const Selectors = {
  query: ZeusSelect(),
  mutation: ZeusSelect(),
  subscription: ZeusSelect(),
}
export const Gql = Chain('http://localhost:8080/v1/graphql')
