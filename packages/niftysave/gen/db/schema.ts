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
  findContentByCID: Content | null
  allImports: ERC721ImportResultPage
  /** Find a document from the collection of 'Owner' by its id. */
  findOwnerByID: Owner | null
  /** Find a document from the collection of 'ERC721ImportResult' by its id. */
  findERC721ImportResultByID: ERC721ImportResult | null
  cursor: Cursor
  /** Find a document from the collection of 'Metadata' by its id. */
  findMetadataByID: Metadata | null
  /** Find a document from the collection of 'PinLocation' by its id. */
  findPinLocationByID: PinLocation | null
  block: Block | null
  /** Find a document from the collection of 'Content' by its id. */
  findContentByID: Content | null
  /** Find a document from the collection of 'Cursor' by its id. */
  findCursorByID: Cursor | null
  findResources: QueryFindResourcesPage
  /** Find a document from the collection of 'TokenAsset' by its id. */
  findTokenAssetByID: TokenAsset | null
  tokens: TokenPage
  owner: Owner | null
  findResourceByURI: Resource | null
  /** Find a document from the collection of 'Pin' by its id. */
  findPinByID: Pin | null
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

/**
 * TokenAsset represents contents of the tokenURI which may not have been found /
 * pinned yet. It may have been added by the chain scraper, when token with this
 * `tokenURI` was discovered. Alternatively it could have been created by an
 * upload to nft.storage, in which case it may not have any refferers but it would
 * have uploads.
 */
export interface TokenAsset {
  /** The document's ID. */
  _id: ID
  /**
   * Human readable description of the status. Usually this ellaborates a reason
   * why token analyzer has failed providing with an error message and stack trace.
   */
  statusText: String | null
  /** URI that was discovered either in the eth chain. */
  tokenURI: String
  /** Time when resource record was last updated. */
  updated: Time
  /**
   * Represents `ipfs://` URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL: String | null
  /** Status of the token asset */
  status: TokenAssetStatus
  /**
   * When `tokenURI` points to JSON file that conforms to the ERC721 Metadata JSON
   * Schema it is fetched parsed and stored as related Metadata document.
   */
  metadata: Metadata | null
  /**
   * Tokens that have this `tokenURI`. This relation allows us to identify all
   * tokens that have a same `tokenURI`.
   */
  referrers: TokenPage
  created: Time
  /** The document's timestamp. */
  _ts: Long
  __typename: 'TokenAsset'
}

export type Time = any

export enum TokenAssetStatus {
  /** Token asset was queued (for the analyzer to process). */
  Queued = 'Queued',
  /** tokenURI is either malformed or the protocol is not supported. */
  URIParseFailed = 'URIParseFailed',
  /** Was unable to fetch the content. */
  ContentFetchFailed = 'ContentFetchFailed',
  /** Parsing ERC721 metadata failed. */
  ContentParseFailed = 'ContentParseFailed',
  /** Failed to create a metadata pin request. */
  PinRequestFailed = 'PinRequestFailed',
  /** Metadata was parsed and all the resources were linked. */
  Linked = 'Linked',
}

