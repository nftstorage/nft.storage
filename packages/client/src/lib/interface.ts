import type { CID } from 'multiformats'
export type { CID }

import type { BlockDecoder } from 'multiformats/block'
export type { BlockDecoder }

import type { CarReader } from '@ipld/car/api'
export type { CarReader }

/**
 * Define nominal type of U based on type of T. Similar to Opaque types in Flow
 */
export type Tagged<T, Tag> = T & { tag?: Tag }

export interface Service {
  endpoint: URL
  token: string

  did?: string
  rateLimiter?: RateLimiter
}

export interface PublicService {
  endpoint: URL
  rateLimiter?: RateLimiter
}

export interface FileObject {
  name: string
  size: number
  stream: () => AsyncIterable<any>
}

export type FilesSource =
| Iterable<File>
| Iterable<FileObject>
| AsyncIterable<File>
| AsyncIterable<FileObject>

/**
 * CID in string representation
 */
export type CIDString = Tagged<string, CID>

export interface API {
  /**
   * Encodes the given token and all resources it references (in the form of a
   * File or a Blob) along with a metadata JSON as specificed in ERC-1155 to a
   * CAR file. The `token.image` must be either a `File` or a `Blob` instance,
   * which will be stored and the corresponding content address URL will be
   * saved in the metadata JSON file under `image` field.
   *
   * If `token.properties` contains properties with `File` or `Blob` values,
   * those also get stored and their URLs will be saved in the metadata JSON
   * file in their place.
   *
   * Note: URLs for `File` objects will retain file names e.g. in case of
   * `new File([bytes], 'cat.png', { type: 'image/png' })` will be transformed
   * into a URL that looks like `ipfs://bafy...hash/image/cat.png`. For `Blob`
   * objects, the URL will not have a file name name or mime type, instead it
   * will be transformed into a URL that looks like
   * `ipfs://bafy...hash/image/blob`.
   */
  encodeNFT<T extends TokenInput>(
    input: T
  ): Promise<{ token: Token<T>; car: CarReader }>
  /**
   * Encodes a single file to a CAR file and also returns it's root CID.
   */
  encodeBlob(
    service: Service,
    content: Blob | File
  ): Promise<{ cid: CID; car: CarReader }>
  /**
   * Encodes a directory of files to a CAR file and also returns the root CID.
   * Provided files **MUST** be within the same directory, otherwise error is
   * raised e.g. `foo/bar.png`, `foo/bla/baz.json` is ok but `foo/bar.png`,
   * `bla/baz.json` is not.
   */
  encodeDirectory(files: Iterable<File>): Promise<{ cid: CID; car: CarReader }>
  /**
   * Stores the given token and all resources it references (in the form of a
   * File or a Blob) along with a metadata JSON as specificed in ERC-1155. The
   * `token.image` must be either a `File` or a `Blob` instance, which will be
   * stored and the corresponding content address URL will be saved in the
   * metadata JSON file under `image` field.
   *
   * If `token.properties` contains properties with `File` or `Blob` values,
   * those also get stored and their URLs will be saved in the metadata JSON
   * file in their place.
   *
   * Note: URLs for `File` objects will retain file names e.g. in case of
   * `new File([bytes], 'cat.png', { type: 'image/png' })` will be transformed
   * into a URL that looks like `ipfs://bafy...hash/image/cat.png`. For `Blob`
   * objects, the URL will not have a file name name or mime type, instead it
   * will be transformed into a URL that looks like
   * `ipfs://bafy...hash/image/blob`.
   */
  store<T extends TokenInput>(service: Service, token: T, options?: RequestOptions): Promise<Token<T>>
  /**
   * Stores a single file and returns it's CID.
   */
  storeBlob(service: Service, content: Blob | File, options?: RequestOptions): Promise<CIDString>
  /**
   * Stores a CAR file and returns it's root CID.
   */
  storeCar(
    service: Service,
    content: Blob | CarReader,
    options?: CarStorerOptions
  ): Promise<CIDString>
  /**
   * Stores a directory of files and returns a CID. Provided files **MUST**
   * be within the same directory, otherwise error is raised e.g. `foo/bar.png`,
   * `foo/bla/baz.json` is ok but `foo/bar.png`, `bla/baz.json` is not.
   */
  storeDirectory(service: Service, files: FilesSource, options?: RequestOptions): Promise<CIDString>
  /**
   * Returns current status of the stored NFT by its CID. Note the NFT must
   * have previously been stored by this account.
   */
  status(service: Service, cid: string, options?: RequestOptions): Promise<StatusResult>
  /**
   * Removes stored content by its CID from this account. Please note that
   * even if content is removed from the service other nodes that have
   * replicated it might still continue providing it.
   */
  delete(service: Service, cid: string, options?: RequestOptions): Promise<void>
  /**
   * Check if a CID of an NFT is being stored by NFT.Storage.
   */
  check(service: PublicService, cid: string, options?: RequestOptions): Promise<CheckResult>
}

