import {
  Lambda,
  Let,
  Query,
  Var,
  CurrentIdentity,
  Get,
  Match,
  Index,
} from 'faunadb'

export default {
  name: 'findUploadByCid',
  body: Query(
    Lambda(
      ['cid'],
      Let(
        {
          match: Get(
            Match(Index('unique_Upload_user_cid'), [
              CurrentIdentity(),
              Var('cid'),
            ])
          ),
        },
        Var('match')
      )
    )
  ),
}
