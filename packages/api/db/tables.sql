-- Pin status type is a subset of IPFS Cluster "TrackerStatus".
-- https://github.com/ipfs/ipfs-cluster/blob/54c3608899754412861e69ee81ca8f676f7e294b/api/types.go#L52-L83
CREATE TYPE pin_status_type AS ENUM (
    -- An error occurred pinning.
    'PinError',
    -- The item has been queued for pinning on the IPFS daemon.
    'PinQueued',
    -- The IPFS daemon has pinned the item.
    'Pinned',
    -- The IPFS daemon is currently pinning the item.
    'Pinning'
    );

-- Service type is the place/location/organisation that is pinning the content.
CREATE TYPE service_type AS ENUM (
    -- The NFT.Storage cluster in Pinata.
    'Pinata',
    -- The original NFT.Storage cluster.
    'IpfsCluster',
    -- The current cluster, originally commissioned for niftysave.
    'IpfsCluster2'
    );

-- Upload type is the type of received upload data.
CREATE TYPE upload_type AS ENUM (
    -- A CAR file upload.
    'Car',
    -- A raw blob upload in the request body.
    'Blob',
    -- A multi file upload using a multipart request.
    'Multipart',
    -- An item pinned using the pinning service API.
    'Remote',
    -- An "IPNFT" uploaded with the metadata store API.
    'Nft'
    );

-- A user of NFT.Storage
CREATE TABLE IF NOT EXISTS public.user
(
    id             BIGSERIAL PRIMARY KEY,
    magic_link_id  TEXT UNIQUE,
    github_id      TEXT                                                          NOT NULL UNIQUE,
    name           TEXT                                                          NOT NULL,
    picture        TEXT,
    email          TEXT                                                          NOT NULL,
    -- Cryptographic public address of the user.
    public_address TEXT UNIQUE,
    github         jsonb,
    inserted_at    TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at     TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS user_updated_at_idx ON public.user (updated_at);

-- API authentication tokens.
CREATE TABLE IF NOT EXISTS auth_key
(
    id          BIGSERIAL PRIMARY KEY,
    -- User assigned name.
    name        TEXT                                                          NOT NULL,
    -- The JWT used by the user to access the API.
    secret      TEXT                                                          NOT NULL,
    user_id     BIGINT                                                        NOT NULL REFERENCES public.user (id),
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Details of the root of a file/directory stored on NFT.Storage.
CREATE TABLE IF NOT EXISTS content
(
    -- Normalized base32 v1.
    cid         TEXT PRIMARY KEY,
    -- Size of the DAG in bytes. Set if known on upload or for partials is set
    -- when content is fully pinned in at least one location.
    dag_size    BIGINT,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS content_updated_at_idx ON content (updated_at);
CREATE INDEX IF NOT EXISTS content_inserted_at_idx ON content (inserted_at);

-- Information for piece of content pinned in IPFS.
CREATE TABLE IF NOT EXISTS pin
(
    id          BIGSERIAL PRIMARY KEY,
    -- Overall pinning status at this location (may be pinned on multiple nodes).
    status      pin_status_type                                               NOT NULL,
    -- The root CID of the pinned content, normalized as base32 v1.
    content_cid text                                                          NOT NULL REFERENCES content (cid),
    -- The place where this item is pinned.
    service     service_type                                                  NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (content_cid, service)
);

CREATE INDEX IF NOT EXISTS pin_updated_at_idx ON pin (updated_at);

-- An upload created by a user.
CREATE TABLE IF NOT EXISTS upload
(
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT                                                        NOT NULL REFERENCES public.user (id),
    -- User authentication token that was used to upload this content.
    -- Note: maybe be null when the user upload through the website.
    key_id      BIGINT REFERENCES auth_key (id),
    -- The root CID of the uploaded content, normalized as base32 v1.
    content_cid TEXT                                                          NOT NULL REFERENCES content (cid),
    -- The root CID of the uploaded content, as provided by the user.
    source_cid  TEXT                                                          NOT NULL,
    -- MIME type of the upload data as sent in the request.
    mime_type   TEXT,
    type        upload_type                                                   NOT NULL,
    -- User provided name for this upload.
    name        TEXT,
    -- List of files in the upload if the type was Mutlipart or Nft.
    files       jsonb,
    -- User provided multiaddrs of origins of this upload (used by the pinning
    -- service API).
    origins     jsonb,
    -- Custom metadata provided by the user (currently only available via the
    -- pinning service API).
    meta        jsonb,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (user_id, source_cid)
);

CREATE INDEX IF NOT EXISTS upload_source_cid_idx ON upload (source_cid);
CREATE INDEX IF NOT EXISTS upload_updated_at_idx ON upload (updated_at);

-- Temporary table to record events from the live site between KV sync start
-- and the migration window.
CREATE TABLE IF NOT EXISTS migration_event
(
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    data        jsonb,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
