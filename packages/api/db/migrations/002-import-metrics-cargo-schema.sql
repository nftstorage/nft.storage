-- Import dag cargo schema
IMPORT FOREIGN SCHEMA cargo
    LIMIT TO (metrics, metrics_log)
    FROM SERVER dag_cargo_server
    INTO cargo;