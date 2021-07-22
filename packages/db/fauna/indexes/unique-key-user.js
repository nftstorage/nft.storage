import { Collection } from 'faunadb'

export default {
  name: 'unique_UserKey_key_user',
  source: Collection('UserKey'),
  unique: true,
  terms: [
    {
      field: ['data', 'name'],
    },
    {
      field: ['data', 'user'],
    },
  ],
}
