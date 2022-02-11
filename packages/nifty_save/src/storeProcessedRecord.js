import AWS from 'aws-sdk'
const dynamoDb = new AWS.DynamoDB.DocumentClient()

export async function storeProcessedRecord(event) {
  const records = event.Records.map((x) => JSON.parse(x.body))

  let tableBatch = []
  for (const record of records) {
    if (!record.id) {
      continue
    }
    const result = dynamoDb
      .put({
        TableName: process.env.postProcesserTableName,
        Item: {
          ...record,
        },
      })
      .promise()
    tableBatch.push(result)
  }

  try {
    await Promise.all(tableBatch)
  } catch (err) {
    console.log('there was an error storing:' + err)
  }

  return {
    statusCode: 200,
    message: `step: Stored ${tableBatch.length} out of ${records.length}`,
  }
}
