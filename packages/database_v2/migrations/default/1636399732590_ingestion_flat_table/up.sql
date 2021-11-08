CREATE TABLE IF NOT EXISTS erc721_token_ingestion_queue(
  id text,
  token_id text,
  token_uri text,
  mint_time timestamp with time zone,
  contract_id text,
  contract_name text,
  contract_symbol text,
  contract_supports_eip721_metadata boolean,
  block_hash text,
  block_number bigint,
  owner_id text,
  updated_at timestamp with time zone DEFAULT timezone('utc' :: text, now()),
  inserted_at timestamp with time zone DEFAULT timezone('utc' :: text, now()),
  PRIMARY KEY ("id")
);

ALTER TABLE "public"."erc721_token_ingestion_queue" SET UNLOGGED;
COMMENT ON TABLE "public"."erc721_token_ingestion_queue" IS E'Unlogged Table for quickly writing records from the Etherium Blockchain'