import {
  dataSources,
  getDataSourceStrategy as getDataSource,
} from './sources/registry'

import AWS from 'aws-sdk'
import { sleep } from '../timers'

const bus = new AWS.EventBridge()

const sqs = new AWS.SQS()

function messageToEntry(msg) {
  return {
    DetailType: 'Time Slice of NFTs To fetch, derived from a larger range',
    Detail: JSON.stringify(msg),
    Source: 'ingest.range_to_slices',
    EventBusName: process.env.busArn,
  }
}

export async function fanOut(event) {
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

//TODO: middy validate detail objects.
export async function execute(event, context) {
  const { detail } = event

  console.log('executing fror detail, source', detail.source)
  const datasource = getDataSource(detail.source)

  if (!datasource) {
    return {
      statusCode: 422,
      body: JSON.stringify({
        message: `${
          detail.source
        } did not exist in list of possible sources: [${dataSources
          .map((s) => s.id)
          .join(' | ')}]`,
      }),
    }
  }

  const fetchNFTs = datasource.fetch

  console.log(
    'fetchedRecordQueueUrl (execute)',
    process.env.fetchedRecordQueueUrl
  )

  const results = await fetchNFTs(event, context)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'slice after: ' + detail.index,
    }),
  }
}
