FROM supabase/postgres:13.3.0

COPY 00-initial-schema.sql /docker-entrypoint-initdb.d/00-initial-schema.sql

# Run time values
ENV POSTGRES_DB=postgres
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_PORT=5432

EXPOSE 5432

# Enables cat /var/lib/postgresql/data/pg_log/postgresql.log within the container to debug queries
CMD ["postgres", "-c", "wal_level=logical", "-c", "log_statement=all", "-c", "pg_stat_statements.track=all"]