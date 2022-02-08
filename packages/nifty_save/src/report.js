import AWS from 'aws-sdk'
const cloudwatch = new AWS.CloudWatch()
const bus = new AWS.EventBridge()
const sqs = new AWS.SQS()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

let fetchedRecordCount = null
async function getFetchedRecordCount() {
  if (fetchedRecordCount == null) {
    const result = await dynamoDb
      .scan({
        TableName: process.env.fetchedRecordsTableName,
        ProjectionExpression: 'id',
      })
      .promise()

    return (fetchedRecordCount = result.Items.length)
  }
  return fetchedRecordCount
}

function getMetric(name, method = 'Sum') {
  return {
    Id: 'report_health_' + name.toLowerCase(),
    Label: name,
    MetricStat: {
      Metric: {
        MetricName: name,
        Namespace: 'AWS/Lambda',
      },
      Period: 120,
      Stat: method,
    },
    ReturnData: true,
  }
}

async function getCloudWatchLambdaMetrics() {
  var start = new Date()
  start.setMinutes(0)

  var params = {
    EndTime: new Date().toISOString() /* required */,
    MetricDataQueries: [
      getMetric('Invocations'),
      getMetric('Errors'),
      getMetric('Throttles'),
      getMetric('Duration', 'Average'),
    ],
    StartTime: start.toISOString(),
  }
  var metrics = cloudwatch.getMetricData(params).promise()

  return metrics
}

export async function health() {
  var queueAttrs = [
    'ApproximateNumberOfMessagesDelayed',
    'ApproximateNumberOfMessagesNotVisible',
    'ApproximateNumberOfMessages',
  ]
  var sliceCommandQueue = await sqs
    .getQueueAttributes({
      QueueUrl: process.env.sliceCommandQueueUrl,
      AttributeNames: queueAttrs,
    })
    .promise()
  var fetchedRecordQueue = await sqs
    .getQueueAttributes({
      QueueUrl: process.env.fetchedRecordQueueUrl,
      AttributeNames: queueAttrs,
    })
    .promise()

  // TODO Get more info / describe archive instead?
  //   var busData = await bus.describeEventBus({Name: process.env.busArn}).promise();

  //   console.log(busData);

  const metrics = await getCloudWatchLambdaMetrics()
  //   console.log("wee", JSON.stringify(metrics.MetricDataResults, null, 2));

  const data = [
    {
      name: 'FetchedRecordsTable',
      info: {
        count: await getFetchedRecordCount(),
      },
    },
    {
      name: 'sliceCommandQueue',
      info: sliceCommandQueue.Attributes,
    },
    {
      name: 'fetchedRecordQueue',
      info: fetchedRecordQueue.Attributes,
    },
    {
      name: 'lambdaMetrics',
      metrics,
    },
  ]

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Ingest is healthy', data }),
  }
}
