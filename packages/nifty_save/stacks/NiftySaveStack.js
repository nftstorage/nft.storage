import * as sst from '@serverless-stack/resources'

import { LayerVersion } from '@aws-cdk/aws-lambda'

export default class NiftySaveStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    //configure the event bus
    const bus = new sst.EventBus(this, 'Bus')

    //Ingest
    bus.addRules(this, {
      ingestRangeToSlices: {
        eventPattern: { source: ['ingest.range_to_slices'] },
        targets: ['src/ingest.executeTimeSlice'],
      },
    })

    // Create Queue
    const sliceCommandQueue = new sst.Queue(this, 'SliceCommandQueue', {
      consumer: {
        consumerProps: {
          batchSize: 10,
        },
        function: {
          handler: 'src/ingest.fanOutTimeSlice',
          environment: {
            busArn: bus.eventBusArn,
          },
          permissions: [bus],
        },
      },
    })

    const fetchedRecordQueue = new sst.Queue(this, 'FetchedRecordQueue', {})

    //Analyze

    const analyzerIntakeQueue = new sst.Queue(this, 'AnalyzerIntakeQueue', {})

    //Pin

    const postPinningIntakeQueue = new sst.Queue(
      this,
      'PostPinningIntakeQueue',
      {}
    )

    //Verify

    //api
    const api = new sst.Api(this, 'Api', {
      defaultFunctionProps: {
        // Pass in the queue to our API
        environment: {
          sliceCommandQueueUrl: sliceCommandQueue.sqsQueue.queueUrl,
          fetchedRecordQueueUrl: fetchedRecordQueue.sqsQueue.queueUrl,
          busArn: bus.eventBusArn,
        },
      },
      routes: {
        'GET /ingest/health': 'src/ingest.ingestHealth',

        'POST /ingest/slice-queue/purge': 'src/ingest.purgeSliceCommandQueue',
        'POST /ingest/slice-queue/fill': 'src/ingest.fillIngestTimeSliceQueue',

        'POST /ingest/records/purge': 'src/ingest.purgeFetchedRecordqueue',
        'POST /ingest/subgraph/fetch': 'src/ingest.fetchSubgraphNFTS',

        $default: 'src/default.defaultResponse',
      },
    })

    api.attachPermissions([bus, sliceCommandQueue])
    //     queue.attachPermissions([this.bus]);

    this.addOutputs({
      ApiEndpoint: api.url,
    })

    if (!scope.local) {
      const sentry = LayerVersion.fromLayerVersionArn(
        this,
        'SentryLayer',
        `arn:aws:lambda:${scope.region}:943013980633:layer:SentryNodeServerlessSDK:40`
      )

      this.addDefaultFunctionLayers([sentry])

      this.addDefaultFunctionEnv({
        SENTRY_DSN: process.env.SENTRY_DSN,
        SENTRY_TRACES_SAMPLE_RATE: '0.5',
        NODE_OPTIONS: '-r @sentry/serverless/dist/awslambda-auto',
      })
    }
  }
}
