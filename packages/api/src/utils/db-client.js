import { PostgrestClient, PostgrestQueryBuilder } from '@supabase/postgrest-js'

/**
 * @typedef {import('./db-types').definitions} definitions
 */

/** @type {Array<definitions['upload']['type']>} */
export const UPLOAD_TYPES = ['Car', 'Blob', 'Multipart', 'Remote', 'Nft']
/** @type {Array<definitions['pin']['service']>} */
export const PIN_SERVICES = [
  'IpfsCluster3',
  'IpfsCluster2',
  'IpfsCluster',
  'Pinata',
]
/** @type {Array<definitions['pin']['status']>} */
export const PIN_STATUSES = ['PinQueued', 'Pinning', 'Pinned', 'PinError']

export class DBClient {
  /**
   * DB client constructor
   *
   * @param {string} url
   * @param {string} token
   */
  constructor(url, token) {
    this.client = new PostgrestClient(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: `${token}`,
      },
    })

    this.cargoClient = new PostgrestClient(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        apikey: `${token}`,
      },
      schema: 'cargo',
    })
  }

  /**
   * Upsert user
   *
   * @param {import('./db-client-types').UpsertUserInput} user
   */
  upsertUser(user) {
    /**@type {PostgrestQueryBuilder<definitions['user']>} */
    const query = this.client.from('user')

    return query.upsert(user, { onConflict: 'github_id' })
  }

  /**
   * Register a DID for a user
   * @param {string} did
   * @param {number} userId
   */
  async registerDid(did, userId) {
    /**@type {PostgrestQueryBuilder<definitions['user']>} */
    const query = this.client.from('user')
    const { data, error } = await query
      .update({
        did: did,
      })
      .match({ id: userId })

    if (error) {
      throw new DBError(error)
    }

    if (!data) {
      throw new Error('Auth key not created.')
    }
  }

  /**
   * Gets a user by user id
   *
   * @param {number} id
   * @returns
   */
  async getUserById(id) {
    const { data, error, status } = await this.client
      .from('user')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new DBError(error)
    }

    return data
  }

  /**
   * Get user by magic.link or old github id
   *
   * @param {string} id
   */
  async getUser(id) {
    /** @type {PostgrestQueryBuilder<import('./db-client-types').UserOutput>} */
    const query = this.client.from('user')

    let select = query
      .select(
        `
    id,
    magic_link_id,
    github_id,
    did,
    keys:auth_key_user_id_fkey(user_id,id,name,secret,deleted_at),
    tags:user_tag_user_id_fkey(user_id,id,tag,value)
    `
      )
      .or(`magic_link_id.eq.${id},github_id.eq.${id},did.eq.${id}`)
      // @ts-ignore
      .filter('tags.deleted_at', 'is', null)

    const { data, error, status } = await select.single()

    if (status === 406 || !data) {
      return
    }
    if (error) {
      throw new DBError(error)
    }

    return data
  }

  /**
   *
   * @param {import('./db-client-types').UserOutputKey} key
   */
  async checkIfTokenBlocked(key) {
    const { data, error } = await this.client
      .from('auth_key_history')
      .select('status')
      .eq('auth_key_id', key.id)
      .filter('deleted_at', 'is', null)

    if (error) {
      throw new DBError(error)
    }

    if (!data || !data.length) {
      return false
    }

    return data[0].status === 'Blocked'
  }

  /**
   * Gets user tag change requests
   *
   * @param {number} userId
   */
  async getUserRequests(userId) {
    const { data, error } = await this.client
      .from('user_tag_proposal')
      .select('*')
      .match({ user_id: userId })
      .is('deleted_at', null)

    if (error) {
      throw new DBError(error)
    }

    return data
  }

  /**
   * Creates a user tag change request
   *
   * @param {number} userId
   * @param {string} tagName
   * @param {string} requestedTagValue
   * @param {JSON} userProposalForm
   * @returns
   */
  async createUserRequest(
    userId,
    tagName,
    requestedTagValue,
    userProposalForm
  ) {
    const { data: deleteData, status: deleteStatus } = await this.client
      .from('user_tag_proposal')
      .update({
        deleted_at: new Date().toISOString(),
      })
      .match({ user_id: userId, tag: tagName })
      .is('deleted_at', null)

    if (
      deleteStatus === 200 ||
      ((deleteStatus === 406 || deleteStatus === 404) && !deleteData)
    ) {
      const { error: insertError, status: insertStatus } = await this.client
        .from('user_tag_proposal')
        .insert({
          user_id: userId,
          tag: tagName,
          proposed_tag_value: requestedTagValue,
          inserted_at: new Date().toISOString(),
          user_proposal_form: userProposalForm,
        })
        .single()

      if (insertError) {
        throw new DBError(insertError)
      }

      if (insertStatus === 201) {
        return true
      }
    }

    return false
  }

  /**
   * Create upload with content and pins
   *
   * @param {import('./db-client-types').UpdateUploadInput} data
   * @returns
   */
  async updateUpload(data) {
    const now = new Date().toISOString()

    const query = this.client.from('upload')

    // we have to see if the upload exists with:
    // the id requested and that the user is the uploads user
    // and that the upload is not deleted
    const { data: upload, status } = await query
      .update({
        name: data.name,
        updated_at: now,
      })
      .select(this.uploadQuery)
      .eq('source_cid', data.cid)
      .eq('user_id', data.user_id)
      .is('deleted_at', null)
      .single()

    if (status === 406) {
      throw new Error(`Status 406, cannot update ${data.cid}`)
    }

    if (!upload) {
      throw new Error(`Cannot update upload ${data.cid} ${status}`)
    }

    return upload
  }

  /**
   * Create upload with content and pins
   *
   * @param {import('./db-client-types').CreateUploadInput} data
   * @returns
   */
  async createUpload(data) {
    const defaultPins = [
      {
        status: 'PinQueued',
        service: 'IpfsCluster3',
      },
    ]

    const now = new Date().toISOString()
    const rsp = await this.client.rpc('create_upload', {
      data: {
        ...data,
        pins: data.pins || defaultPins,
        backup_urls: data.backup_urls
          ? data.backup_urls.map((u) => u.toString())
          : [],
        inserted_at: data.inserted_at || now,
        updated_at: data.updated_at || now,
      },
    })

    if (rsp.error) {
      throw new DBError(rsp.error)
    }

    const upload = await this.getUpload(data.source_cid, data.user_id)
    if (upload) {
      return upload
    }
    throw new Error('failed to get new upload')
  }

  uploadQuery = `
        *,
        user(id, magic_link_id),
        key:auth_key(name),
        content(dag_size, pin(status, service, inserted_at))`

  /**
   * Get upload with user, auth_keys, content and pins
   *
   * @param {string} cid
   * @param {number} userId
   * @returns
   */
  async getUpload(cid, userId) {
    /** @type {PostgrestQueryBuilder<import('./db-client-types').UploadOutput>} */
    const query = this.client.from('upload')
    const {
      data: upload,
      error,
      status,
    } = await query
      .select(this.uploadQuery)
      .eq('source_cid', cid)
      .eq('user_id', userId)
      .is('deleted_at', null)
      .filter(
        // @ts-ignore
        'content.pin.service',
        'in',
        '(IpfsCluster,IpfsCluster2,IpfsCluster3)'
      )
      .single()

    if (status === 406 || !upload) {
      return
    }
    if (error) {
      throw new DBError(error)
    }

    return { ...upload, deals: await this.getDeals(upload.content_cid) }
  }

  /**
   * List uploads
   *
   * @param {number} userId
   * @param {import('./db-client-types').ListUploadsOptions} opts
   */
  async listUploads(userId, opts) {
    /** @type {PostgrestQueryBuilder<import('./db-client-types').UploadOutput>} */
    const from = this.client.from('upload')
    const match = opts.match || 'exact'
    let query = from
      .select(this.uploadQuery)
      .eq('user_id', userId)
      .is('deleted_at', null)
      .filter(
        // @ts-ignore
        'content.pin.service',
        'in',
        '(IpfsCluster,IpfsCluster2,IpfsCluster3)'
      )
      .limit(opts.limit || 10)
      .order('inserted_at', { ascending: false })

    if (opts.status) {
      // @ts-ignore
      query = query.in('content.pin.status', opts.status)
    }

    if (opts.cid) {
      query = query.in('source_cid', opts.cid)
    }

    if (opts.type) {
      query = query.in('type', opts.type)
    }

    if (opts.name && match === 'exact') {
      query = query.like('name', `${opts.name}`)
    }

    if (opts.name && match === 'iexact') {
      query = query.ilike('name', `${opts.name}`)
    }

    if (opts.name && match === 'partial') {
      query = query.like('name', `%${opts.name}%`)
    }

    if (opts.name && match === 'ipartial') {
      query = query.ilike('name', `%${opts.name}%`)
    }

    if (opts.before) {
      query = query.lte('inserted_at', opts.before)
    }

    if (opts.after) {
      query = query.gte('inserted_at', opts.after)
    }

    const { data: uploads, error } = await query
    if (error) {
      throw new DBError(error)
    }

    const cids = uploads?.map((u) => u.content_cid)

    const deals = await this.getDealsForCids(cids)

    return uploads?.map((u) => {
      return {
        ...u,
        deals: deals[u.content_cid] || [],
      }
    })
  }

  /**
   * Delete upload
   *
   * @param {string} cid
   * @param {number} userId
   */
  async deleteUpload(cid, userId) {
    /** @type {PostgrestQueryBuilder<import('./db-client-types').UploadOutput>} */
    const query = this.client.from('upload')

    const date = new Date().toISOString()
    const { data, error, status } = await query
      .update({
        deleted_at: date,
        updated_at: date,
      })
      .match({ source_cid: cid, user_id: userId })
      .filter('deleted_at', 'is', null)
      .single()

    if (status === 406 || !data) {
      return
    }
    if (error) {
      throw new DBError(error)
    }

    return data
  }

  /**
   * Get content with pins
   *
   * @param {string} cid
   */
  async getContent(cid) {
    /** @type {PostgrestQueryBuilder<import('./db-client-types').ContentOutput>} */
    const query = this.client.from('content')
    const {
      data: content,
      error,
      status,
    } = await query
      .select(
        `
        cid,
        dag_size,
        inserted_at,
        updated_at,
        pins:pin(status, service, inserted_at)`
      )
      // @ts-ignore
      .filter('pins.service', 'in', '(IpfsCluster,IpfsCluster2,IpfsCluster3)')
      .eq('cid', cid)
      .single()

    if (status === 406 || !content) {
      return
    }
    if (error) {
      throw new DBError(error)
    }
    return { ...content, deals: await this.getDeals(cid) }
  }

  /**
   * Get deals for a cid
   *
   * @param {string} cid
   * @returns {Promise<import('./../bindings').Deal[]>}
   */
  async getDeals(cid) {
    const deals = await this.getDealsForCids([cid])

    return deals[cid] ? deals[cid] : []
  }

  /**
   * Get deals for multiple cids. This function is error tolerant as it uses
   * the dagcargo FDW. It will return an empty object if any error is
   * encountered fetching the data.
   *
   * @param {string[]} cids
   */
  async getDealsForCids(cids = []) {
    try {
      const rsp = await this.client.rpc('find_deals_by_content_cids', {
        cids,
      })
      if (rsp.error) {
        throw new DBError(rsp.error)
      }

      /** @type {Record<string, import('./../bindings').Deal[]>} */
      const result = {}
      for (const d of rsp.data) {
        const { contentCid: cid, ...rest } = d
        if (!Array.isArray(result[cid])) {
          result[cid] = [rest]
        } else {
          result[cid].push(rest)
        }
      }

      return result
    } catch (err) {
      return {}
    }
  }

  /**
   * Create a new auth key
   *
   * @param {Object} key
   * @param {string} key.name
   * @param {string} key.secret
   * @param {number} key.userId
   */
  async createKey(key) {
    /** @type {PostgrestQueryBuilder<definitions['auth_key']>} */
    const query = this.client.from('auth_key')

    const { data, error } = await query
      .upsert({
        name: key.name,
        secret: key.secret,
        user_id: key.userId,
      })
      .single()

    if (error) {
      throw new DBError(error)
    }

    if (!data) {
      throw new Error('Auth key not created.')
    }

    return data
  }

  /**
   * Create a new user tag
   *
   * @param {Object} tag
   * @param {number} tag.user_id
   * @param {string} tag.value
   * @param {string} tag.value_type
   * @param {string} tag.inserted_at
   * @param {string} tag.reason
   */
  async createUserTag(tag) {
    /** @type {PostgrestQueryBuilder<definitions['user_tag']>} */
    const query = this.client.from('user_tag')

    const { data, error } = await query.upsert(tag).single()

    if (error) {
      throw new DBError(error)
    }

    if (!data) {
      throw new Error('User tag not created.')
    }

    return data
  }

  /**
   * List auth keys
   *
   * @param {number} userId
   */
  async listKeys(userId) {
    /** @type {PostgrestQueryBuilder<definitions['auth_key']>} */
    const query = this.client.from('auth_key')

    const { data, error } = await query
      .select(
        `
      id,
      name,
      secret
      `
      )
      .eq('user_id', userId)
      .is('deleted_at', null)

    if (error) {
      throw new DBError(error)
    }

    return data
  }

  /**
   * Delete auth key
   *
   * @param {number} userId
   * @param {number} id
   */
  async deleteKey(userId, id) {
    /** @type {PostgrestQueryBuilder<definitions['auth_key']>} */
    const query = this.client.from('auth_key')

    const date = new Date().toISOString()
    const { error } = await query
      .update({
        deleted_at: date,
        updated_at: date,
      })
      .match({ id, user_id: userId })
      .is('deleted_at', null)
      .single()

    if (error) {
      throw new DBError(error)
    }
  }

  /**
   * @param {string} name
   */
  async getMetric(name) {
    /** @type {PostgrestQueryBuilder<definitions['metric']>} */
    const query = this.client.from('metric')
    const { data, error } = await query.select('value').eq('name', name)

    if (error) {
      throw new DBError(error)
    }

    if (!data || !data.length) {
      return undefined
    }

    return data[0].value
  }

  /**
   * Get stats for uploads and cargo deals
   *
   * @returns {Promise<import('./db-client-types').StatsPayload>}
   */
  async getStats() {
    /** @type {PostgrestQueryBuilder<definitions['metric']>} */
    const nonCargoMetricQuery = this.client.from('metric')
    const metricsQuery = this.cargoClient.from('metrics')
    const metricsLogQuery = this.cargoClient.from('metrics_log')

    const primaryMetricQuery = nonCargoMetricQuery
      .select('name, value')
      .in('name', [
        'uploads_past_7_total',
        'uploads_blob_total',
        'uploads_car_total',
        'uploads_nft_total',
        'uploads_remote_total',
        'uploads_multipart_total',
      ])

    const dagByteSizeQuery = metricsQuery
      .select('name, dimensions, value')
      .eq('name', 'dagcargo_project_bytes_in_active_deals')
      .contains('dimensions', ['project', 'nft.storage'])
      .single()

    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)

    const dagByteSizeHistory = metricsLogQuery
      .select('name, dimensions, value')
      .match({
        name: 'dagcargo_project_bytes_in_active_deals',
        dimensions: '{{project,nft.storage}}',
      })
      .lte('collected_at', weekAgo.toISOString())
      .order('collected_at', { ascending: false })
      .range(0, 0)
      .single()

    const [primaryRes, dagSizeRes, dagSizeHistRes] = await Promise.all([
      primaryMetricQuery,
      dagByteSizeQuery,
      dagByteSizeHistory,
    ])

    if (primaryRes.error || dagSizeHistRes.error || dagSizeRes.error) {
      // this allows us to avoid changing the construtor of db error to allow null
      const err = Object.assign(
        {},
        primaryRes.error || dagSizeHistRes.error || dagSizeRes.error
      )
      throw new DBError(err)
    }

    /** @type {import('./db-client-types').StatsPayload}  */
    const stats = {}

    // Simple splatting of the metrics from first query
    if (primaryRes.data && primaryRes.data.length) {
      for (const metric of primaryRes.data) {
        stats[metric.name] = metric.value
      }
    }

    stats.deals_size_total = dagSizeRes.data.value
    stats.deals_size_total_prev = dagSizeHistRes.data.value

    return stats
  }
}

export class DBError extends Error {
  /**
   * @param {{
   *   message: string
   *   details: string
   *   hint: string
   *   code: string
   * }} cause
   */
  constructor({ message, details, hint, code }) {
    super(`${message}, details: ${details}, hint: ${hint}, code: ${code}`)
    this.name = 'DBError'
    this.code = DBError.CODE
  }
}
DBError.CODE = 'ERROR_DB'
