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
  Do,
} from 'faunadb'
import { findOrCreate } from '../utils/common'

const createPinRef = findOrCreate(
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

export default {
  name: 'createUpload',
  body: Query(
    Lambda(
      ['data'],
      Let(
        {
          cid: Select('cid', Var('data')),
          contentRef: findOrCreate(
            'unique_Content_cid',
            Var('cid'),
            Create('Content', {
              data: {
                cid: Var('cid'),
                dagSize: Select('dagSize', Var('data')),
                created: Now(),
              },
            })
          ),
          pins: Foreach(
            Select('pins', Var('data')),
            Lambda(['pin'], createPinRef)
          ),
        },
        Create('Upload', {
          data: {
            user: CurrentIdentity(),
            type: Select('type', Var('data')),
            created: Now(),
            content: Var('contentRef'),
            files: Select('files', Var('data'), []),
            key: Ref(Collection('UserKey'), Select('key', Var('data'))),
          },
        })
      )
    )
  ),
}
