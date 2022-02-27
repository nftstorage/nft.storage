export type Config = {
  cf: import('./lib/cloudflare').Cloudflare
  env: string
}

export interface Hash {
  [key: string]: any
}
