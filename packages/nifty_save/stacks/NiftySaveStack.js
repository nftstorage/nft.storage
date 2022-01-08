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
        targets: ['src/ingest.timeSliceCall'],
      },
    })

    // Create Queue
    const queue = new sst.Queue(this, 'Queue', {
      consumer: {
        consumerProps: {
          batchSize: 10,
        },
        function: {
          handler: 'src/ingest.ingestTimeSlice',
          environment: {
            busArn: bus.eventBusArn,
          },
          permissions: [bus],
        },
      },
    })
    //Analyze

    //Pin

    //Verify

    //api
    const api = new sst.Api(this, 'Api', {
      defaultFunctionProps: {
        // Pass in the queue to our API
        environment: {
          queueUrl: queue.sqsQueue.queueUrl,
          busArn: bus.eventBusArn,
        },
      },
      routes: {
        'GET /ingest/health': 'src/ingest.ingestHealth',
        'POST /ingest/slice-queue/purge': 'src/ingest.purgeQueue',
        'POST /ingest/slice-queue/fill': 'src/ingest.ingestRangeFromSource',
        'POST /ingest/subgraph/fetch': 'src/ingest.fetchSubgraphNFTS',

        $default: 'src/default.defaultResponse',
      },
    })

    api.attachPermissions([bus, queue])
    //     queue.attachPermissions([this.bus]);

    this.addOutputs({
      ApiEndpoint: api.url,
    })

    if (!scope.local) {
      const sentry = LayerVersion.fromLayerVersionArn(
        this,
        'SentryLayer',
        process.ENV.SENTRY_STACK_ARN
      )

      this.addDefaultFunctionEnv({
        SENTRY_DSN: process.env.SENTRY_DSN,
        SENTRY_TRACES_SAMPLE_RATE: '0.5',
        NODE_OPTIONS: '-r @sentry/serverless/dist/awslambda-auto',
      })
    }
  }
}
