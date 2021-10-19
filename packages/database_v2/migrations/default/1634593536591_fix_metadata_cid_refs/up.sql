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
  INSERT INTO nft_asset (token_uri, ipfs_url, metadata_cid, status, status_text)
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

  -- Record nft
  INSERT INTO nft (id, token_id, token_uri_hash, mint_time, contract_id)
    VALUES (nft_id, token_id, token_uri_hash, mint_time, contract_id)
  ON CONFLICT ON CONSTRAINT nft_pkey
    DO UPDATE SET
      updated_at = EXCLUDED.updated_at;

  -- Record nft to block association
  INSERT INTO nfts_by_blockchain_blocks (blockchain_block_hash, nft_id)
    VALUES (block_hash, nft_id)
  ON CONFLICT ON CONSTRAINT nfts_by_blockchain_blocks_pkey
    DO UPDATE SET
      updated_at = EXCLUDED.updated_at;

  -- Record nft ownership information
  INSERT INTO nft_ownership (nft_id, owner_id, block_number)
    VALUES (nft_id, owner_id, block_number)
  ON CONFLICT ON CONSTRAINT nft_ownership_pkey
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
 cid nft_metadata.cid % TYPE, -- Resource uri found in metadata.
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
    other_nft_resources (metadata_cid, resource_uri_hash)
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


DROP FUNCTION parse_nft_asset;


CREATE OR REPLACE FUNCTION parse_nft_asset (-- pk to identify the nft_asset
 token_uri_hash nft_asset.token_uri % TYPE, --
 status nft_asset.status % TYPE, --
 status_text nft_asset.status_text % TYPE, --
 ipfs_url nft_asset.ipfs_url % TYPE, --
 metadata_cid nft_asset.metadata_cid % TYPE, --
 dag_size content.dag_size % TYPE, --
 metadata nft_metadata.json % TYPE) RETURNS
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
  
  INSERT INTO nft_metadata (cid, name, description, image_uri_hash, json)
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

