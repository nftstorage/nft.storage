DO
$do$
BEGIN
IF '${DAG_CARGO_TEST_MODE}' != 'true' THEN

CREATE SCHEMA IF NOT EXISTS cargo;

-- Import dag cargo schema
IMPORT FOREIGN SCHEMA cargo
    LIMIT TO (aggregate_entries, aggregates, deals, dags, metrics, metrics_log)
    FROM SERVER dag_cargo_server
    INTO cargo;

END IF;
END
$do$
