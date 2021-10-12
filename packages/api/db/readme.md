# Schema

[![nft.storage schema](https://bafybeicyzqvvloqvxcscifhmohzjnd6uelcwxcjihrjo3hjahyexlz22ma.ipfs.dweb.link/schema-diagram.png)](https://bafybeicyzqvvloqvxcscifhmohzjnd6uelcwxcjihrjo3hjahyexlz22ma.ipfs.dweb.link/schema-diagram.png)

# Config `psql`

```bash
brew install postgres
# find the service file
echo `pg_config --sysconfdir`/pg_service.conf

# create the above path if it doesn't exist and write your aliases in it

[nft.storage]
host=db.nft.storage
user=postgres
dbname=postgres
port=5432
password=secret-password

[local]
host=localhost
user=postgres
dbname=postgres
port=5432
password=postgres

# then you can
pg_dump service=nft.storage -n public -s > dump.sql
psql service=nft.storage -f tables.sql
psql service=nft.storage -f reset.sql

```

# Local env

```bash
npx supabase init
npx supabase start

psql service=local -f tables.sql
psql service=local -f functions.sql
```

# Migration

```bash
# From packages/api run the following

# 0. Drop local postgres start a clean one
./scripts/cli.js db --clean
./scripts/cli.js db --start
./scripts/cli.js db-sql --cargo --testing
# From packages/tools run `node cf-sync/cli2.js`
# 1. run Sync users and Sync users data           35s
# 2. run Validate nft data structure              3m55s
# 3. run Push to DB
# 4. run Sync users again and Push to DB just users
# 5. run Push events to DB
# 6. dump local psql to file
pg_dump "service=local" --data-only > dump.sql
# 7. clean target DB staging or production !!CHECK .env FILES!!!
NODE_TLS_REJECT_UNAUTHORIZED=0 ./scripts/cli.js db-sql --reset --cargo --testing
# 8. import dump to target DB
psql "service=nft-staging" < dump.sql
```
