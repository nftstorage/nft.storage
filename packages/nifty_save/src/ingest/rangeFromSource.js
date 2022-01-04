import { checkIsBinRange } from '../dates'

import { ingestRangeFromSourceSchema } from '../validators'
import baseMiddleware from '../baseMiddleware'
import AWS from 'aws-sdk'

const bus = new AWS.EventBridge()

//takes range => bazillion slices

//range -> slices (list) -> SQS -> event bridge -> child lambda (scrape) -> SQS (consumer -> db)

//test curl
//curl -X POST https://tbsul0n1i5.execute-api.us-east-1.amazonaws.com/ingest/source -d '{ "timesliceSize": 100000, "rangeStartTime": "2018-6-1", "rangeEndTime": "2018-6-2" }' -H "Content-Type: application/json"

function putSliceRangeEvent({ rangeStartTime, rangeEndTime, sourceName }) {
  const params = {
    Entries: [
      {
        DetailType: 'A test event to see if child lambdas invoke',
        Detail: JSON.stringify({
          rangeStartTime,
          rangeEndTime,
          sourceName,
        }),
        Source: 'injest.range_to_slices',
        EventBusName: process.env.busArn,
      },
    ],
  }

  bus.putEvents(params).promise()
}

const ingestRangeFromSourceHandler = async (event, context, err) => {
  console.log(event, context, err)
  if (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err, null, 2),
    }
  }

  const { rangeStartTime, rangeEndTime, sourceName, timesliceSize } =
    event?.body || {}

  console.log({ rangeStartTime, rangeEndTime, sourceName, timesliceSize })

  const isBinRange = checkIsBinRange(rangeStartTime, rangeEndTime)

  if (!isBinRange) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `${rangeStartTime} to ${rangeEndTime} is not a Time Range`,
      }),
    }
  }

  const startTime = new Date(rangeStartTime)
  const endTime = new Date(rangeEndTime)
  const totalSlices = Math.floor((endTime - startTime) / timesliceSize)

  for (var i = 0; i < totalSlices; i++) {
    putSliceRangeEvent({
      rangeStartTime: i * timesliceSize,
      rangeEndTime: (i + 1) * timesliceSize,
      sourceName: 'foo',
    })
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Created ${totalSlices} time Slices from ${rangeStartTime} to ${rangeEndTime}`,
    }),
  }
}

export const ingestRangeFromSource = baseMiddleware(
  ingestRangeFromSourceHandler,
  ingestRangeFromSourceSchema
)
