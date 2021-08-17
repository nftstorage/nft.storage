import { Collection } from 'faunadb'

export default {
  name: 'unique_Upload_user_cid',
  source: Collection('Upload'),
  unique: true,
  terms: [
    {
      field: ['data', 'user'],
    },
    {
      field: ['data', 'cid'],
    },
  ],
}
