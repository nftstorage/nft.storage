import { DNSRecordType } from './utils/types'

export interface UpsertRecordOptions {
  email: string
  key: string
  token: string
  zone: string
  name: string
  type: DNSRecordType
  content: string
  ttl: number
  proxied: boolean
}

export interface DeployWebsiteOptions {
  zone: string
  name: string
  type: DNSRecordType
  ttl: number
  proxied: boolean
  email: string
  key: string
  account: string
  project: string
}
