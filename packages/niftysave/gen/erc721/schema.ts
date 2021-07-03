import { Observable } from 'graphql-typed-client'

export interface Query {
  all: All | null
  alls: All[]
  token: Token | null
  tokens: Token[]
  tokenContract: TokenContract | null
  tokenContracts: TokenContract[]
  owner: Owner | null
  owners: Owner[]
  ownerPerTokenContract: OwnerPerTokenContract | null
  ownerPerTokenContracts: OwnerPerTokenContract[]
  /** Access to subgraph metadata */
  _meta: _Meta_ | null
  __typename: 'Query'
}

/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

export type Bytes = any

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

export interface All {
  id: ID
  numTokenContracts: BigInt
  numTokens: BigInt
  numOwners: BigInt
  __typename: 'All'
}

export type BigInt = any

export enum All_orderBy {
  id = 'id',
  numTokenContracts = 'numTokenContracts',
  numTokens = 'numTokens',
  numOwners = 'numOwners',
}

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc',
}

export interface Token {
  id: ID
  contract: TokenContract
  tokenID: BigInt
  owner: Owner
  mintTime: BigInt
  tokenURI: String
  blockNumber: BigInt
  blockHash: Bytes
  __typename: 'Token'
}

export interface TokenContract {
  id: ID
  name: String | null
  symbol: String | null
  doAllAddressesOwnTheirIdByDefault: Boolean
  supportsEIP721Metadata: Boolean
  tokens: Token[]
  numTokens: BigInt
  numOwners: BigInt
  __typename: 'TokenContract'
}

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type String = string

/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean = boolean

export enum Token_orderBy {
  id = 'id',
  contract = 'contract',
  tokenID = 'tokenID',
  owner = 'owner',
  mintTime = 'mintTime',
  tokenURI = 'tokenURI',
  blockNumber = 'blockNumber',
  blockHash = 'blockHash',
}

export interface Owner {
  id: ID
  tokens: Token[]
  numTokens: BigInt
  __typename: 'Owner'
}

export enum TokenContract_orderBy {
  id = 'id',
  name = 'name',
  symbol = 'symbol',
  doAllAddressesOwnTheirIdByDefault = 'doAllAddressesOwnTheirIdByDefault',
  supportsEIP721Metadata = 'supportsEIP721Metadata',
  tokens = 'tokens',
  numTokens = 'numTokens',
  numOwners = 'numOwners',
}

export enum Owner_orderBy {
  id = 'id',
  tokens = 'tokens',
  numTokens = 'numTokens',
}

export interface OwnerPerTokenContract {
  id: ID
  owner: Owner
  contract: TokenContract
  numTokens: BigInt
  __typename: 'OwnerPerTokenContract'
}

export enum OwnerPerTokenContract_orderBy {
  id = 'id',
  owner = 'owner',
  contract = 'contract',
  numTokens = 'numTokens',
}

/** The type for the top-level _meta field */
export interface _Meta_ {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: String
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Boolean
  __typename: '_Meta_'
}

export interface _Block_ {
  /** The hash of the block */
  hash: Bytes | null
  /** The block number */
  number: Int
  __typename: '_Block_'
}

export interface Subscription {
  all: All | null
  alls: All[]
  token: Token | null
  tokens: Token[]
  tokenContract: TokenContract | null
  tokenContracts: TokenContract[]
  owner: Owner | null
  owners: Owner[]
  ownerPerTokenContract: OwnerPerTokenContract | null
  ownerPerTokenContracts: OwnerPerTokenContract[]
  /** Access to subgraph metadata */
  _meta: _Meta_ | null
  __typename: 'Subscription'
}

export type BigDecimal = any

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  deny = 'deny',
}

