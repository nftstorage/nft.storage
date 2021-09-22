/**
 * @param {any} data
 */
async function run(data) {
  const { query, params } = data

  return {
    statusCode: 200,
    headers: {},
    body: {
      allocations: [],
      cid: {
        '/': params.cid,
      },
      expire_at: '0001-01-01T00:00:00Z',
      max_depth: -1,
      metadata: null,
      mode: 'recursive',
      name: query.name,
      origins: [],
      pin_update: null,
      reference: null,
      replication_factor_max: -1,
      replication_factor_min: -1,
      shard_size: 0,
      type: 2,
      user_allocations: null,
    },
  }
}

module.exports = run
