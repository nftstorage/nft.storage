var serverlessSDK = require('./serverless_sdk/index.js')
serverlessSDK = new serverlessSDK({
  orgId: 'jessetrigram',
  applicationName: 'niftysave',
  appUid: '000000000000000000',
  orgUid: '000000000000000000',
  deploymentUid: 'undefined',
  serviceName: 'niftysave',
  shouldLogMeta: false,
  shouldCompressLogs: true,
  disableAwsSpans: false,
  disableHttpSpans: false,
  stageName: 'dev',
  serverlessPlatformStage: 'prod',
  devModeEnabled: false,
  accessKey: null,
  pluginVersion: '5.5.1',
  disableFrameworksInstrumentation: false,
})

const handlerWrapperArgs = {
  functionName: 'niftysave-dev-timeSlicer',
  timeout: 6,
}

try {
  const userHandler = require('./management/timePartitioner.js')
  module.exports.handler = serverlessSDK.handler(
    userHandler.commandService,
    handlerWrapperArgs
  )
} catch (error) {
  module.exports.handler = serverlessSDK.handler(() => {
    throw error
  }, handlerWrapperArgs)
}