export interface QueryRequest {
  all?: [
    {
      id: ID
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    AllRequest
  ]
  alls?: [
    {
      skip?: Int | null
      first?: Int | null
      orderBy?: All_orderBy | null
      orderDirection?: OrderDirection | null
      where?: All_filter | null
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    AllRequest
  ]
  token?: [
    {
      id: ID
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    TokenRequest
  ]
  tokens?: [
    {
      skip?: Int | null
      first?: Int | null
      orderBy?: Token_orderBy | null
      orderDirection?: OrderDirection | null
      where?: Token_filter | null
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    TokenRequest
  ]
  tokenContract?: [
    {
      id: ID
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    TokenContractRequest
  ]
  tokenContracts?: [
    {
      skip?: Int | null
      first?: Int | null
      orderBy?: TokenContract_orderBy | null
      orderDirection?: OrderDirection | null
      where?: TokenContract_filter | null
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    TokenContractRequest
  ]
  owner?: [
    {
      id: ID
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    OwnerRequest
  ]
  owners?: [
    {
      skip?: Int | null
      first?: Int | null
      orderBy?: Owner_orderBy | null
      orderDirection?: OrderDirection | null
      where?: Owner_filter | null
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    OwnerRequest
  ]
  ownerPerTokenContract?: [
    {
      id: ID
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    OwnerPerTokenContractRequest
  ]
  ownerPerTokenContracts?: [
    {
      skip?: Int | null
      first?: Int | null
      orderBy?: OwnerPerTokenContract_orderBy | null
      orderDirection?: OrderDirection | null
      where?: OwnerPerTokenContract_filter | null
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    OwnerPerTokenContractRequest
  ]
  /** Access to subgraph metadata */
  _meta?: [{ block?: Block_height | null }, _Meta_Request] | _Meta_Request
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface Block_height {
  hash?: Bytes | null
  number?: Int | null
}

export interface AllRequest {
  id?: boolean | number
  numTokenContracts?: boolean | number
  numTokens?: boolean | number
  numOwners?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface All_filter {
  id?: ID | null
  id_not?: ID | null
  id_gt?: ID | null
  id_lt?: ID | null
  id_gte?: ID | null
  id_lte?: ID | null
  id_in?: ID[] | null
  id_not_in?: ID[] | null
  numTokenContracts?: BigInt | null
  numTokenContracts_not?: BigInt | null
  numTokenContracts_gt?: BigInt | null
  numTokenContracts_lt?: BigInt | null
  numTokenContracts_gte?: BigInt | null
  numTokenContracts_lte?: BigInt | null
  numTokenContracts_in?: BigInt[] | null
  numTokenContracts_not_in?: BigInt[] | null
  numTokens?: BigInt | null
  numTokens_not?: BigInt | null
  numTokens_gt?: BigInt | null
  numTokens_lt?: BigInt | null
  numTokens_gte?: BigInt | null
  numTokens_lte?: BigInt | null
  numTokens_in?: BigInt[] | null
  numTokens_not_in?: BigInt[] | null
  numOwners?: BigInt | null
  numOwners_not?: BigInt | null
  numOwners_gt?: BigInt | null
  numOwners_lt?: BigInt | null
  numOwners_gte?: BigInt | null
  numOwners_lte?: BigInt | null
  numOwners_in?: BigInt[] | null
  numOwners_not_in?: BigInt[] | null
}

export interface TokenRequest {
  id?: boolean | number
  contract?: TokenContractRequest
  tokenID?: boolean | number
  owner?: OwnerRequest
  mintTime?: boolean | number
  tokenURI?: boolean | number
  blockNumber?: boolean | number
  blockHash?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TokenContractRequest {
  id?: boolean | number
  name?: boolean | number
  symbol?: boolean | number
  doAllAddressesOwnTheirIdByDefault?: boolean | number
  supportsEIP721Metadata?: boolean | number
  tokens?:
    | [
        {
          skip?: Int | null
          first?: Int | null
          orderBy?: Token_orderBy | null
          orderDirection?: OrderDirection | null
          where?: Token_filter | null
        },
        TokenRequest
      ]
    | TokenRequest
  numTokens?: boolean | number
  numOwners?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface Token_filter {
  id?: ID | null
  id_not?: ID | null
  id_gt?: ID | null
  id_lt?: ID | null
  id_gte?: ID | null
  id_lte?: ID | null
  id_in?: ID[] | null
  id_not_in?: ID[] | null
  contract?: String | null
  contract_not?: String | null
  contract_gt?: String | null
  contract_lt?: String | null
  contract_gte?: String | null
  contract_lte?: String | null
  contract_in?: String[] | null
  contract_not_in?: String[] | null
  contract_contains?: String | null
  contract_not_contains?: String | null
  contract_starts_with?: String | null
  contract_not_starts_with?: String | null
  contract_ends_with?: String | null
  contract_not_ends_with?: String | null
  tokenID?: BigInt | null
  tokenID_not?: BigInt | null
  tokenID_gt?: BigInt | null
  tokenID_lt?: BigInt | null
  tokenID_gte?: BigInt | null
  tokenID_lte?: BigInt | null
  tokenID_in?: BigInt[] | null
  tokenID_not_in?: BigInt[] | null
  owner?: String | null
  owner_not?: String | null
  owner_gt?: String | null
  owner_lt?: String | null
  owner_gte?: String | null
  owner_lte?: String | null
  owner_in?: String[] | null
  owner_not_in?: String[] | null
  owner_contains?: String | null
  owner_not_contains?: String | null
  owner_starts_with?: String | null
  owner_not_starts_with?: String | null
  owner_ends_with?: String | null
  owner_not_ends_with?: String | null
  mintTime?: BigInt | null
  mintTime_not?: BigInt | null
  mintTime_gt?: BigInt | null
  mintTime_lt?: BigInt | null
  mintTime_gte?: BigInt | null
  mintTime_lte?: BigInt | null
  mintTime_in?: BigInt[] | null
  mintTime_not_in?: BigInt[] | null
  tokenURI?: String | null
  tokenURI_not?: String | null
  tokenURI_gt?: String | null
  tokenURI_lt?: String | null
  tokenURI_gte?: String | null
  tokenURI_lte?: String | null
  tokenURI_in?: String[] | null
  tokenURI_not_in?: String[] | null
  tokenURI_contains?: String | null
  tokenURI_not_contains?: String | null
  tokenURI_starts_with?: String | null
  tokenURI_not_starts_with?: String | null
  tokenURI_ends_with?: String | null
  tokenURI_not_ends_with?: String | null
  blockNumber?: BigInt | null
  blockNumber_not?: BigInt | null
  blockNumber_gt?: BigInt | null
  blockNumber_lt?: BigInt | null
  blockNumber_gte?: BigInt | null
  blockNumber_lte?: BigInt | null
  blockNumber_in?: BigInt[] | null
  blockNumber_not_in?: BigInt[] | null
  blockHash?: Bytes | null
  blockHash_not?: Bytes | null
  blockHash_in?: Bytes[] | null
  blockHash_not_in?: Bytes[] | null
  blockHash_contains?: Bytes | null
  blockHash_not_contains?: Bytes | null
}

export interface OwnerRequest {
  id?: boolean | number
  tokens?:
    | [
        {
          skip?: Int | null
          first?: Int | null
          orderBy?: Token_orderBy | null
          orderDirection?: OrderDirection | null
          where?: Token_filter | null
        },
        TokenRequest
      ]
    | TokenRequest
  numTokens?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TokenContract_filter {
  id?: ID | null
  id_not?: ID | null
  id_gt?: ID | null
  id_lt?: ID | null
  id_gte?: ID | null
  id_lte?: ID | null
  id_in?: ID[] | null
  id_not_in?: ID[] | null
  name?: String | null
  name_not?: String | null
  name_gt?: String | null
  name_lt?: String | null
  name_gte?: String | null
  name_lte?: String | null
  name_in?: String[] | null
  name_not_in?: String[] | null
  name_contains?: String | null
  name_not_contains?: String | null
  name_starts_with?: String | null
  name_not_starts_with?: String | null
  name_ends_with?: String | null
  name_not_ends_with?: String | null
  symbol?: String | null
  symbol_not?: String | null
  symbol_gt?: String | null
  symbol_lt?: String | null
  symbol_gte?: String | null
  symbol_lte?: String | null
  symbol_in?: String[] | null
  symbol_not_in?: String[] | null
  symbol_contains?: String | null
  symbol_not_contains?: String | null
  symbol_starts_with?: String | null
  symbol_not_starts_with?: String | null
  symbol_ends_with?: String | null
  symbol_not_ends_with?: String | null
  doAllAddressesOwnTheirIdByDefault?: Boolean | null
  doAllAddressesOwnTheirIdByDefault_not?: Boolean | null
  doAllAddressesOwnTheirIdByDefault_in?: Boolean[] | null
  doAllAddressesOwnTheirIdByDefault_not_in?: Boolean[] | null
  supportsEIP721Metadata?: Boolean | null
  supportsEIP721Metadata_not?: Boolean | null
  supportsEIP721Metadata_in?: Boolean[] | null
  supportsEIP721Metadata_not_in?: Boolean[] | null
  numTokens?: BigInt | null
  numTokens_not?: BigInt | null
  numTokens_gt?: BigInt | null
  numTokens_lt?: BigInt | null
  numTokens_gte?: BigInt | null
  numTokens_lte?: BigInt | null
  numTokens_in?: BigInt[] | null
  numTokens_not_in?: BigInt[] | null
  numOwners?: BigInt | null
  numOwners_not?: BigInt | null
  numOwners_gt?: BigInt | null
  numOwners_lt?: BigInt | null
  numOwners_gte?: BigInt | null
  numOwners_lte?: BigInt | null
  numOwners_in?: BigInt[] | null
  numOwners_not_in?: BigInt[] | null
}

export interface Owner_filter {
  id?: ID | null
  id_not?: ID | null
  id_gt?: ID | null
  id_lt?: ID | null
  id_gte?: ID | null
  id_lte?: ID | null
  id_in?: ID[] | null
  id_not_in?: ID[] | null
  numTokens?: BigInt | null
  numTokens_not?: BigInt | null
  numTokens_gt?: BigInt | null
  numTokens_lt?: BigInt | null
  numTokens_gte?: BigInt | null
  numTokens_lte?: BigInt | null
  numTokens_in?: BigInt[] | null
  numTokens_not_in?: BigInt[] | null
}

export interface OwnerPerTokenContractRequest {
  id?: boolean | number
  owner?: OwnerRequest
  contract?: TokenContractRequest
  numTokens?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface OwnerPerTokenContract_filter {
  id?: ID | null
  id_not?: ID | null
  id_gt?: ID | null
  id_lt?: ID | null
  id_gte?: ID | null
  id_lte?: ID | null
  id_in?: ID[] | null
  id_not_in?: ID[] | null
  owner?: String | null
  owner_not?: String | null
  owner_gt?: String | null
  owner_lt?: String | null
  owner_gte?: String | null
  owner_lte?: String | null
  owner_in?: String[] | null
  owner_not_in?: String[] | null
  owner_contains?: String | null
  owner_not_contains?: String | null
  owner_starts_with?: String | null
  owner_not_starts_with?: String | null
  owner_ends_with?: String | null
  owner_not_ends_with?: String | null
  contract?: String | null
  contract_not?: String | null
  contract_gt?: String | null
  contract_lt?: String | null
  contract_gte?: String | null
  contract_lte?: String | null
  contract_in?: String[] | null
  contract_not_in?: String[] | null
  contract_contains?: String | null
  contract_not_contains?: String | null
  contract_starts_with?: String | null
  contract_not_starts_with?: String | null
  contract_ends_with?: String | null
  contract_not_ends_with?: String | null
  numTokens?: BigInt | null
  numTokens_not?: BigInt | null
  numTokens_gt?: BigInt | null
  numTokens_lt?: BigInt | null
  numTokens_gte?: BigInt | null
  numTokens_lte?: BigInt | null
  numTokens_in?: BigInt[] | null
  numTokens_not_in?: BigInt[] | null
}

/** The type for the top-level _meta field */
export interface _Meta_Request {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block?: _Block_Request
  /** The deployment ID */
  deployment?: boolean | number
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface _Block_Request {
  /** The hash of the block */
  hash?: boolean | number
  /** The block number */
  number?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface SubscriptionRequest {
  all?: [
    {
      id: ID
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    AllRequest
  ]
  alls?: [
    {
      skip?: Int | null
      first?: Int | null
      orderBy?: All_orderBy | null
      orderDirection?: OrderDirection | null
      where?: All_filter | null
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    AllRequest
  ]
  token?: [
    {
      id: ID
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    TokenRequest
  ]
  tokens?: [
    {
      skip?: Int | null
      first?: Int | null
      orderBy?: Token_orderBy | null
      orderDirection?: OrderDirection | null
      where?: Token_filter | null
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    TokenRequest
  ]
  tokenContract?: [
    {
      id: ID
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    TokenContractRequest
  ]
  tokenContracts?: [
    {
      skip?: Int | null
      first?: Int | null
      orderBy?: TokenContract_orderBy | null
      orderDirection?: OrderDirection | null
      where?: TokenContract_filter | null
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    TokenContractRequest
  ]
  owner?: [
    {
      id: ID
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    OwnerRequest
  ]
  owners?: [
    {
      skip?: Int | null
      first?: Int | null
      orderBy?: Owner_orderBy | null
      orderDirection?: OrderDirection | null
      where?: Owner_filter | null
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    OwnerRequest
  ]
  ownerPerTokenContract?: [
    {
      id: ID
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    OwnerPerTokenContractRequest
  ]
  ownerPerTokenContracts?: [
    {
      skip?: Int | null
      first?: Int | null
      orderBy?: OwnerPerTokenContract_orderBy | null
      orderDirection?: OrderDirection | null
      where?: OwnerPerTokenContract_filter | null
      /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
      block?: Block_height | null
    },
    OwnerPerTokenContractRequest
  ]
  /** Access to subgraph metadata */
  _meta?: [{ block?: Block_height | null }, _Meta_Request] | _Meta_Request
  __typename?: boolean | number
  __scalar?: boolean | number
}

const Query_possibleTypes = ['Query']
export const isQuery = (obj: { __typename: String }): obj is Query => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Query_possibleTypes.includes(obj.__typename)
}

const All_possibleTypes = ['All']
export const isAll = (obj: { __typename: String }): obj is All => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return All_possibleTypes.includes(obj.__typename)
}

const Token_possibleTypes = ['Token']
export const isToken = (obj: { __typename: String }): obj is Token => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Token_possibleTypes.includes(obj.__typename)
}

const TokenContract_possibleTypes = ['TokenContract']
export const isTokenContract = (obj: {
  __typename: String
}): obj is TokenContract => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TokenContract_possibleTypes.includes(obj.__typename)
}

const Owner_possibleTypes = ['Owner']
export const isOwner = (obj: { __typename: String }): obj is Owner => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Owner_possibleTypes.includes(obj.__typename)
}

const OwnerPerTokenContract_possibleTypes = ['OwnerPerTokenContract']
export const isOwnerPerTokenContract = (obj: {
  __typename: String
}): obj is OwnerPerTokenContract => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return OwnerPerTokenContract_possibleTypes.includes(obj.__typename)
}

const _Meta__possibleTypes = ['_Meta_']
export const is_Meta_ = (obj: { __typename: String }): obj is _Meta_ => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return _Meta__possibleTypes.includes(obj.__typename)
}

const _Block__possibleTypes = ['_Block_']
export const is_Block_ = (obj: { __typename: String }): obj is _Block_ => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return _Block__possibleTypes.includes(obj.__typename)
}

const Subscription_possibleTypes = ['Subscription']
export const isSubscription = (obj: {
  __typename: String
}): obj is Subscription => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Subscription_possibleTypes.includes(obj.__typename)
}

export interface QueryPromiseChain {
  all: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => AllPromiseChain & {
    execute: (
      request: AllRequest,
      defaultValue?: All | null
    ) => Promise<All | null>
  }
  alls: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: All_orderBy | null
    orderDirection?: OrderDirection | null
    where?: All_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (request: AllRequest, defaultValue?: All[]) => Promise<All[]>
  }) & {
    execute: (request: AllRequest, defaultValue?: All[]) => Promise<All[]>
  }
  token: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => TokenPromiseChain & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token | null
    ) => Promise<Token | null>
  }
  tokens: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Token_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Token_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (request: TokenRequest, defaultValue?: Token[]) => Promise<Token[]>
  }) & {
    execute: (request: TokenRequest, defaultValue?: Token[]) => Promise<Token[]>
  }
  tokenContract: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => TokenContractPromiseChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Promise<TokenContract | null>
  }
  tokenContracts: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: TokenContract_orderBy | null
    orderDirection?: OrderDirection | null
    where?: TokenContract_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract[]
    ) => Promise<TokenContract[]>
  }) & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract[]
    ) => Promise<TokenContract[]>
  }
  owner: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => OwnerPromiseChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Promise<Owner | null>
  }
  owners: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Owner_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Owner_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (request: OwnerRequest, defaultValue?: Owner[]) => Promise<Owner[]>
  }) & {
    execute: (request: OwnerRequest, defaultValue?: Owner[]) => Promise<Owner[]>
  }
  ownerPerTokenContract: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => OwnerPerTokenContractPromiseChain & {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract | null
    ) => Promise<OwnerPerTokenContract | null>
  }
  ownerPerTokenContracts: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: OwnerPerTokenContract_orderBy | null
    orderDirection?: OrderDirection | null
    where?: OwnerPerTokenContract_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract[]
    ) => Promise<OwnerPerTokenContract[]>
  }) & {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract[]
    ) => Promise<OwnerPerTokenContract[]>
  }
  /** Access to subgraph metadata */
  _meta: ((args?: {
    block?: Block_height | null
  }) => _Meta_PromiseChain & {
    execute: (
      request: _Meta_Request,
      defaultValue?: _Meta_ | null
    ) => Promise<_Meta_ | null>
  }) &
    (_Meta_PromiseChain & {
      execute: (
        request: _Meta_Request,
        defaultValue?: _Meta_ | null
      ) => Promise<_Meta_ | null>
    })
}

