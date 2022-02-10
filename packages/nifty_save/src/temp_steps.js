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

export async function test() {
  const data = []

  for (var i = 0; i < 20; i++) {
    data.push({
      DetailType: 'test',
      Detail: JSON.stringify({
        id: 'test_' + Math.round(Math.random() * 1000),
        token_id: 'test',
      }),
      Source: `temp_steps.test`,
      EventBusName: process.env.busArn,
    })
    if (data.length == 5) {
      await bus.putEvents({ Entries: data }).promise()
      data.length = 0
      await new Promise((r) => setTimeout(r, 1000))
    }
  }

  if (data.length > 0) {
    await new Promise((r) => setTimeout(r, 1000))
    await bus.putEvents({ Entries: data }).promise()
  }

  //   const entries = [
  //     {
  //       DetailType: 'test',
  //       Detail: JSON.stringify(data),
  //       Source: `temp_steps.test`,
  //       EventBusName: process.env.busArn,
  //     },
  //   ]
  //   bus.putEvents({ Entries: data }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: TEST START STEPS',
    }),
  }
}

export async function analyze(event) {
  const data = event.detail
  putOnBus('analyze', data)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Analyze' + data,
    }),
  }
}

export async function getMetaData(event) {
  const msg = event.detail
  putOnBus('getMetaData', msg)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Get MetaData' + msg,
    }),
  }
}

export async function pinMetaData(event) {
  const msg = event.detail
  putOnBus('pinMetaData', msg)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: pinMetaData' + msg,
    }),
  }
}

export async function getContent(event) {
  const msg = event.detail
  putOnBus('getContent', msg)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: getContent' + msg,
    }),
  }
}

export async function pinContent(event) {
  const msg = event.detail

  await sqs
    .sendMessage({
      QueueUrl: process.env.dataWarehouseQueue,
      MessageBody: JSON.stringify(msg),
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: pinContent' + msg,
    }),
  }
}

export async function storeProcessedRecord(event) {
  const msg = event.Records.map((x) => JSON.parse(x.body))[0]

  const result = await dynamoDb
    .put({
      TableName: process.env.postProcesserTableName,
      Item: {
        id: msg.id,
        token_id: msg.token_id,
      },
    })
    .promise()

  return {
    statusCode: 200,
    message: `analyze: Stored ${msg}`,
  }
}
