DO
$do$
BEGIN
IF '${DAG_CARGO_TEST_MODE}' != 'true' THEN

-- Import dag cargo schema
IMPORT FOREIGN SCHEMA cargo
    LIMIT TO (metrics, metrics_log)
    FROM SERVER dag_cargo_server
    INTO cargo;

END IF;
END
$do$
