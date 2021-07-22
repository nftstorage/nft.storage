import { Collection, Function, Index } from 'faunadb'
export default {
  name: 'normal_user',
  membership: [{ resource: Collection('User') }],
  privileges: [
    {
      resource: Function('createUpload'),
      actions: {
        call: true,
      },
    },
    {
      resource: Collection('Upload'),
      actions: {
        read: true,
        write: true,
        create: true,
        delete: false,
      },
    },
    {
      resource: Collection('Content'),
      actions: {
        read: true,
        write: true,
        create: true,
        delete: false,
      },
    },
    {
      resource: Collection('User'),
      actions: {
        read: true,
        write: true,
        create: true,
        delete: false,
      },
    },
    {
      resource: Collection('UserKey'),
      actions: {
        read: true,
        write: true,
        create: true,
        delete: false,
      },
    },
    {
      resource: Index('unique_Content_cid'),
      actions: {
        read: true,
      },
    },
    {
      resource: Index('unique_UserKey_key_user'),
      actions: {
        read: true,
      },
    },
    {
      resource: Index('userKey_user_by_user'),
      actions: {
        read: true,
      },
    },
  ],
}
