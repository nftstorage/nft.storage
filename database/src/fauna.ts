import fauna from 'faunadb'
export * from './fauna.js'
export { fauna }
export { Expr, Get, Collections, Indexes, Functions } from 'faunadb'

export interface CreateFunctionExpr
  extends Expr<{ create_function: ObjectExpr<CreateFunctionParam> }> {}

export interface CreateCollectionExpr
  extends Expr<{ create_collection: ObjectExpr<CreateCollectionParam> }> {}

export interface CreateIndexExpr
  extends Expr<{ create_index: ObjectExpr<CreateIndexParam> }> {}

interface Expr<ToJSON = unknown> extends fauna.Expr {
  toJSON(): ToJSON
}
export interface ObjectExpr<T extends Object> extends Expr<{ object: T }> {}

export interface CreateFunctionParam {
  name: string
  body: fauna.Expr
  data?: fauna.Expr
  role?: fauna.Expr
}

export interface CreateCollectionParam {
  name: string
  data?: fauna.Expr

  ttl_days?: number | null
  history_days?: number
  permissions?: Object
}

export interface CreateIndexParam {
  name: string
  source: fauna.Expr
  terms?: fauna.Expr
  values?: fauna.Expr
  unique?: boolean
  serialized?: boolean
  data?: fauna.Expr
  permissions?: Object
}

export declare function CreateCollection(
  params: CreateCollectionParam
): CreateCollectionExpr
export declare function CreateFunction(
  params: CreateFunctionParam
): CreateFunctionExpr

export declare function CreateIndex(params: CreateIndexParam): CreateIndexExpr
