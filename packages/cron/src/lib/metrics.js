import { Histogram as PMHistogram } from 'prom-client'
/**
 * @template Keys
 * @typedef {import("prom-client").Histogram<Keys>} Histogram
 */

/**
 * @exports
 * @typedef {Histogram<"byteLength">} RetrievalDurationSecondsMetric
 */

export default {}

/**
 * @template K
 * @typedef Sendable
 * @property {() => Promise<void>} send
 */

const timeToRetrievabilityName = /** @const */ 'timeToRetrievability'

export const timeToRetrievability = {
  name: /** @type {"timeToRetrievability"} */ (timeToRetrievabilityName),
  metric: new PMHistogram({
    name: 'retrieval_duration_seconds',
    help: 'How long, in seconds, it took to retrieve an nft image after uploading',
    labelNames: ['byteLength'],
  }),
}
