# Database V2

This directory containts files and configurations for managing:

1. (Postgres) Database schema
2. [hasura][] GraphQL Engine

## Contributing

#### Start Container

Local development is enabled through docker container with a postgres instance and hasura graphql engine. You can start it up and apply all the configuration / schema by runnig following command:

> ⚠️ You will need to [install docker](https://docs.docker.com/get-docker/) in your system.

```sh
yarn start
```

#### Console

Once docker container is running you can access local [hasura console](https://hasura.io/docs/latest/graphql/core/hasura-cli/hasura_console.html) by running following command

```sh
hasura console
```

### Might come handy

#### Initialize db from SQL

Originally we've initalized database from the `init-tables.sql` file with a database schema by running following command:

```sh
asura migrate create init --sql-from-file ./artifacts/init-tables.sql --database-name default
```

[hasura]: https://hasura.io
