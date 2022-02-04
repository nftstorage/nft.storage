import * as sst from '@serverless-stack/resources'

import { Function, Table, TableFieldType } from '@serverless-stack/resources'

import { LayerVersion } from 'aws-cdk-lib/aws-lambda'

export default class NiftySaveStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)

    //configure the event bus
    const bus = new sst.EventBus(this, 'Bus')

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

    const fetchedRecordQueue = new sst.Queue(this, 'FetchedRecordQueue')

    //Ingest
    bus.addRules(this, {
      ingestRangeToSlices: {
        eventPattern: { source: ['ingest.range_to_slices'] },
        targets: [
          {
            function: {
              handler: 'src/ingest.executeTimeSlice',
              environment: {
                fetchedRecordQueueUrl: fetchedRecordQueue.sqsQueue.queueUrl,
              },
              permissions: [fetchedRecordQueue],
            },
          },
        ],
      },
    })

    const fetchedRecordsTable = new Table(this, 'FetchedRecordsTable', {
      fields: {
        id: TableFieldType.STRING,
        token_id: TableFieldType.STRING,
        token_uri: TableFieldType.STRING,
        mint_time: TableFieldType.STRING,
        contract_id: TableFieldType.STRING,
        contract_name: TableFieldType.STRING,
        contract_symbol: TableFieldType.STRING,
        contract_supports_eip721_metadata: TableFieldType.BINARY,
        block_hash: TableFieldType.STRING,
        block_number: TableFieldType.NUMBER,
        owner_id: TableFieldType.STRING,
        updated_at: TableFieldType.STRING,
        inserted_at: TableFieldType.STRING,
        last_processed: TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: 'id', sortKey: 'token_id' },
    })

    fetchedRecordQueue.addConsumer(this, {
      function: {
        handler: 'src/ingest.storeFetchedRecord',
        environment: {
          fetchedRecordsTableName: fetchedRecordsTable.dynamodbTable.tableName,
        },
        permissions: [fetchedRecordsTable],
      },
    })

    //Analyze
    //     const analyzerIntakeQueue = new sst.Queue(this, 'AnalyzerIntakeQueue', {})

    //Pin
    //     const postPinningIntakeQueue = new sst.Queue(
    //       this,
    //       'PostPinningIntakeQueue',
    //       {}
    //     )

    //     const analyzerBus = new sst.EventBus(this, 'analyzerBus')
    const dataWarehouseQueue = new sst.Queue(this, 'DataWarehouseQueue')

    bus.addRules(this, {
      stepAnalyze: {
        eventPattern: { source: ['temp_steps.test'] },
        targets: [
          {
            function: {
              handler: 'src/temp_steps.analyze',
              environment: { busArn: bus.eventBusArn },
              permissions: [bus],
            },
          },
        ],
      },
      getMetaData: {
        eventPattern: { source: ['temp_steps.analyze'] },
        targets: [
          {
            function: {
              handler: 'src/temp_steps.getMetaData',
              environment: { busArn: bus.eventBusArn },
              permissions: [bus],
            },
          },
        ],
      },
      pinMetaData: {
        eventPattern: { source: ['temp_steps.getMetaData'] },
        targets: [
          {
            function: {
              handler: 'src/temp_steps.pinMetaData',
              environment: { busArn: bus.eventBusArn },
              permissions: [bus],
            },
          },
        ],
      },
      getContent: {
        eventPattern: { source: ['temp_steps.pinMetaData'] },
        targets: [
          {
            function: {
              handler: 'src/temp_steps.getContent',
              environment: { busArn: bus.eventBusArn },
              permissions: [bus],
            },
          },
        ],
      },
      pinContent: {
        eventPattern: { source: ['temp_steps.getContent'] },
        targets: [
          {
            function: {
              handler: 'src/temp_steps.pinContent',
              environment: {
                busArn: bus.eventBusArn,
                dataWarehouseQueue: dataWarehouseQueue.sqsQueue.queueUrl,
              },
              permissions: [bus, dataWarehouseQueue],
            },
          },
        ],
      },
    })

    const fakeDataWarehouseTable = new Table(this, 'FakeDataWarehouseTable', {
      fields: {
        id: TableFieldType.STRING,
        token_id: TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: 'id', sortKey: 'token_id' },
    })

    dataWarehouseQueue.addConsumer(this, {
      function: {
        handler: 'src/temp_steps.storeInDataWarehouse',
        environment: {
          fakeDataWarehouseTable:
            fakeDataWarehouseTable.dynamodbTable.tableName,
        },
        permissions: [fakeDataWarehouseTable],
      },
    })

    //Verify

    //api
    const api = new sst.Api(this, 'Api', {
      defaultFunctionProps: {
        // Pass in the queue to our API
        environment: {
          sliceCommandQueueUrl: sliceCommandQueue.sqsQueue.queueUrl,
          fetchedRecordQueueUrl: fetchedRecordQueue.sqsQueue.queueUrl,
          //           analyzerIntakeQueueUrl: analyzerIntakeQueue.sqsQueue.queueUrl,
          //           postPinningIntakeQueue: postPinningIntakeQueue.sqsQueue.queueUrl,
          fetchedRecordsTableName: fetchedRecordsTable.dynamodbTable.tableName,
          busArn: bus.eventBusArn,
        },
      },
      routes: {
        'GET /ingest/health': 'src/ingest.ingestHealth',

        'POST /ingest/slice-queue/purge': 'src/ingest.purgeSliceCommandQueue',
        'POST /ingest/slice-queue/fill': 'src/ingest.fillIngestTimeSliceQueue',

        'POST /ingest/records/purge': 'src/ingest.purgeFetchedRecordqueue',
        'POST /ingest/subgraph/fetch': 'src/ingest.fetchSubgraphNFTS',

        'POST /ingest/timeslice/execute': 'src/ingest.executeTimeSlice',

        'POST /ingest/fetchedRecord/store': 'src/ingest.storeFetchedRecord',
        'POST /temp_steps/test': 'src/temp_steps.test',

        $default: 'src/default.defaultResponse',
      },
    })

    api.attachPermissions([bus, sliceCommandQueue, fetchedRecordQueue])

    this.addOutputs({
      ApiEndpoint: api.url,
    })

    let lambdaEnvVars = {}
    let functionLayers = []

    //Decorate with prod only.
    if (!scope.local) {
      const sentry = LayerVersion.fromLayerVersionArn(
        this,
        'SentryLayer',
        `arn:aws:lambda:${scope.region}:943013980633:layer:SentryNodeServerlessSDK:40`
      )
      functionLayers = [...functionLayers, sentry]
      lambdaEnvVars = {
        ...lambdaEnvVars,
        ...{
          SENTRY_DSN: process.env.SENTRY_DSN,
          SENTRY_TRACES_SAMPLE_RATE: '0.5',
          NODE_OPTIONS: '-r @sentry/serverless/dist/awslambda-auto',
        },
      }
    }

    //     this.addDefaultFunctionLayers(functionLayers)
    //     this.addDefaultFunctionEnv(lambdaEnvVars)
  }
}
