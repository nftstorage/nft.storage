export interface PaginationOptions {
  /**
   * Which page of results to return
   */
  page?: number
  /**
   * How many results to return per page
   */
  per_page?: number
  /**
   * Attribute name to order the responses by
   */
  order?: string
  direction?: 'ASC' | 'DESC'
}

export interface DeploymentsOptions {
  accountId: string
  projectName: string
}

export interface DeploymentsWithPaginationsOptions extends DeploymentsOptions {
  pagination?: PaginationOptions
}

export interface CloudflareOptions {
  email?: string
  key?: string
  token?: string
}

export interface ListDNSOptions {
  match: 'any' | 'all'
  name: string
  order: 'type' | 'name' | 'content' | 'ttl' | 'proxied'
  content: string
  type: DNSRecordType
  proxied: boolean
}

export interface UpdateDNSOptions {
  type: DNSRecordType
  name: string
  content: string
  ttl: number
  proxied?: boolean
}

export interface CreateDNSOptions {
  type: DNSRecordType
  name: string
  content: string
  ttl: number
  proxied?: boolean
  priority?: number
}
export type DNSRecordType =
  | 'A'
  | 'AAAA'
  | 'CNAME'
  | 'HTTPS'
  | 'TXT'
  | 'SRV'
  | 'LOC'
  | 'MX'
  | 'NS'
  | 'SPF'
  | 'CERT'
  | 'DNSKEY'
  | 'DS'
  | 'NAPTR'
  | 'SMIMEA'
  | 'SSHFP'
  | 'SVCB'
  | 'TLSA'
  | 'URI'
