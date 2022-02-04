SET check_function_bodies = false;
CREATE TYPE public.nft_asset_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'ContentParseFailed',
    'Linked',
    'Parsed'
);
CREATE TYPE public.pin_service AS ENUM (
    'Pinata',
    'IpfsCluster',
    'IpfsCluster2'
);
CREATE TYPE public.pin_status AS ENUM (
    'PinError',
    'PinQueued',
    'Pinned',
    'Pinning'
);
CREATE TYPE public.resource_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'PinRequestFailed',
    'ContentLinked'
);
CREATE TABLE public.nft_asset (
    token_uri text NOT NULL,
    ipfs_url text,
    metadata_cid text,
    status public.nft_asset_status NOT NULL,
    status_text text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    token_uri_hash bytea GENERATED ALWAYS AS (public.digest(token_uri, 'sha256'::text)) STORED NOT NULL
);
CREATE FUNCTION public.fail_nft_asset(token_uri_hash text, status public.nft_asset_status, status_text text, ipfs_url text DEFAULT NULL::text) RETURNS SETOF public.nft_asset
    LANGUAGE plpgsql
    AS $$
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
$$;
CREATE TABLE public.resource (
    uri text NOT NULL,
    status public.resource_status NOT NULL,
    status_text text,
    ipfs_url text,
    content_cid text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    uri_hash bytea GENERATED ALWAYS AS (public.digest(uri, 'sha256'::text)) STORED NOT NULL
);
CREATE FUNCTION public.fail_resource(uri_hash bytea, ipfs_url text, status public.resource_status, status_text text) RETURNS SETOF public.resource
    LANGUAGE plpgsql
    AS $$
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
$$;
CREATE UNLOGGED TABLE public.erc721_token_ingestion_queue (
    id text NOT NULL,
    token_id text,
    token_uri text,
    mint_time timestamp with time zone,
    contract_id text,
    contract_name text,
    contract_symbol text,
    contract_supports_eip721_metadata boolean,
    block_hash text,
    block_number bigint,
    owner_id text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    last_processed timestamp with time zone
);
COMMENT ON TABLE public.erc721_token_ingestion_queue IS 'Unlogged Table for quickly writing records from the Etherium Blockchain';
CREATE FUNCTION public.get_unprocessed_tokens_in_queue(batch integer) RETURNS SETOF public.erc721_token_ingestion_queue
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF batch < 0 THEN
    RETURN QUERY
      SELECT *
      FROM erc721_token_ingestion_queue
      WHERE last_processed
      IS null;
    ELSE
      RETURN QUERY
        SELECT *
        FROM erc721_token_ingestion_queue
        WHERE last_processed
        IS null
        LIMIT batch;
  END IF;
END $$;
CREATE TABLE public.nft (
    id text NOT NULL,
    contract_id text NOT NULL,
    token_id text NOT NULL,
    mint_time timestamp with time zone NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    token_uri_hash bytea NOT NULL
);
CREATE FUNCTION public.ingest_erc721_token(id text, token_id text, token_uri text, mint_time timestamp with time zone, contract_id text, contract_name text, contract_symbol text, contract_supports_eip721_metadata boolean, block_hash text, block_number bigint, owner_id text, updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()), inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now())) RETURNS SETOF public.nft
    LANGUAGE plpgsql
    AS $$
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
$$;
CREATE FUNCTION public.ingest_unprocessed_tokens(ingest_limit integer, batch_size integer) RETURNS TABLE(affected_rows integer, batches_run integer, execution_time integer, execution_time_per_row numeric)
    LANGUAGE plpgsql
    AS $$
DECLARE
  r record;
  unprocessed_total integer :=0;
  affected_rows integer := 0;
  affected_rows_in_batch integer := 0;
  batches_run integer := 0;
   _timing1  timestamptz;
   _start_ts timestamptz;
   _end_ts   timestamptz;
   _overhead numeric;     -- in ms
   _timing   numeric;     -- in ms
   _execution_time numeric;
   _execution_time_per_row numeric;
