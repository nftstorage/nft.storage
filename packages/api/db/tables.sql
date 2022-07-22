-- Auth key blocked status type is the type of blocking that has occurred on the api
-- key.  These are primarily used by the admin app.
CREATE TYPE auth_key_blocked_status_type AS ENUM (
    -- The api key is blocked.
    'Blocked',
    -- The api key is unblocked.
    'Unblocked'
);

-- User tags are associated to a user for the purpose of granting/restricting them
-- in the application.
CREATE TYPE user_tag_type AS ENUM
(
  'HasAccountRestriction',
  'HasDeleteRestriction',
  'HasPsaAccess',
  'HasSuperHotAccess',
  'StorageLimitBytes'
);

CREATE TYPE user_tag_proposal_decision_type AS ENUM
(
  'Approved',
  'Declined'
);

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
    -- The NFT.Storage cluster in Pinata (LEGACY).
    'Pinata',
    -- The original NFT.Storage cluster.
    'IpfsCluster',
    -- An IPFS Cluster originally commissioned for niftysave.
    'IpfsCluster2',
    -- New cluster with flatfs and better DHT.
    'IpfsCluster3'
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
    did            TEXT UNIQUE,
    github         jsonb,
    inserted_at    TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at     TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
CREATE INDEX IF NOT EXISTS user_updated_at_idx ON public.user (updated_at);

CREATE TABLE IF NOT EXISTS public.user_tag
(
  id              BIGSERIAL PRIMARY KEY,
  user_id         BIGINT                                                        NOT NULL REFERENCES public.user (id),
  tag             user_tag_type                                                 NOT NULL,
  value           TEXT                                                          NOT NULL,
  reason          TEXT                                                          NOT NULL,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())     NOT NULL,
  deleted_at  TIMESTAMP WITH TIME ZONE
);
CREATE UNIQUE INDEX IF NOT EXISTS user_tag_is_deleted_idx ON user_tag (user_id, tag, deleted_at)
WHERE deleted_at IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS user_tag_is_not_deleted_idx ON user_tag (user_id, tag)
WHERE deleted_at IS NULL;

-- These are user_tag(s) that a user has requested.  It is assumed that a user can
-- only request one type of user_tag at any given time, hence the index associated
-- with this table.  The admin app will have to create an entry in the user_tag
-- table once a proposal has been approved.  These proposals are visible to both
-- users and admins.
CREATE TABLE IF NOT EXISTS public.user_tag_proposal
(
  id                     BIGSERIAL      PRIMARY KEY,
  user_id                BIGINT         NOT NULL REFERENCES public.user (id),
  tag                    user_tag_type  NOT NULL,
  proposed_tag_value     TEXT           NOT NULL,
  user_proposal_form     jsonb          NOT NULL,
  admin_decision_message TEXT                   ,
  admin_decision_type    user_tag_proposal_decision_type,
  inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  deleted_at  TIMESTAMP WITH TIME ZONE
);
-- Note: We index active user_tag_proposals with deleted_at IS NULL to enforce only 1 active
-- tag type proposal per user.  We allow there to be multiple deleted user_tag_proposals of the same type per
-- user to handle the scenario where a user has been denied multiple times by admins.
-- If deleted_at is populated, it means the user_tag_proposal has been cancelled by
-- a user or a decision has been provided by an admin.
CREATE UNIQUE INDEX IF NOT EXISTS user_tag_proposal_is_not_deleted_idx ON user_tag_proposal (user_id, tag)
WHERE deleted_at IS NULL;

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

CREATE TABLE IF NOT EXISTS auth_key_history
(
    id          BIGSERIAL PRIMARY KEY,
    status      auth_key_blocked_status_type                                  NOT NULL,
    reason      TEXT                                                          NOT NULL,
    auth_key_id BIGSERIAL                                                     NOT NULL REFERENCES auth_key (id),
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
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
CREATE UNIQUE INDEX content_cid_with_size_idx ON content (cid) INCLUDE (dag_size);


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

CREATE INDEX IF NOT EXISTS pin_composite_service_and_status_idx ON pin (service, status);
CREATE INDEX IF NOT EXISTS pin_composite_updated_at_and_content_cid_idx ON pin (updated_at, content_cid);

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
    -- Custom metadata. Currently used in 2 places:
    -- 1. Pinning Service API user provided `Record<string, string>`.
    -- 2. Metaplex endpoint `/metaplex/upload` to store details of the Metaplex user.
    meta        jsonb,
    backup_urls text[],
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    deleted_at TIMESTAMP WITH TIME ZONE,
    UNIQUE (user_id, source_cid)
);

CREATE INDEX IF NOT EXISTS upload_inserted_at_idx ON upload (inserted_at);
CREATE INDEX IF NOT EXISTS upload_content_cid_idx ON upload (content_cid);
CREATE INDEX IF NOT EXISTS upload_source_cid_idx ON upload (source_cid);
CREATE INDEX IF NOT EXISTS upload_updated_at_idx ON upload (updated_at);
CREATE INDEX IF NOT EXISTS upload_type_idx ON upload (type);

CREATE VIEW admin_search as
select
  u.id::text as user_id,
  u.email as email,
  u.github_id as github_id,
  ak.secret as token,
  ak.id::text as token_id,
  ak.deleted_at as deleted_at,
  akh.inserted_at as reason_inserted_at,
  akh.reason as reason,
  akh.status as status
from public.user u
full outer join auth_key ak on ak.user_id = u.id
full outer join (select * from auth_key_history where deleted_at is null) as akh on akh.auth_key_id = ak.id;

-- Metric contains the current values of collected metrics.
CREATE TABLE IF NOT EXISTS metric
(
    name TEXT PRIMARY KEY,
    value BIGINT NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
