-- Add uniqueness constraint as that is the case in nft.storage and we don't
-- have a data here yet.

ALTER TABLE pin ADD CONSTRAINT pin_content_cid_service_key UNIQUE (content_cid,
                                                                   service);

-- Add aditional value used as per
-- https://github.com/ipfs-shipyard/nft.storage/blob/08654e9e950c4784746ab23873bfe2afe835c3fb/packages/api/db/tables.sql#L21

ALTER TYPE pin_service ADD VALUE 'IpfsCluster2';

-- Create pin records for all the content we have

INSERT INTO pin (content_cid, service, status)
  (SELECT cid as content_cid,
          'IpfsCluster2' as service,
          'PinQueued' as status
   FROM content) ON CONFLICT ON CONSTRAINT pin_content_cid_service_key DO
UPDATE
SET updated_at = EXCLUDED.updated_at;

-- Function updates state of the resource to `ContentLinked`.
-- It also creates corresponding entries in content and pin
-- tables unless they already exist.

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

-- Function updates state of the resource to `*Failed`.

CREATE FUNCTION fail_resource (--
 uri_hash resource .uri_hash % TYPE,--
 ipfs_url resource .ipfs_url % TYPE,--
 status resource.status % TYPE, --
 status_text TEXT -- BY default use niftysave cluster
) RETURNS
SETOF resource AS $$
DECLARE
  hash resource .uri_hash % TYPE;
  new_status resource.status % TYPE;
  new_status_text resource.status_text % TYPE;
  new_ipfs_url resource.ipfs_url % TYPE;
BEGIN
  hash := uri_hash;
  new_status := status;
  new_status_text := status_text;
  new_ipfs_url := ipfs_url;

  -- Ensure that there is a matching record to begin with.
  IF NOT EXISTS
  ( SELECT
   FROM resource
   WHERE resource.uri_hash = hash
     AND resource.status != 'ContentLinked'
  ) THEN RAISE
  EXCEPTION
    'resource with uri_hash % not found, or it has status ContentLinked',
    hash;
  END IF;

  -- Update the resource state.
  UPDATE
    resource
  SET
    status = new_status,
    status_text = new_status_text,
    ipfs_url = new_ipfs_url,
    updated_at = timezone('utc' :: text, now())
  WHERE
    resource.uri_hash = hash;

  -- return matching resource.
  RETURN QUERY
    SELECT *
    FROM
      resource
    WHERE
      resource .uri_hash = hash;
END;

$$ LANGUAGE plpgsql;

