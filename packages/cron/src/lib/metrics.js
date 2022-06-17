// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { Histogram, Registry } from 'prom-client'
import { Milliseconds } from './time.js'

/**
 * @typedef {"byteLength"} RetrievalDurationMetricLabels
 */

/**
 * @exports
 * @typedef RetrievalDurationMetric
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
    labelNames: ['byteLength'],
  })
  return {
    name,
    observe(value, labels) {
      histogram.observe(labels, Milliseconds.toSeconds(value))
    },
  }
}
