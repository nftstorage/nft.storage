import { get } from '../models/metrics.js'

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
  /** @type {(k: string) => Promise<number>} */
  const getOr0 = async (k) => (await get(k)) || 0
  return [
    '# HELP nftstorage_users_total Total users registered.',
    '# TYPE nftstorage_users_total counter',
    `nftstorage_users_total ${await getOr0('users:total')}`,

    '# HELP nftstorage_nfts_total Total number of NFTs stored.',
    '# TYPE nftstorage_nfts_total counter',
    `nftstorage_nfts_total ${await getOr0('nfts:total')}`,

    '# HELP nftstorage_nfts_bytes_total Total bytes of all NFTs.',
    '# TYPE nftstorage_nftstorage_nfts_bytes_total counter',
    `nftstorage_nfts_bytes_total ${await getOr0('nfts:totalBytes')}`,

    '# HELP nftstorage_nfts_storage_ipfs_total Total number of NFTs pinned on IPFS.',
    '# TYPE nftstorage_nfts_storage_ipfs_total counter',
    `nftstorage_nfts_storage_ipfs_total ${await getOr0('nfts:pins:total')}`,

    '# HELP nftstorage_nfts_storage_filecoin_total Total number of NFTs stored on Filecoin in active deals.',
    '# TYPE nftstorage_nfts_storage_filecoin_total counter',
    `nftstorage_nfts_storage_filecoin_total ${await getOr0(
      'nfts:deals:active:total'
    )}`,

    '# HELP nftstorage_nfts_storage_filecoin_queued_total Total number of NFTs queued for the next deal batch.',
    '# TYPE nftstorage_nfts_storage_filecoin_queued_total counter',
    `nftstorage_nfts_storage_filecoin_queued_total ${await getOr0(
      'nfts:deals:queued:total'
    )}`,

    '# HELP nftstorage_pins_total Total number of pins on IPFS.',
    '# TYPE nftstorage_pins_total counter',
    `nftstorage_pins_total ${await getOr0('pins:total')}`,

    '# HELP nftstorage_pins_bytes_total Total size of pinned items on IPFS.',
    '# TYPE nftstorage_pins_bytes_total counter',
    `nftstorage_pins_bytes_total ${await getOr0('pins:totalBytes')}`,

    '# HELP nftstorage_pins_status_queued_total Total number of pins that are queued.',
    '# TYPE nftstorage_pins_status_queued_total counter',
    `nftstorage_pins_status_queued_total ${await getOr0(
      'pins:status:queued:total'
    )}`,

    '# HELP nftstorage_pins_status_pinning_total Total number of pins that are pinning.',
    '# TYPE nftstorage_pins_status_pinning_total counter',
    `nftstorage_pins_status_pinning_total ${await getOr0(
      'pins:status:pinning:total'
    )}`,

    '# HELP nftstorage_pins_status_pinned_total Total number of pins that are pinned.',
    '# TYPE nftstorage_pins_status_pinned_total counter',
    `nftstorage_pins_status_pinned_total ${await getOr0(
      'pins:status:pinned:total'
    )}`,

    '# HELP nftstorage_pins_status_failed_total Total number of pins that are failed.',
    '# TYPE nftstorage_pins_status_failed_total counter',
    `nftstorage_pins_status_failed_total ${await getOr0(
      'pins:status:failed:total'
    )}`,
  ].join('\n')
}
