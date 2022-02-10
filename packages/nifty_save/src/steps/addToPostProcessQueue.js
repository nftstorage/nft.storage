import AWS from 'aws-sdk'
const sqs = new AWS.SQS()

export async function addToPPQueue(event) {
  const msg = event.detail

  await sqs
    .sendMessage({
      QueueUrl: process.env.dataWarehouseQueue,
      MessageBody: JSON.stringify(msg),
    })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'step: putOnPostProcessQueue' + msg,
    }),
  }
}