export interface Metadata {
  /** Identifies the asset this token represents */
  name: String
  source: TokenAsset
  /** Additional assets that token linked to */
  assets: ResourcePage
  /** A file representing the asset this token represents */
  image: Resource
  /** Describes the asset this token represents */
  description: String
  /** The document's ID. */
  _id: ID
  /** Content corresponding to the metadata. */
  content: Content
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

/**
 * Represents a resource that non-fungible token metadata referenced via URI. In
 * most cases when created will have `uri` discovered on chain with a status
 * `Queued`. Followup jobs will then attempt to locate and pin it's content
 * updating it's state.
 */
export interface Resource {
  /** The document's ID. */
  _id: ID
  /**
   * URI this resource corresponds to. Resources are created for all the URIs
   * that NFT token metadata references.
   */
  uri: String
  /**
   * Human readable description of the status. Would contain error message & stack
   * trace when resource has failed status. Likely omitted when resource is queued
   * or succefully linked.
   */
  statusText: String | null
  /** Time when resource record was last updated. */
  updated: Time
  /**
   * Represents `ipfs://` URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL: String | null
  /**
   * Describes current status of the resource. When resource is discovered during
   * chain scrape record is created with Queued state. Cron job later comes along
   * and processes queued resources fetching / pinning them.
   */
  status: ResourceStatus
  /**
   * Content referrerced by this resource. When `ipfsURL` is derived content
   * archiving job will simply pin content by that URL and update resource linking
   * resource to it. If however `ipfsURL` could not be derived archiving job will
   * attempt to fetch the content from `uri` and pin it again linkking resource
   * to it.
   *
   * Content field is only going to be present when resource has a `ContentLinked`
   * status. From that point on resource is no longer going to be updated.
   */
  content: Content
  /**
   * Backlinks to each non-fungible token metadata that referenced resource with
   * this `uri`.
   */
  referrers: MetadataPage
  /** Time when resource was created. */
  created: Time
  /** The document's timestamp. */
  _ts: Long
  __typename: 'Resource'
}

export enum ResourceStatus {
  /** Resource was queued to be processed. */
  Queued = 'Queued',
  /** URI is either malformed or the protocol is not supported. */
  URIParseFailed = 'URIParseFailed',
  /** Was unable to fetch the content. */
  ContentFetchFailed = 'ContentFetchFailed',
  /** Failed to complete a pin request. */
  PinRequestFailed = 'PinRequestFailed',
  /** Corresponding content was linked. */
  ContentLinked = 'ContentLinked',
}

/**
 * Content correspnoding to a resource(s) that were referreced by non-fungible
 * token metadata. It is identified and unique by it's cid. Content may represent
 * a file, directory or arbitrary Dag in IPFS network.
 */
export interface Content {
  /** The document's ID. */
  _id: ID
  /** Root CID for this content. */
  cid: String
  /**
   * Size of the DAG in bytes. Set if known on upload or for partials is set when
   * content is fully pinned in at least one location.
   */
  dagSize: Int | null
  /** IPFS nodes pinning this content. */
  pins: PinPage
  /**
   * Backlikns to al lthe resources that resolve to this content. Note that
   * different resource URIs may resolve to the same CID.
   */
  resources: ResourcePage
  /** Creation date. */
  created: Time
  /** The document's timestamp. */
  _ts: Long
  __typename: 'Content'
}

/** The pagination object for elements of type 'Pin'. */
export interface PinPage {
  /** The elements of type 'Pin' in this page. */
  data: (Pin | null)[]
  /** A cursor for elements coming after the current page. */
  after: String | null
  /** A cursor for elements coming before the current page. */
  before: String | null
  __typename: 'PinPage'
}

/** Information for piece of content pinned in IPFS. */
export interface Pin {
  /** Reference to a pin location that is pinning it. */
  location: PinLocation
  /** The document's ID. */
  _id: ID
  /**
   * Human readable description of the pin status. Present only when status needs
   * ellaboration e.g. when pin is failed or when pin is queued but actual status
   * could not be obtained from the node.
   */
  statusText: String | null
  /** Last time pin status was updated. */
  updated: Time
  /** Pinning status at this location. */
  status: PinStatus
  /** The content being pinned. */
  content: Content
  /** Time when pin was created. */
  created: Time
  /** The document's timestamp. */
  _ts: Long
  __typename: 'Pin'
}

/** Location of a pin. */
export interface PinLocation {
  /** The document's ID. */
  _id: ID
  /** Libp2p peer ID of the node pinning this pin. */
  peerId: String
  /** Name of the peer pinning this pin. */
  peerName: String | null
  /** Known pins at this location. */
  pins: PinPage
  /** Geographic region this node resides in. */
  region: String | null
  /** The document's timestamp. */
  _ts: Long
  __typename: 'PinLocation'
}

export enum PinStatus {
  /** An error occurred pinning. */
  PinFailed = 'PinFailed',
  /** Node has pinned the content. */
  Pinned = 'Pinned',
  /** Node is currently pinning the content. */
  Pinning = 'Pinning',
  /** The item has been queued for pinning. */
  PinQueued = 'PinQueued',
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
  /** Create a new document in the collection of 'Pin' */
  createPin: Pin
  /** Delete an existing document in the collection of 'TokenAsset' */
  deleteTokenAsset: TokenAsset | null
  /** Update an existing document in the collection of 'Pin' */
  updatePin: Pin | null
  /** Create a new document in the collection of 'Metadata' */
  createMetadata: Metadata
  /** Delete an existing document in the collection of 'Token' */
  deleteToken: Token | null
  /** Create a new document in the collection of 'Block' */
  createBlock: Block
  /** Delete an existing document in the collection of 'ERC721ImportResult' */
  deleteERC721ImportResult: ERC721ImportResult | null
  /** Update an existing document in the collection of 'Metadata' */
  updateMetadata: Metadata | null
  /** Create a new document in the collection of 'TokenContract' */
  createTokenContract: TokenContract
  /** Create a new document in the collection of 'PinLocation' */
  createPinLocation: PinLocation
  /** Create a new document in the collection of 'Resource' */
  createResource: Resource
  /** Update an existing document in the collection of 'Cursor' */
  updateCursor: Cursor | null
  /** Delete an existing document in the collection of 'PinLocation' */
  deletePinLocation: PinLocation | null
  /** Create a new document in the collection of 'Token' */
  createToken: Token
  /** Delete an existing document in the collection of 'Cursor' */
  deleteCursor: Cursor | null
  importERC721: ERC721ImportResult
  updateResources: Resource[]
  /** Update an existing document in the collection of 'TokenContract' */
  updateTokenContract: TokenContract | null
  /** Delete an existing document in the collection of 'Resource' */
  deleteResource: Resource | null
  /** Update an existing document in the collection of 'PinLocation' */
  updatePinLocation: PinLocation | null
  /** Update an existing document in the collection of 'Owner' */
  updateOwner: Owner | null
  updateTokenAsset: TokenAsset
  /** Delete an existing document in the collection of 'Block' */
  deleteBlock: Block | null
  /** Create a new document in the collection of 'TokenAsset' */
  createTokenAsset: TokenAsset
  /** Delete an existing document in the collection of 'Pin' */
  deletePin: Pin | null
  /** Create a new document in the collection of 'Cursor' */
  createCursor: Cursor
  /** Update an existing document in the collection of 'Token' */
  updateToken: Token | null
  /** Create a new document in the collection of 'Content' */
  createContent: Content
  /** Create a new document in the collection of 'ERC721ImportResult' */
  createERC721ImportResult: ERC721ImportResult
  /** Delete an existing document in the collection of 'TokenContract' */
  deleteTokenContract: TokenContract | null
  /** Create a new document in the collection of 'Owner' */
  createOwner: Owner
  /** Update an existing document in the collection of 'Content' */
  updateContent: Content | null
  updateTokenAssets: TokenAsset[]
  updateResource: Resource
  /** Delete an existing document in the collection of 'Metadata' */
  deleteMetadata: Metadata | null
  /** Update an existing document in the collection of 'Block' */
  updateBlock: Block | null
  /** Delete an existing document in the collection of 'Content' */
  deleteContent: Content | null
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
  findContentByCID?: [{ cid?: ID | null }, ContentRequest] | ContentRequest
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
  /** Find a document from the collection of 'PinLocation' by its id. */
  findPinLocationByID?: [
    {
      /** The 'PinLocation' document's ID */
      id: ID
    },
    PinLocationRequest
  ]
  block?:
    | [{ hash?: ID | null; number?: Long | null }, BlockRequest]
    | BlockRequest
  /** Find a document from the collection of 'Content' by its id. */
  findContentByID?: [
    {
      /** The 'Content' document's ID */
      id: ID
    },
    ContentRequest
  ]
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
  findResourceByURI?:
    | [{ uri?: String | null }, ResourceRequest]
    | ResourceRequest
  /** Find a document from the collection of 'Pin' by its id. */
  findPinByID?: [
    {
      /** The 'Pin' document's ID */
      id: ID
    },
    PinRequest
  ]
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

/**
 * TokenAsset represents contents of the tokenURI which may not have been found /
 * pinned yet. It may have been added by the chain scraper, when token with this
 * `tokenURI` was discovered. Alternatively it could have been created by an
 * upload to nft.storage, in which case it may not have any refferers but it would
 * have uploads.
 */
export interface TokenAssetRequest {
  /** The document's ID. */
  _id?: boolean | number
  /**
   * Human readable description of the status. Usually this ellaborates a reason
   * why token analyzer has failed providing with an error message and stack trace.
   */
  statusText?: boolean | number
  /** URI that was discovered either in the eth chain. */
  tokenURI?: boolean | number
  /** Time when resource record was last updated. */
  updated?: boolean | number
  /**
   * Represents `ipfs://` URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL?: boolean | number
  /** Status of the token asset */
  status?: boolean | number
  /**
   * When `tokenURI` points to JSON file that conforms to the ERC721 Metadata JSON
   * Schema it is fetched parsed and stored as related Metadata document.
   */
  metadata?: MetadataRequest
  /**
   * Tokens that have this `tokenURI`. This relation allows us to identify all
   * tokens that have a same `tokenURI`.
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
  created?: boolean | number
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

export interface MetadataRequest {
  /** Identifies the asset this token represents */
  name?: boolean | number
  source?: TokenAssetRequest
  /** Additional assets that token linked to */
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
  /** Content corresponding to the metadata. */
  content?: ContentRequest
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

/**
 * Represents a resource that non-fungible token metadata referenced via URI. In
 * most cases when created will have `uri` discovered on chain with a status
 * `Queued`. Followup jobs will then attempt to locate and pin it's content
 * updating it's state.
 */
export interface ResourceRequest {
  /** The document's ID. */
  _id?: boolean | number
  /**
   * URI this resource corresponds to. Resources are created for all the URIs
   * that NFT token metadata references.
   */
  uri?: boolean | number
  /**
   * Human readable description of the status. Would contain error message & stack
   * trace when resource has failed status. Likely omitted when resource is queued
   * or succefully linked.
   */
  statusText?: boolean | number
  /** Time when resource record was last updated. */
  updated?: boolean | number
  /**
   * Represents `ipfs://` URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL?: boolean | number
  /**
   * Describes current status of the resource. When resource is discovered during
   * chain scrape record is created with Queued state. Cron job later comes along
   * and processes queued resources fetching / pinning them.
   */
  status?: boolean | number
  /**
   * Content referrerced by this resource. When `ipfsURL` is derived content
   * archiving job will simply pin content by that URL and update resource linking
   * resource to it. If however `ipfsURL` could not be derived archiving job will
   * attempt to fetch the content from `uri` and pin it again linkking resource
   * to it.
   *
   * Content field is only going to be present when resource has a `ContentLinked`
   * status. From that point on resource is no longer going to be updated.
   */
  content?: ContentRequest
  /**
   * Backlinks to each non-fungible token metadata that referenced resource with
   * this `uri`.
   */
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
  /** Time when resource was created. */
  created?: boolean | number
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/**
 * Content correspnoding to a resource(s) that were referreced by non-fungible
 * token metadata. It is identified and unique by it's cid. Content may represent
 * a file, directory or arbitrary Dag in IPFS network.
 */
export interface ContentRequest {
  /** The document's ID. */
  _id?: boolean | number
  /** Root CID for this content. */
  cid?: boolean | number
  /**
   * Size of the DAG in bytes. Set if known on upload or for partials is set when
   * content is fully pinned in at least one location.
   */
  dagSize?: boolean | number
  /** IPFS nodes pinning this content. */
  pins?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        PinPageRequest
      ]
    | PinPageRequest
  /**
   * Backlikns to al lthe resources that resolve to this content. Note that
   * different resource URIs may resolve to the same CID.
   */
  resources?:
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
  /** Creation date. */
  created?: boolean | number
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** The pagination object for elements of type 'Pin'. */
export interface PinPageRequest {
  /** The elements of type 'Pin' in this page. */
  data?: PinRequest
  /** A cursor for elements coming after the current page. */
  after?: boolean | number
  /** A cursor for elements coming before the current page. */
  before?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Information for piece of content pinned in IPFS. */
export interface PinRequest {
  /** Reference to a pin location that is pinning it. */
  location?: PinLocationRequest
  /** The document's ID. */
  _id?: boolean | number
  /**
   * Human readable description of the pin status. Present only when status needs
   * ellaboration e.g. when pin is failed or when pin is queued but actual status
   * could not be obtained from the node.
   */
  statusText?: boolean | number
  /** Last time pin status was updated. */
  updated?: boolean | number
  /** Pinning status at this location. */
  status?: boolean | number
  /** The content being pinned. */
  content?: ContentRequest
  /** Time when pin was created. */
  created?: boolean | number
  /** The document's timestamp. */
  _ts?: boolean | number
  __typename?: boolean | number
  __scalar?: boolean | number
}

/** Location of a pin. */
export interface PinLocationRequest {
  /** The document's ID. */
  _id?: boolean | number
  /** Libp2p peer ID of the node pinning this pin. */
  peerId?: boolean | number
  /** Name of the peer pinning this pin. */
  peerName?: boolean | number
  /** Known pins at this location. */
  pins?:
    | [
        {
          /** The number of items to return per page. */
          _size?: Int | null
          /** The pagination cursor. */
          _cursor?: String | null
        },
        PinPageRequest
      ]
    | PinPageRequest
  /** Geographic region this node resides in. */
  region?: boolean | number
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
  /** Create a new document in the collection of 'Pin' */
  createPin?: [
    {
      /** 'Pin' input values */
      data: PinInput
    },
    PinRequest
  ]
  /** Delete an existing document in the collection of 'TokenAsset' */
  deleteTokenAsset?: [
    {
      /** The 'TokenAsset' document's ID */
      id: ID
    },
    TokenAssetRequest
  ]
  /** Update an existing document in the collection of 'Pin' */
  updatePin?: [
    {
      /** The 'Pin' document's ID */
      id: ID
      /** 'Pin' input values */
      data: PinInput
    },
    PinRequest
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
  /** Create a new document in the collection of 'Block' */
  createBlock?: [
    {
      /** 'Block' input values */
      data: BlockInput
    },
    BlockRequest
  ]
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
  /** Create a new document in the collection of 'PinLocation' */
  createPinLocation?: [
    {
      /** 'PinLocation' input values */
      data: PinLocationInput
    },
    PinLocationRequest
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
  /** Delete an existing document in the collection of 'PinLocation' */
  deletePinLocation?: [
    {
      /** The 'PinLocation' document's ID */
      id: ID
    },
    PinLocationRequest
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
  importERC721?: [{ input: ERC721ImportInput }, ERC721ImportResultRequest]
  updateResources?:
    | [{ input?: UpdateResourcesInput | null }, ResourceRequest]
    | ResourceRequest
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
  /** Update an existing document in the collection of 'PinLocation' */
  updatePinLocation?: [
    {
      /** The 'PinLocation' document's ID */
      id: ID
      /** 'PinLocation' input values */
      data: PinLocationInput
    },
    PinLocationRequest
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
  updateTokenAsset?: [{ input: TokenAssetUpdate }, TokenAssetRequest]
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
  /** Delete an existing document in the collection of 'Pin' */
  deletePin?: [
    {
      /** The 'Pin' document's ID */
      id: ID
    },
    PinRequest
  ]
  /** Create a new document in the collection of 'Cursor' */
  createCursor?: [
    {
      /** 'Cursor' input values */
      data: CursorInput
    },
    CursorRequest
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
  /** Create a new document in the collection of 'Content' */
  createContent?: [
    {
      /** 'Content' input values */
      data: ContentInput
    },
    ContentRequest
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
  /** Update an existing document in the collection of 'Content' */
  updateContent?: [
    {
      /** The 'Content' document's ID */
      id: ID
      /** 'Content' input values */
      data: ContentInput
    },
    ContentRequest
  ]
  updateTokenAssets?: [{ input: UpdateTokenAssetsInput }, TokenAssetRequest]
  updateResource?:
    | [{ input?: ResourceUpdate | null }, ResourceRequest]
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
  /** Delete an existing document in the collection of 'Content' */
  deleteContent?: [
    {
      /** The 'Content' document's ID */
      id: ID
    },
    ContentRequest
  ]
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

/** 'Pin' input values */
export interface PinInput {
  /** The content being pinned. */
  content?: PinContentRelation | null
  /** Reference to a pin location that is pinning it. */
  location?: PinLocationRelation | null
  /** Pinning status at this location. */
  status: PinStatus
  /**
   * Human readable description of the pin status. Present only when status needs
   * ellaboration e.g. when pin is failed or when pin is queued but actual status
   * could not be obtained from the node.
   */
  statusText?: String | null
  /** Last time pin status was updated. */
  updated: Time
  /** Time when pin was created. */
  created: Time
}

/** Allow manipulating the relationship between the types 'Pin' and 'Content' using the field 'Pin.content'. */
export interface PinContentRelation {
  /** Create a document of type 'Content' and associate it with the current document. */
  create?: ContentInput | null
  /** Connect a document of type 'Content' with the current document using its ID. */
  connect?: ID | null
}

/** 'Content' input values */
export interface ContentInput {
  /** Root CID for this content. */
  cid: String
  /**
   * Backlikns to al lthe resources that resolve to this content. Note that
   * different resource URIs may resolve to the same CID.
   */
  resources?: ContentResourcesRelation | null
  /** IPFS nodes pinning this content. */
  pins?: ContentPinsRelation | null
  /**
   * Size of the DAG in bytes. Set if known on upload or for partials is set when
   * content is fully pinned in at least one location.
   */
  dagSize?: Int | null
  /** Creation date. */
  created: Time
}

/** Allow manipulating the relationship between the types 'Content' and 'Resource'. */
export interface ContentResourcesRelation {
  /** Create one or more documents of type 'Resource' and associate them with the current document. */
  create?: (ResourceInput | null)[] | null
  /** Connect one or more documents of type 'Resource' with the current document using their IDs. */
  connect?: (ID | null)[] | null
  /** Disconnect the given documents of type 'Resource' from the current document using their IDs. */
  disconnect?: (ID | null)[] | null
}

export interface ResourceInput {
  uri: String
  ipfsURL?: String | null
}

/** Allow manipulating the relationship between the types 'Content' and 'Pin'. */
export interface ContentPinsRelation {
  /** Create one or more documents of type 'Pin' and associate them with the current document. */
  create?: (PinInput | null)[] | null
  /** Connect one or more documents of type 'Pin' with the current document using their IDs. */
  connect?: (ID | null)[] | null
  /** Disconnect the given documents of type 'Pin' from the current document using their IDs. */
  disconnect?: (ID | null)[] | null
}

/** Allow manipulating the relationship between the types 'Pin' and 'PinLocation' using the field 'Pin.location'. */
export interface PinLocationRelation {
  /** Create a document of type 'PinLocation' and associate it with the current document. */
  create?: PinLocationInput | null
  /** Connect a document of type 'PinLocation' with the current document using its ID. */
  connect?: ID | null
}

/** 'PinLocation' input values */
export interface PinLocationInput {
  /** Known pins at this location. */
  pins?: PinLocationPinsRelation | null
  /** Libp2p peer ID of the node pinning this pin. */
  peerId: String
  /** Name of the peer pinning this pin. */
  peerName?: String | null
  /** Geographic region this node resides in. */
  region?: String | null
}

/** Allow manipulating the relationship between the types 'PinLocation' and 'Pin'. */
export interface PinLocationPinsRelation {
  /** Create one or more documents of type 'Pin' and associate them with the current document. */
  create?: (PinInput | null)[] | null
  /** Connect one or more documents of type 'Pin' with the current document using their IDs. */
  connect?: (ID | null)[] | null
  /** Disconnect the given documents of type 'Pin' from the current document using their IDs. */
  disconnect?: (ID | null)[] | null
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
   * Tokens that have this `tokenURI`. This relation allows us to identify all
   * tokens that have a same `tokenURI`.
   */
  referrers?: TokenAssetReferrersRelation | null
  /** URI that was discovered either in the eth chain. */
  tokenURI: String
  /**
   * Represents `ipfs://` URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL?: String | null
  /**
   * When `tokenURI` points to JSON file that conforms to the ERC721 Metadata JSON
   * Schema it is fetched parsed and stored as related Metadata document.
   */
  metadata?: TokenAssetMetadataRelation | null
  created: Time
  /** Time when resource record was last updated. */
  updated: Time
  /** Status of the token asset */
  status: TokenAssetStatus
  /**
   * Human readable description of the status. Usually this ellaborates a reason
   * why token analyzer has failed providing with an error message and stack trace.
   */
  statusText?: String | null
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

/** 'Cursor' input values */
export interface CursorInput {
  id: String
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

export interface UpdateResourcesInput {
  updates: ResourceUpdate[]
}

/** Represents update of the individual resource. */
export interface ResourceUpdate {
  id: ID
  /**
   * New status for the resource. Update will only apply when status moves forward
   * Queued -> URIParseFailed -> ContentFetchFailed -> PinRequestFailed -> ContentLinked
   *
   * Skipping state is fine, however attempt to change status from e.g.
   * ContentLinked to URIParseFailed is simply ignored.
   */
  status: ResourceStatus
  /** Status description. */
  statusText: String
  /**
   * If IPFS URL was inferred from the uri this will be set. When passed status
   * field should either be ContentFetchFailed or ContentLinked.
   */
  ipfsURL?: String | null
  /** If provided status should be `ContentLinked`. */
  cid?: String | null
}

export interface TokenAssetUpdate {
  id: ID
  /**
   * If IPFS URL was inferred from the uri this will be set. When passed status
   * field should either be ContentFetchFailed or ContentLinked.
   */
  ipfsURL?: String | null
  status: TokenAssetStatus
  statusText: String
  metadata?: MetadataInput | null
}

export interface UpdateTokenAssetsInput {
  updates: TokenAssetUpdate[]
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

/** Allow manipulating the relationship between the types 'Metadata' and 'Content' using the field 'Metadata.content'. */
export interface MetadataContentRelation {
  /** Create a document of type 'Content' and associate it with the current document. */
  create?: ContentInput | null
  /** Connect a document of type 'Content' with the current document using its ID. */
  connect?: ID | null
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

/** Allow manipulating the relationship between the types 'Resource' and 'Content' using the field 'Resource.content'. */
export interface ResourceContentRelation {
  /** Create a document of type 'Content' and associate it with the current document. */
  create?: ContentInput | null
  /** Connect a document of type 'Content' with the current document using its ID. */
  connect?: ID | null
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

const Content_possibleTypes = ['Content']
export const isContent = (obj: { __typename: String }): obj is Content => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Content_possibleTypes.includes(obj.__typename)
}

const PinPage_possibleTypes = ['PinPage']
export const isPinPage = (obj: { __typename: String }): obj is PinPage => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PinPage_possibleTypes.includes(obj.__typename)
}

const Pin_possibleTypes = ['Pin']
export const isPin = (obj: { __typename: String }): obj is Pin => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Pin_possibleTypes.includes(obj.__typename)
}

const PinLocation_possibleTypes = ['PinLocation']
export const isPinLocation = (obj: {
  __typename: String
}): obj is PinLocation => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PinLocation_possibleTypes.includes(obj.__typename)
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
  findContentByCID: ((args?: { cid?: ID | null }) => ContentPromiseChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content | null
    ) => Promise<Content | null>
  }) &
    (ContentPromiseChain & {
      execute: (
        request: ContentRequest,
        defaultValue?: Content | null
      ) => Promise<Content | null>
    })
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
  /** Find a document from the collection of 'PinLocation' by its id. */
  findPinLocationByID: (args: {
    /** The 'PinLocation' document's ID */
    id: ID
  }) => PinLocationPromiseChain & {
    execute: (
      request: PinLocationRequest,
      defaultValue?: PinLocation | null
    ) => Promise<PinLocation | null>
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
  /** Find a document from the collection of 'Content' by its id. */
  findContentByID: (args: {
    /** The 'Content' document's ID */
    id: ID
  }) => ContentPromiseChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content | null
    ) => Promise<Content | null>
  }
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
  findResourceByURI: ((args?: {
    uri?: String | null
  }) => ResourcePromiseChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource | null
    ) => Promise<Resource | null>
  }) &
    (ResourcePromiseChain & {
      execute: (
        request: ResourceRequest,
        defaultValue?: Resource | null
      ) => Promise<Resource | null>
    })
  /** Find a document from the collection of 'Pin' by its id. */
  findPinByID: (args: {
    /** The 'Pin' document's ID */
    id: ID
  }) => PinPromiseChain & {
    execute: (
      request: PinRequest,
      defaultValue?: Pin | null
    ) => Promise<Pin | null>
  }
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
  findContentByCID: ((args?: { cid?: ID | null }) => ContentObservableChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content | null
    ) => Observable<Content | null>
  }) &
    (ContentObservableChain & {
      execute: (
        request: ContentRequest,
        defaultValue?: Content | null
      ) => Observable<Content | null>
    })
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
  /** Find a document from the collection of 'PinLocation' by its id. */
  findPinLocationByID: (args: {
    /** The 'PinLocation' document's ID */
    id: ID
  }) => PinLocationObservableChain & {
    execute: (
      request: PinLocationRequest,
      defaultValue?: PinLocation | null
    ) => Observable<PinLocation | null>
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
  /** Find a document from the collection of 'Content' by its id. */
  findContentByID: (args: {
    /** The 'Content' document's ID */
    id: ID
  }) => ContentObservableChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content | null
    ) => Observable<Content | null>
  }
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
  findResourceByURI: ((args?: {
    uri?: String | null
  }) => ResourceObservableChain & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource | null
    ) => Observable<Resource | null>
  }) &
    (ResourceObservableChain & {
      execute: (
        request: ResourceRequest,
        defaultValue?: Resource | null
      ) => Observable<Resource | null>
    })
  /** Find a document from the collection of 'Pin' by its id. */
  findPinByID: (args: {
    /** The 'Pin' document's ID */
    id: ID
  }) => PinObservableChain & {
    execute: (
      request: PinRequest,
      defaultValue?: Pin | null
    ) => Observable<Pin | null>
  }
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

/**
 * TokenAsset represents contents of the tokenURI which may not have been found /
 * pinned yet. It may have been added by the chain scraper, when token with this
 * `tokenURI` was discovered. Alternatively it could have been created by an
 * upload to nft.storage, in which case it may not have any refferers but it would
 * have uploads.
 */
export interface TokenAssetPromiseChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /**
   * Human readable description of the status. Usually this ellaborates a reason
   * why token analyzer has failed providing with an error message and stack trace.
   */
  statusText: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** URI that was discovered either in the eth chain. */
  tokenURI: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /** Time when resource record was last updated. */
  updated: {
    execute: (request?: boolean | number, defaultValue?: Time) => Promise<Time>
  }
  /**
   * Represents `ipfs://` URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** Status of the token asset */
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: TokenAssetStatus
    ) => Promise<TokenAssetStatus>
  }
  /**
   * When `tokenURI` points to JSON file that conforms to the ERC721 Metadata JSON
   * Schema it is fetched parsed and stored as related Metadata document.
   */
  metadata: MetadataPromiseChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata | null
    ) => Promise<Metadata | null>
  }
  /**
   * Tokens that have this `tokenURI`. This relation allows us to identify all
   * tokens that have a same `tokenURI`.
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
  created: {
    execute: (request?: boolean | number, defaultValue?: Time) => Promise<Time>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

/**
 * TokenAsset represents contents of the tokenURI which may not have been found /
 * pinned yet. It may have been added by the chain scraper, when token with this
 * `tokenURI` was discovered. Alternatively it could have been created by an
 * upload to nft.storage, in which case it may not have any refferers but it would
 * have uploads.
 */
