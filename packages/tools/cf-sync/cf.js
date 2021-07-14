const { URL } = require('url')
const path = require('path')
const got = require('got').default

require('dotenv').config({
  path: path.join(__dirname, '../.env.local'),
})
const endpoint = new URL('https://api.cloudflare.com/client/v4/')
const CF_ACCOUNT_ID = process.env.CF_ACCOUNT_ID
const CF_TOKEN = process.env.CF_TOKEN

/**
 * @param {string} kv
 */
function paginate(kv) {
  return got.paginate(
    new URL(
      `accounts/${CF_ACCOUNT_ID}/storage/kv/namespaces/${kv}/keys`,
      endpoint
    ),
    {
      headers: { Authorization: `bearer ${CF_TOKEN}` },
      pagination: {
        transform: (rsp) => {
          // @ts-ignore
          const data = JSON.parse(rsp.body)
          return data.result
        },
        paginate: (rsp) => {
          // @ts-ignore
          const { count, cursor } = JSON.parse(rsp.body).result_info
          if (!cursor) {
            return false
          }

          return {
            searchParams: {
              cursor,
            },
          }
        },
      },
    }
  )
}

/**
 * @param {any} kv
 * @param {any} key
 */
async function get(kv, key) {
  return await got
    .get(
      new URL(
        `accounts/${CF_ACCOUNT_ID}/storage/kv/namespaces/${kv}/values/${key}`,
        endpoint
      ),
      {
        headers: { Authorization: `bearer ${CF_TOKEN}` },
      }
    )
    .json()
}

module.exports = {
  paginate,
  get,
}
