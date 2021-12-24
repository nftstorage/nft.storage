-- Resources in database is represented by a state machine in which states
-- are identified by a `status` field from this enum.
CREATE TYPE resource_status AS ENUM (
    -- Resource that needs to be processed.
    -- {
    --    status: 'Queued'
    --    uri: string
    --    status_text: string
    -- }
    'Queued',
    -- Resource with a URI we failed to parse.
    -- {
    --    status: 'URIParseFailed'
    --    uri: string
    --    status_text: string
    --  }
    'URIParseFailed',
    -- Resource that we failed to fetch. It may have `ipfsURI` if it was possible
    -- to derive it from the `uri`.
    -- {
    --    status: 'ContentFetchFailed'
    --    uri: string
    --    status_text: string
    --    ipfs_uri: string|null
    -- }
    'ContentFetchFailed',
    -- Resource that we failed to submit pin request for. If it has `ipfsURI`
    -- we've send a request to a cluster asking to pin given cid and it may have
    -- failed. If we could not derive ipfsURI we've tried fetching data and then
    -- we've send it to ipfs cluster to add to the network and pin, but cluster
    -- failed. It also maybe that cluster took too long to respond so we've
    -- aborted request. In any case this indicates some issue with cluster.
    -- {
    --    status: 'PinRequestFailed'
    --    uri: string, statusText: string
    --    ipfs_uri: string|null
    --  }
    'PinRequestFailed',
    -- Resource was linked, meaning cluster gave us CID for it and queued it to
    -- be pinned. In this state we'll have a corresponding `content` record
    -- for this resource
    -- {
    --    status: 'ContentLinked'
    --    uri:string
    --    status_text:string
    --    ipfs_uri: string|null
    --    content_cid: string
    --  }
    'ContentLinked'
);


-- As per EIP-721 token asset is identified by a `tokenURI` that MAY
-- point to a JSON file that conforms to the "ERC721 Metadata JSON Schema.
-- Here we represent nft asset by a state machine in which states are identified
-- by a `status` field from this enum.
CREATE TYPE nft_asset_status AS ENUM (
    -- nft asset was created from `tokenURI` is queued for processing.
    -- {
    --    status: 'Queued'
    --    token_uri: string
    --    status_text: string
    -- }
    'Queued',
    -- Failed to parse uri (it is invalid or maybe protocol isn't supproted)
    -- {
    --    status: 'URIParseFailed'
    --    token_uri: string
    --    status_text: string
    --  }
    'URIParseFailed',
    -- Failed to fetch content from `token_uri`. It may have `ipfs_uri` if it
    -- was possible to derive it from the `token_uri`.
    -- {
    --    status: 'ContentFetchFailed'
    --    token_uri: string
    --    status_text: string
    --    ipfs_uri: string|null
    -- }
    'ContentFetchFailed',
    -- Failed to parse content from `token_uri` as per ERC721 Metadata JSON
    -- schema.
    -- {
    --    status: 'ContentParseFailed'
    --    token_uri: string
    --    status_text: string
    --    ipfs_uri: string|null
    -- }
    'ContentParseFailed',
    -- Asset was fetched, parsed and linked to a corresponding metadata record.
    -- It has `content_cid`  that cluster was asked to pin.
    -- {
    --    status: 'Linked'
    --    uri:string
    --    status_text:string
    --    ipfs_uri: string|null
    --    content_cid: string
    --  }
    'Linked'
);

CREATE TYPE pin_status AS ENUM (
    'PinError',
    'PinQueued',
    'Pinned',
    'Pinning'
);

CREATE TYPE pin_service AS ENUM (
    'Pinata',
    'IpfsCluster',
    'IpfsCluster2'
);

-- A blochain block identified by a it's hash.
CREATE TABLE blockchain_block (
    hash TEXT NOT NULL,
    number BIGINT NOT NULL,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (hash)
);

-- NFT that were discovered on blockchain. These records would only update
-- when nft is transferred from one owner to other.
-- Each nft will have one associated `nft_asset` mapped by `token_uri`.
-- Multiple nfts may map to a same `nft_asset` but that would go against
-- ERC-721 spec, yet nothing enforces that.
CREATE TABLE nft (
    -- unique identifier of the nft in the subgraph, in practice it encodes
    -- (conctact_id, token_id) tuple.
    id TEXT NOT NULL,
    -- An ERC-721 contract identifier.
    contract_id TEXT NOT NULL,
    -- The NFT identifier. Note this is NOT globally unique, but rather unique
    -- per ERC-721 contract.
    token_id TEXT NOT NULL,
    -- A distinct URI to a given nft asset. Per ERC-721 spec that is URI that
    -- MAY point to a JSON file that conforms to the "ERC721 Metadata JSON
    -- Schema".
    token_uri TEXT NOT NULL,
    -- Timestamp of when nft was minted.
    mint_time TIMESTAMP WITH TIME ZONE NOT NULL,
    -- Current owner of this nft. This changes over time.

    -- Time when last this record was updated.
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    -- Time when this record was created.
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    PRIMARY KEY (id)
);

-- Blochain block may contain multiple nft transfers & this table lets us
-- track n:m relation of which NFTs were discovered in which blocks.
CREATE TABLE nfts_by_blockchain_blocks (
    blockchain_block_hash TEXT NOT NULL,
    nft_id TEXT NOT NULL,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (blockchain_block_hash, nft_id)
);

CREATE TABLE nft_owner (
    id TEXT NOT NULL,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id)
);

