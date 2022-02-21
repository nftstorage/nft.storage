/** @enum {string} */
export const MetricNamespace = {
  SQS: 'AWS/SQS',
  DynamoDB: 'AWS/DynamoDB',
  Lambda: 'AWS/Lambda',
}

/** @enum {string} */
export const MetricMethod = {
  Sum: 'Sum',
  Maximum: 'Maximum',
  Average: 'Average',
}

/**
 * Build a query for a metric on cloudwatch.
 * @param {MetricNamespace} namespace - The namespace of the metric to get (AWS/SQS, AWS/DynamoDB, AWS/Lambda).
 * @param {string} name - The name of the metric to get.
 * @param {MetricMethod} [method=MetricMethod.Sum] - The method to apply to the metric (Sum, Average, Maximum, etc)
 * @returns {object} The metric query.
 */
export function buildMetricQuery(namespace, name, method = MetricMethod.Sum) {
  const projectName = process.env.projectName
  const period = 10 // time sample period in seconds.

  return {
    Id: `report_health_${name.toLowerCase()}_${method.toLowerCase()}`,
    Expression: `SEARCH('${namespace} "${name}" AND (${projectName})', '${method}', ${period})`,
    ReturnData: true,
  }
}