export interface QueryObservableChain {
  all: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => AllObservableChain & {
    execute: (
      request: AllRequest,
      defaultValue?: All | null
    ) => Observable<All | null>
  }
  alls: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: All_orderBy | null
    orderDirection?: OrderDirection | null
    where?: All_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (request: AllRequest, defaultValue?: All[]) => Observable<All[]>
  }) & {
    execute: (request: AllRequest, defaultValue?: All[]) => Observable<All[]>
  }
  token: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => TokenObservableChain & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token | null
    ) => Observable<Token | null>
  }
  tokens: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Token_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Token_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: TokenRequest,
      defaultValue?: Token[]
    ) => Observable<Token[]>
  }) & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token[]
    ) => Observable<Token[]>
  }
  tokenContract: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => TokenContractObservableChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Observable<TokenContract | null>
  }
  tokenContracts: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: TokenContract_orderBy | null
    orderDirection?: OrderDirection | null
    where?: TokenContract_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract[]
    ) => Observable<TokenContract[]>
  }) & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract[]
    ) => Observable<TokenContract[]>
  }
  owner: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => OwnerObservableChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Observable<Owner | null>
  }
  owners: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Owner_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Owner_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner[]
    ) => Observable<Owner[]>
  }) & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner[]
    ) => Observable<Owner[]>
  }
  ownerPerTokenContract: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => OwnerPerTokenContractObservableChain & {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract | null
    ) => Observable<OwnerPerTokenContract | null>
  }
  ownerPerTokenContracts: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: OwnerPerTokenContract_orderBy | null
    orderDirection?: OrderDirection | null
    where?: OwnerPerTokenContract_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract[]
    ) => Observable<OwnerPerTokenContract[]>
  }) & {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract[]
    ) => Observable<OwnerPerTokenContract[]>
  }
  /** Access to subgraph metadata */
  _meta: ((args?: { block?: Block_height | null }) => _Meta_ObservableChain & {
    execute: (
      request: _Meta_Request,
      defaultValue?: _Meta_ | null
    ) => Observable<_Meta_ | null>
  }) &
    (_Meta_ObservableChain & {
      execute: (
        request: _Meta_Request,
        defaultValue?: _Meta_ | null
      ) => Observable<_Meta_ | null>
    })
}

