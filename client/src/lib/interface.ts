export interface Service {
  endpoint: URL
  token: string
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
