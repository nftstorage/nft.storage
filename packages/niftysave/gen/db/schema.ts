import { Observable } from 'graphql-typed-client'

export interface Query {
  /** Find a document from the collection of 'Block' by its id. */
  findBlockByID: Block | null
  /** Find a document from the collection of 'TokenContract' by its id. */
  findTokenContractByID: TokenContract | null
  constract: TokenContract | null
  /** Provides tokens with the */
  findTokenAssets: QueryFindTokenAssetsPage
  /** Find a document from the collection of 'Resource' by its id. */
  findResourceByID: Resource | null
  /** Find a document from the collection of 'Token' by its id. */
  findTokenByID: Token | null
  allImports: ERC721ImportResultPage
  /** Find a document from the collection of 'Owner' by its id. */
  findOwnerByID: Owner | null
  /** Find a document from the collection of 'ERC721ImportResult' by its id. */
  findERC721ImportResultByID: ERC721ImportResult | null
  cursor: Cursor
  /** Find a document from the collection of 'Metadata' by its id. */
  findMetadataByID: Metadata | null
  /** Find a document from the collection of 'Task' by its id. */
  findTaskByID: Task | null
  block: Block | null
  /** Find a document from the collection of 'Cursor' by its id. */
  findCursorByID: Cursor | null
  findResources: QueryFindResourcesPage
  /** Find a document from the collection of 'TokenAsset' by its id. */
  findTokenAssetByID: TokenAsset | null
  tokens: TokenPage
  owner: Owner | null
  allTokens: TokenPage
  __typename: 'Query'
}

/** The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID. */
export type ID = string

export interface Block {
  /** The block number */
  number: Long
  /** The document's ID. */
  _id: ID
  /** The hash of the block */
  hash: ID
  tokens: TokenPage
  /** The document's timestamp. */
  _ts: Long
  __typename: 'Block'
}

/** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
export type Long = any

/** The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. */
export type Int = number

/** The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text. */
export type String = string

/** The pagination object for elements of type 'Token'. */
export interface TokenPage {
  /** The elements of type 'Token' in this page. */
  data: (Token | null)[]
  /** A cursor for elements coming after the current page. */
  after: String | null
  /** A cursor for elements coming before the current page. */
  before: String | null
  __typename: 'TokenPage'
}

export interface Token {
  blocks: BlockPage
  /** The document's ID. */
  _id: ID
  mintTime: String
  id: String
  imported: ERC721ImportResultPage
  tokenID: String
  owner: Owner
  /** Present when ERC721Metadata interface is implemented. */
  tokenAsset: TokenAsset | null
  contract: TokenContract
  /** The document's timestamp. */
  _ts: Long
  __typename: 'Token'
}

/** The pagination object for elements of type 'Block'. */
export interface BlockPage {
  /** The elements of type 'Block' in this page. */
  data: (Block | null)[]
  /** A cursor for elements coming after the current page. */
  after: String | null
  /** A cursor for elements coming before the current page. */
  before: String | null
  __typename: 'BlockPage'
}

/** The pagination object for elements of type 'ERC721ImportResult'. */
export interface ERC721ImportResultPage {
  /** The elements of type 'ERC721ImportResult' in this page. */
  data: (ERC721ImportResult | null)[]
  /** A cursor for elements coming after the current page. */
  after: String | null
  /** A cursor for elements coming before the current page. */
  before: String | null
  __typename: 'ERC721ImportResultPage'
}

export interface ERC721ImportResult {
  /** The document's ID. */
  _id: ID
  /** New cursor after this import. */
  nextID: String
  /** Cursor from which import started. */
  id: String
  /** Tokens that were imported. */
  tokens: TokenPage
  /** The document's timestamp. */
  _ts: Long
  __typename: 'ERC721ImportResult'
}

export interface Owner {
  /** The document's ID. */
  _id: ID
  /** The document's timestamp. */
  _ts: Long
  id: ID
  __typename: 'Owner'
}

export interface TokenAsset {
  /** Problem description if failed to get the metadata. */
  problem: String | null
  /** The document's ID. */
  _id: ID
  tokenURI: String
  /**
   * When `tokenURI` points to may point to JSON file that conforms to the ERC721
   * Metadata JSON Schema it fetched parsed and stored as related Metadata
   * document.
   */
  metadata: Metadata | null
  /**
   * CID of an IPLD node that encapsulates token metadata and all it's assets.
   * Present when it was passibly to succesfully pin the token.
   */
  ipnft: String | null
  /**
   * Multiple tokens may have use a same `tokenURI`. This relation allows tracking
   * which tokens refer to the same `tokenURI`.
   * Token this metadata belogs to.
   */
  referrers: TokenPage
  /** The document's timestamp. */
  _ts: Long
  __typename: 'TokenAsset'
}

export interface Metadata {
  /** Identifies the asset this token represents */
  name: String
  source: TokenAsset
  assets: ResourcePage
  /** A file representing the asset this token represents */
  image: Resource
  /** Describes the asset this token represents */
  description: String
  /** The document's ID. */
  _id: ID
  cid: String
  /** The document's timestamp. */
  _ts: Long
  __typename: 'Metadata'
}

/** The pagination object for elements of type 'Resource'. */
export interface ResourcePage {
  /** The elements of type 'Resource' in this page. */
  data: (Resource | null)[]
  /** A cursor for elements coming after the current page. */
  after: String | null
  /** A cursor for elements coming before the current page. */
  before: String | null
  __typename: 'ResourcePage'
}

export interface Resource {
  /** Problem description if there was problem in pinning a resource. */
  problem: String | null
  /** The document's ID. */
  _id: ID
  /** URI with which resource was identified. */
  uri: String
  /** CID that corresponds to this resource, set once resourec is pinned. */
  cid: String | null
  /** ipfs:// url if `uri` was referring to gateway URL. */
  ipfsURL: String | null
  status: ResourceStatus
  referrers: MetadataPage
  /** The document's timestamp. */
  _ts: Long
  __typename: 'Resource'
}

export enum ResourceStatus {
  /** Has not been processed yet */
  Idle = 'Idle',
  /**
   * Pin request started. This usually implies that we found a CID in the
   * tokenURI (because it was a gateway URL) so we started a pin but do not
   * know if it was possible to fetch content.
   */
  PinQueued = 'PinQueued',
  /** Was pinned succesfully */
  Pinned = 'Pinned',
  /** tokenURI is either malformed or the protocol is not supported. */
  FailedURIParse = 'FailedURIParse',
  /** Was unable to fetch the content. */
  FailedFetch = 'FailedFetch',
  /**
   * Pin request failed, can happen when pinned by CID but correspoding content
   * is not on the network.
   */
  PinFailure = 'PinFailure',
}

/** The pagination object for elements of type 'Metadata'. */
export interface MetadataPage {
  /** The elements of type 'Metadata' in this page. */
  data: (Metadata | null)[]
  /** A cursor for elements coming after the current page. */
  after: String | null
  /** A cursor for elements coming before the current page. */
  before: String | null
  __typename: 'MetadataPage'
}

export interface TokenContract {
  /** A descriptive name for a collection of NFTs in this contract */
  name: String | null
  /** The document's ID. */
  _id: ID
  /** An abbreviated name for NFTs in this contract */
  symbol: String | null
  id: ID
  supportsEIP721Metadata: Boolean
  tokens: TokenPage
  /** The document's timestamp. */
  _ts: Long
  __typename: 'TokenContract'
}

/** The `Boolean` scalar type represents `true` or `false`. */
export type Boolean = boolean

export enum TokenAssetStatus {
  Queued = 'Queued',
  Failed = 'Failed',
  Succeeded = 'Succeeded',
}

/** The pagination object for elements of type 'TokenAsset'. */
export interface QueryFindTokenAssetsPage {
  /** The elements of type 'TokenAsset' in this page. */
  data: (TokenAsset | null)[]
  /** A cursor for elements coming after the current page. */
  after: String | null
  /** A cursor for elements coming before the current page. */
  before: String | null
  __typename: 'QueryFindTokenAssetsPage'
}

export interface Cursor {
  /** The document's ID. */
  _id: ID
  /** The document's timestamp. */
  _ts: Long
  id: String
  __typename: 'Cursor'
}

/**
 * Describen an operation that may fail, like an HTTP
 * request or a JSON parse.
 *
 * Fauna does not support union types so we get by using a
 * single struct represeting union:
 * type Task =
 *   | { status: 'idle', attempt: int }
 *   | { status: 'queued' attempt: int }
 *   | { status: 'pending', start: Time, attempt: int }
 *   | { status: 'failed', end: Time, error: String, attempt: int }
 *   | { status: 'done', end: Time, attempt: int }
 */
export interface Task {
  /** The document's ID. */
  _id: ID
  /** Error message in cas task failed */
  error: String | null
  /** Status of the task */
  status: String
  /** Time at which task failed */
  end: Time | null
  /**
   * An attempt number. Usuallly 1, but could be greater
   * on retries
   */
  attempt: Int
  /** Time at which task started */
  start: Time | null
  /** The document's timestamp. */
  _ts: Long
  __typename: 'Task'
}

export type Time = any

/** The pagination object for elements of type 'Resource'. */
export interface QueryFindResourcesPage {
  /** The elements of type 'Resource' in this page. */
  data: (Resource | null)[]
  /** A cursor for elements coming after the current page. */
  after: String | null
  /** A cursor for elements coming before the current page. */
  before: String | null
  __typename: 'QueryFindResourcesPage'
}

export interface Mutation {
  /** Delete an existing document in the collection of 'Owner' */
  deleteOwner: Owner | null
  /** Delete an existing document in the collection of 'TokenAsset' */
  deleteTokenAsset: TokenAsset | null
  /** Create a new document in the collection of 'Metadata' */
  createMetadata: Metadata
  /** Delete an existing document in the collection of 'Token' */
  deleteToken: Token | null
  /** Update an existing document in the collection of 'Task' */
  updateTask: Task | null
  /** Create a new document in the collection of 'Block' */
  createBlock: Block
  /**
   * Imports Token Metadata. Will be rejected if corresponding asset status isn't
   * Queued. Otherwise updates corresponding TokenAsset transitioning it to
   * Succeeded state.
   */
  importTokenMetadata: Metadata
  /** Delete an existing document in the collection of 'ERC721ImportResult' */
  deleteERC721ImportResult: ERC721ImportResult | null
  /** Update an existing document in the collection of 'Metadata' */
  updateMetadata: Metadata | null
  /** Create a new document in the collection of 'TokenContract' */
  createTokenContract: TokenContract
  /** Create a new document in the collection of 'Resource' */
  createResource: Resource
  /** Update an existing document in the collection of 'Cursor' */
  updateCursor: Cursor | null
  /** Create a new document in the collection of 'Token' */
  createToken: Token
  /** Delete an existing document in the collection of 'Cursor' */
  deleteCursor: Cursor | null
  reportResourceProblem: Resource
  importERC721: ERC721ImportResult
  /** Update an existing document in the collection of 'TokenContract' */
  updateTokenContract: TokenContract | null
  /** Delete an existing document in the collection of 'Resource' */
  deleteResource: Resource | null
  /** Update an existing document in the collection of 'Owner' */
  updateOwner: Owner | null
  /** Update an existing document in the collection of 'TokenAsset' */
  updateTokenAsset: TokenAsset | null
  /** Delete an existing document in the collection of 'Block' */
  deleteBlock: Block | null
  /** Create a new document in the collection of 'TokenAsset' */
  createTokenAsset: TokenAsset
  /** Create a new document in the collection of 'Cursor' */
  createCursor: Cursor
  /** Create a new document in the collection of 'Task' */
  createTask: Task
  /** Update an existing document in the collection of 'Token' */
  updateToken: Token | null
  /** Delete an existing document in the collection of 'Task' */
  deleteTask: Task | null
  /** Create a new document in the collection of 'ERC721ImportResult' */
  createERC721ImportResult: ERC721ImportResult
  /** Delete an existing document in the collection of 'TokenContract' */
  deleteTokenContract: TokenContract | null
  /** Create a new document in the collection of 'Owner' */
  createOwner: Owner
  /** Update an existing document in the collection of 'Resource' */
  updateResource: Resource | null
  updateResourcePin: Resource
  /** Delete an existing document in the collection of 'Metadata' */
  deleteMetadata: Metadata | null
  /** Update an existing document in the collection of 'Block' */
  updateBlock: Block | null
  /**
   * Reports problem with a TokenAsset e.g. it was impossible to parse URI
   * or was unable to fetch content from URI, or content was not a JSON.
   *
   * Call is rejected if status isn't Queued.
   */
  reportTokenAssetProblem: TokenAsset
  /** Update an existing document in the collection of 'ERC721ImportResult' */
  updateERC721ImportResult: ERC721ImportResult | null
  __typename: 'Mutation'
}

