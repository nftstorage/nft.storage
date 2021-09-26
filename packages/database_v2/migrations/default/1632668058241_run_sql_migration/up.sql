-- Make image_uri_hash non-nullable.
ALTER TABLE nft_metadata
    ALTER COLUMN image_uri_hash SET NOT NULL;
