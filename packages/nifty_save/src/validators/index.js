import Ajv from 'ajv'
const ajv = new Ajv({ strict: false })

const ingestRangeFromSourceSchemaDef = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        timesliceSize: { type: 'number' },
      },
      required: ['timesliceSize', 'rangeStartTime', 'rangeEndTime'],
    },
  },
}

// const lambdaInputSchemaDef = {
//   type: 'object',
//   properties: {
//     body: {
//       type: 'object',
//       properties: {},
//     },
//   },
//   required: ['body'],
// };
//
// const lambda2InputSchemaDef = {
//   type: 'object',
//   properties: {
//     detail: {
//       properties: {
//         test: { type: 'string' },
//         bar: { type: 'string' },
//       },
//       required: ['test'],
//     },
//   },
//   required: ['detail', 'detailType'],
// };

export const ingestRangeFromSourceSchema = ajv.compile(
  ingestRangeFromSourceSchemaDef
)
// export const lambda2InputSchema = ajv.compile(lambda2InputSchemaDef);
