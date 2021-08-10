import got from 'got'

/** @type {import('got').PaginationOptions<any, unknown>["pagination"]} */
const pagination = {
  transform: (rsp) => {
    // @ts-ignore
    const data = JSON.parse(rsp.body)
    return data.result
  },
  paginate: (rsp) => {
    const previousSearchParams = rsp.request.options.searchParams
    // @ts-ignore
    const page = Number(previousSearchParams.get('page'))
    // @ts-ignore
    const perPage = Number(previousSearchParams.get('per_page'))
    // @ts-ignore
    const { count } = JSON.parse(rsp.body).result_info
    if (count < perPage) {
      return false
    }

    return {
      searchParams: {
        page: page + 1,
      },
    }
  },
}

/** @type {import('got').PaginationOptions<any, unknown>["pagination"]} */
const paginationKV = {
  transform: (rsp) => {
    // @ts-ignore
    const data = JSON.parse(rsp.body)
    return data.result
  },
  paginate: (rsp) => {
    // @ts-ignore
    const { cursor } = JSON.parse(rsp.body).result_info
    if (!cursor) {
      return false
    }

    return {
      searchParams: {
        cursor,
      },
    }
  },
}

class Cloudflare {
  /**
   *
   * @param {import('./types').CloudflareOptions} param0
   */
  constructor({ email, key, token }) {
    let headers
    if (token) {
      headers = { Authorization: `bearer ${token}` }
    } else {
      headers = {
        'X-Auth-Email': email,
        'X-Auth-Key': key,
      }
    }
    this.client = got.extend({
      prefixUrl: 'https://api.cloudflare.com/client/v4/',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })
  }

  /**
   * @param {string} zone
   * @param {Partial<import('./types').ListDNSOptions>} params
   */
  listDns(zone, params) {
    return this.client
      .get(`zones/${zone}/dns_records`, { searchParams: params })
      .json()
  }

  /**
   * @param {string} zone
   * @param {Partial<import('./types').ListDNSOptions>} params
   */
  async findDns(zone, params) {
    const rsp = await this.client
      .get(`zones/${zone}/dns_records`, { searchParams: params })
      .json()

    if (rsp.success && rsp.result && rsp.result[0]) {
      return rsp.result[0]
    }
  }

  /**
   *
   * @param {string} zone
   * @param {string} record
   * @param {import('./types').UpdateDNSOptions} params
   * @returns
   */
  updateDns(zone, record, params) {
    return this.client
      .put(`zones/${zone}/dns_records/${record}`, { json: params })
      .json()
  }

  /**
   *
   * @param {string} zone
   * @param {import('./types').CreateDNSOptions} params
   * @returns
   */
  createDns(zone, params) {
    return this.client
      .post(`zones/${zone}/dns_records`, { json: params })
      .json()
  }

  /**
   *
   * @param {string} zone
   * @param {import('./types').CreateDNSOptions} params
   * @returns
   */
  async upsertDns(zone, params) {
    const record = await this.findDns(zone, {
      name: params.name,
      type: params.type,
    })

    if (record) {
      return await this.updateDns(zone, record.id, params)
    } else {
      return await this.createDns(zone, params)
    }
  }

  /**
   * Deployments
   *
   * @param {import('./types').DeploymentsOptions} param0
   * @returns
   */
  async deployments({ accountId, projectName }) {
    return this.client
      .get(`accounts/${accountId}/pages/projects/${projectName}/deployments`)
      .json()
  }

  /**
   * Paginated Deployments
   *
   * @param {import('./types').DeploymentsWithPaginationsOptions} opts
   * @returns
   */
  deploymentsPaginate(opts) {
    const paginationParams = {
      page: 1,
      per_page: 100,
      ...opts.pagination,
    }
    return this.client.paginate(
      `accounts/${opts.accountId}/pages/projects/${opts.projectName}/deployments`,
      { pagination, searchParams: paginationParams }
    )
  }

  /**
   * Paginate KVs
   * @param {{accountId: string, kvId: string}} param0
   * @returns
   */
  kvPaginate({ accountId, kvId }) {
    return this.client.paginate(
      `accounts/${accountId}/storage/kv/namespaces/${kvId}/keys`,
      { pagination: paginationKV }
    )
  }

  /**
   * Get KV value
   * @param {{accountId: string, kvId: string, key: string}} param0
   * @returns
   */
  kvValue({ accountId, kvId, key }) {
    return this.client
      .get(`accounts/${accountId}/storage/kv/namespaces/${kvId}/values/${key}`)
      .json()
  }
}

export default Cloudflare
