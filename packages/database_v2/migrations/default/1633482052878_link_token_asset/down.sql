ALTER TABLE
  nft_metadata
ALTER COLUMN
  "name"
SET
  NOT NULL;

ALTER TABLE
  nft_metadata
ALTER COLUMN
  "description"
SET
  NOT NULL;

ALTER TABLE
  nft_metadata
ALTER COLUMN
  "image_uri_hash"
SET
  NOT NULL;

DROP FUNCTION link_nft_asset;

DROP FUNCTION fail_nft_asset;
