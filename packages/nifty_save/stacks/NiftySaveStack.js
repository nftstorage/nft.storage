import { Duration } from '@aws-cdk/core'
import { Schedule } from '@aws-cdk/aws-events'
import * as sst from '@serverless-stack/resources'

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
        'POST /ingest/purge': 'src/ingest.purgeQueue',
        'POST /ingest/source': 'src/ingest.ingestRangeFromSource',
        'GET /ingest/health': 'src/ingest.ingestHealth',
        $default: 'src/default.defaultResponse',
      },
    })

    api.attachPermissions([bus, queue])
    //     queue.attachPermissions([this.bus]);

    this.addOutputs({
      ApiEndpoint: api.url,
    })
  }
}
