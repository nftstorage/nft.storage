import AWS from 'aws-sdk'
const sqs = new AWS.SQS()

export async function purgeQueue() {
  await sqs.purgeQueue({ QueueUrl: process.env.queueUrl }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'purging' }),
  }
}