export interface RequestOptions {
  /**
   * A signal that can be used to abort the request.
   */
  signal?: AbortSignal
}

export interface CarStorerOptions extends RequestOptions {
  /**
   * Callback called after each chunk of data has been uploaded. By default,
   * data is split into chunks of around 10MB. It is passed the actual chunk
   * size in bytes.
   */
  onStoredChunk?: (size: number) => void
  /**
   * Maximum times to retry a failed upload. Default: 5
   */
  maxRetries?: number
  /**
   * Maximum chunk size to upload in bytes. Default: 52,428,800
   */
  maxChunkSize?: number
  /**
   * Additional IPLD block decoders. Used to interpret the data in the CAR
   * file and split it into multiple chunks. Note these are only required if
   * the CAR file was not encoded using the default encoders: `dag-pb`,
   * `dag-cbor` and `raw`.
   */
  decoders?: BlockDecoder<any, any>[]
}

export interface CheckResult {
  cid: string
  pin: { status: PinStatus }
  deals: Deal[]
}

export interface StatusResult {
  cid: string
  size: number
  deals: Deal[]
  pin: Pin
  created: Date
}

export type Deal =
  | QueuedDeal
  | PendingDeal
  | FailedDeal
  | PublishedDeal
  | FinalizedDeal

export interface DealInfo {
  lastChanged: Date
  /**
   * Miner ID
   */
  miner: string

  /**
   * Filecoin network for this Deal
   * TODO this needs to be removed
   */
  network?: 'nerpanet' | 'mainnet'
  /**
   * Piece CID string
   */
  pieceCid: CIDString
  /**
   * CID string
   */
  batchRootCid: CIDString
}

export interface QueuedDeal {
  status: 'queued'
  /**
   * Timestamp in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format: YYYY-MM-DDTHH:MM:SSZ.
   */
  lastChanged: Date
}

export interface PendingDeal extends DealInfo {
  status: 'proposing' | 'accepted'
}

export interface FailedDeal extends DealInfo {
  status: 'failed'
  /**
   * Reason deal failed.
   */
  statusText: string
}

export interface PublishedDeal extends DealInfo {
  status: 'published'
  /**
   * Identifier for the deal stored on chain.
   */
  chainDealID: number
}

export interface FinalizedDeal extends DealInfo {
  status: 'active' | 'terminated'
  /**
   * Identifier for the deal stored on chain.
   */
  chainDealID: number
  /**
   * Selector for extracting stored data from the batch root.
   */
  datamodelSelector: string
  /**
   * Deal Activation
   */
  dealActivation: Date
  /**
   * Deal Expiraction
   */
  dealExpiration: Date
}

export interface Pin {
  cid: CIDString
  name?: string
  status: PinStatus
  created: Date
}

export type PinStatus = 'queued' | 'pinning' | 'pinned' | 'failed'

/**
 * This is an input used to construct the Token metadata as per EIP-1155
 * @see https://eips.ethereum.org/EIPS/eip-1155#metadata
 */
export interface TokenInput {
  /**
   * Identifies the asset to which this token represents
   */
  name: string
  /**
   * Describes the asset to which this token represents
   */
  description: string
  /**
   * A `File` with mime type `image/*` representing the asset this
   * token represents. Consider creating images with width between `320` and
   * `1080` pixels and aspect ratio between `1.91:1` and `4:5` inclusive.
   *
   * If a `File` object is used, the URL in the metadata will include a filename
   * e.g. `ipfs://bafy...hash/cat.png`. If a `Blob` is used, the URL in the
   * metadata will not include filename or extension e.g. `ipfs://bafy...img/`
   */
  image: Blob | File

