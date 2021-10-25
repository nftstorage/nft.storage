# Schema

[![nft.storage schema](https://ipfs.io/ipfs/bafybeiaykyqk6vroa7my2cqm7jnby3p5jd2dwlb3scnu4d2qlcusadla6q/nft.storage-db-diagram.png)](https://dbdiagram.io/d/615d7356940c4c4eec87e2be)

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
# sync users and nft keys 2h41m
# sync nft data 8h14m
pg_dump "service=local" --data-only > dump.sql
NODE_TLS_REJECT_UNAUTHORIZED=0 ./scripts/cli.js db-sql --reset --cargo --testing
psql "service=nft-staging" < dump.sql
```
