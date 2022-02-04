CREATE TYPE nft_asset_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'ContentParseFailed',
    'Linked',
    'Parsed'
);
CREATE TYPE pin_service AS ENUM (
    'Pinata',
    'IpfsCluster',
    'IpfsCluster2'
);
CREATE TYPE pin_status AS ENUM (
    'PinError',
    'PinQueued',
    'Pinned',
    'Pinning'
);
CREATE TYPE resource_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'PinRequestFailed',
    'ContentLinked'
);
CREATE TABLE nft_asset (
    token_uri text NOT NULL,
    ipfs_url text,
    metadata_cid text,
    status nft_asset_status NOT NULL,
    status_text text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    token_uri_hash bytea GENERATED ALWAYS AS IDENTITY 
);

CREATE UNLOGGED TABLE erc721_token_ingestion_queue (
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
COMMENT ON TABLE erc721_token_ingestion_queue IS 'Unlogged Table for quickly writing records from the Etherium Blockchain';

CREATE TABLE nft (
    id text NOT NULL,
    contract_id text NOT NULL,
    token_id text NOT NULL,
    mint_time timestamp with time zone NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    token_uri_hash bytea NOT NULL
);

CREATE TABLE blockchain_block (
    hash text NOT NULL,
    number bigint NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE blockchain_contract (
    id text NOT NULL,
    name text,
    symbol text,
    supports_eip721_metadata boolean NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE content (
    cid text NOT NULL,
    dag_size bigint,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE erc721_import (
    id text NOT NULL,
    next_id text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE erc721_import_by_nft (
    erc721_import_id text NOT NULL,
    nft_id text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE nft_metadata (
    cid text NOT NULL,
    name text,
    description text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    image_uri_hash bytea,
    json jsonb
);
CREATE TABLE nft_owner (
    id text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE nft_ownership (
    nft_id text NOT NULL,
    owner_id text NOT NULL,
    block_number bigint NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE nfts_by_blockchain_blocks (
    blockchain_block_hash text NOT NULL,
    nft_id text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE TABLE niftysave_migration (
    id text NOT NULL,
    collection text NOT NULL,
    cursor text,
    metadata jsonb NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
COMMENT ON TABLE niftysave_migration IS 'Utility table to keep track of migrations';
CREATE TABLE other_nft_resources (
    metadata_cid text NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    resource_uri_hash bytea NOT NULL
);

CREATE TABLE resource (
    uri text NOT NULL,
    status resource_status NOT NULL,
    status_text text,
    ipfs_url text,
    content_cid text,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    uri_hash bytea GENERATED ALWAYS AS (digest(uri, 'sha256'::text)) STORED NOT NULL
);

CREATE TABLE pin (
    id bigint NOT NULL,
    content_cid text NOT NULL,
    service pin_service NOT NULL,
    status pin_status NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE ONLY pin ALTER COLUMN id SET DEFAULT nextval('pin_id_seq'::regclass);
ALTER TABLE ONLY blockchain_block
    ADD CONSTRAINT blockchain_block_pkey PRIMARY KEY (hash);
ALTER TABLE ONLY blockchain_contract
    ADD CONSTRAINT blockchain_contract_pkey PRIMARY KEY (id);
ALTER TABLE ONLY content
    ADD CONSTRAINT content_pkey PRIMARY KEY (cid);
ALTER TABLE ONLY erc721_import_by_nft
    ADD CONSTRAINT erc721_import_by_nft_pkey PRIMARY KEY (erc721_import_id, nft_id);
ALTER TABLE ONLY erc721_import
    ADD CONSTRAINT erc721_import_pkey PRIMARY KEY (id);
ALTER TABLE ONLY erc721_token_ingestion_queue
    ADD CONSTRAINT erc721_token_ingestion_queue_pkey PRIMARY KEY (id);
ALTER TABLE ONLY nft_asset
    ADD CONSTRAINT nft_asset_pkey PRIMARY KEY (token_uri_hash);
ALTER TABLE ONLY nft_metadata
    ADD CONSTRAINT nft_metadata_pkey PRIMARY KEY (cid);
ALTER TABLE ONLY nft_owner
    ADD CONSTRAINT nft_owner_pkey PRIMARY KEY (id);
ALTER TABLE ONLY nft_ownership
    ADD CONSTRAINT nft_ownership_pkey PRIMARY KEY (block_number, nft_id, owner_id);
ALTER TABLE ONLY nft
    ADD CONSTRAINT nft_pkey PRIMARY KEY (id);
ALTER TABLE ONLY nfts_by_blockchain_blocks
    ADD CONSTRAINT nfts_by_blockchain_blocks_pkey PRIMARY KEY (blockchain_block_hash, nft_id);
ALTER TABLE ONLY niftysave_migration
    ADD CONSTRAINT niftysave_migration_pkey PRIMARY KEY (id);
ALTER TABLE ONLY other_nft_resources
    ADD CONSTRAINT other_nft_resources_pkey PRIMARY KEY (resource_uri_hash, metadata_cid);
ALTER TABLE ONLY pin
    ADD CONSTRAINT pin_content_cid_service_key UNIQUE (content_cid, service);
ALTER TABLE ONLY pin
    ADD CONSTRAINT pin_pkey PRIMARY KEY (id);
ALTER TABLE ONLY resource
    ADD CONSTRAINT resource_pkey PRIMARY KEY (uri_hash);
CREATE UNIQUE INDEX unique_blockchain_block_hash ON blockchain_block USING btree (number);
ALTER TABLE ONLY nft_asset
    ADD CONSTRAINT nft_asset_content_cid_fkey FOREIGN KEY (metadata_cid) REFERENCES content(cid);
ALTER TABLE ONLY nft_asset
    ADD CONSTRAINT nft_asset_metadata_cid_fkey FOREIGN KEY (metadata_cid) REFERENCES nft_metadata(cid);
ALTER TABLE ONLY nft
    ADD CONSTRAINT nft_contract_id_fkey FOREIGN KEY (contract_id) REFERENCES blockchain_contract(id);
ALTER TABLE ONLY nft_metadata
    ADD CONSTRAINT nft_metadata_cid_fkey FOREIGN KEY (cid) REFERENCES content(cid);
ALTER TABLE ONLY nft_metadata
    ADD CONSTRAINT nft_metadata_image_uri_hash_fkey FOREIGN KEY (image_uri_hash) REFERENCES resource(uri_hash);
ALTER TABLE ONLY nft_ownership
    ADD CONSTRAINT nft_ownership_block_number_fkey FOREIGN KEY (block_number) REFERENCES blockchain_block(number);
ALTER TABLE ONLY nft_ownership
    ADD CONSTRAINT nft_ownership_nft_id_fkey FOREIGN KEY (nft_id) REFERENCES nft(id);
ALTER TABLE ONLY nft
    ADD CONSTRAINT nft_token_uri_hash_fkey FOREIGN KEY (token_uri_hash) REFERENCES nft_asset(token_uri_hash);
ALTER TABLE ONLY nfts_by_blockchain_blocks
    ADD CONSTRAINT nfts_by_blockchain_blocks_blockchain_block_hash_fkey FOREIGN KEY (blockchain_block_hash) REFERENCES blockchain_block(hash);
ALTER TABLE ONLY nfts_by_blockchain_blocks
    ADD CONSTRAINT nfts_by_blockchain_blocks_nft_id_fkey FOREIGN KEY (nft_id) REFERENCES nft(id);
ALTER TABLE ONLY other_nft_resources
    ADD CONSTRAINT other_nft_resources_metadata_cid_fkey FOREIGN KEY (metadata_cid) REFERENCES nft_metadata(cid);
ALTER TABLE ONLY other_nft_resources
    ADD CONSTRAINT other_nft_resources_resource_uri_hash_fkey FOREIGN KEY (resource_uri_hash) REFERENCES resource(uri_hash);
ALTER TABLE ONLY pin
    ADD CONSTRAINT pin_content_cid_fkey FOREIGN KEY (content_cid) REFERENCES content(cid);
ALTER TABLE ONLY resource
    ADD CONSTRAINT resource_content_cid_fkey FOREIGN KEY (content_cid) REFERENCES content(cid);
