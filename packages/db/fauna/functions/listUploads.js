import {
  Lambda,
  Let,
  Query,
  Var,
  CurrentIdentity,
  Get,
  Match,
  Index,
  Paginate,
  Select,
  Map,
  Time,
} from 'faunadb'

export default {
  name: 'listUploads',
  body: Query(
    Lambda(
      ['size', 'before'],
      Let(
        {
          list: Map(
            Paginate(
              Match(
                Index('uploads_user_order_created_desc'),
                CurrentIdentity()
              ),
              { size: Var('size'), after: Time(Var('before')) }
            ),
            Lambda('upload', Get(Select(1, Var('upload'))))
          ),
        },
        Select('data', Var('list'))
      )
    )
  ),
}
