
-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- -- Remove primary key constrain first
-- ALTER TABLE other_nft_resources
--     DROP CONSTRAINT other_nft_resources_pkey;
--
-- -- Add primary key constraint to use new column
-- ALTER TABLE other_nft_resources
--     ADD CONSTRAINT other_nft_resources_pkey PRIMARY KEY (resource_uri_hash, content_cid);
--
-- -- Drop the old column
-- ALTER TABLE other_nft_resources
--    DROP COLUMN resource_uri;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- -- Add token_uri_hash field
-- ALTER TABLE other_nft_resources
--     ADD COLUMN resource_uri_hash bytea;
--
-- -- Populate column with hashes
-- UPDATE other_nft_resources
--     SET resource_uri_hash = sha256(resource_uri::bytea);
--
-- -- Make token_uri_hash non-nullable.
-- ALTER TABLE other_nft_resources
--     ALTER COLUMN resource_uri_hash SET NOT NULL;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- -- Make image_uri_hash non-nullable.
-- ALTER TABLE nft_metadata
--     ALTER COLUMN image_uri_hash SET NOT NULL;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- -- Add image_uri_hash field
-- ALTER TABLE nft_metadata
--     ADD COLUMN image_uri_hash bytea;
--
-- -- Populate column with hashes
-- UPDATE nft_metadata
--     SET image_uri_hash = sha256(image_uri::bytea);
--
-- -- Drop the image_uri field
-- ALTER TABLE nft_metadata
--     DROP COLUMN image_uri;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- ALTER TABLE resource
--     ALTER COLUMN uri_hash SET NOT NULL;

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- -- Create a derived column
-- ALTER TABLE resource
--     ADD COLUMN uri_hash bytea
--     GENERATED ALWAYS AS (sha256(uri::bytea))
--     STORED;
--
-- -- Remove primary key constraint
-- ALTER TABLE resource
--     DROP CONSTRAINT resource_pkey;
--
-- -- Add primary key constraint to new column
-- ALTER TABLE resource
--     ADD CONSTRAINT resource_pkey PRIMARY KEY (uri_hash);

-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- -- Add token_uri_hash field
-- ALTER TABLE nft
--     ADD COLUMN token_uri_hash bytea;
--
-- -- Populate column with hashes
-- UPDATE nft
--     SET token_uri_hash = sha256(token_uri::bytea);
--
-- -- Make token_uri_hash non-nullable.
-- ALTER TABLE nft
--     ALTER COLUMN token_uri_hash SET NOT NULL;
--
-- -- Remove source column
-- ALTER TABLE nft
--     DROP COLUMN token_uri;

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
