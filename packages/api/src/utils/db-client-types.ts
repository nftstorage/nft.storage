import { definitions } from './db-types'
import type { Deal } from '../bindings'

export type UpsertUserInput = Pick<
  definitions['user'],
  | 'magic_link_id'
  | 'github_id'
  | 'name'
  | 'picture'
  | 'email'
  | 'public_address'
  | 'github'
  | 'did'
>

export type UserOutputKey = Pick<
  definitions['auth_key'],
  'user_id' | 'id' | 'name' | 'secret' | 'deleted_at'
>

export type UserOutputTag = Pick<
  definitions['user_tag'],
  'user_id' | 'id' | 'tag' | 'value' | 'deleted_at'
>

export type UserOutput = definitions['user'] & {
  keys: Array<UserOutputKey>
  tags: Array<UserOutputTag>
}

export type UploadOutput = definitions['upload'] & {
  files: Array<{ name?: string; type?: string } | undefined>
  meta: Record<string, string>
  origins: string[]
  user: Pick<definitions['user'], 'id' | 'magic_link_id'>
  key: Pick<definitions['auth_key'], 'name'>
  content: Pick<definitions['content'], 'dag_size'> & {
    pin: Pick<definitions['pin'], 'service' | 'status' | 'inserted_at'>[]
  }
  deals: Deal[]
}

export interface CreateUploadInput {
  user_id: definitions['upload']['user_id']
  content_cid: definitions['upload']['content_cid']
  source_cid: definitions['upload']['source_cid']
  key_id?: definitions['upload']['key_id']
  mime_type?: definitions['upload']['mime_type']
  type: definitions['upload']['type']
  dag_size?: definitions['content']['dag_size']
  files?: Array<{ name?: string; type?: string }>
  origins?: string[]
  meta?: Record<string, unknown>
  name?: string
  backup_urls?: URL[]
  inserted_at?: definitions['upload']['inserted_at']
  updated_at?: definitions['upload']['updated_at']
  pins?: Pick<definitions['pin'], 'service' | 'status'>[]
}

export interface UpdateUploadInput {
  cid: string
  name?: string
  user_id: number
}

export type ContentOutput = definitions['content'] & {
  pins: Array<definitions['pin']>
  deals: Deal[]
}

export interface ListUploadsOptions {
  cid?: string[]
  /**
   * Pin objects with specified name (by default a case-sensitive, exact match)
   */
  name?: string
  /**
   * Customize the text matching strategy applied when the name filter is present; exact (the default) is a case-sensitive exact match, partial matches anywhere in the name, iexact and ipartial are case-insensitive versions of the exact and partial strategies
   */
  match?: 'exact' | 'iexact' | 'partial' | 'ipartial'
  status?: Array<definitions['pin']['status']>
  type?: Array<definitions['upload']['type']>
  before?: string
  after?: string
  /**
   * Max records (default: 10)
   */
  limit?: number
  meta?: unknown
}

export type StatsPayload = {
  [key: string]: number
  deals_size_total: number
  deals_size_total_prev: number
  uploads_blob_total: number
  uploads_car_total: number
  uploads_multipart_total: number
  uploads_nft_total: number
  uploads_past_7_total: number
  uploads_remote_total: number
}
