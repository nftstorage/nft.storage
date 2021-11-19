DROP FUNCTION IF EXISTS get_unprocessed_tokens_in_queue();
DROP FUNCTION IF EXISTS get_unprocessed_tokens_in_queue(batch int);

CREATE OR REPLACE FUNCTION get_unprocessed_tokens_in_queue(batch int)
  RETURNS SETOF erc721_token_ingestion_queue
  AS $$
BEGIN
  IF batch < 0 THEN
    RETURN QUERY
      SELECT *
      FROM erc721_token_ingestion_queue
      WHERE last_processed
      IS null;
    ELSE
      RETURN QUERY
        SELECT *
        FROM erc721_token_ingestion_queue
        WHERE last_processed
        IS null
        LIMIT batch;
  END IF;

END $$ LANGUAGE plpgsql;

DROP FUNCTION IF EXISTS ingest_unprocessed_tokens();
DROP FUNCTION IF EXISTS ingest_unprocessed_tokens(ingest_limit int);
DROP FUNCTION IF EXISTS ingest_unprocessed_tokens(ingest_limit int, batch_size int);
CREATE OR REPLACE FUNCTION ingest_unprocessed_tokens(ingest_limit int, batch_size int)
  RETURNS TABLE (
    affected_rows integer, 
    batches_run integer, 
    rows_left integer, 
    execution_time integer, 
    execution_time_per_row decimal
    )
  AS $$
DECLARE
  r record;
  unprocessed_total integer :=0;
  affected_rows integer := 0;
  affected_rows_in_batch integer := 0;
  batches_run integer := 0;
  rows_left integer :=0;
   _timing1  timestamptz;
   _start_ts timestamptz;
   _end_ts   timestamptz;
   _overhead numeric;     -- in ms
   _timing   numeric;     -- in ms
   _execution_time numeric;
   _execution_time_per_row numeric;
   
BEGIN

   _timing1  := clock_timestamp();
   _start_ts := clock_timestamp();
   _end_ts   := clock_timestamp();
   -- take minimum duration as conservative estimate
   _overhead := 1000 * extract(
        epoch FROM LEAST(_start_ts - _timing1, _end_ts - _start_ts)
    );
    
  _start_ts := clock_timestamp();
  IF ingest_limit > 0 THEN
    IF ingest_limit < batch_size THEN
      batch_size := ingest_limit;
    END IF;
  END IF;

  SELECT COUNT(*)
    FROM get_unprocessed_tokens_in_queue(ingest_limit)
    INTO unprocessed_total;

  WHILE (unprocessed_total > 0) LOOP
    WITH batch AS (
      SELECT * 
      FROM get_unprocessed_tokens_in_queue(batch_size)
    ), nfts AS (
      SELECT public.ingest_erc721_token(
        id,
        token_id,
        token_uri,
        mint_time,
        contract_id,
        contract_name,
        contract_symbol,
        contract_supports_eip721_metadata,
        block_hash,
        block_number,
        owner_id,
        updated_at
      ) FROM batch
    ), marked_processed AS (
      UPDATE erc721_token_ingestion_queue
      SET last_processed = now()
      FROM batch
      WHERE erc721_token_ingestion_queue.id = batch.id
      RETURNING *
    )
    SELECT COUNT(*) 
    FROM marked_processed 
    INTO affected_rows_in_batch;

    affected_rows := affected_rows + affected_rows_in_batch;
    batches_run := batches_run + 1;
    unprocessed_total := unprocessed_total - batch_size;
  END LOOP;
  
  _end_ts := clock_timestamp();
  
  SELECT COUNT(*)
    FROM get_unprocessed_tokens_in_queue(-1)
    INTO rows_left;
  
  CREATE TEMP TABLE readout (
    affected_rows integer, 
    batches_run integer,
    rows_left integer,
    execution_time integer,
    execution_time_per_row decimal
    );
  _execution_time := 1000 * (extract(epoch FROM _end_ts - _start_ts)) - _overhead;
  _execution_time_per_row = _execution_time::decimal / affected_rows::decimal;
  INSERT INTO readout (affected_rows, batches_run, rows_left, execution_time, execution_time_per_row)
    VALUES (affected_rows, batches_run, rows_left, _execution_time, _execution_time_per_row);
  RETURN QUERY SELECT * FROM readout;
  
END $$ LANGUAGE plpgsql;