import AWS from 'aws-sdk'
const sqs = new AWS.SQS()

export async function purgeSliceCommandQueue() {
  await sqs.purgeQueue({ QueueUrl: process.env.sliceCommandQueueUrl }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Purged the Slice Command Queue' }),
  }
}

export async function purgeFetchedRecordqueue() {
  await sqs
    .purgeQueue({ QueueUrl: process.env.fetchedRecordQueueUrl })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Purged Fetched Record Queue' }),
  }
}
