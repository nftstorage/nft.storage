import AWS from 'aws-sdk'
import { buildMetricQuery, MetricMethod, MetricNamespace } from './common'
const cloudwatch = new AWS.CloudWatch()
const dynamoDb = new AWS.DynamoDB()

/**
 * Returns a promise containing cloud watch dynamo db metrics.
 *
 * @async
 * @returns {Promise<object>} The promise with metrics.
 */
export async function getCloudWatchDynamoDbMetrics() {
  const namespace = MetricNamespace.DynamoDB
  var start = new Date()
  start.setMinutes(start.getMinutes() - 60)

  var params = {
    EndTime: new Date().toISOString(),
    MetricDataQueries: [
      buildMetricQuery(
        namespace,
        'SuccessfulRequestLatency',
        MetricMethod.Average
      ),
      //       buildMetricQuery(namespace, 'ThrottledRequests', MetricMethod.Sum),
      //       buildMetricQuery(namespace, 'UserErrors', MetricMethod.Sum),
      //       buildMetricQuery(namespace, 'ConsumedReadCapacityUnits', MetricMethod.Sum),
      //       buildMetricQuery(namespace, 'ProvisionedReadCapacityUnits', MetricMethod.Sum),
      //       buildMetricQuery(namespace, 'ConsumedWriteCapacityUnits', MetricMethod.Sum),
      //       buildMetricQuery(namespace, 'ProvisionedWriteCapacityUnits', MetricMethod.Sum),
      //       buildMetricQuery(namespace, 'ReturnedBytes', MetricMethod.Average),
      buildMetricQuery(namespace, 'ReturnedItemCount', MetricMethod.Maximum),
    ],
    StartTime: start.toISOString(),
  }
  return cloudwatch.getMetricData(params).promise()
}

export async function getDynamoDbDescription(tablename) {
  const params = {
    TableName: tablename,
  }

  return dynamoDb.describeTable(params).promise()
}
