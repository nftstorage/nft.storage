CREATE SCHEMA IF NOT EXISTS cargo;

-- Import dag cargo schema
IMPORT FOREIGN SCHEMA cargo
    LIMIT TO (aggregate_entries, aggregates, deals, dags)
    FROM SERVER dag_cargo_server
    INTO cargo;