export type Date = any

export interface QueryRequest {
  /** Find a document from the collection of 'Block' by its id. */
  findBlockByID?: [
    {
      /** The 'Block' document's ID */
      id: ID
    },
    BlockRequest
  ]
  /** Find a document from the collection of 'TokenContract' by its id. */
  findTokenContractByID?: [
    {
      /** The 'TokenContract' document's ID */
      id: ID
    },
    TokenContractRequest
  ]
  constract?: [{ id?: ID | null }, TokenContractRequest] | TokenContractRequest
  /** Provides tokens with the */
  findTokenAssets?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
          where?: FindTokenAssetsInput | null
        },
        QueryFindTokenAssetsPageRequest
      ]
    | QueryFindTokenAssetsPageRequest
  /** Find a document from the collection of 'Resource' by its id. */
  findResourceByID?: [
    {
      /** The 'Resource' document's ID */
      id: ID
    },
    ResourceRequest
  ]
  /** Find a document from the collection of 'Token' by its id. */
  findTokenByID?: [
    {
      /** The 'Token' document's ID */
      id: ID
    },
    TokenRequest
  ]
  allImports?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        ERC721ImportResultPageRequest
      ]
    | ERC721ImportResultPageRequest
  /** Find a document from the collection of 'Owner' by its id. */
  findOwnerByID?: [
    {
      /** The 'Owner' document's ID */
      id: ID
    },
    OwnerRequest
  ]
  /** Find a document from the collection of 'ERC721ImportResult' by its id. */
  findERC721ImportResultByID?: [
    {
      /** The 'ERC721ImportResult' document's ID */
      id: ID
    },
    ERC721ImportResultRequest
  ]
  cursor?: CursorRequest
  /** Find a document from the collection of 'Metadata' by its id. */
  findMetadataByID?: [
    {
      /** The 'Metadata' document's ID */
      id: ID
    },
    MetadataRequest
  ]
  /** Find a document from the collection of 'Task' by its id. */
  findTaskByID?: [
    {
      /** The 'Task' document's ID */
      id: ID
    },
    TaskRequest
  ]
  block?:
    | [{ hash?: ID | null; number?: Long | null }, BlockRequest]
    | BlockRequest
  /** Find a document from the collection of 'Cursor' by its id. */
  findCursorByID?: [
    {
      /** The 'Cursor' document's ID */
      id: ID
    },
    CursorRequest
  ]
  findResources?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
          where?: FindResourceInput | null
        },
        QueryFindResourcesPageRequest
      ]
    | QueryFindResourcesPageRequest
  /** Find a document from the collection of 'TokenAsset' by its id. */
  findTokenAssetByID?: [
    {
      /** The 'TokenAsset' document's ID */
      id: ID
    },
    TokenAssetRequest
  ]
  tokens?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
          tokenID?: String | null
          mintTime?: String | null
        },
        TokenPageRequest
      ]
    | TokenPageRequest
  owner?: [{ id?: ID | null }, OwnerRequest] | OwnerRequest
  allTokens?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        TokenPageRequest
      ]
    | TokenPageRequest
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface BlockRequest {
  /** The block number */
  number?: boolean | number
  /** The document's ID. */
  _id?: boolean | number
  /** The hash of the block */
  hash?: boolean | number
  tokens?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        TokenPageRequest
      ]
    | TokenPageRequest
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** The pagination object for elements of type 'Token'. */
export interface TokenPageRequest {
  /** The elements of type 'Token' in this page. */
  data?: TokenRequest
  /** A cursor for elements coming after the current page. */
  after?: boolean | number
  /** A cursor for elements coming before the current page. */
  before?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TokenRequest {
  blocks?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        BlockPageRequest
      ]
    | BlockPageRequest
  /** The document's ID. */
  _id?: boolean | number
  mintTime?: boolean | number
  id?: boolean | number
  imported?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        ERC721ImportResultPageRequest
      ]
    | ERC721ImportResultPageRequest
  tokenID?: boolean | number
  owner?: OwnerRequest
  /** Present when ERC721Metadata interface is implemented. */
  tokenAsset?: TokenAssetRequest
  contract?: TokenContractRequest
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** The pagination object for elements of type 'Block'. */
export interface BlockPageRequest {
  /** The elements of type 'Block' in this page. */
  data?: BlockRequest
  /** A cursor for elements coming after the current page. */
  after?: boolean | number
  /** A cursor for elements coming before the current page. */
  before?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** The pagination object for elements of type 'ERC721ImportResult'. */
export interface ERC721ImportResultPageRequest {
  /** The elements of type 'ERC721ImportResult' in this page. */
  data?: ERC721ImportResultRequest
  /** A cursor for elements coming after the current page. */
  after?: boolean | number
  /** A cursor for elements coming before the current page. */
  before?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ERC721ImportResultRequest {
  /** The document's ID. */
  _id?: boolean | number
  /** New cursor after this import. */
  nextID?: boolean | number
  /** Cursor from which import started. */
  id?: boolean | number
  /** Tokens that were imported. */
  tokens?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        TokenPageRequest
      ]
    | TokenPageRequest
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface OwnerRequest {
  /** The document's ID. */
  _id?: boolean | number
  /** The document's timestamp. */
  _ts?: boolean | number
  id?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TokenAssetRequest {
  /** Problem description if failed to get the metadata. */
  problem?: boolean | number
  /** The document's ID. */
  _id?: boolean | number
  tokenURI?: boolean | number
  /**
   * When `tokenURI` points to may point to JSON file that conforms to the ERC721
   * Metadata JSON Schema it fetched parsed and stored as related Metadata
   * document.
   */
  metadata?: MetadataRequest
  /**
   * CID of an IPLD node that encapsulates token metadata and all it's assets.
   * Present when it was passibly to succesfully pin the token.
   */
  ipnft?: boolean | number
  /**
   * Multiple tokens may have use a same `tokenURI`. This relation allows tracking
   * which tokens refer to the same `tokenURI`.
   * Token this metadata belogs to.
   */
  referrers?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        TokenPageRequest
      ]
    | TokenPageRequest
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MetadataRequest {
  /** Identifies the asset this token represents */
  name?: boolean | number
  source?: TokenAssetRequest
  assets?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        ResourcePageRequest
      ]
    | ResourcePageRequest
  /** A file representing the asset this token represents */
  image?: ResourceRequest
  /** Describes the asset this token represents */
  description?: boolean | number
  /** The document's ID. */
  _id?: boolean | number
  cid?: boolean | number
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** The pagination object for elements of type 'Resource'. */
export interface ResourcePageRequest {
  /** The elements of type 'Resource' in this page. */
  data?: ResourceRequest
  /** A cursor for elements coming after the current page. */
  after?: boolean | number
  /** A cursor for elements coming before the current page. */
  before?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface ResourceRequest {
  /** Problem description if there was problem in pinning a resource. */
  problem?: boolean | number
  /** The document's ID. */
  _id?: boolean | number
  /** URI with which resource was identified. */
  uri?: boolean | number
  /** CID that corresponds to this resource, set once resourec is pinned. */
  cid?: boolean | number
  /** ipfs:// url if `uri` was referring to gateway URL. */
  ipfsURL?: boolean | number
  status?: boolean | number
  referrers?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        MetadataPageRequest
      ]
    | MetadataPageRequest
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** The pagination object for elements of type 'Metadata'. */
export interface MetadataPageRequest {
  /** The elements of type 'Metadata' in this page. */
  data?: MetadataRequest
  /** A cursor for elements coming after the current page. */
  after?: boolean | number
  /** A cursor for elements coming before the current page. */
  before?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface TokenContractRequest {
  /** A descriptive name for a collection of NFTs in this contract */
  name?: boolean | number
  /** The document's ID. */
  _id?: boolean | number
  /** An abbreviated name for NFTs in this contract */
  symbol?: boolean | number
  id?: boolean | number
  supportsEIP721Metadata?: boolean | number
  tokens?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        TokenPageRequest
      ]
    | TokenPageRequest
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface FindTokenAssetsInput {
  status?: TokenAssetStatus | null
}

/** The pagination object for elements of type 'TokenAsset'. */
export interface QueryFindTokenAssetsPageRequest {
  /** The elements of type 'TokenAsset' in this page. */
  data?: TokenAssetRequest
  /** A cursor for elements coming after the current page. */
  after?: boolean | number
  /** A cursor for elements coming before the current page. */
  before?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface CursorRequest {
  /** The document's ID. */
  _id?: boolean | number
  /** The document's timestamp. */
  _ts?: boolean | number
  id?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/**
 * Describen an operation that may fail, like an HTTP
 * request or a JSON parse.
 *
 * Fauna does not support union types so we get by using a
 * single struct represeting union:
 * type Task =
 *   | { status: 'idle', attempt: int }
 *   | { status: 'queued' attempt: int }
 *   | { status: 'pending', start: Time, attempt: int }
 *   | { status: 'failed', end: Time, error: String, attempt: int }
 *   | { status: 'done', end: Time, attempt: int }
 */
export interface TaskRequest {
  /** The document's ID. */
  _id?: boolean | number
  /** Error message in cas task failed */
  error?: boolean | number
  /** Status of the task */
  status?: boolean | number
  /** Time at which task failed */
  end?: boolean | number
  /**
   * An attempt number. Usuallly 1, but could be greater
   * on retries
   */
  attempt?: boolean | number
  /** Time at which task started */
  start?: boolean | number
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface FindResourceInput {
  status?: ResourceStatus | null
}

/** The pagination object for elements of type 'Resource'. */
export interface QueryFindResourcesPageRequest {
  /** The elements of type 'Resource' in this page. */
  data?: ResourceRequest
  /** A cursor for elements coming after the current page. */
  after?: boolean | number
  /** A cursor for elements coming before the current page. */
  before?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MutationRequest {
  /** Delete an existing document in the collection of 'Owner' */
  deleteOwner?: [
    {
      /** The 'Owner' document's ID */
      id: ID
    },
    OwnerRequest
  ]
  /** Delete an existing document in the collection of 'TokenAsset' */
  deleteTokenAsset?: [
    {
      /** The 'TokenAsset' document's ID */
      id: ID
    },
    TokenAssetRequest
  ]
  /** Create a new document in the collection of 'Metadata' */
  createMetadata?: [
    {
      /** 'Metadata' input values */
      data: MetadataInput
    },
    MetadataRequest
  ]
  /** Delete an existing document in the collection of 'Token' */
  deleteToken?: [
    {
      /** The 'Token' document's ID */
      id: ID
    },
    TokenRequest
  ]
  /** Update an existing document in the collection of 'Task' */
  updateTask?: [
    {
      /** The 'Task' document's ID */
      id: ID
      /** 'Task' input values */
      data: TaskInput
    },
    TaskRequest
  ]
  /** Create a new document in the collection of 'Block' */
  createBlock?: [
    {
      /** 'Block' input values */
      data: BlockInput
    },
    BlockRequest
  ]
  /**
   * Imports Token Metadata. Will be rejected if corresponding asset status isn't
   * Queued. Otherwise updates corresponding TokenAsset transitioning it to
   * Succeeded state.
   */
  importTokenMetadata?:
    | [{ input?: TokenMetadataImportInput | null }, MetadataRequest]
    | MetadataRequest
  /** Delete an existing document in the collection of 'ERC721ImportResult' */
  deleteERC721ImportResult?: [
    {
      /** The 'ERC721ImportResult' document's ID */
      id: ID
    },
    ERC721ImportResultRequest
  ]
  /** Update an existing document in the collection of 'Metadata' */
  updateMetadata?: [
    {
      /** The 'Metadata' document's ID */
      id: ID
      /** 'Metadata' input values */
      data: MetadataInput
    },
    MetadataRequest
  ]
  /** Create a new document in the collection of 'TokenContract' */
  createTokenContract?: [
    {
      /** 'TokenContract' input values */
      data: TokenContractInput
    },
    TokenContractRequest
  ]
  /** Create a new document in the collection of 'Resource' */
  createResource?: [
    {
      /** 'Resource' input values */
      data: ResourceInput
    },
    ResourceRequest
  ]
  /** Update an existing document in the collection of 'Cursor' */
  updateCursor?: [
    {
      /** The 'Cursor' document's ID */
      id: ID
      /** 'Cursor' input values */
      data: CursorInput
    },
    CursorRequest
  ]
  /** Create a new document in the collection of 'Token' */
  createToken?: [
    {
      /** 'Token' input values */
      data: TokenInput
    },
    TokenRequest
  ]
  /** Delete an existing document in the collection of 'Cursor' */
  deleteCursor?: [
    {
      /** The 'Cursor' document's ID */
      id: ID
    },
    CursorRequest
  ]
  reportResourceProblem?:
    | [{ input?: ResourceProblemInput | null }, ResourceRequest]
    | ResourceRequest
  importERC721?: [{ input: ERC721ImportInput }, ERC721ImportResultRequest]
  /** Update an existing document in the collection of 'TokenContract' */
  updateTokenContract?: [
    {
      /** The 'TokenContract' document's ID */
      id: ID
      /** 'TokenContract' input values */
      data: TokenContractInput
    },
    TokenContractRequest
  ]
  /** Delete an existing document in the collection of 'Resource' */
  deleteResource?: [
    {
      /** The 'Resource' document's ID */
      id: ID
    },
    ResourceRequest
  ]
  /** Update an existing document in the collection of 'Owner' */
  updateOwner?: [
    {
      /** The 'Owner' document's ID */
      id: ID
      /** 'Owner' input values */
      data: OwnerInput
    },
    OwnerRequest
  ]
  /** Update an existing document in the collection of 'TokenAsset' */
  updateTokenAsset?: [
    {
      /** The 'TokenAsset' document's ID */
      id: ID
      /** 'TokenAsset' input values */
      data: TokenAssetInput
    },
    TokenAssetRequest
  ]
  /** Delete an existing document in the collection of 'Block' */
  deleteBlock?: [
    {
      /** The 'Block' document's ID */
      id: ID
    },
    BlockRequest
  ]
  /** Create a new document in the collection of 'TokenAsset' */
  createTokenAsset?: [
    {
      /** 'TokenAsset' input values */
      data: TokenAssetInput
    },
    TokenAssetRequest
  ]
  /** Create a new document in the collection of 'Cursor' */
  createCursor?: [
    {
      /** 'Cursor' input values */
      data: CursorInput
    },
    CursorRequest
  ]
  /** Create a new document in the collection of 'Task' */
  createTask?: [
    {
      /** 'Task' input values */
      data: TaskInput
    },
    TaskRequest
  ]
  /** Update an existing document in the collection of 'Token' */
  updateToken?: [
    {
      /** The 'Token' document's ID */
      id: ID
      /** 'Token' input values */
      data: TokenInput
    },
    TokenRequest
  ]
  /** Delete an existing document in the collection of 'Task' */
  deleteTask?: [
    {
      /** The 'Task' document's ID */
      id: ID
    },
    TaskRequest
  ]
  /** Create a new document in the collection of 'ERC721ImportResult' */
  createERC721ImportResult?: [
    {
      /** 'ERC721ImportResult' input values */
      data: ERC721ImportResultInput
    },
    ERC721ImportResultRequest
  ]
  /** Delete an existing document in the collection of 'TokenContract' */
  deleteTokenContract?: [
    {
      /** The 'TokenContract' document's ID */
      id: ID
    },
    TokenContractRequest
  ]
  /** Create a new document in the collection of 'Owner' */
  createOwner?: [
    {
      /** 'Owner' input values */
      data: OwnerInput
    },
    OwnerRequest
  ]
  /** Update an existing document in the collection of 'Resource' */
  updateResource?: [
    {
      /** The 'Resource' document's ID */
      id: ID
      /** 'Resource' input values */
      data: ResourceInput
    },
    ResourceRequest
  ]
  updateResourcePin?:
    | [{ input?: ResorcePinInput | null }, ResourceRequest]
    | ResourceRequest
  /** Delete an existing document in the collection of 'Metadata' */
  deleteMetadata?: [
    {
      /** The 'Metadata' document's ID */
      id: ID
    },
    MetadataRequest
  ]
  /** Update an existing document in the collection of 'Block' */
  updateBlock?: [
    {
      /** The 'Block' document's ID */
      id: ID
      /** 'Block' input values */
      data: BlockInput
    },
    BlockRequest
  ]
  /**
   * Reports problem with a TokenAsset e.g. it was impossible to parse URI
   * or was unable to fetch content from URI, or content was not a JSON.
   *
   * Call is rejected if status isn't Queued.
   */
  reportTokenAssetProblem?:
    | [{ input?: TokenAssetProblemInput | null }, TokenAssetRequest]
    | TokenAssetRequest
  /** Update an existing document in the collection of 'ERC721ImportResult' */
  updateERC721ImportResult?: [
    {
      /** The 'ERC721ImportResult' document's ID */
      id: ID
      /** 'ERC721ImportResult' input values */
      data: ERC721ImportResultInput
    },
    ERC721ImportResultRequest
  ]
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MetadataInput {
  /** CID for the metadata content. */
  cid: String
  /** Identifies the asset this token represents */
  name: String
  /** Describes the asset this token represents */
  description: String
  /** A file representing the asset this token represents */
  image: ResourceInput
  assets: ResourceInput[]
}

export interface ResourceInput {
  uri: String
  ipfsURL?: String | null
}

/** 'Task' input values */
export interface TaskInput {
  /** Status of the task */
  status: String
  /**
   * An attempt number. Usuallly 1, but could be greater
   * on retries
   */
  attempt: Int
  /** Time at which task started */
  start?: Time | null
  /** Time at which task failed */
  end?: Time | null
  /** Error message in cas task failed */
  error?: String | null
}

/** 'Block' input values */
export interface BlockInput {
  /** The hash of the block */
  hash: ID
  /** The block number */
  number: Long
  tokens?: BlockTokensRelation | null
}

/** Allow manipulating the relationship between the types 'Block' and 'Token'. */
export interface BlockTokensRelation {
  /** Create one or more documents of type 'Token' and associate them with the current document. */
  create?: (TokenInput | null)[] | null
  /** Connect one or more documents of type 'Token' with the current document using their IDs. */
  connect?: (ID | null)[] | null
  /** Disconnect the given documents of type 'Token' from the current document using their IDs. */
  disconnect?: (ID | null)[] | null
}

/** 'Token' input values */
export interface TokenInput {
  id: String
  tokenID: String
  mintTime: String
  /** Present when ERC721Metadata interface is implemented. */
  tokenAsset?: TokenTokenAssetRelation | null
  contract?: TokenContractRelation | null
  owner?: TokenOwnerRelation | null
  blocks?: TokenBlocksRelation | null
  imported?: TokenImportedRelation | null
}

/** Allow manipulating the relationship between the types 'Token' and 'TokenAsset' using the field 'Token.tokenAsset'. */
export interface TokenTokenAssetRelation {
  /** Create a document of type 'TokenAsset' and associate it with the current document. */
  create?: TokenAssetInput | null
  /** Connect a document of type 'TokenAsset' with the current document using its ID. */
  connect?: ID | null
  /** If true, disconnects this document from 'TokenAsset' */
  disconnect?: Boolean | null
}

/** 'TokenAsset' input values */
export interface TokenAssetInput {
  /**
   * Multiple tokens may have use a same `tokenURI`. This relation allows tracking
   * which tokens refer to the same `tokenURI`.
   * Token this metadata belogs to.
   */
  referrers?: TokenAssetReferrersRelation | null
  tokenURI: String
  /**
   * When `tokenURI` points to may point to JSON file that conforms to the ERC721
   * Metadata JSON Schema it fetched parsed and stored as related Metadata
   * document.
   */
  metadata?: TokenAssetMetadataRelation | null
  /**
   * CID of an IPLD node that encapsulates token metadata and all it's assets.
   * Present when it was passibly to succesfully pin the token.
   */
  ipnft?: String | null
  /** Problem description if failed to get the metadata. */
  problem?: String | null
}

/** Allow manipulating the relationship between the types 'TokenAsset' and 'Token'. */
export interface TokenAssetReferrersRelation {
  /** Create one or more documents of type 'Token' and associate them with the current document. */
  create?: (TokenInput | null)[] | null
  /** Connect one or more documents of type 'Token' with the current document using their IDs. */
  connect?: (ID | null)[] | null
  /** Disconnect the given documents of type 'Token' from the current document using their IDs. */
  disconnect?: (ID | null)[] | null
}

/** Allow manipulating the relationship between the types 'TokenAsset' and 'Metadata' using the field 'TokenAsset.metadata'. */
export interface TokenAssetMetadataRelation {
  /** Create a document of type 'Metadata' and associate it with the current document. */
  create?: MetadataInput | null
  /** Connect a document of type 'Metadata' with the current document using its ID. */
  connect?: ID | null
}

/** Allow manipulating the relationship between the types 'Token' and 'TokenContract' using the field 'Token.contract'. */
export interface TokenContractRelation {
  /** Create a document of type 'TokenContract' and associate it with the current document. */
  create?: TokenContractInput | null
  /** Connect a document of type 'TokenContract' with the current document using its ID. */
  connect?: ID | null
}

/** 'TokenContract' input values */
export interface TokenContractInput {
  id: ID
  /** A descriptive name for a collection of NFTs in this contract */
  name?: String | null
  /** An abbreviated name for NFTs in this contract */
  symbol?: String | null
  supportsEIP721Metadata: Boolean
  tokens?: TokenContractTokensRelation | null
}

/** Allow manipulating the relationship between the types 'TokenContract' and 'Token'. */
export interface TokenContractTokensRelation {
  /** Create one or more documents of type 'Token' and associate them with the current document. */
  create?: (TokenInput | null)[] | null
  /** Connect one or more documents of type 'Token' with the current document using their IDs. */
  connect?: (ID | null)[] | null
  /** Disconnect the given documents of type 'Token' from the current document using their IDs. */
  disconnect?: (ID | null)[] | null
}

/** Allow manipulating the relationship between the types 'Token' and 'Owner' using the field 'Token.owner'. */
export interface TokenOwnerRelation {
  /** Create a document of type 'Owner' and associate it with the current document. */
  create?: OwnerInput | null
  /** Connect a document of type 'Owner' with the current document using its ID. */
  connect?: ID | null
}

/** 'Owner' input values */
export interface OwnerInput {
  id: ID
}

/** Allow manipulating the relationship between the types 'Token' and 'Block'. */
export interface TokenBlocksRelation {
  /** Create one or more documents of type 'Block' and associate them with the current document. */
  create?: (BlockInput | null)[] | null
  /** Connect one or more documents of type 'Block' with the current document using their IDs. */
  connect?: (ID | null)[] | null
  /** Disconnect the given documents of type 'Block' from the current document using their IDs. */
  disconnect?: (ID | null)[] | null
}

/** Allow manipulating the relationship between the types 'Token' and 'ERC721ImportResult'. */
export interface TokenImportedRelation {
  /** Create one or more documents of type 'ERC721ImportResult' and associate them with the current document. */
  create?: (ERC721ImportResultInput | null)[] | null
  /** Connect one or more documents of type 'ERC721ImportResult' with the current document using their IDs. */
  connect?: (ID | null)[] | null
  /** Disconnect the given documents of type 'ERC721ImportResult' from the current document using their IDs. */
  disconnect?: (ID | null)[] | null
}

/** 'ERC721ImportResult' input values */
export interface ERC721ImportResultInput {
  /** Cursor from which import started. */
  id: String
  /** New cursor after this import. */
  nextID: String
  /** Tokens that were imported. */
  tokens?: ERC721ImportResultTokensRelation | null
}

/** Allow manipulating the relationship between the types 'ERC721ImportResult' and 'Token'. */
export interface ERC721ImportResultTokensRelation {
  /** Create one or more documents of type 'Token' and associate them with the current document. */
  create?: (TokenInput | null)[] | null
  /** Connect one or more documents of type 'Token' with the current document using their IDs. */
  connect?: (ID | null)[] | null
  /** Disconnect the given documents of type 'Token' from the current document using their IDs. */
  disconnect?: (ID | null)[] | null
}

export interface TokenMetadataImportInput {
  tokenAssetID: ID
  metadata?: MetadataInput | null
}

/** 'Cursor' input values */
export interface CursorInput {
  id: String
}

export interface ResourceProblemInput {
  resourceID: ID
  status: ResourceStatus
  problem: String
}

export interface ERC721ImportInput {
  /**
   * Cursor from which import started. If current cursor changed import will be
   * rejected.
   */
  id: String
  /** Tokens to be imported. */
  tokens: ERC721ImportTokenInput[]
}

export interface ERC721ImportTokenInput {
  id: ID
  tokenID: String
  tokenURI: String
  mintTime: String
  blockHash: String
  blockNumber: String
  contract: ERC721ImportTokenContractInput
  owner: ERC721ImportTokenOwnerInput
}

export interface ERC721ImportTokenContractInput {
  id: ID
  name?: String | null
  symbol?: String | null
  supportsEIP721Metadata: Boolean
}

export interface ERC721ImportTokenOwnerInput {
  id: ID
}

export interface ResorcePinInput {
  resourceID: ID
  status: ResourceStatus
  ipfsURL: String
  cid: String
}

export interface TokenAssetProblemInput {
  /** ID of the TokenAsset */
  tokenAssetID: ID
  /** Problem description */
  problem: String
}

export interface ERC721MetadataQuery {
  name?: String | null
  symbol?: String | null
  tokenURI?: String | null
  ipnft?: String | null
}

export interface MetadaQuery {
  name?: String | null
  description?: String | null
  image?: ResourceQuery | null
}

export interface ResourceQuery {
  uri?: String | null
  cid?: String | null
}

/** Allow manipulating the relationship between the types 'Metadata' and 'Resource'. */
export interface MetadataAssetsRelation {
  /** Create one or more documents of type 'Resource' and associate them with the current document. */
  create?: (ResourceInput | null)[] | null
  /** Connect one or more documents of type 'Resource' with the current document using their IDs. */
  connect?: (ID | null)[] | null
  /** Disconnect the given documents of type 'Resource' from the current document using their IDs. */
  disconnect?: (ID | null)[] | null
}

/** Allow manipulating the relationship between the types 'Metadata' and 'Resource' using the field 'Metadata.image'. */
export interface MetadataImageRelation {
  /** Create a document of type 'Resource' and associate it with the current document. */
  create?: ResourceInput | null
  /** Connect a document of type 'Resource' with the current document using its ID. */
  connect?: ID | null
}

/** Allow manipulating the relationship between the types 'Metadata' and 'TokenAsset' using the field 'Metadata.source'. */
export interface MetadataSourceRelation {
  /** Create a document of type 'TokenAsset' and associate it with the current document. */
  create?: TokenAssetInput | null
  /** Connect a document of type 'TokenAsset' with the current document using its ID. */
  connect?: ID | null
  /** If true, disconnects this document from 'TokenAsset' */
  disconnect?: Boolean | null
}

/** Allow manipulating the relationship between the types 'Resource' and 'Metadata'. */
export interface ResourceReferrersRelation {
  /** Create one or more documents of type 'Metadata' and associate them with the current document. */
  create?: (MetadataInput | null)[] | null
  /** Connect one or more documents of type 'Metadata' with the current document using their IDs. */
  connect?: (ID | null)[] | null
  /** Disconnect the given documents of type 'Metadata' from the current document using their IDs. */
  disconnect?: (ID | null)[] | null
}

const Query_possibleTypes = ['Query']
export const isQuery = (obj: { __typename: String }): obj is Query => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Query_possibleTypes.includes(obj.__typename)
}

const Block_possibleTypes = ['Block']
export const isBlock = (obj: { __typename: String }): obj is Block => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Block_possibleTypes.includes(obj.__typename)
}

const TokenPage_possibleTypes = ['TokenPage']
export const isTokenPage = (obj: { __typename: String }): obj is TokenPage => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TokenPage_possibleTypes.includes(obj.__typename)
}

const Token_possibleTypes = ['Token']
export const isToken = (obj: { __typename: String }): obj is Token => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Token_possibleTypes.includes(obj.__typename)
}

const BlockPage_possibleTypes = ['BlockPage']
export const isBlockPage = (obj: { __typename: String }): obj is BlockPage => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return BlockPage_possibleTypes.includes(obj.__typename)
}

const ERC721ImportResultPage_possibleTypes = ['ERC721ImportResultPage']
export const isERC721ImportResultPage = (obj: {
  __typename: String
}): obj is ERC721ImportResultPage => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ERC721ImportResultPage_possibleTypes.includes(obj.__typename)
}

const ERC721ImportResult_possibleTypes = ['ERC721ImportResult']
export const isERC721ImportResult = (obj: {
  __typename: String
}): obj is ERC721ImportResult => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ERC721ImportResult_possibleTypes.includes(obj.__typename)
}

const Owner_possibleTypes = ['Owner']
export const isOwner = (obj: { __typename: String }): obj is Owner => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Owner_possibleTypes.includes(obj.__typename)
}

const TokenAsset_possibleTypes = ['TokenAsset']
export const isTokenAsset = (obj: {
  __typename: String
}): obj is TokenAsset => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TokenAsset_possibleTypes.includes(obj.__typename)
}

const Metadata_possibleTypes = ['Metadata']
export const isMetadata = (obj: { __typename: String }): obj is Metadata => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Metadata_possibleTypes.includes(obj.__typename)
}

