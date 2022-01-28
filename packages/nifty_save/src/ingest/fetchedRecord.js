import AWS from 'aws-sdk'
import { sleep } from '../timers'

const bus = new AWS.EventBridge()

function messageToRecord(msg) {
  console.log(msg)
  //tranformation may go here.
  return {
    ...msg,
  }
}

export async function store(event) {
  const actualMessages = event.Records.map((x) => JSON.parse(x.body))
  const records = actualMessages.map(messageToRecord)

  return {
    statusCode: 200,
    message: `Stored Fetched Record`,
  }
}
