import type { CID } from "multiformats/cid"
export interface Service {
  endpoint: URL
  token: string
}

export interface API {
  store(files:Iterable<File>, service:Service):Promise<StoreResult>
  status(cid:CID):Promise<StatusResult>
  delete(cid: CID):Promise<DeleteResult>
}

export interface StoreResult {
  cid: CID
  requestid: string
}

export interface StatusResult {
  cid: CID
  deals: Deal[]
  pin: Pin
  created: Date
}

export interface Deal {
  id: number
  miner: string
  state: DealState
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

export type DealState = "activated"
export type PinStatus = "queued" | "pinning" | "pinned" | "failed"

export interface DeleteResult {
}
