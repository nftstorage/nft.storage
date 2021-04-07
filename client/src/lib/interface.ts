import type { CID } from 'multiformats'

export type { CID }

/**
 * Define nominal type of U based on type of T. Similar to Opaque types in Flow
 */
export type Tagged<T, Tag> = T & { tag?: Tag }

export interface Service {
  endpoint: URL
  token: string
}

/**
 * CID in string representation
 */
export type CIDString = Tagged<string, CID>

export interface API {
  /**
   * Stores given token and all the resources (in form of File or a Blob) it
   * references along with a metadata JSON as specificed in (ERC-1155). The
   * `token.image` must be either `File` or a `Blob` instance, which will be
   * stored and corresponding content address URL will be saved in metadata
   * JSON file under `image` field.
   *
   * If `token.properties` contain properties with `File` or `Blob` values those
   * also get stored and their URLs will be saved in metadata json in their
   * place.
   *
   * Note: URLs for `File` object will retain the name e.g. in case of
   * `new File([bytes], 'cat.png', { type: 'image/png' })` it will look like
   * `ipfs://bafy...hash/image/cat.png`. For `Blob` object URL will not have
   * name or mime type instead it will look more like `ipfs://bafy...hash/image/blob`
   */
  store<T extends TokenInput>(
    service: Service,
    token: T
  ): Promise<StoreResult<T>>

  /**
   * Stores a single file and returns a corresponding CID.
   */
  storeBlob(service: Service, content: Blob | File): Promise<CIDString>
  /**
   * Stores a directory of files and returns a CID. Provided files **MUST**
   * be within a same directory, otherwise error is raised. E.g. `foo/bar.png`,
   * `foo/bla/baz.json` is ok but `foo/bar.png`, `bla/baz.json` is not.
   */
  storeDirectory(service: Service, files: Iterable<File>): Promise<CIDString>
  /**
   * Returns current status of the stored content by its CID.
   */
  status(service: Service, cid: string): Promise<StatusResult>
  /**
   * Removes stored content by its CID from the service. Please note that
   * even if content is removed from the service other nodes that have
   * replicated it might still continue providing it.
   */
  delete(service: Service, cid: string): Promise<void>
}

export interface StatusResult {
  cid: string
  size: number
  deals: Deals
  pin: Pin
  created: Date
}

export type Deals = OngoingDeals | FinalizedDeals

/**
 * In flight deals, once they are finilized transitions to `FinilizedDeals`
 * state.
 */
export interface OngoingDeals {
  readonly status: 'ongoing'
  /**
   * Array of ongoing deals. During this state `deals` array may change over
   * time.
   */
  deals: Deals[]
}

/**
 * Finilized deals. In this state all the deals are finilized and are not going
 * to change.
 */
export interface FinalizedDeals {
  readonly status: 'finalized'
  readonly deals: FinalizedDeals[]
}

export type Deal = QueuedDeal | PendingDeal | PublishedDeal | FinalizedDeal

export interface QueuedDeal {
  status: 'queued'
  sequence: number
  lastStatusChangeTimestamp: Date
}

export interface PendingDeal {
  status: 'proposing' | 'rejected' | 'accepted' | 'errored'
  sequence: number
  lastStatusChangeTimestamp: Date
  miner: string
}

export interface PublishedDeal {
  status: 'published'
  sequence: number
  lastStatusChangeTimestamp: Date
  miner: string
  chainDealId: number
}

export interface FinalizedDeal {
  status: 'active' | 'terminated'
  sequence: number
  lastStatusChangeTimestamp: Date
  miner: string
  chainDealId: number
  dealActivation: Date
  dealExpiration: Date
}

export interface Pin {
  // Pinata does not provide this
  // requestid: string
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
   * An `File` with mime type image/* representing the asset this
   * token represents. Consider making any images at a width between `320` and
   * `1080` pixels and aspect ratio between `1.91:1` and `4:5` inclusive.
   *
   * If `File` object is used, URL in the metadata will include a filename
   * e.g. `ipfs://bafy...hash/cat.png`. If `Blob` is used URL in the metadata
   * will not include filename or extension e.g. `ipfs://bafy...img/`
   */
  image: Blob | File

  /**
   * The number of decimal places that the token amount should display - e.g.
   * `18`, means to divide the token amount by `1000000000000000000` to get its
   * user representation.
   */
  decimals?: number

  /**
   * Arbitrary properties. Values may be strings, numbers, nested object or
   * arrays of values. It is possible to provide a `File` or a `Blob` instance
   * as property value, in which case it is stored on IPFS and metadata will
   * contain URL to it in form of `ipfs://bafy...hash/name.png` or
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

export interface StoreResult<T extends TokenInput> {
  /**
   * CID for the token that encloses all of the files including metadata.json
   * for the stored token.
   */
  ipld: CIDString

  /**
   * URL like `ipfs://bafy...hash/meta/data.json` for the stored token metadata.
   */
  metadata: URL

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
  embed: Encoded<T, [[Blob, URL]]>
}

export type EncodedError = {
  message: string
}
export type EncodedURL = Tagged<string, URL>

export type Result<X, T> = { ok: true; value: T } | { ok: false; error: X }

export type StoreResponse<T> = Result<
  EncodedError,
  {
    ipld: CIDString
    metadata: EncodedURL
    data: Encoded<T, [[Blob, EncodedURL]]>
  }
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
