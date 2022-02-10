import AWS from 'aws-sdk'
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const bus = new AWS.EventBridge()
const sqs = new AWS.SQS()

/**
 * Put a processed record back on the bus
 *
 * @async
 * @param {string} step - The current step.
 * @param {object} data - The data/record to put on the bus.
 * @returns {Promise<object>} The promise from the bus putting the events on.
 */
async function putOnBus(step, data) {
  const entries = [
    {
      DetailType: step,
      Detail: JSON.stringify(data),
      Source: `temp_steps.${step}`,
      EventBusName: process.env.busArn,
    },
  ]

  await bus.putEvents({ Entries: entries }).promise()
}

async function getFailuresFromProcessedTable() {}

async function putFailuresOnEventBus(data) {
  var batch = []
  for (var i = 0; i < data.length; i++) {
    const failed_entity = data[i].steps[data[i].steps.length - 1]
    putOnBus('failed_step', failed_entity)
  }
}

// TODO: Setup cron to put failures on event bus.
export async function get_failures_from_processed() {
  const failures = await getFailuresFromProcessedTable()

  await putFailuresOnEventBus(failures)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'put failures on event bus.',
    }),
  }
}
