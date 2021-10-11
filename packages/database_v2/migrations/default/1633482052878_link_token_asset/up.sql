-- Update nft_metadata table adding content field
-- and removing not-null constraints.

ALTER TABLE nft_metadata
ALTER COLUMN "name"
DROP NOT NULL;


ALTER TABLE nft_metadata
ALTER COLUMN "description"
DROP NOT NULL;


ALTER TABLE nft_metadata
ALTER COLUMN "image_uri_hash"
DROP NOT NULL;


CREATE FUNCTION link_nft_asset (-- pk to identify the nft_asset
 token_uri_hash nft_asset.token_uri % TYPE, status_text nft_asset.status_text % TYPE, ipfs_url nft_asset.ipfs_url % TYPE, content_cid nft_asset.content_cid % TYPE, metadata nft_metadata.content % TYPE) RETURNS
SETOF nft_asset AS $$
DECLARE
  hash nft_asset.token_uri_hash % TYPE;
  asset_status_text nft_asset.status_text % TYPE;
  asset_ipfs_url nft_asset.ipfs_url % TYPE;
  cid nft_metadata.content_cid % TYPE;
  image_uri resource .uri % TYPE;
  image_uri_hash nft_metadata.image_uri_hash % TYPE;
BEGIN
  hash := token_uri_hash;
  asset_status_text := status_text;
  asset_ipfs_url := ipfs_url;
  cid := content_cid;

-- Ensure that there is a matching record to begin with.
IF NOT EXISTS (
  SELECT
  FROM
    nft_asset
  WHERE
    nft_asset.token_uri_hash = hash
) THEN RAISE
EXCEPTION
  'nft asset with token_uri_hash % not found ',
  hash;

END IF;

-- Now create a resource associated with an image and capture
-- it's uri_hash.
image_uri := metadata ->> 'image';

IF image_uri IS NOT NULL THEN
INSERT INTO
  resource (
    uri,
    status,
    status_text,
    ipfs_url,
    content_cid
  )
VALUES
  (
    image_uri,
    'Queued',
    '',
    NULL,
    NULL
  ) ON CONFLICT ON CONSTRAINT resource_pkey DO
UPDATE
SET
  updated_at = EXCLUDED.updated_at RETURNING resource .uri_hash INTO image_uri_hash;

END IF;

-- Now store nft_metadata or just update the updated_at, everything else 
-- supposed to be immutable.
INSERT INTO
  nft_metadata (
    content_cid,
    name,
    description,
    image_uri_hash,
    content
  )
VALUES
  (
    content_cid,
    metadata ->> 'name',
    metadata ->> 'description',
    image_uri_hash,
    metadata
  ) ON CONFLICT ON CONSTRAINT nft_metadata_pkey DO
UPDATE
SET
  updated_at = EXCLUDED.updated_at;

-- Next update an nft_asset itself.
UPDATE
  nft_asset
SET
  status = 'Linked',
  status_text = asset_status_text,
  ipfs_url = asset_ipfs_url,
  content_cid = cid,
  updated_at = timezone('utc' :: text, now())
WHERE
  nft_asset.token_uri_hash = hash;

RETURN QUERY
SELECT
  *
FROM
  nft_asset
WHERE
  nft_asset.token_uri_hash = hash;

END;

$$ LANGUAGE plpgsql;


CREATE FUNCTION fail_nft_asset (-- pk to identify the nft_asset
 token_uri_hash nft_asset.token_uri % TYPE, status nft_asset.status % TYPE, status_text nft_asset.status_text % TYPE, ipfs_url nft_asset.ipfs_url % TYPE DEFAULT NULL) RETURNS
SETOF nft_asset AS $$
DECLARE
  hash nft_asset.token_uri_hash % TYPE;

asset_status nft_asset.status % TYPE;

asset_status_text nft_asset.status_text % TYPE;

asset_ipfs_url nft_asset.ipfs_url % TYPE;

BEGIN
  hash := token_uri_hash;

asset_status := status;

asset_status_text := status_text;

asset_ipfs_url := ipfs_url;

-- Ensure that there is a matching record to begin with.
IF NOT EXISTS (
  SELECT
  FROM
    nft_asset
  WHERE
    nft_asset.token_uri_hash = hash
    AND nft_asset.status != 'Linked'
) THEN RAISE
EXCEPTION
  'nft asset with token_uri_hash % not found, or it is linked',
  hash;

END IF;

UPDATE
  nft_asset
SET
  status = asset_status,
  status_text = asset_status_text,
  ipfs_url = asset_ipfs_url,
  updated_at = timezone('utc' :: text, now())
WHERE
  nft_asset.token_uri_hash = hash;

RETURN QUERY
SELECT
  *
FROM
  nft_asset
WHERE
  nft_asset.token_uri_hash = hash;

END;

$$ LANGUAGE plpgsql;

--
-- Function can be used to link resource found in nft metadata with it.
-- It takes care of creating necessary resource record before creating
-- link between metadata and a resource.

CREATE FUNCTION link_nft_resource (-- CID of the metadata
 cid nft_metadata.content_cid % TYPE, -- Resource uri found in metadata.
 uri resource .uri % TYPE) RETURNS
SETOF resource AS $$
DECLARE
  hash resource .uri_hash % TYPE;

BEGIN
  -- Create a corresponding resource record
  INSERT INTO
    Resource (
      uri,
      status,
      status_text,
      ipfs_url,
      content_cid
    )
  VALUES
    (uri, 'Queued', '', NULL, NULL) --
    -- If record for this uri_hash exists
    ON CONFLICT ON CONSTRAINT resource_pkey DO
  UPDATE
    -- update the `update_at` date
  SET
    updated_at = EXCLUDED.updated_at --
    -- and save the `uri_hash`
    RETURNING resource .uri_hash INTO hash;

-- Then link nft metadata to a corresponding resource
INSERT INTO
  other_nft_resources (content_cid, resource_uri_hash)
VALUES
  (cid, hash) --
  -- If association already exists
  ON CONFLICT ON CONSTRAINT other_nft_resources_pkey DO
UPDATE
  -- just update the `updated_at` timestamp
SET
  updated_at = EXCLUDED.updated_at;

RETURN QUERY
SELECT
  *
FROM
  resource
WHERE
  resource .uri_hash = hash;

END;

$$ LANGUAGE plpgsql;

