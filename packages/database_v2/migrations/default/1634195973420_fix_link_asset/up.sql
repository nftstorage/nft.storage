DROP FUNCTION link_nft_asset;
CREATE FUNCTION link_nft_asset (-- pk to identify the nft_asset
 token_uri_hash nft_asset.token_uri % TYPE,
 status_text nft_asset.status_text % TYPE,
 ipfs_url nft_asset.ipfs_url % TYPE,
 content_cid nft_asset.content_cid % TYPE,
 dag_size content.dag_size % TYPE,
 metadata nft_metadata.content % TYPE,
 resource_status resource.status % TYPE,
 resaurce_status_text resource.status_text % TYPE,
 pin_service pin_service DEFAULT 'IpfsCluster2'::pin_service
) RETURNS
SETOF nft_asset AS $$
DECLARE
  hash nft_asset.token_uri_hash % TYPE;
  asset_status_text nft_asset.status_text % TYPE;
  asset_ipfs_url nft_asset.ipfs_url % TYPE;
  cid nft_metadata.content_cid % TYPE;
  existing_cid resource.cid % TYPE;
  image_uri resource .uri % TYPE;
  image_uri_hash nft_metadata.image_uri_hash % TYPE;
BEGIN
  hash := token_uri_hash;
  asset_status_text := status_text;
  asset_ipfs_url := ipfs_url;
  cid := content_cid;
  existing_cid := null

-- Ensure that there is a matching nft_asset to begin with, crash if there
-- is not.
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

SELECT resource.content_cid into existing_cid FROM resource;
IF NOT FOUND THEN
 -- insert
IF existing_cid = cid OR existing_cid IS NULL THEN
  INSERT INTO
    resource (
      uri,
      status,
      status_text,
      ipfs_url,
      content_cid
    ) 
    VALUES (
      SELECT token_uri FROM nft_asset WHERE token_uri_hash = hash,
      resource_status,
      resource_status_text,
      asset_ipfs_url,
      cid
    )
    ON CONFLICT ON CONSTRAINT resource_pkey DO
    UPDATE
    SET
      updated_at = EXCLUDED.updated_at,
      status = merge_resource_status(status, resource_status),
      status_text = merge_resource_status_text(status, resource_status, status_text, resource_status_text);
  )

-- If resource is linked create record for it but only unless
IF resource_status = 'ContentLinked' THEN
--   INSERT INTO resource (
--     uri,
--     status,
--     status_text,
--     ipfs_url,
--     content_cid
--   )
--   SELECT
--     token_uri as uri
--     resource_status as status,
--     resource_status_text as status_text,
--     asset_ipfs_url as ipfs_url,
--     cid as content_cid
--   FROM
--     nft_asset
--   WHERE
--     token_uri_hash = hash
-- ON CONFLICT ON CONSTRAINT resource_pkey DO
-- UPDATE
-- SET
--   updated_at = EXCLUDED.updated_at
--   content_cid = EXCLUDED.content_cid
--   status = EXCLUDED.status
--   status_text = EXCLUDED.status_text
--   ipfs_url = EXCLUDED.ipfs_url
-- WHERE
--   content_cid IS NOT NULL OR content_cid = CID
ELSE
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
      (SELECT token_uri FROM nft_asset WHERE token_uri_hash = hash),
      'Queued',
      '',
      ipfs_url,
      cid
    ) ON CONFLICT ON CONSTRAINT resource_pkey DO
  UPDATE
  SET
    updated_at = EXCLUDED.updated_at
END IF;

-- Create content record unless already exists.
INSERT INTO
  content (cid, dag_size)
VALUES
  (cid, dag_size) ON CONFLICT ON CONSTRAINT content_pkey DO
UPDATE
SET
  updated_at = EXCLUDED.updated_at;

-- Create a pin record for the content unless already exists.
INSERT INTO
  pin (content_cid, service, status)
VALUES
  (cid, pin_service, 'PinQueued')
ON CONFLICT ON CONSTRAINT pin_content_cid_service_key DO
UPDATE
SET
  updated_at = EXCLUDED.updated_at;
  

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
