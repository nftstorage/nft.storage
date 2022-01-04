import AWS from 'aws-sdk'
import { sleep } from './timers'

const bus = new AWS.EventBridge()

const SLEEP_TIME = 500

//takes range => bazillion slices

//range -> slices (list) -> SQS -> event bridge -> child lambda (scrape) -> SQS (consumer -> db)
export async function parentLambda(event) {
  const timerStart = Date.now()
  await sleep(SLEEP_TIME)
  putSliceRangeEvent({})
  // put a lot of em'
  const timeElapsed = Date.now() - timerStart
  return {
    statusCode: 200,
    body: JSON.stringify({ message: `Parent Lambda called: ${timeElapsed}ms` }),
  }
}

export async function ingestHealth(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Ingest is healthy' }),
  }
}

export async function childLambda(event) {
  const timerStart = Date.now()
  console.log(event)
  const timeElapsed = Date.now() - timerStart
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Child Lambda called: ${timeElapsed}ms`,
    }),
  }
}

function putSliceRangeEvent() {
  const params = {
    Entries: [
      {
        DetailType: 'A test event to see if child lambdas invoke',
        Detail: JSON.stringify({ foo: 'bar' }),
        Source: 'injest.range_to_slices',
        EventBusName: process.env.busArn,
      },
    ],
  }

  bus.putEvents(params).promise()
}
