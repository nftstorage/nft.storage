import { PostgrestClient } from '@supabase/postgrest-js'
import { secrets, database } from '../constants.js'
import { definitions } from './db-types'
import { NFTResponse } from '../bindings'

export type UploadFull = definitions['upload'] & {
  files: Array<{ name?: string; type?: string } | undefined>
  meta: Record<string, string>
  origins: string[]
  issuer: Pick<definitions['account'], 'issuer'>
  key: Pick<definitions['auth_key'], 'name'>
  content: Pick<definitions['content'], 'size'> & {
    pin: Pick<definitions['pin'], 'service' | 'status'>[]
  }
}

export interface CreateUploadInput {
  type: string
  cid: string
  size?: number
  issuer: string
  files?: Array<{ name?: string; type?: string }>
  key_id?: number
  pins: Array<{
    status: definitions['pin']['status']
    service: definitions['pin']['service']
  }>
  origins?: string[]
  meta?: Record<string, string>
  name?: string
}

export class DBClient {
  client: PostgrestClient

  constructor(url: string, token: string) {
    this.client = new PostgrestClient(url + '/rest/v1', {
      headers: {
        apikey: token,
      },
    })
  }

  upsertUser(
    account: Pick<
      definitions['account'],
      | 'email'
      | 'github'
      | 'issuer'
      | 'name'
      | 'picture'
      | 'sub'
      | 'public_address'
    >
  ) {
    return this.client.from<definitions['account']>('account').upsert(account)
  }

  getUser(issuer: string, secret: string) {
    return this.client
      .from<definitions['account']>('account')
      .select(
        `
    issuer,
    sub,
    name,
    keys:auth_key_issuer_fkey(issuer,key_id,name,secret)
    `
      )
      .or(`issuer.eq.${issuer},sub.eq.${issuer}`)
      .single()
  }

  async createUpload(data: CreateUploadInput) {
    const rsp = await this.client.rpc('upload_fn', {
      data,
    })
    if (rsp.error) {
      throw new Error(JSON.stringify(rsp.error))
    }

    const upload = await this.getUpload(data.cid, data.issuer)
    if (upload) {
      return upload
    }
    throw new Error('Error getting new upload.')
  }

  uploadQuery = `
        *,
        issuer:account(issuer),
        key:auth_key(name),
        content(size, pin(status, service))`

  async getUpload(
    cid: string,
    issuer: string
  ): Promise<UploadFull | undefined> {
    const { data: upload, error, status } = await this.client
      .from('upload')
      .select(this.uploadQuery)
      .eq('cid', cid)
      .eq('issuer', issuer)
      .single()

    if (status === 406) {
      return
    }
    if (error) {
      throw new Error(JSON.stringify(error))
    }
    return upload
  }

  async listUploads(opts: { limit: number; before: string; issuer: string }) {
    const { data: uploads, error } = await this.client
      .from('upload')
      .select(this.uploadQuery)
      .eq('issuer', opts.issuer)
      .lt('inserted_at', opts.before)
      .limit(opts.limit)
      .order('inserted_at', { ascending: false })

    if (error) {
      throw new Error(JSON.stringify(error))
    }

    if (uploads === null) {
      throw new Error('no data')
    }
    const rsp: NFTResponse[] = []

    for (const upload of uploads) {
      rsp.push(toNFTResponse(upload))
    }
    return rsp
  }

  async deleteUpload(cid: string, issuer: string) {
    const { data, error } = await this.client
      .from('upload')
      .delete()
      .match({ cid, issuer })

    if (error) {
      throw new Error(JSON.stringify(error))
    }

    return data
  }

  async checkUpload(cid: string) {
    const { data: content, error, status } = await this.client
      .from('content')
      .select(
        `
        cid,
        size,
        inserted_at,
        updated_at,
        pin(cid, status, service)`
      )
      .eq('cid', cid)
      .single()

    if (status === 406) {
      return
    }
    if (error) {
      throw new Error(JSON.stringify(error))
    }

    const value = {
      cid: content.cid,
      created: content.inserted_at,
      pin: {
        cid: content.cid,
        created: content.inserted_at,
        size: content.size,
        status: content.pin[0].status,
      },
      deals: [],
    }
    return value
  }

  async createKey(key: { name: string; secret: string; issuer: string }) {
    const { data, error } = await this.client
      .from<definitions['auth_key']>('auth_key')
      .insert({
        name: key.name,
        secret: key.secret,
        issuer: key.issuer,
      })

    if (error) {
      throw new Error(JSON.stringify(error))
    }

    return data
  }

  async listKeys(issuer: string) {
    const { data, error } = await this.client
      .from<definitions['auth_key']>('auth_key')
      .select(
        `
      id:key_id,
      name,
      secret
      `
      )
      .match({ issuer })

    if (error) {
      throw new Error(JSON.stringify(error))
    }

    return data
  }

  async deleteKey(id: number) {
    const { data, error } = await this.client
      .from<definitions['auth_key']>('auth_key')
      .delete()
      .match({ key_id: id })

    if (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  async getPin(cid: string) {
    const { data, error, status } = await this.client
      .from<definitions['pin']>('pin')
      .select(`*`)
      .eq('cid', cid)
      .single()

    // not found
    if (status === 406) {
      return
    }
    if (error) {
      throw new Error(JSON.stringify(error))
    }

    return data
  }
}

export function createDBClient() {
  return new DBClient(database.url, secrets.database)
}

export function toNFTResponse(upload: UploadFull) {
  const nft: NFTResponse = {
    cid: upload.cid,
    created: upload.inserted_at,
    type: upload.type,
    scope: upload.key ? upload.key.name : 'session',
    files: upload.files,
    size: upload.content.size || 0,
    pin: {
      cid: upload.cid,
      created: upload.inserted_at,
      size: upload.content.size || 0,
      status: upload.content.pin[0].status,
    },
    deals: [],
  }
  return nft
}
