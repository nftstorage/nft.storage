import AWS from 'aws-sdk'
const cloudwatch = new AWS.CloudWatch()
import { buildMetricQuery } from './common'

/**
 * Returns a promise containing cloud watch lambda metrics.
 *
 * @async
 * @returns {Promise<object>} The promise with metrics.
 */
export async function getCloudWatchLambdaMetrics() {
  const namespace = 'AWS/Lambda'
  var start = new Date()
  start.setMinutes(start.getMinutes() - 60)

  var params = {
    EndTime: new Date().toISOString(),
    MetricDataQueries: [
      buildMetricQuery(namespace, 'Invocations'),
      buildMetricQuery(namespace, 'Errors'),
      buildMetricQuery(namespace, 'DeadLetterErrors'),
      buildMetricQuery(namespace, 'DestinationDeliveryFailures'),
      buildMetricQuery(namespace, 'ProvisionedConcurrencyInvocations'),
      buildMetricQuery(namespace, 'Throttles'),
      buildMetricQuery(namespace, 'Duration', 'Average'),
      // Execution status.
      buildMetricQuery(namespace, 'ConcurrentExecutions', 'Maximum'),
      buildMetricQuery(namespace, 'ProvisionedConcurrentExecutions', 'Maximum'),
    ],
    StartTime: start.toISOString(),
  }
  return cloudwatch.getMetricData(params).promise()
}

// USE THIS INSTEAD OF EXPRESSION?
//     MetricStat: {
//       Metric: {
//         Dimensions: [{
//           Name: 'FunctionName', [> required <]
//           Value: 'ns-simian-dev-nifty-save-debug-stack-Resource-MqPahL0IzKWg' [> required <]
//         },
//         {
//           Name: 'FunctionName', [> required <]
//           Value: 'arn-aws-iam-580699901748-root-nifty-save--Resource-P2HthWApKl7B' [> required <]
//         }
//         ],
//         MetricName: name,
//         Namespace: 'AWS/Lambda',
//       },
//       Period: 120,
//       Stat: method,
//     },
