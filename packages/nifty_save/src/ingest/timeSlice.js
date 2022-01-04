import { sleep } from '../timers'

import AWS from 'aws-sdk'
const bus = new AWS.EventBridge()

function messageToEntry(msg) {
  return {
    DetailType: 'A test event to see if child lambdas invoke',
    Detail: JSON.stringify(msg),
    Source: 'ingest.range_to_slices',
    EventBusName: process.env.busArn,
  }
}

export async function ingestTimeSlice(event) {
  const actualMessages = event.Records.map((x) => JSON.parse(x.body))

  const msg = `count ${event.Records.length} index ${actualMessages[0].index}`

  const entries = actualMessages.map(messageToEntry)
  await bus.putEvents({ Entries: entries }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'time slice fan out called ' + msg,
    }),
  }
}
