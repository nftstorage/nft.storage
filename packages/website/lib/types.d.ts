declare module 'countly-sdk-web'

export type StatsPayload = {
  [key: string]: any
  deals_size_total: number
  uploads_past_7_total: number
  uploads_nft_total: number
  uploads_remote_total: number
  deals_total: number
  uploads_car_total: number
  uploads_multipart_total: number
  uploads_blob_total: number
}
