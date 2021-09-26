-- Add token_uri_hash field
ALTER TABLE other_nft_resources
    ADD COLUMN resource_uri_hash bytea;

-- Populate column with hashes
UPDATE other_nft_resources
    SET resource_uri_hash = sha256(resource_uri::bytea);

-- Make token_uri_hash non-nullable.
ALTER TABLE other_nft_resources
    ALTER COLUMN resource_uri_hash SET NOT NULL;
