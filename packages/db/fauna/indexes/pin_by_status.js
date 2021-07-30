import { Collection } from 'faunadb'

export default {
  name: 'pin_by_status',
  source: Collection('Pin'),
  terms: [
    {
      field: ['data', 'status'],
    },
  ],
  values: [
    {
      field: ['ref', 'id'],
    },
    {
      field: ['data', 'content'],
    },
    {
      field: ['data', 'service'],
    },
    {
      field: ['data', 'locations'],
    },
  ],
}
