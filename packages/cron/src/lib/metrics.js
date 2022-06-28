// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { Histogram, Registry, linearBuckets, Pushgateway } from 'prom-client'
import { Milliseconds } from './time.js'

/**
 * @typedef {string} RetrievalDurationMetricLabels
 */

/**
 * @template MetricValue
 * @typedef Metric
 * @property {string} name
 * @property {(value: MetricValue, labels: Record<string, string|number>) => void} observe
 */

/**
 * @exports
 * @typedef {Metric<Milliseconds>} RetrievalDurationMetric
 * @property {string} name
 * @property {(value: import('./time').Milliseconds, labels: Record<RetrievalDurationMetricLabels, string|number>) => void} observe
 */

/**
 * @param {Registry} registry
 * @returns {RetrievalDurationMetric}
 */
export function createRetrievalDurationMetric(registry) {
  const name = 'retrieval_duration_seconds'
  const histogram = new Histogram({
    name,
    help: 'How long, in seconds, it took to retrieve an nft image after uploading',
    registers: [registry],
    labelNames: [],
    buckets: linearBuckets(0, 0.5, 20),
  })
  return {
    name,
    observe(value, labels) {
      histogram.observe(labels, Milliseconds.toSeconds(value))
    },
  }
}

/**
 * @exports
 * @typedef {Metric<Milliseconds>} StoreDurationMetric
 */

/**
 * @param {Registry} registry
 * @returns {StoreDurationMetric}
 */
export function createStoreDurationMetric(registry) {
  const name = 'storage_duration_seconds'
  const histogram = new Histogram({
    name,
    help: 'How long, in seconds, it took to store a file',
    registers: [registry],
    labelNames: [],
    buckets: linearBuckets(0, 0.5, 20),
  })
  return {
    name,
    observe(value, labels) {
      histogram.observe(labels, Milliseconds.toSeconds(value))
    },
  }
}

/**
 * @param {URL} pushGatewayUrl
 * @param {string} authorization
 * @param {import('prom-client').Registry} registry
 */
export function createPushgateway(pushGatewayUrl, authorization, registry) {
  const pushgateway = new Pushgateway(
    pushGatewayUrl.toString(),
    {
      headers: {
        authorization,
      },
    },
    registry
  )
  return pushgateway
}

/**
 * Create a function that will push metric observations to a prometheus pushgateway
 * @template MetricValue
 * @param {import('prom-client').Pushgateway} pushgateway
 * @param {Metric<MetricValue>} metric
 * @param {string} jobName
 * @param {Record<string,string>} metricLabels
 * @param {Console} console
 * @returns {(value: MetricValue) => Promise<void>}
 */
export function createPushgatewayMetricLogger(
  pushgateway,
  metric,
  jobName,
  metricLabels,
  console
) {
  return async (value) => {
    metric.observe(value, {})
    const pushAddOptions = {
      jobName,
      groupings: metricLabels,
    }
    const pushAddResult = await pushgateway.pushAdd(pushAddOptions)
    const pushAddResponse = /** @type {import('http').IncomingMessage} */ (
      pushAddResult.resp
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const pushAddRequest = /** @type {import('http').ClientRequest} */ (
      /** @type {any} */ (pushAddResponse).req
    )
    console.debug({
      type: 'metricPushed',
      metric: {
        name: metric.name,
      },
      observation: {
        value,
      },
      pushgateway: pushAddOptions,
      request: {
        url: new URL(
          `${pushAddRequest.protocol}//${String(
            pushAddRequest.getHeader('host')
          )}${pushAddRequest.path}`
        ).toString(),
      },
      response: {
        status: pushAddResponse.statusCode,
      },
    })
  }
}
