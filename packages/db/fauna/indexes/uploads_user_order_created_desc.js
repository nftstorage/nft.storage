import { Collection } from 'faunadb'

export default {
  name: 'uploads_user_order_created_desc',
  source: Collection('Upload'),
  unique: true,
  terms: [
    {
      field: ['data', 'user'],
    },
  ],
  values: [
    {
      field: ['data', 'created'],
      reverse: true,
    },
    {
      field: ['ref'],
    },
  ],
}
