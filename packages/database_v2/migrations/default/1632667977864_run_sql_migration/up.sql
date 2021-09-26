-- Add image_uri_hash field
ALTER TABLE nft_metadata
    ADD COLUMN image_uri_hash bytea;

-- Populate column with hashes
UPDATE nft_metadata
    SET image_uri_hash = sha256(image_uri::bytea);
    
-- Drop the image_uri field
ALTER TABLE nft_metadata
    DROP COLUMN image_uri;
