import { Collection } from 'faunadb'

export default {
  name: 'unique_Pin_content_service',
  source: Collection('Pin'),
  unique: true,
  terms: [
    {
      field: ['data', 'content'],
    },
    {
      field: ['data', 'service'],
    },
  ],
}