export interface AllPromiseChain {
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  numTokenContracts: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Promise<BigInt>
  }
  numTokens: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Promise<BigInt>
  }
  numOwners: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Promise<BigInt>
  }
}

export interface AllObservableChain {
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  numTokenContracts: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Observable<BigInt>
  }
  numTokens: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Observable<BigInt>
  }
  numOwners: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Observable<BigInt>
  }
}

export interface TokenPromiseChain {
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  contract: TokenContractPromiseChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract
    ) => Promise<TokenContract>
  }
  tokenID: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Promise<BigInt>
  }
  owner: OwnerPromiseChain & {
    execute: (request: OwnerRequest, defaultValue?: Owner) => Promise<Owner>
  }
  mintTime: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Promise<BigInt>
  }
  tokenURI: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  blockNumber: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Promise<BigInt>
  }
  blockHash: {
    execute: (
      request?: boolean | number,
      defaultValue?: Bytes
    ) => Promise<Bytes>
  }
}

export interface TokenObservableChain {
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  contract: TokenContractObservableChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract
    ) => Observable<TokenContract>
  }
  tokenID: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Observable<BigInt>
  }
  owner: OwnerObservableChain & {
    execute: (request: OwnerRequest, defaultValue?: Owner) => Observable<Owner>
  }
  mintTime: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Observable<BigInt>
  }
  tokenURI: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  blockNumber: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Observable<BigInt>
  }
  blockHash: {
    execute: (
      request?: boolean | number,
      defaultValue?: Bytes
    ) => Observable<Bytes>
  }
}

