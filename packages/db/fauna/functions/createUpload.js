import {
  Lambda,
  Let,
  Query,
  Select,
  Var,
  Create,
  Now,
  CurrentIdentity,
  Ref,
  Collection,
  Foreach,
  Get,
  Map,
  If,
  IsNull,
} from 'faunadb'
import { findOrCreate } from '../utils/common'

const pinRef = findOrCreate(
  'unique_Pin_content_service',
  [Var('contentRef'), Select('service', Var('pin'))],
  Create('Pin', {
    data: {
      content: Var('contentRef'),
      status: Select('status', Var('pin')),
      statusText: Select('statusText', Var('pin')),
      created: Now(),
      service: Select('service', Var('pin')),
    },
  })
)

const contentRef = findOrCreate(
  'unique_Content_cid',
  Var('cid'),
  Create('Content', {
    data: {
      cid: Var('cid'),
      dagSize: Select('dagSize', Var('data')),
      created: Now(),
    },
  })
)

const uploadRef = findOrCreate(
  'unique_Upload_user_cid',
  [CurrentIdentity(), Var('cid')],
  Create('Upload', {
    data: {
      user: CurrentIdentity(),
      type: Select('type', Var('data')),
      created: Now(),
      cid: Var('cid'),
      content: Var('contentRef'),
      files: Select('files', Var('data'), []),
      key: Var('key'),
    },
  })
)

export default {
  name: 'createUploadCustom',
  body: Query(
    Lambda(
      'uploads',
      Map(
        Var('uploads'),
        Lambda(
          ['data'],
          Let(
            {
              key: If(
                IsNull(Select('key', Var('data'), null)),
                null,
                Ref(Collection('UserKey'), Select('key', Var('data')))
              ),
              cid: Select('cid', Var('data')),
              contentRef,
              pins: Foreach(
                Select('pins', Var('data')),
                Lambda(['pin'], pinRef)
              ),
              uploadRef,
            },
            Get(Var('uploadRef'))
          )
        )
      )
    )
  ),
}
