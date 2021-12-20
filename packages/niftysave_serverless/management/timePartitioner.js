'use strict'
const aws = require('aws-sdk')

module.exports.commandService = async (event, context) => {
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