export interface TokenAssetObservableChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /**
   * Human readable description of the status. Usually this ellaborates a reason
   * why token analyzer has failed providing with an error message and stack trace.
   */
  statusText: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** URI that was discovered either in the eth chain. */
  tokenURI: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /** Time when resource record was last updated. */
  updated: {
    execute: (
      request?: boolean | number,
      defaultValue?: Time
    ) => Observable<Time>
  }
  /**
   * Represents `ipfs://` URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** Status of the token asset */
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: TokenAssetStatus
    ) => Observable<TokenAssetStatus>
  }
  /**
   * When `tokenURI` points to JSON file that conforms to the ERC721 Metadata JSON
   * Schema it is fetched parsed and stored as related Metadata document.
   */
  metadata: MetadataObservableChain & {
    execute: (
      request: MetadataRequest,
      defaultValue?: Metadata | null
    ) => Observable<Metadata | null>
  }
  /**
   * Tokens that have this `tokenURI`. This relation allows us to identify all
   * tokens that have a same `tokenURI`.
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
  created: {
    execute: (
      request?: boolean | number,
      defaultValue?: Time
    ) => Observable<Time>
  }
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
  /** Additional assets that token linked to */
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
  /** Content corresponding to the metadata. */
  content: ContentPromiseChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content
    ) => Promise<Content>
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
  /** Additional assets that token linked to */
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
  /** Content corresponding to the metadata. */
  content: ContentObservableChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content
    ) => Observable<Content>
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

