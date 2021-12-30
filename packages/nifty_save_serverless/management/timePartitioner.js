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

// start time (bin) (default: june 1 2018)
// end time (bin) ( now )
// # of lambdas at once ( 100 )
// slice size ( 1 hour)
// high water mark per lambda ( 10,000 ) move to config?
// the service name ("injest")
// the service config ({}) ???
module.exports.commandService = async (event, context) => {}
