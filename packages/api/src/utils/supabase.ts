import { PostgrestClient } from '@supabase/postgrest-js'
import { secrets, supabase } from '../constants.js'
import { definitions } from './supabase-types'
import { NFTResponse } from '../bindings'

class SupabaseClient {
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
      definitions['accounts'],
      | 'email'
      | 'github'
      | 'issuer'
      | 'name'
      | 'picture'
      | 'sub'
      | 'public_address'
    >
  ) {
    return this.client.from<definitions['accounts']>('accounts').upsert(account)
  }

  getUser(issuer: string, secret: string) {
    return this.client
      .from<definitions['accounts']>('accounts')
      .select(
        `
    issuer,
    sub,
    name,
    keys:account_keys_issuer_fkey(key_id,name,secret)
    `
      )
      .or(`issuer.eq.${issuer},sub.eq.${issuer}`)
      .single()
  }

  async createUpload(data) {
    const rsp = await this.client.rpc('upload', {
      data,
    })
    if (rsp.error) {
      throw new Error(JSON.stringify(rsp.error))
    }

    return this.getUpload(data.cid, data.issuer)
  }

  async getUpload(cid, issuer) {
    const { data: upload, error, status } = await this.client
      .from('uploads')
      .select(
        `
        cid,
        type,
        files,
        inserted_at,
        updated_at,
        issuer:accounts(issuer, name),
        key:account_keys(key_id, name, secret),
        content:contents(cid, size, pins(cid, status, service))`
      )
      .eq('cid', cid)
      .eq('issuer', issuer)
      .single()

    console.log(error)
    if (status === 406) {
      return
    }
    if (error) {
      throw new Error(JSON.stringify(error))
    }

    const nft: NFTResponse = {
      cid: upload.cid,
      created: upload.inserted_at,
      type: upload.type,
      scope: upload.key ? upload.key.name : 'session',
      files: upload.files,
      size: upload.content.size,
      pin: {
        cid: upload.cid,
        created: upload.inserted_at,
        size: upload.content.size,
        status: upload.content.pins[0].status,
      },
      deals: [],
    }
    return nft
  }

  async listUploads(opts) {
    const { data: uploads, error, status } = await this.client
      .from('uploads')
      .select(
        `
          cid,
          type,
          files,
          inserted_at,
          updated_at,
          issuer:accounts(issuer, name),
          key:account_keys(key_id, name, secret),
          content:contents(cid, size, pins(cid, status, service))`
      )
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
      const nft: NFTResponse = {
        cid: upload.cid,
        created: upload.inserted_at,
        type: upload.type,
        scope: upload.key ? upload.key.name : 'session',
        files: upload.files,
        size: upload.content.size,
        pin: {
          cid: upload.cid,
          created: upload.inserted_at,
          size: upload.content.size,
          status: upload.content.pins[0].status,
        },
        deals: [],
      }
      rsp.push(nft)
    }
    return rsp
  }

  async deleteUpload(cid, issuer) {
    const { data, error } = await this.client
      .from('uploads')
      .delete()
      .match({ cid, issuer })

    if (error) {
      throw new Error(JSON.stringify(error))
    }
  }

  async checkUpload(cid) {
    const { data: content, error, status } = await this.client
      .from('contents')
      .select(
        `
        cid,
        size,
        inserted_at,
        updated_at,
        pins(cid, status, service)`
      )
      .eq('cid', cid)
      .single()

    console.log(error)
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
        status: content.pins[0].status,
      },
      deals: [],
    }
    return value
  }

  async createKey(key: { name: string; secret: string; issuer: string }) {
    const { data, error } = await this.client
      .from<definitions['account_keys']>('account_keys')
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

  async listKeys(issuer) {
    const { data, error } = await this.client
      .from<definitions['account_keys']>('account_keys')
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

  async deleteKey(id) {
    const { data, error } = await this.client
      .from<definitions['account_keys']>('account_keys')
      .delete()
      .match({ key_id: id })

    if (error) {
      throw new Error(JSON.stringify(error))
    }
  }
}

function createSupabaseClient() {
  return new SupabaseClient(supabase.url, secrets.supabase)
}

export { SupabaseClient, createSupabaseClient }
