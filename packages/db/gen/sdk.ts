import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | undefined
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

/** 'Content' input values */
export type ContentInput = {
  /** Root CID for this content. */
  cid: Scalars['String']
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

export type CreateLocationsInput = {
  peerId: Scalars['String']
  peerName?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
}

export type CreatePin = {
  status: PinStatus
  statusText?: Maybe<Scalars['String']>
  service: PinService
}

export type CreateUploadFiles = {
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

export type CreateUploadInput = {
  type: UploadType
  cid: Scalars['String']
  dagSize: Scalars['Int']
  files?: Maybe<Array<Maybe<CreateUploadFiles>>>
  key?: Maybe<Scalars['ID']>
  pins: Array<Maybe<CreatePin>>
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

export type LoginOutput = {
  secret: Scalars['String']
  email: Scalars['String']
  issuer: Scalars['String']
  ref: Scalars['String']
  sub: Scalars['String']
  user: User
}

/** 'LoginOutput' input values */
export type LoginOutputInput = {
  secret: Scalars['String']
  user: Scalars['ID']
  sub: Scalars['String']
  issuer: Scalars['String']
  email: Scalars['String']
  ref: Scalars['String']
}

/** Allow manipulating the relationship between the types 'LoginOutput' and 'User' using the field 'LoginOutput.user'. */
export type LoginOutputUserRelation = {
  /** Create a document of type 'User' and associate it with the current document. */
  create?: Maybe<UserInput>
  /** Connect a document of type 'User' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
}

export type Mutation = {
  /** Update an existing document in the collection of 'User' */
  updateUser?: Maybe<User>
  /** Create a new document in the collection of 'Pin' */
  createPin: Pin
  createUser: User
  updatePin?: Maybe<Pin>
  /** Update an existing document in the collection of 'Upload' */
  updateUpload?: Maybe<Upload>
  /** Update an existing document in the collection of 'UserKey' */
  updateUserKey?: Maybe<UserKey>
  /** Create a new document in the collection of 'PinLocation' */
  createPinLocation: PinLocation
  /** Delete an existing document in the collection of 'Upload' */
  deleteUpload?: Maybe<Upload>
  /** Delete an existing document in the collection of 'PinLocation' */
  deletePinLocation?: Maybe<PinLocation>
  /** Update an existing document in the collection of 'PinLocation' */
  updatePinLocation?: Maybe<PinLocation>
  createUpload: Upload
  /** Delete an existing document in the collection of 'Pin' */
  deletePin?: Maybe<Pin>
  /** Delete an existing document in the collection of 'User' */
  deleteUser?: Maybe<User>
  /** Create a new document in the collection of 'Content' */
  createContent: Content
  /** Update an existing document in the collection of 'Content' */
  updateContent?: Maybe<Content>
  /** Create a new document in the collection of 'UserKey' */
  createUserKey: UserKey
  /** Delete an existing document in the collection of 'UserKey' */
  deleteUserKey?: Maybe<UserKey>
  /** Delete an existing document in the collection of 'Content' */
  deleteContent?: Maybe<Content>
}

export type MutationUpdateUserArgs = {
  id: Scalars['ID']
  data: UserInput
}

export type MutationCreatePinArgs = {
  data: PinInput
}

export type MutationCreateUserArgs = {
  input?: Maybe<CreateUserInput>
}

export type MutationUpdatePinArgs = {
  id: Scalars['ID']
  data?: Maybe<UpdatePinInput>
}

export type MutationUpdateUploadArgs = {
  id: Scalars['ID']
  data: UploadInput
}

export type MutationUpdateUserKeyArgs = {
  id: Scalars['ID']
  data: UserKeyInput
}

export type MutationCreatePinLocationArgs = {
  data: PinLocationInput
}

export type MutationDeleteUploadArgs = {
  id: Scalars['ID']
}

export type MutationDeletePinLocationArgs = {
  id: Scalars['ID']
}

export type MutationUpdatePinLocationArgs = {
  id: Scalars['ID']
  data: PinLocationInput
}

export type MutationCreateUploadArgs = {
  input?: Maybe<CreateUploadInput>
}

export type MutationDeletePinArgs = {
  id: Scalars['ID']
}

export type MutationDeleteUserArgs = {
  id: Scalars['ID']
}

export type MutationCreateContentArgs = {
  data: ContentInput
}

export type MutationUpdateContentArgs = {
  id: Scalars['ID']
  data: ContentInput
}

export type MutationCreateUserKeyArgs = {
  data: UserKeyInput
}

export type MutationDeleteUserKeyArgs = {
  id: Scalars['ID']
}

export type MutationDeleteContentArgs = {
  id: Scalars['ID']
}

export type Pin = {
  locations: PinLocationPage
  /** The document's ID. */
  _id: Scalars['ID']
  statusText?: Maybe<Scalars['String']>
  service: PinService
  updated?: Maybe<Scalars['Time']>
  status: PinStatus
  content: Content
  created: Scalars['Time']
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

export type PinLocationsArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
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
  content?: Maybe<PinContentRelation>
  locations?: Maybe<PinLocationsRelation>
  status: PinStatus
  statusText?: Maybe<Scalars['String']>
  updated?: Maybe<Scalars['Time']>
  created: Scalars['Time']
  service: PinService
}

export type PinLocation = {
  /** The document's ID. */
  _id: Scalars['ID']
  peerId: Scalars['String']
  peerName?: Maybe<Scalars['String']>
  pins: PinPage
  region?: Maybe<Scalars['String']>
  /** The document's timestamp. */
  _ts: Scalars['Long']
}

export type PinLocationPinsArgs = {
  _size?: Maybe<Scalars['Int']>
  _cursor?: Maybe<Scalars['String']>
}

/** 'PinLocation' input values */
export type PinLocationInput = {
  pins?: Maybe<PinLocationPinsRelation>
  peerId: Scalars['String']
  peerName?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
}

/** The pagination object for elements of type 'PinLocation'. */
export type PinLocationPage = {
  /** The elements of type 'PinLocation' in this page. */
  data: Array<Maybe<PinLocation>>
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>
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

/** Allow manipulating the relationship between the types 'Pin' and 'PinLocation'. */
export type PinLocationsRelation = {
  /** Create one or more documents of type 'PinLocation' and associate them with the current document. */
  create?: Maybe<Array<Maybe<PinLocationInput>>>
  /** Connect one or more documents of type 'PinLocation' with the current document using their IDs. */
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>
  /** Disconnect the given documents of type 'PinLocation' from the current document using their IDs. */
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>
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

export type PinService = 'IPFS_CLUSTER' | 'PINATA'

export type PinStatus = 'unknown' | 'queued' | 'pinning' | 'pinned' | 'failed'

export type Query = {
  findPinLocationByPeerId?: Maybe<PinLocation>
  /** Find a document from the collection of 'Upload' by its id. */
  findUploadByID?: Maybe<Upload>
  /** Find a document from the collection of 'User' by its id. */
  findUserByID?: Maybe<User>
  /** Find a document from the collection of 'PinLocation' by its id. */
  findPinLocationByID?: Maybe<PinLocation>
  /** Find a document from the collection of 'Content' by its id. */
  findContentByID?: Maybe<Content>
  /** Find a document from the collection of 'UserKey' by its id. */
  findUserKeyByID?: Maybe<UserKey>
  /** Login with sub or issuer */
  login: LoginOutput
  /** Find a document from the collection of 'Pin' by its id. */
  findPinByID?: Maybe<Pin>
}

export type QueryFindPinLocationByPeerIdArgs = {
  peerId: Scalars['String']
}

export type QueryFindUploadByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindUserByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindPinLocationByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindContentByIdArgs = {
  id: Scalars['ID']
}

export type QueryFindUserKeyByIdArgs = {
  id: Scalars['ID']
}

export type QueryLoginArgs = {
  id: Scalars['String']
}

export type QueryFindPinByIdArgs = {
  id: Scalars['ID']
}

export type UpdatePinInput = {
  status?: Maybe<PinStatus>
  statusText?: Maybe<Scalars['String']>
  updated: Scalars['Time']
  service?: Maybe<PinService>
  locations?: Maybe<Array<Maybe<UpdatePinLocationInput>>>
}

export type UpdatePinLocationInput = {
  peerId: Scalars['String']
  peerName?: Maybe<Scalars['String']>
  region?: Maybe<Scalars['String']>
}

export type Upload = {
  /** The document's ID. */
  _id: Scalars['ID']
  files?: Maybe<Array<Maybe<UploadFiles>>>
  key?: Maybe<UserKey>
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

export type UploadFiles = {
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

/** 'UploadFiles' input values */
export type UploadFilesInput = {
  name?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
}

/** 'Upload' input values */
export type UploadInput = {
  user?: Maybe<UploadUserRelation>
  type: UploadType
  content?: Maybe<UploadContentRelation>
  created: Scalars['Time']
  deleted?: Maybe<Scalars['Time']>
  key?: Maybe<UploadKeyRelation>
  files?: Maybe<Array<Maybe<UploadFilesInput>>>
}

/** Allow manipulating the relationship between the types 'Upload' and 'UserKey' using the field 'Upload.key'. */
export type UploadKeyRelation = {
  /** Create a document of type 'UserKey' and associate it with the current document. */
  create?: Maybe<UserKeyInput>
  /** Connect a document of type 'UserKey' with the current document using its ID. */
  connect?: Maybe<Scalars['ID']>
  /** If true, disconnects this document from 'UserKey' */
  disconnect?: Maybe<Scalars['Boolean']>
}

export type UploadType = 'BLOB' | 'MULTIPART' | 'CAR'

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

export type UpdateContentMutationVariables = Exact<{
  id: Scalars['ID']
  data: ContentInput
}>

export type UpdateContentMutation = { updateContent?: Maybe<{ _id: string }> }

export type GetContentbyIdQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetContentbyIdQuery = {
  findContentByID?: Maybe<{
    _id: string
    cid: string
    dagSize?: Maybe<number>
    pins: {
      data: Array<
        Maybe<{
          service: PinService
          status: PinStatus
          statusText?: Maybe<string>
          locations: { data: Array<Maybe<{ peerId: string }>> }
        }>
      >
    }
  }>
}

export type UpdatePinMutationVariables = Exact<{
  id: Scalars['ID']
  data: UpdatePinInput
}>

export type UpdatePinMutation = { updatePin?: Maybe<{ _id: string }> }

export type CreateUploadMutationVariables = Exact<{
  input: CreateUploadInput
}>

export type CreateUploadMutation = {
  createUpload: {
    _id: string
    type: UploadType
    created: any
    key?: Maybe<{ name: string }>
    files?: Maybe<Array<Maybe<{ name?: Maybe<string>; type?: Maybe<string> }>>>
    user: { issuer: string }
    content: {
      cid: string
      dagSize?: Maybe<number>
      pins: { data: Array<Maybe<{ _id: string; status: PinStatus }>> }
    }
  }
}

export type CreateUserKeyMutationVariables = Exact<{
  input: UserKeyInput
}>

export type CreateUserKeyMutation = { createUserKey: { _id: string } }

export type DeleteUserKeyMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteUserKeyMutation = { deleteUserKey?: Maybe<{ _id: string }> }

export type CreateOrUpdateUserMutationVariables = Exact<{
  input: CreateUserInput
}>

export type CreateOrUpdateUserMutation = {
  createUser: { issuer: string; email: string }
}

export type LoginQueryVariables = Exact<{
  id: Scalars['String']
}>

export type LoginQuery = {
  login: {
    secret: string
    user: {
      _id: string
      issuer: string
      sub: string
      keys: {
        data: Array<Maybe<{ _id: string; name: string; secret: string }>>
      }
    }
  }
}

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']
  size?: Maybe<Scalars['Int']>
  cursor?: Maybe<Scalars['String']>
}>

export type GetUserQuery = {
  findUserByID?: Maybe<{
    issuer: string
    sub: string
    keys: {
      after?: Maybe<string>
      before?: Maybe<string>
      data: Array<Maybe<{ _id: string; secret: string; name: string }>>
    }
  }>
}

export const UpdateContentDocument = gql`
  mutation updateContent($id: ID!, $data: ContentInput!) {
    updateContent(id: $id, data: $data) {
      _id
    }
  }
`
export const GetContentbyIdDocument = gql`
  query getContentbyID($id: ID!) {
    findContentByID(id: $id) {
      _id
      cid
      dagSize
      pins {
        data {
          service
          status
          statusText
          locations {
            data {
              peerId
            }
          }
        }
      }
    }
  }
`
export const UpdatePinDocument = gql`
  mutation updatePin($id: ID!, $data: UpdatePinInput!) {
    updatePin(id: $id, data: $data) {
      _id
    }
  }
`
export const CreateUploadDocument = gql`
  mutation createUpload($input: CreateUploadInput!) {
    createUpload(input: $input) {
      _id
      type
      created
      key {
        name
      }
      files {
        name
        type
      }
      user {
        issuer
      }
      content {
        cid
        dagSize
        pins {
          data {
            _id
            status
          }
        }
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
      user {
        _id
        issuer
        sub
        keys {
          data {
            _id
            name
            secret
          }
        }
      }
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
    updateContent(
      variables: UpdateContentMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<UpdateContentMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateContentMutation>(
            UpdateContentDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'updateContent'
      )
    },
    getContentbyID(
      variables: GetContentbyIdQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<GetContentbyIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetContentbyIdQuery>(
            GetContentbyIdDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'getContentbyID'
      )
    },
    updatePin(
      variables: UpdatePinMutationVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<UpdatePinMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdatePinMutation>(UpdatePinDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'updatePin'
      )
    },
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
