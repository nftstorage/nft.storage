-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- BEGIN TRANSACTION;

-- --- NFT Asset

-- -- Create a derived column
-- ALTER TABLE nft_asset
--     ADD COLUMN token_uri_hash bytea
--     GENERATED ALWAYS AS (sha256(token_uri::bytea))
--     STORED;

-- -- Remove primary key constraint
-- ALTER TABLE nft_asset
--     DROP CONSTRAINT nft_asset_pkey;

-- -- Add primary key constraint to new column
-- ALTER TABLE nft_asset
--     ADD CONSTRAINT nft_asset_pkey PRIMARY KEY (token_uri_hash);


-- --- NFT

-- -- Add token_uri_hash field
-- ALTER TABLE nft
--     ADD COLUMN token_uri_hash bytea;

-- -- Populate column with hashes
-- UPDATE nft
--     SET token_uri_hash = sha256(token_uri::bytea);

-- -- Make token_uri_hash non-nullable.
-- ALTER TABLE nft
--     ALTER COLUMN token_uri_hash SET NOT NULL;

-- -- Remove source column
-- ALTER TABLE nft
--     DROP COLUMN token_uri;



-- COMMIT TRANSACTION;
