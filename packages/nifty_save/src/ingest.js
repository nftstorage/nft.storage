import AWS from 'aws-sdk'
import ajv from 'ajv'
import httpErrorHandler from '@middy/http-error-handler'
import jsonBodyParser from '@middy/http-json-body-parser'
import main from '../stacks'
import middy from '@middy/core'
import validator from '@middy/validator'
const bus = new AWS.EventBridge()

//takes range => bazillion slices

//range -> slices (list) -> SQS -> event bridge -> child lambda (scrape) -> SQS (consumer -> db)
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

  const slices = 6

  console.log({ rangeStartTime, rangeEndTime, sourceName, timesliceSize })

  putSliceRangeEvent({ rangeStartTime, rangeEndTime, sourceName })
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Created ${slices} time Slices from ${rangeStartTime} to ${rangeEndTime}`,
    }),
  }
}

const ingestRangeFromSourceSchema = {
  type: 'object',
  properties: {
    body: {
      rangeStartTime: { type: 'date' },
      rangeEndTime: { type: 'date' },
      sourceName: { type: 'string' },
      timesliceSize: { type: 'number' },
    },
  },
  required: ['rangeStartTime', 'rangeEndTime', 'sourceName', 'timesliceSize'],
}

export const ingestRangeFromSource = middy(ingestRangeFromSourceHandler).use([
  jsonBodyParser(),
  validator({
    inputSchema: ingestRangeFromSourceSchema,
    ajvOptions: {
      strict: false,
    },
  }),
  httpErrorHandler(),
])

export async function ingestTimeSlice(event) {
  console.log(event)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Child Lambda called`,
    }),
  }
}

export async function ingestHealth() {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Ingest is healthy' }),
  }
}

function putSliceRangeEvent({ rangeStartTime, rangeEndTime, sourceName }) {
  console.log({ rangeStartTime, rangeEndTime, sourceName })
  const params = {
    Entries: [
      {
        DetailType: 'A test event to see if child lambdas invoke',
        Detail: JSON.stringify({
          foo: 'bar',
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
