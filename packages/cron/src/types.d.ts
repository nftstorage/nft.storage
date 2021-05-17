export type Config = {
  cf: import('./lib/cloudflare').Cloudflare
  env: string
}