BEGIN
   _timing1  := clock_timestamp();
   _start_ts := clock_timestamp();
   _end_ts   := clock_timestamp();
   -- take minimum duration as conservative estimate
   _overhead := 1000 * extract(
        epoch FROM LEAST(_start_ts - _timing1, _end_ts - _start_ts)
    );
  _start_ts := clock_timestamp();
  IF ingest_limit > 0 THEN
    IF ingest_limit < batch_size THEN
      batch_size := ingest_limit;
    END IF;
  END IF;
  SELECT COUNT(*)
    FROM get_unprocessed_tokens_in_queue(ingest_limit)
    INTO unprocessed_total;
  WHILE (unprocessed_total > 0) LOOP
    WITH batch AS (
      SELECT *
      FROM get_unprocessed_tokens_in_queue(batch_size)
    ), nfts AS (
      SELECT public.ingest_erc721_token(
        id,
        token_id,
        token_uri,
        mint_time,
        contract_id,
        contract_name,
        contract_symbol,
        contract_supports_eip721_metadata,
        block_hash,
        block_number,
        owner_id,
        updated_at
      ) FROM batch
    ), marked_processed AS (
      UPDATE erc721_token_ingestion_queue
      SET last_processed = now()
      FROM batch
      WHERE erc721_token_ingestion_queue.id = batch.id
      RETURNING *
    )
    SELECT COUNT(*)
      FROM marked_processed
      INTO affected_rows_in_batch;
    affected_rows := affected_rows + affected_rows_in_batch;
    batches_run := batches_run + 1;
    unprocessed_total := unprocessed_total - batch_size;
  END LOOP;
  _end_ts := clock_timestamp();
  CREATE TEMP TABLE readout (
    affected_rows integer,
    batches_run integer,
    execution_time integer,
    execution_time_per_row decimal
    );
  _execution_time := 1000 * (extract(epoch FROM _end_ts - _start_ts)) - _overhead;
  _execution_time_per_row = _execution_time::decimal / affected_rows::decimal;
  INSERT INTO readout (affected_rows, batches_run, execution_time, execution_time_per_row)
    VALUES (affected_rows, batches_run, _execution_time, _execution_time_per_row);
  RETURN QUERY SELECT * FROM readout;
END $$;
CREATE FUNCTION public.link_nft_resource(cid text, uri text) RETURNS SETOF public.resource
    LANGUAGE plpgsql
    AS $$
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
$$;
CREATE FUNCTION public.link_resource_content(uri_hash bytea, ipfs_url text, dag_size bigint, cid text, status_text text, pin_service public.pin_service DEFAULT 'IpfsCluster2'::public.pin_service) RETURNS SETOF public.resource
    LANGUAGE plpgsql
    AS $$
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
  RETURN QUERY
  SELECT
    *
  FROM
    resource
  WHERE
    resource .uri_hash = hash;
END;
$$;
CREATE FUNCTION public.nullify_last_processed_ingest_queue() RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE erc721_token_ingestion_queue
  SET last_processed = null;
