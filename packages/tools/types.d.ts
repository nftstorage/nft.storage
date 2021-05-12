export interface UpsertRecordOptions {
  token: string
  zone: string
  name: string
  type: import('cloudflare').RecordTypes
  content: string
  ttl: number
  proxied: boolean
}

export interface DeployWebsiteOptions {
  token: string
  zone: string
  name: string
  type: import('cloudflare').RecordTypes
  ttl: number
  proxied: boolean
}