const ResourcePage_possibleTypes = ['ResourcePage']
export const isResourcePage = (obj: {
  __typename: String
}): obj is ResourcePage => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ResourcePage_possibleTypes.includes(obj.__typename)
}

const Resource_possibleTypes = ['Resource']
export const isResource = (obj: { __typename: String }): obj is Resource => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Resource_possibleTypes.includes(obj.__typename)
}

const MetadataPage_possibleTypes = ['MetadataPage']
export const isMetadataPage = (obj: {
  __typename: String
}): obj is MetadataPage => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return MetadataPage_possibleTypes.includes(obj.__typename)
}

const TokenContract_possibleTypes = ['TokenContract']
export const isTokenContract = (obj: {
  __typename: String
}): obj is TokenContract => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TokenContract_possibleTypes.includes(obj.__typename)
}

const QueryFindTokenAssetsPage_possibleTypes = ['QueryFindTokenAssetsPage']
export const isQueryFindTokenAssetsPage = (obj: {
  __typename: String
}): obj is QueryFindTokenAssetsPage => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return QueryFindTokenAssetsPage_possibleTypes.includes(obj.__typename)
}

const Cursor_possibleTypes = ['Cursor']
export const isCursor = (obj: { __typename: String }): obj is Cursor => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Cursor_possibleTypes.includes(obj.__typename)
}

