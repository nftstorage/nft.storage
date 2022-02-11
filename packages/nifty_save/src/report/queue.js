import AWS from 'aws-sdk'
const cloudwatch = new AWS.CloudWatch()

import { buildMetricQuery } from './common'

/**
 * Gets the queue metrics from cloudwatch.
 * @async
 * @returns {Promise<object>} A promise with the metrics object.
 */
export async function getCloudWatchQueueMetrics() {
  var start = new Date()
  start.setMinutes(start.getMinutes() - 60)
  const namespace = 'AWS/SQS'

  var params = {
    EndTime: new Date().toISOString(),
    MetricDataQueries: [
      buildMetricQuery(namespace, 'ApproximateAgeOfOldestMessage', 'Average'),
      buildMetricQuery(
        namespace,
        'ApproximateNumberOfMessagesDelayed',
        'Maximum'
      ),
      buildMetricQuery(
        namespace,
        'ApproximateNumberOfMessagesNotVisible',
        'Maximum'
      ),
      buildMetricQuery(
        namespace,
        'ApproximateNumberOfMessagesVisible',
        'Maximum'
      ),
      buildMetricQuery(namespace, 'NumberOfEmptyReceives', 'Maximum'),
      buildMetricQuery(namespace, 'NumberOfMessagesDeleted', 'Maximum'),
      buildMetricQuery(namespace, 'NumberOfMessagesReceived', 'Maximum'),
      buildMetricQuery(namespace, 'NumberOfMessagesSent', 'Maximum'),
      buildMetricQuery(namespace, 'SentMessageSize', 'Average'),
    ],
    StartTime: start.toISOString(),
  }
  return cloudwatch.getMetricData(params).promise()
}
