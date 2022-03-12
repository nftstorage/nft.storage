CREATE
EXTENSION IF NOT EXISTS postgres_fdw;

DROP
SERVER IF EXISTS dag_cargo_server CASCADE;

CREATE
SERVER dag_cargo_server
  FOREIGN DATA WRAPPER postgres_fdw
  OPTIONS ( 
      host :'DAG_CARGO_HOST', 
      dbname :'DAG_CARGO_DATABASE', 
      fetch_size '200000'
      );

CREATE
USER MAPPING FOR :NFT_STORAGE_USER
  SERVER dag_cargo_server
  OPTIONS (
      user :'DAG_CARGO_USER', 
      password :'DAG_CARGO_PASSWORD'
    );

CREATE
USER MAPPING FOR :NFT_STORAGE_STATS_USER
  SERVER dag_cargo_server
  OPTIONS (
      user :'DAG_CARGO_USER', 
      password :'DAG_CARGO_PASSWORD'
    );