const Task_possibleTypes = ['Task']
export const isTask = (obj: { __typename: String }): obj is Task => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Task_possibleTypes.includes(obj.__typename)
}

const QueryFindResourcesPage_possibleTypes = ['QueryFindResourcesPage']
export const isQueryFindResourcesPage = (obj: {
  __typename: String
}): obj is QueryFindResourcesPage => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return QueryFindResourcesPage_possibleTypes.includes(obj.__typename)
}

const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj: { __typename: String }): obj is Mutation => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Mutation_possibleTypes.includes(obj.__typename)
}

export interface QueryPromiseChain {
  /** Find a document from the collection of 'Block' by its id. */
  findBlockByID: (args: {
    /** The 'Block' document's ID */
    id: ID
  }) => BlockPromiseChain & {
    execute: (
      request: BlockRequest,
      defaultValue?: Block | null
    ) => Promise<Block | null>
  }
  /** Find a document from the collection of 'TokenContract' by its id. */
  findTokenContractByID: (args: {
    /** The 'TokenContract' document's ID */
    id: ID
  }) => TokenContractPromiseChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Promise<TokenContract | null>
  }
  constract: ((args?: { id?: ID | null }) => TokenContractPromiseChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Promise<TokenContract | null>
  }) &
    (TokenContractPromiseChain & {
      execute: (
        request: TokenContractRequest,
        defaultValue?: TokenContract | null
      ) => Promise<TokenContract | null>
    })
  /** Provides tokens with the */
  findTokenAssets: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
    where?: FindTokenAssetsInput | null
  }) => QueryFindTokenAssetsPagePromiseChain & {
    execute: (
      request: QueryFindTokenAssetsPageRequest,
      defaultValue?: QueryFindTokenAssetsPage
    ) => Promise<QueryFindTokenAssetsPage>
  }) &
    (QueryFindTokenAssetsPagePromiseChain & {
      execute: (
        request: QueryFindTokenAssetsPageRequest,
        defaultValue?: QueryFindTokenAssetsPage
      ) => Promise<QueryFindTokenAssetsPage>
    })
  /** Find a document from the collection of 'Resource' by its id. */
  findResourceByID: (args: {
    /** The 'Resource' document's ID */
    id: ID
  }) => ResourcePromiseChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource | null
    ) => Promise<Resource | null>
  }
  /** Find a document from the collection of 'Token' by its id. */
  findTokenByID: (args: {
    /** The 'Token' document's ID */
    id: ID
  }) => TokenPromiseChain & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token | null
    ) => Promise<Token | null>
  }
  allImports: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => ERC721ImportResultPagePromiseChain & {
    execute: (
      request: ERC721ImportResultPageRequest,
      defaultValue?: ERC721ImportResultPage
    ) => Promise<ERC721ImportResultPage>
  }) &
    (ERC721ImportResultPagePromiseChain & {
      execute: (
        request: ERC721ImportResultPageRequest,
        defaultValue?: ERC721ImportResultPage
      ) => Promise<ERC721ImportResultPage>
    })
  /** Find a document from the collection of 'Owner' by its id. */
  findOwnerByID: (args: {
    /** The 'Owner' document's ID */
    id: ID
  }) => OwnerPromiseChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Promise<Owner | null>
  }
  /** Find a document from the collection of 'ERC721ImportResult' by its id. */
  findERC721ImportResultByID: (args: {
    /** The 'ERC721ImportResult' document's ID */
    id: ID
  }) => ERC721ImportResultPromiseChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult | null
    ) => Promise<ERC721ImportResult | null>
  }
  cursor: CursorPromiseChain & {
    execute: (request: CursorRequest, defaultValue?: Cursor) => Promise<Cursor>
  }
  /** Find a document from the collection of 'Metadata' by its id. */
  findMetadataByID: (args: {
    /** The 'Metadata' document's ID */
    id: ID
  }) => MetadataPromiseChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata | null
    ) => Promise<Metadata | null>
  }
  /** Find a document from the collection of 'Task' by its id. */
  findTaskByID: (args: {
    /** The 'Task' document's ID */
    id: ID
  }) => TaskPromiseChain & {
    execute: (
      request: TaskRequest,
      defaultValue?: Task | null
    ) => Promise<Task | null>
  }
  block: ((args?: {
    hash?: ID | null
    number?: Long | null
  }) => BlockPromiseChain & {
    execute: (
      request: BlockRequest,
      defaultValue?: Block | null
    ) => Promise<Block | null>
  }) &
    (BlockPromiseChain & {
      execute: (
        request: BlockRequest,
        defaultValue?: Block | null
      ) => Promise<Block | null>
    })
  /** Find a document from the collection of 'Cursor' by its id. */
  findCursorByID: (args: {
    /** The 'Cursor' document's ID */
    id: ID
  }) => CursorPromiseChain & {
    execute: (
      request: CursorRequest,
      defaultValue?: Cursor | null
    ) => Promise<Cursor | null>
  }
  findResources: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
    where?: FindResourceInput | null
  }) => QueryFindResourcesPagePromiseChain & {
    execute: (
      request: QueryFindResourcesPageRequest,
      defaultValue?: QueryFindResourcesPage
    ) => Promise<QueryFindResourcesPage>
  }) &
    (QueryFindResourcesPagePromiseChain & {
      execute: (
        request: QueryFindResourcesPageRequest,
        defaultValue?: QueryFindResourcesPage
      ) => Promise<QueryFindResourcesPage>
    })
  /** Find a document from the collection of 'TokenAsset' by its id. */
  findTokenAssetByID: (args: {
    /** The 'TokenAsset' document's ID */
    id: ID
  }) => TokenAssetPromiseChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset | null
    ) => Promise<TokenAsset | null>
  }
  tokens: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
    tokenID?: String | null
    mintTime?: String | null
  }) => TokenPagePromiseChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Promise<TokenPage>
  }) &
    (TokenPagePromiseChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Promise<TokenPage>
    })
  owner: ((args?: {
    id?: ID | null
  }) => OwnerPromiseChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Promise<Owner | null>
  }) &
    (OwnerPromiseChain & {
      execute: (
        request: OwnerRequest,
        defaultValue?: Owner | null
      ) => Promise<Owner | null>
    })
  allTokens: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => TokenPagePromiseChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Promise<TokenPage>
  }) &
    (TokenPagePromiseChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Promise<TokenPage>
    })
}

