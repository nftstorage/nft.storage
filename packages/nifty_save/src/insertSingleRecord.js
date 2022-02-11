import AWS from 'aws-sdk'
const sqs = new AWS.SQS()

export async function insertSingleRecord(event) {
  const record = JSON.parse(event?.body) || {}

  if (record && record.id) {
    sqs
      .sendMessage({
        QueueUrl: process.env.preProcesserQueueUrl,
        MessageBody: JSON.stringify(record),
      })
      .promise()
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: Insert Single Record',
    }),
  }
}
