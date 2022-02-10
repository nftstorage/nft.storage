import * as sst from '@serverless-stack/resources'
import { Table, TableFieldType } from '@serverless-stack/resources'
import { LayerVersion } from 'aws-cdk-lib/aws-lambda'
import { StreamViewType } from 'aws-cdk-lib/aws-dynamodb'

export default class NiftySaveStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props)
    const projectName = scope.stage

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

    const preProcesserQueue = new sst.Queue(this, 'PreProcesserQueue')

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
      stream: StreamViewType.NEW_IMAGE,
      // consumer settings for table.
      defaultFunctionProps: {
        timeout: 20,
        environment: {
          preProcesserQueueUrl: preProcesserQueue.sqsQueue.queueUrl,
        },
        permissions: [preProcesserQueue],
      },
      consumers: {
        consumer1: 'src/ingest.fetchedRecordsConsumer',
      },
    })

    fetchedRecordQueue.addConsumer(this, {
      function: {
        handler: 'src/ingest.storeFetchedRecord',
        environment: {
          fetchedRecordsTableName: fetchedRecordsTable.dynamodbTable.tableName,
          preProcesserQueueUrl: preProcesserQueue.sqsQueue.queueUrl,
        },
        permissions: [fetchedRecordsTable, preProcesserQueue],
      },
    })

    preProcesserQueue.addConsumer(this, {
      consumerProps: {
        batchSize: 5,
      },
      function: {
        handler: 'src/temp_steps.beginProcess',
        environment: {
          preProcesserQueueUrl: preProcesserQueue.sqsQueue.queueUrl,
          busArn: bus.eventBusArn,
        },
        permissions: [bus, preProcesserQueue],
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
    const postProcesserQueue = new sst.Queue(this, 'PostProcesserQueue')

    bus.addRules(this, {
      stepAnalyze: {
        eventPattern: { source: ['temp_steps.process'] },
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
                dataWarehouseQueue: postProcesserQueue.sqsQueue.queueUrl,
              },
              permissions: [bus, postProcesserQueue],
            },
          },
        ],
      },
    })

    const postProcesserTable = new Table(this, 'PostProcesserTable', {
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

        // Additional fields post process
        last_step: TableFieldType.STRING,
        ipfs_uri: TableFieldType.STRING,

        //content info
        content_cid: TableFieldType.STRING,
        content_pin_service: TableFieldType.STRING,

        //metadata info
        metadata_cid: TableFieldType.STRING,
        metadata_name: TableFieldType.STRING,
        metadata_description: TableFieldType.STRING,
        metadata_json: TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: 'id', sortKey: 'token_id' },
    })

    postProcesserQueue.addConsumer(this, {
      function: {
        handler: 'src/temp_steps.storeProcessedRecord',
        environment: {
          postProcesserTableName: postProcesserTable.dynamodbTable.tableName,
          busArn: bus.eventBusArn,
        },
        permissions: [bus, postProcesserTable],
      },
    })

    //Verify

    //api
    const api = new sst.Api(this, 'Api', {
      defaultFunctionProps: {
        // Pass in the queue to our API
        environment: {
          projectName,
          sliceCommandQueueUrl: sliceCommandQueue.sqsQueue.queueUrl,
          fetchedRecordQueueUrl: fetchedRecordQueue.sqsQueue.queueUrl,
          //           analyzerIntakeQueueUrl: analyzerIntakeQueue.sqsQueue.queueUrl,
          //           postPinningIntakeQueue: postPinningIntakeQueue.sqsQueue.queueUrl,
          fetchedRecordsTableName: fetchedRecordsTable.dynamodbTable.tableName,
          postProcesserTableName: postProcesserTable.dynamodbTable.tableName,
          busArn: bus.eventBusArn,
        },
      },
      routes: {
        'GET /ingest/health': 'src/ingest.ingestHealth',
        'GET /report/health': 'src/report.health',

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

    api.attachPermissions([
      bus,
      fetchedRecordsTable,
      postProcesserTable,
      sliceCommandQueue,
      fetchedRecordQueue,
      'cloudwatch:GetMetricData',
      'cloudwatch:GetDashboard',
    ])

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

    //expose api
    this.api = api

    //     this.addDefaultFunctionLayers(functionLayers)
    //     this.addDefaultFunctionEnv(lambdaEnvVars)
  }
}