export interface QueryObservableChain {
  /** Find a document from the collection of 'Block' by its id. */
  findBlockByID: (args: {
    /** The 'Block' document's ID */
    id: ID
  }) => BlockObservableChain & {
    execute: (
      request: BlockRequest,
      defaultValue?: Block | null
    ) => Observable<Block | null>
  }
  /** Find a document from the collection of 'TokenContract' by its id. */
  findTokenContractByID: (args: {
    /** The 'TokenContract' document's ID */
    id: ID
  }) => TokenContractObservableChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Observable<TokenContract | null>
  }
  constract: ((args?: { id?: ID | null }) => TokenContractObservableChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Observable<TokenContract | null>
  }) &
    (TokenContractObservableChain & {
      execute: (
        request: TokenContractRequest,
        defaultValue?: TokenContract | null
      ) => Observable<TokenContract | null>
    })
  /** Provides tokens with the */
  findTokenAssets: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
    where?: FindTokenAssetsInput | null
  }) => QueryFindTokenAssetsPageObservableChain & {
    execute: (
      request: QueryFindTokenAssetsPageRequest,
      defaultValue?: QueryFindTokenAssetsPage
    ) => Observable<QueryFindTokenAssetsPage>
  }) &
    (QueryFindTokenAssetsPageObservableChain & {
      execute: (
        request: QueryFindTokenAssetsPageRequest,
        defaultValue?: QueryFindTokenAssetsPage
      ) => Observable<QueryFindTokenAssetsPage>
    })
  /** Find a document from the collection of 'Resource' by its id. */
  findResourceByID: (args: {
    /** The 'Resource' document's ID */
    id: ID
  }) => ResourceObservableChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource | null
    ) => Observable<Resource | null>
  }
  /** Find a document from the collection of 'Token' by its id. */
  findTokenByID: (args: {
    /** The 'Token' document's ID */
    id: ID
  }) => TokenObservableChain & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token | null
    ) => Observable<Token | null>
  }
  allImports: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => ERC721ImportResultPageObservableChain & {
    execute: (
      request: ERC721ImportResultPageRequest,
      defaultValue?: ERC721ImportResultPage
    ) => Observable<ERC721ImportResultPage>
  }) &
    (ERC721ImportResultPageObservableChain & {
      execute: (
        request: ERC721ImportResultPageRequest,
        defaultValue?: ERC721ImportResultPage
      ) => Observable<ERC721ImportResultPage>
    })
  /** Find a document from the collection of 'Owner' by its id. */
  findOwnerByID: (args: {
    /** The 'Owner' document's ID */
    id: ID
  }) => OwnerObservableChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Observable<Owner | null>
  }
  /** Find a document from the collection of 'ERC721ImportResult' by its id. */
  findERC721ImportResultByID: (args: {
    /** The 'ERC721ImportResult' document's ID */
    id: ID
  }) => ERC721ImportResultObservableChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult | null
    ) => Observable<ERC721ImportResult | null>
  }
  cursor: CursorObservableChain & {
    execute: (
      request: CursorRequest,
      defaultValue?: Cursor
    ) => Observable<Cursor>
  }
  /** Find a document from the collection of 'Metadata' by its id. */
  findMetadataByID: (args: {
    /** The 'Metadata' document's ID */
    id: ID
  }) => MetadataObservableChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata | null
    ) => Observable<Metadata | null>
  }
  /** Find a document from the collection of 'Task' by its id. */
  findTaskByID: (args: {
    /** The 'Task' document's ID */
    id: ID
  }) => TaskObservableChain & {
    execute: (
      request: TaskRequest,
      defaultValue?: Task | null
    ) => Observable<Task | null>
  }
  block: ((args?: {
    hash?: ID | null
    number?: Long | null
  }) => BlockObservableChain & {
    execute: (
      request: BlockRequest,
      defaultValue?: Block | null
    ) => Observable<Block | null>
  }) &
    (BlockObservableChain & {
      execute: (
        request: BlockRequest,
        defaultValue?: Block | null
      ) => Observable<Block | null>
    })
  /** Find a document from the collection of 'Cursor' by its id. */
  findCursorByID: (args: {
    /** The 'Cursor' document's ID */
    id: ID
  }) => CursorObservableChain & {
    execute: (
      request: CursorRequest,
      defaultValue?: Cursor | null
    ) => Observable<Cursor | null>
  }
  findResources: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
    where?: FindResourceInput | null
  }) => QueryFindResourcesPageObservableChain & {
    execute: (
      request: QueryFindResourcesPageRequest,
      defaultValue?: QueryFindResourcesPage
    ) => Observable<QueryFindResourcesPage>
  }) &
    (QueryFindResourcesPageObservableChain & {
      execute: (
        request: QueryFindResourcesPageRequest,
        defaultValue?: QueryFindResourcesPage
      ) => Observable<QueryFindResourcesPage>
    })
  /** Find a document from the collection of 'TokenAsset' by its id. */
  findTokenAssetByID: (args: {
    /** The 'TokenAsset' document's ID */
    id: ID
  }) => TokenAssetObservableChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset | null
    ) => Observable<TokenAsset | null>
  }
  tokens: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
    tokenID?: String | null
    mintTime?: String | null
  }) => TokenPageObservableChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Observable<TokenPage>
  }) &
    (TokenPageObservableChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Observable<TokenPage>
    })
  owner: ((args?: { id?: ID | null }) => OwnerObservableChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Observable<Owner | null>
  }) &
    (OwnerObservableChain & {
      execute: (
        request: OwnerRequest,
        defaultValue?: Owner | null
      ) => Observable<Owner | null>
    })
  allTokens: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => TokenPageObservableChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Observable<TokenPage>
  }) &
    (TokenPageObservableChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Observable<TokenPage>
    })
}

export interface BlockPromiseChain {
  /** The block number */
  number: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /** The hash of the block */
  hash: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  tokens: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => TokenPagePromiseChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Promise<TokenPage>
  }) &
    (TokenPagePromiseChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Promise<TokenPage>
    })
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

export interface BlockObservableChain {
  /** The block number */
  number: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /** The hash of the block */
  hash: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  tokens: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => TokenPageObservableChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Observable<TokenPage>
  }) &
    (TokenPageObservableChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Observable<TokenPage>
    })
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
}

