export var All_orderBy
;(function (All_orderBy) {
  All_orderBy['id'] = 'id'
  All_orderBy['numTokenContracts'] = 'numTokenContracts'
  All_orderBy['numTokens'] = 'numTokens'
  All_orderBy['numOwners'] = 'numOwners'
})(All_orderBy || (All_orderBy = {}))
export var OrderDirection
;(function (OrderDirection) {
  OrderDirection['asc'] = 'asc'
  OrderDirection['desc'] = 'desc'
})(OrderDirection || (OrderDirection = {}))
export var Token_orderBy
;(function (Token_orderBy) {
  Token_orderBy['id'] = 'id'
  Token_orderBy['contract'] = 'contract'
  Token_orderBy['tokenID'] = 'tokenID'
  Token_orderBy['owner'] = 'owner'
  Token_orderBy['mintTime'] = 'mintTime'
  Token_orderBy['tokenURI'] = 'tokenURI'
  Token_orderBy['blockNumber'] = 'blockNumber'
  Token_orderBy['blockHash'] = 'blockHash'
})(Token_orderBy || (Token_orderBy = {}))
export var TokenContract_orderBy
;(function (TokenContract_orderBy) {
  TokenContract_orderBy['id'] = 'id'
  TokenContract_orderBy['name'] = 'name'
  TokenContract_orderBy['symbol'] = 'symbol'
  TokenContract_orderBy['doAllAddressesOwnTheirIdByDefault'] =
    'doAllAddressesOwnTheirIdByDefault'
  TokenContract_orderBy['supportsEIP721Metadata'] = 'supportsEIP721Metadata'
  TokenContract_orderBy['tokens'] = 'tokens'
  TokenContract_orderBy['numTokens'] = 'numTokens'
  TokenContract_orderBy['numOwners'] = 'numOwners'
})(TokenContract_orderBy || (TokenContract_orderBy = {}))
export var Owner_orderBy
;(function (Owner_orderBy) {
  Owner_orderBy['id'] = 'id'
  Owner_orderBy['tokens'] = 'tokens'
  Owner_orderBy['numTokens'] = 'numTokens'
})(Owner_orderBy || (Owner_orderBy = {}))
export var OwnerPerTokenContract_orderBy
;(function (OwnerPerTokenContract_orderBy) {
  OwnerPerTokenContract_orderBy['id'] = 'id'
  OwnerPerTokenContract_orderBy['owner'] = 'owner'
  OwnerPerTokenContract_orderBy['contract'] = 'contract'
  OwnerPerTokenContract_orderBy['numTokens'] = 'numTokens'
})(OwnerPerTokenContract_orderBy || (OwnerPerTokenContract_orderBy = {}))
export var _SubgraphErrorPolicy_
;(function (_SubgraphErrorPolicy_) {
  /** Data will be returned even if the subgraph has indexing errors */
  _SubgraphErrorPolicy_['allow'] = 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  _SubgraphErrorPolicy_['deny'] = 'deny'
})(_SubgraphErrorPolicy_ || (_SubgraphErrorPolicy_ = {}))
const Query_possibleTypes = ['Query']
export const isQuery = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Query_possibleTypes.includes(obj.__typename)
}
const All_possibleTypes = ['All']
export const isAll = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return All_possibleTypes.includes(obj.__typename)
}
const Token_possibleTypes = ['Token']
export const isToken = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Token_possibleTypes.includes(obj.__typename)
}
const TokenContract_possibleTypes = ['TokenContract']
export const isTokenContract = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return TokenContract_possibleTypes.includes(obj.__typename)
}
const Owner_possibleTypes = ['Owner']
export const isOwner = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Owner_possibleTypes.includes(obj.__typename)
}
const OwnerPerTokenContract_possibleTypes = ['OwnerPerTokenContract']
export const isOwnerPerTokenContract = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return OwnerPerTokenContract_possibleTypes.includes(obj.__typename)
}
const _Meta__possibleTypes = ['_Meta_']
export const is_Meta_ = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return _Meta__possibleTypes.includes(obj.__typename)
}
const _Block__possibleTypes = ['_Block_']
export const is_Block_ = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return _Block__possibleTypes.includes(obj.__typename)
}
const Subscription_possibleTypes = ['Subscription']
export const isSubscription = (obj) => {
  if (!obj.__typename) throw new Error('__typename is missing')
  return Subscription_possibleTypes.includes(obj.__typename)
}
