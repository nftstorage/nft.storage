export interface Store<Meta=Object, JSON=Object> {
  put(key:string, value: string|ReadableStream|ArrayBuffer, options?:PutOptions<Meta>):Promise<void>
  delete(key:string):Promise<void>
  list(options?:ListOptions):Promise<ListResult<Meta>>
  get(key:string):Promise<string|null>
  get(key:string, type:"text"):Promise<string|null>
  get(key:string, type:"json"):Promise<JSON|null>
  get(key:string, type:"arrayBuffer"):Promise<ArrayBuffer|null>
  get(key:string, type:"stream"):Promise<ReadableStream>

  getWithMetadata(key:string):Promise<null|WithMetadata<string, Meta>>
  getWithMetadata(key:string, type:"json"):Promise<null|WithMetadata<JSON, Meta>>
  getWithMetadata(key:string, type:"arrayBuffer"):Promise<null|WithMetadata<ArrayBuffer, Meta>>
  getWithMetadata(key:string, type:"stream"):Promise<null|WithMetadata<ReadableStream, Meta>>
}

interface WithMetadata<T, Meta> {
  value: T
  metadata: null|Meta
}

interface PutOptions<Meta> {
  expiration?: number
  expirationTtl?: number
  metadata?: Meta
}

interface ListOptions {
  /**
   * String that represents a prefix you can use to filter all keys.
   */
  prefix?: string
  /**
   * Maximum number of keys returned. The default is 1000, which is
   * the maximum. It is unlikely that you will want to change this default,
   * but it is included for completeness.
   */
  limit?: number
  /**
   * A string used for paginating responses.
   */
  cursor?: string
}

interface ListResult<Meta> {
  list_complete: boolean
  cursor: string
  keys: Key<Meta>[]
}

interface Key<Meta> {
  name: string
   expiration: 1234
   metadata: Meta
}
