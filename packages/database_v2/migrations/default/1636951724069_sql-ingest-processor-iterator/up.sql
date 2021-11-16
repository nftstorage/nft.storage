CREATE OR REPLACE FUNCTION get_unprocessed_tokens_in_queue()
RETURNS SETOF erc721_token_ingestion_queue AS $$
    SELECT *
    FROM erc721_token_ingestion_queue
    WHERE last_processed
    IS null
    -- LIMIT 10
$$ LANGUAGE sql STABLE;