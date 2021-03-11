export {};

declare global {
  const AUTH0_DOMAIN: string
  const AUTH0_CLIENT_ID: string
  const AUTH0_CLIENT_SECRET: string
  const AUTH0_CALLBACK_URL: string
  const SALT: string
  const DEBUG: string
  const SESSION: KVNamespace
  const CSRF: KVNamespace
  const USERS: KVNamespace
  const NFTS: KVNamespace
  const PINATA_JWT: string
}