/**
 * Represents a resource that non-fungible token metadata referenced via URI. In
 * most cases when created will have `uri` discovered on chain with a status
 * `Queued`. Followup jobs will then attempt to locate and pin it's content
 * updating it's state.
 */
export interface ResourcePromiseChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /**
   * URI this resource corresponds to. Resources are created for all the URIs
   * that NFT token metadata references.
   */
  uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /**
   * Human readable description of the status. Would contain error message & stack
   * trace when resource has failed status. Likely omitted when resource is queued
   * or succefully linked.
   */
  statusText: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** Time when resource record was last updated. */
  updated: {
    execute: (request?: boolean | number, defaultValue?: Time) => Promise<Time>
  }
  /**
   * Represents `ipfs://` URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /**
   * Describes current status of the resource. When resource is discovered during
   * chain scrape record is created with Queued state. Cron job later comes along
   * and processes queued resources fetching / pinning them.
   */
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: ResourceStatus
    ) => Promise<ResourceStatus>
  }
  /**
   * Content referrerced by this resource. When `ipfsURL` is derived content
   * archiving job will simply pin content by that URL and update resource linking
   * resource to it. If however `ipfsURL` could not be derived archiving job will
   * attempt to fetch the content from `uri` and pin it again linkking resource
   * to it.
   *
   * Content field is only going to be present when resource has a `ContentLinked`
   * status. From that point on resource is no longer going to be updated.
   */
  content: ContentPromiseChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content
    ) => Promise<Content>
  }
  /**
   * Backlinks to each non-fungible token metadata that referenced resource with
   * this `uri`.
   */
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
  /** Time when resource was created. */
  created: {
    execute: (request?: boolean | number, defaultValue?: Time) => Promise<Time>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

/**
 * Represents a resource that non-fungible token metadata referenced via URI. In
 * most cases when created will have `uri` discovered on chain with a status
 * `Queued`. Followup jobs will then attempt to locate and pin it's content
 * updating it's state.
 */
export interface ResourceObservableChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /**
   * URI this resource corresponds to. Resources are created for all the URIs
   * that NFT token metadata references.
   */
  uri: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /**
   * Human readable description of the status. Would contain error message & stack
   * trace when resource has failed status. Likely omitted when resource is queued
   * or succefully linked.
   */
  statusText: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** Time when resource record was last updated. */
  updated: {
    execute: (
      request?: boolean | number,
      defaultValue?: Time
    ) => Observable<Time>
  }
  /**
   * Represents `ipfs://` URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /**
   * Describes current status of the resource. When resource is discovered during
   * chain scrape record is created with Queued state. Cron job later comes along
   * and processes queued resources fetching / pinning them.
   */
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: ResourceStatus
    ) => Observable<ResourceStatus>
  }
  /**
   * Content referrerced by this resource. When `ipfsURL` is derived content
   * archiving job will simply pin content by that URL and update resource linking
   * resource to it. If however `ipfsURL` could not be derived archiving job will
   * attempt to fetch the content from `uri` and pin it again linkking resource
   * to it.
   *
   * Content field is only going to be present when resource has a `ContentLinked`
   * status. From that point on resource is no longer going to be updated.
   */
  content: ContentObservableChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content
    ) => Observable<Content>
  }
  /**
   * Backlinks to each non-fungible token metadata that referenced resource with
   * this `uri`.
   */
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
  /** Time when resource was created. */
  created: {
    execute: (
      request?: boolean | number,
      defaultValue?: Time
    ) => Observable<Time>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
}