/** The pagination object for elements of type 'Token'. */
export interface TokenPagePromiseChain {
  /** The elements of type 'Token' in this page. */
  data: {
    execute: (
      request: TokenRequest,
      defaultValue?: (Token | null)[]
    ) => Promise<(Token | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
}

/** The pagination object for elements of type 'Token'. */
export interface TokenPageObservableChain {
  /** The elements of type 'Token' in this page. */
  data: {
    execute: (
      request: TokenRequest,
      defaultValue?: (Token | null)[]
    ) => Observable<(Token | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
}

export interface TokenPromiseChain {
  blocks: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => BlockPagePromiseChain & {
    execute: (
      request: BlockPageRequest,
      defaultValue?: BlockPage
    ) => Promise<BlockPage>
  }) &
    (BlockPagePromiseChain & {
      execute: (
        request: BlockPageRequest,
        defaultValue?: BlockPage
      ) => Promise<BlockPage>
    })
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  mintTime: {
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
  imported: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => ERC721ImportResultPagePromiseChain & {
    execute: (
      request: ERC721ImportResultPageRequest,
      defaultValue?: ERC721ImportResultPage
    ) => Promise<ERC721ImportResultPage>
  }) &
    (ERC721ImportResultPagePromiseChain & {
      execute: (
        request: ERC721ImportResultPageRequest,
        defaultValue?: ERC721ImportResultPage
      ) => Promise<ERC721ImportResultPage>
    })
  tokenID: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  owner: OwnerPromiseChain & {
    execute: (request: OwnerRequest, defaultValue?: Owner) => Promise<Owner>
  }
  /** Present when ERC721Metadata interface is implemented. */
  tokenAsset: TokenAssetPromiseChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset | null
    ) => Promise<TokenAsset | null>
  }
  contract: TokenContractPromiseChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract
    ) => Promise<TokenContract>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

export interface TokenObservableChain {
  blocks: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => BlockPageObservableChain & {
    execute: (
      request: BlockPageRequest,
      defaultValue?: BlockPage
    ) => Observable<BlockPage>
  }) &
    (BlockPageObservableChain & {
      execute: (
        request: BlockPageRequest,
        defaultValue?: BlockPage
      ) => Observable<BlockPage>
    })
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  mintTime: {
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
  imported: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => ERC721ImportResultPageObservableChain & {
    execute: (
      request: ERC721ImportResultPageRequest,
      defaultValue?: ERC721ImportResultPage
    ) => Observable<ERC721ImportResultPage>
  }) &
    (ERC721ImportResultPageObservableChain & {
      execute: (
        request: ERC721ImportResultPageRequest,
        defaultValue?: ERC721ImportResultPage
      ) => Observable<ERC721ImportResultPage>
    })
  tokenID: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  owner: OwnerObservableChain & {
    execute: (request: OwnerRequest, defaultValue?: Owner) => Observable<Owner>
  }
  /** Present when ERC721Metadata interface is implemented. */
  tokenAsset: TokenAssetObservableChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset | null
    ) => Observable<TokenAsset | null>
  }
  contract: TokenContractObservableChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract
    ) => Observable<TokenContract>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
}

/** The pagination object for elements of type 'Block'. */
export interface BlockPagePromiseChain {
  /** The elements of type 'Block' in this page. */
  data: {
    execute: (
      request: BlockRequest,
      defaultValue?: (Block | null)[]
    ) => Promise<(Block | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
}

/** The pagination object for elements of type 'Block'. */
export interface BlockPageObservableChain {
  /** The elements of type 'Block' in this page. */
  data: {
    execute: (
      request: BlockRequest,
      defaultValue?: (Block | null)[]
    ) => Observable<(Block | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
}

/** The pagination object for elements of type 'ERC721ImportResult'. */
export interface ERC721ImportResultPagePromiseChain {
  /** The elements of type 'ERC721ImportResult' in this page. */
  data: {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: (ERC721ImportResult | null)[]
    ) => Promise<(ERC721ImportResult | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
}

/** The pagination object for elements of type 'ERC721ImportResult'. */
export interface ERC721ImportResultPageObservableChain {
  /** The elements of type 'ERC721ImportResult' in this page. */
  data: {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: (ERC721ImportResult | null)[]
    ) => Observable<(ERC721ImportResult | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
}

export interface ERC721ImportResultPromiseChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /** New cursor after this import. */
  nextID: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /** Cursor from which import started. */
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /** Tokens that were imported. */
  tokens: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => TokenPagePromiseChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Promise<TokenPage>
  }) &
    (TokenPagePromiseChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Promise<TokenPage>
    })
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

export interface ERC721ImportResultObservableChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /** New cursor after this import. */
  nextID: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /** Cursor from which import started. */
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /** Tokens that were imported. */
  tokens: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => TokenPageObservableChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Observable<TokenPage>
  }) &
    (TokenPageObservableChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Observable<TokenPage>
    })
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
}

export interface OwnerPromiseChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
}

export interface OwnerObservableChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
}

export interface TokenAssetPromiseChain {
  /** Problem description if failed to get the metadata. */
  problem: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  tokenURI: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /**
   * When `tokenURI` points to may point to JSON file that conforms to the ERC721
   * Metadata JSON Schema it fetched parsed and stored as related Metadata
   * document.
   */
  metadata: MetadataPromiseChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata | null
    ) => Promise<Metadata | null>
  }
  /**
   * CID of an IPLD node that encapsulates token metadata and all it's assets.
   * Present when it was passibly to succesfully pin the token.
   */
  ipnft: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /**
   * Multiple tokens may have use a same `tokenURI`. This relation allows tracking
   * which tokens refer to the same `tokenURI`.
   * Token this metadata belogs to.
   */
  referrers: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => TokenPagePromiseChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Promise<TokenPage>
  }) &
    (TokenPagePromiseChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Promise<TokenPage>
    })
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

export interface TokenAssetObservableChain {
  /** Problem description if failed to get the metadata. */
  problem: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  tokenURI: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /**
   * When `tokenURI` points to may point to JSON file that conforms to the ERC721
   * Metadata JSON Schema it fetched parsed and stored as related Metadata
   * document.
   */
  metadata: MetadataObservableChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata | null
    ) => Observable<Metadata | null>
  }
  /**
   * CID of an IPLD node that encapsulates token metadata and all it's assets.
   * Present when it was passibly to succesfully pin the token.
   */
  ipnft: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /**
   * Multiple tokens may have use a same `tokenURI`. This relation allows tracking
   * which tokens refer to the same `tokenURI`.
   * Token this metadata belogs to.
   */
  referrers: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => TokenPageObservableChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Observable<TokenPage>
  }) &
    (TokenPageObservableChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Observable<TokenPage>
    })
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
}

export interface MetadataPromiseChain {
  /** Identifies the asset this token represents */
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  source: TokenAssetPromiseChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset
    ) => Promise<TokenAsset>
  }
  assets: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => ResourcePagePromiseChain & {
    execute: (
      request: ResourcePageRequest,
      defaultValue?: ResourcePage
    ) => Promise<ResourcePage>
  }) &
    (ResourcePagePromiseChain & {
      execute: (
        request: ResourcePageRequest,
        defaultValue?: ResourcePage
      ) => Promise<ResourcePage>
    })
  /** A file representing the asset this token represents */
  image: ResourcePromiseChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource
    ) => Promise<Resource>
  }
  /** Describes the asset this token represents */
  description: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

export interface MetadataObservableChain {
  /** Identifies the asset this token represents */
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  source: TokenAssetObservableChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset
    ) => Observable<TokenAsset>
  }
  assets: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => ResourcePageObservableChain & {
    execute: (
      request: ResourcePageRequest,
      defaultValue?: ResourcePage
    ) => Observable<ResourcePage>
  }) &
    (ResourcePageObservableChain & {
      execute: (
        request: ResourcePageRequest,
        defaultValue?: ResourcePage
      ) => Observable<ResourcePage>
    })
  /** A file representing the asset this token represents */
  image: ResourceObservableChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource
    ) => Observable<Resource>
  }
  /** Describes the asset this token represents */
  description: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
}

/** The pagination object for elements of type 'Resource'. */
export interface ResourcePagePromiseChain {
  /** The elements of type 'Resource' in this page. */
  data: {
    execute: (
      request: ResourceRequest,
      defaultValue?: (Resource | null)[]
    ) => Promise<(Resource | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
}

/** The pagination object for elements of type 'Resource'. */
export interface ResourcePageObservableChain {
  /** The elements of type 'Resource' in this page. */
  data: {
    execute: (
      request: ResourceRequest,
      defaultValue?: (Resource | null)[]
    ) => Observable<(Resource | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
}

export interface ResourcePromiseChain {
  /** Problem description if there was problem in pinning a resource. */
  problem: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /** URI with which resource was identified. */
  uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /** CID that corresponds to this resource, set once resourec is pinned. */
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** ipfs:// url if `uri` was referring to gateway URL. */
  ipfsURL: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: ResourceStatus
    ) => Promise<ResourceStatus>
  }
  referrers: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => MetadataPagePromiseChain & {
    execute: (
      request: MetadataPageRequest,
      defaultValue?: MetadataPage
    ) => Promise<MetadataPage>
  }) &
    (MetadataPagePromiseChain & {
      execute: (
        request: MetadataPageRequest,
        defaultValue?: MetadataPage
      ) => Promise<MetadataPage>
    })
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

export interface ResourceObservableChain {
  /** Problem description if there was problem in pinning a resource. */
  problem: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /** URI with which resource was identified. */
  uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /** CID that corresponds to this resource, set once resourec is pinned. */
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** ipfs:// url if `uri` was referring to gateway URL. */
  ipfsURL: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: ResourceStatus
    ) => Observable<ResourceStatus>
  }
  referrers: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => MetadataPageObservableChain & {
    execute: (
      request: MetadataPageRequest,
      defaultValue?: MetadataPage
    ) => Observable<MetadataPage>
  }) &
    (MetadataPageObservableChain & {
      execute: (
        request: MetadataPageRequest,
        defaultValue?: MetadataPage
      ) => Observable<MetadataPage>
    })
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
}

