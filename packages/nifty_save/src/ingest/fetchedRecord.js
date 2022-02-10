import AWS from 'aws-sdk'
import Converter from 'aws-sdk/lib/dynamodb/converter.js'

const dynamoDb = new AWS.DynamoDB.DocumentClient()
const sqs = new AWS.SQS()

export async function store(event) {
  const records = event.Records.map((x) => JSON.parse(x.body))

  let tableBatch = []
  for (const record of records) {
    const result = dynamoDb
      .put({
        TableName: process.env.fetchedRecordsTableName,
        Item: {
          ...record,
          created_at: Date.now(),
        },
      })
      .promise()
    tableBatch.push(result)
  }

  try {
    await Promise.all(tableBatch)
  } catch (err) {
    return {
      statusCode: 500,
      message: `ERROR: ${err}`,
    }
  }

  return {
    statusCode: 200,
    message: `Stored ${records.length} Fetched Record`,
  }
}

export async function consumer(event) {
  // because stream is from dynamodb and type is NEW_IMAGE, we fetch via this.
  const promises = event.Records.map((x) => x.dynamodb.NewImage)
    // Use converter to remove weird attribute tags.
    // see https://forums.aws.amazon.com/thread.jspa?threadID=242408
    .map((x) => Converter.output({ M: x }))
    .map((x) =>
      sqs
        .sendMessage({
          QueueUrl: process.env.preProcesserQueueUrl,
          MessageBody: JSON.stringify(x),
        })
        .promise()
    )

  try {
    await Promise.all(promises)
  } catch (err) {
    return {
      statusCode: 500,
      message: `ERROR: ${err}`,
    }
  }

  return {
    statusCode: 200,
    message: `Moved ${promises.length} onto the preprocesser queue.`,
  }
}
