import AWS from 'aws-sdk'
const cloudwatch = new AWS.CloudWatch()

import { buildMetricQuery, MetricMethod, MetricNamespace } from './common'

/**
 * Gets the queue metrics from cloudwatch.
 * @async
 * @returns {Promise<object>} A promise with the metrics object.
 */
export async function getCloudWatchQueueMetrics() {
  var start = new Date()
  start.setMinutes(start.getMinutes() - 60)
  const namespace = MetricNamespace.SQS

  var params = {
    EndTime: new Date().toISOString(),
    MetricDataQueries: [
      buildMetricQuery(
        namespace,
        'ApproximateAgeOfOldestMessage',
        MetricMethod.Average
      ),
      buildMetricQuery(
        namespace,
        'ApproximateNumberOfMessagesDelayed',
        MetricMethod.Maximum
      ),
      buildMetricQuery(
        namespace,
        'ApproximateNumberOfMessagesNotVisible',
        MetricMethod.Maximum
      ),
      buildMetricQuery(
        namespace,
        'ApproximateNumberOfMessagesVisible',
        MetricMethod.Maximum
      ),
      buildMetricQuery(
        namespace,
        'NumberOfEmptyReceives',
        MetricMethod.Maximum
      ),
      buildMetricQuery(namespace, 'NumberOfMessagesDeleted', MetricMethod.Sum),
      buildMetricQuery(namespace, 'NumberOfMessagesReceived', MetricMethod.Sum),
      buildMetricQuery(namespace, 'NumberOfMessagesSent', MetricMethod.Maximum),
      buildMetricQuery(namespace, 'SentMessageSize', MetricMethod.Average),
    ],
    StartTime: start.toISOString(),
  }
  return cloudwatch.getMetricData(params).promise()
}
