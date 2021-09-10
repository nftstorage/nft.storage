DROP TYPE resource_status;
CREATE TYPE resource_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'PinRequestFailed',
    'ContentLinked'
);

DROP TYPE nft_asset_status;
CREATE TYPE nft_asset_status AS ENUM (
    'Queued',
    'URIParseFailed',
    'ContentFetchFailed',
    'ContentParseFailed',
    'PinRequestFailed',
    'Linked'
);

DROP TYPE pin_status;
CREATE TYPE pin_status AS ENUM (
    'PinError',
    'PinQueued',
    'Pinned',
    'Pinning',
);

DROP TYPE pin_service;
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
    owner_id TEXT NOT NULL,
    updated_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    inserted_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
