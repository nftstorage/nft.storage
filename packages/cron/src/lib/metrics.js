// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
import { Histogram, Registry } from 'prom-client'

/**
 * @exports
 * @typedef {Histogram<"byteLength">} RetrievalDurationSecondsMetric
 */

/**
 * @param {Registry} registry
 * @returns {RetrievalDurationSecondsMetric}
 */
export function createRetrievalDurationSecondsMetric(registry) {
  /** @type RetrievalDurationSecondsMetric} */
  const metric = new Histogram({
    name: 'retrieval_duration_seconds',
    help: 'How long, in seconds, it took to retrieve an nft image after uploading',
    registers: [registry],
    labelNames: ['byteLength'],
  })
  return metric
}
