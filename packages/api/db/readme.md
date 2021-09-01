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

# then you can
pg_dump service=supabase -n public -s > dump.sql
psql service=supabase -f tables.sql
psql service=supabase -f reset.sql

```
