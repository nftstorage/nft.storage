import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Date: any
  /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
  Long: any
  Time: any
}

export type Block = {
  /** The block number */
  number: Scalars['Long']
  /** The document's ID. */
  _id: Scalars['ID']
  /** The hash of the block */
  hash: Scalars['ID']
  tokens: TokenPage
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

export type BlockTokensArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** 'Block' input values */
export type BlockInput = {
  /** The hash of the block */
  hash: Scalars['ID']
  /** The block number */
  number: Scalars['Long']
  tokens?: Maybe<BlockTokensRelation>
}

/** The pagination object for elements of type 'Block'. */
export type BlockPage = {
  /** The elements of type 'Block' in this page. */
  data: Array<Maybe<Block>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

/** Allow manipulating the relationship between the types 'Block' and 'Token'. */
export type BlockTokensRelation = {
  /** Create one or more documents of type 'Token' and associate them with the current document. */
  create?: Maybe<Array<Maybe<TokenInput>>>
  /** Connect one or more documents of type 'Token' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'Token' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

/**
 * Content corresponding to a resource(s) that were referreced by non-fungible
 * token metadata. It is identified and unique by it's cid. Content may represent
 * a file, directory or arbitrary Dag in IPFS network.
 */
export type Content = {
  /** The document's ID. */
  _id: Scalars['ID']
  /** Root CID for this content. */
  cid: Scalars['String']
  /**
   * Size of the DAG in bytes. Set if known on upload or for partials is set when
   * content is fully pinned in at least one location.
   */
  dagSize?: Maybe<Scalars['Int']>
  /** IPFS nodes pinning this content. */
  pins: PinPage
  /**
   * Backlinks to all the resources that resolve to this content. Note that
   * different resource URIs may resolve to the same CID.
   */
  resources: ResourcePage
  /** Creation date. */
  created: Scalars['Time']
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

/**
 * Content corresponding to a resource(s) that were referreced by non-fungible
 * token metadata. It is identified and unique by it's cid. Content may represent
 * a file, directory or arbitrary Dag in IPFS network.
 */
export type ContentPinsArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/**
 * Content corresponding to a resource(s) that were referreced by non-fungible
 * token metadata. It is identified and unique by it's cid. Content may represent
 * a file, directory or arbitrary Dag in IPFS network.
 */
export type ContentResourcesArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** 'Content' input values */
export type ContentInput = {
  /** Root CID for this content. */
  cid: Scalars['String']
  /**
   * Backlinks to all the resources that resolve to this content. Note that
   * different resource URIs may resolve to the same CID.
   */
  resources?: Maybe<ContentResourcesRelation>
  /** IPFS nodes pinning this content. */
  pins?: Maybe<ContentPinsRelation>
  /**
   * Size of the DAG in bytes. Set if known on upload or for partials is set when
   * content is fully pinned in at least one location.
   */
  dagSize?: Maybe<Scalars['Int']>
  /** Creation date. */
  created: Scalars['Time']
}

/** Allow manipulating the relationship between the types 'Content' and 'Pin'. */
export type ContentPinsRelation = {
  /** Create one or more documents of type 'Pin' and associate them with the current document. */
  create?: Maybe<Array<Maybe<PinInput>>>
  /** Connect one or more documents of type 'Pin' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'Pin' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

/** Allow manipulating the relationship between the types 'Content' and 'Resource'. */
export type ContentResourcesRelation = {
  /** Create one or more documents of type 'Resource' and associate them with the current document. */
  create?: Maybe<Array<Maybe<ResourceInput>>>
  /** Connect one or more documents of type 'Resource' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'Resource' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

export type CreateUploadInput = {
  type: UploadType
  cid: Scalars['String']
  dagSize: Scalars['Int']
}

export type CreateUserInput = {
  sub: Scalars['String']
  issuer: Scalars['String']
  email: Scalars['String']
  publicAddress: Scalars['String']
  name: Scalars['String']
  picture?: Maybe<Scalars['String']>
  github?: Maybe<Scalars['String']>
}

export type Cursor = {
  /** The document's ID. */
  _id: Scalars['ID']
  /** The document's timestamp. */
  _ts: Scalars['Long']
  id: Scalars['String']
}

/** 'Cursor' input values */
export type CursorInput = {
  id: Scalars['String']
}

export type Erc721ImportInput = {
  /**
   * Cursor from which import started. If current cursor changed import will be
   * rejected.
   */
  id: Scalars['String']
  /** Tokens to be imported. */
  tokens: Array<Erc721ImportTokenInput>
}

export type Erc721ImportResult = {
  /** The document's ID. */
  _id: Scalars['ID']
  /** New cursor after this import. */
  nextID: Scalars['String']
  /** Cursor from which import started. */
  id: Scalars['String']
  /** Tokens that were imported. */
  tokens: TokenPage
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

export type Erc721ImportResultTokensArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** 'ERC721ImportResult' input values */
export type Erc721ImportResultInput = {
  /** Cursor from which import started. */
  id: Scalars['String']
  /** New cursor after this import. */
  nextID: Scalars['String']
  /** Tokens that were imported. */
  tokens?: Maybe<Erc721ImportResultTokensRelation>
}

/** The pagination object for elements of type 'ERC721ImportResult'. */
export type Erc721ImportResultPage = {
  /** The elements of type 'ERC721ImportResult' in this page. */
  data: Array<Maybe<Erc721ImportResult>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

/** Allow manipulating the relationship between the types 'ERC721ImportResult' and 'Token'. */
export type Erc721ImportResultTokensRelation = {
  /** Create one or more documents of type 'Token' and associate them with the current document. */
  create?: Maybe<Array<Maybe<TokenInput>>>
  /** Connect one or more documents of type 'Token' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'Token' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

export type Erc721ImportTokenContractInput = {
  id: Scalars['ID']
  name?: Maybe<Scalars['String']>
  symbol?: Maybe<Scalars['String']>
  supportsEIP721Metadata: Scalars['Boolean']
}

export type Erc721ImportTokenInput = {
  id: Scalars['ID']
  tokenID: Scalars['String']
  tokenURI: Scalars['String']
  mintTime: Scalars['String']
  blockHash: Scalars['String']
  blockNumber: Scalars['String']
  contract: Erc721ImportTokenContractInput
  owner: Erc721ImportTokenOwnerInput
}

export type Erc721ImportTokenOwnerInput = {
  id: Scalars['ID']
}

export type Erc721MetadataQuery = {
  name?: Maybe<Scalars['String']>
  symbol?: Maybe<Scalars['String']>
  tokenURI?: Maybe<Scalars['String']>
  ipnft?: Maybe<Scalars['String']>
}

export type FindResourceInput = {
  status?: Maybe<ResourceStatus>
}

export type FindTokenAssetsInput = {
  status?: Maybe<TokenAssetStatus>
}

export type LoginOutput = {
  secret: Scalars['String']
  email: Scalars['String']
  issuer: Scalars['String']
  ref: Scalars['String']
  sub: Scalars['String']
}

/** 'LoginOutput' input values */
export type LoginOutputInput = {
  secret: Scalars['String']
  sub: Scalars['String']
  issuer: Scalars['String']
  email: Scalars['String']
  ref: Scalars['String']
}

export type MetadaQuery = {
  name?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  image?: Maybe<ResourceQuery>
}

export type Metadata = {
  /** Identifies the asset this token represents */
  name: Scalars['String']
  source: TokenAsset
  /** Additional assets that token linked to */
  assets: ResourcePage
  /** A file representing the asset this token represents */
  image: Resource
  /** Describes the asset this token represents */
  description: Scalars['String']
  /** The document's ID. */
  _id: Scalars['ID']
  /** Content corresponding to the metadata. */
  content: Content
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

export type MetadataAssetsArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** Allow manipulating the relationship between the types 'Metadata' and 'Resource'. */
export type MetadataAssetsRelation = {
  /** Create one or more documents of type 'Resource' and associate them with the current document. */
  create?: Maybe<Array<Maybe<ResourceInput>>>
  /** Connect one or more documents of type 'Resource' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'Resource' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

/** Allow manipulating the relationship between the types 'Metadata' and 'Content' using the field 'Metadata.content'. */
export type MetadataContentRelation = {
  /** Create a document of type 'Content' and associate it with the current document. */
  create?: Maybe<ContentInput>
  /** Connect a document of type 'Content' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

/** Allow manipulating the relationship between the types 'Metadata' and 'Resource' using the field 'Metadata.image'. */
export type MetadataImageRelation = {
  /** Create a document of type 'Resource' and associate it with the current document. */
  create?: Maybe<ResourceInput>
  /** Connect a document of type 'Resource' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

export type MetadataInput = {
  /** CID for the metadata content. */
  cid: Scalars['String']
  /** Identifies the asset this token represents */
  name: Scalars['String']
  /** Describes the asset this token represents */
  description: Scalars['String']
  /** A file representing the asset this token represents */
  image: ResourceInput
  assets: Array<ResourceInput>
}

/** The pagination object for elements of type 'Metadata'. */
export type MetadataPage = {
  /** The elements of type 'Metadata' in this page. */
  data: Array<Maybe<Metadata>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

/** Allow manipulating the relationship between the types 'Metadata' and 'TokenAsset' using the field 'Metadata.source'. */
export type MetadataSourceRelation = {
  /** Create a document of type 'TokenAsset' and associate it with the current document. */
  create?: Maybe<TokenAssetInput>
  /** Connect a document of type 'TokenAsset' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
  /** If true, disconnects this document from 'TokenAsset' */
  disconnect?: Maybe<Scalars['Boolean']>
}

export type Mutation = {
  /** Delete an existing document in the collection of 'Owner' */
  deleteOwner?: Maybe<Owner>
  /** Update an existing document in the collection of 'User' */
  updateUser?: Maybe<User>
  /** Create a new document in the collection of 'Pin' */
  createPin: Pin
  /** Delete an existing document in the collection of 'TokenAsset' */
  deleteTokenAsset?: Maybe<TokenAsset>
  createUser: User
  /** Update an existing document in the collection of 'Pin' */
  updatePin?: Maybe<Pin>
  /** Create a new document in the collection of 'Metadata' */
  createMetadata: Metadata
  /** Update an existing document in the collection of 'Upload' */
  updateUpload?: Maybe<Upload>
  /** Delete an existing document in the collection of 'Token' */
  deleteToken?: Maybe<Token>
  /** Create a new document in the collection of 'Block' */
  createBlock: Block
  /** Delete an existing document in the collection of 'ERC721ImportResult' */
  deleteERC721ImportResult?: Maybe<Erc721ImportResult>
  /** Update an existing document in the collection of 'UserKey' */
  updateUserKey?: Maybe<UserKey>
  /** Update an existing document in the collection of 'Metadata' */
  updateMetadata?: Maybe<Metadata>
  /** Create a new document in the collection of 'TokenContract' */
  createTokenContract: TokenContract
  /** Create a new document in the collection of 'PinLocation' */
  createPinLocation: PinLocation
  /** Delete an existing document in the collection of 'Upload' */
  deleteUpload?: Maybe<Upload>
  /** Create a new document in the collection of 'Resource' */
  createResource: Resource
  /** Update an existing document in the collection of 'Cursor' */
  updateCursor?: Maybe<Cursor>
  /** Delete an existing document in the collection of 'PinLocation' */
  deletePinLocation?: Maybe<PinLocation>
  /** Create a new document in the collection of 'Token' */
  createToken: Token
  /** Delete an existing document in the collection of 'Cursor' */
  deleteCursor?: Maybe<Cursor>
  importERC721: Erc721ImportResult
  updateResources: Array<Resource>
  /** Update an existing document in the collection of 'TokenContract' */
  updateTokenContract?: Maybe<TokenContract>
  /** Delete an existing document in the collection of 'Resource' */
  deleteResource?: Maybe<Resource>
  /** Update an existing document in the collection of 'PinLocation' */
  updatePinLocation?: Maybe<PinLocation>
  /** Update an existing document in the collection of 'Owner' */
  updateOwner?: Maybe<Owner>
  updateTokenAsset: TokenAsset
  /** Delete an existing document in the collection of 'Block' */
  deleteBlock?: Maybe<Block>
  createUpload: Upload
  /** Create a new document in the collection of 'TokenAsset' */
  createTokenAsset: TokenAsset
  /** Delete an existing document in the collection of 'Pin' */
  deletePin?: Maybe<Pin>
  /** Create a new document in the collection of 'Cursor' */
  createCursor: Cursor
  /** Delete an existing document in the collection of 'User' */
  deleteUser?: Maybe<User>
  /** Update an existing document in the collection of 'Token' */
  updateToken?: Maybe<Token>
  /** Create a new document in the collection of 'Content' */
  createContent: Content
  /** Create a new document in the collection of 'ERC721ImportResult' */
  createERC721ImportResult: Erc721ImportResult
  /** Delete an existing document in the collection of 'TokenContract' */
  deleteTokenContract?: Maybe<TokenContract>
  /** Create a new document in the collection of 'Owner' */
  createOwner: Owner
  /** Update an existing document in the collection of 'Content' */
  updateContent?: Maybe<Content>
  updateTokenAssets: Array<TokenAsset>
  updateResource: Resource
  /** Create a new document in the collection of 'UserKey' */
  createUserKey: UserKey
  /** Delete an existing document in the collection of 'Metadata' */
  deleteMetadata?: Maybe<Metadata>
  /** Update an existing document in the collection of 'Block' */
  updateBlock?: Maybe<Block>
  /** Delete an existing document in the collection of 'UserKey' */
  deleteUserKey?: Maybe<UserKey>
  /** Delete an existing document in the collection of 'Content' */
  deleteContent?: Maybe<Content>
  /** Update an existing document in the collection of 'ERC721ImportResult' */
  updateERC721ImportResult?: Maybe<Erc721ImportResult>
}

export type MutationDeleteOwnerArgs = {
  id: Scalars['ID']
}

export type MutationUpdateUserArgs = {
  id: Scalars['ID']
  data: UserInput
}

export type MutationCreatePinArgs = {
  data: PinInput
}

export type MutationDeleteTokenAssetArgs = {
  id: Scalars['ID']
}

export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>
}

export type MutationUpdatePinArgs = {
  id: Scalars['ID']
  data: PinInput
}

export type MutationCreateMetadataArgs = {
  data: MetadataInput
}

export type MutationUpdateUploadArgs = {
  id: Scalars['ID']
  data: UploadInput
}

export type MutationDeleteTokenArgs = {
  id: Scalars['ID']
}

export type MutationCreateBlockArgs = {
  data: BlockInput
}

export type MutationDeleteErc721ImportResultArgs = {
  id: Scalars['ID']
}

export type MutationUpdateUserKeyArgs = {
  id: Scalars['ID']
  data: UserKeyInput
}

export type MutationUpdateMetadataArgs = {
  id: Scalars['ID']
  data: MetadataInput
}

export type MutationCreateTokenContractArgs = {
  data: TokenContractInput
}

export type MutationCreatePinLocationArgs = {
  data: PinLocationInput
}

export type MutationDeleteUploadArgs = {
  id: Scalars['ID']
}

export type MutationCreateResourceArgs = {
  data: ResourceInput
}

export type MutationUpdateCursorArgs = {
  id: Scalars['ID']
  data: CursorInput
}

export type MutationDeletePinLocationArgs = {
  id: Scalars['ID']
}

export type MutationCreateTokenArgs = {
  data: TokenInput
}

export type MutationDeleteCursorArgs = {
  id: Scalars['ID']
}

export type MutationImportErc721Args = {
  input: Erc721ImportInput
}

export type MutationUpdateResourcesArgs = {
  input?: Maybe<UpdateResourcesInput>
}

export type MutationUpdateTokenContractArgs = {
  id: Scalars['ID']
  data: TokenContractInput
}

export type MutationDeleteResourceArgs = {
  id: Scalars['ID']
}

export type MutationUpdatePinLocationArgs = {
  id: Scalars['ID']
  data: PinLocationInput
}

export type MutationUpdateOwnerArgs = {
  id: Scalars['ID']
  data: OwnerInput
}

export type MutationUpdateTokenAssetArgs = {
  input: TokenAssetUpdate
}

export type MutationDeleteBlockArgs = {
  id: Scalars['ID']
}

export type MutationCreateUploadArgs = {
  input?: Maybe<CreateUploadInput>
}

export type MutationCreateTokenAssetArgs = {
  data: TokenAssetInput
}

export type MutationDeletePinArgs = {
  id: Scalars['ID']
}

export type MutationCreateCursorArgs = {
  data: CursorInput
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']
}

export type MutationUpdateTokenArgs = {
  id: Scalars['ID']
  data: TokenInput
}

export type MutationCreateContentArgs = {
  data: ContentInput
}

export type MutationCreateErc721ImportResultArgs = {
  data: Erc721ImportResultInput
}

export type MutationDeleteTokenContractArgs = {
  id: Scalars['ID']
}

export type MutationCreateOwnerArgs = {
  data: OwnerInput
}

export type MutationUpdateContentArgs = {
  id: Scalars['ID']
  data: ContentInput
}

export type MutationUpdateTokenAssetsArgs = {
  input: UpdateTokenAssetsInput
}

export type MutationUpdateResourceArgs = {
  input?: Maybe<ResourceUpdate>
}

export type MutationCreateUserKeyArgs = {
  data: UserKeyInput
}

export type MutationDeleteMetadataArgs = {
  id: Scalars['ID']
}

export type MutationUpdateBlockArgs = {
  id: Scalars['ID']
  data: BlockInput
}

export type MutationDeleteUserKeyArgs = {
  id: Scalars['ID']
}

export type MutationDeleteContentArgs = {
  id: Scalars['ID']
}

export type MutationUpdateErc721ImportResultArgs = {
  id: Scalars['ID']
  data: Erc721ImportResultInput
}

export type Owner = {
  /** The document's ID. */
  _id: Scalars['ID']
  /** The document's timestamp. */
  _ts: Scalars['Long']
  id: Scalars['ID']
}

/** 'Owner' input values */
export type OwnerInput = {
  id: Scalars['ID']
}

/** Information for piece of content pinned in IPFS. */
export type Pin = {
  /** Reference to a pin location that is pinning it. */
  location: PinLocation
  /** The document's ID. */
  _id: Scalars['ID']
  /**
   * Human readable description of the pin status. Present only when status needs
   * ellaboration e.g. when pin is failed or when pin is queued but actual status
   * could not be obtained from the node.
   */
  statusText?: Maybe<Scalars['String']>
  /** Last time pin status was updated. */
  updated: Scalars['Time']
  /** Pinning status at this location. */
  status: PinStatus
  /** The content being pinned. */
  content: Content
  /** Time when pin was created. */
  created: Scalars['Time']
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

/** Allow manipulating the relationship between the types 'Pin' and 'Content' using the field 'Pin.content'. */
export type PinContentRelation = {
  /** Create a document of type 'Content' and associate it with the current document. */
  create?: Maybe<ContentInput>
  /** Connect a document of type 'Content' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

/** 'Pin' input values */
export type PinInput = {
  /** The content being pinned. */
  content?: Maybe<PinContentRelation>
  /** Reference to a pin location that is pinning it. */
  location?: Maybe<PinLocationRelation>
  /** Pinning status at this location. */
  status: PinStatus
  /**
   * Human readable description of the pin status. Present only when status needs
   * ellaboration e.g. when pin is failed or when pin is queued but actual status
   * could not be obtained from the node.
   */
  statusText?: Maybe<Scalars['String']>
  /** Last time pin status was updated. */
  updated: Scalars['Time']
  /** Time when pin was created. */
  created: Scalars['Time']
}

/** Location of a pin. */
export type PinLocation = {
  /** The document's ID. */
  _id: Scalars['ID']
  /** Libp2p peer ID of the node pinning this pin. */
  peerId: Scalars['String']
  /** Name of the peer pinning this pin. */
  peerName?: Maybe<Scalars['String']>
  /** Known pins at this location. */
  pins: PinPage
  /** Geographic region this node resides in. */
  region?: Maybe<Scalars['String']>
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

/** Location of a pin. */
export type PinLocationPinsArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** 'PinLocation' input values */
export type PinLocationInput = {
  /** Known pins at this location. */
  pins?: Maybe<PinLocationPinsRelation>
  /** Libp2p peer ID of the node pinning this pin. */
  peerId: Scalars['String']
  /** Name of the peer pinning this pin. */
  peerName?: Maybe<Scalars['String']>
  /** Geographic region this node resides in. */
  region?: Maybe<Scalars['String']>
}

/** Allow manipulating the relationship between the types 'PinLocation' and 'Pin'. */
export type PinLocationPinsRelation = {
  /** Create one or more documents of type 'Pin' and associate them with the current document. */
  create?: Maybe<Array<Maybe<PinInput>>>
  /** Connect one or more documents of type 'Pin' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'Pin' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

/** Allow manipulating the relationship between the types 'Pin' and 'PinLocation' using the field 'Pin.location'. */
export type PinLocationRelation = {
  /** Create a document of type 'PinLocation' and associate it with the current document. */
  create?: Maybe<PinLocationInput>
  /** Connect a document of type 'PinLocation' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

/** The pagination object for elements of type 'Pin'. */
export type PinPage = {
  /** The elements of type 'Pin' in this page. */
  data: Array<Maybe<Pin>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

export type PinStatus =
  /** An error occurred pinning. */
  | 'PinFailed'
  /** Node has pinned the content. */
  | 'Pinned'
  /** Node is currently pinning the content. */
  | 'Pinning'
  /** The item has been queued for pinning. */
  | 'PinQueued'

export type Query = {
  /** Find a document from the collection of 'Block' by its id. */
  findBlockByID?: Maybe<Block>
  /** Find a document from the collection of 'TokenContract' by its id. */
  findTokenContractByID?: Maybe<TokenContract>
  constract?: Maybe<TokenContract>
  /** Find a document from the collection of 'Upload' by its id. */
  findUploadByID?: Maybe<Upload>
  /** Provides tokens with the */
  findTokenAssets: QueryFindTokenAssetsPage
  /** Find a document from the collection of 'Resource' by its id. */
  findResourceByID?: Maybe<Resource>
  /** Find a document from the collection of 'Token' by its id. */
  findTokenByID?: Maybe<Token>
  findContentByCID?: Maybe<Content>
  allImports: Erc721ImportResultPage
  /** Find a document from the collection of 'Owner' by its id. */
  findOwnerByID?: Maybe<Owner>
  /** Find a document from the collection of 'User' by its id. */
  findUserByID?: Maybe<User>
  /** Find a document from the collection of 'ERC721ImportResult' by its id. */
  findERC721ImportResultByID?: Maybe<Erc721ImportResult>
  cursor: Cursor
  /** Find a document from the collection of 'Metadata' by its id. */
  findMetadataByID?: Maybe<Metadata>
  /** Find a document from the collection of 'PinLocation' by its id. */
  findPinLocationByID?: Maybe<PinLocation>
  block?: Maybe<Block>
  /** Find a document from the collection of 'Content' by its id. */
  findContentByID?: Maybe<Content>
  /** Find a document from the collection of 'Cursor' by its id. */
  findCursorByID?: Maybe<Cursor>
  findResources: QueryFindResourcesPage
  /** Find a document from the collection of 'TokenAsset' by its id. */
  findTokenAssetByID?: Maybe<TokenAsset>
  tokens: TokenPage
  /** Find a document from the collection of 'UserKey' by its id. */
  findUserKeyByID?: Maybe<UserKey>
  owner?: Maybe<Owner>
  /** Login with sub or issuer */
  login: LoginOutput
  findResourceByURI?: Maybe<Resource>
  /** Find a document from the collection of 'Pin' by its id. */
  findPinByID?: Maybe<Pin>
  allTokens: TokenPage
}

export type QueryFindBlockByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindTokenContractByIdArgs = {
  id: Scalars['ID']
}

export type QueryConstractArgs = {
  id?: Maybe<Scalars['ID']>
}

export type QueryFindUploadByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindTokenAssetsArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
  where?: Maybe<FindTokenAssetsInput>
}

export type QueryFindResourceByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindTokenByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindContentByCidArgs = {
  cid?: Maybe<Scalars['ID']>
}

export type QueryAllImportsArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

export type QueryFindOwnerByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindUserByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindErc721ImportResultByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindMetadataByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindPinLocationByIdArgs = {
  id: Scalars['ID']
}

export type QueryBlockArgs = {
  hash?: Maybe<Scalars['ID']>
  number?: Maybe<Scalars['Long']>
}

export type QueryFindContentByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindCursorByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindResourcesArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
  where?: Maybe<FindResourceInput>
}

export type QueryFindTokenAssetByIdArgs = {
  id: Scalars['ID']
}

export type QueryTokensArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
  tokenID?: Maybe<Scalars['String']>
  mintTime?: Maybe<Scalars['String']>
}

export type QueryFindUserKeyByIdArgs = {
  id: Scalars['ID']
}

export type QueryOwnerArgs = {
  id?: Maybe<Scalars['ID']>
}

export type QueryLoginArgs = {
  id: Scalars['String']
}

export type QueryFindResourceByUriArgs = {
  uri?: Maybe<Scalars['String']>
}

export type QueryFindPinByIdArgs = {
  id: Scalars['ID']
}

export type QueryAllTokensArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** The pagination object for elements of type 'Resource'. */
export type QueryFindResourcesPage = {
  /** The elements of type 'Resource' in this page. */
  data: Array<Maybe<Resource>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

/** The pagination object for elements of type 'TokenAsset'. */
export type QueryFindTokenAssetsPage = {
  /** The elements of type 'TokenAsset' in this page. */
  data: Array<Maybe<TokenAsset>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

/**
 * Represents a resource that non-fungible token metadata referenced via URI. In
 * most cases when created will have `uri` discovered on chain with a status
 * `Queued`. Followup jobs will then attempt to locate and pin it's content
 * updating it's state.
 */
export type Resource = {
  /** The document's ID. */
  _id: Scalars['ID']
  /**
   * URI this resource corresponds to. Resources are created for all the URIs
   * that NFT token metadata references.
   */
  uri: Scalars['String']
  /**
   * Human readable description of the status. Would contain error message & stack
   * trace when resource has failed status. Likely omitted when resource is queued
   * or succefully linked.
   */
  statusText?: Maybe<Scalars['String']>
  /** Time when resource record was last updated. */
  updated: Scalars['Time']
  /**
   * Represents ipfs:// URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL?: Maybe<Scalars['String']>
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
  created: Scalars['Time']
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

/**
 * Represents a resource that non-fungible token metadata referenced via URI. In
 * most cases when created will have `uri` discovered on chain with a status
 * `Queued`. Followup jobs will then attempt to locate and pin it's content
 * updating it's state.
 */
export type ResourceReferrersArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** Allow manipulating the relationship between the types 'Resource' and 'Content' using the field 'Resource.content'. */
export type ResourceContentRelation = {
  /** Create a document of type 'Content' and associate it with the current document. */
  create?: Maybe<ContentInput>
  /** Connect a document of type 'Content' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

export type ResourceInput = {
  uri: Scalars['String']
  ipfsURL?: Maybe<Scalars['String']>
}

/** The pagination object for elements of type 'Resource'. */
export type ResourcePage = {
  /** The elements of type 'Resource' in this page. */
  data: Array<Maybe<Resource>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

export type ResourceQuery = {
  uri?: Maybe<Scalars['String']>
  cid?: Maybe<Scalars['String']>
}

/** Allow manipulating the relationship between the types 'Resource' and 'Metadata'. */
export type ResourceReferrersRelation = {
  /** Create one or more documents of type 'Metadata' and associate them with the current document. */
  create?: Maybe<Array<Maybe<MetadataInput>>>
  /** Connect one or more documents of type 'Metadata' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'Metadata' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

export type ResourceStatus =
  /** Resource was queued to be processed. */
  | 'Queued'
  /** URI is either malformed or the protocol is not supported. */
  | 'URIParseFailed'
  /** Was unable to fetch the content. */
  | 'ContentFetchFailed'
  /** Failed to complete a pin request. */
  | 'PinRequestFailed'
  /** Corresponding content was linked. */
  | 'ContentLinked'

/** Represents update of the individual resource. */
export type ResourceUpdate = {
  id: Scalars['ID']
  /**
   * New status for the resource. Update will only apply when status moves forward
   * Queued -> URIParseFailed -> ContentFetchFailed -> PinRequestFailed -> ContentLinked
   *
   * Skipping state is fine, however attempt to change status from e.g.
   * ContentLinked to URIParseFailed is simply ignored.
   */
  status: ResourceStatus
  /** Status description. */
  statusText: Scalars['String']
  /**
   * If IPFS URL was inferred from the uri this will be set. When passed status
   * field should either be ContentFetchFailed or ContentLinked.
   */
  ipfsURL?: Maybe<Scalars['String']>
  /** If provided status should be `ContentLinked`. */
  cid?: Maybe<Scalars['String']>
}

export type Token = {
  blocks: BlockPage
  /** The document's ID. */
  _id: Scalars['ID']
  mintTime: Scalars['String']
  id: Scalars['String']
  imported: Erc721ImportResultPage
  tokenID: Scalars['String']
  owner: Owner
  /** Present when ERC721Metadata interface is implemented. */
  tokenAsset?: Maybe<TokenAsset>
  contract: TokenContract
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

export type TokenBlocksArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

export type TokenImportedArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/**
 * TokenAsset represents contents of the tokenURI which may not have been found /
 * pinned yet. It may have been added by the chain scraper, when token with this
 * `tokenURI` was discovered. Alternatively it could have been created by an
 * upload to nft.storage, in which case it may not have any refferers but it would
 * have uploads.
 */
export type TokenAsset = {
  /** The document's ID. */
  _id: Scalars['ID']
  /**
   * Human readable description of the status. Usually this ellaborates a reason
   * why token analyzer has failed providing with an error message and stack trace.
   */
  statusText?: Maybe<Scalars['String']>
  /** URI that was discovered either in the eth chain. */
  tokenURI: Scalars['String']
  /** Time when resource record was last updated. */
  updated: Scalars['Time']
  /**
   * Represents `ipfs://` URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL?: Maybe<Scalars['String']>
  /** Status of the token asset */
  status: TokenAssetStatus
  /**
   * When `tokenURI` points to JSON file that conforms to the ERC721 Metadata JSON
   * Schema it is fetched parsed and stored as related Metadata document.
   */
  metadata?: Maybe<Metadata>
  /**
   * Tokens that have this `tokenURI`. This relation allows us to identify all
   * tokens that have a same `tokenURI`.
   */
  referrers: TokenPage
  created: Scalars['Time']
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

/**
 * TokenAsset represents contents of the tokenURI which may not have been found /
 * pinned yet. It may have been added by the chain scraper, when token with this
 * `tokenURI` was discovered. Alternatively it could have been created by an
 * upload to nft.storage, in which case it may not have any refferers but it would
 * have uploads.
 */
export type TokenAssetReferrersArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** 'TokenAsset' input values */
export type TokenAssetInput = {
  /**
   * Tokens that have this `tokenURI`. This relation allows us to identify all
   * tokens that have a same `tokenURI`.
   */
  referrers?: Maybe<TokenAssetReferrersRelation>
  /** URI that was discovered either in the eth chain. */
  tokenURI: Scalars['String']
  /**
   * Represents `ipfs://` URL for this content. Sometimes this is derived when
   * resource uri is parsed. E.g. if discovered resource uri was
   * https://ipfs.io/ipfs/Qm...Hash/file/path it's ipfsURL will be derived
   * to be ipfs://Qm...Hash/file/path.
   *
   * If `uri` can not be inferred as an ipfs URL this field will be omitted.
   */
  ipfsURL?: Maybe<Scalars['String']>
  /**
   * When `tokenURI` points to JSON file that conforms to the ERC721 Metadata JSON
   * Schema it is fetched parsed and stored as related Metadata document.
   */
  metadata?: Maybe<TokenAssetMetadataRelation>
  created: Scalars['Time']
  /** Time when resource record was last updated. */
  updated: Scalars['Time']
  /** Status of the token asset */
  status: TokenAssetStatus
  /**
   * Human readable description of the status. Usually this ellaborates a reason
   * why token analyzer has failed providing with an error message and stack trace.
   */
  statusText?: Maybe<Scalars['String']>
}

/** Allow manipulating the relationship between the types 'TokenAsset' and 'Metadata' using the field 'TokenAsset.metadata'. */
export type TokenAssetMetadataRelation = {
  /** Create a document of type 'Metadata' and associate it with the current document. */
  create?: Maybe<MetadataInput>
  /** Connect a document of type 'Metadata' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

/** Allow manipulating the relationship between the types 'TokenAsset' and 'Token'. */
export type TokenAssetReferrersRelation = {
  /** Create one or more documents of type 'Token' and associate them with the current document. */
  create?: Maybe<Array<Maybe<TokenInput>>>
  /** Connect one or more documents of type 'Token' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'Token' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

export type TokenAssetStatus =
  /** Token asset was queued (for the analyzer to process). */
  | 'Queued'
  /** tokenURI is either malformed or the protocol is not supported. */
  | 'URIParseFailed'
  /** Was unable to fetch the content. */
  | 'ContentFetchFailed'
  /** Parsing ERC721 metadata failed. */
  | 'ContentParseFailed'
  /** Failed to create a metadata pin request. */
  | 'PinRequestFailed'
  /** Metadata was parsed and all the resources were linked. */
  | 'Linked'

export type TokenAssetUpdate = {
  id: Scalars['ID']
  /**
   * If IPFS URL was inferred from the uri this will be set. When passed status
   * field should either be ContentFetchFailed or ContentLinked.
   */
  ipfsURL?: Maybe<Scalars['String']>
  status: TokenAssetStatus
  statusText: Scalars['String']
  metadata?: Maybe<MetadataInput>
}

/** Allow manipulating the relationship between the types 'Token' and 'Block'. */
export type TokenBlocksRelation = {
  /** Create one or more documents of type 'Block' and associate them with the current document. */
  create?: Maybe<Array<Maybe<BlockInput>>>
  /** Connect one or more documents of type 'Block' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'Block' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

export type TokenContract = {
  /** A descriptive name for a collection of NFTs in this contract */
  name?: Maybe<Scalars['String']>
  /** The document's ID. */
  _id: Scalars['ID']
  /** An abbreviated name for NFTs in this contract */
  symbol?: Maybe<Scalars['String']>
  id: Scalars['ID']
  supportsEIP721Metadata: Scalars['Boolean']
  tokens: TokenPage
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

export type TokenContractTokensArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** 'TokenContract' input values */
export type TokenContractInput = {
  id: Scalars['ID']
  /** A descriptive name for a collection of NFTs in this contract */
  name?: Maybe<Scalars['String']>
  /** An abbreviated name for NFTs in this contract */
  symbol?: Maybe<Scalars['String']>
  supportsEIP721Metadata: Scalars['Boolean']
  tokens?: Maybe<TokenContractTokensRelation>
}

/** Allow manipulating the relationship between the types 'Token' and 'TokenContract' using the field 'Token.contract'. */
export type TokenContractRelation = {
  /** Create a document of type 'TokenContract' and associate it with the current document. */
  create?: Maybe<TokenContractInput>
  /** Connect a document of type 'TokenContract' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

/** Allow manipulating the relationship between the types 'TokenContract' and 'Token'. */
export type TokenContractTokensRelation = {
  /** Create one or more documents of type 'Token' and associate them with the current document. */
  create?: Maybe<Array<Maybe<TokenInput>>>
  /** Connect one or more documents of type 'Token' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'Token' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

/** Allow manipulating the relationship between the types 'Token' and 'ERC721ImportResult'. */
export type TokenImportedRelation = {
  /** Create one or more documents of type 'ERC721ImportResult' and associate them with the current document. */
  create?: Maybe<Array<Maybe<Erc721ImportResultInput>>>
  /** Connect one or more documents of type 'ERC721ImportResult' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'ERC721ImportResult' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

/** 'Token' input values */
export type TokenInput = {
  id: Scalars['String']
  tokenID: Scalars['String']
  mintTime: Scalars['String']
  /** Present when ERC721Metadata interface is implemented. */
  tokenAsset?: Maybe<TokenTokenAssetRelation>
  contract?: Maybe<TokenContractRelation>
  owner?: Maybe<TokenOwnerRelation>
  blocks?: Maybe<TokenBlocksRelation>
  imported?: Maybe<TokenImportedRelation>
}

/** Allow manipulating the relationship between the types 'Token' and 'Owner' using the field 'Token.owner'. */
export type TokenOwnerRelation = {
  /** Create a document of type 'Owner' and associate it with the current document. */
  create?: Maybe<OwnerInput>
  /** Connect a document of type 'Owner' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

/** The pagination object for elements of type 'Token'. */
export type TokenPage = {
  /** The elements of type 'Token' in this page. */
  data: Array<Maybe<Token>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

/** Allow manipulating the relationship between the types 'Token' and 'TokenAsset' using the field 'Token.tokenAsset'. */
export type TokenTokenAssetRelation = {
  /** Create a document of type 'TokenAsset' and associate it with the current document. */
  create?: Maybe<TokenAssetInput>
  /** Connect a document of type 'TokenAsset' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
  /** If true, disconnects this document from 'TokenAsset' */
  disconnect?: Maybe<Scalars['Boolean']>
}

export type UpdateResourcesInput = {
  updates: Array<ResourceUpdate>
}

export type UpdateTokenAssetsInput = {
  updates: Array<TokenAssetUpdate>
}

export type Upload = {
  /** The document's ID. */
  _id: Scalars['ID']
  content: Content
  type: UploadType
  user: User
  deleted?: Maybe<Scalars['Time']>
  created: Scalars['Time']
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

/** Allow manipulating the relationship between the types 'Upload' and 'Content' using the field 'Upload.content'. */
export type UploadContentRelation = {
  /** Create a document of type 'Content' and associate it with the current document. */
  create?: Maybe<ContentInput>
  /** Connect a document of type 'Content' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

/** 'Upload' input values */
export type UploadInput = {
  user?: Maybe<UploadUserRelation>
  type: UploadType
  content?: Maybe<UploadContentRelation>
  created: Scalars['Time']
  deleted?: Maybe<Scalars['Time']>
}

export type UploadType = 'BLOB'

/** Allow manipulating the relationship between the types 'Upload' and 'User' using the field 'Upload.user'. */
export type UploadUserRelation = {
  /** Create a document of type 'User' and associate it with the current document. */
  create?: Maybe<UserInput>
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

export type User = {
  github?: Maybe<Scalars['String']>
  name: Scalars['String']
  email: Scalars['String']
  /** The document's ID. */
  _id: Scalars['ID']
  publicAddress: Scalars['String']
  issuer: Scalars['String']
  picture?: Maybe<Scalars['String']>
  /** We need this to dedupe old github login from new magic.link */
  sub: Scalars['String']
  created: Scalars['Time']
  keys: UserKeyPage
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

export type UserKeysArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** 'User' input values */
export type UserInput = {
  issuer: Scalars['String']
  /** We need this to dedupe old github login from new magic.link */
  sub: Scalars['String']
  name: Scalars['String']
  picture?: Maybe<Scalars['String']>
  email: Scalars['String']
  github?: Maybe<Scalars['String']>
  publicAddress: Scalars['String']
  created: Scalars['Time']
  keys?: Maybe<UserKeysRelation>
}

export type UserKey = {
  secret: Scalars['String']
  name: Scalars['String']
  /** The document's ID. */
  _id: Scalars['ID']
  user: User
  deleted?: Maybe<Scalars['Time']>
  created: Scalars['Time']
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

/** 'UserKey' input values */
export type UserKeyInput = {
  name: Scalars['String']
  secret: Scalars['String']
  user?: Maybe<UserKeyUserRelation>
  created: Scalars['Time']
  deleted?: Maybe<Scalars['Time']>
}

/** The pagination object for elements of type 'UserKey'. */
export type UserKeyPage = {
  /** The elements of type 'UserKey' in this page. */
  data: Array<Maybe<UserKey>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
}

/** Allow manipulating the relationship between the types 'UserKey' and 'User' using the field 'UserKey.user'. */
export type UserKeyUserRelation = {
  /** Create a document of type 'User' and associate it with the current document. */
  create?: Maybe<UserInput>
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

/** Allow manipulating the relationship between the types 'User' and 'UserKey'. */
export type UserKeysRelation = {
  /** Create one or more documents of type 'UserKey' and associate them with the current document. */
  create?: Maybe<Array<Maybe<UserKeyInput>>>
  /** Connect one or more documents of type 'UserKey' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'UserKey' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
}

export type CreateUploadMutationVariables = Exact<{
  input: CreateUploadInput
}>

export type CreateUploadMutation = {
  createUpload: Pick<Upload, '_id' | 'type'> & {
    user: Pick<User, 'issuer'>
    content: Pick<Content, 'cid'>
  }
}

export type CreateUserKeyMutationVariables = Exact<{
  input: UserKeyInput
}>

export type CreateUserKeyMutation = { createUserKey: Pick<UserKey, '_id'> }

export type DeleteUserKeyMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteUserKeyMutation = {
  deleteUserKey?: Maybe<Pick<UserKey, '_id'>>
}

export type CreateOrUpdateUserMutationVariables = Exact<{
  input: CreateUserInput
}>

export type CreateOrUpdateUserMutation = {
  createUser: Pick<User, 'issuer' | 'email'>
}

export type LoginQueryVariables = Exact<{
  id: Scalars['String']
}>

export type LoginQuery = {
  login: Pick<LoginOutput, 'secret' | 'sub' | 'issuer' | 'email' | 'ref'>
}

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']
  size?: Maybe<Scalars['Int']>
  cursor?: Maybe<Scalars['String']>
}>

export type GetUserQuery = {
  findUserByID?: Maybe<
    Pick<User, 'issuer' | 'sub'> & {
      keys: Pick<UserKeyPage, 'after' | 'before'> & {
        data: Array<Maybe<Pick<UserKey, '_id' | 'secret' | 'name'>>>
      }
    }
  >
}

export const CreateUploadDocument = gql`
  mutation createUpload($input: CreateUploadInput!) {
    createUpload(input: $input) {
      _id
      type
      user {
        issuer
      }
      content {
        cid
      }
    }
  }
`
export const CreateUserKeyDocument = gql`
  mutation createUserKey($input: UserKeyInput!) {
    createUserKey(data: $input) {
      _id
    }
  }
`
export const DeleteUserKeyDocument = gql`
  mutation deleteUserKey($id: ID!) {
    deleteUserKey(id: $id) {
      _id
    }
  }
`
export const CreateOrUpdateUserDocument = gql`
  mutation createOrUpdateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      issuer
      email
    }
  }
`
export const LoginDocument = gql`
  query login($id: String!) {
    login(id: $id) {
      secret
      sub
      issuer
      email
      ref
    }
  }
`
export const GetUserDocument = gql`
  query getUser($id: ID!, $size: Int = 10, $cursor: String) {
    findUserByID(id: $id) {
      issuer
      sub
      keys(_size: $size, _cursor: $cursor) {
        data {
          _id
          secret
          name
        }
        after
        before
      }
    }
  }
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName) => action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    createUpload(
      variables: CreateUploadMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateUploadMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUploadMutation>(
            CreateUploadDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createUpload'
      )
    },
    createUserKey(
      variables: CreateUserKeyMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateUserKeyMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateUserKeyMutation>(
            CreateUserKeyDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createUserKey'
      )
    },
    deleteUserKey(
      variables: DeleteUserKeyMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<DeleteUserKeyMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteUserKeyMutation>(
            DeleteUserKeyDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'deleteUserKey'
      )
    },
    createOrUpdateUser(
      variables: CreateOrUpdateUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<CreateOrUpdateUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<CreateOrUpdateUserMutation>(
            CreateOrUpdateUserDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'createOrUpdateUser'
      )
    },
    login(
      variables: LoginQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<LoginQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<LoginQuery>(LoginDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'login'
      )
    },
    getUser(
      variables: GetUserQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetUserQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUserQuery>(GetUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'getUser'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
