'use strict'

const poolSize = 10
const invocationSize = 100

const { sleep } = require('../management/timers')
const aws = require('aws-sdk')
const { Lambda } = require('aws-sdk')
const lambda = new aws.Lambda()
/**
 *
 * @param {any} eventData
 */
function invokeAsync(eventData) {
  const _params = {
    FunctionName: 'exampleSubfunction',
    InvocationType: 'Event',
    Payload: JSON.stringify(eventData),
  }
  return new Promise((resolve, reject) => {
    lambda.invoke(_params, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

module.exports.exampleFunction = async (event, context) => {
  console.log(context)

  return new Promise(async (resolve, reject) => {
    const timerStart = Date.now()

    await invokeAsync({
      foo: 'baz',
    })

    const timeElapsed = Date.now() - timerStart

    resolve({
      statusCode: 200,
      body: JSON.stringify({
        message: `Success! You Slept for ${timeElapsed}ms`,
      }),
    })
  })
}

module.exports.exampleSubfunction = async (event, context) => {
  return new Promise(async (resolve, reject) => {
    const beforeSleep = Date.now()
    await sleep(500)
    console.log('subfun event')
    console.log(event)
    console.log('subfun context')
    console.log(context)
    const timeElapsed = Date.now() - beforeSleep
    resolve({
      number: event.index || 0,
      elapsed: timeElapsed,
    })
  })
}

module.exports.jestTest = async (event, context) => {
  return 3
}
