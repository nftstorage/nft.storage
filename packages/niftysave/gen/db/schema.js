export var TokenAssetStatus
;(function (TokenAssetStatus) {
  /** Token asset was queued (for the analyzer to process). */
  TokenAssetStatus['Queued'] = 'Queued'
  /** tokenURI is either malformed or the protocol is not supported. */
  TokenAssetStatus['URIParseFailed'] = 'URIParseFailed'
  /** Was unable to fetch the content. */
  TokenAssetStatus['ContentFetchFailed'] = 'ContentFetchFailed'
  /** Parsing ERC721 metadata failed. */
  TokenAssetStatus['ContentParseFailed'] = 'ContentParseFailed'
  /** Failed to create a metadata pin request. */
  TokenAssetStatus['PinRequestFailed'] = 'PinRequestFailed'
  /** Metadata was parsed and all the resources were linked. */
  TokenAssetStatus['Linked'] = 'Linked'
})(TokenAssetStatus || (TokenAssetStatus = {}))
export var ResourceStatus
;(function (ResourceStatus) {
  /** Resource was queued to be processed. */
  ResourceStatus['Queued'] = 'Queued'
  /** URI is either malformed or the protocol is not supported. */
  ResourceStatus['URIParseFailed'] = 'URIParseFailed'
  /** Was unable to fetch the content. */
  ResourceStatus['ContentFetchFailed'] = 'ContentFetchFailed'
  /** Failed to complete a pin request. */
  ResourceStatus['PinRequestFailed'] = 'PinRequestFailed'
  /** Corresponding content was linked. */
  ResourceStatus['ContentLinked'] = 'ContentLinked'
})(ResourceStatus || (ResourceStatus = {}))
export var PinStatus
;(function (PinStatus) {
  /** An error occurred pinning. */
  PinStatus['PinFailed'] = 'PinFailed'
  /** Node has pinned the content. */
  PinStatus['Pinned'] = 'Pinned'
  /** Node is currently pinning the content. */
  PinStatus['Pinning'] = 'Pinning'
  /** The item has been queued for pinning. */
  PinStatus['PinQueued'] = 'PinQueued'
})(PinStatus || (PinStatus = {}))
const Query_possibleTypes = ['Query']
export const isQuery = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Query_possibleTypes.includes(obj.__typename)
}
const Block_possibleTypes = ['Block']
export const isBlock = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Block_possibleTypes.includes(obj.__typename)
}
const TokenPage_possibleTypes = ['TokenPage']
export const isTokenPage = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TokenPage_possibleTypes.includes(obj.__typename)
}
const Token_possibleTypes = ['Token']
export const isToken = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Token_possibleTypes.includes(obj.__typename)
}
const BlockPage_possibleTypes = ['BlockPage']
export const isBlockPage = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return BlockPage_possibleTypes.includes(obj.__typename)
}
const ERC721ImportResultPage_possibleTypes = ['ERC721ImportResultPage']
export const isERC721ImportResultPage = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ERC721ImportResultPage_possibleTypes.includes(obj.__typename)
}
const ERC721ImportResult_possibleTypes = ['ERC721ImportResult']
export const isERC721ImportResult = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ERC721ImportResult_possibleTypes.includes(obj.__typename)
}
const Owner_possibleTypes = ['Owner']
export const isOwner = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Owner_possibleTypes.includes(obj.__typename)
}
const TokenAsset_possibleTypes = ['TokenAsset']
export const isTokenAsset = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TokenAsset_possibleTypes.includes(obj.__typename)
}
const Metadata_possibleTypes = ['Metadata']
export const isMetadata = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Metadata_possibleTypes.includes(obj.__typename)
}
const ResourcePage_possibleTypes = ['ResourcePage']
export const isResourcePage = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return ResourcePage_possibleTypes.includes(obj.__typename)
}
const Resource_possibleTypes = ['Resource']
export const isResource = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Resource_possibleTypes.includes(obj.__typename)
}
const Content_possibleTypes = ['Content']
export const isContent = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Content_possibleTypes.includes(obj.__typename)
}
const PinPage_possibleTypes = ['PinPage']
export const isPinPage = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PinPage_possibleTypes.includes(obj.__typename)
}
const Pin_possibleTypes = ['Pin']
export const isPin = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Pin_possibleTypes.includes(obj.__typename)
}
const PinLocation_possibleTypes = ['PinLocation']
export const isPinLocation = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return PinLocation_possibleTypes.includes(obj.__typename)
}
const MetadataPage_possibleTypes = ['MetadataPage']
export const isMetadataPage = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return MetadataPage_possibleTypes.includes(obj.__typename)
}
const TokenContract_possibleTypes = ['TokenContract']
export const isTokenContract = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TokenContract_possibleTypes.includes(obj.__typename)
}
const QueryFindTokenAssetsPage_possibleTypes = ['QueryFindTokenAssetsPage']
export const isQueryFindTokenAssetsPage = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return QueryFindTokenAssetsPage_possibleTypes.includes(obj.__typename)
}
const Cursor_possibleTypes = ['Cursor']
export const isCursor = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Cursor_possibleTypes.includes(obj.__typename)
}
const QueryFindResourcesPage_possibleTypes = ['QueryFindResourcesPage']
export const isQueryFindResourcesPage = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return QueryFindResourcesPage_possibleTypes.includes(obj.__typename)
}
const Mutation_possibleTypes = ['Mutation']
export const isMutation = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Mutation_possibleTypes.includes(obj.__typename)
}
