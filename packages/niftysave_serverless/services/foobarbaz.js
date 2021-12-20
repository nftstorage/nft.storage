'use strict'

module.exports.exampleFunction = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Success!',
    }),
  }
}
