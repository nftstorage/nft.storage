import AWS from 'aws-sdk'
import Converter from 'aws-sdk/lib/dynamodb/converter.js'
const sqs = new AWS.SQS()

export async function consumer(event) {
  // because stream is from dynamodb and type is NEW_IMAGE, we fetch via this.
  const promises = event.Records.map((x) => x.dynamodb.NewImage)
    .filter((x) => x) // new image will be null sometimes, on deletion.
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
