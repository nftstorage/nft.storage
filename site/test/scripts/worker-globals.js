import { MemKV } from 'cf-workers-memkv'

export const SALT = Math.random().toString()
export const DEBUG = 'true'
export const DEALS = new MemKV()
export const USERS = new MemKV()
export const NFTS = new MemKV()
export const NFTS_IDX = new MemKV()
export const METRICS = new MemKV()
export const PINS = new MemKV()
export const FOLLOWUPS = new MemKV()
export const PINATA_JWT = 'test'
export const PINATA_API_URL = 'http://localhost:3070'
export const PINATA_PSA_API_URL = 'http://localhost:3071'
export const CLUSTER_API_URL = 'http://localhost:9094'
export const CLUSTER_BASIC_AUTH_TOKEN = 'test'
export const CLUSTER_IPFS_PROXY_API_URL = 'http://localhost:9095'
export const CLUSTER_IPFS_PROXY_BASIC_AUTH_TOKEN = 'test'
export const CLUSTER_ADDRS = ''
export const MAGIC_SECRET_KEY = 'test'
export const ENV = 'test'
export const SENTRY_DSN = 'https://test@test.ingest.sentry.io/0000000'
export const BRANCH = 'test'
export const VERSION = 'test'
export const COMMITHASH = 'test'
