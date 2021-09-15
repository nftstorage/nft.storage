/**
 * @param {any} data
 */
async function run(data) {
  const { query, params } = data

  return {
    statusCode: 200,
    headers: {},
    body: {
      cid: {
        '/': params.cid,
      },
      name: 'test-file11',
      peer_map: {
        '12D3KooWDP7PVv5dvDiqKujjhcL67EPP83HpS2A24bNqpg7CaA1r': {
          error: '',
          peername: 'nft-storage-sv15',
          status: 'pin_queued',
          timestamp: '2021-09-15T10:15:48.23666686Z',
        },
        '12D3KooWKtbWcMwmW71PUkqYePRDFJf7rbARe6mnsCHXNHLU4TD2': {
          error: '',
          peername: 'nft-storage-dc13',
          status: 'pin_queued',
          timestamp: '2021-09-15T10:15:47.962478319Z',
        },
        '12D3KooWQY4tjLFydiy2YkK88GgBu2suTmdy6pdNMydRRDN8k34H': {
          error: '',
          peername: 'nft-storage-am6',
          status: 'pin_queued',
          timestamp: '2021-09-15T10:15:48.209286356Z',
        },
      },
    },
  }
}

module.exports = run
