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
  deals: Deal[] // this array is instantiated immediately on `store` with the preconfigured number of Deal's in 'queued' state
  pin: Pin
  created: Date
}


export interface Deal {
  sequence: number  // a unique integer for the "slot", immutable, does not disappear
  status: DealStatus // see below
  lastStatusChangeTimestamp: timestamp // datetime/epoch/whatever
  miner: string
  chainDealId: integer
  dealActivationTimestamp: timestamp // null OR when deal shows up on chain
  dealExpirationTimestamp: timestamp // null OR when deal will terminate after a successful `active`
}

export interface Pin {
  requestid: string
  cid: CID
  name?: string
  status: PinStatus
  created: Date
}

export type DealStatus = "queued" | "proposed" | "rejected" | "accepted" | "published" | "active" | "terminated" | "errored"
export type PinStatus = "queued" | "pinning" | "pinned" | "failed"
