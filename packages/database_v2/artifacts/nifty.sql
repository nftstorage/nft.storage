CREATE SCHEMA nifty;

CREATE TYPE nifty.resource_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'PinRequestFailed',
    'ContentLinked'
);

CREATE TYPE nifty.nft_asset_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'ContentParseFailed',
    'PinRequestFailed',
    'Linked'
);

CREATE TYPE nifty.pin_status AS ENUM (
    'ClusterError',
    'PinError',
    'PinQueued',
    'Pinned',
    'Pinning',
    'Remote',
    'Sharded',
    'Undefined',
    'UnpinError',
    'UnpinQueued',
    'Unpinned',
    'Unpinning'
);

CREATE TYPE nifty.pin_service AS ENUM (
    'Pinata',
    'IpfsCluster'
);

CREATE TABLE  nifty.block (
    hash TEXT NOT NULL,
    number INTEGER NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (hash)
);

CREATE TABLE  nifty.nft (
    id TEXT NOT NULL,
    token_id TEXT NOT NULL,
    mint_time TIMESTAMP(3) NOT NULL,
    token_uri TEXT NOT NULL,
    contract_id TEXT NOT NULL,
    owner_id TEXT NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

CREATE TABLE  nifty.owner (
    id TEXT NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

CREATE TABLE  nifty.nfts_by_blocks (
    block_hash TEXT NOT NULL,
    nft_id TEXT NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (block_hash,nft_id)
);

CREATE TABLE  nifty.nft_asset (
    token_uri TEXT NOT NULL,
    ipfs_URL TEXT,
    status nft_asset_status NOT NULL,
    status_text TEXT NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (token_uri)
);

CREATE TABLE  nifty.metadata (
    content_cid TEXT NOT NULL,
    token_uri TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_uri TEXT NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (content_cid)
);

CREATE TABLE  nifty.resource (
    uri TEXT NOT NULL,
    status resource_status NOT NULL,
    status_text TEXT,
    ipfs_url TEXT,
    content_cid TEXT,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (uri)
);

CREATE TABLE  nifty.resources_by_metadata (
    metadata_cid TEXT NOT NULL,
    resource_uri TEXT NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (metadata_cid,resource_uri)
);

CREATE TABLE  nifty.content (
    cid TEXT NOT NULL,
    dag_size INTEGER,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (cid)
);

CREATE TABLE  nifty.pin (
    id BIGSERIAL NOT NULL,
    content_cid TEXT NOT NULL,
    service pin_service NOT NULL,
    status pin_status NOT NULL,
    status_text TEXT,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

CREATE TABLE  nifty.contract (
    id TEXT NOT NULL,
    name TEXT,
    symbol TEXT,
    supports_eip721_metadata BOOLEAN NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

CREATE TABLE  nifty.erc721_import (
    id TEXT NOT NULL,
    next_id TEXT NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id)
);

CREATE TABLE  nifty.erc721_import_by_nft (
    erc721_import_id TEXT NOT NULL,
    nft_id TEXT NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (erc721_import_id,nft_id)
);

CREATE UNIQUE INDEX nifty.block.hash_unique ON nifty.block(hash);
CREATE UNIQUE INDEX nifty.block.number_unique ON nifty.block(number);

CREATE UNIQUE INDEX nifty.nft.id_unique ON nifty.nft(id);

CREATE UNIQUE INDEX nifty.owner.id_unique ON nifty.owner(id);

CREATE UNIQUE INDEX nifty.nft_asset.token_uri_unique ON nifty.nft_asset(token_uri);

CREATE UNIQUE INDEX nifty.metadata.content_cid_unique ON nifty.metadata(content_cid);
CREATE UNIQUE INDEX nifty.metadata.token_uri_unique ON nifty.metadata(token_uri);

CREATE UNIQUE INDEX nifty.resource.uri_unique ON nifty.resource(uri);
CREATE UNIQUE INDEX nifty.resource.ipfs_url_unique ON nifty.resource(ipfs_url);

CREATE UNIQUE INDEX nifty.content.cid_unique ON nifty.content(cid);

CREATE UNIQUE INDEX nifty.pin.id_unique ON nifty.pin(id);
CREATE UNIQUE INDEX nifty.contract.id_unique ON nifty.contract(id);

CREATE UNIQUE INDEX nifty.erc721_import.id_unique ON nifty.erc721_import(id);

ALTER TABLE nifty.nft ADD FOREIGN KEY (token_uri) REFERENCES nifty.nft_asset(token_uri) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE nifty.nft ADD FOREIGN KEY (contract_id) REFERENCES nifty.contract(id) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE nifty.nft ADD FOREIGN KEY (owner_id) REFERENCES nifty.owner(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE nifty.nfts_by_blocks ADD FOREIGN KEY (block_hash) REFERENCES nifty.block(hash) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE nifty.nfts_by_blocks ADD FOREIGN KEY (nft_id) REFERENCES nifty.nft(id) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE nifty.metadata ADD FOREIGN KEY (token_uri) REFERENCES nifty.nft_asset(token_uri) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE nifty.resource ADD FOREIGN KEY (content_cid) REFERENCES nifty.content(cid) ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE nifty.resources_by_metadata ADD FOREIGN KEY (metadata_cid) REFERENCES nifty.metadata(content_cid) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE nifty.resources_by_metadata ADD FOREIGN KEY (resource_uri) REFERENCES nifty.resource(uri) ON DELETE CASCADE ON UPDATE CASCADE;


ALTER TABLE nifty.pin ADD FOREIGN KEY (content_cid) REFERENCES nifty.content(cid) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE nifty.erc721_import_by_nft ADD FOREIGN KEY (erc721_import_id) REFERENCES nifty.erc721_import(id) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE nifty.erc721_import_by_nft ADD FOREIGN KEY (nft_id) REFERENCES nifty.nft(id) ON DELETE CASCADE ON UPDATE CASCADE;
