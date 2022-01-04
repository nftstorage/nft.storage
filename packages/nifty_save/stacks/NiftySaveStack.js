import * as sst from '@serverless-stack/resources'

export default class NiftySaveStack extends sst.Stack {
  //public refernce to the bus
  bus

  constructor(scope, id, props) {
    super(scope, id, props)

    //configure the event bus
    this.bus = new sst.EventBus(this, 'Bus')

    //Ingest

    this.bus.addRules(this, {
      ingestRangeToSlices: {
        eventPattern: { source: ['injest.range_to_slices'] },
        targets: ['src/ingest.ingestTimeSlice'],
      },
    })

    //Analyze

    //Pin

    //Verify

    //api
    this.api = new sst.Api(this, 'Api', {
      defaultFunctionProps: {
        // Pass in the queue to our API
        environment: {
          busArn: this.bus.eventBusArn,
        },
      },
      routes: {
        'POST /ingest/source': 'src/ingest.ingestRangeFromSource',
        'GET /ingest/health': 'src/ingest.ingestHealth',
        $default: 'src/default.defaultResponse',
      },
    })

    this.api.attachPermissions([this.bus])

    this.addOutputs({
      ApiEndpoint: this.api.url,
    })
  }
}