/** The pagination object for elements of type 'Metadata'. */
export interface MetadataPagePromiseChain {
  /** The elements of type 'Metadata' in this page. */
  data: {
    execute: (
      request: MetadataRequest,
      defaultValue?: (Metadata | null)[]
    ) => Promise<(Metadata | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
}

/** The pagination object for elements of type 'Metadata'. */
export interface MetadataPageObservableChain {
  /** The elements of type 'Metadata' in this page. */
  data: {
    execute: (
      request: MetadataRequest,
      defaultValue?: (Metadata | null)[]
    ) => Observable<(Metadata | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
}

export interface TokenContractPromiseChain {
  /** A descriptive name for a collection of NFTs in this contract */
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /** An abbreviated name for NFTs in this contract */
  symbol: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  supportsEIP721Metadata: {
    execute: (
      request?: boolean | number,
      defaultValue?: Boolean
    ) => Promise<Boolean>
  }
  tokens: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => TokenPagePromiseChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Promise<TokenPage>
  }) &
    (TokenPagePromiseChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Promise<TokenPage>
    })
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

export interface TokenContractObservableChain {
  /** A descriptive name for a collection of NFTs in this contract */
  name: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /** An abbreviated name for NFTs in this contract */
  symbol: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  supportsEIP721Metadata: {
    execute: (
      request?: boolean | number,
      defaultValue?: Boolean
    ) => Observable<Boolean>
  }
  tokens: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => TokenPageObservableChain & {
    execute: (
      request: TokenPageRequest,
      defaultValue?: TokenPage
    ) => Observable<TokenPage>
  }) &
    (TokenPageObservableChain & {
      execute: (
        request: TokenPageRequest,
        defaultValue?: TokenPage
      ) => Observable<TokenPage>
    })
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
}

/** The pagination object for elements of type 'TokenAsset'. */
export interface QueryFindTokenAssetsPagePromiseChain {
  /** The elements of type 'TokenAsset' in this page. */
  data: {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: (TokenAsset | null)[]
    ) => Promise<(TokenAsset | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
}

/** The pagination object for elements of type 'TokenAsset'. */
export interface QueryFindTokenAssetsPageObservableChain {
  /** The elements of type 'TokenAsset' in this page. */
  data: {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: (TokenAsset | null)[]
    ) => Observable<(TokenAsset | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
}

export interface CursorPromiseChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
}

export interface CursorObservableChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
  id: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
}

/**
 * Describen an operation that may fail, like an HTTP
 * request or a JSON parse.
 *
 * Fauna does not support union types so we get by using a
 * single struct represeting union:
 * type Task =
 *   | { status: 'idle', attempt: int }
 *   | { status: 'queued' attempt: int }
 *   | { status: 'pending', start: Time, attempt: int }
 *   | { status: 'failed', end: Time, error: String, attempt: int }
 *   | { status: 'done', end: Time, attempt: int }
 */
export interface TaskPromiseChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /** Error message in cas task failed */
  error: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** Status of the task */
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /** Time at which task failed */
  end: {
    execute: (
      request?: boolean | number,
      defaultValue?: Time | null
    ) => Promise<Time | null>
  }
  /**
   * An attempt number. Usuallly 1, but could be greater
   * on retries
   */
  attempt: {
    execute: (request?: boolean | number, defaultValue?: Int) => Promise<Int>
  }
  /** Time at which task started */
  start: {
    execute: (
      request?: boolean | number,
      defaultValue?: Time | null
    ) => Promise<Time | null>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

/**
 * Describen an operation that may fail, like an HTTP
 * request or a JSON parse.
 *
 * Fauna does not support union types so we get by using a
 * single struct represeting union:
 * type Task =
 *   | { status: 'idle', attempt: int }
 *   | { status: 'queued' attempt: int }
 *   | { status: 'pending', start: Time, attempt: int }
 *   | { status: 'failed', end: Time, error: String, attempt: int }
 *   | { status: 'done', end: Time, attempt: int }
 */
export interface TaskObservableChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /** Error message in cas task failed */
  error: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** Status of the task */
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /** Time at which task failed */
  end: {
    execute: (
      request?: boolean | number,
      defaultValue?: Time | null
    ) => Observable<Time | null>
  }
  /**
   * An attempt number. Usuallly 1, but could be greater
   * on retries
   */
  attempt: {
    execute: (request?: boolean | number, defaultValue?: Int) => Observable<Int>
  }
  /** Time at which task started */
  start: {
    execute: (
      request?: boolean | number,
      defaultValue?: Time | null
    ) => Observable<Time | null>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
}

/** The pagination object for elements of type 'Resource'. */
export interface QueryFindResourcesPagePromiseChain {
  /** The elements of type 'Resource' in this page. */
  data: {
    execute: (
      request: ResourceRequest,
      defaultValue?: (Resource | null)[]
    ) => Promise<(Resource | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
}

/** The pagination object for elements of type 'Resource'. */
export interface QueryFindResourcesPageObservableChain {
  /** The elements of type 'Resource' in this page. */
  data: {
    execute: (
      request: ResourceRequest,
      defaultValue?: (Resource | null)[]
    ) => Observable<(Resource | null)[]>
  }
  /** A cursor for elements coming after the current page. */
  after: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** A cursor for elements coming before the current page. */
  before: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
}

export interface MutationPromiseChain {
  /** Delete an existing document in the collection of 'Owner' */
  deleteOwner: (args: {
    /** The 'Owner' document's ID */
    id: ID
  }) => OwnerPromiseChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Promise<Owner | null>
  }
  /** Delete an existing document in the collection of 'TokenAsset' */
  deleteTokenAsset: (args: {
    /** The 'TokenAsset' document's ID */
    id: ID
  }) => TokenAssetPromiseChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset | null
    ) => Promise<TokenAsset | null>
  }
  /** Create a new document in the collection of 'Metadata' */
  createMetadata: (args: {
    /** 'Metadata' input values */
    data: MetadataInput
  }) => MetadataPromiseChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata
    ) => Promise<Metadata>
  }
  /** Delete an existing document in the collection of 'Token' */
  deleteToken: (args: {
    /** The 'Token' document's ID */
    id: ID
  }) => TokenPromiseChain & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token | null
    ) => Promise<Token | null>
  }
  /** Update an existing document in the collection of 'Task' */
  updateTask: (args: {
    /** The 'Task' document's ID */
    id: ID
    /** 'Task' input values */
    data: TaskInput
  }) => TaskPromiseChain & {
    execute: (
      request: TaskRequest,
      defaultValue?: Task | null
    ) => Promise<Task | null>
  }
  /** Create a new document in the collection of 'Block' */
  createBlock: (args: {
    /** 'Block' input values */
    data: BlockInput
  }) => BlockPromiseChain & {
    execute: (request: BlockRequest, defaultValue?: Block) => Promise<Block>
  }
  /**
   * Imports Token Metadata. Will be rejected if corresponding asset status isn't
   * Queued. Otherwise updates corresponding TokenAsset transitioning it to
   * Succeeded state.
   */
  importTokenMetadata: ((args?: {
    input?: TokenMetadataImportInput | null
  }) => MetadataPromiseChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata
    ) => Promise<Metadata>
  }) &
    (MetadataPromiseChain & {
      execute: (
        request: MetadataRequest,
        defaultValue?: Metadata
      ) => Promise<Metadata>
    })
  /** Delete an existing document in the collection of 'ERC721ImportResult' */
  deleteERC721ImportResult: (args: {
    /** The 'ERC721ImportResult' document's ID */
    id: ID
  }) => ERC721ImportResultPromiseChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult | null
    ) => Promise<ERC721ImportResult | null>
  }
  /** Update an existing document in the collection of 'Metadata' */
  updateMetadata: (args: {
    /** The 'Metadata' document's ID */
    id: ID
    /** 'Metadata' input values */
    data: MetadataInput
  }) => MetadataPromiseChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata | null
    ) => Promise<Metadata | null>
  }
  /** Create a new document in the collection of 'TokenContract' */
  createTokenContract: (args: {
    /** 'TokenContract' input values */
    data: TokenContractInput
  }) => TokenContractPromiseChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract
    ) => Promise<TokenContract>
  }
  /** Create a new document in the collection of 'Resource' */
  createResource: (args: {
    /** 'Resource' input values */
    data: ResourceInput
  }) => ResourcePromiseChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource
    ) => Promise<Resource>
  }
  /** Update an existing document in the collection of 'Cursor' */
  updateCursor: (args: {
    /** The 'Cursor' document's ID */
    id: ID
    /** 'Cursor' input values */
    data: CursorInput
  }) => CursorPromiseChain & {
    execute: (
      request: CursorRequest,
      defaultValue?: Cursor | null
    ) => Promise<Cursor | null>
  }
  /** Create a new document in the collection of 'Token' */
  createToken: (args: {
    /** 'Token' input values */
    data: TokenInput
  }) => TokenPromiseChain & {
    execute: (request: TokenRequest, defaultValue?: Token) => Promise<Token>
  }
  /** Delete an existing document in the collection of 'Cursor' */
  deleteCursor: (args: {
    /** The 'Cursor' document's ID */
    id: ID
  }) => CursorPromiseChain & {
    execute: (
      request: CursorRequest,
      defaultValue?: Cursor | null
    ) => Promise<Cursor | null>
  }
  reportResourceProblem: ((args?: {
    input?: ResourceProblemInput | null
  }) => ResourcePromiseChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource
    ) => Promise<Resource>
  }) &
    (ResourcePromiseChain & {
      execute: (
        request: ResourceRequest,
        defaultValue?: Resource
      ) => Promise<Resource>
    })
  importERC721: (args: {
    input: ERC721ImportInput
  }) => ERC721ImportResultPromiseChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult
    ) => Promise<ERC721ImportResult>
  }
  /** Update an existing document in the collection of 'TokenContract' */
  updateTokenContract: (args: {
    /** The 'TokenContract' document's ID */
    id: ID
    /** 'TokenContract' input values */
    data: TokenContractInput
  }) => TokenContractPromiseChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Promise<TokenContract | null>
  }
  /** Delete an existing document in the collection of 'Resource' */
  deleteResource: (args: {
    /** The 'Resource' document's ID */
    id: ID
  }) => ResourcePromiseChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource | null
    ) => Promise<Resource | null>
  }
  /** Update an existing document in the collection of 'Owner' */
  updateOwner: (args: {
    /** The 'Owner' document's ID */
    id: ID
    /** 'Owner' input values */
    data: OwnerInput
  }) => OwnerPromiseChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Promise<Owner | null>
  }
  /** Update an existing document in the collection of 'TokenAsset' */
  updateTokenAsset: (args: {
    /** The 'TokenAsset' document's ID */
    id: ID
    /** 'TokenAsset' input values */
    data: TokenAssetInput
  }) => TokenAssetPromiseChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset | null
    ) => Promise<TokenAsset | null>
  }
  /** Delete an existing document in the collection of 'Block' */
  deleteBlock: (args: {
    /** The 'Block' document's ID */
    id: ID
  }) => BlockPromiseChain & {
    execute: (
      request: BlockRequest,
      defaultValue?: Block | null
    ) => Promise<Block | null>
  }
  /** Create a new document in the collection of 'TokenAsset' */
  createTokenAsset: (args: {
    /** 'TokenAsset' input values */
    data: TokenAssetInput
  }) => TokenAssetPromiseChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset
    ) => Promise<TokenAsset>
  }
  /** Create a new document in the collection of 'Cursor' */
  createCursor: (args: {
    /** 'Cursor' input values */
    data: CursorInput
  }) => CursorPromiseChain & {
    execute: (request: CursorRequest, defaultValue?: Cursor) => Promise<Cursor>
  }
  /** Create a new document in the collection of 'Task' */
  createTask: (args: {
    /** 'Task' input values */
    data: TaskInput
  }) => TaskPromiseChain & {
    execute: (request: TaskRequest, defaultValue?: Task) => Promise<Task>
  }
  /** Update an existing document in the collection of 'Token' */
  updateToken: (args: {
    /** The 'Token' document's ID */
    id: ID
    /** 'Token' input values */
    data: TokenInput
  }) => TokenPromiseChain & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token | null
    ) => Promise<Token | null>
  }
  /** Delete an existing document in the collection of 'Task' */
  deleteTask: (args: {
    /** The 'Task' document's ID */
    id: ID
  }) => TaskPromiseChain & {
    execute: (
      request: TaskRequest,
      defaultValue?: Task | null
    ) => Promise<Task | null>
  }
  /** Create a new document in the collection of 'ERC721ImportResult' */
  createERC721ImportResult: (args: {
    /** 'ERC721ImportResult' input values */
    data: ERC721ImportResultInput
  }) => ERC721ImportResultPromiseChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult
    ) => Promise<ERC721ImportResult>
  }
  /** Delete an existing document in the collection of 'TokenContract' */
  deleteTokenContract: (args: {
    /** The 'TokenContract' document's ID */
    id: ID
  }) => TokenContractPromiseChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Promise<TokenContract | null>
  }
  /** Create a new document in the collection of 'Owner' */
  createOwner: (args: {
    /** 'Owner' input values */
    data: OwnerInput
  }) => OwnerPromiseChain & {
    execute: (request: OwnerRequest, defaultValue?: Owner) => Promise<Owner>
  }
  /** Update an existing document in the collection of 'Resource' */
  updateResource: (args: {
    /** The 'Resource' document's ID */
    id: ID
    /** 'Resource' input values */
    data: ResourceInput
  }) => ResourcePromiseChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource | null
    ) => Promise<Resource | null>
  }
  updateResourcePin: ((args?: {
    input?: ResorcePinInput | null
  }) => ResourcePromiseChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource
    ) => Promise<Resource>
  }) &
    (ResourcePromiseChain & {
      execute: (
        request: ResourceRequest,
        defaultValue?: Resource
      ) => Promise<Resource>
    })
  /** Delete an existing document in the collection of 'Metadata' */
  deleteMetadata: (args: {
    /** The 'Metadata' document's ID */
    id: ID
  }) => MetadataPromiseChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata | null
    ) => Promise<Metadata | null>
  }
  /** Update an existing document in the collection of 'Block' */
  updateBlock: (args: {
    /** The 'Block' document's ID */
    id: ID
    /** 'Block' input values */
    data: BlockInput
  }) => BlockPromiseChain & {
    execute: (
      request: BlockRequest,
      defaultValue?: Block | null
    ) => Promise<Block | null>
  }
  /**
   * Reports problem with a TokenAsset e.g. it was impossible to parse URI
   * or was unable to fetch content from URI, or content was not a JSON.
   *
   * Call is rejected if status isn't Queued.
   */
  reportTokenAssetProblem: ((args?: {
    input?: TokenAssetProblemInput | null
  }) => TokenAssetPromiseChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset
    ) => Promise<TokenAsset>
  }) &
    (TokenAssetPromiseChain & {
      execute: (
        request: TokenAssetRequest,
        defaultValue?: TokenAsset
      ) => Promise<TokenAsset>
    })
  /** Update an existing document in the collection of 'ERC721ImportResult' */
  updateERC721ImportResult: (args: {
    /** The 'ERC721ImportResult' document's ID */
    id: ID
    /** 'ERC721ImportResult' input values */
    data: ERC721ImportResultInput
  }) => ERC721ImportResultPromiseChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult | null
    ) => Promise<ERC721ImportResult | null>
  }
}

