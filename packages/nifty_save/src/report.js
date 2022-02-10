import AWS from 'aws-sdk'

import { getCloudWatchLambdaMetrics } from './report/lambda'
import { getCloudWatchQueueMetrics } from './report/queue'
import { getCloudWatchDynamoDbMetrics } from './report/database'

/**
 * Returns a JSON object with "health" metrics about the service.
 */
export async function health() {
  const data = [
    {
      name: 'queueMetrics',
      metrics: await getCloudWatchQueueMetrics(),
    },
    {
      name: 'dynamoDbMetrics',
      metrics: await getCloudWatchDynamoDbMetrics(),
    },
    {
      name: 'lambdaMetrics',
      metrics: await getCloudWatchLambdaMetrics(),
    },
  ]

  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ message: 'Health Report', data }),
  }
}
