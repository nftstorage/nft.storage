export interface Service {
  endpoint: URL
  token: string
}

export interface PublicService {
  endpoint: URL
}

/**
 * CID in string representation
 */
export type CIDString = string & {}

export interface API {
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
   * Returns current status of the stored NFT by its CID. Note the NFT must
   * have previously been stored by this account.
   */
  status(service: Service, cid: string): Promise<StatusResult>
  /**
   * Removes stored content by its CID from the service. Please note that
   * even if content is removed from the service other nodes that have
   * replicated it might still continue providing it.
   */
  delete(service: Service, cid: string): Promise<void>
  /**
   * Check if a CID of an NFT is being stored by nft.storage.
   */
  check(service: PublicService, cid: string): Promise<CheckResult>
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
   * Deal Activation
   */
  dealActivation: Date
  /**
   * Deal Expiraction
   */
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
