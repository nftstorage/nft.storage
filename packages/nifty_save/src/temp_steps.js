import AWS from 'aws-sdk'
const dynamoDb = new AWS.DynamoDB.DocumentClient()
const bus = new AWS.EventBridge()
const sqs = new AWS.SQS()

export async function test() {
  //   const actualMessages = event.Records.map(x => JSON.parse(x.body))
  //
  //   const msg = `count ${event.Records.length} index ${actualMessages[0].index}`
  //
  //   const entries = actualMessages.map(messageToEntry)
  await bus
    .putEvents({
      Entries: [
        {
          DetailType: 'temp_steps test',
          Detail: JSON.stringify({ id: 'test', token_id: 'test' }),
          Source: 'temp_steps.test',
          EventBusName: process.env.busArn,
        },
      ],
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: TEST START STEPS',
    }),
  }
}

export async function analyze(event) {
  const msg = event.detail

  const entries = [
    {
      DetailType: 'Analyze',
      Detail: JSON.stringify(msg),
      Source: 'temp_steps.analyze',
      EventBusName: process.env.busArn,
    },
  ]

  await bus.putEvents({ Entries: entries }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Analyze' + msg,
    }),
  }
}

export async function getMetaData(event) {
  const msg = event.detail

  const entries = [
    {
      DetailType: 'getMetaData',
      Detail: JSON.stringify(msg),
      Source: 'temp_steps.getMetaData',
      EventBusName: process.env.busArn,
    },
  ]

  await bus.putEvents({ Entries: entries }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Get MetaData' + msg,
    }),
  }
}

export async function pinMetaData(event) {
  const msg = event.detail

  const entries = [
    {
      DetailType: 'pinMetaData',
      Detail: JSON.stringify(msg),
      Source: 'temp_steps.pinMetaData',
      EventBusName: process.env.busArn,
    },
  ]

  await bus.putEvents({ Entries: entries }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: pinMetaData' + msg,
    }),
  }
}

export async function getContent(event) {
  const msg = event.detail

  const entries = [
    {
      DetailType: 'getContent',
      Detail: JSON.stringify(msg),
      Source: 'temp_steps.getContent',
      EventBusName: process.env.busArn,
    },
  ]

  await bus.putEvents({ Entries: entries }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: getContent' + msg,
    }),
  }
}

export async function pinContent(event) {
  const msg = event.detail

  sqs
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

export async function storeInDataWarehouse(event) {
  const msg = event.Records.map((x) => JSON.parse(x.body))[0]
  console.log(msg)

  const result = await dynamoDb
    .put({
      TableName: process.env.fakeDataWarehouseTable,
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
