import AWS from 'aws-sdk'
import { sleep } from '../timers'

const bus = new AWS.EventBridge()

function messageToRecord(msg) {
  console.log('got a message.')
  //tranformation may go here.
  return {
    ...msg,
  }
}

export async function store(event) {
  console.log(`Store fetched records called`)
  const actualMessages = event.Records.map((x) => JSON.parse(x.body))
  const records = actualMessages.map(messageToRecord)

  console.log(`Storing records: ${records.length}`)

  return {
    statusCode: 200,
    message: `Stored Fetched Record`,
  }
}
