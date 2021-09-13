CREATE EXTENSION IF NOT EXISTS postgres_fdw;

CREATE SERVER dagcargo
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS (host '{CARGO_HOST}', port '5432', dbname '{CARGO_DB_NAME}', fetch_size '50000');

CREATE USER MAPPING FOR {DB_USER}
  SERVER dagcargo
  OPTIONS (user '{CARGO_USER}', password '{CARGO_PASSWORD}');

-- Import foreign data into the cargo schema, create materialized views in
-- public schema.
CREATE SCHEMA cargo;

IMPORT FOREIGN SCHEMA cargo
  LIMIT TO (deals, aggregates, aggregate_entries)
  FROM SERVER dagcargo
  INTO cargo;

-- Singular table names to retain consistency with our schema.
CREATE MATERIALIZED VIEW public.deal
    AS SELECT * FROM cargo.deals

CREATE MATERIALIZED VIEW public.aggregate
    AS SELECT * FROM cargo.aggregates

CREATE MATERIALIZED VIEW public.aggregate_entry
    AS SELECT * FROM cargo.aggregate_entries

-- -- Later:
-- REFRESH MATERIALIZED VIEW public.deal
-- REFRESH MATERIALIZED VIEW public.aggregate
-- REFRESH MATERIALIZED VIEW public.aggregate_entry