  /**
   * The number of decimal places that the token amount should display - e.g.
   * `18`, means to divide the token amount by `1000000000000000000` to get its
   * user representation.
   */
  decimals?: number

  /**
   * Arbitrary properties. Values may be strings, numbers, nested objects or
   * arrays of values. It is possible to provide `File` or `Blob` instances
   * as property values, which will be stored on IPFS, and metadata will
   * contain URLs to them in form of `ipfs://bafy...hash/name.png` or
   * `ipfs://bafy...file/` respectively.
   */
  properties?: Object

  localization?: Localization
}

interface Localization {
  /**
   * The URI pattern to fetch localized data from. This URI should contain the
   * substring `{locale}` which will be replaced with the appropriate locale
   * value before sending the request.
   */
  uri: string
  /**
   * The locale of the default data within the base JSON
   */
  default: string
  /**
   * The list of locales for which data is available. These locales should
   * conform to those defined in the Unicode Common Locale Data Repository
   * (http://cldr.unicode.org/).
   */
  locales: string[]
}

export interface Token<T extends TokenInput> {
  /**
   * CID for the token that encloses all of the files including metadata.json
   * for the stored token.
   */
  ipnft: CIDString

  /**
   * URL like `ipfs://bafy...hash/meta/data.json` for the stored token metadata.
   */
  url: EncodedURL

  /**
   * Actual token data in ERC-1155 format. It matches data passed as `token`
   * argument except Files/Blobs are substituted with corresponding `ipfs://`
   * URLs.
   */
  data: Encoded<T, [[Blob, URL]]>

  /**
   * Token data just like in `data` field except urls corresponding to
   * Files/Blobs are substituted with IPFS gateway URLs so they can be
   * embedded in browsers that do not support `ipfs://` protocol.
   */
  embed(): Encoded<T, [[Blob, URL]]>
}

export type EncodedError = {
  message: string
}
export type EncodedURL = Tagged<string, URL>

export type Result<X, T> = { ok: true; value: T } | { ok: false; error: X }

export interface EncodedToken<T extends TokenInput> {
  ipnft: CIDString
  url: EncodedURL
  data: Encoded<T, [[Blob, EncodedURL]]>
}
export type StoreResponse<T extends TokenInput> = Result<
  EncodedError,
  EncodedToken<T>
>

/**
 * Represents `T` encoded with a given `Format`.
 * @example
 * ```ts
 * type Format = [
 *    [URL, { type: 'URL', href: string }]
 *    [CID, { type: 'CID', cid: string }]
 *    [Blob, { type: 'Blob', href: string }]
 * ]
 *
 * type Response<T> = Encoded<T, Format>
 * ```
 */
export type Encoded<T, Format extends Pattern<any, any>[]> = MatchRecord<
  T,
  Rule<Format[number]>
>

/**
 * Format consists of multiple encoding defines what input type `I` maps to what output type `O`. It
 * can be represented via function type or a [I, O] tuple.
 */
type Pattern<I, O> = ((input: I) => O) | [I, O]

export type MatchRecord<T, R extends Rule<any>> = {
  [K in keyof T]: MatchRule<T[K], R> extends never // R extends {I: T[K], O: infer O} ? O : MatchRecord<T[K], R> //Match<T[K], R>
    ? MatchRecord<T[K], R>
    : MatchRule<T[K], R>
}

type MatchRule<T, R extends Rule<any>> = R extends (input: T) => infer O
  ? O
  : never

type Rule<Format extends Pattern<any, any>> = Format extends [infer I, infer O]
  ? (input: I) => O
  : Format extends (input: infer I) => infer O
  ? (input: I) => O
  : never

/**
 * RateLimiter returns a promise that resolves when it is safe to send a request
 * that does not exceed the rate limit.
 */
export interface RateLimiter {
  (): Promise<void>
}
