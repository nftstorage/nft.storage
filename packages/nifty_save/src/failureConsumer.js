import AWS from 'aws-sdk'
import Converter from 'aws-sdk/lib/dynamodb/converter.js'
const sqs = new AWS.SQS()

async function forFailure(record) {
  return record
}

async function toProcesserQueueEntry(record) {
  return sqs
    .sendMessage({
      QueueUrl: process.env.preProcesserQueueUrl,
      MessageBody: JSON.stringify(record),
    })
    .promise()
}

async function toCleanedRecord(record) {
  // because stream is from dynamodb and type is NEW_IMAGE, we fetch via this.
  // Use converter to remove weird attribute tags.
  // see https://forums.aws.amazon.com/thread.jspa?threadID=242408
  return Converter.output({ M: record.dynamodb.NewImage })
}

export async function failureConsumer(event) {
  /*   const promises = event.Records */
  /*     .map(toCleanedRecord) */
  /*     .filter(forFailure) */
  /*     .map(toProcesserQueueEntry); */
  /*  */
  /*   const failures = await Promise.all(promises) */
  const failures = []

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Failure Handler: Added ${failures.length} failures back to queue.`,
    }),
  }
}
