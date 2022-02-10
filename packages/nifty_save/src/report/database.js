import AWS from 'aws-sdk'
import { buildMetricQuery } from './common'
const cloudwatch = new AWS.CloudWatch()

/**
 * Returns a promise containing cloud watch dynamo db metrics.
 *
 * @async
 * @returns {Promise<object>} The promise with metrics.
 */
export async function getCloudWatchDynamoDbMetrics() {
  const namespace = 'AWS/DynamoDB'
  var start = new Date()
  start.setMinutes(start.getMinutes() - 60)

  var params = {
    EndTime: new Date().toISOString(),
    MetricDataQueries: [
      buildMetricQuery(namespace, 'SuccessfulRequestLatency', 'Average'),
      buildMetricQuery(namespace, 'ThrottledRequests', 'Sum'),
      buildMetricQuery(namespace, 'UserErrors', 'Sum'),
      buildMetricQuery(namespace, 'ConsumedReadCapacityUnits', 'Sum'),
      buildMetricQuery(namespace, 'ProvisionedReadCapacityUnits', 'Average'),
      buildMetricQuery(namespace, 'ConsumedWriteCapacityUnits', 'Sum'),
      buildMetricQuery(namespace, 'ProvisionedWriteCapacityUnits', 'Average'),
      buildMetricQuery(namespace, 'ReturnedBytes', 'Average'),
      buildMetricQuery(namespace, 'ReturnedItemCount', 'Average'),
    ],
    StartTime: start.toISOString(),
  }
  return cloudwatch.getMetricData(params).promise()
}
