import AWS from 'aws-sdk'
const bus = new AWS.EventBridge()

/**
 * Put a processed record back on the bus
 *
 * @async
 * @param {string} step - The current step.
 * @param {object} data - The data/record to put on the bus.
 * @returns {Promise<object>} The promise from the bus putting the events on.
 */
export async function putOnProcessorBus(step, data) {
  if (!process.env.busArn) {
    throw `Bus arn was not provided in step: ${step}`
  }

  if (step != 'failure') {
    data = { ...data, steps: [...(data.steps || []), step] }
  }

  const entries = [
    {
      DetailType: step,
      Detail: JSON.stringify(data),
      Source: `steps.${step}`,
      EventBusName: process.env.busArn,
    },
  ]

  return bus.putEvents({ Entries: entries }).promise()
}