export interface TokenContractPromiseChain {
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
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
  doAllAddressesOwnTheirIdByDefault: {
    execute: (
      request?: boolean | number,
      defaultValue?: Boolean
    ) => Promise<Boolean>
  }
  supportsEIP721Metadata: {
    execute: (
      request?: boolean | number,
      defaultValue?: Boolean
    ) => Promise<Boolean>
  }
  tokens: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Token_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Token_filter | null
  }) => {
    execute: (request: TokenRequest, defaultValue?: Token[]) => Promise<Token[]>
  }) & {
    execute: (request: TokenRequest, defaultValue?: Token[]) => Promise<Token[]>
  }
  numTokens: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Promise<BigInt>
  }
  numOwners: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Promise<BigInt>
  }
}

export interface TokenContractObservableChain {
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
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
  doAllAddressesOwnTheirIdByDefault: {
    execute: (
      request?: boolean | number,
      defaultValue?: Boolean
    ) => Observable<Boolean>
  }
  supportsEIP721Metadata: {
    execute: (
      request?: boolean | number,
      defaultValue?: Boolean
    ) => Observable<Boolean>
  }
  tokens: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Token_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Token_filter | null
  }) => {
    execute: (
      request: TokenRequest,
      defaultValue?: Token[]
    ) => Observable<Token[]>
  }) & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token[]
    ) => Observable<Token[]>
  }
  numTokens: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Observable<BigInt>
  }
  numOwners: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Observable<BigInt>
  }
}

