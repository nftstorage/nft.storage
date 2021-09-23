import dotenv from 'dotenv'
import yargs from 'yargs'

/**
 * @typedef {{url: URL, headers?: Record<string, string>}} Endpoint
 * @typedef {Object} Config
 * @property {number} budget
 * @property {number} batchSize
 * @property {number} fetchTimeout
 * @property {boolean} dryRun
 * @property {number} retryLimit
 * @property {number} retryInterval
 * @property {number} retryMaxInterval
 * @property {import('./cluster').Config} cluster
 * @property {import('./ipfs').Config} ipfs
 * @property {Endpoint} erc721
 * @property {Endpoint} hasura
 * @property {Endpoint & {secret: string}} fauna
 *
 * @returns {Promise<Config>}
 */
export const configure = async () => {
  dotenv.config()
  const config = await yargs(process.argv.slice(2))
    .option({
      'dry-run': {
        type: 'boolean',
        default: false,
      },
      'batch-size': {
        type: 'number',
        default: parseInt(process.env['BATCH_SIZE'] || '100'),
        description: 'Number of items to process at once',
      },
      'retry-limit': {
        type: 'number',
        default: parseInt(process.env['RETRY_LIMIT'] || '0'),
        description: 'Max number of retries to perform on errors',
      },
      'retry-interval': {
        type: 'number',
        default: parseInt(process.env['RETRY_INTERVAL'] || '500'),
        description: 'Interval to space out retries by',
      },
      'retry-max-interval': {
        type: 'number',
        default: parseInt(process.env['RETRY_MAX_INTERVAL'] || 'Infinity'),
        description: 'Max sleep frame between retries',
      },
      budget: {
        type: 'number',
        default: Number(process.env['TIME_BUDGET'] || 30) * 1000,
      },
      'fetch-timeout': {
        type: 'number',
        default: Number(process.env['FETCH_TIMEOUT'] || 30 * 100),
        description: 'Time given to each request before it is aborted',
      },
      'cluster-endpoint': {
        alias: 'clusterEndpoint',
        type: 'string',
        default:
          process.env['NIFTYSAVE_CLUSTER_ENDPOINT'] ||
          'https://nft2.storage.ipfscluster.io/api/',
      },
      'cluster-key': {
        type: 'string',
        default: process.env['NIFTYSAVE_CLUSTER_KEY'],
        alias: 'clusterKey',
        demandOption: true,
      },
      'ipfs-api-endpoint': {
        alias: 'ipfsAPIEndpoint',
        type: 'string',
        default:
          process.env['NIFTYSAVE_IPFS_API_ENDPOINT'] ||
          'https://nft2.storage.ipfscluster.io/api/v0/',
      },
      'ipfs-api-key': {
        alias: 'ipfsAPIKey',
        type: 'string',
        default: process.env['NIFTYSAVE_IPFS_API_KEY'],
        demandOption: true,
      },
      'fauna-endpoint': {
        alias: 'faunaEndpoint',
        type: 'string',
        default:
          process.env['FAUNA_ENDPOINT'] || 'https://graphql.fauna.com/graphql',
      },
      'fauna-key': {
        alias: 'faunaKey',
        type: 'string',
        default: process.env['FAUNA_KEY'],
        demandOption: true,
      },
      'subgraph-endpoint': {
        type: 'string',
        default:
          process.env['SUBGRAPH_ENDPOINT'] ||
          'https://api.thegraph.com/subgraphs/name/nftstorage/eip721-subgraph',
      },
      'hasura-endpoint': {
        alias: 'hasuraEndpoint',
        type: 'string',
        default:
          process.env['HASURA_ENDPOINT'] ||
          'https://niftysave.hasura.app/v1/graphql',
      },
      'hasura-key': {
        alias: 'hasuraKey',
        type: 'string',
        default: process.env['HASURA_KEY'],
        demandOption: true,
      },
    })
    .parse()

  return {
    batchSize: config['batch-size'],
    budget: config.budget,
    fetchTimeout: config['fetch-timeout'],
    dryRun: config['dry-run'],
    retryLimit: config['retry-limit'],
    retryInterval: config['retry-interval'],
    retryMaxInterval: config['retry-max-interval'],

    cluster: {
      url: new URL(config['cluster-endpoint']),
      secret: config['cluster-key'],
    },

    ipfs: {
      url: new URL(config['ipfs-api-endpoint']),
      secret: config['ipfs-api-key'],
    },

    fauna: {
      url: new URL(config['fauna-endpoint']),
      secret: config['fauna-key'],
      headers: {
        authorization: `Bearer ${config['fauna-key']}`,
      },
    },

    erc721: {
      url: new URL(config['subgraph-endpoint']),
    },

    hasura: {
      url: new URL(config['hasura-endpoint']),
      headers: {
        'x-hasura-admin-secret': config['hasura-key'],
      },
    },
  }
}
