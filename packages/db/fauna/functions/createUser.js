import {
  Create,
  Get,
  If,
  IsEmpty,
  Lambda,
  Let,
  Query,
  Select,
  Update,
  Var,
  Match,
  Merge,
  Index,
  Now,
} from 'faunadb'

export default {
  name: 'createUser',
  body: Query(
    Lambda(
      ['data'],
      Let(
        {
          match: Match(
            Index('unique_User_issuer'),
            Select('issuer', Var('data'))
          ),
        },
        If(
          IsEmpty(Var('match')),
          Create('User', {
            credentials: { password: Select('issuer', Var('data')) },
            data: Merge(Var('data'), { created: Now() }),
          }),
          Update(Select('ref', Get(Var('match'))), { data: Var('data') })
        )
      )
    )
  ),
}
