'use strict'

const poolSize = 10
const invocationSize = 100

const { sleep } = require('../management/timers')
const aws = require('aws-sdk')

module.exports.exampleFunction = async (event, context) => {
  const lambda = new aws.Lambda()
  const params = {
    FunctionName: 'subfunction',
    InvocationType: 'Event',
    Payload: JSON.stringify(event),
    Qualifier: context.functionVersion,
  }

  lambda.invoke(params, context.done)
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Success! You Slept for ${timeElapsed}ms`,
    }),
  }
}

module.exports.exampleSubfunction = async (event, context) => {
  const beforeSleep = Date.now()
  await sleep(100)
  console.log(context)
  const timeElapsed = Date.now() - beforeSleep
  return {
    number: event.index || 0,
    elapsed: timeElapsed,
  }
}
