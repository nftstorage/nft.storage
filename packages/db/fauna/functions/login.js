import {
  Index,
  Query,
  Lambda,
  Union,
  Match,
  Select,
  Var,
  Login,
  Let,
  Get,
} from 'faunadb'

export default {
  name: 'login',
  body: Query(
    Lambda(
      ['id'],
      Let(
        {
          userRef: Union(
            Match(Index('unique_User_sub'), Var('id')),
            Match(Index('unique_User_issuer'), Var('id'))
          ),
          user: Select('data', Get(Var('userRef'))),
          login: Login(Var('userRef'), {
            password: Select('issuer', Var('user')),
          }),
        },
        {
          secret: Select('secret', Var('login')),
          sub: Select('sub', Var('user')),
          issuer: Select('issuer', Var('user')),
          email: Select('email', Var('user')),
          ref: Select('id', Select('ref', Get(Var('userRef')))),
        }
      )
    )
  ),
}
