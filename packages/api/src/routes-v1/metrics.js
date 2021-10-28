import { secrets, database } from '../constants.js'
import { DBClient } from '../utils/db-client.js'

const db = new DBClient(database.url, secrets.database)

export async function getUserMetrics() {
  const query = db.client.from('user')
  const res = await query
    .select('*', { head: true, count: 'exact' })
    .range(0, 1)
  if (res.error) {
    throw res.error
  }
  return { total: res.count }
}

export async function getNftMetrics() {
  const types = ['Car', 'Blob', 'Multipart', 'Remote', 'Nft']
  const totals = await Promise.all(
    types.map(async (t) => {
      const query = db.client.from('upload')
      const res = await query
        .select('*', { head: true, count: 'exact' })
        .filter('type', 'eq', t)
        .range(0, 1)
      if (res.error) {
        throw res.error
      }
      return { [t]: res.count }
    })
  )
  return { totals: Object.assign({}, ...totals) }
}

export async function getPinMetrics() {
  const services = ['Pinata', 'IpfsCluster', 'IpfsCluster2']
  const statuses = ['PinQueued', 'Pinning', 'Pinned', 'PinError']
  const totals = await Promise.all(
    services.map(async (service) => {
      const totals = await Promise.all(
        statuses.map(async (status) => {
          const query = db.client.from('pin')
          const res = await query
            .select('*', { head: true, count: 'exact' })
            .filter('service', 'eq', service)
            .filter('status', 'eq', status)
            .range(0, 1)
          if (res.error) {
            throw res.error
          }
          return { [status]: res.count }
        })
      )
      return { [service]: Object.assign({}, ...totals) }
    })
  )
  return { totals: Object.assign({}, ...totals) }
}

/**
 * TODO: basic auth
 */
export async function metrics() {
  return new Response(await exportPromMetrics())
}

/**
 * Exports metrics in prometheus exposition format.
 * https://prometheus.io/docs/instrumenting/exposition_formats/
 * @returns {Promise<string>}
 */
async function exportPromMetrics() {
  const [users, nfts, pins] = await Promise.all([
    getUserMetrics(),
    getNftMetrics(),
    getPinMetrics(),
  ])

  return [
    '# HELP nftstorage_users_total Total users registered.',
    '# TYPE nftstorage_users_total counter',
    `nftstorage_users_total ${users.total}`,

    '# HELP nftstorage_uploads_total Total number of uploads by type.',
    '# TYPE nftstorage_uploads_total counter',
    ...Object.entries(nfts.totals).map(
      ([type, total]) => `nftstorage_uploads_total{type="${type}"} ${total}`
    ),

    '# HELP nftstorage_pins_total Total number of pins by service and status.',
    '# TYPE nftstorage_pins_total counter',
    ...Object.entries(pins.totals).map(([service, totals]) => {
      return Object.entries(totals)
        .map(
          ([status, total]) =>
            `nftstorage_pins_total{service="${service}",status="${status}"} ${total}`
        )
        .join('\n')
    }),
  ].join('\n')
}
