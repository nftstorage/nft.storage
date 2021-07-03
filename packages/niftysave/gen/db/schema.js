export var ResourceStatus
;(function (ResourceStatus) {
  /** Has not been processed yet */
  ResourceStatus['Idle'] = 'Idle'
  /**
   * Pin request started. This usually implies that we found a CID in the
   * tokenURI (because it was a gateway URL) so we started a pin but do not
   * know if it was possible to fetch content.
   */
  ResourceStatus['PinQueued'] = 'PinQueued'
  /** Was pinned succesfully */
  ResourceStatus['Pinned'] = 'Pinned'
  /** tokenURI is either malformed or the protocol is not supported. */
  ResourceStatus['FailedURIParse'] = 'FailedURIParse'
  /** Was unable to fetch the content. */
  ResourceStatus['FailedFetch'] = 'FailedFetch'
  /**
   * Pin request failed, can happen when pinned by CID but correspoding content
   * is not on the network.
   */
  ResourceStatus['PinFailure'] = 'PinFailure'
})(ResourceStatus || (ResourceStatus = {}))
export var TokenAssetStatus
;(function (TokenAssetStatus) {
  TokenAssetStatus['Queued'] = 'Queued'
  TokenAssetStatus['Failed'] = 'Failed'
  TokenAssetStatus['Succeeded'] = 'Succeeded'
})(TokenAssetStatus || (TokenAssetStatus = {}))
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
const Task_possibleTypes = ['Task']
export const isTask = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Task_possibleTypes.includes(obj.__typename)
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
