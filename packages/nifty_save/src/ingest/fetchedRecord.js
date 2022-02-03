import AWS from 'aws-sdk'
import { sleep } from '../timers'

const bus = new AWS.EventBridge()
const dynamoDb = new AWS.DynamoDB.DocumentClient()

function messageToRecord(msg) {
  //tranformation may go here.
  return {
    ...msg,
  }
}

export async function store(event) {
  console.log(`Store fetched records called`)
  const actualMessages = event.Records.map((x) => JSON.parse(x.body))
  const records = actualMessages.map(messageToRecord)

  let tableBatch = []

  for (const record in records) {
    tableBatch.push(
      dynamoDb.put({
        TableName: process.env.fetchedRecordsTableName,
        Item: {
          ...record,
          created_at: Date.now(),
        },
      })
    )
  }

  await Promise.all(tableBatch)

  return {
    statusCode: 200,
    message: `Stored ${records.length} Fetched Record`,
  }
}
