DROP TYPE IF EXISTS resource_status CASCADE;
CREATE TYPE resource_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'PinRequestFailed',
    'ContentLinked'
);

DROP TYPE IF EXISTS nft_asset_status CASCADE;
CREATE TYPE nft_asset_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'ContentParseFailed',
    'PinRequestFailed',
    'Linked'
);

DROP TYPE IF EXISTS pin_status CASCADE;
CREATE TYPE pin_status AS ENUM (
    'PinError',
    'PinQueued',
    'Pinned',
    'Pinning'
);

DROP TYPE IF EXISTS pin_service CASCADE;
CREATE TYPE pin_service AS ENUM (
    'Pinata',
    'IpfsCluster'
);

CREATE TABLE IF NOT EXISTS blockchain_block (
    hash TEXT NOT NULL,
    number INTEGER NOT NULL,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (hash)
);


CREATE TABLE IF NOT EXISTS nft (
    id TEXT NOT NULL,
    token_id TEXT NOT NULL,
    mint_time TIMESTAMP(3) NOT NULL,
    token_uri TEXT NOT NULL,
    contract_id TEXT NOT NULL,
    nft_owner_id TEXT NOT NULL,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS nfts_by_blockchain_blocks (
    blockchain_block_hash TEXT NOT NULL,
    nft_id TEXT NOT NULL,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (blockchain_block_hash, nft_id)
);

CREATE TABLE IF NOT EXISTS nft_owner (
    id TEXT NOT NULL,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS nft_asset (
    token_uri TEXT NOT NULL,
    ipfs_URL TEXT,
    status nft_asset_status NOT NULL,
    status_text TEXT NOT NULL,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (token_uri)
);

CREATE TABLE IF NOT EXISTS nft_metadata (
    content_cid TEXT NOT NULL,
    token_uri TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_uri TEXT NOT NULL,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (content_cid)
);

CREATE TABLE IF NOT EXISTS resource (
    uri TEXT NOT NULL,
    status resource_status NOT NULL,
    status_text TEXT,
    ipfs_url TEXT,
    content_cid TEXT,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (uri)
);

CREATE TABLE IF NOT EXISTS resources_by_nft_metadata (
    nft_metadata_cid TEXT NOT NULL,
    resource_uri TEXT NOT NULL,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (nft_metadata_cid,resource_uri)
);

CREATE TABLE IF NOT EXISTS content (
    cid TEXT NOT NULL,
    dag_size INTEGER,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cid)
);


CREATE TABLE IF NOT EXISTS pin (
    id BIGSERIAL NOT NULL,
    content_cid TEXT NOT NULL,
    service pin_service NOT NULL,
    status pin_status NOT NULL,
    status_text TEXT,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);


CREATE TABLE IF NOT EXISTS blockchain_contract (
    id TEXT NOT NULL,
    name TEXT,
    symbol TEXT,
    supports_eip721_metadata BOOLEAN NOT NULL,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS erc721_import (
    id TEXT NOT NULL,
    next_id TEXT NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS erc721_import_by_nft (
    erc721_import_id TEXT NOT NULL,
    nft_id TEXT NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (erc721_import_id,nft_id)
);