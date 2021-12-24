-- Rename content_cid columns to metadata_cid

ALTER TABLE nft_metadata RENAME COLUMN cid TO content_cid;


ALTER TABLE nft_asset RENAME COLUMN metadata_cid to content_cid;


ALTER TABLE other_nft_resources RENAME COLUMN metadata_cid to content_cid;

-- Rename column content to json

ALTER table nft_metadata RENAME COLUMN json to content;


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


CREATE OR REPLACE FUNCTION ingest_erc721_token (-- Unique token identifier
 id nft.id % TYPE, -- ERC721 tokenID (unique within a contract space)
 token_id nft.token_id % TYPE, -- ERC721 tokenURI
 token_uri nft_asset.token_uri % TYPE, -- ERC721 mintTime
 mint_time nft.mint_time % TYPE, -- NFT Contract
 contract_id nft.contract_id % TYPE, contract_name blockchain_contract.name % TYPE, contract_symbol blockchain_contract.symbol % TYPE, contract_supports_eip721_metadata blockchain_contract.supports_eip721_metadata % TYPE, -- Block
 block_hash blockchain_block.hash % TYPE, block_number blockchain_block.number % TYPE, -- Owner
 owner_id nft_ownership.owner_id % TYPE, -- Timestamps
 updated_at nft.updated_at % TYPE DEFAULT timezone('utc'::text, now()), inserted_at nft.inserted_at % TYPE DEFAULT timezone('utc'::text, now())) RETURNS
SETOF nft AS $$
DECLARE
  token_uri_hash nft.token_uri_hash % TYPE;
  nft_id nft.id % TYPE;
BEGIN
  nft_id := id;
  -- Create a corresponding token_asset record. If one already
  -- exists just update it's `update_at` timestamp.
  INSERT INTO nft_asset (token_uri, ipfs_url, content_cid, status, status_text)
    VALUES (token_uri, NULL, NULL, 'Queued', '')
  ON CONFLICT ON CONSTRAINT nft_asset_pkey
    DO UPDATE SET
      updated_at = EXCLUDED.updated_at
    RETURNING
      nft_asset.token_uri_hash INTO token_uri_hash;
  -- Record the block information if already exists just update the timestamp.
  INSERT INTO blockchain_block (hash, number)
    VALUES (block_hash, block_number)
  ON CONFLICT ON CONSTRAINT blockchain_block_pkey
    DO UPDATE SET
      updated_at = EXCLUDED.updated_at;
  -- Record contract information if already exists just update
  -- the date.
  INSERT INTO blockchain_contract (id, name, symbol, supports_eip721_metadata)
    VALUES (contract_id, contract_name, contract_symbol, contract_supports_eip721_metadata)
  ON CONFLICT ON CONSTRAINT blockchain_contract_pkey
    DO UPDATE SET
      updated_at = EXCLUDED.updated_at;
  -- Record owner information
  INSERT INTO nft_ownership (nft_id, owner_id, block_number)
    VALUES (nft_id, owner_id, block_number)
  ON CONFLICT ON CONSTRAINT nft_ownership_pkey
    DO UPDATE SET
      updated_at = EXCLUDED.updated_at;
  -- Record nft
  INSERT INTO nft (id, token_id, token_uri_hash, mint_time, contract_id, nft_owner_id)
    VALUES (nft_id, token_id, token_uri_hash, mint_time, contract_id, owner_id)
  ON CONFLICT ON CONSTRAINT nft_pkey
    DO UPDATE SET
      updated_at = EXCLUDED.updated_at, nft_owner_id = EXCLUDED.nft_owner_id;
  -- Record nft to block association
  INSERT INTO nfts_by_blockchain_blocks (blockchain_block_hash, nft_id)
    VALUES (block_hash, nft_id)
  ON CONFLICT ON CONSTRAINT nfts_by_blockchain_blocks_pkey
    DO UPDATE SET
      updated_at = EXCLUDED.updated_at;
  RETURN QUERY
  SELECT
    *
  FROM
    nft
  WHERE
    nft.id = nft_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION link_nft_resource (-- CID of the metadata
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


CREATE FUNCTION link_resource_content (--
 uri_hash resource .uri_hash % TYPE,--
 ipfs_url resource .ipfs_url % TYPE,--
 dag_size content.dag_size % TYPE, -- Unlike resource table here we require following
 -- two columns
 cid TEXT, --
 status_text TEXT, -- BY default use niftysave cluster
 pin_service pin.service % TYPE DEFAULT 'IpfsCluster2') RETURNS
SETOF resource AS $$
DECLARE
  hash resource .uri_hash % TYPE;
  resource_ipfs_url resource .ipfs_url % TYPE;
  pin_id pin.id % TYPE;
  status_message resource.status_text % TYPE;
BEGIN
  hash := uri_hash;
  resource_ipfs_url := ipfs_url;
  status_message := status_text;

  -- Ensure that non `ContentLinked` resource with this hash exists.
  IF NOT EXISTS (
    SELECT
    FROM
      resource
    WHERE
      resource .uri_hash = hash
  ) THEN RAISE
  EXCEPTION
    'resource with uri_hash % does not exists',
    hash;
  END IF;

  -- Create a pin record for the content unless already exists.
  INSERT INTO
    pin (content_cid, service, status)
  VALUES
    (cid, pin_service, 'PinQueued')
  ON CONFLICT
  ON CONSTRAINT pin_content_cid_service_key DO
    UPDATE
    SET
      updated_at = EXCLUDED.updated_at --
      -- Capture pin.id
      RETURNING pin.id INTO pin_id;

  -- Create content record for the resource unless already exists.
  INSERT INTO
    content (cid, dag_size)
  VALUES
    (cid, dag_size)
  ON CONFLICT
  ON CONSTRAINT content_pkey DO
  UPDATE
  SET
    updated_at = EXCLUDED.updated_at;

  UPDATE
    resource
  SET
    status = 'ContentLinked',
    status_text = status_message,
    ipfs_url = resource_ipfs_url,
    content_cid = cid,
    updated_at = timezone('utc' :: text, now())
  WHERE
    resource.uri_hash = hash;

  RETURN QUERY
  SELECT
    *
  FROM
    resource
  WHERE
    resource .uri_hash = hash;
END;
$$ LANGUAGE plpgsql;


DROP FUNCTION queue_resource;


DROP FUNCTION parse_nft_asset;