/**
 * Content correspnoding to a resource(s) that were referreced by non-fungible
 * token metadata. It is identified and unique by it's cid. Content may represent
 * a file, directory or arbitrary Dag in IPFS network.
 */
export interface ContentPromiseChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /** Root CID for this content. */
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /**
   * Size of the DAG in bytes. Set if known on upload or for partials is set when
   * content is fully pinned in at least one location.
   */
  dagSize: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Promise<Int | null>
  }
  /** IPFS nodes pinning this content. */
  pins: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => PinPagePromiseChain & {
    execute: (
      request: PinPageRequest,
      defaultValue?: PinPage
    ) => Promise<PinPage>
  }) &
    (PinPagePromiseChain & {
      execute: (
        request: PinPageRequest,
        defaultValue?: PinPage
      ) => Promise<PinPage>
    })
  /**
   * Backlikns to al lthe resources that resolve to this content. Note that
   * different resource URIs may resolve to the same CID.
   */
  resources: ((args?: {
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
  /** Creation date. */
  created: {
    execute: (request?: boolean | number, defaultValue?: Time) => Promise<Time>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

/**
 * Content correspnoding to a resource(s) that were referreced by non-fungible
 * token metadata. It is identified and unique by it's cid. Content may represent
 * a file, directory or arbitrary Dag in IPFS network.
 */
export interface ContentObservableChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /** Root CID for this content. */
  cid: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /**
   * Size of the DAG in bytes. Set if known on upload or for partials is set when
   * content is fully pinned in at least one location.
   */
  dagSize: {
    execute: (
      request?: boolean | number,
      defaultValue?: Int | null
    ) => Observable<Int | null>
  }
  /** IPFS nodes pinning this content. */
  pins: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => PinPageObservableChain & {
    execute: (
      request: PinPageRequest,
      defaultValue?: PinPage
    ) => Observable<PinPage>
  }) &
    (PinPageObservableChain & {
      execute: (
        request: PinPageRequest,
        defaultValue?: PinPage
      ) => Observable<PinPage>
    })
  /**
   * Backlikns to al lthe resources that resolve to this content. Note that
   * different resource URIs may resolve to the same CID.
   */
  resources: ((args?: {
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
  /** Creation date. */
  created: {
    execute: (
      request?: boolean | number,
      defaultValue?: Time
    ) => Observable<Time>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
}

/** The pagination object for elements of type 'Pin'. */
export interface PinPagePromiseChain {
  /** The elements of type 'Pin' in this page. */
  data: {
    execute: (
      request: PinRequest,
      defaultValue?: (Pin | null)[]
    ) => Promise<(Pin | null)[]>
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

/** The pagination object for elements of type 'Pin'. */
export interface PinPageObservableChain {
  /** The elements of type 'Pin' in this page. */
  data: {
    execute: (
      request: PinRequest,
      defaultValue?: (Pin | null)[]
    ) => Observable<(Pin | null)[]>
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

/** Information for piece of content pinned in IPFS. */
export interface PinPromiseChain {
  /** Reference to a pin location that is pinning it. */
  location: PinLocationPromiseChain & {
    execute: (
      request: PinLocationRequest,
      defaultValue?: PinLocation
    ) => Promise<PinLocation>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /**
   * Human readable description of the pin status. Present only when status needs
   * ellaboration e.g. when pin is failed or when pin is queued but actual status
   * could not be obtained from the node.
   */
  statusText: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** Last time pin status was updated. */
  updated: {
    execute: (request?: boolean | number, defaultValue?: Time) => Promise<Time>
  }
  /** Pinning status at this location. */
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: PinStatus
    ) => Promise<PinStatus>
  }
  /** The content being pinned. */
  content: ContentPromiseChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content
    ) => Promise<Content>
  }
  /** Time when pin was created. */
  created: {
    execute: (request?: boolean | number, defaultValue?: Time) => Promise<Time>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

/** Information for piece of content pinned in IPFS. */
export interface PinObservableChain {
  /** Reference to a pin location that is pinning it. */
  location: PinLocationObservableChain & {
    execute: (
      request: PinLocationRequest,
      defaultValue?: PinLocation
    ) => Observable<PinLocation>
  }
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /**
   * Human readable description of the pin status. Present only when status needs
   * ellaboration e.g. when pin is failed or when pin is queued but actual status
   * could not be obtained from the node.
   */
  statusText: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** Last time pin status was updated. */
  updated: {
    execute: (
      request?: boolean | number,
      defaultValue?: Time
    ) => Observable<Time>
  }
  /** Pinning status at this location. */
  status: {
    execute: (
      request?: boolean | number,
      defaultValue?: PinStatus
    ) => Observable<PinStatus>
  }
  /** The content being pinned. */
  content: ContentObservableChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content
    ) => Observable<Content>
  }
  /** Time when pin was created. */
  created: {
    execute: (
      request?: boolean | number,
      defaultValue?: Time
    ) => Observable<Time>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (
      request?: boolean | number,
      defaultValue?: Long
    ) => Observable<Long>
  }
}

/** Location of a pin. */
export interface PinLocationPromiseChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Promise<ID>
  }
  /** Libp2p peer ID of the node pinning this pin. */
  peerId: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Promise<String>
  }
  /** Name of the peer pinning this pin. */
  peerName: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** Known pins at this location. */
  pins: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => PinPagePromiseChain & {
    execute: (
      request: PinPageRequest,
      defaultValue?: PinPage
    ) => Promise<PinPage>
  }) &
    (PinPagePromiseChain & {
      execute: (
        request: PinPageRequest,
        defaultValue?: PinPage
      ) => Promise<PinPage>
    })
  /** Geographic region this node resides in. */
  region: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Promise<String | null>
  }
  /** The document's timestamp. */
  _ts: {
    execute: (request?: boolean | number, defaultValue?: Long) => Promise<Long>
  }
}

/** Location of a pin. */
export interface PinLocationObservableChain {
  /** The document's ID. */
  _id: {
    execute: (request?: boolean | number, defaultValue?: ID) => Observable<ID>
  }
  /** Libp2p peer ID of the node pinning this pin. */
  peerId: {
    execute: (
      request?: boolean | number,
      defaultValue?: String
    ) => Observable<String>
  }
  /** Name of the peer pinning this pin. */
  peerName: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
  /** Known pins at this location. */
  pins: ((args?: {
    /** The number of items to return per page. */
    _size?: Int | null
    /** The pagination cursor. */
    _cursor?: String | null
  }) => PinPageObservableChain & {
    execute: (
      request: PinPageRequest,
      defaultValue?: PinPage
    ) => Observable<PinPage>
  }) &
    (PinPageObservableChain & {
      execute: (
        request: PinPageRequest,
        defaultValue?: PinPage
      ) => Observable<PinPage>
    })
  /** Geographic region this node resides in. */
  region: {
    execute: (
      request?: boolean | number,
      defaultValue?: String | null
    ) => Observable<String | null>
  }
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
  /** Create a new document in the collection of 'Pin' */
  createPin: (args: {
    /** 'Pin' input values */
    data: PinInput
  }) => PinPromiseChain & {
    execute: (request: PinRequest, defaultValue?: Pin) => Promise<Pin>
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
  /** Update an existing document in the collection of 'Pin' */
  updatePin: (args: {
    /** The 'Pin' document's ID */
    id: ID
    /** 'Pin' input values */
    data: PinInput
  }) => PinPromiseChain & {
    execute: (
      request: PinRequest,
      defaultValue?: Pin | null
    ) => Promise<Pin | null>
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
  /** Create a new document in the collection of 'Block' */
  createBlock: (args: {
    /** 'Block' input values */
    data: BlockInput
  }) => BlockPromiseChain & {
    execute: (request: BlockRequest, defaultValue?: Block) => Promise<Block>
  }
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
  /** Create a new document in the collection of 'PinLocation' */
  createPinLocation: (args: {
    /** 'PinLocation' input values */
    data: PinLocationInput
  }) => PinLocationPromiseChain & {
    execute: (
      request: PinLocationRequest,
      defaultValue?: PinLocation
    ) => Promise<PinLocation>
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
  /** Delete an existing document in the collection of 'PinLocation' */
  deletePinLocation: (args: {
    /** The 'PinLocation' document's ID */
    id: ID
  }) => PinLocationPromiseChain & {
    execute: (
      request: PinLocationRequest,
      defaultValue?: PinLocation | null
    ) => Promise<PinLocation | null>
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
  importERC721: (args: {
    input: ERC721ImportInput
  }) => ERC721ImportResultPromiseChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult
    ) => Promise<ERC721ImportResult>
  }
  updateResources: ((args?: { input?: UpdateResourcesInput | null }) => {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource[]
    ) => Promise<Resource[]>
  }) & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource[]
    ) => Promise<Resource[]>
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
  /** Update an existing document in the collection of 'PinLocation' */
  updatePinLocation: (args: {
    /** The 'PinLocation' document's ID */
    id: ID
    /** 'PinLocation' input values */
    data: PinLocationInput
  }) => PinLocationPromiseChain & {
    execute: (
      request: PinLocationRequest,
      defaultValue?: PinLocation | null
    ) => Promise<PinLocation | null>
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
  updateTokenAsset: (args: {
    input: TokenAssetUpdate
  }) => TokenAssetPromiseChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset
    ) => Promise<TokenAsset>
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
  /** Delete an existing document in the collection of 'Pin' */
  deletePin: (args: {
    /** The 'Pin' document's ID */
    id: ID
  }) => PinPromiseChain & {
    execute: (
      request: PinRequest,
      defaultValue?: Pin | null
    ) => Promise<Pin | null>
  }
  /** Create a new document in the collection of 'Cursor' */
  createCursor: (args: {
    /** 'Cursor' input values */
    data: CursorInput
  }) => CursorPromiseChain & {
    execute: (request: CursorRequest, defaultValue?: Cursor) => Promise<Cursor>
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
  /** Create a new document in the collection of 'Content' */
  createContent: (args: {
    /** 'Content' input values */
    data: ContentInput
  }) => ContentPromiseChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content
    ) => Promise<Content>
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
  /** Update an existing document in the collection of 'Content' */
  updateContent: (args: {
    /** The 'Content' document's ID */
    id: ID
    /** 'Content' input values */
    data: ContentInput
  }) => ContentPromiseChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content | null
    ) => Promise<Content | null>
  }
  updateTokenAssets: (args: { input: UpdateTokenAssetsInput }) => {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset[]
    ) => Promise<TokenAsset[]>
  }
  updateResource: ((args?: {
    input?: ResourceUpdate | null
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
  /** Delete an existing document in the collection of 'Content' */
  deleteContent: (args: {
    /** The 'Content' document's ID */
    id: ID
  }) => ContentPromiseChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content | null
    ) => Promise<Content | null>
  }
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
  /** Create a new document in the collection of 'Pin' */
  createPin: (args: {
    /** 'Pin' input values */
    data: PinInput
  }) => PinObservableChain & {
    execute: (request: PinRequest, defaultValue?: Pin) => Observable<Pin>
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
  /** Update an existing document in the collection of 'Pin' */
  updatePin: (args: {
    /** The 'Pin' document's ID */
    id: ID
    /** 'Pin' input values */
    data: PinInput
  }) => PinObservableChain & {
    execute: (
      request: PinRequest,
      defaultValue?: Pin | null
    ) => Observable<Pin | null>
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
  /** Create a new document in the collection of 'Block' */
  createBlock: (args: {
    /** 'Block' input values */
    data: BlockInput
  }) => BlockObservableChain & {
    execute: (request: BlockRequest, defaultValue?: Block) => Observable<Block>
  }
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
  /** Create a new document in the collection of 'PinLocation' */
  createPinLocation: (args: {
    /** 'PinLocation' input values */
    data: PinLocationInput
  }) => PinLocationObservableChain & {
    execute: (
      request: PinLocationRequest,
      defaultValue?: PinLocation
    ) => Observable<PinLocation>
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
  /** Delete an existing document in the collection of 'PinLocation' */
  deletePinLocation: (args: {
    /** The 'PinLocation' document's ID */
    id: ID
  }) => PinLocationObservableChain & {
    execute: (
      request: PinLocationRequest,
      defaultValue?: PinLocation | null
    ) => Observable<PinLocation | null>
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
  importERC721: (args: {
    input: ERC721ImportInput
  }) => ERC721ImportResultObservableChain & {
    execute: (
      request: ERC721ImportResultRequest,
      defaultValue?: ERC721ImportResult
    ) => Observable<ERC721ImportResult>
  }
  updateResources: ((args?: { input?: UpdateResourcesInput | null }) => {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource[]
    ) => Observable<Resource[]>
  }) & {
    execute: (
      request: ResourceRequest,
      defaultValue?: Resource[]
    ) => Observable<Resource[]>
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
  /** Update an existing document in the collection of 'PinLocation' */
  updatePinLocation: (args: {
    /** The 'PinLocation' document's ID */
    id: ID
    /** 'PinLocation' input values */
    data: PinLocationInput
  }) => PinLocationObservableChain & {
    execute: (
      request: PinLocationRequest,
      defaultValue?: PinLocation | null
    ) => Observable<PinLocation | null>
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
  updateTokenAsset: (args: {
    input: TokenAssetUpdate
  }) => TokenAssetObservableChain & {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset
    ) => Observable<TokenAsset>
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
  /** Delete an existing document in the collection of 'Pin' */
  deletePin: (args: {
    /** The 'Pin' document's ID */
    id: ID
  }) => PinObservableChain & {
    execute: (
      request: PinRequest,
      defaultValue?: Pin | null
    ) => Observable<Pin | null>
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
  /** Create a new document in the collection of 'Content' */
  createContent: (args: {
    /** 'Content' input values */
    data: ContentInput
  }) => ContentObservableChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content
    ) => Observable<Content>
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
  /** Update an existing document in the collection of 'Content' */
  updateContent: (args: {
    /** The 'Content' document's ID */
    id: ID
    /** 'Content' input values */
    data: ContentInput
  }) => ContentObservableChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content | null
    ) => Observable<Content | null>
  }
  updateTokenAssets: (args: { input: UpdateTokenAssetsInput }) => {
    execute: (
      request: TokenAssetRequest,
      defaultValue?: TokenAsset[]
    ) => Observable<TokenAsset[]>
  }
  updateResource: ((args?: {
    input?: ResourceUpdate | null
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
  /** Delete an existing document in the collection of 'Content' */
  deleteContent: (args: {
    /** The 'Content' document's ID */
    id: ID
  }) => ContentObservableChain & {
    execute: (
      request: ContentRequest,
      defaultValue?: Content | null
    ) => Observable<Content | null>
  }
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
