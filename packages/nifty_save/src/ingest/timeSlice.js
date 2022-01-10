import AWS from 'aws-sdk'
import { sleep } from '../timers'

const bus = new AWS.EventBridge()

function messageToEntry(msg) {
  return {
    DetailType: 'A test event to see if child lambdas invoke',
    Detail: JSON.stringify(msg),
    Source: 'ingest.range_to_slices',
    EventBusName: process.env.busArn,
  }
}

export async function fanOut(event) {
  const actualMessages = event.Records.map(x => JSON.parse(x.body))

  const msg = `count ${event.Records.length} index ${actualMessages[0].index}`

  const entries = actualMessages.map(messageToEntry)
  await bus.putEvents({ Entries: entries }).promise()

  await sleep(500)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'time slice fan out called ' + msg,
    }),
  }
}

export async function execute(event) {
  const foo = event.detail

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'slice after: ' + foo.index,
    }),
  }
}
