-- Remove primary key constrain first
ALTER TABLE other_nft_resources
    DROP CONSTRAINT other_nft_resources_pkey;

-- Add primary key constraint to use new column
ALTER TABLE other_nft_resources
    ADD CONSTRAINT other_nft_resources_pkey PRIMARY KEY (resource_uri_hash, content_cid);

-- Drop the old column
ALTER TABLE other_nft_resources
   DROP COLUMN resource_uri;
