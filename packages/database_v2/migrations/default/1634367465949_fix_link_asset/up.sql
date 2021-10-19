-- Rename content_cid columns to metadata_cid

ALTER TABLE nft_metadata RENAME COLUMN content_cid TO cid;


ALTER TABLE nft_asset RENAME COLUMN content_cid to metadata_cid;


ALTER TABLE other_nft_resources RENAME COLUMN content_cid to metadata_cid;


DROP FUNCTION link_nft_asset;


CREATE OR REPLACE FUNCTION queue_resource (--
 uri resource.uri % TYPE, --
 ipfs_url resource.ipfs_url % TYPE DEFAULT NULL, --
 content_cid resource.content_cid % TYPE DEFAULT NULL) RETURNS
SETOF resource AS $$
DECLARE
  hash resource.uri_hash % TYPE;
BEGIN

  INSERT INTO resource ( uri,
                        status,
                        status_text,
                        ipfs_url,
                        content_cid )
  VALUES ( uri,
          'Queued',
          '',
          ipfs_url,
          content_cid) ON CONFLICT ON CONSTRAINT resource_pkey DO
  UPDATE
    SET updated_at = EXCLUDED.updated_at
    RETURNING resource .uri_hash INTO hash;

  RETURN QUERY
    SELECT *
    FROM resource
    WHERE resource.uri_hash = hash;
END;
$$ LANGUAGE plpgsql;


CREATE FUNCTION parse_nft_asset (-- pk to identify the nft_asset
 token_uri_hash nft_asset.token_uri % TYPE, --
 status nft_asset.status % TYPE, --
 status_text nft_asset.status_text % TYPE, --
 ipfs_url nft_asset.ipfs_url % TYPE, --
 metadata_cid nft_asset.metadata_cid % TYPE, --
 dag_size content.dag_size % TYPE, --
 metadata nft_metadata.content % TYPE) RETURNS
SETOF nft_asset AS $$
DECLARE
  hash nft_asset.token_uri_hash % TYPE;
  new_status nft_asset.status % TYPE;
  new_status_text nft_asset.status_text % TYPE;
  new_ipfs_url nft_asset.ipfs_url % TYPE;
  cid nft_asset.metadata_cid % TYPE;
  image_uri resource .uri % TYPE;
  image_uri_hash nft_metadata.image_uri_hash % TYPE;
BEGIN
  hash := token_uri_hash;
  new_status := status;
  new_status_text := status_text;
  new_ipfs_url := ipfs_url;
  cid := metadata_cid;
  image_uri_hash := NULL;

  -- Ensure that there is a matching nft_asset to begin with, crash if there
  -- is not.
  IF NOT EXISTS (SELECT FROM nft_asset WHERE nft_asset.token_uri_hash = hash ) THEN
    RAISE EXCEPTION 'nft asset with token_uri_hash % not found ', hash;
  END IF; -- Now create a resource associated with an image and capture
   -- it's uri_hash.
  image_uri := metadata ->> 'image';
  IF image_uri IS NOT NULL THEN
    SELECT uri_hash
    INTO image_uri_hash
    FROM queue_resource(image_uri, status_text);
  END IF;
  
  -- Create metadata content record unless already exists.
  INSERT INTO content (cid, dag_size)
  VALUES (cid, dag_size)
  ON CONFLICT ON CONSTRAINT content_pkey DO
  UPDATE
    SET updated_at = EXCLUDED.updated_at;

  -- Now store nft_metadata or just update the updated_at, everything else 
  -- supposed to be immutable.
  
  INSERT INTO nft_metadata (cid, name, description, image_uri_hash, content)
  VALUES (cid, 
          metadata ->> 'name', 
          metadata ->> 'description', 
          image_uri_hash, 
          metadata)
  ON CONFLICT ON CONSTRAINT nft_metadata_pkey DO
  UPDATE
    SET updated_at = EXCLUDED.updated_at;
    
  -- Next update an nft_asset itself.
 
  UPDATE nft_asset
    SET status = new_status, 
        status_text = new_status_text, 
        ipfs_url = new_ipfs_url, 
        metadata_cid = cid, 
        updated_at = timezone('utc' :: text, now())
  WHERE
    nft_asset.token_uri_hash = hash;

  RETURN QUERY
    SELECT * FROM nft_asset
    WHERE nft_asset.token_uri_hash = hash;
END;
$$ LANGUAGE plpgsql;

