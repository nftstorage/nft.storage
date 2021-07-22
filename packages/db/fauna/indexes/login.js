import { Collection } from 'faunadb'

export default {
  name: 'unique_User_sub_issuer',
  source: Collection('User'),
  unique: true,
  terms: [
    {
      field: ['data', 'issuer'],
    },
    {
      field: ['data', 'sub'],
    },
  ],
}
