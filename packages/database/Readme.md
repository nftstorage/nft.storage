# Database

[Fauna DB][] is used as a storage layer and all the interaction happens through
GraphQL API. Invariants are upheld through User Defined Functions (UDF)s which
are exposed as custom mutations over GraphQL.

## Hacking

> ⚠️ Please do not change schema or run untested code on a production database as
> you may corrupt data. Instead configure your environment to use dev db instance.

### Environment

You will need to setup environment with variables listed below.

> Recommended way is through `./.env` file.

- `FAUNA_KEY` - Your fauna db access token.

### Setting up new/test database

1. Create a new database at https://dashboard.fauna.com/
2. Generate access token in database settings (under security tab) and assign it to `FAUNA_KEY` env varibale (in `./.env` file).
3. Get db schema up to date by running `yarn setup`. It will apply all db migrations to get it up to date with a schema.

### Schema

Database schema is primarily driven by GraphQL which schema. To make changes to
the schema edit `./fauna/resources/schema.graphql` file and then run `yarn update-schema` which will:

1. Reflect schema changes in DB (⚠️ Remember to use dev db).
2. Download and organize new database collections/indexes/functions at `./fauna/resources` directory.

> Each collection/index/function is written in file under corresponding
> directory with a same named and `.fql` extension. E.g. function named `boom`
> would be located at `./fauna/resources/Function/boom.fql`.

If you only wanted to change schema than only other thing you'd need to do is
generate a migration by running `yarn create-migration` script. That would
create a directory under `./fauna/migrations/` and will contain changes made.

> Make sure to include generated migration with a pull request.

### User Defined Functions (UDF)s

As alluded to in above section, all the UDFs will be organized in
`./fauna/resources/Function` directory. Each file containing single function
with a name of the file.

You can modify existing functions or create new ones, once done you will need to
generate a migration by running `yarn create-migration` script.

### Indexes

Fauna does not really support changing indexes, if you find yourself in need to
do that it is likely that you'd be better of create a new index instead.

Creating new indexes just requires creating a corresponding file, e.g. index
named `allTokens` would require creating `./fauna/resources/Index/allTokens.fql`
file with a single `CreateIndex` expression.

> Note: Often times @index graphql directive in the schema would do a trick.

### Collections

You would probably never need to modify or create new collection manually, as
they are generated from GraphQL schema.

### Preparing pull request

Typically you would combine schema changes with function changes and possibly
accompany them with new indexes. Best practice is to do these as follows:

- Start with changing a schema. Anything but bugfix will require graphql
  entrypoint query or mutation so it's a best place to start.
- Push schema changes by running `yarn update-schema`. That would also pull all
  new functions/collections/indexes into your repo.
- Modify / create functions. Above step would bring some new functions and here
  you'd modify them and maybe introduce some new functions to ficilitate reuse.
- Create necessary indexes. Your new functions often would need indexes and
  likely you'll create them as you write those functions.
- Creating a migration by running `yarn create-migration`, which will generate a
  directory in `./fauna/migrations` which needs to be included in pul request.

[fauna-schema-migrate]: https://github.com/fauna-labs/fauna-schema-migrate
[erc-721]: https://eips.ethereum.org/EIPS/eip-721
[nft.storage]: https://nft.storage/
[eip721-subgraph]: https://thegraph.com/explorer/subgraph/nftstorage/eip721-subgraph
[fauna db]: https://fauna.com/
