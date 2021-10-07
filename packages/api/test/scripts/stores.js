import { IDBKV } from 'cf-workers-idbkv'

export default {
  deals: new IDBKV('DEALS'),
  users: new IDBKV('USERS'),
  nfts: new IDBKV('NFTS'),
  nftsIndex: new IDBKV('NFTS_IDX'),
  metrics: new IDBKV('METRICS'),
  pins: new IDBKV('PINS'),
  followups: new IDBKV('FOLLOWUPS'),
  pinataQueue: new IDBKV('PINATA_QUEUE'),
  events: new IDBKV('EVENTS'),
}
