import { Lambda, Let, Query, Select, Var, Create, Now } from 'faunadb'
import { findOrCreate } from '../utils/common'

export default {
  name: 'createUpload',
  body: Query(
    Lambda(
      ['data'],
      Let(
        {
          cid: Select('cid', Var('data')),
          content: findOrCreate(
            'unique_Content_cid',
            'cid',
            Create('Content', {
              data: {
                cid: Var('cid'),
                dagSize: Select('dagSize', Var('data')),
                created: Now(),
              },
            })
          ),
        },
        Create('Upload', {
          data: {
            type: Select('type', Var('data')),
            created: Now(),
            content: Var('content'),
          },
        })
      )
    )
  ),
}
