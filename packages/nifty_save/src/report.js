import { getCloudWatchDynamoDbMetrics } from './report/database'
import { getCloudWatchLambdaMetrics } from './report/lambda'
import { getCloudWatchQueueMetrics } from './report/queue'

/**
 * Returns a JSON object with "health" metrics about the service.
 */
export async function health() {
  const data = [
    {
      type: 'Queue',
      metrics: await getCloudWatchQueueMetrics(),
    },
    {
      type: 'Table',
      metrics: await getCloudWatchDynamoDbMetrics(),
    },
    {
      type: 'Lambda',
      metrics: await getCloudWatchLambdaMetrics(),
    },
  ]

  return {
    statusCode: 200,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ message: 'Health Report', data }),
  }
}
