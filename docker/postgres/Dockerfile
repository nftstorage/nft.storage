FROM supabase/postgres:12.5.0

COPY ./docker/postgres/00-initial-schema.sql /docker-entrypoint-initdb.d/00-initial-schema.sql
COPY ./packages/api/db/config.sql /docker-entrypoint-initdb.d/01-config.sql
COPY ./packages/api/db/tables.sql /docker-entrypoint-initdb.d/02-tables.sql
COPY ./packages/api/db/cargo.testing.sql /docker-entrypoint-initdb.d/03-cargo.testing.sql
COPY ./packages/api/db/functions.sql /docker-entrypoint-initdb.d/04-functions.sql

EXPOSE 5432

# Enables cat /var/lib/postgresql/data/pg_log/postgresql.log within the container to debug queries
CMD ["postgres", "-c", "wal_level=logical", "-c", "log_statement=all", "-c", "pg_stat_statements.track=all"]