export interface OwnerPromiseChain {
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  tokens: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Token_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Token_filter | null
  }) => {
    execute: (request: TokenRequest, defaultValue?: Token[]) => Promise<Token[]>
  }) & {
    execute: (request: TokenRequest, defaultValue?: Token[]) => Promise<Token[]>
  }
  numTokens: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Promise<BigInt>
  }
}

export interface OwnerObservableChain {
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  tokens: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Token_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Token_filter | null
  }) => {
    execute: (
      request: TokenRequest,
      defaultValue?: Token[]
    ) => Observable<Token[]>
  }) & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token[]
    ) => Observable<Token[]>
  }
  numTokens: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Observable<BigInt>
  }
}

export interface OwnerPerTokenContractPromiseChain {
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  owner: OwnerPromiseChain & {
    execute: (request: OwnerRequest, defaultValue?: Owner) => Promise<Owner>
  }
  contract: TokenContractPromiseChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract
    ) => Promise<TokenContract>
  }
  numTokens: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Promise<BigInt>
  }
}

export interface OwnerPerTokenContractObservableChain {
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  owner: OwnerObservableChain & {
    execute: (request: OwnerRequest, defaultValue?: Owner) => Observable<Owner>
  }
  contract: TokenContractObservableChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract
    ) => Observable<TokenContract>
  }
  numTokens: {
    execute: (
      request?: boolean | number,
      defaultValue?: BigInt
    ) => Observable<BigInt>
  }
}

