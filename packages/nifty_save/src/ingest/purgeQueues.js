import AWS from 'aws-sdk'
const sqs = new AWS.SQS()

export async function purgeSliceCommandQueue() {
  await sqs.purgeQueue({ QueueUrl: process.env.sliceCommandQueueUrl }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'purging' }),
  }
}
