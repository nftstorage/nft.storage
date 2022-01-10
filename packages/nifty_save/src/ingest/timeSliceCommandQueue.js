import AWS from 'aws-sdk'
import baseMiddleware from '../baseMiddleware'
import { checkIsBinRange } from '../dates'
import { fillTimeSliceCommandQueueSchema } from '../validators'

const bus = new AWS.EventBridge()
const sqs = new AWS.SQS()

//takes range => bazillion slices

//range -> slices (list) -> SQS -> event bridge -> child lambda (scrape) -> SQS (consumer -> db)

//test curl
//curl -X POST https://tbsul0n1i5.execute-api.us-east-1.amazonaws.com/ingest/source -d '{ "timesliceSize": 100000, "rangeStartTime": "2018-6-1", "rangeEndTime": "2018-6-2" }' -H "Content-Type: application/json"

function putSliceRangeEvent({
  rangeStartTime,
  rangeEndTime,
  sourceName,
  index,
}) {
  return {
    rangeStartTime,
    rangeEndTime,
    sourceName,
    index,
  }
}

const fillHandler = async (event, context, err) => {
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

  const startTime = new Date(rangeStartTime).getTime()
  const endTime = new Date(rangeEndTime).getTime()
  const totalSlices = Math.floor((endTime - startTime) / timesliceSize)
  const slices = []
  const _sourceName = sourceName || 'the-graph'

  for (var i = 0; i < totalSlices; i++) {
    const rangeStartTime = i * timesliceSize + startTime
    const rangeEndTime = (i + 1) * timesliceSize + startTime
    const event = putSliceRangeEvent({
      rangeStartTime: rangeStartTime,
      rangeEndTime: rangeEndTime,
      sourceName: _sourceName,
      index: `${_sourceName}_${rangeStartTime}`,
    })

    slices.push(
      sqs
        .sendMessage({
          QueueUrl: process.env.sliceCommandQueueUrl,
          MessageBody: JSON.stringify(event),
        })
        .promise()
    )
  }

  await Promise.all(slices)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Created ${totalSlices} time Slices from ${rangeStartTime} to ${rangeEndTime}`,
    }),
  }
}

export const fill = baseMiddleware(fillHandler, fillTimeSliceCommandQueueSchema)