export interface MutationObservableChain {
  /** Delete an existing document in the collection of 'Owner' */
  deleteOwner: (args: {
    /** The 'Owner' document's ID */
    id: ID
  }) => OwnerObservableChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Observable<Owner | null>
  }
  /** Delete an existing document in the collection of 'TokenAsset' */
  deleteTokenAsset: (args: {
    /** The 'TokenAsset' document's ID */
    id: ID
  }) => TokenAssetObservableChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset | null
    ) => Observable<TokenAsset | null>
  }
  /** Create a new document in the collection of 'Metadata' */
  createMetadata: (args: {
    /** 'Metadata' input values */
    data: MetadataInput
  }) => MetadataObservableChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata
    ) => Observable<Metadata>
  }
  /** Delete an existing document in the collection of 'Token' */
  deleteToken: (args: {
    /** The 'Token' document's ID */
    id: ID
  }) => TokenObservableChain & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token | null
    ) => Observable<Token | null>
  }
  /** Update an existing document in the collection of 'Task' */
  updateTask: (args: {
    /** The 'Task' document's ID */
    id: ID
    /** 'Task' input values */
    data: TaskInput
  }) => TaskObservableChain & {
    execute: (
      request: TaskRequest,
      defaultValue?: Task | null
    ) => Observable<Task | null>
  }
  /** Create a new document in the collection of 'Block' */
  createBlock: (args: {
    /** 'Block' input values */
    data: BlockInput
  }) => BlockObservableChain & {
    execute: (request: BlockRequest, defaultValue?: Block) => Observable<Block>
  }
  /**
   * Imports Token Metadata. Will be rejected if corresponding asset status isn't
   * Queued. Otherwise updates corresponding TokenAsset transitioning it to
   * Succeeded state.
   */
  importTokenMetadata: ((args?: {
    input?: TokenMetadataImportInput | null
  }) => MetadataObservableChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata
    ) => Observable<Metadata>
  }) &
    (MetadataObservableChain & {
      execute: (
        request: MetadataRequest,
        defaultValue?: Metadata
      ) => Observable<Metadata>
    })
  /** Delete an existing document in the collection of 'ERC721ImportResult' */
  deleteERC721ImportResult: (args: {
    /** The 'ERC721ImportResult' document's ID */
    id: ID
  }) => ERC721ImportResultObservableChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult | null
    ) => Observable<ERC721ImportResult | null>
  }
  /** Update an existing document in the collection of 'Metadata' */
  updateMetadata: (args: {
    /** The 'Metadata' document's ID */
    id: ID
    /** 'Metadata' input values */
    data: MetadataInput
  }) => MetadataObservableChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata | null
    ) => Observable<Metadata | null>
  }
  /** Create a new document in the collection of 'TokenContract' */
  createTokenContract: (args: {
    /** 'TokenContract' input values */
    data: TokenContractInput
  }) => TokenContractObservableChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract
    ) => Observable<TokenContract>
  }
  /** Create a new document in the collection of 'Resource' */
  createResource: (args: {
    /** 'Resource' input values */
    data: ResourceInput
  }) => ResourceObservableChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource
    ) => Observable<Resource>
  }
  /** Update an existing document in the collection of 'Cursor' */
  updateCursor: (args: {
    /** The 'Cursor' document's ID */
    id: ID
    /** 'Cursor' input values */
    data: CursorInput
  }) => CursorObservableChain & {
    execute: (
      request: CursorRequest,
      defaultValue?: Cursor | null
    ) => Observable<Cursor | null>
  }
  /** Create a new document in the collection of 'Token' */
  createToken: (args: {
    /** 'Token' input values */
    data: TokenInput
  }) => TokenObservableChain & {
    execute: (request: TokenRequest, defaultValue?: Token) => Observable<Token>
  }
  /** Delete an existing document in the collection of 'Cursor' */
  deleteCursor: (args: {
    /** The 'Cursor' document's ID */
    id: ID
  }) => CursorObservableChain & {
    execute: (
      request: CursorRequest,
      defaultValue?: Cursor | null
    ) => Observable<Cursor | null>
  }
  reportResourceProblem: ((args?: {
    input?: ResourceProblemInput | null
  }) => ResourceObservableChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource
    ) => Observable<Resource>
  }) &
    (ResourceObservableChain & {
      execute: (
        request: ResourceRequest,
        defaultValue?: Resource
      ) => Observable<Resource>
    })
  importERC721: (args: {
    input: ERC721ImportInput
  }) => ERC721ImportResultObservableChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult
    ) => Observable<ERC721ImportResult>
  }
  /** Update an existing document in the collection of 'TokenContract' */
  updateTokenContract: (args: {
    /** The 'TokenContract' document's ID */
    id: ID
    /** 'TokenContract' input values */
    data: TokenContractInput
  }) => TokenContractObservableChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Observable<TokenContract | null>
  }
  /** Delete an existing document in the collection of 'Resource' */
  deleteResource: (args: {
    /** The 'Resource' document's ID */
    id: ID
  }) => ResourceObservableChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource | null
    ) => Observable<Resource | null>
  }
  /** Update an existing document in the collection of 'Owner' */
  updateOwner: (args: {
    /** The 'Owner' document's ID */
    id: ID
    /** 'Owner' input values */
    data: OwnerInput
  }) => OwnerObservableChain & {
    execute: (
      request: OwnerRequest,
      defaultValue?: Owner | null
    ) => Observable<Owner | null>
  }
  /** Update an existing document in the collection of 'TokenAsset' */
  updateTokenAsset: (args: {
    /** The 'TokenAsset' document's ID */
    id: ID
    /** 'TokenAsset' input values */
    data: TokenAssetInput
  }) => TokenAssetObservableChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset | null
    ) => Observable<TokenAsset | null>
  }
  /** Delete an existing document in the collection of 'Block' */
  deleteBlock: (args: {
    /** The 'Block' document's ID */
    id: ID
  }) => BlockObservableChain & {
    execute: (
      request: BlockRequest,
      defaultValue?: Block | null
    ) => Observable<Block | null>
  }
  /** Create a new document in the collection of 'TokenAsset' */
  createTokenAsset: (args: {
    /** 'TokenAsset' input values */
    data: TokenAssetInput
  }) => TokenAssetObservableChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset
    ) => Observable<TokenAsset>
  }
  /** Create a new document in the collection of 'Cursor' */
  createCursor: (args: {
    /** 'Cursor' input values */
    data: CursorInput
  }) => CursorObservableChain & {
    execute: (
      request: CursorRequest,
      defaultValue?: Cursor
    ) => Observable<Cursor>
  }
  /** Create a new document in the collection of 'Task' */
  createTask: (args: {
    /** 'Task' input values */
    data: TaskInput
  }) => TaskObservableChain & {
    execute: (request: TaskRequest, defaultValue?: Task) => Observable<Task>
  }
  /** Update an existing document in the collection of 'Token' */
  updateToken: (args: {
    /** The 'Token' document's ID */
    id: ID
    /** 'Token' input values */
    data: TokenInput
  }) => TokenObservableChain & {
    execute: (
      request: TokenRequest,
      defaultValue?: Token | null
    ) => Observable<Token | null>
  }
  /** Delete an existing document in the collection of 'Task' */
  deleteTask: (args: {
    /** The 'Task' document's ID */
    id: ID
  }) => TaskObservableChain & {
    execute: (
      request: TaskRequest,
      defaultValue?: Task | null
    ) => Observable<Task | null>
  }
  /** Create a new document in the collection of 'ERC721ImportResult' */
  createERC721ImportResult: (args: {
    /** 'ERC721ImportResult' input values */
    data: ERC721ImportResultInput
  }) => ERC721ImportResultObservableChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult
    ) => Observable<ERC721ImportResult>
  }
  /** Delete an existing document in the collection of 'TokenContract' */
  deleteTokenContract: (args: {
    /** The 'TokenContract' document's ID */
    id: ID
  }) => TokenContractObservableChain & {
    execute: (
      request: TokenContractRequest,
      defaultValue?: TokenContract | null
    ) => Observable<TokenContract | null>
  }
  /** Create a new document in the collection of 'Owner' */
  createOwner: (args: {
    /** 'Owner' input values */
    data: OwnerInput
  }) => OwnerObservableChain & {
    execute: (request: OwnerRequest, defaultValue?: Owner) => Observable<Owner>
  }
  /** Update an existing document in the collection of 'Resource' */
  updateResource: (args: {
    /** The 'Resource' document's ID */
    id: ID
    /** 'Resource' input values */
    data: ResourceInput
  }) => ResourceObservableChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource | null
    ) => Observable<Resource | null>
  }
  updateResourcePin: ((args?: {
    input?: ResorcePinInput | null
  }) => ResourceObservableChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource
    ) => Observable<Resource>
  }) &
    (ResourceObservableChain & {
      execute: (
        request: ResourceRequest,
        defaultValue?: Resource
      ) => Observable<Resource>
    })
  /** Delete an existing document in the collection of 'Metadata' */
  deleteMetadata: (args: {
    /** The 'Metadata' document's ID */
    id: ID
  }) => MetadataObservableChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata | null
    ) => Observable<Metadata | null>
  }
  /** Update an existing document in the collection of 'Block' */
  updateBlock: (args: {
    /** The 'Block' document's ID */
    id: ID
    /** 'Block' input values */
    data: BlockInput
  }) => BlockObservableChain & {
    execute: (
      request: BlockRequest,
      defaultValue?: Block | null
    ) => Observable<Block | null>
  }
  /**
   * Reports problem with a TokenAsset e.g. it was impossible to parse URI
   * or was unable to fetch content from URI, or content was not a JSON.
   *
   * Call is rejected if status isn't Queued.
   */
  reportTokenAssetProblem: ((args?: {
    input?: TokenAssetProblemInput | null
  }) => TokenAssetObservableChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset
    ) => Observable<TokenAsset>
  }) &
    (TokenAssetObservableChain & {
      execute: (
        request: TokenAssetRequest,
        defaultValue?: TokenAsset
      ) => Observable<TokenAsset>
    })
  /** Update an existing document in the collection of 'ERC721ImportResult' */
  updateERC721ImportResult: (args: {
    /** The 'ERC721ImportResult' document's ID */
    id: ID
    /** 'ERC721ImportResult' input values */
    data: ERC721ImportResultInput
  }) => ERC721ImportResultObservableChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult | null
    ) => Observable<ERC721ImportResult | null>
  }
}
