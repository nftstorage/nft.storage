import AWS from 'aws-sdk'
import Converter from 'aws-sdk/lib/dynamodb/converter.js'
const sqs = new AWS.SQS()

function forFailure(record) {
  // TODO:
  // return true when steps is not long enough.
  //   if(record.steps.indexOf('tested') == -1) {
  //     return true;
  //   }
  return false
}

async function toProcesserQueueEntry(record) {
  //   record.steps.push('tested');
  return sqs
    .sendMessage({
      QueueUrl: process.env.preProcesserQueueUrl,
      MessageBody: JSON.stringify(record),
    })
    .promise()
}

function toCleanedRecord(record) {
  // because stream is from dynamodb and type is NEW_IMAGE, we fetch via this.
  // Use converter to remove weird attribute tags.
  // see https://forums.aws.amazon.com/thread.jspa?threadID=242408
  return Converter.output({ M: record.dynamodb.NewImage })
}

export async function failureConsumer(event) {
  const failures = await event.Records.map(toCleanedRecord)
    .filter(forFailure)
    .map(toProcesserQueueEntry)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Failure Handler: Added ${failures.length} failures back to queue.`,
    }),
  }
}
