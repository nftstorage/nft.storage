DROP FUNCTION IF EXISTS get_unprocessed_tokens_in_queue();
DROP FUNCTION IF EXISTS get_unprocessed_tokens_in_queue(batch int);
DROP FUNCTION IF EXISTS ingest_unprocessed_tokens();

CREATE OR REPLACE FUNCTION get_unprocessed_tokens_in_queue(batch int)
  RETURNS SETOF erc721_token_ingestion_queue
  AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM erc721_token_ingestion_queue
  WHERE last_processed
  IS null
  LIMIT batch;
END $$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION ingest_unprocessed_tokens()
  RETURNS int
  AS $$
DECLARE
  r record;
  unprocessed_total integer;
  batch_size integer :=100;
BEGIN

    SELECT COUNT(*) 
      FROM erc721_token_ingestion_queue 
      WHERE last_processed 
      IS NULL
      INTO unprocessed_total;
  
    WHILE (unprocessed_total > 0) LOOP
  
    FOR r IN SELECT * FROM get_unprocessed_tokens_in_queue(batch_size) LOOP
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
    
    unprocessed_total := unprocessed_total - batch_size;
  END LOOP;
  RETURN unprocessed_total;
END $$ LANGUAGE plpgsql;