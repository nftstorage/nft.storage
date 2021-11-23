DROP FUNCTION IF EXISTS get_unprocessed_tokens_in_queue();
CREATE OR REPLACE FUNCTION get_unprocessed_tokens_in_queue()
  RETURNS SETOF erc721_token_ingestion_queue
  AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM erc721_token_ingestion_queue
  WHERE last_processed
  IS null;
END $$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS ingest_unprocessed_tokens();
CREATE OR REPLACE FUNCTION ingest_unprocessed_tokens()
  RETURNS void
  AS $$
DECLARE
  r record;
BEGIN
  FOR r IN SELECT * FROM erc721_token_ingestion_queue WHERE last_processed IS null LOOP
     UPDATE erc721_token_ingestion_queue
     SET last_processed = now()
     WHERE id = r.id;
     PERFORM public.ingest_erc721_token(
      r.id,
      r.token_id,
      r.token_uri,
      r.mint_time,
      r.contract_id,
      r.contract_name,
      r.contract_symbol,
      r.contract_supports_eip721_metadata,
      r.block_hash,
      r.block_number,
      r.owner_id,
      r.updated_at
     );
  END LOOP;
  RETURN;
END $$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS nullify_last_processed_ingest_queue();
CREATE OR REPLACE FUNCTION nullify_last_processed_ingest_queue()
  RETURNS void
  AS $$
BEGIN
  UPDATE erc721_token_ingestion_queue
  SET last_processed = null;
END $$ LANGUAGE plpgsql;