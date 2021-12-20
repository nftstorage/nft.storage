'use strict'
const aws = require('aws-sdk')

//takes a service name, range, and invokes it
module.exports.invokeTimeboundedService = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v2.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  }
}

// takes in time range and number of slices
// return list of slices
module.exports.calculateSlices = async (event, context) => {}

// start time (bin)
// end time (bin)
// # of lambdas at once
// slice size
// high water mark per lambda
module.exports.commandService = async (event, context) => {}