/** The type for the top-level _meta field */
export interface _Meta_PromiseChain {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_PromiseChain & {
    execute: (
      request: _Block_Request,
      defaultValue?: _Block_
    ) => Promise<_Block_>
  }
  /** The deployment ID */
  deployment: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: {
    execute: (
      request?: boolean | number,
      defaultValue?: Boolean
    ) => Promise<Boolean>
  }
}

/** The type for the top-level _meta field */
export interface _Meta_ObservableChain {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_ObservableChain & {
    execute: (
      request: _Block_Request,
      defaultValue?: _Block_
    ) => Observable<_Block_>
  }
  /** The deployment ID */
  deployment: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: {
    execute: (
      request?: boolean | number,
      defaultValue?: Boolean
    ) => Observable<Boolean>
  }
}

export interface _Block_PromiseChain {
  /** The hash of the block */
  hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: Bytes | null
    ) => Promise<Bytes | null>
  }
  /** The block number */
  number: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
}

export interface _Block_ObservableChain {
  /** The hash of the block */
  hash: {
    execute: (
      request?: boolean | number,
      defaultValue?: Bytes | null
    ) => Observable<Bytes | null>
  }
  /** The block number */
  number: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
}

export interface SubscriptionPromiseChain {
  all: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => AllPromiseChain & {
    execute: (
      request: AllRequest,
      defaultValue?: All | null
    ) => Promise<All | null>
  }
  alls: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: All_orderBy | null
    orderDirection?: OrderDirection | null
    where?: All_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (request: AllRequest, defaultValue?: All[]) => Promise<All[]>
  }) & {
    execute: (request: AllRequest, defaultValue?: All[]) => Promise<All[]>
  }
  token: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => TokenPromiseChain & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token | null
    ) => Promise<Token | null>
  }
  tokens: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Token_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Token_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (request: TokenRequest, defaultValue?: Token[]) => Promise<Token[]>
  }) & {
    execute: (request: TokenRequest, defaultValue?: Token[]) => Promise<Token[]>
  }
  tokenContract: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => TokenContractPromiseChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Promise<TokenContract | null>
  }
  tokenContracts: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: TokenContract_orderBy | null
    orderDirection?: OrderDirection | null
    where?: TokenContract_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract[]
    ) => Promise<TokenContract[]>
  }) & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract[]
    ) => Promise<TokenContract[]>
  }
  owner: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => OwnerPromiseChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Promise<Owner | null>
  }
  owners: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Owner_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Owner_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (request: OwnerRequest, defaultValue?: Owner[]) => Promise<Owner[]>
  }) & {
    execute: (request: OwnerRequest, defaultValue?: Owner[]) => Promise<Owner[]>
  }
  ownerPerTokenContract: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => OwnerPerTokenContractPromiseChain & {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract | null
    ) => Promise<OwnerPerTokenContract | null>
  }
  ownerPerTokenContracts: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: OwnerPerTokenContract_orderBy | null
    orderDirection?: OrderDirection | null
    where?: OwnerPerTokenContract_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract[]
    ) => Promise<OwnerPerTokenContract[]>
  }) & {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract[]
    ) => Promise<OwnerPerTokenContract[]>
  }
  /** Access to subgraph metadata */
  _meta: ((args?: {
    block?: Block_height | null
  }) => _Meta_PromiseChain & {
    execute: (
      request: _Meta_Request,
      defaultValue?: _Meta_ | null
    ) => Promise<_Meta_ | null>
  }) &
    (_Meta_PromiseChain & {
      execute: (
        request: _Meta_Request,
        defaultValue?: _Meta_ | null
      ) => Promise<_Meta_ | null>
    })
}

