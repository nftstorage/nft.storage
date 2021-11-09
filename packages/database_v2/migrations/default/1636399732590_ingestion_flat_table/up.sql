CREATE TABLE IF NOT EXISTS erc721_token_ingestion_queue(
  id TEXT CONSTRAINT erc721_token_ingestion_queue_pkey PRIMARY KEY,
  token_id TEXT,
  token_uri TEXT,
  mint_time TIMESTAMP WITH TIME ZONE,
  contract_id TEXT,
  contract_name TEXT,
  contract_symbol TEXT,
  contract_supports_eip721_metadata boolean,
  block_hash TEXT,
  block_number BIGINT,
  owner_id TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc' :: TEXT, now()),
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc' :: TEXT, now())
);


ALTER TABLE erc721_token_ingestion_queue SET UNLOGGED;

COMMENT ON TABLE erc721_token_ingestion_queue
IS E'Unlogged Table for quickly writing records from the Etherium Blockchain'