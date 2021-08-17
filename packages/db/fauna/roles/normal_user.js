import {
  Collection,
  CurrentIdentity,
  Equals,
  Function,
  Get,
  Index,
  Lambda,
  Let,
  Var,
  Query,
  Select,
} from 'faunadb'
export default {
  name: 'normal_user',
  membership: [{ resource: Collection('User') }],
  privileges: [
    {
      resource: Function('createUploadCustom'),
      actions: {
        call: true,
      },
    },
    {
      resource: Function('findUploadByCid'),
      actions: {
        call: true,
      },
    },
    {
      resource: Function('updatePin'),
      actions: {
        call: true,
      },
    },
    {
      resource: Collection('Upload'),
      actions: {
        read: Query(
          Lambda(
            'ref',
            Equals(CurrentIdentity(), Select(['data', 'user'], Get(Var('ref'))))
          )
        ),
        write: true,
        create: true,
        delete: Query(
          Lambda(
            'ref',
            Equals(CurrentIdentity(), Select(['data', 'user'], Get(Var('ref'))))
          )
        ),
      },
    },
    {
      resource: Collection('PinLocation'),
      actions: {
        read: true,
        write: true,
        create: true,
        delete: false,
      },
    },
    {
      resource: Collection('pinLocation_pins'),
      actions: {
        read: true,
        write: true,
        create: true,
        delete: false,
      },
    },
    {
      resource: Collection('Pin'),
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
        write: false,
        create: true,
        delete: Query(
          Lambda(
            'ref',
            Let(
              {
                userKey: Get(Var('ref')),
                userRef: Select(['data', 'user'], Var('userKey')),
              },
              Equals(Var('userRef'), CurrentIdentity())
            )
          )
        ),
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
    {
      resource: Index('content_pins_by_content'),
      actions: {
        read: true,
      },
    },
    {
      resource: Index('pinLocation_pins_by_pinLocation'),
      actions: {
        read: true,
      },
    },
    {
      resource: Index('pinLocation_pins_by_pin_and_pinLocation'),
      actions: {
        read: true,
      },
    },
    {
      resource: Index('pinLocation_pins_by_pin'),
      actions: {
        read: true,
      },
    },
    {
      resource: Index('unique_Pin_content_service'),
      actions: {
        read: true,
      },
    },
    {
      resource: Index('pin_by_status'),
      actions: {
        read: true,
      },
    },
    {
      resource: Index('unique_PinLocation_peerId'),
      actions: {
        read: true,
      },
    },
    {
      resource: Index('unique_Upload_user_cid'),
      actions: {
        read: true,
      },
    },
    {
      resource: Index('findUploadByCid'),
      actions: {
        read: true,
      },
    },
    {
      resource: Index('findContentByCid'),
      actions: {
        read: true,
      },
    },
  ],
}
