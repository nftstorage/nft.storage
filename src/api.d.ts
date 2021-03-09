import type { CID } from "multiformats/cid"
export interface Service {
  endpoint: URL
  token: string
}

export interface API {
  store(files: Iterable<File>, service: Service): Promise<CID>
  status(cid: CID): Promise<StatusResult>
  delete(cid: CID): Promise<void>
}

export interface StatusResult {
  cid: CID
  deals: Deals,
  pin: Pin
  created: Date
}

// this array is instantiated immediately on `store` with the preconfigured number of Deal's in 'queued' state
export type Deals =
  | { type: "ongoing", ongoing: Deals[] }
  | { type: "complete", complete: FinalizedDeal[] }

export type Deal = QueuedDeal | PendingDeal | PublishedDeal | FinalizedDeal

export interface QueuedDeal {
  status: "queued"
  sequence: number
  lastStatusChangeTimestamp: Date
}

export inerface PendingDeal {
  status: 'proposing' | "rejected" | "accepted" | "errored"
  sequence: number
  // changed
  lastStatusChangeTimestamp: Date
  miner: string
}


export interface PublishedDeal {
  status: "published"
  sequence: number
  lastStatusChangeTimestamp: Date
  miner: string
  chainDealId: number
}

export interface FinalizedDeal {
  status: "active" | "terminated" 
  sequence: number
  lastStatusChangeTimestamp: Date
  miner: string
  chainDealId: number
  dealActivationTimestamp: Date
  dealExpirationTimestamp: Date
}


export interface Pin {
  requestid: string
  cid: CID
  name?: string
  status: PinStatus
  created: Date
}

export type DealStatus = | 
export type PinStatus = "queued" | "pinning" | "pinned" | "failed"