-- Each record represents state of the NFT asset in the system. Once new
-- nfts from blochain are discovered their `nft_asset`s are created for
-- their `token_uri`s. As system processes incoming data it will update
-- state of each `nft_asset` as per `nft_asset_status`.
CREATE TABLE nft_asset (
    -- URI that was discovered on chain.
    token_uri TEXT NOT NULL,
    -- Represents `ipfs://` URL for this asset. It is present if it was possible
    -- to derive it from `token_uri`. E.g. If `token_uri` is IPFS gateway URL
    -- https://ipfs.io/ipfs/Qm...Hash/file/path this field will be derived to
    -- ipfs://Qm...Hash/file/path.
    ipfs_url TEXT,
    -- Cryptographic identifier of the content under `token_uri`. Will be only
    -- present in `Lined` state.
    content_cid TEXT,
    status nft_asset_status NOT NULL,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (token_uri)
);

-- Once `token_asset` is fetched and parsed as per ERC-721 metadata schema
-- all mandatory fields will be stored in this table.
CREATE TABLE nft_metadata (
    -- Cryptographic identifier of the content this metadata was parsed from.
    content_cid TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image_uri TEXT NOT NULL,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (content_cid)
);

-- Once nft asset is fetched and parsed all the ecountered URLs are saved
-- as `resources` and concurrently archived. In the process resource state is
-- updated as per `resource_status`.
CREATE TABLE resource (
    -- Unique Resource Identifier (URI) of this resource.
    uri TEXT NOT NULL,
    -- Current status of the resource.
    status resource_status NOT NULL,
    status_text TEXT,
    -- Represents `ipfs://` URL for this asset. It is present if it was possible
    -- to derive it from `token_uri`. E.g. If `token_uri` is IPFS gateway URL
    -- https://ipfs.io/ipfs/Qm...Hash/file/path this field will be derived to
    -- ipfs://Qm...Hash/file/path.
    ipfs_url TEXT,
    -- Cryptographic identifier of the content under `uri`. Will be only
    -- present in `Lined` state.
    content_cid TEXT,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (uri)
);

-- nft assets according to ERC-721 metadata spec must link to an `image`,
-- however in practice various contracts also tend to include links to
-- more resources in metadata JSON. This table maps `content_id` of the
-- `nft_asset` / `nft_metadata` to those unspecified resources.
CREATE TABLE other_nft_resources (
    content_cid TEXT NOT NULL,
    resource_uri TEXT NOT NULL,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (content_cid, resource_uri)
);

CREATE TABLE content (
    cid TEXT NOT NULL,
    dag_size BIGINT,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (cid)
);


CREATE TABLE pin (
    id BIGSERIAL NOT NULL,
    content_cid TEXT NOT NULL,
    service pin_service NOT NULL,
    status pin_status NOT NULL,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id)
);


CREATE TABLE blockchain_contract (
    id TEXT NOT NULL,
    name TEXT,
    symbol TEXT,
    supports_eip721_metadata BOOLEAN NOT NULL,

    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE erc721_import (
    id TEXT NOT NULL,
    next_id TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    PRIMARY KEY (id)
);

CREATE TABLE erc721_import_by_nft (
    erc721_import_id TEXT NOT NULL,
    nft_id TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,

    PRIMARY KEY (erc721_import_id,nft_id)
);

CREATE UNIQUE INDEX unique_blockchain_block_hash ON blockchain_block(number);
