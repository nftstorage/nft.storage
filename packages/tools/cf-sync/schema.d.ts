export type LocalNFT = {
  name: string
  size: number
  pinStatus: 'queued' | 'pinning' | 'pinned' | 'failed'
  data: {
    cid: string
    created: string
    type: string
    scope: string
    files: Array<{ name: string; type?: string }>
    pin?: {
      name?: string
      meta?: Record<string, string>
    }
  }
  deals: Array<{
    status: 'failed' | 'published' | 'active' | 'terminated' | 'queued'
    lastChanged: 'string'
  }>
}
