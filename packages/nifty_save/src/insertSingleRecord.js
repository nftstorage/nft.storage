import AWS from 'aws-sdk'
const sqs = new AWS.SQS()

export async function insertSingleRecord(event) {
  const record = JSON.parse(event?.body) || {}

  console.log('Inserting a single Record', JSON.stringify(record, null, 2))

  if (record && record.id) {
    sqs
      .sendMessage({
        QueueUrl: process.env.preProcesserQueueUrl,
        MessageBody: JSON.stringify(record),
      })
      .promise()
  } else {
    console.log(
      `The record, ${JSON.stringify(record, null, 2)} was not processed`
    )
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Insert Single Record',
    }),
  }
}
