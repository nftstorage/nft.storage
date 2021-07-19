import { If, Index, Let, Match, Select, Var, Get, IsEmpty } from 'faunadb'

/**
 * Find or create a new document
 *
 * @param {string} index - Index to search in
 * @param {string} searchTerm - The term to locate in the index.
 * @param {*} fn - Expression to create if not found ie. `Create('Name', {})`
 * @returns {import('faunadb')["Expr"]} - Returns a reference to the document. ie. ` Ref(Collection("Content"), "304297589890613771")`
 */
export function findOrCreate(index, searchTerm, fn) {
  return Let(
    {
      match: Match(Index(index), Var(searchTerm)),
    },
    If(
      IsEmpty(Var('match')),
      Select('ref', fn),
      Select('ref', Get(Var('match')))
    )
  )
}