END $$;
CREATE FUNCTION public.parse_nft_asset(token_uri_hash text, status public.nft_asset_status, status_text text, ipfs_url text, metadata_cid text, dag_size bigint, metadata jsonb) RETURNS SETOF public.nft_asset
    LANGUAGE plpgsql
    AS $$
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
$$;
CREATE FUNCTION public.queue_resource(uri text, ipfs_url text DEFAULT NULL::text, content_cid text DEFAULT NULL::text) RETURNS SETOF public.resource
    LANGUAGE plpgsql
    AS $$
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
$$;
CREATE TABLE public.blockchain_block (
    hash text NOT NULL,
    number bigint NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE public.blockchain_contract (
    id text NOT NULL,
    name text,
    symbol text,
    supports_eip721_metadata boolean NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE public.content (
    cid text NOT NULL,
    dag_size bigint,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE public.erc721_import (
    id text NOT NULL,
    next_id text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE public.erc721_import_by_nft (
    erc721_import_id text NOT NULL,
    nft_id text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE public.nft_metadata (
    cid text NOT NULL,
    name text,
    description text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    image_uri_hash bytea,
    json jsonb
);
CREATE TABLE public.nft_owner (
    id text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE public.nft_ownership (
    nft_id text NOT NULL,
    owner_id text NOT NULL,
    block_number bigint NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE public.nfts_by_blockchain_blocks (
    blockchain_block_hash text NOT NULL,
    nft_id text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE public.niftysave_migration (
    id text NOT NULL,
    collection text NOT NULL,
    cursor text,
    metadata jsonb NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
COMMENT ON TABLE public.niftysave_migration IS 'Utility table to keep track of migrations';
CREATE TABLE public.other_nft_resources (
    metadata_cid text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    resource_uri_hash bytea NOT NULL
);
CREATE TABLE public.pin (
    id bigint NOT NULL,
    content_cid text NOT NULL,
    service public.pin_service NOT NULL,
    status public.pin_status NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE SEQUENCE public.pin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.pin_id_seq OWNED BY public.pin.id;
ALTER TABLE ONLY public.pin ALTER COLUMN id SET DEFAULT nextval('public.pin_id_seq'::regclass);
ALTER TABLE ONLY public.blockchain_block
    ADD CONSTRAINT blockchain_block_pkey PRIMARY KEY (hash);
ALTER TABLE ONLY public.blockchain_contract
    ADD CONSTRAINT blockchain_contract_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.content
    ADD CONSTRAINT content_pkey PRIMARY KEY (cid);
ALTER TABLE ONLY public.erc721_import_by_nft
    ADD CONSTRAINT erc721_import_by_nft_pkey PRIMARY KEY (erc721_import_id, nft_id);
ALTER TABLE ONLY public.erc721_import
    ADD CONSTRAINT erc721_import_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.erc721_token_ingestion_queue
    ADD CONSTRAINT erc721_token_ingestion_queue_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.nft_asset
    ADD CONSTRAINT nft_asset_pkey PRIMARY KEY (token_uri_hash);
ALTER TABLE ONLY public.nft_metadata
    ADD CONSTRAINT nft_metadata_pkey PRIMARY KEY (cid);
ALTER TABLE ONLY public.nft_owner
    ADD CONSTRAINT nft_owner_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.nft_ownership
    ADD CONSTRAINT nft_ownership_pkey PRIMARY KEY (block_number, nft_id, owner_id);
ALTER TABLE ONLY public.nft
    ADD CONSTRAINT nft_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.nfts_by_blockchain_blocks
    ADD CONSTRAINT nfts_by_blockchain_blocks_pkey PRIMARY KEY (blockchain_block_hash, nft_id);
ALTER TABLE ONLY public.niftysave_migration
    ADD CONSTRAINT niftysave_migration_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.other_nft_resources
    ADD CONSTRAINT other_nft_resources_pkey PRIMARY KEY (resource_uri_hash, metadata_cid);
ALTER TABLE ONLY public.pin
    ADD CONSTRAINT pin_content_cid_service_key UNIQUE (content_cid, service);
ALTER TABLE ONLY public.pin
    ADD CONSTRAINT pin_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.resource
    ADD CONSTRAINT resource_pkey PRIMARY KEY (uri_hash);
CREATE UNIQUE INDEX unique_blockchain_block_hash ON public.blockchain_block USING btree (number);
ALTER TABLE ONLY public.nft_asset
    ADD CONSTRAINT nft_asset_content_cid_fkey FOREIGN KEY (metadata_cid) REFERENCES public.content(cid);
ALTER TABLE ONLY public.nft_asset
    ADD CONSTRAINT nft_asset_metadata_cid_fkey FOREIGN KEY (metadata_cid) REFERENCES public.nft_metadata(cid);
ALTER TABLE ONLY public.nft
    ADD CONSTRAINT nft_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES public.blockchain_contract(id);
ALTER TABLE ONLY public.nft_metadata
    ADD CONSTRAINT nft_metadata_cid_fkey FOREIGN KEY (cid) REFERENCES public.content(cid);
ALTER TABLE ONLY public.nft_metadata
    ADD CONSTRAINT nft_metadata_image_uri_hash_fkey FOREIGN KEY (image_uri_hash) REFERENCES public.resource(uri_hash);
ALTER TABLE ONLY public.nft_ownership
    ADD CONSTRAINT nft_ownership_block_number_fkey FOREIGN KEY (block_number) REFERENCES public.blockchain_block(number);
ALTER TABLE ONLY public.nft_ownership
    ADD CONSTRAINT nft_ownership_nft_id_fkey FOREIGN KEY (nft_id) REFERENCES public.nft(id);
ALTER TABLE ONLY public.nft
    ADD CONSTRAINT nft_token_uri_hash_fkey FOREIGN KEY (token_uri_hash) REFERENCES public.nft_asset(token_uri_hash);
ALTER TABLE ONLY public.nfts_by_blockchain_blocks
    ADD CONSTRAINT nfts_by_blockchain_blocks_blockchain_block_hash_fkey FOREIGN KEY (blockchain_block_hash) REFERENCES public.blockchain_block(hash);
ALTER TABLE ONLY public.nfts_by_blockchain_blocks
    ADD CONSTRAINT nfts_by_blockchain_blocks_nft_id_fkey FOREIGN KEY (nft_id) REFERENCES public.nft(id);
ALTER TABLE ONLY public.other_nft_resources
    ADD CONSTRAINT other_nft_resources_metadata_cid_fkey FOREIGN KEY (metadata_cid) REFERENCES public.nft_metadata(cid);
ALTER TABLE ONLY public.other_nft_resources
    ADD CONSTRAINT other_nft_resources_resource_uri_hash_fkey FOREIGN KEY (resource_uri_hash) REFERENCES public.resource(uri_hash);
ALTER TABLE ONLY public.pin
    ADD CONSTRAINT pin_content_cid_fkey FOREIGN KEY (content_cid) REFERENCES public.content(cid);
ALTER TABLE ONLY public.resource
    ADD CONSTRAINT resource_content_cid_fkey FOREIGN KEY (content_cid) REFERENCES public.content(cid);
