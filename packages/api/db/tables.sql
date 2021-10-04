-- Pin status Type
CREATE TYPE pin_status_type AS ENUM (
    'PinError',
    'PinQueued',
    'Pinned',
    'Pinning'
    );

-- Pin Services Type
CREATE TYPE service_type AS ENUM ('Pinata', 'IpfsCluster');

-- Upload Type
CREATE TYPE upload_type AS ENUM (
    'Car',
    'Blob',
    'Multipart',
    'Remote',
    'Nft'
    );

CREATE TABLE IF NOT EXISTS public.user
(
    id             BIGSERIAL PRIMARY KEY,
    magic_link_id  TEXT UNIQUE,
    github_id      TEXT                                                          NOT NULL UNIQUE,
    name           TEXT                                                          NOT NULL,
    picture        TEXT,
    email          TEXT                                                          NOT NULL,
    public_address TEXT UNIQUE,
    github         jsonb,
    inserted_at    TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at     TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS auth_key
(
    id          BIGSERIAL PRIMARY KEY,
    name        TEXT                                                          NOT NULL,
    secret      TEXT                                                          NOT NULL,
    user_id     BIGINT                                                        NOT NULL REFERENCES public.user (id),
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (name, user_id)
);

CREATE TABLE IF NOT EXISTS content
(
    -- normalized base32 v1
    cid         TEXT PRIMARY KEY,
    dag_size    BIGINT,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Pin table
CREATE TABLE IF NOT EXISTS pin
(
    id          BIGSERIAL PRIMARY KEY,
    status      pin_status_type                                               NOT NULL,
    content_cid text                                                          NOT NULL REFERENCES content (cid),
    service     service_type                                                  NOT NULL,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE (content_cid, service)
);

-- Create Upload table
CREATE TABLE IF NOT EXISTS upload
(
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT                                                        NOT NULL REFERENCES public.user (id),
    key_id      BIGINT REFERENCES auth_key (id),
    content_cid TEXT                                                          NOT NULL REFERENCES content (cid),
    source_cid  TEXT                                                          NOT NULL,
    -- MIME type of the upload data as sent in the request.
    mime_type   TEXT,
    type        upload_type                                                   NOT NULL,
    name        TEXT,
    files       jsonb,
    origins     jsonb,
    meta        jsonb,
    inserted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    --deleted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
    UNIQUE (user_id, source_cid)
);