export interface SubscriptionObservableChain {
  all: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => AllObservableChain & {
    execute: (
      request: AllRequest,
      defaultValue?: All | null
    ) => Observable<All | null>
  }
  alls: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: All_orderBy | null
    orderDirection?: OrderDirection | null
    where?: All_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (request: AllRequest, defaultValue?: All[]) => Observable<All[]>
  }) & {
    execute: (request: AllRequest, defaultValue?: All[]) => Observable<All[]>
  }
  token: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => TokenObservableChain & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token | null
    ) => Observable<Token | null>
  }
  tokens: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Token_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Token_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: TokenRequest,
      defaultValue?: Token[]
    ) => Observable<Token[]>
  }) & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token[]
    ) => Observable<Token[]>
  }
  tokenContract: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => TokenContractObservableChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Observable<TokenContract | null>
  }
  tokenContracts: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: TokenContract_orderBy | null
    orderDirection?: OrderDirection | null
    where?: TokenContract_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract[]
    ) => Observable<TokenContract[]>
  }) & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract[]
    ) => Observable<TokenContract[]>
  }
  owner: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => OwnerObservableChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Observable<Owner | null>
  }
  owners: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: Owner_orderBy | null
    orderDirection?: OrderDirection | null
    where?: Owner_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner[]
    ) => Observable<Owner[]>
  }) & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner[]
    ) => Observable<Owner[]>
  }
  ownerPerTokenContract: (args: {
    id: ID
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => OwnerPerTokenContractObservableChain & {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract | null
    ) => Observable<OwnerPerTokenContract | null>
  }
  ownerPerTokenContracts: ((args?: {
    skip?: Int | null
    first?: Int | null
    orderBy?: OwnerPerTokenContract_orderBy | null
    orderDirection?: OrderDirection | null
    where?: OwnerPerTokenContract_filter | null
    /** The block at which the query should be executed. Can either be an `{ number: Int }` containing the block number or a `{ hash: Bytes }` value containing a block hash. Defaults to the latest block when omitted. */
    block?: Block_height | null
  }) => {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract[]
    ) => Observable<OwnerPerTokenContract[]>
  }) & {
    execute: (
      request: OwnerPerTokenContractRequest,
      defaultValue?: OwnerPerTokenContract[]
    ) => Observable<OwnerPerTokenContract[]>
  }
  /** Access to subgraph metadata */
  _meta: ((args?: { block?: Block_height | null }) => _Meta_ObservableChain & {
    execute: (
      request: _Meta_Request,
      defaultValue?: _Meta_ | null
    ) => Observable<_Meta_ | null>
  }) &
    (_Meta_ObservableChain & {
      execute: (
        request: _Meta_Request,
        defaultValue?: _Meta_ | null
      ) => Observable<_Meta_ | null>
    })
}
