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
  deals: Deals
  pin: Pin
  created: Date
}

type Deals =
  | { status: "initializing" }
  | { status: "pending"; deals: Deal[] }
  | { status: "ready"; deals: Deal[] }

export interface Deal {
  id: number
  miner: string
  status: DealState
  startEpoch: number
  endEpoch: number
}

export interface Pin {
  requestid: string
  cid: CID
  name?: string
  status: PinStatus
  created: Date
}

export type DealStatus = "requested" | "activated"
export type PinStatus = "queued" | "pinning" | "pinned" | "failed"
