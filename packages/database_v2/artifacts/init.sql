DROP TYPE resource_status;
CREATE TYPE resource_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'PinRequestFailed',
    'ContentLinked'
);

DROP TYPE IF EXISTS nft_asset_status;
CREATE TYPE nft_asset_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'ContentParseFailed',
    'PinRequestFailed',
    'Linked'
);

DROP TYPE IF EXISTS pin_status;
CREATE TYPE pin_status AS ENUM (
    'PinError',
    'PinQueued',
    'Pinned',
    'Pinning'
);

DROP TYPE IF EXISTS pin_service;
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
    metadata_cid TEXT NOT NULL,
    resource_uri TEXT NOT NULL,

    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (metadata_cid,resource_uri)
);